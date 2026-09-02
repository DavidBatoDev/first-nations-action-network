"use client";

import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { motion } from "motion/react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import usePrefersReducedMotion from "@/hooks/usePrefersReducedMotion";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_SHORT_LABELS,
  groupByCategory,
  type EcosystemOrg,
} from "@/lib/ecosystem";
import {
  BOX,
  buildGraph,
  categorySlug,
  PADDING,
  RADIUS,
  type EcoLink,
  type EcoNode,
  type NodeState,
} from "./layout";

type SimNode = EcoNode &
  SimulationNodeDatum & {
    /** Current radius, eased toward `rTarget` every tick. The collision force
     *  reads this, and the renderer scales the node by it — so size is a
     *  physical property, not a decoration painted on afterwards. */
    r: number;
    rTarget: number;
  };
type SimLink = SimulationLinkDatum<SimNode> & {
  id: string;
  tier: EcoNode["tier"];
  /** Current perpendicular sag of the edge, eased toward `bowTarget`. An edge
   *  at rest hangs like slack thread; one on the live branch pulls taut. */
  bow: number;
  bowTarget: number;
};

/** Below this stage width the graph switches to its tighter layout. */
const COMPACT_BELOW = 470;

/** Ticks run synchronously before first paint, so the graph is never seen
 *  settling. The anchors do most of the work, so this converges quickly. */
const SETTLE_TICKS = 240;

/** A whisper of energy, kept topped up, so the web breathes instead of freezing. */
const DRIFT_ALPHA = 0.02;

/** How long the unattended tour rests on each category. */
const TOUR_INTERVAL = 1000;

/** How fast a node's radius chases its target, per tick. Unhurried on purpose:
 *  the growth is what pushes the web around, so it should read as something
 *  swelling and displacing its neighbours rather than snapping to a new size. */
const RADIUS_EASE = 0.12;

/** How fast an edge straightens or slackens, per tick. */
const BOW_EASE = 0.14;

/** Sag of a resting edge, as a fraction of its length. */
const BOW_AT_REST = 0.13;

/**
 * Strength of the shove a bloomed node gives the web around it.
 *
 * `forceCollide` only moves what a node physically overlaps, which is why
 * growing a node used to displace two neighbours and nothing else. This pushes
 * everything within reach, so the whole neighbourhood recoils and then settles
 * back — the motion that makes the graph feel like a web rather than a diagram.
 */
const BLOOM_PUSH = 0.5;

/** How far that shove carries, as a multiple of the bloomed node's radius. */
const BLOOM_REACH = 4.2;

/**
 * Floor under the `alpha` this force is scaled by.
 *
 * Forces are normally scaled by alpha so the simulation can converge, but that
 * makes a bloom a shove that fades: the web recoils and then creeps back under
 * the node while it is still bloomed. Holding a floor keeps the space cleared
 * for as long as the node is hovered, and the anchors reclaim it the moment the
 * pointer leaves and the node shrinks.
 */
const BLOOM_ALPHA_FLOOR = 0.45;

export type EcosystemGraphProps = {
  /** Categorised member organisations, read server-side from the networks JSON. */
  organisations: EcosystemOrg[];
  /** The section's server-rendered copy: kicker, headline, paragraph. */
  children: React.ReactNode;
};

/**
 * The membership page's ecosystem graph.
 *
 * An Obsidian-style force-directed web: the network's mark at the hub, the
 * eight ecosystem categories ringed around it, each category's member
 * organisations fanned out beyond, and decorative nodes throwing chords across
 * the ring so it reads as a web rather than a star.
 *
 * At rest it is quiet — faint circles and captions, no logos. Hovering a
 * category lights it to full brand yellow and brings its organisations up;
 * hovering a single organisation blooms that one to nearly hub size in white
 * with its logo readable. Because radius is a simulation value, blooming
 * physically displaces everything nearby and the web reorganises around it.
 *
 * This owns both columns of `.net-grid` so the category pills and the graph can
 * share one piece of hover state. The copy itself arrives as `children` and is
 * still rendered on the server — only the interactivity is client-side.
 *
 * Positions and sizes are written imperatively. The simulation runs at ~60fps,
 * so re-rendering React on every tick (as the smaller `NetworkMap/OrgGraph`
 * does, where the graph only lives for a couple of seconds) would mean
 * thousands of needless reconciliations. The tick handler writes `transform`
 * straight onto elements it holds refs to; React re-renders only when the
 * active node changes.
 */
export default function EcosystemGraph({
  organisations,
  children,
}: EcosystemGraphProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [highlighted, setActive] = useState<string | null>(null);
  const [compact, setCompact] = useState(false);
  /** Set while the visitor is pointing at or tabbing through the graph, which
   *  hands control over to them and stops the tour. */
  const [engaged, setEngaged] = useState(false);
  /** Where the tour had got to, so leaving and returning resumes rather than
   *  restarting from the first category. */
  const tourIndex = useRef(0);

  /* `usePrefersReducedMotion` only resolves after hydration, so the tour can
     get a tick in before it is switched off. Deriving what is active — rather
     than clearing it from an effect — means that tick simply never shows. */
  const active = reducedMotion && !engaged ? null : highlighted;

  const stageRef = useRef<HTMLDivElement>(null);
  const nodeEls = useRef(new Map<string, HTMLElement>());
  const edgeEls = useRef(new Map<string, SVGPathElement>());
  /** Stage pixels per stage unit. 1 when the stage is at its full width. */
  const scale = useRef(1);
  const simulationRef = useRef<Simulation<SimNode, SimLink> | null>(null);
  /** Snap every node to its target size and flush to the DOM. Set by the
   *  simulation effect; used by the reduced-motion path, where `tick()` is
   *  driven by hand and never dispatches the "tick" event the handler is on. */
  const resolveRef = useRef<(() => void) | null>(null);
  /** The active node id, readable from inside the tick loop. The loop derives
   *  every node's target radius from it, so sizing stays a simulation concern
   *  and React never has to touch the node objects. */
  const activeRef = useRef<string | null>(null);

  const orgsByCategory = useMemo(
    () => groupByCategory(organisations),
    [organisations],
  );

  const { nodes, links } = useMemo(
    () =>
      buildGraph(
        ECOSYSTEM_CATEGORIES,
        orgsByCategory,
        ECOSYSTEM_SHORT_LABELS,
        compact,
      ),
    [orgsByCategory, compact],
  );

  const nodesById = useMemo(
    () => new Map(nodes.map((node) => [node.id, node])),
    [nodes],
  );

  /** The branch that is lit: a category id, whether the pointer is on the
   *  category itself, one of its organisations, its caption, or its pill. */
  const activeCategory = active
    ? (nodesById.get(active)?.category ?? null)
    : null;

  /** Category label by slug, so a node can find its own organisations. */
  const categoryBySlug = useMemo(
    () => new Map(ECOSYSTEM_CATEGORIES.map((c) => [categorySlug(c), c])),
    [],
  );

  /**
   * How a node should currently be drawn and sized.
   *
   * `focus` is the one node under the pointer; `lit` is everything else on its
   * branch; `dim` is the rest of the web; `rest` is when nothing is active.
   */
  const stateOf = useCallback(
    (node: EcoNode): NodeState => {
      if (!active) return "rest";
      if (node.id === active) return "focus";
      if (node.tier === "hub") return "lit";
      return node.category && node.category === activeCategory ? "lit" : "dim";
    },
    [active, activeCategory],
  );

  /** Anchor transforms, rendered by both the server and the client so the
   *  settled shape is in the HTML. Memoised because React diffs style objects
   *  by identity — a new object on a hover re-render would overwrite whatever
   *  the tick handler last wrote. */
  const anchorStyles = useMemo(() => {
    const styles = new Map<string, React.CSSProperties>();
    for (const node of nodes) {
      styles.set(node.id, {
        transform: translate(node.ax, node.ay),
        "--s": 1,
      } as React.CSSProperties);
    }
    return styles;
  }, [nodes]);

  /* One stable ref callback for every node, and one for every edge, each
     reading its own id back off the element. Building a per-id closure during
     render would touch the ref maps while rendering, and a fresh closure per
     render would make React detach and reattach every ref on every hover. */
  const registerNode = useCallback((el: HTMLElement | null) => {
    const id = el?.dataset.nodeId;
    if (!el || !id) return;
    nodeEls.current.set(id, el);
    return () => {
      nodeEls.current.delete(id);
    };
  }, []);

  const registerEdge = useCallback((el: SVGPathElement | null) => {
    const id = el?.dataset.edgeId;
    if (!el || !id) return;
    edgeEls.current.set(id, el);
    return () => {
      edgeEls.current.delete(id);
    };
  }, []);

  /* Track the stage width so coordinates can be scaled, and so the layout can
     switch to its tighter form when things stop fitting. */
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const observer = new ResizeObserver(([entry]) => {
      const width = entry.contentRect.width;
      const next = Math.min(1, width / BOX.width);
      if (Math.abs(next - scale.current) > 0.004) scale.current = next;
      setCompact(width < COMPACT_BELOW);
    });

    observer.observe(stage);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const simNodes: SimNode[] = nodes.map((node) => ({
      ...node,
      x: node.ax,
      y: node.ay,
      r: node.baseRadius,
      rTarget: node.baseRadius,
      // The hub is the thing everything else is arranged around; pinning it
      // keeps the centre still while the ring breathes.
      ...(node.tier === "hub" ? { fx: 0, fy: 0 } : null),
    }));
    const simLinks: SimLink[] = links.map((link: EcoLink) => ({
      ...link,
      bow: 0,
      bowTarget: 0,
    }));
    const byId = new Map(simNodes.map((node) => [node.id, node]));

    /**
     * How slack an edge should be right now.
     *
     * Everything hangs at rest; an edge on the live branch pulls straight, so
     * the path the eye is meant to follow is the one taut line on the stage.
     */
    const targetBow = (link: SimLink): number => {
      const source = link.source as SimNode;
      const target = link.target as SimNode;
      const activeId = activeRef.current;
      if (activeId && link.tier !== "decor") {
        const branch = byId.get(activeId)?.category;
        const onBranch =
          branch !== undefined &&
          (target.category === branch || source.category === branch);
        if (onBranch) return 0;
      }
      const dx = (target.x ?? 0) - (source.x ?? 0);
      const dy = (target.y ?? 0) - (source.y ?? 0);
      return Math.hypot(dx, dy) * BOW_AT_REST;
    };

    /** The radius a node should be heading for, given what is active now. */
    const targetRadius = (node: SimNode): number => {
      if (node.tier === "label") return node.baseRadius;
      const activeId = activeRef.current;
      if (!activeId) return RADIUS[node.tier].rest;
      if (node.id === activeId) return RADIUS[node.tier].focus;
      if (node.tier === "hub") return RADIUS.hub.lit;
      const branch = byId.get(activeId)?.category;
      return RADIUS[node.tier][
        node.category && node.category === branch ? "lit" : "dim"
      ];
    };

    /** Slow, deterministic sway of each node's anchor. Modulating the target
     *  rather than injecting velocity keeps the motion bounded — the web can
     *  never wind itself up. */
    let elapsed = 0;
    const swayX = (node: SimNode) =>
      node.tier === "hub" ? 0 : Math.sin(elapsed * 0.00042 + node.phase) * 7;
    const swayY = (node: SimNode) =>
      node.tier === "hub" ? 0 : Math.cos(elapsed * 0.00037 + node.phase * 1.7) * 6;

    const writePositions = () => {
      const k = scale.current;
      for (const node of simNodes) {
        const el = nodeEls.current.get(node.id);
        if (!el) continue;
        el.style.transform = translate((node.x ?? 0) * k, (node.y ?? 0) * k);
        el.style.setProperty("--s", String(round(node.r / node.baseRadius)));
      }
      for (const link of simLinks) {
        const el = edgeEls.current.get(link.id);
        if (!el) continue;
        const source = link.source as SimNode;
        const target = link.target as SimNode;
        const x1 = source.x ?? 0;
        const y1 = source.y ?? 0;
        const x2 = target.x ?? 0;
        const y2 = target.y ?? 0;
        // Control point: the midpoint, pushed out perpendicular to the chord.
        // Recomputed from the live endpoints, so the curve flexes as the web
        // moves rather than sitting there as a fixed arc.
        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.hypot(dx, dy) || 1;
        const cx = (x1 + x2) / 2 + (-dy / length) * link.bow;
        const cy = (y1 + y2) / 2 + (dx / length) * link.bow;
        el.setAttribute(
          "d",
          `M${round(x1)},${round(y1)} Q${round(cx)},${round(cy)} ${round(x2)},${round(y2)}`,
        );
      }
    };

    const simulation = forceSimulation<SimNode>(simNodes)
      .force(
        "link",
        forceLink<SimNode, SimLink>(simLinks)
          .id((node) => node.id)
          .distance((link) => LINK_DISTANCE[(link as SimLink).tier] ?? 90)
          .strength((link) => LINK_STRENGTH[(link as SimLink).tier] ?? 0.3),
      )
      .force(
        "charge",
        forceManyBody<SimNode>()
          .strength((node) => CHARGE[node.tier])
          .distanceMax(340),
      )
      // Reads the live radius, so growing a node really does displace the web.
      .force(
        "collide",
        forceCollide<SimNode>((node) => node.r + PADDING[node.tier]).iterations(2),
      )
      // Push the neighbourhood away from whatever is bloomed. `forceCollide`
      // above only moves what the node physically overlaps, so on its own a
      // bloom nudged two neighbours and the rest of the web sat still. This
      // reaches further, scaled by `alpha`, so the web recoils and then the
      // anchors below draw it home.
      .force("bloom", (alpha: number) => {
        const focus = activeRef.current ? byId.get(activeRef.current) : undefined;
        if (!focus) return;
        const reach = focus.r * BLOOM_REACH;
        for (const node of simNodes) {
          if (node === focus || node.tier === "hub") continue;
          const dx = (node.x ?? 0) - (focus.x ?? 0);
          const dy = (node.y ?? 0) - (focus.y ?? 0);
          const distance = Math.hypot(dx, dy) || 0.001;
          if (distance > reach) continue;
          const push =
            (1 - distance / reach) *
            focus.r *
            BLOOM_PUSH *
            Math.max(alpha, BLOOM_ALPHA_FLOOR);
          node.vx = (node.vx ?? 0) + (dx / distance) * push;
          node.vy = (node.vy ?? 0) + (dy / distance) * push;
        }
      })
      // Hold each node near where it belongs. This is what makes the ring a
      // ring rather than whatever the charge happens to settle into.
      .force(
        "x",
        forceX<SimNode>((node) => node.ax + swayX(node)).strength(
          (node) => ANCHOR[node.tier],
        ),
      )
      .force(
        "y",
        forceY<SimNode>((node) => node.ay + swayY(node)).strength(
          (node) => ANCHOR[node.tier],
        ),
      )
      // Damped enough to absorb a bloom without flinging anything, loose
      // enough that the recoil is visible for a moment before it settles.
      .velocityDecay(0.4)
      // Cools slowly, so a shove takes a moment to play out and settle.
      .alphaDecay(0.016)
      .on("tick", () => {
        elapsed = performance.now();
        for (const node of simNodes) {
          node.rTarget = targetRadius(node);
          node.r += (node.rTarget - node.r) * RADIUS_EASE;
        }
        for (const link of simLinks) {
          link.bowTarget = targetBow(link);
          link.bow += (link.bowTarget - link.bow) * BOW_EASE;
        }
        clamp(simNodes);
        writePositions();
      });

    simulationRef.current = simulation;
    resolveRef.current = () => {
      for (const node of simNodes) node.r = targetRadius(node);
      clamp(simNodes);
      writePositions();
    };

    // Settle before the first paint rather than animating into place: the
    // anchors already say where everything goes, so the springing-out entrance
    // would just be noise on a section the visitor scrolls past.
    simulation.stop();
    for (let i = 0; i < SETTLE_TICKS; i += 1) simulation.tick();
    resolveRef.current();

    if (reducedMotion) {
      // No timer is ever started, so there is no ongoing work at all.
      return () => {
        simulation.stop();
        simulationRef.current = null;
        resolveRef.current = null;
      };
    }

    simulation.alpha(0.06).alphaTarget(DRIFT_ALPHA).restart();
    return () => {
      simulation.stop();
      simulationRef.current = null;
      resolveRef.current = null;
    };
  }, [nodes, links, reducedMotion]);

  /* Publish what is active and reheat, so the web visibly reorganises around
     whatever just grew. This is the whole interaction: sizes are physical, so
     the physics answers. The tick loop reads `activeRef` and retargets from
     there — React never mutates a simulation node. */
  useEffect(() => {
    activeRef.current = active;
    const simulation = simulationRef.current;
    if (!simulation) return;
    if (reducedMotion) {
      // Land on the new layout and sizes with no visible travel at all.
      simulation.tick(90);
      simulation.stop();
      resolveRef.current?.();
      return;
    }
    simulation.alpha(0.75).restart();
  }, [active, reducedMotion]);

  /* Left alone, walk the categories one at a time so the graph demonstrates
     what it does. It yields the moment the visitor engages with it, and picks
     up where it left off when they leave. Reduced motion opts out entirely. */
  useEffect(() => {
    if (engaged || reducedMotion) return;
    const ids = ECOSYSTEM_CATEGORIES.map(categorySlug);
    setActive(ids[tourIndex.current]);
    const timer = window.setInterval(() => {
      tourIndex.current = (tourIndex.current + 1) % ids.length;
      setActive(ids[tourIndex.current]);
    }, TOUR_INTERVAL);
    return () => window.clearInterval(timer);
  }, [engaged, reducedMotion]);

  /** Hand control to the visitor: stop the tour and drop whatever it had
   *  highlighted, so pointing at empty space shows the web at rest. Node
   *  handlers call this and then set themselves, in the same event. */
  const engage = useCallback(() => {
    setEngaged(true);
    setActive(null);
  }, []);

  /** Give it back: clear whatever they were on and let the tour resume. */
  const release = useCallback(() => {
    setActive(null);
    setEngaged(false);
  }, []);

  /** Clear only when focus actually leaves the section, not while tabbing
   *  between a category and its own organisations. */
  const handleBlur = useCallback(
    (event: React.FocusEvent<HTMLDivElement>) => {
      if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
        release();
      }
    },
    [release],
  );

  return (
    <>
      <div data-reveal onPointerEnter={engage} onPointerLeave={release}>
        {children}
        <div className="ally-tags" style={{ marginTop: 30 }}>
          {ECOSYSTEM_CATEGORIES.map((category) => {
            const id = categorySlug(category);
            return (
              <span
                key={category}
                data-category={id}
                data-state={
                  activeCategory ? (activeCategory === id ? "active" : "dim") : undefined
                }
                onPointerEnter={() => {
                  engage();
                  setActive(id);
                }}
              >
                {category}
              </span>
            );
          })}
        </div>
      </div>

      <div className="net-stage" data-reveal data-delay="1">
        <div
          className="ecograph"
          ref={stageRef}
          role="group"
          aria-label="Organisations connected through the First Nations Action Network"
          data-active={activeCategory ?? undefined}
          data-compact={compact ? "" : undefined}
          onPointerEnter={engage}
          onPointerLeave={release}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === "Escape") release();
          }}
        >
          <svg
            className="ecograph-edges"
            viewBox={`${-BOX.width / 2} ${-BOX.height / 2} ${BOX.width} ${BOX.height}`}
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
            focusable="false"
          >
            {links.map((link) => {
              const target = nodesById.get(link.target as string);
              // Decorative chords end on real categories, so reading their
              // state from the target would flare a line clear across the
              // stage whenever that category went live. They are texture:
              // they dim with everything else and never light up.
              const state =
                link.tier === "decor"
                  ? active
                    ? "dim"
                    : "rest"
                  : target
                    ? stateOf(target)
                    : undefined;
              return (
                <path
                  key={link.id}
                  ref={registerEdge}
                  data-edge-id={link.id}
                  className="ecograph-edge"
                  data-tier={link.tier}
                  data-state={state}
                  fill="none"
                />
              );
            })}
          </svg>

          {nodes.map((node) => {
            const style = anchorStyles.get(node.id);
            const state = stateOf(node);
            const shared = {
              className: "ecograph-pos",
              ref: registerNode,
              "data-node-id": node.id,
              // Stacking lives here, not on the chrome inside: `will-change`
              // makes each positioner its own stacking context, so a z-index
              // on a child cannot lift it above a neighbouring node.
              "data-tier": node.tier,
              "data-state": state,
              style,
            } as const;

            if (node.tier === "hub") {
              return (
                <span key={node.id} {...shared}>
                  <span className="ecograph-hub" aria-hidden="true">
                    <Image
                      src="/assets/logo-on-light.png"
                      alt=""
                      width={1202}
                      height={794}
                      sizes="120px"
                      priority
                    />
                  </span>
                </span>
              );
            }

            if (node.tier === "decor") {
              return (
                <span key={node.id} {...shared}>
                  <span
                    className="ecograph-node ecograph-node-decor"
                    data-state={state}
                    aria-hidden="true"
                  />
                </span>
              );
            }

            if (node.tier === "label") {
              return (
                <span key={node.id} {...shared}>
                  <span
                    className="ecograph-label"
                    data-state={state}
                    aria-hidden="true"
                  >
                    {node.label}
                  </span>
                </span>
              );
            }

            if (node.tier === "category") {
              const category = categoryBySlug.get(node.id);
              const count = category ? (orgsByCategory.get(category)?.length ?? 0) : 0;
              return (
                <span key={node.id} {...shared}>
                  <button
                    type="button"
                    className="ecograph-node ecograph-node-cat"
                    data-category={node.category}
                    data-state={state}
                    aria-pressed={activeCategory === node.id}
                    {...(count ? { "aria-expanded": activeCategory === node.id } : null)}
                    aria-label={
                      count
                        ? `${node.name} — ${count} contributor ${count === 1 ? "organisation" : "organisations"}`
                        : node.name
                    }
                    onPointerEnter={() => {
                      engage();
                      setActive(node.id);
                    }}
                    onFocus={() => {
                      engage();
                      setActive(node.id);
                    }}
                    onClick={() => {
                      engage();
                      setActive(activeCategory === node.id ? null : node.id);
                    }}
                  />
                </span>
              );
            }

            const revealed = state === "lit" || state === "focus";
            return (
              <span key={node.id} {...shared}>
                <a
                  className="ecograph-node ecograph-node-org"
                  href={node.href}
                  target="_blank"
                  rel="noopener"
                  data-category={node.category}
                  data-state={state}
                  data-haslogo={node.logo ? "" : undefined}
                  tabIndex={revealed ? 0 : -1}
                  title={node.name}
                  aria-label={`${node.name}${node.state ? ` (${node.state})` : ""} — opens in a new tab`}
                  onPointerEnter={() => {
                      engage();
                      setActive(node.id);
                    }}
                  onFocus={() => {
                      engage();
                      setActive(node.id);
                    }}
                >
                  {node.logo ? (
                    <motion.img
                      // A thumbnail that tops out around 90px: next/image's
                      // optimisation buys nothing, and these logos share no
                      // intrinsic size to give it. Same call NetworkMap makes.
                      src={node.logo}
                      alt=""
                      loading="lazy"
                      initial={false}
                      animate={{ opacity: revealed ? 1 : 0 }}
                      transition={reducedMotion ? { duration: 0 } : { duration: 0.22 }}
                    />
                  ) : null}
                </a>
                {/* Outside the link, so the node's scale does not blow the
                    text up with it. Its offset tracks the bloom in CSS. */}
                <motion.span
                  className="ecograph-node-name"
                  aria-hidden="true"
                  initial={false}
                  animate={{ opacity: state === "focus" ? 1 : 0 }}
                  transition={reducedMotion ? { duration: 0 } : { duration: 0.2 }}
                >
                  {node.name}
                </motion.span>
              </span>
            );
          })}
        </div>

        {/* The whole hierarchy, linearly, for screen readers: traversing a
            force-directed web by keyboard tells you the shape but not the
            shape's meaning. Names only — every one of these organisations is
            already a link in the directory section above. */}
        <ul className="ecograph-outline">
          {ECOSYSTEM_CATEGORIES.map((category) => {
            const orgs = orgsByCategory.get(category) ?? [];
            return (
              <li key={category}>
                {category}
                {orgs.length ? (
                  <ul>
                    {orgs.map((org) => (
                      <li key={org.name}>
                        {org.name} ({org.state})
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

/** Link rest length by tier. Decorative chords are long and slack so they drape
 *  across the ring instead of pulling their endpoints together. */
const LINK_DISTANCE: Record<EcoNode["tier"], number> = {
  hub: 0,
  category: 118,
  label: 40,
  org: 66,
  decor: 150,
};

const LINK_STRENGTH: Record<EcoNode["tier"], number> = {
  hub: 0,
  category: 0.35,
  label: 0.4,
  org: 0.5,
  decor: 0.04,
};

const CHARGE: Record<EcoNode["tier"], number> = {
  hub: -420,
  category: -240,
  label: -20,
  org: -110,
  decor: -40,
};

/**
 * How firmly each tier is held to its anchor.
 *
 * Captions are held hardest. They are the one thing on the stage that has to
 * stay where it was put — text that wanders is worse than no text — so they
 * win their collisions and the organisations are what move aside. Decorative
 * nodes are held loosest, because drifting is the whole job.
 */
const ANCHOR: Record<EcoNode["tier"], number> = {
  hub: 0,
  category: 0.2,
  label: 0.45,
  // Loose: organisations are what should visibly give way when something
  // blooms. Held any tighter and the displacement is undone within a frame,
  // which is what made the physics invisible.
  org: 0.075,
  decor: 0.045,
};

/**
 * Build a transform string the browser will not rewrite.
 *
 * The node's size rides alongside as the `--s` custom property rather than a
 * `scale()` in the same string, so the chrome can grow while the organisation's
 * name pill — a sibling, not a child — stays at a readable size.
 *
 * React compares its rendered style against what the DOM reports, and the
 * browser normalises what it parsed out of the server HTML — rounding to three
 * decimals and turning a bare `0` into `0px`. Emitting an already-normalised
 * string is what keeps hydration quiet.
 */
function translate(x: number, y: number): string {
  return `translate3d(${round(x)}px, ${round(y)}px, 0px)`;
}

function round(value: number): number {
  return Math.round(value * 1000) / 1000;
}

/** Keep every node inside the stage box, allowing for how big it is right now. */
function clamp(nodes: SimNode[]) {
  for (const node of nodes) {
    if (node.tier === "hub") continue;
    const limitX = BOX.width / 2 - node.r;
    const limitY = BOX.height / 2 - node.r;
    node.x = Math.max(-limitX, Math.min(limitX, node.x ?? 0));
    node.y = Math.max(-limitY, Math.min(limitY, node.y ?? 0));
  }
}

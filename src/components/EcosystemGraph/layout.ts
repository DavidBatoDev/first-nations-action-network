/**
 * Geometry for the membership ecosystem graph.
 *
 * Pure module — no React, no DOM, no d3. It turns the category list and the
 * categorised organisations into nodes with a fixed *anchor* each: the place
 * that node belongs. The simulation in `EcosystemGraph.tsx` then pulls nodes
 * toward those anchors rather than discovering a layout from scratch.
 *
 * Anchoring rather than free-floating buys three things:
 *  - the categories ring the hub in the same order as the pills beside them,
 *    so hovering a pill lights a node the eye can find;
 *  - the layout is identical on every load, and identical on the server and the
 *    client, so the settled graph can be server-rendered and there is no
 *    hydration mismatch and no "nodes fly in from the middle" flash;
 *  - the drift stays a wobble around a known shape instead of a slow wander.
 *
 * Coordinates are in "stage units" on a box centred on the origin, so the edge
 * SVG's viewBox is `-300 -270 600 540`. The component scales them to the real
 * pixel size it has been given.
 */

import type {
  EcosystemCategory,
  EcosystemOrg,
} from "@/lib/ecosystem";

/** The stage box, centred on the origin. Wide enough that an organisation
 *  bloomed to its focus radius still fits inside the far edge of its ring. */
export const BOX = { width: 600, height: 540 } as const;

export type Tier = "hub" | "category" | "label" | "org" | "decor";

/**
 * How a node is currently being treated.
 *  - `rest`  nothing is hovered, or this node is not part of what is
 *  - `dim`   something else is active
 *  - `lit`   this node's branch is active
 *  - `focus` this node itself is hovered or focused
 */
export type NodeState = "rest" | "dim" | "lit" | "focus";

/**
 * Radius per tier and state, in stage units.
 *
 * This is the single source of truth for how big a node is: the simulation's
 * collision force reads it, and the renderer scales the node's chrome by the
 * same number. Size is therefore a physical property — blooming an organisation
 * really does shove its neighbours out of the way.
 */
export const RADIUS: Record<Tier, Record<NodeState, number>> = {
  hub: { rest: 56, dim: 56, lit: 56, focus: 56 },
  category: { rest: 22, dim: 22, lit: 32, focus: 32 },
  // Labels are sized by their text; these are only the floor. See labelRadius.
  label: { rest: 26, dim: 26, lit: 26, focus: 26 },
  // The whole point of the interaction: a dot at rest, readable when bloomed.
  // `lit` stays modest — a whole branch growing at once has to leave room for
  // one of its own to bloom on top of it without shoving the web off the stage.
  org: { rest: 7, dim: 7, lit: 19, focus: 44 },
  decor: { rest: 5, dim: 5, lit: 6, focus: 6 },
};

/** Extra space each tier keeps around itself, on top of its radius. */
export const PADDING: Record<Tier, number> = {
  hub: 10,
  category: 10,
  label: 4,
  org: 5,
  decor: 6,
};

/** Ring radii. Elliptical, because the stage is wider than it is tall.
 *  Exported so tests can normalise a node's anchor back onto its ring — on an
 *  ellipse, distance from the origin varies with angle. */
export const RING = {
  full: {
    category: { rx: 132, ry: 116 },
    org: { rx: 218, ry: 196 },
  },
  compact: {
    category: { rx: 126, ry: 114 },
    org: { rx: 208, ry: 190 },
  },
} as const;

/** How far an organisation may sit from its parent's angle, total, in radians.
 *  Categories are 45 degrees (0.785 rad) apart, so the fan stays inside that to
 *  keep neighbouring branches from tangling. The cap matters most for the
 *  workplace networks, the one branch with eight members; the collision force
 *  spreads whatever the fan alone cannot. */
const MAX_FAN = 0.76;

/**
 * Above this many members, a branch is nested into two rows.
 *
 * One arc can only hold so much: eight organisations anchored to the same
 * radius collide into a single column pressed against the edge of the stage.
 * Alternating them between two radii halves the crowding on each row, so the
 * branch reads as a cluster rather than a chain.
 */
const TWO_ROW_ABOVE = 4;

/** How far the inner row is pulled in, as a fraction of the ring. */
const ROW_INSET = 0.15;
const FAN_PER_ORG = 0.17;

/**
 * Where a category's caption is anchored, relative to its node.
 *
 * Mostly vertical, with only a nudge outward. A caption is a wide, short box,
 * so pushing it straight out along the spoke works at the top and bottom of the
 * ring but is impossible at the sides: "Reconciliation" is 124px wide and the
 * gap between the category ring and the organisation ring is 86, so a radial
 * caption there must overlap something. Offsetting vertically sidesteps the
 * problem entirely — above the node in the top half, below it in the bottom.
 * The caption is a simulation node from here on, so this is only its anchor.
 */
const LABEL_LIFT = 46;
const LABEL_NUDGE = 16;

/** Approximate half-width of a caption, from its character count.
 *
 * Measuring the rendered text would be exact, but it would have to happen after
 * mount and would make the layout differ between the server and the client.
 * Estimating keeps the whole graph deterministic.
 *
 * The true half-width is used, so short captions reserve enough room to stop
 * nodes drifting under them, but it is capped: a circle the full half-width of
 * "Reconciliation" would clear far more vertical space than the text needs and
 * would push a whole branch out of shape.
 */
export const LABEL_MAX_RADIUS = 62;

export function labelRadius(label: string): number {
  const halfWidth = (label.length * 7.6 + 18) / 2;
  return Math.max(RADIUS.label.rest, Math.min(halfWidth, LABEL_MAX_RADIUS));
}

export type EcoNode = {
  id: string;
  tier: Tier;
  /** Category id for a category node, or for anything hanging off one. */
  category?: string;
  /** Visible caption. Label nodes only. */
  label: string;
  /** Full name, used for the accessible label and the title attribute. */
  name: string;
  logo?: string;
  href?: string;
  /** State/territory abbreviation, org nodes only. */
  state?: string;
  /** Where this node belongs. The simulation is pulled toward it. */
  ax: number;
  ay: number;
  /** Deterministic phase offset, so nodes drift out of step with each other. */
  phase: number;
  /** Collision radius floor for this specific node. Labels vary by text. */
  baseRadius: number;
};

export type EcoLink = { id: string; source: string; target: string; tier: Tier };

export type EcoGraph = { nodes: EcoNode[]; links: EcoLink[] };

export const HUB_ID = "__hub";

/** Angle of a category node: clockwise from twelve o'clock, evenly spaced. */
export function categoryAngle(index: number, count: number): number {
  return -Math.PI / 2 + (index / count) * Math.PI * 2;
}

/**
 * Angle of the `index`th of `count` organisations fanned around `parentAngle`.
 * A lone organisation sits exactly on its parent's spoke.
 */
export function orgAngle(
  parentAngle: number,
  index: number,
  count: number,
): number {
  if (count <= 1) return parentAngle;
  const fan = Math.min(MAX_FAN, FAN_PER_ORG * (count - 1));
  return parentAngle + (index / (count - 1) - 0.5) * fan;
}

/**
 * Concentric rings of decorative nodes, as multiples of the category ring.
 *
 * A spider web is radial spokes crossed by concentric threads. The categories
 * and their organisations are the spokes; without something crossing them the
 * graph is a plain star. Each ring sits between the structural rings — one
 * inside the categories, one between categories and organisations, one beyond
 * — and its nodes are chained to each other around the circle, so the threads
 * read as rings rather than more spokes.
 */
const DECOR_RINGS = [0.6, 1.32, 1.95] as const;

/** Decorative nodes in the graph, for a given number of categories. */
export function decorCount(categoryCount: number): number {
  return DECOR_RINGS.length * categoryCount;
}

/**
 * The two nodes a decorative node is tied to: its neighbour around the same
 * ring, and the nearest category spoke.
 *
 * Both are close by — a thread to the next node round and a short tie inward —
 * which is what draws the web rather than a starburst of long chords. Neither
 * is ever an organisation: these dots are texture, not data, so they must not
 * look like they are making a claim about a member.
 */
export function decorEndpoints(
  ring: number,
  index: number,
  categoryIds: string[],
): [string, string] {
  const count = categoryIds.length;
  return [
    decorId(ring, (index + 1) % count),
    categoryIds[(index + 1) % count],
  ];
}

export function decorId(ring: number, index: number): string {
  return `__decor-${ring}-${index}`;
}

/**
 * Build the graph.
 *
 * `orgsByCategory` is keyed by category label (what `groupByCategory` returns).
 * `compact` pulls the rings in for narrow screens.
 */
export function buildGraph(
  categories: readonly EcosystemCategory[],
  orgsByCategory: Map<EcosystemCategory, EcosystemOrg[]>,
  shortLabels: Record<string, string>,
  compact = false,
): EcoGraph {
  const ring = compact ? RING.compact : RING.full;
  const nodes: EcoNode[] = [
    {
      id: HUB_ID,
      tier: "hub",
      label: "",
      name: "First Nations Action Network",
      ax: 0,
      ay: 0,
      phase: 0,
      baseRadius: RADIUS.hub.rest,
    },
  ];
  const links: EcoLink[] = [];
  const categoryIds: string[] = [];

  categories.forEach((category, index) => {
    const angle = categoryAngle(index, categories.length);
    const id = categorySlug(category);
    const cx = Math.cos(angle) * ring.category.rx;
    const cy = Math.sin(angle) * ring.category.ry;
    categoryIds.push(id);

    nodes.push({
      id,
      tier: "category",
      category: id,
      label: shortLabels[category] ?? category,
      name: category,
      ax: cx,
      ay: cy,
      phase: index * 1.31,
      baseRadius: RADIUS.category.rest,
    });
    links.push({ id: `${HUB_ID}->${id}`, source: HUB_ID, target: id, tier: "category" });

    // The caption is its own node, so the physics keeps it clear of everything
    // else instead of letting text sit on top of the web.
    const label = shortLabels[category] ?? category;
    const labelId = `${id}::label`;
    nodes.push({
      id: labelId,
      tier: "label",
      category: id,
      label,
      name: category,
      ax: cx + Math.cos(angle) * LABEL_NUDGE,
      // A node exactly level with the hub counts as bottom-half, so its caption
      // drops below rather than sitting on the spoke.
      ay: cy + (Math.sin(angle) < 0 ? -1 : 1) * LABEL_LIFT,
      phase: index * 1.31 + 0.4,
      baseRadius: labelRadius(label),
    });
    links.push({ id: `${id}->${labelId}`, source: id, target: labelId, tier: "label" });

    const orgs = orgsByCategory.get(category) ?? [];
    orgs.forEach((org, orgIndex) => {
      const orgId = `${id}::${orgIndex}`;
      const a = orgAngle(angle, orgIndex, orgs.length);
      // Big branches alternate between two radii so they do not pile up.
      const inset =
        1 - (orgs.length > TWO_ROW_ABOVE ? orgIndex % 2 : 0) * ROW_INSET;

      nodes.push({
        id: orgId,
        tier: "org",
        category: id,
        label: org.name,
        name: org.name,
        logo: org.logo,
        href: org.href,
        state: org.state,
        ax: Math.cos(a) * ring.org.rx * inset,
        ay: Math.sin(a) * ring.org.ry * inset,
        phase: index * 1.31 + (orgIndex + 1) * 0.77,
        baseRadius: RADIUS.org.rest,
      });
      links.push({ id: `${id}->${orgId}`, source: id, target: orgId, tier: "org" });
    });
  });

  // Decorative threads, added last so they never shift the ids above. Each ring
  // is offset half a slot so its nodes sit between the spokes, and each node is
  // chained to the next one round plus tied inward to a category.
  DECOR_RINGS.forEach((scale, ringIndex) => {
    categories.forEach((_, index) => {
      const angle =
        categoryAngle(index, categories.length) + Math.PI / categories.length;
      const id = decorId(ringIndex, index);

      nodes.push({
        id,
        tier: "decor",
        label: "",
        name: "",
        ax: Math.cos(angle) * ring.category.rx * scale,
        ay: Math.sin(angle) * ring.category.ry * scale,
        phase: ringIndex * 2.1 + index * 0.91,
        baseRadius: RADIUS.decor.rest,
      });

      const [thread, spoke] = decorEndpoints(ringIndex, index, categoryIds);
      links.push({ id: `${id}~${thread}`, source: id, target: thread, tier: "decor" });
      links.push({ id: `${id}~${spoke}`, source: id, target: spoke, tier: "decor" });
    });
  });

  return { nodes, links };
}

/** Stable, URL-safe id for a category label. Used in `data-category`. */
export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

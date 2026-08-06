"use client";

import {
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  forceX,
  forceY,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { Organisation, StateNetwork } from "./networks";

const AN_LOGO = "/assets/logos/action-network-logo.png";

/** Layout box the simulation runs inside. */
const WIDTH = 700;
const HEIGHT = 390;
/** Roughly the card's half-diagonal, so cards never overlap. */
const COLLIDE = 30;

type TreeNode = SimulationNodeDatum & {
  id: string;
  organisation?: Organisation;
  side: "left" | "right";
};

function OrgCard({ organisation }: { organisation: Organisation }) {
  const { name, logo, siteUrl, actionNetworkUrl } = organisation;
  const primaryUrl = siteUrl ?? actionNetworkUrl;
  const inner = logo ? (
    <Image src={logo} alt={name} width={501} height={251} sizes="150px" />
  ) : (
    <span className="orgtree-node-fallback">{name}</span>
  );

  return (
    <div className="orgtree-node">
      {primaryUrl ? (
        <a
          className="orgtree-node-main"
          href={primaryUrl}
          target="_blank"
          rel="noopener"
          aria-label={`${name}${siteUrl ? " website" : " on Action Network"} (opens in a new tab)`}
          title={name}
        >
          {inner}
        </a>
      ) : (
        <span className="orgtree-node-main">{inner}</span>
      )}

      {actionNetworkUrl ? (
        <a
          className="orgtree-node-an"
          href={actionNetworkUrl}
          target="_blank"
          rel="noopener"
          aria-label={`${name} on Action Network (opens in a new tab)`}
          title={`${name} on Action Network`}
        >
          <Image src={AN_LOGO} alt="Action Network" width={774} height={322} sizes="52px" />
        </a>
      ) : null}
    </div>
  );
}

/**
 * Force-directed network for one state — the same simulation family as the
 * hover graph (link + charge + collide), so the nodes and edges move with the
 * same physics. The difference is that this one is asked to *resolve*: gentle
 * left/right and vertical positioning forces give it a readable structure, and
 * a faster cooling schedule settles it into a solid, stable layout instead of
 * drifting.
 */
export default function OrgTree({
  network,
  onPointerEnter,
  onPointerLeave,
}: {
  network: StateNetwork;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const { name, abbr, groupUrl, organisations } = network;
  const [nodes, setNodes] = useState<TreeNode[]>([]);

  const half = Math.ceil(organisations.length / 2);

  useEffect(() => {
    if (!organisations.length) return;

    const graphNodes: TreeNode[] = [
      { id: "__root", side: "left", fx: 0, fy: 0 },
      ...organisations.map((organisation, index) => {
        const side: "left" | "right" = index < half ? "left" : "right";
        return {
          id: organisation.name,
          organisation,
          side,
          // Start tucked behind the root so they visibly spring outwards.
          x: (side === "left" ? -1 : 1) * 16,
          y: (index % half) * 6 - 12,
        };
      }),
    ];

    const links: SimulationLinkDatum<TreeNode>[] = graphNodes
      .filter((node) => node.id !== "__root")
      .map((node) => ({ source: "__root", target: node.id }));

    const simulation = forceSimulation<TreeNode>(graphNodes)
      .force(
        "link",
        forceLink<TreeNode, SimulationLinkDatum<TreeNode>>(links)
          .id((node) => node.id)
          .distance(200)
          .strength(0.05),
      )
      .force("charge", forceManyBody<TreeNode>().strength(-40))
      .force("collide", forceCollide<TreeNode>(COLLIDE))
      // Structure: push each half to its own side of the root…
      .force(
        "x",
        forceX<TreeNode>((node) =>
          node.id === "__root" ? 0 : node.side === "left" ? -215 : 215,
        ).strength(0.5),
      )
      // …and spread them vertically so the branches read in order.
      .force(
        "y",
        forceY<TreeNode>((node) => {
          if (node.id === "__root") return 0;
          const index = graphNodes.indexOf(node) - 1;
          const row = node.side === "left" ? index : index - half;
          const count = node.side === "left" ? half : organisations.length - half;
          // Fixed row pitch keeps the resolved height inside the layout box.
          return (row - (count - 1) / 2) * 66;
        }).strength(0.5),
      )
      .velocityDecay(0.28)
      // Cool quickly so the layout resolves and then holds still.
      .alpha(1)
      .alphaDecay(0.035)
      .on("tick", () => setNodes([...graphNodes]));

    return () => {
      simulation.stop();
    };
  }, [organisations, half]);

  const orgNodes = nodes.filter((node) => node.id !== "__root");

  const root = (
    <>
      <span className="orgtree-root-mark">
        <Image
          src="/assets/logo-on-dark.png"
          alt="First Nations Action Network"
          width={1201}
          height={794}
          sizes="140px"
        />
        <span className="orgtree-root-abbr">{abbr}</span>
      </span>
      <span className="orgtree-root-state">{name}</span>
      {/* Keeps the pin's nib pointing down at the map after the morph. */}
      <span className="orgtree-root-nib" aria-hidden="true" />
    </>
  );

  return (
    <div
      className={`orgtree${organisations.length ? "" : " is-empty"}`}
      style={{ width: WIDTH, height: HEIGHT }}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      role="group"
      aria-label={`First Nations Action Network ${abbr} organisations`}
    >
      {/* Edges follow the simulation, so they always point at the root. */}
      <svg
        className="orgtree-links"
        viewBox={`${-WIDTH / 2} ${-HEIGHT / 2} ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
      >
        {orgNodes.map((node) => (
          <line key={`edge-${node.id}`} x1={0} y1={0} x2={node.x ?? 0} y2={node.y ?? 0} />
        ))}
      </svg>

      {/* Root sits at the centre of the box, where every edge converges.
          The positioning lives on the wrapper so Motion's layout transform on
          the card cannot overwrite the centring translate. */}
      <div className="orgtree-rootslot">
        {groupUrl ? (
          <a
            className="orgtree-root"
            href={groupUrl}
            target="_blank"
            rel="noopener"
            aria-label={`First Nations Action Network ${abbr} group page (opens in a new tab)`}
          >
            {root}
          </a>
        ) : (
          <div className="orgtree-root is-static">{root}</div>
        )}
      </div>

      {orgNodes.map((node, index) => (
        <div
          key={node.id}
          className={`orgtree-branch orgtree-branch-${node.side}`}
          style={{
            left: WIDTH / 2 + (node.x ?? 0),
            top: HEIGHT / 2 + (node.y ?? 0),
          }}
        >
          <motion.div
            className="orgtree-branch-inner"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 320,
              damping: 26,
              delay: 0.05 + index * 0.035,
            }}
          >
            {node.organisation ? <OrgCard organisation={node.organisation} /> : null}
          </motion.div>
        </div>
      ))}
    </div>
  );
}

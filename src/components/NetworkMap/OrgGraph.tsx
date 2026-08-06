"use client";

import {
  forceCenter,
  forceCollide,
  forceLink,
  forceManyBody,
  forceSimulation,
  type Simulation,
  type SimulationLinkDatum,
  type SimulationNodeDatum,
} from "d3-force";
import { motion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { StateNetwork } from "./networks";

const WIDTH = 300;
const HEIGHT = 190;
const NODE_RADIUS = 21;

type GraphNode = SimulationNodeDatum & {
  id: string;
  kind: "root" | "org";
  label: string;
  logo?: string;
};

/**
 * Obsidian-style node/edge graph that springs out of a state pin.
 *
 * A d3-force simulation (charge + link + collide) settles the organisation
 * nodes around a fixed root, so the group "pops out" and jiggles into place the
 * way Obsidian's graph view does. Only organisations we hold a logo for get a
 * node; the rest are represented by the "See more" node.
 */
export default function OrgGraph({
  network,
  onPointerEnter,
  onPointerLeave,
}: {
  network: StateNetwork;
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const withLogos = useMemo(
    () =>
      network.organisations
        .filter((organisation) => organisation.logo)
        .slice(0, 5),
    [network.organisations],
  );
  const [nodes, setNodes] = useState<GraphNode[]>([]);
  const simulationRef = useRef<Simulation<GraphNode, undefined> | null>(null);

  useEffect(() => {
    const graphNodes: GraphNode[] = [
      { id: "root", kind: "root", label: network.abbr, fx: 0, fy: 0 },
      ...withLogos.map((organisation, index) => ({
        id: organisation.name,
        kind: "org" as const,
        label: organisation.name,
        logo: organisation.logo,
        // Start clustered at the pin so they visibly spring outwards.
        x: Math.cos((index / withLogos.length) * Math.PI * 2) * 6,
        y: Math.sin((index / withLogos.length) * Math.PI * 2) * 6,
      })),
    ];

    const links: SimulationLinkDatum<GraphNode>[] = graphNodes
      .filter((node) => node.kind !== "root")
      .map((node) => ({ source: "root", target: node.id }));

    const simulation = forceSimulation<GraphNode>(graphNodes)
      .force(
        "link",
        forceLink<GraphNode, SimulationLinkDatum<GraphNode>>(links)
          .id((node) => node.id)
          .distance(74)
          .strength(0.55),
      )
      .force("charge", forceManyBody<GraphNode>().strength(-260))
      .force("collide", forceCollide<GraphNode>(NODE_RADIUS + 6))
      .force("centre", forceCenter(0, 0).strength(0.06))
      .alpha(1)
      .alphaDecay(0.045)
      .on("tick", () => {
        // Keep every node inside the box so nothing drifts over the pin label.
        const limitX = WIDTH / 2 - NODE_RADIUS - 4;
        const limitY = HEIGHT / 2 - NODE_RADIUS - 4;
        for (const node of graphNodes) {
          if (node.kind === "root") continue;
          node.x = Math.max(-limitX, Math.min(limitX, node.x ?? 0));
          node.y = Math.max(-limitY, Math.min(limitY, node.y ?? 0));
        }
        setNodes([...graphNodes]);
      });

    simulationRef.current = simulation;
    return () => {
      simulation.stop();
    };
  }, [network.abbr, withLogos]);

  const root = nodes.find((node) => node.kind === "root");
  const orgNodes = nodes.filter((node) => node.kind !== "root");

  return (
    <div
      className="orggraph"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <svg
        className="orggraph-edges"
        viewBox={`${-WIDTH / 2} ${-HEIGHT / 2} ${WIDTH} ${HEIGHT}`}
        aria-hidden="true"
        focusable="false"
      >
        {root
          ? orgNodes.map((node) => (
              <line
                key={`edge-${node.id}`}
                x1={root.x ?? 0}
                y1={root.y ?? 0}
                x2={node.x ?? 0}
                y2={node.y ?? 0}
              />
            ))
          : null}
      </svg>

      {orgNodes.map((node) => {
        const left = WIDTH / 2 + (node.x ?? 0);
        const top = HEIGHT / 2 + (node.y ?? 0);

        return (
          <motion.span
            key={node.id}
            className="orggraph-node"
            style={{ left, top }}
            title={node.label}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 340, damping: 20 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={node.logo as string} alt="" />
          </motion.span>
        );
      })}
    </div>
  );
}

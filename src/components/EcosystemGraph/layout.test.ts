import { describe, expect, it } from "vitest";
import {
  ECOSYSTEM_CATEGORIES,
  ECOSYSTEM_SHORT_LABELS,
  groupByCategory,
  type EcosystemOrg,
} from "../../lib/ecosystem";
import {
  BOX,
  buildGraph,
  categoryAngle,
  categorySlug,
  decorCount,
  decorId,
  decorEndpoints,
  HUB_ID,
  labelRadius,
  orgAngle,
  RING,
  RADIUS,
} from "./layout";

const org = (name: string, category: EcosystemOrg["category"]): EcosystemOrg => ({
  name,
  category,
  state: "QLD",
});

function graph(orgs: EcosystemOrg[] = [], compact = false) {
  return buildGraph(
    ECOSYSTEM_CATEGORIES,
    groupByCategory(orgs),
    ECOSYSTEM_SHORT_LABELS,
    compact,
  );
}

const everyCategoryFull = ECOSYSTEM_CATEGORIES.flatMap((category) =>
  [0, 1, 2, 3, 4].map((i) => org(`${category} ${i}`, category)),
);

describe("categoryAngle", () => {
  it("starts at twelve o'clock and runs clockwise", () => {
    expect(categoryAngle(0, 8)).toBeCloseTo(-Math.PI / 2);
    expect(categoryAngle(2, 8)).toBeCloseTo(0);
    expect(categoryAngle(4, 8)).toBeCloseTo(Math.PI / 2);
  });
});

describe("orgAngle", () => {
  it("puts a lone organisation on its parent's spoke", () => {
    expect(orgAngle(1.2, 0, 1)).toBe(1.2);
  });

  it("fans several symmetrically about the parent", () => {
    const angles = [0, 1, 2].map((i) => orgAngle(0, i, 3));
    expect(angles[1]).toBeCloseTo(0);
    expect(angles[0]).toBeCloseTo(-angles[2]);
  });

  it("keeps the fan narrower than the gap between two categories", () => {
    const gap = (Math.PI * 2) / ECOSYSTEM_CATEGORIES.length;
    for (const count of [2, 3, 5, 9]) {
      const spread = orgAngle(0, count - 1, count) - orgAngle(0, 0, count);
      expect(spread).toBeLessThan(gap);
    }
  });
});

describe("RADIUS", () => {
  it("blooms an organisation from a dot to near hub size", () => {
    expect(RADIUS.org.rest).toBeLessThan(10);
    expect(RADIUS.org.focus).toBeGreaterThan(RADIUS.org.lit);
    // "Almost as big as the centre node" — close to the hub, but not past it.
    expect(RADIUS.org.focus).toBeGreaterThan(RADIUS.hub.rest * 0.75);
    expect(RADIUS.org.focus).toBeLessThan(RADIUS.hub.rest);
  });

  it("grows a category when its branch is live", () => {
    expect(RADIUS.category.lit).toBeGreaterThan(RADIUS.category.rest);
  });
});

describe("labelRadius", () => {
  it("scales with the length of the caption", () => {
    expect(labelRadius("Reconciliation")).toBeGreaterThan(labelRadius("Allies"));
  });

  it("never drops below the floor", () => {
    expect(labelRadius("")).toBe(RADIUS.label.rest);
  });
});

describe("decorEndpoints", () => {
  it("ties each thread node to its neighbour round the ring and to a spoke", () => {
    const ids = ECOSYSTEM_CATEGORIES.map(categorySlug);
    for (let ring = 0; ring < 3; ring += 1) {
      for (let i = 0; i < ids.length; i += 1) {
        const [thread, spoke] = decorEndpoints(ring, i, ids);
        expect(thread).not.toBe(spoke);
        // The thread runs to the next node in the same ring, never across it.
        expect(thread).toBe(decorId(ring, (i + 1) % ids.length));
        expect(ids).toContain(spoke);
      }
    }
  });
});

describe("buildGraph", () => {
  it("puts the hub at the origin", () => {
    const hub = graph().nodes.find((node) => node.id === HUB_ID);
    expect(hub).toMatchObject({ tier: "hub", ax: 0, ay: 0 });
  });

  it("rings the categories in the order they are declared", () => {
    const categories = graph().nodes.filter((node) => node.tier === "category");
    expect(categories.map((node) => node.name)).toEqual([...ECOSYSTEM_CATEGORIES]);
    expect(categories[0].ax).toBeCloseTo(0);
    expect(categories[0].ay).toBeLessThan(0);
  });

  it("gives every category exactly one caption node", () => {
    const labels = graph().nodes.filter((node) => node.tier === "label");
    expect(labels).toHaveLength(ECOSYSTEM_CATEGORIES.length);
    expect(new Set(labels.map((node) => node.category)).size).toBe(
      ECOSYSTEM_CATEGORIES.length,
    );
    // Sized from its own text, so the physics reserves room for the words.
    for (const label of labels) {
      expect(label.baseRadius).toBe(labelRadius(label.label));
    }
  });

  it("links every category to the hub and every organisation to its category", () => {
    const { links } = graph([org("Wynnum Allies", "Ally organisations")]);
    expect(links.filter((link) => link.tier === "category")).toHaveLength(
      ECOSYSTEM_CATEGORIES.length,
    );
    expect(links.filter((link) => link.tier === "org")).toEqual([
      expect.objectContaining({ source: categorySlug("Ally organisations") }),
    ]);
  });

  it("draws all eight categories even when none has members", () => {
    expect(graph().nodes.filter((node) => node.tier === "category")).toHaveLength(8);
  });

  it("weaves decorative threads between the spokes, never onto organisations", () => {
    const { nodes, links } = graph(everyCategoryFull);
    const decor = nodes.filter((node) => node.tier === "decor");
    expect(decor).toHaveLength(decorCount(ECOSYSTEM_CATEGORIES.length));

    const orgIds = new Set(
      nodes.filter((node) => node.tier === "org").map((node) => node.id),
    );
    for (const node of decor) {
      const attached = links.filter(
        (link) => link.source === node.id || link.target === node.id,
      );
      // Two of its own plus the thread arriving from the previous node round:
      // the chaining is what draws a web instead of a starburst.
      expect(attached.length).toBeGreaterThanOrEqual(3);
      for (const link of attached) {
        expect(orgIds.has(link.source)).toBe(false);
        expect(orgIds.has(link.target)).toBe(false);
      }
    }
  });

  it("closes each decorative ring into a loop", () => {
    const { links } = graph();
    for (let ring = 0; ring < 3; ring += 1) {
      const threads = links.filter(
        (link) => link.source.startsWith(`__decor-${ring}-`) &&
          link.target.startsWith(`__decor-${ring}-`),
      );
      // One thread per node means the ring joins up rather than trailing off.
      expect(threads).toHaveLength(ECOSYSTEM_CATEGORIES.length);
    }
  });

  it("carries no data on the decorative nodes", () => {
    for (const node of graph().nodes.filter((n) => n.tier === "decor")) {
      expect(node.href).toBeUndefined();
      expect(node.logo).toBeUndefined();
      expect(node.label).toBe("");
    }
  });

  it("keeps every anchor inside the stage box, even when bloomed", () => {
    for (const compact of [false, true]) {
      for (const node of graph(everyCategoryFull, compact).nodes) {
        // The widest a node ever gets, so a bloomed organisation still fits.
        const room =
          node.tier === "label"
            ? node.baseRadius
            : Math.max(...Object.values(RADIUS[node.tier]));
        expect(Math.abs(node.ax)).toBeLessThanOrEqual(BOX.width / 2 - room);
        expect(Math.abs(node.ay)).toBeLessThanOrEqual(BOX.height / 2 - room);
      }
    }
  });

  it("pulls the rings in when compact", () => {
    const wide = graph().nodes.filter((n) => n.tier === "category")[2];
    const tight = graph([], true).nodes.filter((n) => n.tier === "category")[2];
    expect(Math.abs(tight.ax)).toBeLessThan(Math.abs(wide.ax));
  });
});

describe("categorySlug", () => {
  it("produces a stable, unique slug per category", () => {
    const slugs = ECOSYSTEM_CATEGORIES.map(categorySlug);
    expect(new Set(slugs).size).toBe(slugs.length);
    expect(categorySlug("First Nations organisations")).toBe("first-nations-organisations");
  });
});

describe("large branches", () => {
  /** How far out on its ring a node sits. The ring is an ellipse, so distance
   *  from the origin varies with angle — normalise it away. */
  const rows = (orgs: EcosystemOrg[]) =>
    new Set(
      graph(orgs)
        .nodes.filter((n) => n.tier === "org")
        .map((n) =>
          Math.hypot(n.ax / RING.full.org.rx, n.ay / RING.full.org.ry).toFixed(2),
        ),
    );

  it("nests a branch of more than four into two rows", () => {
    const many = [0, 1, 2, 3, 4, 5, 6, 7].map((i) =>
      org(`Workplace ${i}`, "Workplace networks"),
    );
    // Two rows, so eight members do not pile onto a single arc.
    expect(rows(many).size).toBe(2);
  });

  it("keeps a small branch on a single row", () => {
    const few = [0, 1, 2].map((i) => org(`Ally ${i}`, "Ally organisations"));
    expect(rows(few).size).toBe(1);
  });
});

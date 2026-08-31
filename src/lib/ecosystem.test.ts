import { describe, expect, it } from "vitest";
import type { StateNetwork } from "@/components/NetworkMap";
import {
  ECOSYSTEM_CATEGORIES,
  ecosystemOrgs,
  groupByCategory,
} from "./ecosystem";

function network(
  abbr: string,
  organisations: StateNetwork["organisations"],
): StateNetwork {
  return {
    name: abbr,
    abbr,
    capital: { name: `${abbr} capital`, lngLat: [0, 0] },
    organisations,
  };
}

describe("ecosystemOrgs", () => {
  it("keeps organisations with a known category", () => {
    const orgs = ecosystemOrgs([
      network("QLD", [{ name: "Wynnum Allies", category: "Ally organisations" }]),
    ]);

    expect(orgs).toEqual([
      {
        name: "Wynnum Allies",
        category: "Ally organisations",
        logo: undefined,
        href: undefined,
        state: "QLD",
      },
    ]);
  });

  it("drops organisations with no category", () => {
    expect(ecosystemOrgs([network("SA", [{ name: "Uncategorised" }])])).toEqual([]);
  });

  it("drops organisations with an unrecognised category", () => {
    const orgs = ecosystemOrgs([
      network("SA", [{ name: "Odd one out", category: "Sporting clubs" }]),
    ]);

    expect(orgs).toEqual([]);
  });

  it("prefers the organisation's own site over its Action Network page", () => {
    const [org] = ecosystemOrgs([
      network("NSW", [
        {
          name: "Orange Together",
          category: "Community groups",
          siteUrl: "https://orangetogether.org.au/",
          actionNetworkUrl: "https://actionnetwork.org/groups/orange-together",
        },
      ]),
    ]);

    expect(org.href).toBe("https://orangetogether.org.au/");
  });

  it("falls back to the Action Network page when there is no site", () => {
    const [org] = ecosystemOrgs([
      network("SA", [
        {
          name: "Uraidla Reconciliation",
          category: "Reconciliation groups",
          actionNetworkUrl: "https://actionnetwork.org/groups/uraidla-reconciliation",
        },
      ]),
    ]);

    expect(org.href).toBe(
      "https://actionnetwork.org/groups/uraidla-reconciliation",
    );
  });

  it("carries the logo and the state abbreviation through", () => {
    const [org] = ecosystemOrgs([
      network("QLD", [
        {
          name: "FAIRA",
          category: "First Nations organisations",
          logo: "/assets/logos/faira.png",
        },
      ]),
    ]);

    expect(org.logo).toBe("/assets/logos/faira.png");
    expect(org.state).toBe("QLD");
  });

  it("flattens across every state", () => {
    const orgs = ecosystemOrgs([
      network("QLD", [{ name: "A", category: "Ally organisations" }]),
      network("SA", [{ name: "B", category: "Community groups" }]),
    ]);

    expect(orgs.map((org) => org.name)).toEqual(["A", "B"]);
  });
});

describe("groupByCategory", () => {
  it("returns every category, in ring order, even when empty", () => {
    const grouped = groupByCategory([]);

    expect([...grouped.keys()]).toEqual([...ECOSYSTEM_CATEGORIES]);
    expect([...grouped.values()].every((orgs) => orgs.length === 0)).toBe(true);
  });

  it("files each organisation under its own category", () => {
    const orgs = ecosystemOrgs([
      network("QLD", [
        { name: "Wynnum Allies", category: "Ally organisations" },
        { name: "FAIRA", category: "First Nations organisations" },
        { name: "First Nations Allies", category: "Ally organisations" },
      ]),
    ]);
    const grouped = groupByCategory(orgs);

    expect(grouped.get("Ally organisations")?.map((org) => org.name)).toEqual([
      "Wynnum Allies",
      "First Nations Allies",
    ]);
    expect(
      grouped.get("First Nations organisations")?.map((org) => org.name),
    ).toEqual(["FAIRA"]);
    expect(grouped.get("Social enterprises")).toEqual([]);
  });
});

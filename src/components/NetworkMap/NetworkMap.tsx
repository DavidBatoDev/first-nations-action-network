"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { geoMercator } from "d3-geo";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { AnimatePresence, motion } from "motion/react";
import * as THREE from "three";
import {
  fetchNetworks,
  NETWORKS_URL,
  networksByName,
  type StateNetwork,
} from "./networks";
import MapLegend from "./MapLegend";
import OrgGraph from "./OrgGraph";
import OrgTree from "./OrgTree";
import StatePin from "./StatePin";

/* ------------------------------------------------------------------ *
 * Config
 * ------------------------------------------------------------------ */

const DEPTH = 0.42;
const FIT = 14.6;
const MIN_RING_AREA = 0.0006;
/** How far a state lifts when hovered, in local units. */
const LIFT = 0.42;
const EXCLUDED = new Set(["Macquarie Island", "Lord Howe Island"]);

/** Light palette, matching the existing membership-page map. */
const COLOR = {
  bg: "#ffffff",
  cap: "#f7efdf",
  capHover: "#ffeb8a",
  wall: "#d97c00",
  wallHover: "#b56300",
  border: "#b56300",
  island: "#d97c00",
} as const;

/** Torres Strait Islands — [longitude, latitude]. */
const TORRES_STRAIT: [number, number][] = [
  [142.22, -9.25],
  [142.62, -9.38],
  [143.77, -9.58],
  [143.4, -9.75],
  [142.77, -9.9],
  [144.05, -9.92],
  [142.18, -9.95],
  [143.07, -10.05],
  [142.14, -10.12],
  [142.26, -10.2],
  [142.82, -10.2],
  [142.219, -10.583],
];

/* ------------------------------------------------------------------ *
 * GeoJSON types (minimal)
 * ------------------------------------------------------------------ */

type LngLat = [number, number];
type Ring = LngLat[];
type Feature = {
  properties: { name?: string };
  geometry:
    | { type: "Polygon"; coordinates: Ring[] }
    | { type: "MultiPolygon"; coordinates: Ring[][] };
};
type FeatureCollection = { features: Feature[] };

function toPolygons(feature: Feature): Ring[][] {
  return feature.geometry.type === "MultiPolygon"
    ? feature.geometry.coordinates
    : [feature.geometry.coordinates];
}

function eachCoordinate(features: Feature[], visit: (coordinate: LngLat) => void) {
  for (const feature of features) {
    for (const polygon of toPolygons(feature)) {
      for (const ring of polygon) for (const coordinate of ring) visit(coordinate);
    }
  }
}

/* ------------------------------------------------------------------ *
 * Projection
 * ------------------------------------------------------------------ */

type Project = (coordinate: LngLat) => [number, number] | null;

/**
 * d3-geo handles the geographic maths, but the fit is computed from *planar*
 * projected bounds instead of `fitSize`. Natural Earth winds exterior rings
 * clockwise, and d3's spherical convention then reads each polygon as the whole
 * globe minus the state, which collapses `fitSize` and `geoCentroid`.
 */
function buildProjector(features: Feature[]): Project {
  const projection = geoMercator().scale(1).translate([0, 0]);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  eachCoordinate(features, (coordinate) => {
    const point = projection(coordinate);
    if (!point) return;
    minX = Math.min(minX, point[0]);
    maxX = Math.max(maxX, point[0]);
    minY = Math.min(minY, point[1]);
    maxY = Math.max(maxY, point[1]);
  });

  const scale = FIT / Math.max(maxX - minX || 1, maxY - minY || 1);
  const centreX = (minX + maxX) / 2;
  const centreY = (minY + maxY) / 2;

  return (coordinate) => {
    const point = projection(coordinate);
    if (!point) return null;
    return [(point[0] - centreX) * scale, -(point[1] - centreY) * scale];
  };
}

/* ------------------------------------------------------------------ *
 * Geometry helpers
 * ------------------------------------------------------------------ */

function ringToVectors(ring: Ring, project: Project) {
  const points: THREE.Vector2[] = [];
  for (const coordinate of ring) {
    const projected = project(coordinate);
    if (projected) points.push(new THREE.Vector2(projected[0], projected[1]));
  }
  return points;
}

function signedArea2(points: THREE.Vector2[]) {
  let total = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    total += points[j].x * points[i].y - points[i].x * points[j].y;
  }
  return total;
}

function polygonCentroid(points: THREE.Vector2[]) {
  const area2 = signedArea2(points);
  if (Math.abs(area2) < 1e-9) return points[0]?.clone() ?? new THREE.Vector2();
  let x = 0;
  let y = 0;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const cross = points[j].x * points[i].y - points[i].x * points[j].y;
    x += (points[j].x + points[i].x) * cross;
    y += (points[j].y + points[i].y) * cross;
  }
  return new THREE.Vector2(x / (3 * area2), y / (3 * area2));
}

function dashedRing(points: THREE.Vector2[]) {
  const closed = [...points, points[0]];
  const geometry = new THREE.BufferGeometry().setFromPoints(
    closed.map((point) => new THREE.Vector3(point.x, point.y, DEPTH + 0.012)),
  );
  const line = new THREE.Line(
    geometry,
    new THREE.LineDashedMaterial({
      color: COLOR.border,
      dashSize: 0.15,
      gapSize: 0.11,
      transparent: true,
      opacity: 0.7,
    }),
  );
  line.computeLineDistances();
  return line;
}

/* ------------------------------------------------------------------ *
 * Map construction (one mesh per state so states can be highlighted)
 * ------------------------------------------------------------------ */

type StatePart = {
  name: string;
  network?: StateNetwork;
  geometry: THREE.ExtrudeGeometry;
  borders: THREE.Group;
  centroid: THREE.Vector2;
  /** Where the pin is planted — the state capital. */
  pin: THREE.Vector2;
  /** Projected bounds of the largest ring, used to size the imprinted label. */
  bounds: THREE.Box2;
};

type BuiltMap = { states: StatePart[]; islands: THREE.Vector3[] };

function buildMap(
  collection: FeatureCollection,
  byName: Map<string, StateNetwork>,
): BuiltMap {
  const features = collection.features.filter(
    (feature) => !EXCLUDED.has(feature.properties?.name ?? ""),
  );
  const project = buildProjector(features);
  const states: StatePart[] = [];

  for (const feature of features) {
    const name = feature.properties?.name ?? "";
    const shapes: THREE.Shape[] = [];
    const borders = new THREE.Group();
    let largestRing: THREE.Vector2[] | null = null;
    let largestArea = 0;

    for (const polygon of toPolygons(feature)) {
      const [outerRing, ...holeRings] = polygon;
      const outer = ringToVectors(outerRing, project);
      if (outer.length < 3) continue;
      const area = Math.abs(signedArea2(outer)) / 2;
      if (area < MIN_RING_AREA) continue;

      if (area > largestArea) {
        largestArea = area;
        largestRing = outer;
      }

      const shape = new THREE.Shape(outer);
      const holes = holeRings
        .map((ring) => ringToVectors(ring, project))
        .filter((ring) => ring.length >= 3);
      for (const hole of holes) shape.holes.push(new THREE.Path(hole));
      shapes.push(shape);

      for (const ring of [outer, ...holes]) borders.add(dashedRing(ring));
    }

    if (!shapes.length || !largestRing) continue;

    const network = byName.get(name);
    const centroid = polygonCentroid(largestRing);
    // Plant the pin on the state capital, falling back to the centroid.
    const capital = network?.capital
      ? project(network.capital.lngLat)
      : null;

    states.push({
      name,
      network,
      geometry: new THREE.ExtrudeGeometry(shapes, {
        depth: DEPTH,
        bevelEnabled: false,
        curveSegments: 1,
      }),
      borders,
      centroid,
      pin: capital ? new THREE.Vector2(capital[0], capital[1]) : centroid,
      bounds: new THREE.Box2().setFromPoints(largestRing),
    });
  }

  const islands: THREE.Vector3[] = [];
  for (const coordinate of TORRES_STRAIT) {
    const projected = project(coordinate);
    if (projected) {
      islands.push(new THREE.Vector3(projected[0], projected[1], DEPTH + 0.07));
    }
  }

  return { states, islands };
}

/* ------------------------------------------------------------------ *
 * Scene pieces
 * ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ *
 * Imprinted state labels
 * ------------------------------------------------------------------ */

/** Resolves the brand serif stack to a family name usable on a 2D canvas. */
function resolveSerifFamily() {
  const probe = document.createElement("span");
  probe.style.fontFamily = "var(--serif)";
  probe.style.position = "absolute";
  probe.style.visibility = "hidden";
  document.body.appendChild(probe);
  const family = getComputedStyle(probe).fontFamily || "Georgia, serif";
  probe.remove();
  return family;
}

/**
 * Draws a state label into a canvas texture. The text is drawn twice — a pale
 * highlight offset down-right beneath a dark fill — which reads as engraved
 * into the map surface rather than printed on top.
 */
function makeLabelTexture(text: string, family: string) {
  const scale = 4;
  const fontSize = 34;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return null;

  context.font = `900 ${fontSize}px ${family}`;
  const metrics = context.measureText(text);
  const padding = 14;
  const width = Math.ceil(metrics.width + padding * 2);
  const height = Math.ceil(fontSize * 1.6);

  canvas.width = width * scale;
  canvas.height = height * scale;
  context.scale(scale, scale);
  context.font = `900 ${fontSize}px ${family}`;
  context.textAlign = "center";
  context.textBaseline = "middle";

  // Highlight below-right, then the engraved dark fill on top.
  context.fillStyle = "rgba(255, 255, 255, 0.75)";
  context.fillText(text, width / 2 + 1.1, height / 2 + 1.1);
  context.fillStyle = "rgba(84, 62, 30, 0.52)";
  context.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return { texture, aspect: width / height };
}

/** Flat, imprinted labels sitting on each state's top surface. */
function StateLabels({ states }: { states: StatePart[] }) {
  // Client-only: this renders inside <Canvas>, which mounts after the fetch.
  const family = useMemo(() => resolveSerifFamily(), []);

  const labels = useMemo(() => {
    return states
      .filter((part) => part.network)
      .map((part) => {
        const spanX = part.bounds.max.x - part.bounds.min.x;
        // Long names only where the state is wide enough to carry them.
        const label = spanX > 3.6 ? part.name.toUpperCase() : part.network!.abbr;
        const made = makeLabelTexture(label, family);
        if (!made) return null;
        // Fit the label to roughly 62% of the state's width.
        const width = Math.min(spanX * 0.62, 3.4);
        return {
          name: part.name,
          texture: made.texture,
          width,
          height: width / made.aspect,
          centre: part.centroid,
        };
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [family, states]);

  useEffect(() => {
    return () => labels.forEach((label) => label.texture.dispose());
  }, [labels]);

  return (
    <group>
      {labels.map((label) => (
        <mesh
          key={label.name}
          position={[label.centre.x, label.centre.y, DEPTH + 0.014]}
          raycast={() => null}
        >
          <planeGeometry args={[label.width, label.height]} />
          <meshBasicMaterial
            map={label.texture}
            transparent
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
      ))}
    </group>
  );
}

/** Focus framing: closer and lower than the overview camera. */
const FOCUS_DISTANCE = 9.2;
const FOCUS_ANGLE = (32 * Math.PI) / 180;

/**
 * Overview camera with pointer parallax, plus a focus mode that flies to a
 * single state, centring it and dropping to a lower angle.
 */
function CameraRig({
  parallax,
  focus,
}: {
  parallax: boolean;
  focus: { x: number; y: number } | null;
}) {
  const { camera } = useThree();
  const base = useMemo(() => new THREE.Vector3(0, 16.7, 8.6), []);
  const targetPosition = useMemo(() => new THREE.Vector3(), []);
  const targetLook = useMemo(() => new THREE.Vector3(), []);
  const currentLook = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state, delta) => {
    if (focus) {
      // The map group is rotated -90deg about X, so local (x, y) sits at
      // world (x, DEPTH, -y).
      targetLook.set(focus.x, DEPTH, -focus.y);
      targetPosition.set(
        focus.x,
        DEPTH + Math.sin(FOCUS_ANGLE) * FOCUS_DISTANCE,
        -focus.y + Math.cos(FOCUS_ANGLE) * FOCUS_DISTANCE,
      );
    } else {
      targetLook.set(0, 0, 0);
      if (parallax) {
        targetPosition.set(
          base.x + state.pointer.x * 3.4,
          base.y - state.pointer.y * 3.2,
          base.z + Math.abs(state.pointer.x) * 1.1,
        );
      } else {
        targetPosition.copy(base);
      }
    }

    const step = Math.min(1, delta * 2.6);
    camera.position.lerp(targetPosition, step);
    currentLook.current.lerp(targetLook, step);
    camera.lookAt(currentLook.current);
  });

  return null;
}

/**
 * Radial-gradient sprite texture: white-hot core falling off through orange to
 * transparent. Drawn on a canvas so the falloff is smooth, and used on a sprite
 * so it always faces the camera — which is what makes it read as a glow rather
 * than a flat disc. Normal alpha blending is used instead of additive because
 * the map sits on a light background, where additive would just blow out white.
 */
function makeGlowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.12, "rgba(255, 250, 235, 0.98)");
  gradient.addColorStop(0.26, "rgba(255, 205, 120, 0.9)");
  gradient.addColorStop(0.44, "rgba(245, 150, 25, 0.62)");
  gradient.addColorStop(0.68, "rgba(217, 124, 0, 0.26)");
  gradient.addColorStop(1, "rgba(217, 124, 0, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/** Twinkling neon glows marking the Torres Strait Islands. */
function TorresStraitIslands({ points }: { points: THREE.Vector3[] }) {
  const glow = useMemo(() => makeGlowTexture(), []);
  const sprites = useRef<(THREE.Sprite | null)[]>([]);
  const cores = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  useEffect(() => {
    return () => glow?.dispose();
  }, [glow]);

  useFrame((state) => {
    // One shared phase so every island pulses in unison.
    const twinkle = 0.5 + 0.5 * Math.sin(state.clock.elapsedTime * 2.2);

    sprites.current.forEach((sprite, index) => {
      if (!sprite) return;
      const material = sprite.material as THREE.SpriteMaterial;
      material.opacity = 0.45 + twinkle * 0.55;
      const scale = 0.5 + twinkle * 0.26;
      sprite.scale.set(scale, scale, 1);
      const core = cores.current[index];
      if (core) core.opacity = 0.6 + twinkle * 0.4;
    });
  });

  if (!glow) return null;

  return (
    <group>
      {points.map((position, index) => (
        <group key={index} position={position}>
          {/* The glow halo, always facing the camera. */}
          <sprite
            ref={(sprite) => {
              sprites.current[index] = sprite;
            }}
            scale={[0.6, 0.6, 1]}
          >
            <spriteMaterial
              map={glow}
              transparent
              depthWrite={false}
              toneMapped={false}
            />
          </sprite>
          {/* A small white-hot centre so the core reads as a light source. */}
          <mesh>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial
              ref={(material) => {
                cores.current[index] = material;
              }}
              color="#ffffff"
              transparent
              toneMapped={false}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/** One state: highlights and lifts on hover, and anchors its org tree. */
function StateBody({
  part,
  active,
  onEnter,
  onPin,
}: {
  part: StatePart;
  active: boolean;
  onEnter: () => void;
  onPin: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const interactive = Boolean(part.network);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;
    const target = active ? LIFT : 0;
    group.position.z += (target - group.position.z) * Math.min(1, delta * 8);
  });

  return (
    <group ref={groupRef}>
      <mesh
        geometry={part.geometry}
        onPointerOver={
          interactive
            ? (event) => {
                event.stopPropagation();
                document.body.style.cursor = "pointer";
                onEnter();
              }
            : undefined
        }
        // Deliberately no onPointerOut close: lifting the state moves the mesh
        // out from under the cursor, which flickered open/closed. Closing is
        // handled by leaving the stage or clicking away.
        onPointerOut={
          interactive
            ? () => {
                document.body.style.cursor = "";
              }
            : undefined
        }
        onClick={
          interactive
            ? (event) => {
                event.stopPropagation();
                onPin();
              }
            : undefined
        }
      >
        <meshStandardMaterial
          attach="material-0"
          color={active ? COLOR.capHover : COLOR.cap}
          emissive={active ? COLOR.wallHover : "#000000"}
          emissiveIntensity={active ? 0.12 : 0}
          roughness={0.7}
          metalness={0.04}
        />
        <meshStandardMaterial
          attach="material-1"
          color={active ? COLOR.wallHover : COLOR.wall}
          roughness={0.45}
          metalness={0.15}
        />
      </mesh>
      <primitive object={part.borders} />
    </group>
  );
}

type Anchor = { name: string; x: number; y: number };

/**
 * Keeps the DOM overlay in sync with the 3D scene.
 *
 * The pins and the organisation tree are rendered as ordinary DOM inside the
 * stage (not through drei's <Html> portal) so that React events fire normally.
 * Each frame this projects the anchor's world position to pixels and writes it
 * straight to the element's transform, which is cheap and never drifts.
 */
function AnchorSync({
  anchors,
  active,
  overlayRef,
}: {
  anchors: Anchor[];
  active: string | null;
  overlayRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { camera, size } = useThree();
  const vector = useMemo(() => new THREE.Vector3(), []);

  useFrame(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    for (const anchor of anchors) {
      const node = overlay.querySelector<HTMLElement>(
        `[data-anchor="${anchor.name}"]`,
      );
      if (!node) continue;

      // The map group is rotated -90deg about X, so local (x, y, z)
      // becomes world (x, z, -y).
      const lift = active === anchor.name ? LIFT : 0;
      vector.set(anchor.x, DEPTH + lift, -anchor.y).project(camera);

      const x = (vector.x * 0.5 + 0.5) * size.width;
      const y = (-vector.y * 0.5 + 0.5) * size.height;
      // -100% Y so the anchor's bottom (the pin nib) lands on the map point.
      node.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -100%)`;

      // Near the top of the canvas (Darwin/NT) the hover label would be clipped,
      // so flag the anchor and let CSS drop the label below the pin instead.
      node.classList.toggle("is-near-top", y < 96);
    }
  });

  return null;
}

function MapScene({
  data,
  active,
  onEnter,
  onPin,
}: {
  data: BuiltMap;
  active: string | null;
  onEnter: (name: string) => void;
  onPin: (name: string) => void;
}) {
  return (
    // Lay the map flat: shape XY becomes ground XZ, extrusion points up (+Y).
    <group rotation={[-Math.PI / 2, 0, 0]}>
      {data.states.map((part) => (
        <StateBody
          key={part.name}
          part={part}
          active={active === part.name}
          onEnter={() => onEnter(part.name)}
          onPin={() => onPin(part.name)}
        />
      ))}
      <TorresStraitIslands points={data.islands} />
      <StateLabels states={data.states} />
    </group>
  );
}

function usePrefersReducedMotion() {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    query.addEventListener("change", onStoreChange);
    return () => query.removeEventListener("change", onStoreChange);
  }, []);

  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/* ------------------------------------------------------------------ *
 * Public component
 * ------------------------------------------------------------------ */

export type NetworkMapProps = {
  /** Australia states GeoJSON (Natural Earth 1:10m admin-1). */
  geoJsonUrl?: string;
  /** State networks + organisations; editable without a rebuild. */
  networksUrl?: string;
  /** Show the legend overlay in the top-left of the map. */
  showLegend?: boolean;
  /** Any CSS length for the map stage height. */
  height?: string;
  /** Extra classes on the stage element. */
  className?: string;
};

/**
 * Interactive 3D map of Australia showing First Nations Action Network state
 * networks. Hovering a pin springs out a force-directed graph of that state's
 * organisations; clicking zooms into the state and resolves the full network
 * tree. Data is fetched at runtime from `networksUrl`.
 */
export default function NetworkMap({
  geoJsonUrl = "/australia-states.json",
  networksUrl = NETWORKS_URL,
  showLegend = true,
  height,
  className,
}: NetworkMapProps = {}) {
  const [data, setData] = useState<BuiltMap | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** Hovered state — shows the compact icon preview. */
  const [hovered, setHovered] = useState<string | null>(null);
  /** Clicked state — zooms in and shows the full organisation tree. */
  const [focused, setFocused] = useState<string | null>(null);
  const reducedMotion = usePrefersReducedMotion();
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    // Geometry and network data are both fetched at runtime, so the
    // organisations can be edited in public/fnan-networks.json without a build.
    Promise.all([
      fetch(geoJsonUrl).then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json() as Promise<FeatureCollection>;
      }),
      fetchNetworks(networksUrl),
    ])
      .then(([collection, networks]) => {
        if (!cancelled) setData(buildMap(collection, networksByName(networks)));
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setError(cause instanceof Error ? cause.message : "Unknown error");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [geoJsonUrl, networksUrl]);

  useEffect(() => {
    return () => {
      window.clearTimeout(closeTimer.current);
      document.body.style.cursor = "";
    };
  }, []);

  /** Escape returns to the overview. */
  useEffect(() => {
    if (!focused) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFocused(null);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [focused]);

  const hoverOpen = useCallback(
    (name: string) => {
      if (focused) return;
      window.clearTimeout(closeTimer.current);
      setHovered(name);
    },
    [focused],
  );

  const hoverClose = useCallback(() => {
    if (focused) return;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setHovered(null), 260);
  }, [focused]);

  const focus = useCallback((name: string) => {
    window.clearTimeout(closeTimer.current);
    setHovered(null);
    // Switching straight from one state to the next: the camera re-targets and
    // flies directly, and the outgoing card collapses back onto its own pin.
    setFocused(name);
  }, []);

  const anchors = useMemo<Anchor[]>(
    () =>
      (data?.states ?? [])
        .filter((part) => part.network)
        .map((part) => ({
          name: part.name,
          x: part.pin.x,
          y: part.pin.y,
        })),
    [data],
  );

  const activeName = focused ?? hovered;
  const activePart = data?.states.find((part) => part.name === activeName);
  const focusedPart = data?.states.find((part) => part.name === focused);

  return (
    <div
      className={`map3d-stage${focused ? " is-focused" : ""}${
        className ? ` ${className}` : ""
      }`}
      style={height ? ({ "--map3d-height": height } as React.CSSProperties) : undefined}
      onPointerLeave={() => {
        if (!focused) setHovered(null);
      }}
    >
      {error ? (
        <p className="map3d-status" role="alert">
          The map could not load ({error}).
        </p>
      ) : !data ? (
        <p className="map3d-status" role="status">
          Building the map&hellip;
        </p>
      ) : null}

      {data ? (
        <>
          {showLegend && !focused ? (
            <MapLegend
              networks={anchors.length}
              organisations={data.states.reduce(
                (total, part) => total + (part.network?.organisations.length ?? 0),
                0,
              )}
            />
          ) : null}

          <Canvas
            camera={{ position: [0, 16.7, 8.6], fov: 42 }}
            dpr={[1, 2]}
            gl={{ antialias: true }}
            style={{ background: COLOR.bg }}
            onPointerMissed={() => {
              setHovered(null);
              setFocused(null);
            }}
          >
            <ambientLight intensity={1.15} />
            <directionalLight position={[6, 16, 8]} intensity={1.1} />
            <directionalLight
              position={[-8, 9, -6]}
              intensity={0.35}
              color={COLOR.wall}
            />
            <MapScene
              data={data}
              active={activeName}
              onEnter={hoverOpen}
              onPin={focus}
            />
            <AnchorSync
              anchors={anchors}
              active={activeName}
              overlayRef={overlayRef}
            />
            <CameraRig
              parallax={!reducedMotion && !hovered}
              focus={
                focusedPart
                  ? { x: focusedPart.centroid.x, y: focusedPart.centroid.y }
                  : null
              }
            />
          </Canvas>

          {/* DOM overlay: ordinary React tree, so events and links just work. */}
          <div className="map3d-overlay" ref={overlayRef}>
            {data.states.map((part) =>
              part.network && part.name !== focused ? (
                <div
                  key={part.name}
                  className="map3d-anchor"
                  data-anchor={part.name}
                >
                  <StatePin
                    name={part.name}
                    count={part.network.organisations.length}
                    hovered={hovered === part.name}
                    ariaLabel={`${part.network.abbr} network — ${part.network.organisations.length} organisations`}
                    onHoverStart={() => hoverOpen(part.name)}
                    onHoverEnd={hoverClose}
                    onSelect={() => focus(part.name)}
                  />

                  {/* Hover: Obsidian-style graph springing out of the pin. */}
                  {hovered === part.name &&
                  !focused &&
                  part.network.organisations.length ? (
                    <OrgGraph
                      network={part.network}
                      onPointerEnter={() => hoverOpen(part.name)}
                      onPointerLeave={hoverClose}
                    />
                  ) : null}
                </div>
              ) : null,
            )}

            {/* Focused: the full tree, centred on the zoomed state. */}
            {/* Keyed directly under AnimatePresence so switching states plays the
                outgoing tree's collapse and the incoming tree's growth at once.
                Motion owns the whole transform (centring included) so its scale
                cannot clobber a CSS translate. */}
            <AnimatePresence>
              {focused && activePart?.network ? (
                <motion.div
                  key={activePart.name}
                  className="map3d-panel is-focused"
                  data-panel="1"
                  initial={{ scale: 0.16, opacity: 0, x: "-50%", y: "-50%" }}
                  animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
                  exit={{ scale: 0.16, opacity: 0, x: "-50%", y: "-50%" }}
                  transition={{
                    scale: { type: "spring", stiffness: 190, damping: 22 },
                    opacity: { duration: 0.16 },
                  }}
                >
                  <OrgTree network={activePart.network} />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {focused ? (
            <button
              type="button"
              className="map3d-back"
              onClick={() => setFocused(null)}
            >
              <span aria-hidden="true">←</span> Back to all states
            </button>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import type { IconType } from "react-icons";
import {
  SiAngular,
  SiCss,
  SiDocker,
  SiDotnet,
  SiFigma,
  SiGit,
  SiGithubactions,
  SiGraphql,
  SiHtml5,
  SiJavascript,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVuedotjs,
} from "react-icons/si";
import { TbBrandAws, TbBrandAzure, TbBrandCSharp, TbBrandOpenai } from "react-icons/tb";
import type { TechIcon, TechOrbitItem } from "@/data/skills";

const iconComponents: Record<TechIcon, IconType> = {
  typescript: SiTypescript,
  javascript: SiJavascript,
  python: SiPython,
  csharp: TbBrandCSharp,
  react: SiReact,
  nextjs: SiNextdotjs,
  angular: SiAngular,
  vue: SiVuedotjs,
  nodejs: SiNodedotjs,
  dotnet: SiDotnet,
  azure: TbBrandAzure,
  openai: TbBrandOpenai,
  graphql: SiGraphql,
  docker: SiDocker,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  git: SiGit,
  githubactions: SiGithubactions,
  tailwind: SiTailwindcss,
  html: SiHtml5,
  css: SiCss,
  php: SiPhp,
  figma: SiFigma,
  aws: TbBrandAws,
};

/** Radius of the wireframe globe. */
const RADIUS = 2.7;
/**
 * Icons sit on a slightly smaller sphere than the grid. Under perspective the
 * grid's outline is a great circle of angular size `atan(R / distance)`, while
 * icons can reach the sphere's silhouette at `asin(r / distance)` — the larger
 * of the two. 0.93 is the point where icons fill the outline without crossing
 * it: any smaller leaves an empty ring, any larger spills past the globe.
 */
const ICON_RADIUS = RADIUS * 0.93;
/** Idle spin, in radians per second. */
const AUTO_SPIN = 0.18;
const MAX_TILT = 0.55;
/** Half-width of the starfield; wide enough to cover a full-bleed canvas. */
const SPREAD_X = 26;

/** Mutable rotation state, shared between the DOM drag handlers and the render loop. */
type Spin = {
  rotX: number;
  rotY: number;
  velX: number;
  velY: number;
  dragging: boolean;
};

/**
 * Latitude bands, each holding evenly spaced icons, with band sizes weighted by
 * circumference. At this icon count a Fibonacci spiral leaves visible gaps and
 * clusters, whereas bands stay predictably even. Poles are left empty.
 */
function ringSphere(count: number, radius: number) {
  const bands = Math.max(2, Math.round(Math.sqrt(count / 1.5)));
  const maxLatitude = THREE.MathUtils.degToRad(52);

  const latitudes = Array.from(
    { length: bands },
    (_, band) => maxLatitude * (1 - (2 * band) / (bands - 1)),
  );

  const weights = latitudes.map((latitude) => Math.cos(latitude));
  const total = weights.reduce((sum, weight) => sum + weight, 0);
  const exact = weights.map((weight) => (weight / total) * count);
  const perBand = exact.map(Math.floor);

  // Largest-remainder split, so the bands add up to exactly `count`.
  let remaining = count - perBand.reduce((sum, n) => sum + n, 0);
  exact
    .map((value, index) => ({ index, rest: value - Math.floor(value) }))
    .sort((a, b) => b.rest - a.rest)
    .forEach(({ index }) => {
      if (remaining > 0) {
        perBand[index]++;
        remaining--;
      }
    });

  return latitudes.flatMap((latitude, band) => {
    const perimeter = perBand[band];
    const y = radius * Math.sin(latitude);
    const ring = radius * Math.cos(latitude);

    return Array.from({ length: perimeter }, (_, i) => {
      // Staggering each band keeps icons from lining up into columns.
      const theta = ((i + band * 0.5) / perimeter) * Math.PI * 2;

      return new THREE.Vector3(
        Math.cos(theta) * ring,
        y,
        Math.sin(theta) * ring,
      );
    });
  });
}

function Starfield() {
  const points = useRef<THREE.Points>(null);
  const geometry = useRef<THREE.BufferGeometry>(null);
  const elapsed = useRef(0);

  const { positions, colors, phases, speeds, drift } = useMemo(() => {
    const count = 700;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const drift = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() * 2 - 1) * SPREAD_X;
      positions[i * 3 + 1] = (Math.random() * 2 - 1) * 9;
      positions[i * 3 + 2] = -(2 + Math.random() * 8);
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.5 + Math.random() * 2;
      drift[i] = 0.08 + Math.random() * 0.3;
    }

    return { positions, colors, phases, speeds, drift };
  }, []);

  useFrame((_, delta) => {
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    const time = elapsed.current;

    for (let i = 0; i < phases.length; i++) {
      let x = positions[i * 3] + drift[i] * step;
      if (x > SPREAD_X) x = -SPREAD_X;
      positions[i * 3] = x;

      const wave = Math.sin(time * speeds[i] + phases[i]);
      const pulse = wave * wave;
      const brightness = 0.12 + 0.88 * pulse * pulse;
      colors[i * 3] = brightness;
      colors[i * 3 + 1] = brightness;
      colors[i * 3 + 2] = brightness;
    }

    const attr = geometry.current;
    if (attr) {
      attr.getAttribute("position").needsUpdate = true;
      attr.getAttribute("color").needsUpdate = true;
    }

    if (points.current) {
      points.current.position.y = Math.cos(time * 0.05) * 0.5;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry ref={geometry}>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
      />
    </points>
  );
}

function GlobeGrid() {
  const geometries = useMemo(() => {
    const segments = 96;
    const circle = (point: (t: number) => THREE.Vector3) =>
      new THREE.BufferGeometry().setFromPoints(
        Array.from({ length: segments }, (_, i) =>
          point((i / segments) * Math.PI * 2),
        ),
      );

    const latitudes = [-60, -30, 0, 30, 60].map((deg) => {
      const phi = THREE.MathUtils.degToRad(deg);
      const y = RADIUS * Math.sin(phi);
      const r = RADIUS * Math.cos(phi);
      return circle((t) => new THREE.Vector3(Math.cos(t) * r, y, Math.sin(t) * r));
    });

    const meridians = [0, 45, 90, 135].map((deg) => {
      const a = THREE.MathUtils.degToRad(deg);
      return circle(
        (t) =>
          new THREE.Vector3(
            RADIUS * Math.sin(t) * Math.cos(a),
            RADIUS * Math.cos(t),
            RADIUS * Math.sin(t) * Math.sin(a),
          ),
      );
    });

    return [...latitudes, ...meridians];
  }, []);

  return (
    <>
      {geometries.map((geometry, i) => (
        <lineLoop key={i} geometry={geometry}>
          <lineBasicMaterial
            color="#d4af37"
            transparent
            opacity={i < 5 ? 0.13 : 0.08}
          />
        </lineLoop>
      ))}
    </>
  );
}


function TechNode({
  item,
  position,
}: {
  item: TechOrbitItem;
  position: THREE.Vector3;
}) {
  const anchor = useRef<THREE.Group>(null);
  const element = useRef<HTMLDivElement>(null);
  const worldPosition = useMemo(() => new THREE.Vector3(), []);
  const Icon = iconComponents[item.icon];
  // On small screens the canvas is shorter, so Three.js projects fewer pixels
  // per world unit — icons shrink. We invert this: smaller canvas → higher scale
  // so mobile icons stay large and readable. Desktop is capped at 0.34.
  const { size } = useThree();
  const iconScale = Math.max(0.34, Math.min(0.62, (0.34 * 950) / size.height));

  // Icons are DOM nodes, so WebGL depth does not apply to them. Fading and
  // shrinking the ones on the far side of the sphere restores the illusion.
  useFrame(() => {
    if (!anchor.current || !element.current) return;

    anchor.current.getWorldPosition(worldPosition);
    const depth = (worldPosition.z / ICON_RADIUS + 1) / 2;

    element.current.style.opacity = (0.2 + 0.8 * depth).toFixed(3);
    element.current.style.filter = `blur(${((1 - depth) * 1.2).toFixed(2)}px)`;
  });

  return (
    <group ref={anchor} position={position}>
      <Html transform sprite scale={iconScale} zIndexRange={[20, 0]}>
        <div
          ref={element}
          className="flex w-28 flex-col items-center gap-1.5 select-none"
          style={{ pointerEvents: "none" }}
        >
          <span
            className="flex size-14 items-center justify-center rounded-full border border-border bg-bg-elevated/90 shadow-lg"
            style={{ color: item.color }}
          >
            <Icon size={26} />
          </span>
          <span className="text-[11px] font-medium whitespace-nowrap text-text-muted">
            {item.name}
          </span>
        </div>
      </Html>
    </group>
  );
}

function Scene({ items, spin }: { items: TechOrbitItem[]; spin: Spin }) {
  const group = useRef<THREE.Group>(null);
  const positions = useMemo(
    () => ringSphere(items.length, ICON_RADIUS),
    [items.length],
  );

  useFrame((_, delta) => {
    // Cap the step so a backgrounded tab does not jump the sphere on return.
    const step = Math.min(delta, 0.05);

    if (!spin.dragging) {
      spin.rotY += (AUTO_SPIN + spin.velY) * step;
      spin.rotX += spin.velX * step;

      const damping = Math.pow(0.9, step * 60);
      spin.velY *= damping;
      spin.velX *= damping;
    }

    spin.rotX = THREE.MathUtils.clamp(spin.rotX, -MAX_TILT, MAX_TILT);

    if (group.current) {
      group.current.rotation.y = spin.rotY;
      group.current.rotation.x = spin.rotX;
    }
  });

  return (
    <group ref={group}>
      <GlobeGrid />
      {items.map((item, i) => (
        <TechNode key={item.name} item={item} position={positions[i]} />
      ))}
    </group>
  );
}

export function TechSphere({ items }: { items: TechOrbitItem[] }) {
  const spin = useRef<Spin>({
    rotX: -0.15,
    rotY: 0,
    velX: 0,
    velY: 0,
    dragging: false,
  }).current;
  const lastPointer = useRef<{ x: number; y: number } | null>(null);

  return (
    // The canvas breaks out of the section's container so the starfield spans
    // the viewport, while the globe itself stays centred and sized by height:
    // three.js `fov` is vertical, so extra width only reveals more stars.
    <div
      className="relative left-1/2 h-[min(132vw,60rem)] w-screen -translate-x-1/2 cursor-grab touch-none select-none active:cursor-grabbing"
      onPointerDown={(event) => {
        // Keeps the drag from turning into a text selection that spills into
        // the surrounding section.
        event.preventDefault();
        spin.dragging = true;
        spin.velX = 0;
        spin.velY = 0;
        lastPointer.current = { x: event.clientX, y: event.clientY };
        event.currentTarget.setPointerCapture(event.pointerId);
      }}
      onPointerMove={(event) => {
        if (!spin.dragging || !lastPointer.current) return;

        const dx = event.clientX - lastPointer.current.x;
        const dy = event.clientY - lastPointer.current.y;
        lastPointer.current = { x: event.clientX, y: event.clientY };

        spin.rotY += dx * 0.006;
        spin.rotX = THREE.MathUtils.clamp(
          spin.rotX + dy * 0.004,
          -MAX_TILT,
          MAX_TILT,
        );
        // Carry the gesture's speed into the idle spin when the drag ends.
        spin.velY = dx * 0.25;
        spin.velX = dy * 0.15;
      }}
      onPointerUp={(event) => {
        spin.dragging = false;
        lastPointer.current = null;
        event.currentTarget.releasePointerCapture(event.pointerId);
      }}
      onPointerCancel={() => {
        spin.dragging = false;
        lastPointer.current = null;
      }}
    >
      <Canvas
        camera={{ position: [1.8, 0, 9.4], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <Starfield />
        <Scene items={items} spin={spin} />
      </Canvas>
    </div>
  );
}

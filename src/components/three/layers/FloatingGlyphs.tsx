"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";

type Kind = "ring" | "tablet" | "column" | "diamond";

type Glyph = {
  kind: Kind;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  /** Float amplitude and rate — every object drifts on its own clock. */
  amp: number;
  rate: number;
  spin: number;
};

/**
 * Placement rules: nothing sits in front of the headline column, and depth
 * increases as objects move left, so the copy always reads against distance.
 */
const GLYPHS: Glyph[] = [
  { kind: "ring", position: [5.6, 2.1, -3.4], rotation: [0.9, 0.3, 0.2], scale: 1, amp: 0.22, rate: 0.42, spin: 0.14 },
  { kind: "diamond", position: [3.4, -2.3, -1.6], rotation: [0.4, 0.8, 0], scale: 0.75, amp: 0.16, rate: 0.55, spin: 0.22 },
  { kind: "column", position: [6.8, -1.4, -6.5], rotation: [0.1, 0, 0.16], scale: 1.15, amp: 0.3, rate: 0.3, spin: 0.08 },
  { kind: "tablet", position: [-5.4, 2.6, -9], rotation: [0.2, 0.5, -0.22], scale: 1.3, amp: 0.34, rate: 0.26, spin: 0.06 },
  { kind: "ring", position: [-7.2, -1.8, -11], rotation: [1.2, 0.2, 0.5], scale: 1.6, amp: 0.4, rate: 0.22, spin: 0.1 },
  { kind: "diamond", position: [-2.4, 3.4, -12], rotation: [0.3, 0.2, 0.1], scale: 1.1, amp: 0.28, rate: 0.34, spin: 0.16 },
  { kind: "tablet", position: [8.2, 3.1, -8], rotation: [0.1, -0.6, 0.3], scale: 1.1, amp: 0.26, rate: 0.31, spin: 0.05 },
  { kind: "ring", position: [1.2, -3.4, -10], rotation: [1.4, 0.1, 0.2], scale: 1.2, amp: 0.24, rate: 0.38, spin: 0.12 },
  { kind: "column", position: [-8.6, 1.2, -14], rotation: [0, 0, -0.2], scale: 1.8, amp: 0.44, rate: 0.19, spin: 0.04 },
];

function geometryFor(kind: Kind) {
  switch (kind) {
    case "ring":
      return <torusGeometry args={[0.52, 0.042, 14, 56]} />;
    case "tablet":
      return <boxGeometry args={[0.82, 1.12, 0.045]} />;
    case "column":
      return <cylinderGeometry args={[0.13, 0.15, 1.5, 20]} />;
    case "diamond":
      return <octahedronGeometry args={[0.34, 0]} />;
  }
}

/**
 * Small metallic legal furniture — rings, tablets, columns — suspended at
 * several depths. They exist to give the camera parallax something to act on.
 */
export function FloatingGlyphs({
  light,
  count = GLYPHS.length,
}: {
  light: boolean;
  count?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const items = useMemo(() => GLYPHS.slice(0, count), [count]);

  const material = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return new THREE.MeshStandardMaterial({
      color: c.metal,
      metalness: 1,
      roughness: 0.3,
      envMapIntensity: light ? 1 : 1.5,
    });
  }, [light]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const children = group.current?.children;
    if (!children) return;
    for (let i = 0; i < children.length; i += 1) {
      const glyph = items[i];
      const node = children[i];
      node.position.y = glyph.position[1] + Math.sin(t * glyph.rate + i * 1.7) * glyph.amp;
      node.rotation.y = glyph.rotation[1] + t * glyph.spin;
      node.rotation.x = glyph.rotation[0] + Math.sin(t * glyph.rate * 0.6 + i) * 0.06;
    }
  });

  return (
    <group ref={group}>
      {items.map((glyph, i) => (
        <mesh
          key={i}
          position={glyph.position}
          rotation={glyph.rotation}
          scale={glyph.scale}
          material={material}
        >
          {geometryFor(glyph.kind)}
        </mesh>
      ))}
    </group>
  );
}

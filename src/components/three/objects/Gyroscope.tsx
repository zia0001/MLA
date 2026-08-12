"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { damp } from "@/lib/utils";

type Props = {
  light: boolean;
  progress?: RefObject<number>;
  compact?: boolean;
};

const RINGS = [
  { radius: 2.5, tube: 0.026, axis: [1.15, 0.2, 0] as const, rate: 0.16 },
  { radius: 2.0, tube: 0.032, axis: [0.3, 1.0, 0.2] as const, rate: -0.23 },
  { radius: 1.52, tube: 0.024, axis: [1.4, 0.9, 0.4] as const, rate: 0.31 },
];

/**
 * Three gimbal rings around a faceted core. Used behind the values timeline,
 * where the section needs depth but must not pull focus from the copy.
 */
export function Gyroscope({ light, progress, compact = false }: Props) {
  const root = useRef<THREE.Group>(null);
  const rings = useRef<(THREE.Group | null)[]>([]);

  const material = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return new THREE.MeshStandardMaterial({
      color: c.metal,
      metalness: 1,
      roughness: 0.22,
      envMapIntensity: light ? 1.1 : 1.8,
    });
  }, [light]);

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    const p = progress?.current ?? 0;

    if (root.current) {
      root.current.rotation.y = damp(
        root.current.rotation.y,
        state.pointer.x * 0.3 + p * 1.6,
        0.002,
        dt,
      );
      root.current.rotation.x = damp(root.current.rotation.x, -state.pointer.y * 0.22, 0.003, dt);
      root.current.position.y = Math.sin(t * 0.4) * 0.14;
    }

    rings.current.forEach((ring, i) => {
      if (!ring) return;
      ring.rotation.z = t * RINGS[i].rate;
      ring.rotation.y = RINGS[i].axis[1] + Math.sin(t * 0.2 + i) * 0.12;
    });
  });

  return (
    <group ref={root} scale={compact ? 0.72 : 1}>
      {RINGS.map((ring, i) => (
        <group
          key={i}
          ref={(node) => {
            rings.current[i] = node;
          }}
          rotation={[ring.axis[0], ring.axis[1], ring.axis[2]]}
        >
          <mesh material={material}>
            <torusGeometry args={[ring.radius, ring.tube, 14, compact ? 72 : 128]} />
          </mesh>
          {/* Bead on the ring: without it the rotation is invisible on a torus. */}
          <mesh material={material} position={[ring.radius, 0, 0]}>
            <sphereGeometry args={[ring.tube * 2.6, 16, 12]} />
          </mesh>
        </group>
      ))}

      <mesh material={material}>
        <octahedronGeometry args={[0.52, 0]} />
      </mesh>
    </group>
  );
}

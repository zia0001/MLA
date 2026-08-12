"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { damp } from "@/lib/utils";

type Props = {
  light: boolean;
  /** 0 → 1 as the section crosses the viewport. */
  progress?: RefObject<number>;
};

/**
 * A stack of bound volumes under an orbiting gold ring: the reading half of the
 * practice, opposite the scales in the hero.
 */
export function LegalBooks({ light, progress }: Props) {
  const root = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Group>(null);
  const born = useRef(0);

  const materials = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return {
      cover: new THREE.MeshStandardMaterial({
        color: c.dark,
        metalness: 0.35,
        roughness: 0.55,
        envMapIntensity: 0.9,
      }),
      pages: new THREE.MeshStandardMaterial({
        color: light ? "#efe9d8" : "#d8cdae",
        metalness: 0.15,
        roughness: 0.8,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: c.metal,
        metalness: 1,
        roughness: 0.24,
        envMapIntensity: light ? 1.1 : 1.7,
      }),
    };
  }, [light]);

  useEffect(() => {
    const owned = Object.values(materials);
    return () => owned.forEach((m) => m.dispose());
  }, [materials]);

  const books = useMemo(
    () => [
      { y: -0.62, turn: 0.0, width: 2.5, depth: 1.75, thickness: 0.34 },
      { y: -0.24, turn: 0.28, width: 2.3, depth: 1.6, thickness: 0.3 },
      { y: 0.08, turn: -0.16, width: 2.05, depth: 1.45, thickness: 0.26 },
    ],
    [],
  );

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (born.current === 0) born.current = t;
    const entry = 1 - Math.pow(1 - Math.min(1, (t - born.current) / 1.8), 4);
    const p = progress?.current ?? 0;

    if (root.current) {
      root.current.rotation.y = damp(
        root.current.rotation.y,
        -0.5 + state.pointer.x * 0.42 + p * 1.1,
        0.0018,
        dt,
      );
      root.current.rotation.x = damp(
        root.current.rotation.x,
        0.22 - state.pointer.y * 0.2,
        0.003,
        dt,
      );
      // Drifts back into depth as the section is scrolled past.
      root.current.position.y = Math.sin(t * 0.55) * 0.1 - (1 - entry) * 1.4;
      root.current.position.z = -p * 1.6;
      root.current.scale.setScalar(0.9 + entry * 0.1);
    }

    if (ring.current) {
      ring.current.rotation.z = t * 0.22;
      ring.current.rotation.x = 1.1 + Math.sin(t * 0.3) * 0.14;
    }
  });

  return (
    <group ref={root} position={[0, 0, 0]}>
      {books.map((book, i) => (
        <group key={i} position={[0, book.y, 0]} rotation={[0, book.turn, 0]}>
          <mesh material={materials.cover} castShadow>
            <boxGeometry args={[book.width, book.thickness, book.depth]} />
          </mesh>
          <mesh material={materials.pages} position={[0.05, 0, 0]}>
            <boxGeometry
              args={[book.width * 0.965, book.thickness * 0.68, book.depth * 0.98]}
            />
          </mesh>
          {/* Gold rule along the spine — the only ornament a law book needs. */}
          <mesh
            material={materials.gold}
            position={[-book.width / 2 + 0.012, 0, 0]}
            rotation={[0, 0, Math.PI / 2]}
          >
            <cylinderGeometry args={[0.018, 0.018, book.depth * 0.62, 10]} />
          </mesh>
        </group>
      ))}

      {/* Orbiting ring and finial above the stack. */}
      <group ref={ring} position={[0, 0.95, 0]}>
        <mesh material={materials.gold}>
          <torusGeometry args={[1.32, 0.028, 14, 90]} />
        </mesh>
      </group>
      <mesh material={materials.gold} position={[0, 0.95, 0]}>
        <octahedronGeometry args={[0.3, 0]} />
      </mesh>
    </group>
  );
}

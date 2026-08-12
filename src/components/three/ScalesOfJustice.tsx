"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { heroProgress } from "@/lib/scroll";
import { damp } from "@/lib/utils";

/**
 * A procedural scales of justice: turned pedestal, tapered beam, suspended
 * pans. Everything is lathed or revolved from profile curves rather than
 * assembled from primitives, which is what keeps it reading as machined brass
 * instead of a box-and-cylinder game prop.
 */

/** Silhouette of the pedestal, revolved 360°. x = radius, y = height. */
const PEDESTAL_PROFILE: [number, number][] = [
  [0.0, 0.0],
  [1.15, 0.0],
  [1.15, 0.1],
  [1.0, 0.22],
  [0.94, 0.3],
  [0.94, 0.38],
  [0.66, 0.5],
  [0.34, 0.58],
  [0.22, 0.7],
  [0.185, 0.95],
  [0.155, 1.6],
  [0.155, 2.2],
  [0.2, 2.34],
  [0.2, 2.42],
  [0.145, 2.5],
  [0.135, 2.86],
  [0.24, 2.96],
  [0.24, 3.04],
  [0.1, 3.12],
  [0.0, 3.12],
];

/** Shallow dish for the pans, revolved the same way. */
const PAN_PROFILE: [number, number][] = [
  [0.0, 0.0],
  [0.2, 0.02],
  [0.42, 0.06],
  [0.58, 0.12],
  [0.64, 0.18],
  [0.645, 0.205],
];

const BEAM_Y = 3.18;
const BEAM_HALF = 1.75;
const CHAIN_DROP = 0.7;
const PAN_DROP = 0.9;
const CHAIN_RADIUS = 0.62;

const toLathe = (profile: [number, number][]) =>
  profile.map(([x, y]) => new THREE.Vector2(x, y));

function Chain({ to, material }: { to: THREE.Vector3; material: THREE.Material }) {
  const { position, quaternion, length } = useMemo(() => {
    const length = to.length();
    const quaternion = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      to.clone().normalize(),
    );
    return { position: to.clone().multiplyScalar(0.5), quaternion, length };
  }, [to]);

  return (
    <mesh position={position} quaternion={quaternion} material={material}>
      <cylinderGeometry args={[0.011, 0.011, length, 6]} />
    </mesh>
  );
}

function Pan({
  gold,
  dish,
  panRef,
}: {
  gold: THREE.Material;
  dish: THREE.Material;
  panRef: React.RefObject<THREE.Group | null>;
}) {
  const anchors = useMemo(
    () =>
      [90, 210, 330].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        return new THREE.Vector3(
          Math.cos(rad) * CHAIN_RADIUS,
          -CHAIN_DROP,
          Math.sin(rad) * CHAIN_RADIUS,
        );
      }),
    [],
  );

  const panPoints = useMemo(() => toLathe(PAN_PROFILE), []);

  return (
    // Counter-rotated in the frame loop so the dishes hang level as the beam tips.
    <group ref={panRef}>
      {anchors.map((to, i) => (
        <Chain key={i} to={to} material={gold} />
      ))}
      <mesh position={[0, -PAN_DROP, 0]} material={dish}>
        <latheGeometry args={[panPoints, 96]} />
      </mesh>
      {/* Rim band — catches a highlight and hides the lathe's open edge. */}
      <mesh position={[0, -PAN_DROP + 0.2, 0]} rotation={[Math.PI / 2, 0, 0]} material={gold}>
        <torusGeometry args={[0.645, 0.016, 10, 88]} />
      </mesh>
    </group>
  );
}

type Props = {
  /** Warmer, slightly brighter metal in light mode so it does not go muddy. */
  light?: boolean;
};

export function ScalesOfJustice({ light = false }: Props) {
  const root = useRef<THREE.Group>(null);
  const beam = useRef<THREE.Group>(null);
  const leftPan = useRef<THREE.Group>(null);
  const rightPan = useRef<THREE.Group>(null);
  const born = useRef(0);

  const materials = useMemo(() => {
    const gold = new THREE.MeshStandardMaterial({
      color: light ? "#c99b32" : "#d9b35c",
      metalness: 1,
      roughness: 0.235,
      envMapIntensity: light ? 1.15 : 1.75,
    });
    const dish = new THREE.MeshStandardMaterial({
      color: light ? "#c79a35" : "#dcb765",
      metalness: 1,
      roughness: 0.18,
      envMapIntensity: light ? 1.2 : 1.9,
      side: THREE.DoubleSide,
    });
    const dark = new THREE.MeshStandardMaterial({
      color: light ? "#2b3145" : "#141a27",
      metalness: 0.85,
      roughness: 0.42,
      envMapIntensity: 1,
    });
    return { gold, dish, dark };
  }, [light]);

  useEffect(() => {
    const owned = Object.values(materials);
    return () => owned.forEach((m) => m.dispose());
  }, [materials]);

  const pedestalPoints = useMemo(() => toLathe(PEDESTAL_PROFILE), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (born.current === 0) born.current = t;

    // Entrance: rise and settle once, independent of scroll position.
    const age = Math.min(1, (t - born.current) / 2.1);
    const entry = 1 - Math.pow(1 - age, 4);

    const scroll = heroProgress();
    const g = root.current;
    if (g) {
      // Idle spin, a damped lean toward the pointer, and a longer turn driven
      // by scroll. The camera rig supplies the translation, so this group only
      // ever rotates and floats in place.
      g.rotation.y = damp(
        g.rotation.y,
        t * 0.1 + state.pointer.x * 0.2 + scroll * 1.35,
        0.0012,
        dt,
      );
      g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.09 + scroll * 0.2, 0.0025, dt);
      g.position.y = -1.85 + Math.sin(t * 0.62) * 0.06 - (1 - entry) * 1.2;
      g.position.x = damp(g.position.x, state.pointer.x * 0.08, 0.004, dt);
      g.scale.setScalar(0.88 + entry * 0.12);
    }

    if (beam.current) {
      // A balance that has almost, but not quite, come to rest.
      const tilt = Math.sin(t * 0.54) * 0.042 + state.pointer.x * 0.012;
      beam.current.rotation.z = damp(beam.current.rotation.z, tilt, 0.002, dt);
      const counter = -beam.current.rotation.z;
      if (leftPan.current) leftPan.current.rotation.z = counter;
      if (rightPan.current) rightPan.current.rotation.z = counter;
    }
  });

  return (
    <group ref={root} position={[0, -1.85, 0]}>
      {/* Pedestal ---------------------------------------------------------- */}
      <mesh material={materials.gold}>
        <latheGeometry args={[pedestalPoints, 128]} />
      </mesh>
      {/* Dark inlay ring around the base, so the gold has something to sit against. */}
      <mesh position={[0, 0.105, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.dark}>
        <torusGeometry args={[1.145, 0.028, 12, 128]} />
      </mesh>
      <mesh position={[0, 2.38, 0]} rotation={[Math.PI / 2, 0, 0]} material={materials.dark}>
        <torusGeometry args={[0.205, 0.016, 10, 96]} />
      </mesh>

      {/* Beam assembly ------------------------------------------------------ */}
      <group ref={beam} position={[0, BEAM_Y, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]} material={materials.gold}>
          <cylinderGeometry args={[0.038, 0.038, BEAM_HALF * 2, 20]} />
        </mesh>
        {/* Pivot housing */}
        <mesh material={materials.gold}>
          <sphereGeometry args={[0.115, 32, 24]} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} material={materials.dark}>
          <torusGeometry args={[0.145, 0.022, 12, 64]} />
        </mesh>
        {/* Finial */}
        <mesh position={[0, 0.24, 0]} material={materials.gold}>
          <octahedronGeometry args={[0.115, 0]} />
        </mesh>

        {[-1, 1].map((side) => (
          <group key={side} position={[side * BEAM_HALF, 0, 0]}>
            <mesh material={materials.gold}>
              <sphereGeometry args={[0.062, 20, 16]} />
            </mesh>
            <Pan
              gold={materials.gold}
              dish={materials.dish}
              panRef={side === -1 ? leftPan : rightPan}
            />
          </group>
        ))}
      </group>
    </group>
  );
}

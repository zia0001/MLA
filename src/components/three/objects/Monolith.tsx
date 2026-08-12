"use client";

import { useEffect, useMemo, useRef, type RefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { BASIC_VERTEX, ENCODE_GLSL } from "../shaders/common";
import { damp } from "@/lib/utils";

const GLOW_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uStrength;
  varying vec2 vUv;

  ${ENCODE_GLSL}

  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float falloff = pow(max(0.0, 1.0 - d), 2.6);
    gl_FragColor = vec4(encodeOut(uColor), falloff * uStrength);
  }
`;

type Props = {
  light: boolean;
  progress?: RefObject<number>;
};

/**
 * A standing tablet of law: dark polished slab, gold edge frame, and a halo
 * behind it that expands as the section is read.
 */
export function Monolith({ light, progress }: Props) {
  const root = useRef<THREE.Group>(null);
  const glow = useRef<THREE.Mesh>(null);
  const born = useRef(0);

  const materials = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return {
      slab: new THREE.MeshStandardMaterial({
        color: c.dark,
        metalness: 0.9,
        roughness: 0.22,
        envMapIntensity: 1.3,
      }),
      gold: new THREE.MeshStandardMaterial({
        color: c.metal,
        metalness: 1,
        roughness: 0.2,
        envMapIntensity: light ? 1.1 : 1.9,
      }),
      glow: new THREE.ShaderMaterial({
        vertexShader: BASIC_VERTEX,
        fragmentShader: GLOW_FRAGMENT,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uColor: { value: new THREE.Color(c.goldBright) },
          uStrength: { value: light ? 0.28 : 0.6 },
          uEncode: { value: 1 },
        },
      }),
    };
  }, [light]);

  useEffect(() => {
    const owned = Object.values(materials);
    return () => owned.forEach((m) => m.dispose());
  }, [materials]);

  const frame = useMemo(() => {
    const w = 1.72;
    const h = 3.05;
    const t = 0.03;
    return [
      { pos: [0, h / 2, 0.09] as const, size: [w, t, t] as const },
      { pos: [0, -h / 2, 0.09] as const, size: [w, t, t] as const },
      { pos: [-w / 2, 0, 0.09] as const, size: [t, h, t] as const },
      { pos: [w / 2, 0, 0.09] as const, size: [t, h, t] as const },
    ];
  }, []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const t = state.clock.elapsedTime;
    if (born.current === 0) born.current = t;
    const entry = 1 - Math.pow(1 - Math.min(1, (t - born.current) / 2), 4);
    const p = progress?.current ?? 0;

    if (root.current) {
      root.current.rotation.y = damp(
        root.current.rotation.y,
        -0.35 + state.pointer.x * 0.45 + p * 0.9,
        0.0018,
        dt,
      );
      root.current.rotation.x = damp(root.current.rotation.x, -state.pointer.y * 0.14, 0.003, dt);
      root.current.position.y = Math.sin(t * 0.5) * 0.09 - (1 - entry) * 1.2;
      root.current.scale.setScalar(0.92 + entry * 0.08);
    }

    if (glow.current) {
      // The halo expands through the section, then settles.
      const swell = 1 + Math.sin(p * Math.PI) * 0.55 + Math.sin(t * 0.6) * 0.03;
      glow.current.scale.setScalar(swell);
    }
  });

  return (
    <group ref={root}>
      <mesh ref={glow} position={[0, 0, -1.4]} material={materials.glow}>
        <planeGeometry args={[7, 7]} />
      </mesh>

      <mesh material={materials.slab}>
        <boxGeometry args={[1.7, 3.03, 0.17]} />
      </mesh>
      {frame.map((edge, i) => (
        <mesh key={i} position={edge.pos} material={materials.gold}>
          <boxGeometry args={edge.size} />
        </mesh>
      ))}

      {/* Inscribed rule and seal. */}
      <mesh position={[0, 0.42, 0.1]} material={materials.gold}>
        <boxGeometry args={[0.9, 0.014, 0.014]} />
      </mesh>
      <mesh position={[0, -0.2, 0.12]} material={materials.gold}>
        <torusGeometry args={[0.3, 0.022, 12, 64]} />
      </mesh>
      <mesh position={[0, -0.2, 0.12]} material={materials.gold}>
        <octahedronGeometry args={[0.13, 0]} />
      </mesh>
    </group>
  );
}

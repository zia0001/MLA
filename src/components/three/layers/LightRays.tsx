"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { BASIC_VERTEX, ENCODE_GLSL } from "../shaders/common";

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uSeed;
  uniform float uStrength;
  varying vec2 vUv;

  ${ENCODE_GLSL}

  void main() {
    float across = pow(1.0 - abs(vUv.x - 0.5) * 2.0, 2.2);
    float along = smoothstep(0.0, 0.30, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y));
    float breathe = 0.6 + 0.4 * sin(uTime * 0.28 + uSeed);
    float alpha = across * along * uStrength * breathe;
    if (alpha < 0.002) discard;
    gl_FragColor = vec4(encodeOut(uColor), alpha);
  }
`;

type Ray = {
  position: [number, number, number];
  rotation: number;
  scale: [number, number];
  seed: number;
  strength: number;
};

const RAYS: Ray[] = [
  { position: [-3.4, 3.6, -7], rotation: 0.28, scale: [3.4, 15], seed: 0, strength: 0.5 },
  { position: [1.4, 4.2, -9], rotation: 0.18, scale: [5.5, 17], seed: 2.1, strength: 0.34 },
  { position: [4.6, 3.9, -5.5], rotation: 0.36, scale: [2.4, 13], seed: 4.4, strength: 0.42 },
  { position: [-6.2, 4.0, -4], rotation: 0.22, scale: [1.8, 12], seed: 1.2, strength: 0.3 },
];

function Shaft({
  ray,
  color,
  strength,
  encode,
}: {
  ray: Ray;
  color: string;
  strength: number;
  encode: boolean;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uColor: { value: new THREE.Color(color) },
      uTime: { value: 0 },
      uSeed: { value: ray.seed },
      uStrength: { value: strength },
      uEncode: { value: encode ? 1 : 0 },
    }),
    [color, ray.seed, strength, encode],
  );

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh position={ray.position} rotation={[0, 0, ray.rotation]}>
      <planeGeometry args={[ray.scale[0], ray.scale[1]]} />
      <shaderMaterial
        ref={material}
        vertexShader={BASIC_VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        fog={false}
      />
    </mesh>
  );
}

/** Additive shafts of light. They are what the bloom pass has to bite on. */
export function LightRays({
  light,
  encode,
  count = RAYS.length,
}: {
  light: boolean;
  encode: boolean;
  count?: number;
}) {
  const color = SCENE_THEME[light ? "light" : "dark"].goldBright;

  return (
    <group>
      {RAYS.slice(0, count).map((ray, i) => (
        <Shaft
          key={i}
          ray={ray}
          color={color}
          strength={ray.strength * (light ? 0.3 : 1)}
          encode={encode}
        />
      ))}
    </group>
  );
}

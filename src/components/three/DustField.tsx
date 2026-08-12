"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { ENCODE_GLSL } from "./shaders/common";
import { createRandom } from "@/lib/rand";

const VERTEX = /* glsl */ `
  uniform float uTime;
  uniform float uSize;
  uniform float uRange;
  attribute float aScale;
  attribute float aPhase;
  varying float vAlpha;

  void main() {
    vec3 p = position;
    // Drift upward and wrap, so the field never empties out.
    p.y = mod(p.y + uTime * (0.05 + aScale * 0.07) + uRange, uRange * 2.0) - uRange;
    p.x += sin(uTime * 0.3 + aPhase) * 0.22;
    p.z += cos(uTime * 0.22 + aPhase) * 0.16;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * aScale * (1.0 / max(0.35, -mv.z));
    vAlpha = 0.35 + 0.65 * (0.5 + 0.5 * sin(uTime * 1.1 + aPhase * 4.0));
  }
`;

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;

  ${ENCODE_GLSL}

  void main() {
    float d = length(gl_PointCoord - 0.5);
    float mask = smoothstep(0.5, 0.02, d);
    gl_FragColor = vec4(encodeOut(uColor), mask * mask * vAlpha * uOpacity);
  }
`;

type Props = {
  count?: number;
  /** Half-extent of the cube the motes occupy. */
  range?: number;
  color?: string;
  opacity?: number;
  /** True when no composer is mounted to encode the output for us. */
  encode?: boolean;
  /** Fixed seed keeps the field identical across renders and reloads. */
  seed?: number;
};

/**
 * Gold motes suspended around the hero object. One draw call, additive, no
 * depth writes — it reads as light in the air rather than as geometry.
 */
export function DustField({
  count = 150,
  range = 6,
  color = "#e9cd8a",
  opacity = 0.8,
  encode = false,
  seed = 20240517,
}: Props) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const phases = new Float32Array(count);
    const random = createRandom(seed);

    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (random() - 0.5) * range * 2.4;
      positions[i * 3 + 1] = (random() - 0.5) * range * 2;
      positions[i * 3 + 2] = (random() - 0.5) * range * 1.4;
      scales[i] = 0.4 + random() * 1.6;
      phases[i] = random() * Math.PI * 2;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute("aPhase", new THREE.BufferAttribute(phases, 1));

    const uniforms = {
      uTime: { value: 0 },
      uSize: { value: 26 },
      uRange: { value: range },
      uColor: { value: new THREE.Color(color) },
      uOpacity: { value: opacity },
      uEncode: { value: encode ? 1 : 0 },
    };

    return { geometry, uniforms };
  }, [count, range, color, opacity, encode, seed]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  useFrame((state) => {
    if (material.current) material.current.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

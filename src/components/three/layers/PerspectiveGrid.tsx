"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { BASIC_VERTEX, ENCODE_GLSL } from "../shaders/common";

const FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uOpacity;
  uniform float uCells;
  varying vec2 vUv;

  ${ENCODE_GLSL}

  void main() {
    // Cells travel slowly toward the viewer. Line width is constant in UV
    // space, so perspective thins the distant lines on its own — no
    // screen-space derivatives needed.
    vec2 g = vUv * uCells;
    g.y += uTime * 0.06;

    vec2 f = abs(fract(g) - 0.5);
    float line = max(
      smoothstep(0.465, 0.5, f.x),
      smoothstep(0.465, 0.5, f.y)
    );

    float fade = 1.0 - smoothstep(0.08, 0.46, length(vUv - 0.5));
    float alpha = line * fade * uOpacity;
    if (alpha < 0.003) discard;

    gl_FragColor = vec4(encodeOut(uColor), alpha);
  }
`;

/** Ground plane grid — the cheapest, clearest way to state depth in a scene. */
export function PerspectiveGrid({
  light,
  encode,
  y = -3.1,
  size = 70,
  cells = 40,
  opacity,
}: {
  light: boolean;
  encode: boolean;
  y?: number;
  size?: number;
  cells?: number;
  opacity?: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return {
      uColor: { value: new THREE.Color(c.gold) },
      uTime: { value: 0 },
      uOpacity: { value: opacity ?? (light ? 0.22 : 0.38) },
      uCells: { value: cells },
      uEncode: { value: encode ? 1 : 0 },
    };
  }, [light, encode, cells, opacity]);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -6]}>
      <planeGeometry args={[size, size]} />
      <shaderMaterial
        ref={material}
        vertexShader={BASIC_VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        fog={false}
      />
    </mesh>
  );
}

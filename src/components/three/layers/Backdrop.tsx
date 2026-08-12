"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

import { SCENE_THEME } from "@/lib/scene";
import { BASIC_VERTEX, ENCODE_GLSL } from "../shaders/common";

const DISTANCE = 22;

const FRAGMENT = /* glsl */ `
  uniform vec3 uTop;
  uniform vec3 uMid;
  uniform vec3 uEdge;
  uniform vec3 uGold;
  uniform vec2 uHalo;
  uniform float uHaloStrength;
  uniform float uAspect;
  uniform float uTime;
  varying vec2 vUv;

  ${ENCODE_GLSL}

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  void main() {
    vec2 uv = vUv;
    vec3 col = mix(uMid, uTop, smoothstep(0.05, 1.0, uv.y));

    // Vignette toward the deepest tone at the corners.
    vec2 c = (uv - 0.5) * vec2(uAspect, 1.0);
    col = mix(col, uEdge, smoothstep(0.30, 0.95, length(c)));

    // Key halo, sitting behind the hero object.
    vec2 h = (uv - uHalo) * vec2(uAspect, 1.0);
    col += uGold * exp(-dot(h, h) * 4.0) * uHaloStrength;

    // Slow secondary bloom, low and opposite, so the field breathes.
    vec2 h2 = (uv - vec2(0.16, 0.10)) * vec2(uAspect, 1.0);
    col += uGold * exp(-dot(h2, h2) * 7.0) * uHaloStrength * 0.32
         * (0.65 + 0.35 * sin(uTime * 0.2));

    // Dither: large flat gradients band badly on wide displays otherwise.
    col += (hash(uv * 1024.0) - 0.5) * 0.008;

    gl_FragColor = vec4(encodeOut(col), 1.0);
  }
`;

/**
 * The scene's own ground plane, drawn first and always behind everything. It
 * exists so the composer has an opaque frame to bloom against — and so the page
 * background is genuinely part of the 3D space rather than CSS underneath it.
 */
export function Backdrop({
  light,
  encode,
  halo = [0.72, 0.55],
}: {
  light: boolean;
  encode: boolean;
  /** Where the warm key sits, in 0–1 screen space. */
  halo?: [number, number];
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const size = useThree((state) => state.size);
  const camera = useThree((state) => state.camera);

  const dims = useMemo(() => {
    const fov = (camera as THREE.PerspectiveCamera).fov ?? 32;
    const height = 2 * Math.tan((fov * Math.PI) / 360) * DISTANCE;
    // Generous overscan: the camera rig pans, and no edge may ever show.
    return { width: height * (size.width / size.height) * 1.7, height: height * 1.7 };
  }, [camera, size.width, size.height]);

  const uniforms = useMemo(() => {
    const c = SCENE_THEME[light ? "light" : "dark"];
    return {
      uTop: { value: new THREE.Color(c.elev) },
      uMid: { value: new THREE.Color(c.bg) },
      uEdge: { value: new THREE.Color(c.deep) },
      uGold: { value: new THREE.Color(c.gold) },
      uHalo: { value: new THREE.Vector2(halo[0], halo[1]) },
      uHaloStrength: { value: light ? 0.22 : 0.5 },
      uAspect: { value: dims.width / dims.height },
      uTime: { value: 0 },
      uEncode: { value: encode ? 1 : 0 },
    };
  }, [light, encode, halo, dims]);

  useFrame((state) => {
    if (material.current) {
      material.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    // Track the camera laterally so panning never reveals an edge.
    if (mesh.current) {
      mesh.current.position.x = state.camera.position.x;
      mesh.current.position.y = state.camera.position.y;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, -DISTANCE]} renderOrder={-1000} frustumCulled={false}>
      <planeGeometry args={[dims.width, dims.height]} />
      <shaderMaterial
        ref={material}
        vertexShader={BASIC_VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
        fog={false}
      />
    </mesh>
  );
}

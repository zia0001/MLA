"use client";

import { Environment, Lightformer } from "@react-three/drei";

import { SCENE_THEME } from "@/lib/scene";

/**
 * The house lighting setup: a warm key, a cool rim, and a small local
 * environment built from lightformers. No HDR file is fetched — the reflections
 * come from geometry rendered into a cube target, which keeps every scene
 * self-contained and identical between hero and section canvases.
 */
export function StudioRig({
  light,
  intensity = 1,
}: {
  light: boolean;
  intensity?: number;
}) {
  const c = SCENE_THEME[light ? "light" : "dark"];

  return (
    <>
      <ambientLight intensity={(light ? 0.8 : 0.3) * intensity} />
      <directionalLight
        position={[4.5, 6, 4]}
        intensity={(light ? 2.1 : 1.75) * intensity}
        color={light ? "#fffaf0" : "#ffeecb"}
      />
      <spotLight
        position={[-6.5, 3.5, -4.5]}
        angle={0.8}
        penumbra={1}
        intensity={(light ? 20 : 52) * intensity}
        color={c.rim}
      />
      <pointLight
        position={[2.6, -1.8, 3.2]}
        intensity={(light ? 7 : 16) * intensity}
        color="#ffd993"
      />

      <Environment key={light ? "light" : "dark"} resolution={256} frames={1}>
        <color attach="background" args={[light ? "#e6e2d8" : "#05070e"]} />
        <Lightformer
          form="rect"
          intensity={light ? 2.4 : 3.6}
          position={[5, 4, 4]}
          scale={[9, 9, 1]}
          color="#fff2d6"
        />
        <Lightformer
          form="rect"
          intensity={light ? 1.4 : 1.2}
          position={[-7, 1.5, 3]}
          scale={[11, 11, 1]}
          color={light ? "#ffffff" : "#4d6fd8"}
        />
        <Lightformer
          form="ring"
          intensity={light ? 1.6 : 3.4}
          position={[0, 6, -3]}
          scale={5}
          color="#ffe1a6"
        />
        <Lightformer
          form="rect"
          intensity={light ? 1.1 : 0.55}
          position={[0, -5, 2]}
          scale={[12, 12, 1]}
          color={light ? "#f3efe4" : "#1e2740"}
        />
      </Environment>
    </>
  );
}

"use client";

import { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

import { SCENE_THEME, type Quality } from "@/lib/scene";
import { Backdrop } from "./layers/Backdrop";
import { DustField } from "./DustField";
import { FloatingGlyphs } from "./layers/FloatingGlyphs";
import { LightRays } from "./layers/LightRays";
import { PerspectiveGrid } from "./layers/PerspectiveGrid";
import { CameraRig } from "./rig/CameraRig";
import { StudioRig } from "./rig/StudioRig";
import { ScalesOfJustice } from "./ScalesOfJustice";

type Props = {
  light: boolean;
  quality: Quality;
  /** False when the hero is off screen; the render loop then idles completely. */
  active: boolean;
};

/** Exposure is set on the renderer each frame — cheap, and always in sync. */
function Exposure({ light }: { light: boolean }) {
  const target = light ? 1.02 : 1.22;
  useFrame((state) => {
    if (state.gl.toneMappingExposure !== target) {
      state.gl.toneMappingExposure = target;
    }
  });
  return null;
}

/**
 * Places the hero object relative to the viewport rather than at fixed world
 * coordinates: right-of-centre and large on desktop, centred and lower on
 * portrait screens, where the copy stacks above it.
 */
function HeroPlacement({
  children,
  shadowRes,
}: {
  children: React.ReactNode;
  shadowRes: number;
}) {
  const viewport = useThree((state) => state.viewport);
  const wide = viewport.aspect > 1.05;

  const scale = ((wide ? viewport.height * 0.62 : viewport.height * 0.3) / 3.8);
  const x = wide ? viewport.width * 0.245 : 0;
  const y = wide ? -0.1 : -viewport.height * 0.235;

  return (
    <group position={[x, y, 0]} scale={scale}>
      {children}
      <ContactShadows
        position={[0, -1.92, 0]}
        scale={6}
        blur={3.2}
        far={4}
        opacity={0.55}
        resolution={shadowRes}
        color="#000000"
      />
    </group>
  );
}

/**
 * The hero is one full-bleed 3D stage: background, grid, rays, dust, floating
 * furniture and the scales all live in the same space, with the DOM copy laid
 * over it. Nothing here is a CSS imitation of depth.
 */
export function HeroScene({ light, quality, active }: Props) {
  const { compact, dpr, bloom, dust, glyphs, shadowRes } = quality;
  const fogColor = SCENE_THEME[light ? "light" : "dark"].deep;

  return (
    <Canvas
      dpr={dpr}
      camera={{ position: [0, 0.15, 9], fov: 32 }}
      // Opaque: the Backdrop supplies the page ground, so there is nothing to
      // composite against and the composer can own the whole frame.
      gl={{ alpha: false, antialias: !compact, powerPreference: "high-performance" }}
      frameloop={active ? "always" : "never"}
      performance={{ min: 0.5 }}
    >
      <Exposure light={light} />
      <fog attach="fog" args={[fogColor, 14, 42]} />
      <CameraRig sway={compact ? 0.4 : 1} dolly={compact ? 1.4 : 2.4} />

      <Backdrop light={light} encode={!bloom} halo={compact ? [0.5, 0.28] : [0.72, 0.55]} />

      <Suspense fallback={null}>
        <StudioRig light={light} />
        <PerspectiveGrid light={light} encode={!bloom} />
        <LightRays light={light} encode={!bloom} count={compact ? 2 : 4} />
        <FloatingGlyphs light={light} count={glyphs} />

        <HeroPlacement shadowRes={shadowRes}>
          <ScalesOfJustice light={light} />
        </HeroPlacement>

        <DustField
          count={dust}
          range={8}
          opacity={light ? 0.4 : 0.85}
          encode={!bloom}
        />
      </Suspense>

      {bloom && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            mipmapBlur
            intensity={light ? 0.3 : 0.78}
            luminanceThreshold={light ? 0.92 : 0.58}
            luminanceSmoothing={0.3}
            radius={0.76}
          />
        </EffectComposer>
      )}
    </Canvas>
  );
}

export default HeroScene;

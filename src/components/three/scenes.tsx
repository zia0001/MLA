"use client";

import type { RefObject } from "react";
import { ContactShadows } from "@react-three/drei";

import { SectionCanvas } from "./SectionCanvas";
import { DustField } from "./DustField";
import { LegalBooks } from "./objects/LegalBooks";
import { Gyroscope } from "./objects/Gyroscope";
import { Monolith } from "./objects/Monolith";

export type SceneProps = {
  light: boolean;
  compact: boolean;
  progress: RefObject<number>;
};

/**
 * The three section scenes. They share one module so they also share a chunk —
 * all of them are on the same page, so splitting further would only add
 * round-trips.
 *
 * None of these canvases run a composer, so custom shaders encode their own
 * output (`encode`).
 */

export function IntroScene({ light, compact, progress }: SceneProps) {
  return (
    <SectionCanvas light={light} compact={compact} cameraZ={7.4} fov={32}>
      <group position={[0, 0.25, 0]}>
        <LegalBooks light={light} progress={progress} />
      </group>
      <ContactShadows
        position={[0, -1.75, 0]}
        scale={7}
        blur={3}
        far={3.4}
        opacity={light ? 0.28 : 0.5}
        resolution={compact ? 256 : 384}
        color="#000000"
      />
      <DustField
        count={compact ? 26 : 70}
        range={4.5}
        opacity={light ? 0.3 : 0.6}
        encode
      />
    </SectionCanvas>
  );
}

export function WhyScene({ light, compact, progress }: SceneProps) {
  return (
    <SectionCanvas light={light} compact={compact} cameraZ={8.4} fov={34} rigIntensity={0.85}>
      <Gyroscope light={light} progress={progress} compact={compact} />
      <DustField
        count={compact ? 30 : 90}
        range={6}
        opacity={light ? 0.25 : 0.55}
        encode
      />
    </SectionCanvas>
  );
}

export function CtaScene({ light, compact, progress }: SceneProps) {
  return (
    <SectionCanvas light={light} compact={compact} cameraZ={7.8} fov={32}>
      <Monolith light={light} progress={progress} />
      <ContactShadows
        position={[0, -1.7, 0]}
        scale={6}
        blur={3.2}
        far={3}
        opacity={light ? 0.24 : 0.45}
        resolution={compact ? 256 : 384}
        color="#000000"
      />
      <DustField
        count={compact ? 30 : 100}
        range={5}
        opacity={light ? 0.3 : 0.7}
        encode
      />
    </SectionCanvas>
  );
}

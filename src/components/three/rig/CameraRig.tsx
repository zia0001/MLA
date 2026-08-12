"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { heroProgress } from "@/lib/scroll";
import { damp } from "@/lib/utils";

const LOOK_AT = new THREE.Vector3();

/**
 * Moves the camera itself rather than the objects. Because every layer sits at
 * a different depth, one damped camera pan produces true parallax across the
 * whole stage — background, rays, glyphs and the hero object all separate.
 */
export function CameraRig({
  base = [0, 0.15, 9] as [number, number, number],
  sway = 1,
  /** Dolly-back distance across the full hero scroll. */
  dolly = 2.4,
}) {
  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const p = heroProgress();
    const camera = state.camera;

    camera.position.x = damp(camera.position.x, base[0] + state.pointer.x * 0.9 * sway, 0.0016, dt);
    camera.position.y = damp(
      camera.position.y,
      base[1] + state.pointer.y * 0.45 * sway - p * 1.1,
      0.0016,
      dt,
    );
    camera.position.z = damp(camera.position.z, base[2] + p * dolly, 0.0025, dt);

    // Aim slightly below centre as the page scrolls, so the object drifts up
    // and out of frame instead of simply shrinking.
    LOOK_AT.set(0, -p * 0.9, 0);
    camera.lookAt(LOOK_AT);
  });

  return null;
}

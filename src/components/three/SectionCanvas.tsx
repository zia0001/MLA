"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";

import { StudioRig } from "./rig/StudioRig";
import { qualityFor } from "@/lib/scene";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  light: boolean;
  compact: boolean;
  className?: string;
  cameraZ?: number;
  fov?: number;
  rigIntensity?: number;
};

/**
 * Shared shell for the smaller section scenes.
 *
 * Transparent (these sit on the page background), and the loop is suspended the
 * moment the section leaves the viewport so several canvases can coexist
 * without ever competing for frames.
 */
export function SectionCanvas({
  children,
  light,
  compact,
  className,
  cameraZ = 7,
  fov = 34,
  rigIntensity = 1,
}: Props) {
  const wrap = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0, rootMargin: "10% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const quality = qualityFor(compact);

  return (
    <div ref={wrap} className={cn("h-full w-full", className)}>
      <Canvas
        dpr={quality.dpr}
        camera={{ position: [0, 0, cameraZ], fov }}
        gl={{ alpha: true, antialias: !compact, powerPreference: "high-performance" }}
        frameloop={active ? "always" : "never"}
        performance={{ min: 0.5 }}
      >
        <StudioRig light={light} intensity={rigIntensity} />
        {children}
      </Canvas>
    </div>
  );
}

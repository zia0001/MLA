import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/**
 * Frame-rate independent damping. `smoothing` is the fraction of the remaining
 * distance left after one second, so behaviour is identical at 60 and 144 Hz.
 */
export const damp = (a: number, b: number, smoothing: number, dt: number) =>
  lerp(a, b, 1 - Math.pow(smoothing, dt));

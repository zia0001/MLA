/**
 * Colour and quality constants shared by every WebGL scene.
 *
 * These mirror the CSS custom properties in globals.css, but WebGL needs plain
 * hex values, so the two are kept deliberately in sync here rather than parsed
 * out of the stylesheet at runtime.
 */

export type SceneTheme = {
  bg: string;
  deep: string;
  elev: string;
  gold: string;
  goldBright: string;
  goldDeep: string;
  rim: string;
  metal: string;
  dark: string;
};

export const SCENE_THEME: Record<"dark" | "light", SceneTheme> = {
  dark: {
    bg: "#04060c",
    deep: "#010308",
    elev: "#0b1222",
    gold: "#c8a44d",
    goldBright: "#f0d9a0",
    goldDeep: "#8a6d22",
    rim: "#5f7fdc",
    metal: "#d9b35c",
    dark: "#141a27",
  },
  light: {
    bg: "#f8f6f0",
    deep: "#e6e2d6",
    elev: "#ffffff",
    gold: "#a5801d",
    goldBright: "#d9b458",
    goldDeep: "#6f5510",
    rim: "#93a9e6",
    metal: "#c99b32",
    dark: "#2b3145",
  },
};

/** Quality tiers. `compact` is phones and small tablets. */
export type Quality = {
  compact: boolean;
  dpr: [number, number];
  bloom: boolean;
  dust: number;
  glyphs: number;
  shadowRes: number;
};

export function qualityFor(compact: boolean): Quality {
  return compact
    ? { compact, dpr: [1, 1.5], bloom: false, dust: 70, glyphs: 5, shadowRes: 256 }
    : { compact, dpr: [1, 1.85], bloom: true, dust: 190, glyphs: 9, shadowRes: 512 };
}

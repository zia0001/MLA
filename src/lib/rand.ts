/**
 * Small seeded PRNG (mulberry32).
 *
 * Particle fields are built during render, so they must be deterministic:
 * `Math.random()` would hand back a different field on every re-render and
 * makes the component impure. A fixed seed also means the composition a
 * designer signs off on is the one that ships.
 */
export function createRandom(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

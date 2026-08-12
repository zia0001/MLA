"use client";

import { useSyncExternalStore } from "react";

/**
 * Tracks whether the intro curtain has lifted.
 *
 * The hero's entrance must not play behind the preloader, so both read this
 * one flag. It lives outside React state because the preloader and the hero
 * are siblings with no useful common ancestor to hold it.
 */
let ready = false;
const listeners = new Set<() => void>();

export const introStore = {
  get: () => ready,
  markReady() {
    if (ready) return;
    ready = true;
    listeners.forEach((listener) => listener());
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useIntroReady() {
  return useSyncExternalStore(introStore.subscribe, introStore.get, () => false);
}

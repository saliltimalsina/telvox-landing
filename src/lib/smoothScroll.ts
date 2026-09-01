import type Lenis from "lenis";

/**
 * Shared handle on the single Lenis instance created by <SmoothScroll />.
 *
 * Scroll-linked components (the pinned Industries wheel) need to update in the
 * same frame Lenis writes the scroll position, not a frame later off a native
 * `scroll` event — otherwise the animation trails the page during momentum and
 * reads as jitter. They grab the instance here and bind to `lenis.on("scroll")`,
 * which fires synchronously inside Lenis's rAF.
 */
let current: Lenis | null = null;
const listeners = new Set<(lenis: Lenis | null) => void>();

export function setLenis(lenis: Lenis | null) {
  current = lenis;
  listeners.forEach((fn) => fn(lenis));
}

export function getLenis(): Lenis | null {
  return current;
}

/** Fires when the instance is created or destroyed. Returns an unsubscribe. */
export function onLenisChange(fn: (lenis: Lenis | null) => void) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

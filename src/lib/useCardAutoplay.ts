"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Cycles a "play token" per card so its visuals can replay their entrance
 * animation on a loop, like the source site's feature cards — most visitors
 * never hover them, so the source auto-fires the hover state every ~6s,
 * staggered per card, pausing off-screen / hidden-tab / reduced-motion.
 */
const HOLD_MS = 2600;
const GAP_MS = 3400;
const STAGGER_MS = 450;

export function useCardAutoplay(
  count: number,
  sectionRef: RefObject<HTMLElement | null>
) {
  const [tokens, setTokens] = useState<number[]>(() => Array(count).fill(0));
  const [active, setActive] = useState<boolean[]>(() => Array(count).fill(false));
  const hovering = useRef<boolean[]>(Array(count).fill(false));

  const setOne = (
    setter: React.Dispatch<React.SetStateAction<boolean[]>>,
    i: number,
    value: boolean
  ) => setter((prev) => prev.map((v, idx) => (idx === i ? value : v)));

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let onScreen = true;
    const el = sectionRef.current;
    let io: IntersectionObserver | undefined;
    if (el && "IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (entries) => {
          onScreen = entries[entries.length - 1].isIntersecting;
        },
        { threshold: 0.15 }
      );
      io.observe(el);
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, ms: number) => {
      const t = setTimeout(fn, ms);
      timers.push(t);
      return t;
    };

    function playCard(i: number) {
      if (hovering.current[i]) return;
      setTokens((prev) => {
        const next = [...prev];
        next[i] += 1;
        return next;
      });
      setOne(setActive, i, true);
      schedule(() => {
        if (!hovering.current[i]) setOne(setActive, i, false);
      }, HOLD_MS);
    }

    function cycle() {
      if (cancelled) return;
      if (document.hidden || !onScreen) {
        schedule(cycle, GAP_MS);
        return;
      }
      for (let i = 0; i < count; i++) {
        schedule(() => playCard(i), i * STAGGER_MS);
      }
      schedule(cycle, HOLD_MS + (count - 1) * STAGGER_MS + GAP_MS);
    }

    schedule(cycle, GAP_MS);

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
      io?.disconnect();
    };
  }, [count, sectionRef]);

  const setHovering = (i: number, value: boolean) => {
    hovering.current[i] = value;
    setOne(setActive, i, value);
  };

  return { tokens, active, setHovering };
}

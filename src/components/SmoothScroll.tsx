"use client";

import { useEffect } from "react";
import gsap from "gsap";
import Lenis from "lenis";
import { setLenis } from "@/lib/smoothScroll";

/**
 * Smooths native scroll via Lenis, driven by GSAP's ticker so it shares one
 * rAF loop with any GSAP animation. Lenis interpolates window.scrollTo under
 * the hood rather than transforming the page, so sticky/fixed elements (the
 * nav) and framer-motion's whileInView keep working untouched.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const glide = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    // Deliberately no top-level duration/easing: Lenis reuses those same
    // options for the scrollTo() it calls internally on every single wheel
    // tick, restarting a fixed-duration tween from scratch each time. Under
    // real, slightly irregular frame timing that restart can occasionally
    // jump its currentTime past duration in one step and snap straight to
    // the target instead of gliding to it -- reads as the scroll freezing
    // then lurching forward, worst in the tall pinned sections (Industries)
    // where a lot of ticks land back to back. `lerp` drives continuous wheel
    // scroll instead: exponential damping has no such cliff. The nicer
    // duration/easing glide is kept, but scoped only to anchor-link clicks
    // (a genuine one-off scrollTo, not a per-tick one) via `anchors`.
    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      anchors: { duration: 1.2, easing: glide },
    });

    const onTick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);
    setLenis(lenis);

    return () => {
      setLenis(null);
      gsap.ticker.remove(onTick);
      lenis.destroy();
    };
  }, []);

  return null;
}

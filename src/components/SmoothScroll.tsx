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

    // A wheel gesture that starts over one of the same-origin iframe embeds
    // (the Industries wheel, the ROI calculator) never reaches this
    // window's "wheel" listener at all -- iframes are a separate browsing
    // context, so Lenis's VirtualScroll (bound to `window`) simply never
    // sees it. The browser falls back to its own native scroll chaining for
    // that gesture: an instant, un-eased jump instead of a lerp'd glide,
    // which reads as the smooth scroll suddenly sticking right over those
    // two sections. The embeds forward their wheel deltas here (see
    // industries.html / roi-calculator.html); redispatching as a real
    // "wheel" event lets Lenis handle it exactly like any other tick.
    const onBridgedWheel = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      const data = e.data;
      if (!data || data.type !== "telvox:wheel") return;
      window.dispatchEvent(
        new WheelEvent("wheel", {
          deltaX: data.deltaX,
          deltaY: data.deltaY,
          deltaMode: data.deltaMode,
          bubbles: true,
          cancelable: true,
        }),
      );
    };
    window.addEventListener("message", onBridgedWheel);

    return () => {
      setLenis(null);
      gsap.ticker.remove(onTick);
      lenis.destroy();
      window.removeEventListener("message", onBridgedWheel);
    };
  }, []);

  return null;
}

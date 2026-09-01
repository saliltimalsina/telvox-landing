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

    const lenis = new Lenis({
      duration: 1.6,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
      anchors: true,
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

"use client";

import { useEffect, useRef } from "react";
import type Lenis from "lenis";
import { getLenis, onLenisChange } from "@/lib/smoothScroll";

const PIN_OFFSET = 88;

/**
 * The "Built for every industry" wheel.
 *
 * The wheel itself is a self-contained embed (public/embeds/industries.html)
 * carrying its own Tailwind build, so it stays in an iframe rather than
 * leaking a second reset into this document. An iframe can't see the parent's
 * scroll, so the pinning happens here and progress (0..1) is posted in — the
 * embed turns that into one full revolution.
 */
export default function Industries() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let queued = false;
    let sent = -1;

    // getBoundingClientRect() forces a synchronous layout recalculation.
    // post() used to call it on every scroll frame for the whole 300vh this
    // section is pinned for -- a sustained forced reflow on every tick,
    // unique to this section, and the real remaining cause of the jank here.
    // Measured once (and re-measured only on load/resize/actual size
    // changes) instead; post() then only reads window.scrollY, which is
    // free.
    let top = 0;
    let height = 0;
    const measure = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      top = rect.top + window.scrollY;
      height = rect.height;
    };

    const post = () => {
      queued = false;
      const frame = frameRef.current;
      if (!frame?.contentWindow) return;

      const span = height - (window.innerHeight - PIN_OFFSET);
      if (span <= 0) return;

      const p = Math.min(1, Math.max(0, (window.scrollY - top) / span));
      if (Math.abs(p - sent) < 0.001) return;
      sent = p;
      frame.contentWindow.postMessage(
        { type: "telvox:industries-progress", progress: p },
        window.location.origin,
      );
    };

    // rAF-throttled path for native scroll / resize.
    const schedule = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(post);
    };

    const remeasureAndPost = () => {
      measure();
      sent = -1;
      post();
    };

    // When Lenis is running, bind to its own scroll event: it fires
    // synchronously inside Lenis's rAF, in the same frame the scroll position
    // is written, so the wheel tracks the page instead of trailing it by a
    // frame (which is what read as jitter through the pinned section).
    let bound: Lenis | "native" | "unset" = "unset";
    const bind = (lenis: Lenis | null) => {
      const next = lenis ?? "native";
      if (next === bound) return;
      if (bound === "native") window.removeEventListener("scroll", schedule);
      else if (bound !== "unset") bound.off("scroll", post);

      if (lenis) {
        lenis.on("scroll", post);
        bound = lenis;
      } else {
        window.addEventListener("scroll", schedule, { passive: true });
        bound = "native";
      }
      post();
    };

    measure();
    bind(getLenis());
    const unbindWatch = onLenisChange(bind);

    const frame = frameRef.current;
    // The frame is lazy; hand it the current position once it loads.
    const onLoad = () => remeasureAndPost();
    frame?.addEventListener("load", onLoad);
    window.addEventListener("resize", remeasureAndPost);
    // Layout above this section can still shift after mount (webfonts
    // swapping in changes text height), which would leave `top` stale.
    document.fonts?.ready.then(remeasureAndPost);

    const section = sectionRef.current;
    const ro = section ? new ResizeObserver(remeasureAndPost) : null;
    if (section) ro?.observe(section);

    post();

    return () => {
      unbindWatch();
      if (bound === "native") window.removeEventListener("scroll", schedule);
      else if (bound !== "unset") bound.off("scroll", post);
      frame?.removeEventListener("load", onLoad);
      window.removeEventListener("resize", remeasureAndPost);
      ro?.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} id="industries" className="telvox-industries">
      <div className="telvox-industries-pin">
        <div className="telvox-industries-frame">
          <iframe
            ref={frameRef}
            src="/embeds/industries.html"
            title="Built for every industry"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

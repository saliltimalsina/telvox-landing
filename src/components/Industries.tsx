"use client";

import { useEffect, useRef } from "react";

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

    const post = () => {
      queued = false;
      const section = sectionRef.current;
      const frame = frameRef.current;
      if (!section || !frame?.contentWindow) return;

      const rect = section.getBoundingClientRect();
      const span = rect.height - (window.innerHeight - PIN_OFFSET);
      if (span <= 0) return;

      const p = Math.min(1, Math.max(0, -rect.top / span));
      if (Math.abs(p - sent) < 0.001) return;
      sent = p;
      frame.contentWindow.postMessage(
        { type: "telvox:industries-progress", progress: p },
        window.location.origin,
      );
    };

    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(post);
    };

    const frame = frameRef.current;
    // The frame is lazy; hand it the current position once it loads.
    const onLoad = () => {
      sent = -1;
      post();
    };
    frame?.addEventListener("load", onLoad);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      frame?.removeEventListener("load", onLoad);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
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

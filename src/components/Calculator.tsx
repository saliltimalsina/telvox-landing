"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { getLenis } from "@/lib/smoothScroll";
import { BOOK_A_CALL } from "@/lib/site";

/**
 * The ROI calculator is a self-contained embed for the same reason the
 * industries wheel is — it ships its own Tailwind build. It reports its
 * rendered height back over postMessage; the fallback heights below are what
 * shows if that message never arrives.
 */
export default function Calculator() {
  const [height, setHeight] = useState<number | null>(null);
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type === "telvox:roi-height" && typeof e.data.height === "number") {
        setHeight(e.data.height);
        // The iframe just changed the page's height; let Lenis recompute its
        // scroll limit so momentum doesn't fight a stale bound near here.
        getLenis()?.resize();
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <section id="calculator" className="px-5 py-16 min-[810px]:py-24">
      <SectionHeading
        eyebrow="ROI Calculator"
        headline="Calculate How Telvox Can Transform"
        gradient="Your Business"
        badge="/icons/badge-calculator.png"
      />

      {/* Source: gradient card 1060 wide with 20px corners; the frame is
          flush to its edges and the white bar is inset 20px. */}
      <Reveal className="relative mx-auto mt-10 w-full max-w-[1060px] min-[810px]:mt-14">
        {/* Same artwork, blurred and bled past the card's own edges so the
            glow fades into the page instead of stopping dead at the
            rounded-corner clip. Sits behind the opaque card, so it never
            washes out the embed's headings the way a full gradient did. */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-4 -z-10 rounded-[20px] opacity-90 blur-2xl"
          style={{
            backgroundImage: "url(/cards/calculator-bg.webp)",
            backgroundSize: "100% 100%",
            // Rasterize the blur once onto its own compositor layer so scroll
            // just moves the cached bitmap instead of re-running blur(40px).
            transform: "translateZ(0)",
            willChange: "transform",
          }}
        />
        {/* The card's surface is the site's own artwork (1060×575), not a
            gradient — an invented one washes out the embed's own headings. */}
        <div
          className="relative overflow-hidden rounded-[20px]"
          style={{
            backgroundImage: "url(/cards/calculator-bg.webp)",
            backgroundSize: "100% 100%",
          }}
        >
          {/* Eager, not lazy: if the embed reports its height only once the
              user scrolls near it, the content jump lands mid-momentum under
              Lenis and reads as a stutter. Settle the height up front. */}
          <iframe
            ref={frameRef}
            src="/embeds/roi-calculator.html"
            title="ROI calculator"
            loading="eager"
            className="roi-frame block w-full border-0"
            style={height ? { height } : undefined}
          />

          <div className="m-4 mt-0 flex flex-col items-start justify-between gap-4 rounded-[20px] bg-white px-5 py-5 min-[810px]:m-5 min-[810px]:flex-row min-[810px]:items-center min-[810px]:px-7 min-[810px]:py-6">
            <div>
              <p className="text-[17px] font-semibold text-[#171034] min-[810px]:text-[20px]">
                Get Started With Telvox, Acheive ROI Like Never Before
              </p>
              <p className="mt-1 text-[15px] text-black/55">
                Automate sales, boost retention, and unlock recurring revenue
              </p>
            </div>
            <a
              href={BOOK_A_CALL}
              target="_blank"
              rel="noopener"
              className="btn-nav-shadow flex shrink-0 items-center gap-2 rounded-2xl bg-[#171034] px-5 py-3.5 text-[16px] font-medium text-white transition-transform hover:scale-[1.02]"
            >
              Request a Demo
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </Reveal>

      <p className="mx-auto mt-8 max-w-[1000px] text-center text-[14px] leading-[1.6] text-black/45">
        Passive Subscriber Income comes from long-term subscribers who are
        unlikely to cancel, providing stable income without additional
        advertising. This calculator provides estimates based on real client
        results. It does not constitute an income claim or financial guarantee.
      </p>
    </section>
  );
}

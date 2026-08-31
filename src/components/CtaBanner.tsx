"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import Reveal from "./Reveal";
import { BOOK_A_CALL } from "@/lib/site";

/**
 * Measured off the source: a 1200×550 panel, 20px corners, painted with a
 * radial gradient (not a linear one) and overlaid with the site's own texture.
 * Four 80px icon tiles sit at fixed positions within that box.
 */
const PANEL_W = 1200;
const PANEL_H = 550;

const FLOATERS = [
  { src: "/icons/cta-float-1.png", x: 90, y: 80, drift: -10 },
  { src: "/icons/cta-float-2.png", x: 120, y: 390, drift: 12 },
  { src: "/icons/cta-float-3.png", x: 1000, y: 390, drift: -12 },
  { src: "/icons/cta-float-4.png", x: 1030, y: 80, drift: 10 },
];

export default function CtaBanner() {
  return (
    <section className="px-2.5 pb-16 min-[810px]:px-5 min-[810px]:pb-24">
      <Reveal className="mx-auto w-full max-w-[1200px]">
        <div
          className="relative isolate overflow-hidden rounded-[20px] px-5 py-[72px] text-center text-white min-[810px]:px-8 min-[810px]:py-20"
          style={{
            background:
              "radial-gradient(95.2572% 105.254% at 50% 5.79816%, rgb(162, 30, 232) 20%, rgb(242, 57, 160) 100%)",
          }}
        >
          {/* The source's ring texture, at the 5% opacity it carries there —
              a faint sheen over the gradient, not a visible pattern. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/cards/cta-texture.png"
            alt=""
            aria-hidden
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.05]"
          />

          {/* Icon tiles, placed as a share of the 1200×550 box so they hold
              their positions as the panel scales down. */}
          {FLOATERS.map((f, i) => (
            <motion.span
              key={f.src}
              aria-hidden
              animate={{ y: [0, f.drift, 0] }}
              transition={{
                duration: 5 + i * 0.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              /* 80×80 white tile, 32px corners, with the source's shadow. */
              className="pointer-events-none absolute hidden h-20 w-20 rounded-[32px] bg-white shadow-[0_5px_10px_rgba(0,0,0,0.1),0_18px_18px_rgba(0,0,0,0.09)] lg:block"
              style={{
                left: `${(f.x / PANEL_W) * 100}%`,
                top: `${(f.y / PANEL_H) * 100}%`,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={f.src} alt="" className="h-full w-full object-contain" />
            </motion.span>
          ))}

          <span className="pill-shadow inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-[16px] text-[#171034]">
            <Sparkles size={15} />
            AI Voice Infrastructure
          </span>

          <h2 className="mx-auto mt-6 max-w-[850px] text-[30px] font-bold leading-[1.15] tracking-[-0.02em] min-[810px]:mt-7 min-[810px]:text-[52px] min-[1200px]:text-[68px] min-[1200px]:leading-[74.8px] font-[family-name:var(--font-jakarta)]">
            Ready To See It
            <br />
            <span className="inline-flex items-center gap-0 align-middle">
              {/* The source clip is a 682x360 frame with the wordmark
                  sitting in the top ~55% and a tagline underneath; crop to
                  just the wordmark (x:63-620, y:60-255 of the frame) via a
                  clipped, percentage-scaled video so it reads at full size
                  instead of shrinking to fit the whole frame. */}
              <span className="relative -mr-4 inline-block h-[46px] w-[131px] shrink-0 overflow-hidden align-middle min-[810px]:-mr-7 min-[810px]:h-[80px] min-[810px]:w-[228px]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="absolute"
                  style={{
                    width: "122.4%",
                    height: "184.6%",
                    left: "-11.31%",
                    top: "-30.77%",
                  }}
                >
                  <source src="/videos/telvox.webm" type="video/webm" />
                </video>
              </span>
              For Yourself?
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-[16px] leading-[1.55] text-white/90 min-[810px]:mt-6 min-[810px]:text-[18px]">
            Great question — happy to walk you through the specifics. Book a
            20-minute demo and we’ll show you exactly how it works for your
            business, in your language, on your systems.
          </p>

          <a
            href={BOOK_A_CALL}
            target="_blank"
            rel="noopener"
            className="btn-nav-shadow mx-auto mt-8 flex w-fit items-center gap-3 rounded-2xl bg-[#171034] px-6 py-3.5 text-[16px] font-medium text-white transition-transform hover:scale-[1.03] min-[810px]:mt-9 min-[810px]:px-7 min-[810px]:py-4 min-[810px]:text-[18px]"
          >
            Request a Demo
            <Sparkles size={17} />
          </a>
        </div>
      </Reveal>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import HeroIllustration from "./HeroIllustration";

const BOOK_A_CALL = "https://cal.com/team/telvox/intro";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-20 mx-auto flex max-w-[848px] flex-col items-center px-5 pt-8 text-center min-[810px]:pt-[50px]"
      >
        <motion.span
          variants={item}
          className="pill-shadow flex items-center gap-2 rounded-2xl bg-white px-4 py-2 text-[18px] text-[#171034]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          <Phone size={17} strokeWidth={2} />
          AI Voice Infrastructure
        </motion.span>

        <motion.h1
          variants={item}
          /* w-full so the flex column doesn't shrink it to its content —
             the source headline box is exactly 800px wide. */
          className="mt-6 w-full text-[32px] leading-[1.15] font-bold tracking-[-0.04em] text-black min-[810px]:text-[64px] min-[810px]:leading-[1.1] min-[810px]:tracking-[-0.05em] min-[1200px]:text-[78px]"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Every Call Answered.
          <br />
          <span className="inline-flex items-center gap-3 align-middle">
            <span
              className="inline-flex h-[1.026em] w-[1.026em] shrink-0 items-center justify-center rounded-[0.246em]"
              style={{
                background:
                  "linear-gradient(210deg, rgb(153, 48, 239) 0%, rgb(242, 59, 161) 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/icons/hero-badge.png"
                alt=""
                className="h-full w-full object-contain"
              />
            </span>
            <span className="brand-gradient-text" style={{ wordSpacing: "0.14em" }}>
              Every Time.
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-5 max-w-[600px] text-[17px] leading-[1.5] text-black min-[810px]:mt-6 min-[810px]:text-[24px] min-[810px]:leading-[1.4]"
        >
          Telvox is AI voice infrastructure for organizations that can&rsquo;t
          afford to miss a conversation. Connect. Communicate. Scale.
        </motion.p>

        <motion.a
          variants={item}
          href={BOOK_A_CALL}
          target="_blank"
          rel="noopener"
          className="brand-gradient-bg btn-cta-shadow mt-8 flex items-center gap-3 rounded-2xl px-5 py-4 text-[17px] leading-[22px] font-medium text-white transition-transform hover:scale-[1.02] min-[810px]:mt-12 min-[810px]:px-6 min-[810px]:py-[18px] min-[810px]:text-[20px] min-[810px]:leading-[25px]"
        >
          Request a Demo
          <span className="flex h-[25px] w-[25px] items-center justify-center rounded-full bg-white/25">
            <ArrowRight size={15} strokeWidth={2.5} />
          </span>
        </motion.a>
      </motion.div>

      {/* Pulled up so the illustration sits behind the CTA, as on the source site. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
        className="hero-mask relative z-10 -mt-4 mx-auto w-full max-w-[1250px] min-[810px]:-mt-[62px]"
      >
        <HeroIllustration />
      </motion.div>

    </section>
  );
}

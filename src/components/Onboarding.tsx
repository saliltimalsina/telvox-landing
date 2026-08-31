"use client";

import SectionHeading from "./SectionHeading";
import { STEP_VISUALS } from "./StepVisuals";

/**
 * Measured off the source, at 1440:
 *
 *   section        full-bleed white panel, 20px corners (the page is grey)
 *   step card      850×380, fixed width, centred; bg #efefef, 16px corners
 *   card pitch     420px (380 tall + 40 gap)
 *   sticky tops    160 / 180 / 200 / 220 — each card rests 20px below the last
 *   split          425 copy | 425 artwork
 *
 * Inside the copy half (40px inset):
 *   "01"      90px/700 white, -5.4px tracking, at y 13
 *   step pill 82×33, 11px corners, gradient 170.592deg, label 14px/600, y 209
 *   title     24px/600 #171034, -0.24px, y 260
 *   body      16px/400 #696969, -0.16px, y 308, 345 wide
 */

const STEPS = [
  {
    n: "01",
    step: "STEP 1",
    title: "We Learn Your Business",
    desc: "Your services, your workflows, your tone. One conversation is usually enough.",
  },
  {
    n: "02",
    step: "STEP 2",
    title: "We Configure & Train Your Agent",
    desc: "We train your AI agent on your specific products, FAQs, and processes.",
  },
  {
    n: "03",
    step: "STEP 3",
    title: "We Connect Your Stack",
    desc: "We connect Telvox to your existing systems — your calendar, CRM, phone line, website.",
  },
  {
    n: "04",
    step: "STEP 4",
    title: "We Monitor & Improve",
    desc: "Your agent goes live. We monitor, optimise, and improve continuously from day one.",
  },
];

const STEP_PILL_GRADIENT =
  "linear-gradient(170.592deg, rgb(162, 30, 232) 44.4975%, rgb(242, 57, 160) 100%)";

export default function Onboarding() {
  return (
    <section id="onboarding" className="rounded-[20px] bg-white py-16 min-[810px]:py-24">
      <SectionHeading
        eyebrow="Onboarding"
        headline="Effortless Onboarding In"
        gradient="Minutes"
        badge="/icons/badge-onboarding.png"
        subcopy="Live in weeks, not months. We handle everything — you just show up on go-live day."
      />

      <div className="mt-10 px-5 min-[810px]:mt-16">
        {STEPS.map((s, i) => (
          <div
            key={s.n}
            className="sticky mx-auto w-full max-w-[850px]"
            style={{ top: 96 + i * 16, marginBottom: 24 }}
          >
            <div className="flex h-[433px] flex-col overflow-hidden rounded-2xl bg-[#efefef] min-[810px]:h-[380px] min-[810px]:flex-row">
              {/* Copy half. The number pins to the top and the text block to
                  the bottom, so nothing can overflow the fixed height: with
                  13px above and 24px below, the pill lands at y209 and the
                  body ends at y356 — the source's positions. */}
              <div className="flex w-full shrink-0 flex-col px-6 pb-4 pt-[13px] min-[810px]:w-1/2 min-[810px]:justify-between min-[810px]:px-10 min-[810px]:pb-6">
                <span className="block text-[48px] font-bold leading-none tracking-[-0.06em] text-white min-[810px]:text-[90px]">
                  {s.n}
                </span>

                <div className="mt-5 min-[810px]:mt-0">
                  <span
                    className="inline-flex h-[33px] items-center rounded-[11px] px-[19px] text-[14px] font-semibold tracking-[-0.02em] text-white"
                    style={{ background: STEP_PILL_GRADIENT }}
                  >
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-[19px] font-semibold leading-[1.2] tracking-[-0.01em] text-[#171034] min-[810px]:mt-[18px] min-[810px]:text-[24px]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.45] tracking-[-0.01em] text-[#696969] min-[810px]:mt-[19px] min-[810px]:text-[16px]">
                    {s.desc}
                  </p>
                </div>
              </div>

              {/* artwork half */}
              <div className="relative min-h-0 w-full flex-1 shrink-0 min-[810px]:h-auto min-[810px]:w-1/2 min-[810px]:flex-none">
                {(() => {
                  const Visual = STEP_VISUALS[i];
                  return <Visual />;
                })()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

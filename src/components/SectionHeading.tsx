"use client";

import Reveal from "./Reveal";

/**
 * The heading block every section shares: a white eyebrow pill, a two-tone
 * headline where the last phrase carries the brand gradient and is preceded by
 * a 53px gradient icon tile, then optional subcopy.
 *
 * Measured from the source: h2 is 48px/700, -1.92px tracking, 60px line-height,
 * capped at 800px wide.
 */
export default function SectionHeading({
  eyebrow,
  headline,
  gradient,
  badge,
  subcopy,
  className = "",
}: {
  eyebrow: string;
  /** The plain-coloured part of the headline; pass JSX to force line breaks. */
  headline: React.ReactNode;
  /** The trailing phrase rendered in the brand gradient. */
  gradient: string;
  /** Path to the icon shown in the gradient tile before `gradient`. */
  badge: string;
  subcopy?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <Reveal>
        <span className="pill-shadow inline-flex items-center rounded-2xl bg-white px-4 py-2 text-[18px] text-[#171034] font-[family-name:var(--font-jakarta)]">
          {eyebrow}
        </span>
      </Reveal>

      <Reveal delay={0.08}>
        <h2 className="mt-6 max-w-[800px] text-[28px] leading-[1.25] font-bold tracking-[-0.03em] text-[#171034] min-[810px]:mt-7 min-[810px]:text-[40px] min-[810px]:tracking-[-0.04em] min-[1200px]:text-[48px] min-[1200px]:leading-[60px] font-[family-name:var(--font-jakarta)]">
          {headline}{" "}
          <span className="inline-flex items-center gap-2 align-middle min-[810px]:gap-3">
            <span
              className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-xl min-[810px]:h-[53px] min-[810px]:w-[53px] min-[810px]:rounded-2xl"
              style={{
                background:
                  "linear-gradient(209.616deg, rgb(153, 48, 239) 0%, rgb(242, 59, 161) 100%)",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={badge} alt="" className="h-full w-full object-contain" />
            </span>
            <span className="brand-gradient-text">{gradient}</span>
          </span>
        </h2>
      </Reveal>

      {subcopy && (
        <Reveal delay={0.16}>
          <p className="mt-4 max-w-[700px] text-[16px] leading-[1.5] text-black/55 min-[810px]:mt-5 min-[810px]:text-[18px]">
            {subcopy}
          </p>
        </Reveal>
      )}
    </div>
  );
}

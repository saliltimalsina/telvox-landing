"use client";

import { INTEGRATION_LOGOS } from "@/lib/site";

/**
 * Continuous logo strip. The track holds two copies of the row and slides by
 * exactly half its width, so the loop is seamless.
 */
export default function LogoMarquee() {
  const row = [...INTEGRATION_LOGOS, ...INTEGRATION_LOGOS];

  return (
    <section className="pb-14 min-[810px]:pb-20">
      <p className="pb-8 text-center text-[14px] text-[rgba(0,14,35,0.5)]">
        Works seamlessly with the tools you already use
      </p>

      <div className="marquee-mask overflow-hidden">
        <div className="marquee-track flex w-max items-center gap-20">
          {row.map((src, i) => (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key={i}
              src={src}
              alt=""
              className="h-8 w-auto shrink-0 object-contain opacity-70"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

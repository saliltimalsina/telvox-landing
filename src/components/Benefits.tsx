"use client";

import { Calendar } from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import LottieBox from "./LottieBox";
import { BOOK_A_CALL } from "@/lib/site";

/**
 * The bento grid, measured off the source:
 *
 *   three 413px columns at x = 80 / 513 / 947, 20px gutters
 *   col 1   460, 460
 *   col 2   300, 300, 300
 *   col 3   460, 460      → every column totals 940px
 *
 * Cards are white with 16px corners, artwork flush at the top, copy beneath.
 * Three of the visuals are the site's own Lottie files and four are its own
 * artwork — none of this is redrawn.
 */

function Card({
  h,
  title,
  desc,
  children,
  delay = 0,
}: {
  h: 460 | 300;
  title: string;
  desc: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <Reveal delay={delay}>
      <div
        className="flex flex-col overflow-hidden rounded-2xl bg-white"
        style={{ height: h }}
      >
        <div className="relative min-h-0 flex-1 overflow-hidden">{children}</div>
        <div className="px-6 pb-6 pt-4">
          <h3 className="text-[19px] font-semibold leading-tight text-[#171034]">
            {title}
          </h3>
          <p className="mt-2 text-[15px] leading-[1.5] text-black/55">{desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

/** Full-bleed artwork lifted from the source. */
function Art({ src }: { src: string }) {
  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img src={src} alt="" className="h-full w-full object-cover object-top" />
  );
}

export default function Benefits() {
  return (
    <section className="px-5 py-16 min-[810px]:py-24">
      <SectionHeading
        eyebrow="Benefits"
        headline="Built To Help You"
        gradient="Grow"
        badge="/icons/badge-benefits.png"
        subcopy="Sick of payment issues, billing errors, and chargebacks? Telvox handles the backend while you watch revenue stack on autopilot."
      />

      <div className="mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-5 min-[810px]:mt-16 min-[1200px]:grid-cols-3">
        {/* column 1 — 460, 460 */}
        <div className="flex flex-col gap-5">
          <Card
            h={460}
            title="Books Appointments Automatically"
            desc="Every enquiry logged, every lead scored and synced to your CRM automatically."
          >
            <LottieBox
              src="/lottie/lead-funnel.json"
              ratio="840/794"
              className="h-full w-full"
            />
          </Card>
          <Card
            h={460}
            delay={0.08}
            title="Works With Your Systems"
            desc="API-first. Connects to your CRM, ERP, hospital system, or internal database — it fits in, it doesn’t replace."
          >
            <Art src="/cards/works-with-your-systems.webp" />
          </Card>
        </div>

        {/* column 2 — 300, 300, 300 */}
        <div className="flex flex-col gap-5">
          <Card
            h={300}
            delay={0.04}
            title="Speaks Your Language"
            desc="Any language, any accent. Natural conversations, not translations."
          >
            <Art src="/cards/speaks-your-language.png" />
            {/* Overlaid, not part of the artwork — 69×33 at 16px in from the card. */}
            <span className="absolute left-4 top-4 flex h-[33px] w-[69px] items-center justify-center gap-1.5 rounded-xl bg-white text-[13px] font-medium text-[#171034] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
              <span className="h-[7px] w-[7px] rounded-full bg-[#22c55e]" />
              Live
            </span>
          </Card>
          <Card
            h={300}
            delay={0.12}
            title="Less Busywork, More Growth"
            desc="Skip the guesswork. Launch fast and hassle-free with Telvox’s voice infrastructure."
          >
            <div className="absolute inset-0 scale-[1.9]">
              <LottieBox
                src="/lottie/integration-orbit.json"
                ratio="827/600"
                className="h-full w-full"
              />
            </div>
          </Card>
          <Card
            h={300}
            delay={0.2}
            title="Captures & Qualifies Leads"
            desc="Integrates with your calendar. Books, reschedules, and sends reminders automatically."
          >
            <Art src="/cards/captures-qualifies-leads.png" />
          </Card>
        </div>

        {/* column 3 — 460, 460 */}
        <div className="flex flex-col gap-5">
          <Card
            h={460}
            delay={0.08}
            title="Knows When To Hand Over"
            desc="Hands over to a human, intelligently, with full context already handed over, when it matters most."
          >
            <LottieBox
              src="/lottie/handoff.json"
              ratio="1/1"
              className="h-full w-full"
            />
          </Card>

          {/* The artwork is the whole card here — copy sits over its lower half. */}
          <Reveal delay={0.16}>
            <div className="relative h-[460px] overflow-hidden rounded-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cards/never-miss-another-call.webp"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 px-6 pb-6">
                <h3 className="text-[19px] font-semibold leading-tight text-[#171034]">
                  Never Miss Another Call
                </h3>
                <p className="mt-2 text-[15px] leading-[1.5] text-black/55">
                  Book a 20-minute live demo. A real agent, your industry, your
                  language. No commitment, no sales pressure — just the product.
                </p>
                <a
                  href={BOOK_A_CALL}
                  target="_blank"
                  rel="noopener"
                  className="btn-nav-shadow mt-4 inline-flex items-center gap-2 rounded-2xl bg-[#171034] px-5 py-3 text-[16px] font-medium text-white transition-transform hover:scale-[1.02]"
                >
                  Request a Demo
                  <Calendar size={16} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

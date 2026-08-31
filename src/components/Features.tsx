"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Phone, PenLine } from "lucide-react";
import { useRef } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EASE } from "@/lib/site";
import { useCardAutoplay } from "@/lib/useCardAutoplay";

function Card({
  title,
  desc,
  children,
  delay,
  onHoverChange,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
  delay: number;
  onHoverChange: (hovering: boolean) => void;
}) {
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        className="flex h-[444px] flex-col overflow-hidden rounded-2xl bg-[#f9f9f9] p-6 min-[1200px]:h-[454px]"
      >
        <h3 className="text-[20px] font-semibold text-[#171034]">{title}</h3>
        <p className="mt-2 text-[15px] leading-[1.55] text-black/55">{desc}</p>
        <div className="relative mt-6 flex-1">{children}</div>
      </div>
    </Reveal>
  );
}

/** Card 1 — a stack of answered inbound calls. */
function InboundList({ playToken }: { playToken: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={playToken}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="flex flex-col gap-3"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 * i, ease: EASE }}
            className="flex items-center gap-3 rounded-xl bg-white px-3 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
          >
            <span className="brand-gradient-bg flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white">
              <Phone size={17} fill="currentColor" strokeWidth={0} />
            </span>
            <span className="flex-1">
              <span className="block text-[15px] font-semibold text-[#171034]">
                Inbound
              </span>
              <span className="block text-[13px] text-black/45">
                Answered · 0:04
              </span>
            </span>
            <span className="text-[13px] font-semibold text-[#171034]">
              Inbound
            </span>
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
}

/**
 * Card 2 — an outbound campaign, mid-send.
 *
 * The source genuinely swaps content on hover rather than replaying the same
 * thing: at rest it shows the one sent reminder with two queued placeholders
 * below; hovered/active it reveals what's actually queued — two real
 * reminders and a "View Campaign" button — then settles back to rest.
 */
function CampaignPanel({ active }: { active: boolean }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
      <div className="flex items-center gap-2 border-b border-black/[.06] px-3 py-2.5">
        <Phone size={13} className="text-black/50" />
        <span
          className={`flex-1 text-[13px] transition-colors duration-300 ${
            active ? "font-semibold text-[#171034]" : "text-[#171034]"
          }`}
        >
          Payment reminder
        </span>
        <span className="text-[12px] text-black/40">Running</span>
      </div>

      <AnimatePresence mode="wait">
        {active ? (
          <motion.div
            key="queue"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="m-3 space-y-2"
          >
            <div className="flex gap-3 rounded-lg border border-black/[.06] p-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/cards/reminder-sarah.webp"
                alt=""
                className="h-[52px] w-[46px] shrink-0 rounded-md object-cover"
              />
              <span className="flex-1">
                <span className="block text-[13px] font-semibold leading-tight text-[#171034]">
                  Reminder to Sarah M.
                </span>
                <span className="mt-1 block text-[12px] text-black/45">
                  Size · L
                </span>
              </span>
            </div>
            <div className="flex gap-3 rounded-lg border border-black/[.06] p-2">
              <span className="brand-gradient-bg flex h-[52px] w-[46px] shrink-0 items-center justify-center rounded-md">
                <PenLine size={16} className="text-white" />
              </span>
              <span className="flex-1">
                <span className="block text-[13px] font-semibold leading-tight text-[#171034]">
                  Reminder to James K.
                </span>
                <span className="mt-1 block text-[12px] text-black/45">
                  Outbound call
                </span>
              </span>
            </div>
            <span className="mt-1 block rounded-md bg-[#171034] px-3 py-2.5 text-center text-[12px] font-medium text-white">
              View Campaign
            </span>
          </motion.div>
        ) : (
          <motion.div
            key="rest"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
              className="m-3 flex gap-3 rounded-lg border border-black/[.06] p-2"
            >
              <span className="brand-gradient-bg flex h-[52px] w-[46px] shrink-0 items-center justify-center rounded-md">
                <PenLine size={16} className="text-white" />
              </span>
              <span className="flex-1">
                <span className="block text-[13px] font-semibold text-[#171034]">
                  Payment Reminder
                </span>
                <span className="block text-[12px] font-medium text-[#f239a0]">
                  Sent to customer!
                </span>
                <span className="mt-1.5 block rounded-md bg-[#171034] px-3 py-1.5 text-center text-[11px] font-medium text-white">
                  View Campaign
                </span>
              </span>
            </motion.div>

            {/* Ghosted rows behind — the rest of the queue. */}
            {[0, 1].map((i) => (
              <div
                key={i}
                className="mx-3 mb-3 flex gap-3 rounded-lg border border-dashed border-black/[.08] p-2"
              >
                <span className="h-[46px] w-[42px] shrink-0 rounded-md bg-black/[.05]" />
                <span className="flex-1 space-y-2 pt-2">
                  <span className="block h-2 w-3/4 rounded bg-black/[.05]" />
                  <span className="block h-2 w-1/2 rounded bg-black/[.05]" />
                </span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Card 3 — sentiment trend, bars growing on reveal. */
const BARS = [
  { m: "JAN", v: 72 },
  { m: "FEB", v: 65 },
  { m: "MAR", v: 78 },
  { m: "APR", v: 85 },
  { m: "MAY", v: 91 },
  { m: "JUN", v: 96 },
];

function SentimentChart({ playToken }: { playToken: number }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={playToken}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.35, ease: EASE }}
        className="flex h-full flex-col"
      >
        <p className="text-[12px] text-black/45">Call Sentiment Trend · 2026</p>
        <p className="mt-1 text-[20px] font-semibold text-[#171034]">
          $1,256,345
        </p>
        <p className="text-[12px] font-medium text-[#f239a0]">
          +23% from last year
        </p>

        {/* The bars animate to a % of this box, so it needs a definite height. */}
        <div className="mt-5 flex h-[170px] items-end gap-2.5">
          {BARS.map((b, i) => (
            <div key={b.m} className="flex h-full flex-1 flex-col justify-end">
              <motion.div
                initial={{ height: 0 }}
                whileInView={{ height: `${b.v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE }}
                className="relative flex w-full justify-center rounded-t-[3px] border border-black/[.07] bg-[repeating-linear-gradient(135deg,transparent_0_4px,rgba(0,0,0,0.04)_4px_5px)]"
              >
                <span
                  className={`absolute -top-3 rounded-md px-1.5 py-0.5 text-[10px] font-medium text-white ${
                    i === BARS.length - 1 ? "brand-gradient-bg" : "bg-[#171034]"
                  }`}
                >
                  {b.v}%
                </span>
              </motion.div>
              <span className="mt-2 shrink-0 text-center text-[10px] text-black/40">
                {b.m}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const { tokens, active, setHovering } = useCardAutoplay(3, sectionRef);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="px-5 py-16 min-[810px]:py-24"
    >
      <SectionHeading
        eyebrow="Features"
        headline={
          <>
            One Platform. Every
            <br />
            Conversation
          </>
        }
        gradient="Handled"
        badge="/icons/badge-features.png"
        subcopy="Every call answered, every time. No missed conversations. No hold music. No wasted opportunity."
      />

      {/* Same geometry as the source: three 413px columns, 20px gutters. */}
      <div className="mx-auto mt-10 grid max-w-[1280px] grid-cols-1 gap-5 min-[810px]:mt-16 min-[1200px]:grid-cols-3">
        <Card
          title="Always On, Every Time"
          desc="Always on. Answers every inbound call in under 2 rings, 24 hours a day. No hold music, no missed calls."
          delay={0}
          onHoverChange={(h) => setHovering(0, h)}
        >
          <InboundList playToken={tokens[0]} />
        </Card>
        <Card
          title="Outbound Campaigns, Automated"
          desc="Outbound campaigns. Reminders, follow-ups, surveys, promotions. All without lifting a finger."
          delay={0.1}
          onHoverChange={(h) => setHovering(1, h)}
        >
          <CampaignPanel active={active[1]} />
        </Card>
        <Card
          title="Full Analytics, In Real Time"
          desc="Full analytics. Every call recorded, transcribed, and summarised. Sentiment, intent, and outcomes, all visible in real time."
          delay={0.2}
          onHoverChange={(h) => setHovering(2, h)}
        >
          <SentimentChart playToken={tokens[2]} />
        </Card>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Building2,
  ChartLine,
  Check,
  Clock,
  FileText,
  Languages,
  type LucideIcon,
  PhoneCall,
  Plug,
  Send,
  ShieldCheck,
  Target,
  UserRoundCheck,
  X,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EASE } from "@/lib/site";

/** `others` is what the competition offers; Telvox has every row. */
const ROWS: { label: string; icon: LucideIcon; others: boolean }[] = [
  { label: "Built For Institutions", icon: Building2, others: true },
  { label: "Multilingual By Design", icon: Languages, others: false },
  { label: "2 Rings Or Less", icon: PhoneCall, others: true },
  { label: "24/7, No Downtime", icon: Clock, others: true },
  { label: "100% Transcribed & Visible", icon: FileText, others: true },
  { label: "Fits Your Existing Stack", icon: Plug, others: false },
  { label: "Full Sentiment Analytics", icon: ChartLine, others: true },
  { label: "Outbound At Scale", icon: Send, others: false },
  { label: "Automatic Lead Scoring", icon: Target, others: false },
  { label: "Instant Human Handoff", icon: UserRoundCheck, others: false },
  { label: "Enterprise-Grade Reliability", icon: ShieldCheck, others: false },
];

export default function WhyTelvox() {
  return (
    <section className="px-5 py-16 min-[810px]:py-24">
      <SectionHeading
        eyebrow="Why Telvox"
        headline={
          <>
            Why Telvox Beats
            <br />
          </>
        }
        gradient="Every Competitor"
        badge="/icons/badge-why.png"
      />

      {/* Source: the white card is exactly 980px wide. */}
      <Reveal className="mx-auto mt-10 max-w-[980px] min-[810px]:mt-16">
        {/* 16px inset, and a 16px gap before the Telvox column. */}
        <div className="overflow-hidden rounded-3xl bg-white p-0 shadow-[0_10px_40px_rgba(0,0,0,0.06)] min-[810px]:p-4">
          <div className="flex">
            {/* feature names */}
            <div className="flex-1">
              <div className="flex h-[60px] items-center gap-2.5 pl-1 pr-3 text-[13px] font-medium text-[#171034] min-[810px]:pl-2 min-[810px]:pr-6 min-[810px]:text-[15px]">
                <span className="w-[18px] shrink-0" aria-hidden />
                Features
              </div>
              {ROWS.map((r) => {
                const Icon = r.icon;
                return (
                  <div
                    key={r.label}
                    className="flex h-[60px] items-center gap-2.5 border-t border-black/[.06] pl-1 pr-3 text-[13px] leading-tight text-[#171034] min-[810px]:pl-2 min-[810px]:pr-6 min-[810px]:text-[15px]"
                  >
                    <Icon
                      size={18}
                      strokeWidth={2}
                      className="shrink-0 text-[#a21ee8]"
                    />
                    {r.label}
                  </div>
                );
              })}
            </div>

            {/* others */}
            <div className="w-[64px] shrink-0 min-[810px]:w-[200px]">
              <div className="flex h-[60px] items-center justify-center text-[13px] font-medium text-[#171034] min-[810px]:text-[15px]">
                Others
              </div>
              {ROWS.map((r) => (
                <div
                  key={r.label}
                  className="flex h-[60px] items-center justify-center border-t border-black/[.06]"
                >
                  {r.others ? (
                    <Check size={19} className="text-[#171034]" strokeWidth={2.5} />
                  ) : (
                    <X size={19} className="text-[#171034]" strokeWidth={2.5} />
                  )}
                </div>
              ))}
            </div>

            {/* telvox */}
            <div
              className="ml-0 w-[64px] shrink-0 overflow-hidden rounded-none min-[810px]:ml-4 min-[810px]:w-[200px] min-[810px]:rounded-2xl"
              style={{
                background:
                  "linear-gradient(180deg, #a21ee8 0%, #c026d3 45%, #f239a0 100%)",
              }}
            >
              <div className="flex h-[60px] items-center justify-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/brand/logo-white.webp"
                  alt="Telvox"
                  className="h-[16px] w-auto max-w-[80%] object-contain min-[810px]:h-[22px]"
                />
              </div>
              {ROWS.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.03, ease: EASE }}
                  className="flex h-[60px] items-center justify-center border-t border-white/15"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/25">
                    <Check size={14} className="text-white" strokeWidth={3} />
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

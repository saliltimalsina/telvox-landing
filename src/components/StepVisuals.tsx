"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Calendar, Globe, Phone, Database } from "lucide-react";
import { EASE } from "@/lib/site";

/**
 * The four onboarding step visuals.
 *
 * A shared language so they read as one set: a soft tinted wash with a single
 * brand-coloured glow, frosted white panels that carry real depth, hairline
 * white borders, and one live element per panel so each card has a pulse
 * rather than sitting still.
 */

const PANEL =
  "rounded-2xl border border-white/70 bg-white/85 shadow-[0_8px_28px_-8px_rgba(23,16,52,0.18),0_2px_6px_rgba(23,16,52,0.06)] backdrop-blur-md";

function Stage({
  children,
  tint,
}: {
  children: React.ReactNode;
  /** Two-stop wash for the card's backdrop. */
  tint: [string, string];
}) {
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `linear-gradient(150deg, ${tint[0]} 0%, ${tint[1]} 100%)`,
      }}
    >
      {/* one soft brand glow, low and centred */}
      <span
        className="pointer-events-none absolute -bottom-16 left-1/2 h-[260px] w-[320px] -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle, rgba(242,57,160,0.22) 0%, rgba(162,30,232,0.10) 45%, rgba(255,255,255,0) 72%)",
        }}
      />
      {/* faint grid, for texture rather than pattern */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(23,16,52,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(23,16,52,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 40%, #000 20%, transparent 78%)",
        }}
      />
      <div className="relative h-full w-full">{children}</div>
    </div>
  );
}

const rise = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.5, delay: 0.1 + i * 0.12, ease: EASE },
});

/** 01 — the intake conversation, ending in a captured profile. */
export function LearnBusiness() {
  return (
    <Stage tint={["#f5f3ff", "#fdf2f8"]}>
      <div className="flex h-full flex-col justify-center gap-2.5 px-7">
        <motion.div {...rise(0)} className={`${PANEL} w-[70%] px-3.5 py-2.5`}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#a21ee8]">
            Telvox Agent
          </p>
          <p className="mt-0.5 text-[12.5px] font-medium text-[#171034]">
            Tell me about your business.
          </p>
        </motion.div>

        <motion.div
          {...rise(1)}
          className="ml-auto w-[76%] rounded-2xl px-3.5 py-2.5 shadow-[0_10px_24px_-8px_rgba(162,30,232,0.55)]"
          style={{
            background:
              "linear-gradient(135deg, #a21ee8 0%, #f239a0 100%)",
          }}
        >
          <p className="text-[12.5px] font-medium leading-snug text-white">
            We&rsquo;re a boutique dental clinic — open Mon–Sat, friendly tone.
          </p>
        </motion.div>

        <motion.div {...rise(2)} className={`${PANEL} w-[62%] px-3.5 py-2.5`}>
          <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#a21ee8]">
            Telvox Agent
          </p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[12.5px] font-medium text-[#171034]">
            Got everything I need
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#22c55e]">
              <Check size={9} className="text-white" strokeWidth={4} />
            </span>
          </p>
        </motion.div>

        <motion.div {...rise(3)} className="mt-2">
          <p className="text-[8.5px] font-semibold uppercase tracking-[0.11em] text-[#171034]/45">
            Business profile captured
          </p>
          <div className="mt-1.5 flex gap-1.5">
            {["Services", "Workflows", "Tone"].map((t) => (
              <span
                key={t}
                className={`${PANEL} flex-1 px-2 py-1.5 text-center text-[10.5px] font-semibold text-[#171034]`}
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </Stage>
  );
}

/** 02 — training, two done and one still running. */
export function TrainAgent() {
  const items = [
    { t: "Training on Products", s: "Catalogue & pricing indexed", c: "#f59e0b", done: true },
    { t: "Training on FAQs", s: "Common questions & answers loaded", c: "#3b82f6", done: true },
    { t: "Training on Processes", s: "Booking rules & handoff logic", c: "#e879f9", done: false },
  ];
  return (
    <Stage tint={["#eef2ff", "#fce7f3"]}>
      <div className="relative flex h-full flex-col justify-center gap-3.5 px-7">
        {/* the rail the markers sit on */}
        <span className="absolute left-[38px] top-[24%] h-[52%] w-px bg-gradient-to-b from-[#f59e0b]/40 via-[#3b82f6]/40 to-[#e879f9]/50" />

        {items.map((it, i) => (
          <motion.div key={it.t} {...rise(i)} className="flex items-center gap-3">
            <span
              className="relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ring-4 ring-white/70"
              style={{
                background: it.done ? it.c : "#fff",
                border: it.done ? "none" : `2px solid ${it.c}`,
              }}
            >
              {it.done && <Check size={9} className="text-white" strokeWidth={4} />}
            </span>

            <span
              className={`${PANEL} flex flex-1 items-center gap-2.5 px-3 py-2.5`}
              style={
                !it.done
                  ? { borderColor: "rgba(232,121,249,0.6)", background: "rgba(255,255,255,0.95)" }
                  : undefined
              }
            >
              <span
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-white shadow-sm"
                style={{ background: it.c }}
              >
                <Sparkles size={13} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11.5px] font-semibold text-[#171034]">
                  {it.t}
                </span>
                <span className="block truncate text-[9.5px] text-[#171034]/50">
                  {it.s}
                </span>
                {!it.done && (
                  <span className="mt-1.5 block h-[3px] w-full overflow-hidden rounded-full bg-[#f3e8ff]">
                    <motion.span
                      className="block h-full rounded-full"
                      style={{
                        background: "linear-gradient(90deg,#a21ee8,#f239a0)",
                      }}
                      initial={{ width: "10%" }}
                      whileInView={{ width: "72%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, delay: 0.6, ease: EASE }}
                    />
                  </span>
                )}
              </span>
              {it.done ? (
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2"
                  style={{ borderColor: it.c }}
                >
                  <Check size={11} style={{ color: it.c }} strokeWidth={3.5} />
                </span>
              ) : (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                  className="h-6 w-6 shrink-0 rounded-full border-2 border-[#e879f9] border-t-transparent"
                />
              )}
            </span>
          </motion.div>
        ))}
      </div>
    </Stage>
  );
}

/** 03 — the stack, wired into the agent. */
export function ConnectStack() {
  const nodes = [
    { Icon: Calendar, x: 12, y: 16, c: "#3b82f6" },
    { Icon: Database, x: 63, y: 8, c: "#f97316" },
    { Icon: Globe, x: 6, y: 60, c: "#6366f1" },
    { Icon: Phone, x: 70, y: 54, c: "#10b981" },
  ];
  return (
    <Stage tint={["#eff6ff", "#f5f3ff"]}>
      <div className="relative h-full w-full">
        {/* wires from each node into the core */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          {nodes.map((n, i) => (
            <motion.line
              key={i}
              x1={`${n.x + 7}%`}
              y1={`${n.y + 9}%`}
              x2="50%"
              y2="68%"
              stroke="rgba(162,30,232,0.28)"
              strokeWidth="1.5"
              strokeDasharray="4 5"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 + i * 0.1, ease: EASE }}
            />
          ))}
        </svg>

        {nodes.map((n, i) => (
          <motion.span
            key={i}
            {...rise(i)}
            className={`${PANEL} absolute flex h-[52px] w-[52px] items-center justify-center !rounded-full`}
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <n.Icon size={21} style={{ color: n.c }} />
          </motion.span>
        ))}

        {/* the core, breathing */}
        <motion.span
          className="absolute left-1/2 top-[68%] -translate-x-1/2 -translate-y-1/2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="relative flex h-[74px] w-[74px] items-center justify-center">
            <span
              className="absolute inset-[-26px] rounded-full blur-xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(242,57,160,0.5) 0%, rgba(162,30,232,0.18) 50%, rgba(255,255,255,0) 72%)",
              }}
            />
            <span
              className="relative flex h-full w-full items-center justify-center rounded-full shadow-[0_10px_30px_-6px_rgba(162,30,232,0.6)]"
              style={{
                background: "linear-gradient(135deg,#a21ee8 0%,#f239a0 100%)",
              }}
            >
              <span className="h-7 w-7 rounded-full border-[3px] border-white/90" />
            </span>
          </span>
        </motion.span>
      </div>
    </Stage>
  );
}

/** 04 — live, and improving. */
export function MonitorImprove() {
  const bars = [42, 55, 49, 68, 74, 88];
  return (
    <Stage tint={["#f0fdfa", "#faf5ff"]}>
      <div className="flex h-full flex-col justify-center px-7">
        <motion.div {...rise(0)} className={`${PANEL} px-4 py-3.5`}>
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[#171034]/45">
              Resolution rate
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-[#16a34a]">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-[#22c55e]"
                animate={{ opacity: [1, 0.25, 1] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              LIVE
            </span>
          </div>

          <p className="mt-1 text-[26px] font-bold leading-none tracking-tight text-[#171034]">
            94.2%
          </p>

          <div className="mt-3 flex h-[74px] items-end gap-2">
            {bars.map((v, i) => (
              <motion.span
                key={i}
                className="flex-1 rounded-[4px]"
                style={{
                  background:
                    i === bars.length - 1
                      ? "linear-gradient(180deg,#a21ee8,#f239a0)"
                      : "rgba(162,30,232,0.18)",
                }}
                initial={{ height: 0 }}
                whileInView={{ height: `${v}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.07, ease: EASE }}
              />
            ))}
          </div>
        </motion.div>

        <div className="mt-2.5 flex gap-2.5">
          {[
            { k: "Avg. handle", v: "1m 12s" },
            { k: "Escalations", v: "3.1%" },
          ].map((s, i) => (
            <motion.div
              key={s.k}
              {...rise(i + 1)}
              className={`${PANEL} flex-1 px-3 py-2.5`}
            >
              <p className="text-[9px] font-semibold uppercase tracking-[0.09em] text-[#171034]/45">
                {s.k}
              </p>
              <p className="mt-0.5 text-[14px] font-bold text-[#171034]">{s.v}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </Stage>
  );
}

export const STEP_VISUALS = [
  LearnBusiness,
  TrainAgent,
  ConnectStack,
  MonitorImprove,
];

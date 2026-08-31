"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";
import { EASE } from "@/lib/site";

/**
 * NOTE: these answers are carried over verbatim from the source site, where
 * they are still the previous template's payments/subscriptions copy and do
 * not actually answer the questions. Kept as-is so this is a faithful port —
 * worth rewriting.
 */
const ITEMS = [
  {
    q: "How is my customer data handled during a call?",
    a: "Telvox implements innovative Subscription Models that boost revenue with zero upfront costs, no additional work, and no processing risk. We handle setup, payment processing, billing, and support—all while being PCI DSS Level 1 compliant. Think of us as an extension of your team, focused on increasing AOV (Average Order Value) and CLTV (Customer Lifetime Value).",
  },
  {
    q: "Which languages does Telvox support?",
    a: "No worries! Telvox securely vaults your customers' payment data, ensuring you never lose your subscriptions. If you need to switch processors, your recurring payments remain intact, preventing any disruptions to your revenue stream.",
  },
  {
    q: "How fast can we go live?",
    a: "Yes. Through Telvox Pay and our network of strategic partners, we help you get approved for the right payment processors and MIDs—whether you need standard or high-risk solutions. Our team ensures you’re set up quickly, fully compliant, and ready to process payments without delays.",
  },
  {
    q: "What happens when the AI can’t resolve something?",
    a: "Telvox supports all of the major payment service providers and processors ranging from Stripe, Paypal, Google Pay, NMI, Checkout.com, Airwallex, and more.",
  },
  {
    q: "Does it work with our existing CRM or systems?",
    a: "Telvox serves a broad range of industries, including Supplements, Fashion, Jewelry, Gadgets, Dropshipping, Dating, E-Gaming, CBD, Digital Content, and more. It's also compatible with platforms like Shopify, WordPress, Funnelish, Checkout Champ, and similar.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="px-5 py-16 min-[810px]:py-24">
      <SectionHeading
        eyebrow="FAQs"
        headline="Curated"
        gradient="Questions"
        badge="/icons/badge-faq.png"
        subcopy="Book a call or reach out anytime, we’re here to help."
      />

      {/* Source: each question card is 900px wide. */}
      <div className="mx-auto mt-10 flex w-full max-w-[900px] flex-col gap-3 min-[810px]:mt-14 min-[810px]:gap-4">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <Reveal key={item.q} delay={i * 0.05}>
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_14px_rgba(0,0,0,0.05)]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-4 px-5 py-4 text-left min-[810px]:px-6 min-[810px]:py-5"
                >
                  <span className="flex-1 text-[15px] font-medium text-[#171034] min-[810px]:text-[17px]">
                    {item.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="shrink-0 text-[#171034]"
                  >
                    <Plus size={20} />
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: EASE }}
                    >
                      <p className="px-5 pb-4 text-[14px] leading-[1.6] text-black/55 min-[810px]:px-6 min-[810px]:pb-5 min-[810px]:text-[15px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

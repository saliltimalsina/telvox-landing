"use client";

import { MessageCircle } from "lucide-react";

/* Brand marks are inlined — lucide dropped them in v1. */
function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 2H22l-7.3 8.3L23 22h-6.6l-5.2-6.8L5.3 22H2.2l7.8-8.9L1.6 2h6.8l4.7 6.2L18.9 2Zm-1.1 18h1.7L7.3 3.8H5.5L17.8 20Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <line x1="17.5" x2="17.5" y1="6.5" y2="6.5" />
    </svg>
  );
}

function LinkedinIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 21.5h5.2V9.6H2.4v11.9Zm7.9 0h5.18v-6.4c0-3.42 4.42-3.7 4.42 0v6.4h5.1v-8.2c0-7.9-8.5-7.6-9.52-3.72V9.6H10.3v11.9Z" />
    </svg>
  );
}

/* Icons only — no links yet; the accounts aren't live. */
const SOCIALS = [
  { label: "X", icon: XIcon },
  { label: "Instagram", icon: InstagramIcon },
  { label: "LinkedIn", icon: LinkedinIcon },
];

const EXPLORE = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#price" },
  { label: "Calculator", href: "#calculator" },
];

const HELP = [
  { label: "FAQs", href: "#faq" },
  { label: "Contact Us", href: "https://t.me/Telvox" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-5 pt-4">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col items-start gap-5 py-8 min-[810px]:flex-row min-[810px]:items-center min-[810px]:justify-between">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.webp"
            alt="Telvox"
            className="h-[38px] w-auto object-contain"
          />
          <div className="flex items-center gap-3">
            <span className="text-[15px] text-black/60">Social Media</span>
            {SOCIALS.map((s) => {
              const Icon = s.icon;
              return (
                <span
                  key={s.label}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-black/10 text-[#171034]"
                >
                  <Icon size={16} />
                </span>
              );
            })}
          </div>
        </div>

        <hr className="border-black/[.08]" />

        <div className="grid grid-cols-2 gap-8 py-10 min-[810px]:grid-cols-[1fr_auto_auto] min-[810px]:gap-10 min-[810px]:py-12">
          <div className="col-span-2 min-[810px]:col-span-1">
            <h3 className="text-[16px] font-semibold text-[#171034]">
              Send Us A Message
            </h3>
            <a
              href="https://t.me/Telvox"
              target="_blank"
              rel="noopener"
              className="mt-4 flex w-fit items-center gap-3 rounded-2xl bg-[#f6e9fb] px-4 py-3.5 transition-colors hover:bg-[#f0dcf8]"
            >
              <span className="brand-gradient-bg flex h-9 w-9 items-center justify-center rounded-full text-white">
                <MessageCircle size={16} />
              </span>
              <span>
                <span className="block text-[15px] text-[#171034]">
                  hello@telvox.ai
                </span>
                <span className="block text-[13px] text-black/50">
                  Lalitpur, Nepal
                </span>
              </span>
            </a>
          </div>

          <div className="min-[810px]:w-[150px]">
            <h3 className="text-[16px] font-semibold text-[#171034]">Explore</h3>
            <ul className="mt-4 space-y-3">
              {EXPLORE.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[15px] text-black/55 transition-colors hover:text-[#171034]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="min-[810px]:w-[130px]">
            <h3 className="text-[16px] font-semibold text-[#171034]">Help</h3>
            <ul className="mt-4 space-y-3">
              {HELP.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[15px] text-black/55 transition-colors hover:text-[#171034]"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Oversized wordmark watermark, blended into the page at the bottom
            rather than cut off hard at the container edge. The negative
            margin pulls the border/copyright row up over the tail of the
            fade — the part that's already faded to nothing — instead of
            reserving blank layout space for it. A percentage margin (not a
            fixed px one) is required here: the image's height is a fixed
            aspect ratio of the container's width, so only a width-relative
            margin removes the same *fraction* of it at every breakpoint —
            a fixed px value overlaps way more of a mobile-width (and so
            shorter) logo than a desktop one. */}
        <div className="relative -mb-[11.5%] select-none overflow-hidden" aria-hidden>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.webp"
            alt=""
            className="w-full object-contain opacity-[0.08]"
            style={{
              maskImage: "linear-gradient(to bottom, black 0%, transparent 65%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, black 0%, transparent 65%)",
            }}
          />
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-black/[.08] py-6 min-[810px]:flex-row">
          <p className="text-[14px] text-black/50">
            ©2025 Telvox. All rights reserved.
          </p>
          <a
            href="https://mantraideas.com/"
            target="_blank"
            rel="noopener"
            className="text-[14px] text-black/50 transition-colors hover:text-[#171034]"
          >
            A product by Mantra Ideas
          </a>
        </div>
      </div>
    </footer>
  );
}

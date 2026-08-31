"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { BOOK_A_CALL, NAV_LINKS, EASE } from "@/lib/site";

/**
 * Two entirely different navs, measured off the source.
 *
 * Below 1200px it is a white pill — 56px tall, 16px corners, 12px padding —
 * holding only the logo and a menu button. There is no "Request a Demo" in the
 * bar at all, and the pill is present from the top of the page rather than
 * appearing on scroll. Its width is 96% under 810px and 90% from 810–1199.
 *
 * At 1200px and up the bar is transparent with the links and the demo button,
 * and it condenses into a floating white pill once scrolled.
 */
const PILL_SHADOW =
  "0px 30px 40px 0px rgba(0,0,0,0.03), 0px 1.15112px 2.30224px 0px rgba(122,14,86,0.14), 0px 8.05784px 8.05784px 0px rgba(122,14,86,0.05)";

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => window.innerWidth >= 1200 && setOpen(false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full pt-4">
      {/* ---------- below 1200: white pill, logo + menu only ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mx-auto flex h-14 w-[96%] items-center justify-between rounded-2xl bg-white p-3 min-[810px]:w-[90%] min-[1200px]:hidden"
        style={{ boxShadow: PILL_SHADOW }}
      >
        <a href="#hero" className="shrink-0 pl-1.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/brand/logo.webp"
            alt="Telvox"
            width={129}
            height={41}
            className="h-[32px] w-auto object-contain"
          />
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex h-[30px] w-[30px] items-center justify-center rounded-lg text-[#171034]"
        >
          {open ? <X size={24} /> : <Menu size={24} strokeWidth={2.2} />}
        </button>
      </motion.div>

      {/* ---------- 1200 and up: the desktop bar ---------- */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="hidden px-5 min-[1200px]:block"
      >
        <div
          className={`mx-auto flex items-center justify-between transition-all duration-300 ease-out ${
            stuck
              ? "max-w-[866px] rounded-2xl bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]"
              : "max-w-[1160px] rounded-2xl bg-transparent px-0 py-0 shadow-none"
          }`}
        >
          <a href="#hero" className="shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/brand/logo.webp"
              alt="Telvox"
              width={129}
              height={41}
              className="h-[41px] w-[129px] object-contain"
            />
          </a>

          <nav className="flex items-center gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-2xl px-4 py-3 text-[18px] font-medium text-[#696969] transition-colors hover:text-[#171034]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href={BOOK_A_CALL}
            target="_blank"
            rel="noopener"
            className="btn-nav-shadow flex h-12 shrink-0 items-center gap-1 rounded-2xl bg-[#171034] px-4 text-[18px] font-medium text-white transition-transform hover:scale-[1.02]"
          >
            Request a Demo
            <ChevronRight size={20} strokeWidth={2} />
          </a>
        </div>
      </motion.div>

      {/* ---------- the menu sheet ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: EASE }}
            className="mx-auto mt-2 w-[96%] overflow-hidden rounded-2xl bg-white p-2 min-[810px]:w-[90%] min-[1200px]:hidden"
            style={{ boxShadow: PILL_SHADOW }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3.5 text-[17px] font-medium text-[#171034] transition-colors hover:bg-black/[.04]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={BOOK_A_CALL}
              target="_blank"
              rel="noopener"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-1 rounded-xl bg-[#171034] px-4 py-3.5 text-[17px] font-medium text-white"
            >
              Request a Demo
              <ChevronRight size={18} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

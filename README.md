# Telvox — Next.js

A rebuild of the Telvox marketing site as plain Next.js + React. No Framer, no
page builder, no hashed `framer-*` classnames, no CSS-in-JS runtime, and no
dependency on a Framer subscription or CDN.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

## How this was built

The old site (`../telvox-v1`) is Framer's compiled export — prerendered markup
that React hydrates, with the real source unavailable. So rather than porting
code, every section here was rebuilt against **measurements taken from the
running page**: computed styles read out of a headless browser (exact font
sizes, weights, tracking, colours, shadow stacks, element rects), then matched
in React until the numbers lined up.

That is also the way to verify a change. Run both sites and compare:

```bash
cd ../telvox-v1 && npm run dev    # the reference, port 8080
npm run dev -- -p 3001            # this app
```

## Layout

```
src/
├── app/
│   ├── globals.css     design tokens + the effects lifted verbatim from
│   │                   the source (shadow stacks, hero mask, marquee)
│   ├── layout.tsx      Inter + Plus Jakarta Sans
│   └── page.tsx        section order
├── components/         one file per section
└── lib/site.ts         links, logos, shared easing curve
public/
├── brand/  icons/  logos/   assets copied from the source site
├── lottie/hero.json         the hero animation, played by lottie-web
└── embeds/                  the two self-contained embeds (see below)
```

## Things worth knowing

**The hero animation is a real Lottie file**, not a re-drawn approximation.
`public/lottie/hero.json` is the same asset the old site shipped. The source
plays it at **half speed** (`speed: .5` in its bundle) — `HeroIllustration.tsx`
sets that explicitly. At 1x the cards visibly fly past too fast.

**Two sections are iframes on purpose.** The industries wheel and the ROI
calculator were already framework-free standalone HTML in the old site, each
carrying its own Tailwind build (preflight reset, remapped palette) that must
not leak into this document. They are copied to `public/embeds/` as-is.

The wheel is scroll-driven, and an iframe cannot see the parent's scroll, so
`Industries.tsx` pins the section and posts progress (0..1) across. Its
`PIN_OFFSET` must stay in step with the `.telvox-industries-pin` top offset in
`globals.css` — the progress maths is derived from both.

**Shadows and masks are copied, not eyeballed.** The buttons use four- and
five-layer shadow stacks (including inset rims) read off the source; the hero
illustration's soft edges are a `mask-image` gradient with the source's exact
stops. These read as "wrong" immediately if simplified.

## Known gaps

- **The FAQ answers are wrong in the source and are carried over verbatim.**
  They are the previous template's payments/subscriptions copy and do not
  answer the questions asked. Flagged in `Faq.tsx`. Worth rewriting.
- The bento-grid card illustrations in **Benefits** are rebuilt approximations
  of the source's bespoke compositions, not extracted assets. They match in
  structure, colour, and motion, but are not pixel-identical.
- The comparison table's per-row leading icons are not yet carried over.
- `Terms of Service` and `Cookies Policy` in the footer point at `#`; only
  `/privacy` exists as a route on the old site and it is not built here yet.

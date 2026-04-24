# Time & Again — Project Spec

**Client:** Katinka  
**Brand:** Time & Again  
**Slogan:** *We Restore What You Adore*  
**Business Statement:** We restore what you adore — reviving tired pieces with fresh color, character, and craftsmanship. Whether a family heirloom or a flea market find, we transform it into something beautiful, and uniquely yours. Let's give your furniture a second chance.

---

## Design Directive

> **CRITICAL:** All UI work on this project MUST use the `/design-taste-frontend` skill before any component is built. No exceptions. This ensures every screen is premium, modern, chique, and sleek — never generic.

Override the skill's default dials for this project:

| Dial | Value | Reason |
|------|-------|--------|
| DESIGN_VARIANCE | 7 | Asymmetric elegance, editorial feel |
| MOTION_INTENSITY | 7 | Rich scroll storytelling, restrained choreography |
| VISUAL_DENSITY | 2 | Airy, gallery-like — the work speaks for itself |

---

## Brand Identity

### Color Palette (extracted from logo)

| Token | Hex | Usage |
|-------|-----|-------|
| `sage` | `#8FAF9F` | Soft sage green — primary accent, CTAs, highlights |
| `slate-blue` | `#3D4F5C` | Deep slate navy — headings, primary text, dark surfaces |
| `sand` | `#B8A98A` | Warm sand/tan — secondary accent, dividers, warmth |
| `cream` | `#F5F2EC` | Off-white cream — page background, light sections |
| `charcoal` | `#2C2C2C` | Near-black — body text, footer |

**Rules:**
- Background: always `cream` (`#F5F2EC`), never pure white or pure black
- Primary text: `charcoal` (`#2C2C2C`)
- Accent: `sage` as the hero accent color — used sparingly
- Section contrast: alternate between `cream` and a very light tint of `slate-blue` (`#3D4F5C` at 5% opacity)
- No purple, no neon, no gradients on text

### Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero | `Cormorant Garamond` | 300–400 | `text-6xl md:text-8xl` |
| Headings | `Outfit` | 500–600 | `text-3xl md:text-5xl` |
| Body | `Outfit` | 300–400 | `text-base leading-relaxed` |
| Accent / Label | `Outfit` | 600 uppercase | `text-xs tracking-widest` |

> Use `Cormorant Garamond` for all hero headlines to give the brand its elegant, editorial, artisan character. `Outfit` handles everything else cleanly.

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion (UI interactions, scroll reveals, stagger) |
| Scroll animation | GSAP + ScrollTrigger (the before/after furniture reveal sequence) |
| Icons | `@phosphor-icons/react` |
| Fonts | Google Fonts: `Cormorant Garamond`, `Outfit` |
| Images | `next/image` with blur placeholders |

**Hard rules:**
- Never mix GSAP and Framer Motion in the same component tree
- GSAP is ONLY for the isolated scroll-sequencing canvas section
- All client-interactive components get `'use client'` at the top
- Server Components handle all static layout and data fetching

---

## Site Architecture

### Pages

```
/                 → Home (single-page scrollytelling experience)
/gallery          → Full project gallery with filter by category
/shop             → Shop of restored one-of-a-kind pieces (Supabase + CMS)
/process          → How we work (step-by-step editorial layout)
/contact          → Contact form + booking inquiry
```

### Shop Scope (current + future)

**Phase 1 (now):** Shop sells **restored one-of-a-kind pieces** — inventory of 1 per SKU. Once a piece sells, it's marked sold and either hidden or shown with a "Sold" ribbon.

**Phase 2 (future — not in current build):** Add a **custom commissions flow** — customers brief a piece (room, style, size, budget), Katinka replies with a quote, and the commission is tracked to completion. This is a distinct flow from the shop and should be modelled separately (commission request → quote → deposit → build → delivery), not bolted onto the product schema.

### Home Page Sections (in scroll order)

1. **Nav** — Sticky, minimal floating pill nav. Logo left, links right. On scroll past hero: background transitions from transparent to `cream/90` with backdrop blur.

2. **Hero** — Asymmetric split. Left: large editorial serif headline ("We Restore What You Adore"), sub-copy, and CTA button. Right: a beautiful before/after image composite with a custom clip-path reveal. Uses `min-h-[100dvh]`.

3. **Scroll Transformation Sequence (The Signature Feature)**  
   A full-width GSAP ScrollTrigger section. As the user scrolls, an old, worn piece of furniture is progressively "restored" on screen:
   - Step 1 (entering): Desaturated, aged, cracked — old photo feel
   - Step 2 (mid-scroll): Colors begin bleeding in from the edges, like paint being applied
   - Step 3 (completing): Fully restored, vibrant, beautiful — sharp and modern
   
   Implementation approach: Use a canvas or layered `<Image>` stack with GSAP-driven opacity/filter/scale transitions tied to `ScrollTrigger` `scrub: 1`. Add particle dust motes floating away as the piece transforms.

4. **About Katinka** — Left-aligned editorial section. Large pull-quote in `Cormorant Garamond`. Photo on the right with a `sand`-colored offset border behind it.

5. **Services** — Asymmetric 2-column zig-zag layout (NOT a 3-card grid). Each service has a name, short description, and a numbered label. Services include:
   - Furniture Repainting & Colour Refresh
   - Wood Restoration & Repair
   - Upholstery Refresh
   - Custom Commissions & Upcycling

6. **Gallery Preview** — Masonry grid of 6 projects. Each card: hover triggers a subtle parallax tilt + a slide-up caption revealing the piece name and "before → after" label. CTA links to `/gallery`.

7. **Process** — Sticky scroll stack: 4 cards that stack over each other as you scroll. Steps: Consult → Assess → Restore → Deliver.

8. **Testimonials** — Horizontal infinite marquee of client quotes. Slow, effortless speed. Brand-colored separators between quotes.

9. **CTA Banner** — Full-width sage-tinted section. Large centered serif text: "Got a piece worth saving?" with a primary CTA button.

10. **Footer** — Minimal. Logo, tagline, nav links, social icons (Instagram focus), and contact email. `slate-blue` background, `cream` text.

---

## Signature Animation: The Restoration Scroll Sequence

This is the hero feature of the site — make it unforgettable.

**Technical approach:**

```tsx
// Isolated client component — NEVER import Framer Motion here
// Uses GSAP exclusively

'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Layer stack:
// 1. aged-base.jpg       → desaturated, sepia-like, full opacity at start
// 2. restored-color.jpg  → full color, opacity 0 at start → 1 at end
// 3. dust-particles.svg  → GSAP animated, float upward and fade mid-scroll
// 4. paint-brush-stroke  → SVG mask that wipes across the image mid-transition

// ScrollTrigger scrub: 1 — ties pixel-for-pixel to scroll position
// Pin the section for the duration of the sequence
```

The section should be pinned for approximately `300vh` of scroll distance to give the user enough time to appreciate the transformation. Add a subtle scroll-progress indicator (thin `sage` line drawing down the side).

---

## Component Architecture

```
src/
  app/
    layout.tsx           → fonts, metadata, global providers
    page.tsx             → Home page (RSC, composes all sections)
    gallery/page.tsx
    process/page.tsx
    contact/page.tsx
  components/
    layout/
      Nav.tsx            → 'use client' — scroll-aware sticky nav
      Footer.tsx         → RSC
    sections/
      Hero.tsx           → 'use client' — Framer Motion entrance
      RestorationScroll.tsx  → 'use client' — GSAP only, isolated
      About.tsx          → RSC
      Services.tsx       → 'use client' — stagger reveal
      GalleryPreview.tsx → 'use client' — tilt cards
      ProcessStack.tsx   → 'use client' — sticky scroll stack
      Testimonials.tsx   → 'use client' — infinite marquee
      CTABanner.tsx      → RSC
    ui/
      Button.tsx         → magnetic hover effect (Framer useMotionValue)
      BeforeAfterSlider.tsx → interactive drag slider
      ParallaxTiltCard.tsx  → 'use client'
      MarqueeTrack.tsx   → 'use client'
      WhatsAppBubble.tsx → 'use client' — fixed floating bubble, all pages
  lib/
    constants.ts         → colors, brand tokens
    fonts.ts             → next/font Google configuration
```

---

## Responsiveness Rules

- Mobile-first. Every asymmetric layout collapses to single-column below `md:` (768px)
- Touch targets minimum 44×44px
- Nav: hamburger menu on mobile with a full-screen slide-in overlay
- Restoration scroll sequence: on mobile, auto-plays as a CSS animation (no scroll-pin) so it does not trap the user
- Gallery: 1 col mobile → 2 col tablet → masonry desktop
- Typography scales: `text-5xl` hero on mobile → `text-8xl` on desktop

---

## Performance Standards

- `next/image` with `priority` on hero image, lazy elsewhere
- GSAP and ScrollTrigger loaded only on client via dynamic import
- Framer Motion components: all perpetual animations wrapped in `React.memo` and isolated
- No grain/noise filters on scrolling containers — pseudo-element only if used
- Animate only `transform` and `opacity` — never layout properties
- Target Lighthouse: Performance > 90, Accessibility > 95

---

## Contact Details

| Channel | Value |
|---------|-------|
| WhatsApp / Phone | 076 040 7277 |
| Email | katinkapollac@gmail.com |
| Location | Vanderbijlpark |

---

## WhatsApp Bubble

A persistent floating WhatsApp button sits fixed in the bottom-right corner on all pages and all screen sizes.

**Specs:**
- Position: `fixed bottom-6 right-6 z-50`
- Shape: circle, `w-14 h-14`
- Background: WhatsApp green `#25D366`
- Icon: PhosphorIcons `WhatsappLogo` (weight `fill`), white, size 28
- Link: `https://wa.me/27760407277` (strips leading zero, adds ZA country code `27`)
- `target="_blank" rel="noopener noreferrer"`
- Hover: subtle `scale-110` with spring physics via Framer Motion
- Entry animation: slides up from below on first load with a slight bounce (`type: spring, stiffness: 200, damping: 18`)
- Tooltip: on hover shows a small pill label "Chat with us" in `cream` on `charcoal` — appears to the left of the bubble
- On mobile: slightly smaller `w-12 h-12`, stays bottom-right, never obscures main CTAs

**Component:** `src/components/ui/WhatsAppBubble.tsx` — `'use client'`, isolated, rendered in `layout.tsx` so it persists across all pages.

```tsx
// WhatsApp number for href
const WA_NUMBER = '27760407277'
const WA_HREF = `https://wa.me/${WA_NUMBER}`
```

---

## Content Placeholders

Use `https://picsum.photos/seed/{descriptive-seed}/800/600` for all images until real photography is supplied. Use seeds like `old-chair`, `restored-dresser`, `katinka-workshop`, etc.

---

## Accessibility

- All images have descriptive `alt` text
- Color contrast ratio minimum 4.5:1 for body text
- Focus-visible ring on all interactive elements using `ring-sage`
- `prefers-reduced-motion`: all scroll animations respect this via `@media (prefers-reduced-motion: reduce)` and Framer's `useReducedMotion()`
- Semantic HTML throughout: `<main>`, `<section>`, `<article>`, `<nav>`, `<footer>`

---

## Development Checklist

Before any component is considered complete:

- [ ] `/design-taste-frontend` skill was invoked
- [ ] Mobile layout tested at 375px, 768px, 1280px, 1440px
- [ ] No `h-screen` — only `min-h-[100dvh]`
- [ ] No `Inter` font — using `Cormorant Garamond` + `Outfit`
- [ ] No 3-equal-card layouts
- [ ] No emoji in any content or alt text
- [ ] `useEffect` GSAP blocks have cleanup (`ScrollTrigger.kill()`)
- [ ] Framer Motion perpetual animations isolated in their own components
- [ ] Empty, loading, and error states exist for all async content
- [ ] `prefers-reduced-motion` respected

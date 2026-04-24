'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from '@phosphor-icons/react'
import { BRAND } from '@/lib/constants'

export function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100dvh] w-full overflow-hidden pt-32 md:pt-36 pb-16 md:pb-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(ellipse at 20% 10%, rgba(143,175,159,0.28) 0%, rgba(143,175,159,0) 55%),' +
            'radial-gradient(ellipse at 85% 40%, rgba(184,169,138,0.22) 0%, rgba(184,169,138,0) 55%),' +
            'linear-gradient(180deg, #F5F2EC 0%, #F1EDE4 100%)',
        }}
      />

      <div className="container-outer relative">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 md:mb-14 flex items-center gap-3"
        >
          <span className="h-px w-10 bg-slate-brand/40" />
          <span className="eyebrow">Furniture Restoration &middot; Est. Vanderbijlpark</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-7 relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="font-display text-[3.2rem] leading-[0.95] sm:text-6xl md:text-7xl lg:text-[7.5rem] text-slate-brand tracking-tight"
            >
              We restore
              <br />
              what you{' '}
              <span className="italic text-sage">adore</span>
              <span className="text-sand">.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-8 md:mt-10 max-w-xl text-base md:text-lg text-charcoal/75 leading-relaxed"
            >
              Reviving tired pieces with fresh colour, character, and craftsmanship —
              from family heirlooms to flea-market finds. Let us give your furniture a
              second chance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.75 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <a
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-slate-brand text-cream pl-6 pr-5 py-3.5 text-sm font-medium transition-all hover:bg-charcoal active:translate-y-[1px]"
              >
                Start a restoration
                <span className="flex items-center justify-center w-7 h-7 rounded-full bg-cream/10 group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={14} weight="bold" />
                </span>
              </a>
              <a
                href="#gallery"
                className="inline-flex items-center gap-2 text-sm font-medium text-slate-brand underline-offset-8 hover:underline"
              >
                See the work
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mt-14 md:mt-20 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-slate-brand/70"
            >
              <span className="flex items-center gap-2">
                <MapPin size={16} weight="regular" />
                {BRAND.location}
              </span>
              <span className="hidden sm:block h-4 w-px bg-slate-brand/20" />
              <span>Hand-finished &middot; One piece at a time</span>
              <span className="hidden sm:block h-4 w-px bg-slate-brand/20" />
              <span>Consults by photograph &middot; Country-wide</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[3/4] w-full max-w-[460px] mx-auto lg:ml-auto">
              <div
                aria-hidden
                className="absolute -top-4 -left-4 right-6 bottom-10 rounded-[180px] bg-sage/35"
              />
              <div
                aria-hidden
                className="absolute top-8 -right-6 w-24 h-24 rounded-full bg-sand/60"
              />

              <div className="relative h-full w-full overflow-hidden rounded-[140px_140px_24px_24px] shadow-card ring-1 ring-slate-brand/10">
                <Image
                  src="https://picsum.photos/seed/hero-armchair-restored/900/1200"
                  alt="A restored armchair in soft sage linen sitting in daylight"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 460px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/20 via-transparent to-transparent" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="absolute -bottom-6 left-2 md:-left-8 bg-cream rounded-2xl shadow-soft px-5 py-4 ring-1 ring-slate-brand/10 max-w-[220px]"
              >
                <div className="flex items-center gap-3">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-sage text-cream font-display text-lg italic">
                    K
                  </span>
                  <div className="leading-tight">
                    <div className="text-sm font-medium text-slate-brand">
                      Katinka
                    </div>
                    <div className="text-[11px] uppercase tracking-widest text-slate-brand/60">
                      Maker &middot; Restorer
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-brand/50"
        aria-hidden
      >
        <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <span className="relative h-10 w-px bg-slate-brand/20 overflow-hidden">
          <motion.span
            className="absolute top-0 left-0 h-3 w-px bg-slate-brand"
            animate={{ y: [0, 28, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.div>
    </section>
  )
}

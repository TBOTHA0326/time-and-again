'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { SERVICES } from '@/lib/constants'

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40 bg-cream-deep">
      <div className="container-outer">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-16 md:mb-24">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-slate-brand/40" />
              <span className="eyebrow">Services</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-slate-brand leading-[0.98] tracking-tight">
              Four ways
              <br />
              to bring a piece
              <br />
              <span className="italic text-sage">back to life.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="text-base md:text-lg text-charcoal/70 leading-relaxed max-w-md">
              Whether it asks for a fresh palette, a repaired joint, or a complete
              reimagining — every service is hand-finished in-house, and shaped to
              the piece itself.
            </p>
          </div>
        </div>

        <div className="space-y-24 md:space-y-32">
          {SERVICES.map((s, i) => {
            const reverse = i % 2 === 1
            return (
              <motion.article
                key={s.number}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={[
                  'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center',
                ].join(' ')}
              >
                <div
                  className={[
                    'lg:col-span-6 relative',
                    reverse ? 'lg:order-2' : 'lg:order-1',
                  ].join(' ')}
                >
                  <div className="relative aspect-[4/5] max-w-[520px] mx-auto lg:mx-0 overflow-hidden rounded-[28px] ring-1 ring-slate-brand/10 shadow-soft">
                    <Image
                      src={s.image}
                      alt={s.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 500px"
                      className="object-cover transition-transform duration-[1200ms] ease-out hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/25 via-transparent to-transparent" />
                    <span className="absolute bottom-5 left-5 text-cream text-[11px] uppercase tracking-[0.25em] font-semibold">
                      No. {s.number}
                    </span>
                  </div>
                </div>

                <div
                  className={[
                    'lg:col-span-5 relative',
                    reverse ? 'lg:order-1 lg:col-start-2' : 'lg:order-2 lg:col-start-8',
                  ].join(' ')}
                >
                  <span className="font-mono text-xs text-sage tracking-widest">
                    {s.number} / {String(SERVICES.length).padStart(2, '0')}
                  </span>
                  <h3 className="mt-4 font-display text-4xl md:text-5xl text-slate-brand leading-[1.02] tracking-tight">
                    {s.title}
                  </h3>
                  <p className="mt-5 text-base md:text-lg text-charcoal/75 leading-relaxed max-w-md">
                    {s.body}
                  </p>
                  <a
                    href="#contact"
                    className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-slate-brand border-b border-slate-brand/30 hover:border-slate-brand pb-1 transition-colors"
                  >
                    Enquire about this service
                  </a>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

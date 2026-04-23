'use client'

import { Quotes } from '@phosphor-icons/react'
import { TESTIMONIALS } from '@/lib/constants'

export function Testimonials() {
  const track = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="relative py-24 md:py-32 bg-cream overflow-hidden">
      <div className="container-outer">
        <div className="max-w-xl mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-slate-brand/40" />
            <span className="eyebrow">Words from clients</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-slate-brand leading-[1.02] tracking-tight">
            A small collection of
            <span className="italic text-sage"> kind thoughts</span>.
          </h2>
        </div>
      </div>

      <div
        className="relative"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex gap-5 md:gap-7 w-max animate-marquee">
          {track.map((t, i) => (
            <figure
              key={i}
              className="w-[320px] md:w-[420px] flex-shrink-0 rounded-[28px] bg-cream-deep ring-1 ring-slate-brand/10 p-7 md:p-8 shadow-soft"
            >
              <Quotes
                size={24}
                weight="fill"
                className="text-sage"
              />
              <blockquote className="mt-4 font-display text-xl md:text-2xl text-slate-brand leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 pt-5 border-t border-slate-brand/10 flex items-center justify-between">
                <span className="font-medium text-sm text-slate-brand">{t.name}</span>
                <span className="text-xs text-slate-brand/60 uppercase tracking-widest">
                  {t.role}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

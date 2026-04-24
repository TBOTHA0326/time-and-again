'use client'

import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState } from 'react'
import { ArrowUpRight } from '@phosphor-icons/react'
import { GALLERY, GALLERY_CATEGORIES } from '@/lib/constants'

type Filter = (typeof GALLERY_CATEGORIES)[number]['key']

export function GalleryGrid() {
  const [filter, setFilter] = useState<Filter>('all')

  const pieces = useMemo(
    () => (filter === 'all' ? GALLERY : GALLERY.filter((p) => p.category === filter)),
    [filter]
  )

  return (
    <section className="container-outer pb-32 md:pb-48">
      <div className="sticky top-24 md:top-28 z-20 -mx-1 mb-10 md:mb-14">
        <div className="inline-flex items-center gap-1 rounded-full bg-cream/85 backdrop-blur-md ring-1 ring-slate-brand/10 p-1 shadow-soft overflow-x-auto max-w-full">
          {GALLERY_CATEGORIES.map((cat) => {
            const active = filter === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => setFilter(cat.key)}
                className={[
                  'px-4 md:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  active
                    ? 'bg-slate-brand text-cream'
                    : 'text-slate-brand/75 hover:text-slate-brand hover:bg-slate-brand/5',
                ].join(' ')}
                aria-pressed={active}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
      >
        <AnimatePresence mode="popLayout">
          {pieces.map((piece, i) => (
            <motion.article
              key={piece.title}
              layout
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{
                duration: 0.55,
                delay: (i % 3) * 0.05,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={[
                'group relative block overflow-hidden rounded-[24px] ring-1 ring-slate-brand/10 bg-slate-brand/5',
                piece.aspect === 'tall' ? 'aspect-[3/4]' : 'aspect-[5/4]',
              ].join(' ')}
            >
              <Image
                src={piece.before}
                alt={`${piece.title} — before restoration`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover saturate-50 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
              />
              <Image
                src={piece.after}
                alt={`${piece.title} — ${piece.piece}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out group-hover:scale-[1.06]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/65 via-slate-brand/10 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-cream/85 bg-slate-brand/45 backdrop-blur px-2.5 py-1 rounded-full">
                Before &rarr; After
              </span>
              <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.25em] text-cream/80 bg-slate-brand/40 backdrop-blur px-2.5 py-1 rounded-full">
                {piece.year}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-4">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="font-display text-2xl md:text-3xl text-cream leading-tight">
                    {piece.title}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cream/75">
                    {piece.piece}
                  </div>
                </div>
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-cream/90 text-slate-brand opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {pieces.length === 0 && (
        <div className="text-center py-24 text-slate-brand/60">
          No pieces in this category yet. Check back soon.
        </div>
      )}

      <div className="mt-24 md:mt-32 text-center">
        <p className="font-display italic text-3xl md:text-4xl text-slate-brand/80 max-w-xl mx-auto leading-snug">
          Have a piece that deserves a second life?
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 mt-8 px-7 py-4 rounded-full bg-slate-brand text-cream text-sm font-medium hover:bg-charcoal transition-colors"
        >
          Start a restoration
          <ArrowUpRight size={14} weight="bold" />
        </a>
      </div>
    </section>
  )
}

'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { GALLERY } from '@/lib/constants'

export function GalleryPreview() {
  return (
    <section id="gallery" className="relative py-28 md:py-40 bg-cream">
      <div className="container-outer">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14 md:mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-slate-brand/40" />
              <span className="eyebrow">Selected Work</span>
            </div>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-slate-brand leading-[0.98] tracking-tight">
              Pieces we have
              <br />
              <span className="italic text-sage">brought home.</span>
            </h2>
          </div>
          <a
            href="/gallery"
            className="group inline-flex items-center gap-2 self-start md:self-end text-sm font-medium text-slate-brand"
          >
            View the full gallery
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-slate-brand/30 group-hover:bg-slate-brand group-hover:text-cream group-hover:border-slate-brand transition-colors">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
          {GALLERY.slice(0, 6).map((piece, i) => (
            <motion.a
              key={piece.title}
              href="/gallery"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={[
                'group relative block overflow-hidden rounded-[24px] ring-1 ring-slate-brand/10 bg-slate-brand/5',
                piece.aspect === 'tall'
                  ? 'aspect-[3/4]'
                  : 'aspect-[5/4] sm:aspect-[5/4]',
                i === 0 ? 'lg:col-span-2 lg:row-span-1 lg:aspect-[16/10]' : '',
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
              <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/60 via-slate-brand/5 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-4">
                <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="font-display text-2xl md:text-3xl text-cream leading-tight">
                    {piece.title}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-[0.25em] text-cream/70">
                    {piece.piece}
                  </div>
                </div>
                <span className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-cream/90 text-slate-brand opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
                  <ArrowUpRight size={14} weight="bold" />
                </span>
              </div>

              <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.25em] text-cream/80 bg-slate-brand/40 backdrop-blur px-2.5 py-1 rounded-full">
                Before &rarr; After
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

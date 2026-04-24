'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { ArrowUpRight, Tag } from '@phosphor-icons/react'
import type { ShopPiece } from './types'

interface ShopCardProps {
  piece: ShopPiece
  index: number
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function ShopCard({ piece, index }: ShopCardProps) {
  const [hovered, setHovered] = useState(false)
  const isSold = piece.status === 'sold'

  const afterSrc =
    typeof piece.after_images?.[0]?.image === 'object'
      ? (piece.after_images[0].image as { url?: string }).url ?? ''
      : `https://picsum.photos/seed/shop-after-${piece.slug}/800/1000`

  const beforeSrc =
    typeof piece.before_image === 'object'
      ? (piece.before_image as { url?: string }).url ?? ''
      : `https://picsum.photos/seed/shop-before-${piece.slug}/800/1000`

  // Vary aspect ratios for masonry-like feel — alternate by index
  const isTall = index % 3 !== 1

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{
        duration: 0.6,
        delay: (index % 4) * 0.06,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={[
        'group relative overflow-hidden rounded-[24px] ring-1 ring-slate-brand/10 bg-slate-brand/5',
        isTall ? 'aspect-[3/4]' : 'aspect-[5/4]',
        isSold ? 'opacity-70' : '',
      ].join(' ')}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* After image — default visible */}
      <Image
        src={afterSrc}
        alt={`${piece.title} — restored`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={[
          'object-cover transition-all duration-[900ms] ease-out group-hover:scale-[1.05]',
          hovered ? 'opacity-0' : 'opacity-100',
        ].join(' ')}
        priority={index < 3}
      />

      {/* Before image — visible on hover */}
      <Image
        src={beforeSrc}
        alt={`${piece.title} — before restoration`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className={[
          'object-cover saturate-50 transition-all duration-[900ms] ease-out group-hover:scale-[1.05]',
          hovered ? 'opacity-100' : 'opacity-0',
        ].join(' ')}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/70 via-slate-brand/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Before/After indicator */}
      <span className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.22em] text-cream/85 bg-slate-brand/45 backdrop-blur-sm px-2.5 py-1 rounded-full select-none">
        {hovered ? 'Before' : 'After'}
      </span>

      {/* Category pill */}
      <span className="absolute top-4 right-4 text-[10px] uppercase tracking-[0.22em] text-cream/80 bg-slate-brand/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
        {piece.category === 'colour'
          ? 'Colour'
          : piece.category === 'wood'
            ? 'Wood'
            : piece.category === 'upholstery'
              ? 'Upholstery'
              : 'Custom'}
      </span>

      {/* Sold ribbon */}
      {isSold && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="rotate-[-20deg] bg-sand/90 text-slate-brand text-xs font-semibold uppercase tracking-[0.25em] px-5 py-1.5 rounded shadow-card">
            Sold
          </span>
        </div>
      )}

      {/* Bottom content */}
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 flex items-end justify-between gap-4">
        <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
          <div className="font-display text-2xl md:text-3xl text-cream leading-tight">
            {piece.title}
          </div>
          <div className="mt-0.5 text-[11px] uppercase tracking-[0.22em] text-cream/70">
            {piece.piece_type}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <Tag size={12} weight="bold" className="text-sage" />
            <span className="text-sm font-medium text-cream/90">
              {formatPrice(piece.price_zar)}
            </span>
          </div>
        </div>

        {isSold ? (
          <Link
            href={`/shop?category=${piece.category}`}
            className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cream/85 text-slate-brand text-[11px] font-medium uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 hover:bg-cream"
          >
            See similar
            <ArrowUpRight size={11} weight="bold" />
          </Link>
        ) : (
          <Link
            href={`/shop/${piece.slug}`}
            className="flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-cream/90 text-slate-brand opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 hover:bg-sage hover:text-cream"
            aria-label={`View ${piece.title}`}
          >
            <ArrowUpRight size={14} weight="bold" />
          </Link>
        )}
      </div>
    </motion.article>
  )
}

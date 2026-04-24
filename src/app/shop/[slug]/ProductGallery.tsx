'use client'

import { useState, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowsLeftRight } from '@phosphor-icons/react'
import type { MediaFile } from '../types'

interface ProductGalleryProps {
  afterImages: Array<{ image: MediaFile | string }>
  beforeImage: MediaFile | string
  title: string
}

function resolveUrl(
  src: MediaFile | string,
  seed: string,
  w = 900,
  h = 1100
): string {
  if (typeof src === 'object' && src.url) return src.url
  return `https://picsum.photos/seed/${seed}/${w}/${h}`
}

export function ProductGallery({
  afterImages,
  beforeImage,
  title,
}: ProductGalleryProps) {
  const [showBefore, setShowBefore] = useState(false)
  // active index into the afterImages array (or -1 = before)
  const [activeAfterIndex, setActiveAfterIndex] = useState(0)

  const afterSrcs = afterImages.map((a, i) =>
    resolveUrl(a.image, `detail-after-${i}`)
  )
  const beforeSrc = resolveUrl(beforeImage, 'detail-before')

  // Which image URL to show in the main frame
  const mainSrc = showBefore ? beforeSrc : afterSrcs[activeAfterIndex] ?? afterSrcs[0]
  const mainAlt = showBefore
    ? `${title} — before restoration`
    : `${title} — after restoration`

  const handleToggle = useCallback(() => {
    setShowBefore((prev) => !prev)
  }, [])

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveAfterIndex(index)
    setShowBefore(false)
  }, [])

  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {/* Main image frame */}
      <div className="relative overflow-hidden rounded-[24px] bg-slate-brand/5 ring-1 ring-slate-brand/10 aspect-[3/4] md:aspect-[4/5]">
        <AnimatePresence mode="wait">
          <motion.div
            key={mainSrc}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={mainSrc}
              alt={mainAlt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className={[
                'object-cover transition-[filter] duration-700',
                showBefore ? 'saturate-50 contrast-90 brightness-90' : '',
              ].join(' ')}
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Before / After toggle button */}
        <motion.button
          type="button"
          onClick={handleToggle}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-slate-brand/70 px-4 py-2 backdrop-blur-sm ring-1 ring-white/10 shadow-card transition-colors duration-200 hover:bg-slate-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          aria-pressed={showBefore}
          aria-label={showBefore ? 'Show after image' : 'Show before image'}
        >
          <ArrowsLeftRight size={13} weight="bold" className="text-cream/80" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90">
            {showBefore ? 'After' : 'Before'}
          </span>
        </motion.button>

        {/* State label */}
        <span className="absolute top-4 left-4 rounded-full bg-slate-brand/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-cream/90 backdrop-blur-sm pointer-events-none">
          {showBefore ? 'Before' : 'After'}
        </span>
      </div>

      {/* Thumbnail strip — only render if multiple after images */}
      {afterSrcs.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {afterSrcs.map((src, i) => {
            const active = !showBefore && activeAfterIndex === i
            return (
              <button
                key={src}
                type="button"
                onClick={() => handleThumbnailClick(i)}
                aria-label={`View after image ${i + 1}`}
                aria-pressed={active}
                className={[
                  'relative flex-shrink-0 rounded-[12px] overflow-hidden ring-2 transition-all duration-300 aspect-square w-16 md:w-20',
                  active
                    ? 'ring-sage shadow-[0_0_0_3px_rgba(143,175,159,0.35)]'
                    : 'ring-slate-brand/10 hover:ring-slate-brand/30',
                ].join(' ')}
              >
                <Image
                  src={src}
                  alt={`${title} — view ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            )
          })}

          {/* Before thumbnail */}
          <button
            type="button"
            onClick={() => setShowBefore(true)}
            aria-label="View before image"
            aria-pressed={showBefore}
            className={[
              'relative flex-shrink-0 rounded-[12px] overflow-hidden ring-2 transition-all duration-300 aspect-square w-16 md:w-20',
              showBefore
                ? 'ring-sage shadow-[0_0_0_3px_rgba(143,175,159,0.35)]'
                : 'ring-slate-brand/10 hover:ring-slate-brand/30',
            ].join(' ')}
          >
            <Image
              src={beforeSrc}
              alt={`${title} — before restoration`}
              fill
              sizes="80px"
              className="object-cover saturate-50"
            />
            <span className="absolute inset-x-0 bottom-0 bg-slate-brand/60 py-0.5 text-center text-[8px] font-semibold uppercase tracking-widest text-cream/90">
              Before
            </span>
          </button>
        </div>
      )}
    </div>
  )
}

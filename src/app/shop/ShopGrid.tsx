'use client'

import { useState, useCallback } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'
import { GALLERY_CATEGORIES } from '@/lib/constants'
import { MOCK_PIECES } from '@/lib/mockPieces'
import { ShopCard } from './ShopCard'
import type { ShopPiece } from './types'

type FilterKey = (typeof GALLERY_CATEGORIES)[number]['key']

export function ShopGrid() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  // Resolve initial filter from URL query param
  const paramCategory = searchParams.get('category') as FilterKey | null
  const initialFilter: FilterKey =
    paramCategory && GALLERY_CATEGORIES.some((c) => c.key === paramCategory)
      ? paramCategory
      : 'all'

  const [filter, setFilter] = useState<FilterKey>(initialFilter)
  const allPieces: ShopPiece[] = MOCK_PIECES as ShopPiece[]

  // Sync filter to URL
  const handleFilterChange = (key: FilterKey) => {
    setFilter(key)
    const params = new URLSearchParams(searchParams.toString())
    if (key === 'all') {
      params.delete('category')
    } else {
      params.set('category', key)
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const filteredPieces =
    filter === 'all'
      ? allPieces
      : allPieces.filter((p) => p.category === filter)

  const availablePieces = filteredPieces.filter((p) => p.status === 'available')
  const soldPieces = filteredPieces.filter((p) => p.status === 'sold')

  // Interleave sold pieces after available ones, capped at 4 sold shown
  const displayPieces = [...availablePieces, ...soldPieces.slice(0, 4)]

  return (
    <section className="container-outer pb-32 md:pb-48">
      {/* Sticky filter bar */}
      <div className="sticky top-24 md:top-28 z-20 -mx-1 mb-10 md:mb-14">
        <div className="inline-flex items-center gap-1 rounded-full bg-cream/85 backdrop-blur-md ring-1 ring-slate-brand/10 p-1 shadow-soft overflow-x-auto max-w-full">
          {GALLERY_CATEGORIES.map((cat) => {
            const active = filter === cat.key
            return (
              <button
                key={cat.key}
                type="button"
                onClick={() => handleFilterChange(cat.key)}
                className={[
                  'px-4 md:px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors duration-200',
                  active
                    ? 'bg-slate-brand text-cream'
                    : 'text-slate-brand/70 hover:text-slate-brand hover:bg-slate-brand/5',
                ].join(' ')}
                aria-pressed={active}
              >
                {cat.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Pieces grid */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7"
      >
        <AnimatePresence mode="popLayout">
          {displayPieces.map((piece, i) => (
            <ShopCard key={piece.id} piece={piece} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty state */}
      {displayPieces.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="py-28 text-center"
        >
          <p className="font-display italic text-3xl md:text-4xl text-slate-brand/60 mb-4">
            Nothing available here yet.
          </p>
          <p className="text-charcoal/50 text-sm mb-8 max-w-xs mx-auto leading-relaxed">
            New pieces arrive after every restoration. Check back soon, or reach out directly.
          </p>
          <button
            type="button"
            onClick={() => handleFilterChange('all')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-brand text-cream text-sm font-medium hover:bg-charcoal transition-colors"
          >
            View all pieces
          </button>
        </motion.div>
      )}

      {/* Availability summary */}
      {displayPieces.length > 0 && (
        <div className="mt-6 mb-10 flex items-center gap-3">
          <span className="h-px flex-1 bg-slate-brand/10" />
          <span className="text-[11px] uppercase tracking-[0.22em] text-slate-brand/50">
            {availablePieces.length} available
            {soldPieces.length > 0 && ` · ${soldPieces.slice(0, 4).length} recently sold`}
          </span>
          <span className="h-px flex-1 bg-slate-brand/10" />
        </div>
      )}

      {/* Bottom CTA */}
      <div className="mt-16 md:mt-24 text-center">
        <p className="font-display italic text-3xl md:text-4xl text-slate-brand/80 max-w-xl mx-auto leading-snug">
          After something that is not here yet?
        </p>
        <p className="mt-4 text-charcoal/60 text-sm max-w-sm mx-auto leading-relaxed">
          Katinka takes on custom commissions. Describe the piece you have in mind and we will talk.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 mt-8 px-7 py-4 rounded-full bg-slate-brand text-cream text-sm font-medium hover:bg-charcoal transition-colors active:scale-[0.98]"
        >
          Start a conversation
          <ArrowUpRight size={14} weight="bold" />
        </a>
      </div>
    </section>
  )
}

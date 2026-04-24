import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ShopGrid } from './ShopGrid'

export const metadata: Metadata = {
  title: 'Shop — Time & Again',
  description:
    'One-of-a-kind restored furniture pieces from the Time & Again workshop in Vanderbijlpark. Each piece is restored by hand — colour refreshes, wood restoration, upholstery, and custom commissions.',
}

export default function ShopPage() {
  return (
    <div className="relative bg-cream">
      {/* Page hero */}
      <section className="container-outer pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-slate-brand/40" />
              <span className="eyebrow">The Shop</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-slate-brand leading-[0.95] tracking-tight">
              Ready to take
              <br />
              <span className="italic text-sage">home.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-3">
            <p className="text-base md:text-lg text-charcoal/75 leading-relaxed max-w-md">
              Each piece here has been restored by hand — sanded, painted, repaired, or reupholstered.
              One of a kind. Once it is gone, it is gone.
            </p>
          </div>
        </div>
      </section>

      {/* Client grid with filter + pieces — Suspense required for useSearchParams */}
      <Suspense fallback={
        <div className="container-outer pb-32 md:pb-48">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={[
                  'rounded-[24px] bg-slate-brand/8 animate-pulse ring-1 ring-slate-brand/8',
                  i % 3 !== 1 ? 'aspect-[3/4]' : 'aspect-[5/4]',
                ].join(' ')}
              />
            ))}
          </div>
        </div>
      }>
        <ShopGrid />
      </Suspense>
    </div>
  )
}

import type { Metadata } from 'next'
import { GalleryGrid } from './GalleryGrid'

export const metadata: Metadata = {
  title: 'Gallery — Time & Again',
  description:
    'Selected furniture restorations from the Time & Again workshop in Vanderbijlpark — colour refreshes, wood restoration, upholstery, and custom commissions.',
}

export default function GalleryPage() {
  return (
    <div className="relative bg-cream">
      <section className="container-outer pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-slate-brand/40" />
              <span className="eyebrow">The Collection</span>
            </div>
            <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-slate-brand leading-[0.95] tracking-tight">
              Pieces we have
              <br />
              <span className="italic text-sage">brought home.</span>
            </h1>
          </div>
          <div className="md:col-span-4 md:pt-3">
            <p className="text-base md:text-lg text-charcoal/75 leading-relaxed max-w-md">
              Each piece arrives tired and leaves with a second life. Hover any
              card to see where we started — the before, behind the after.
            </p>
          </div>
        </div>
      </section>

      <GalleryGrid />
    </div>
  )
}

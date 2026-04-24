import Link from 'next/link'
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr'

export default function PieceNotFound() {
  return (
    <div className="relative bg-cream min-h-[100dvh] flex items-center">
      <div className="container-outer py-32 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <span className="h-px w-10 bg-slate-brand/25" />
          <span className="eyebrow">404</span>
          <span className="h-px w-10 bg-slate-brand/25" />
        </div>

        <h1 className="font-display text-6xl md:text-7xl text-slate-brand leading-[0.95] tracking-tight mb-5">
          Piece not found.
        </h1>

        <p className="text-base text-charcoal/60 leading-relaxed max-w-sm mx-auto mb-10">
          This piece may have sold or the link might be outdated. Browse what is
          currently available in the shop.
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-2 rounded-full bg-slate-brand px-7 py-4 text-cream text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-charcoal active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
        >
          <ArrowLeft size={14} weight="bold" aria-hidden />
          Back to shop
        </Link>
      </div>
    </div>
  )
}

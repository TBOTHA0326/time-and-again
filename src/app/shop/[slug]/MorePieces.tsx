import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Tag } from '@phosphor-icons/react/dist/ssr'
import type { ShopPiece, PayloadResponse } from '../types'

interface MorePiecesProps {
  category: ShopPiece['category']
  currentSlug: string
}

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function resolveAfterSrc(piece: ShopPiece): string {
  const first = piece.after_images?.[0]?.image
  if (typeof first === 'object' && first?.url) return first.url
  return `https://picsum.photos/seed/more-${piece.slug}/600/750`
}

async function fetchMorePieces(
  category: string,
  excludeSlug: string
): Promise<ShopPiece[]> {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

    const url = new URL('/api/pieces', baseUrl)
    url.searchParams.set('limit', '4')
    url.searchParams.set('sort', '-createdAt')
    url.searchParams.set('where[status][equals]', 'available')
    url.searchParams.set('where[category][equals]', category)
    url.searchParams.set('depth', '1')

    const res = await fetch(url.toString(), {
      next: { revalidate: 120 },
    })

    if (!res.ok) return []

    const data: PayloadResponse<ShopPiece> = await res.json()
    // Exclude current piece and cap at 3
    return data.docs.filter((p) => p.slug !== excludeSlug).slice(0, 3)
  } catch {
    return []
  }
}

const CATEGORY_LABEL: Record<ShopPiece['category'], string> = {
  colour: 'Colour Refresh',
  wood: 'Wood Restoration',
  upholstery: 'Upholstery',
  custom: 'Custom',
}

export async function MorePieces({ category, currentSlug }: MorePiecesProps) {
  const pieces = await fetchMorePieces(category, currentSlug)

  if (pieces.length === 0) return null

  return (
    <section className="border-t border-slate-brand/10 pt-16 md:pt-24">
      <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="h-px w-8 bg-slate-brand/30" />
            <span className="eyebrow">More pieces</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl text-slate-brand leading-[0.95] tracking-tight">
            {CATEGORY_LABEL[category]}
          </h2>
        </div>
        <Link
          href={`/shop?category=${category}`}
          className="flex-shrink-0 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-slate-brand/60 hover:text-slate-brand transition-colors duration-200 pb-0.5 border-b border-slate-brand/20 hover:border-slate-brand/50"
        >
          View all
          <ArrowUpRight size={11} weight="bold" aria-hidden />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {pieces.map((piece, index) => {
          const afterSrc = resolveAfterSrc(piece)
          const isTall = index % 3 !== 1

          return (
            <Link
              key={piece.id}
              href={`/shop/${piece.slug}`}
              className={[
                'group relative overflow-hidden rounded-[20px] ring-1 ring-slate-brand/10 bg-slate-brand/5',
                isTall ? 'aspect-[3/4]' : 'aspect-[5/4]',
              ].join(' ')}
              aria-label={`View ${piece.title}`}
            >
              <Image
                src={afterSrc}
                alt={`${piece.title} — restored`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/65 via-slate-brand/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Category pill */}
              <span className="absolute top-3.5 left-3.5 text-[9px] uppercase tracking-[0.22em] text-cream/80 bg-slate-brand/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {CATEGORY_LABEL[category]}
              </span>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-4 md:p-5 flex items-end justify-between gap-3">
                <div className="translate-y-1.5 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="font-display text-xl md:text-2xl text-cream leading-tight">
                    {piece.title}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-cream/65">
                    {piece.piece_type}
                  </div>
                  <div className="mt-1.5 flex items-center gap-1.5">
                    <Tag size={11} weight="bold" className="text-sage" aria-hidden />
                    <span className="text-xs font-medium text-cream/85">
                      {formatPrice(piece.price_zar)}
                    </span>
                  </div>
                </div>

                <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-cream/90 text-slate-brand opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500 hover:bg-sage hover:text-cream">
                  <ArrowUpRight size={13} weight="bold" aria-hidden />
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

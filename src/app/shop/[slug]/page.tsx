import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'
import type { Metadata } from 'next'
import { ArrowLeft, Package, Ruler, Swatches } from '@phosphor-icons/react/dist/ssr'
import { ProductGallery } from './ProductGallery'
import { MorePieces } from './MorePieces'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'
import type { ShopPiece, PayloadResponse } from '../types'

// ─── Data fetching ────────────────────────────────────────────────────────────

function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

async function getPieceBySlug(slug: string): Promise<ShopPiece | null> {
  try {
    const url = new URL('/api/pieces', getBaseUrl())
    url.searchParams.set('where[slug][equals]', slug)
    url.searchParams.set('limit', '1')
    url.searchParams.set('depth', '2')

    const res = await fetch(url.toString(), {
      next: { revalidate: 60 },
    })

    if (!res.ok) return null

    const data: PayloadResponse<ShopPiece> = await res.json()
    return data.docs[0] ?? null
  } catch {
    return null
  }
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const piece = await getPieceBySlug(slug)
  if (!piece || piece.status === 'draft') {
    return { title: 'Piece not found — Time & Again' }
  }
  return {
    title: `${piece.title} — Time & Again Shop`,
    description: `${piece.piece_type} restored by Katinka. ${piece.status === 'sold' ? 'This piece has been sold.' : 'Available now.'}`,
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDimensions(
  dims: ShopPiece['dimensions']
): string | null {
  if (!dims) return null
  const parts: string[] = []
  if (dims.width_cm) parts.push(`W ${dims.width_cm}`)
  if (dims.height_cm) parts.push(`H ${dims.height_cm}`)
  if (dims.depth_cm) parts.push(`D ${dims.depth_cm}`)
  if (parts.length === 0) return null
  return parts.join(' × ') + ' cm'
}

const CATEGORY_LABEL: Record<ShopPiece['category'], string> = {
  colour: 'Colour Refresh',
  wood: 'Wood Restoration',
  upholstery: 'Upholstery',
  custom: 'Custom',
}

// ─── Rich text renderer ───────────────────────────────────────────────────────
// Lexical stores content as JSON. We render a minimal subset: paragraphs,
// headings, and inline formatting. If the field is absent we render nothing.

interface LexicalNode {
  type: string
  text?: string
  format?: number
  children?: LexicalNode[]
  tag?: string
}

function renderLexical(root: unknown): string {
  if (!root || typeof root !== 'object') return ''
  const r = root as { root?: { children?: LexicalNode[] } }
  const nodes = r.root?.children ?? []
  return nodes
    .map((node) => renderNode(node))
    .filter(Boolean)
    .join('\n')
}

function renderNode(node: LexicalNode): string {
  switch (node.type) {
    case 'paragraph':
      return `<p class="text-charcoal/75 leading-relaxed text-base mb-4 last:mb-0">${renderChildren(node.children)}</p>`
    case 'heading':
      return `<h3 class="font-display text-2xl text-slate-brand mb-2 mt-6 first:mt-0">${renderChildren(node.children)}</h3>`
    case 'text': {
      let text = escapeHtml(node.text ?? '')
      // format bit flags: 1=bold, 2=italic, 4=strikethrough, 8=underline
      if (node.format && node.format & 2) text = `<em>${text}</em>`
      if (node.format && node.format & 1) text = `<strong>${text}</strong>`
      return text
    }
    case 'linebreak':
      return '<br />'
    default:
      return renderChildren(node.children)
  }
}

function renderChildren(children?: LexicalNode[]): string {
  if (!children) return ''
  return children.map(renderNode).join('')
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ShopDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const piece = await getPieceBySlug(slug)

  // 404 on missing or draft pieces
  if (!piece || piece.status === 'draft') {
    notFound()
  }

  const isSold = piece.status === 'sold'
  const dimString = formatDimensions(piece.dimensions)
  const descriptionHtml = piece.description
    ? renderLexical(piece.description)
    : null

  return (
    <div className="relative bg-cream min-h-[100dvh]">
      {/* ── Breadcrumb / back link ─────────────────────────────────────────── */}
      <nav
        aria-label="Breadcrumb"
        className="container-outer pt-28 md:pt-36 pb-8 md:pb-12"
      >
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-slate-brand/55 hover:text-slate-brand transition-colors duration-200 group"
        >
          <ArrowLeft
            size={12}
            weight="bold"
            aria-hidden
            className="transition-transform duration-200 group-hover:-translate-x-0.5"
          />
          Back to shop
        </Link>
      </nav>

      {/* ── Sold banner ───────────────────────────────────────────────────── */}
      {isSold && (
        <div className="container-outer mb-6">
          <div className="flex items-center gap-4 rounded-[16px] bg-sand/25 ring-1 ring-sand/40 px-5 py-4">
            <span className="inline-flex items-center rounded-full bg-sand text-slate-brand text-[10px] font-semibold uppercase tracking-[0.2em] px-3 py-1">
              Sold
            </span>
            <p className="text-sm text-charcoal/70 leading-relaxed">
              This piece has found its new home. Browse more available pieces below.
            </p>
          </div>
        </div>
      )}

      {/* ── Main 2-column layout ──────────────────────────────────────────── */}
      <section className="container-outer pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 lg:gap-20">

          {/* LEFT — Gallery */}
          <div className="md:col-span-7">
            <ProductGallery
              afterImages={piece.after_images ?? []}
              beforeImage={piece.before_image}
              title={piece.title}
            />
          </div>

          {/* RIGHT — Metadata */}
          <div className="md:col-span-5 md:pt-4 flex flex-col">

            {/* Category eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px w-8 bg-slate-brand/30" />
              <span className="eyebrow">{CATEGORY_LABEL[piece.category]}</span>
            </div>

            {/* Title */}
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-slate-brand leading-[0.95] tracking-tight mb-2">
              {piece.title}
            </h1>

            {/* Piece type */}
            <p className="text-sm text-charcoal/55 uppercase tracking-[0.18em] mb-6">
              {piece.piece_type}
              {piece.year && (
                <span className="ml-3 text-charcoal/35">— {piece.year}</span>
              )}
            </p>

            {/* Price */}
            {!isSold && (
              <div className="mb-8">
                <span className="font-display text-4xl md:text-5xl text-sage tracking-tight">
                  {formatPrice(piece.price_zar)}
                </span>
              </div>
            )}

            {/* Divider */}
            <hr className="border-slate-brand/10 mb-8" />

            {/* Meta details */}
            <div className="flex flex-col gap-5 mb-8">
              {piece.materials && (
                <div className="flex items-start gap-3">
                  <Swatches
                    size={16}
                    weight="duotone"
                    className="text-sage mt-0.5 flex-shrink-0"
                    aria-hidden
                  />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-0.5">
                      Materials
                    </dt>
                    <dd className="text-sm text-charcoal/80 leading-relaxed">
                      {piece.materials}
                    </dd>
                  </div>
                </div>
              )}

              {dimString && (
                <div className="flex items-start gap-3">
                  <Ruler
                    size={16}
                    weight="duotone"
                    className="text-sage mt-0.5 flex-shrink-0"
                    aria-hidden
                  />
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.22em] text-charcoal/45 mb-0.5">
                      Dimensions
                    </dt>
                    <dd className="text-sm text-charcoal/80 font-mono tracking-tight">
                      {dimString}
                    </dd>
                  </div>
                </div>
              )}

              {!piece.materials && !dimString && (
                <div className="flex items-start gap-3">
                  <Package
                    size={16}
                    weight="duotone"
                    className="text-sage mt-0.5 flex-shrink-0"
                    aria-hidden
                  />
                  <p className="text-sm text-charcoal/50 leading-relaxed">
                    Contact Katinka for full details on materials and dimensions.
                  </p>
                </div>
              )}
            </div>

            {/* Description */}
            {descriptionHtml && (
              <div
                className="prose-sm text-charcoal/75 leading-relaxed mb-8 max-w-none"
                // Safe: HTML is generated server-side from trusted Payload CMS data
                dangerouslySetInnerHTML={{ __html: descriptionHtml }}
              />
            )}

            {/* Spacer to push CTA to bottom on desktop */}
            <div className="flex-1" />

            {/* CTA */}
            {isSold ? (
              <div className="flex flex-col gap-3">
                <Link
                  href={`/shop?category=${piece.category}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-brand px-7 py-4 text-cream text-sm font-semibold uppercase tracking-[0.18em] transition-colors duration-200 hover:bg-charcoal active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-2"
                >
                  Browse available pieces
                </Link>
                <p className="text-center text-[11px] text-charcoal/40 uppercase tracking-[0.18em]">
                  or{' '}
                  <Link
                    href="/shop"
                    className="underline underline-offset-2 hover:text-charcoal/60 transition-colors"
                  >
                    view all pieces
                  </Link>
                </p>
              </div>
            ) : (
              <WhatsAppCTA
                title={piece.title}
                pieceType={piece.piece_type}
                slug={piece.slug}
              />
            )}
          </div>
        </div>
      </section>

      {/* ── More from this category ────────────────────────────────────────── */}
      <section className="container-outer pb-28 md:pb-40">
        <Suspense>
          <MorePieces category={piece.category} currentSlug={piece.slug} />
        </Suspense>
      </section>
    </div>
  )
}

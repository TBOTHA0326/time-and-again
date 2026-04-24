# Shop — Design Spec

**Date:** 2026-04-23
**Scope:** Phase 1 shop for Time & Again — catalogue of restored one-of-a-kind pieces with WhatsApp inquiry only (no checkout).

## Goals

- Katinka can publish/edit pieces through a polished admin UI.
- Visitors browse `/shop`, view a piece detail page, and inquire via WhatsApp.
- Sold pieces stay visible with a "Sold" ribbon.
- No payments, no orders, no reservations in this phase.

## Architecture

- **Next.js 14 App Router** (existing) — hosts both the public site and the CMS.
- **Payload CMS 3.x** — mounted in the same Next app. Admin UI at `/admin`.
- **Supabase Postgres** — Payload's primary data store via `DATABASE_URL`.
- **Supabase Storage** — bucket `pieces`, S3 adapter for Payload media.
- **Single Vercel deploy.** No second service.

**Migration lifecycles:**
- `src/payload/migrations/` — Payload's own schema (auto-generated, don't hand-edit).
- `supabase/migrations/` — Supabase-native SQL written by hand: `pgcrypto` extension, storage bucket creation, RLS policies.

Both apply to the same Postgres; they come from different tools.

## Data Model

**Collection: `pieces`**

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | text | yes | "Sage Dresser" |
| `slug` | text unique | yes | auto from title, editable |
| `piece_type` | text | yes | "Mid-century dresser" |
| `category` | select | yes | `colour` / `wood` / `upholstery` / `custom` |
| `year` | text | no | "2025" |
| `price_zar` | number | yes | whole rand |
| `status` | select | yes | `draft` / `available` / `sold` |
| `description` | richText | no | long-form story |
| `dimensions` | group | no | `width_cm`, `height_cm`, `depth_cm` |
| `materials` | text | no | "Reclaimed oak, linen, bone hardware" |
| `before_image` | upload → Media | yes | one image |
| `after_images` | array of upload → Media | yes (min 1) | hero + detail shots |
| `featured` | checkbox | no | pins to top of `/shop` |
| `sold_at` | date | auto | set by hook when `status` → `sold` |
| `created_at`, `updated_at` | auto | — | Payload default |

**Collection: `media`** — Payload's built-in upload collection, routed to Supabase Storage bucket `pieces`.

**Collection: `users`** — Payload built-in. Field `role: admin | editor`. `/admin` gated to `admin`.

## Routes

- `GET /shop` — RSC. Queries Payload local API for `status in ('available','sold')`, ordered by `featured desc, status asc, sold_at desc, created_at desc`. Filter pills by category (client subcomponent). Sold ribbon on cards.
- `GET /shop/[slug]` — RSC. 404 on miss or `status = 'draft'`. Gallery of `after_images` (primary) with before/after toggle. Title, price (or "Sold"), piece_type, materials, dimensions, richText description. WhatsApp CTA button. "More pieces" rail (3 same-category, excluding self).
- `GET /admin/*` — Payload admin, auth-gated.

## Sold Piece Behaviour

- **Listing card:** angled "Sold" ribbon top-right; after-image slightly desaturated (40%); CTA flips to "See similar pieces" → `/shop?category=<same>`.
- **Detail page:** banner at top: "This piece found its home. [Browse available pieces →]". WhatsApp CTA replaced with `Browse available`. Price hidden.

## WhatsApp CTA

Pre-filled message format:

```
Hi Katinka, I'm interested in {title} ({piece_type}) —
{siteUrl}/shop/{slug}
```

URL: `https://wa.me/27760407277?text=<url-encoded-message>`. Opens in new tab.

## Admin Access

- Payload's built-in cookie/JWT auth.
- Seeded admin on first run from env vars `ADMIN_EMAIL` + `ADMIN_PASSWORD`.
- `/admin` inaccessible without `role: admin`.
- No public signup.

## Out of Scope (Phase 2+)

- Orders, payments, stock reservations.
- Commission flow (brief → quote → deposit → build → delivery). Distinct data model, not bolted onto `pieces`.
- Email transactional notifications.
- Analytics on inquiries.

## Supabase Migrations Plan

Files go in `supabase/migrations/` with Supabase CLI timestamp naming:

1. `<ts>_extensions.sql` — enable `pgcrypto`.
2. `<ts>_storage_bucket_pieces.sql` — create bucket, set public read.
3. `<ts>_storage_policies_pieces.sql` — public SELECT, authenticated write.

## Environment Variables

- `DATABASE_URL` — Supabase Postgres connection string (pooled).
- `PAYLOAD_SECRET` — long random string for Payload.
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` — for storage adapter.
- `SUPABASE_STORAGE_BUCKET` — `pieces`.
- `NEXT_PUBLIC_SITE_URL` — used in WhatsApp pre-fill.
- `ADMIN_EMAIL`, `ADMIN_PASSWORD` — first-run seed (optional after first login).

## Risks / Notes

- Payload 3 + Next 14 are compatible; confirm at install time.
- Supabase pooler (pgbouncer) mode matters for Payload's Drizzle; use transaction pooler or direct connection string for migrations.
- Images: Next/Image `remotePatterns` must allow the Supabase Storage hostname.

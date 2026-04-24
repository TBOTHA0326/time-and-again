# Shop Implementation Plan

> **For agentic workers:** Use superpowers:subagent-driven-development to execute task-by-task with review between each.

**Goal:** Build a Payload CMS–powered shop for selling one-of-a-kind restored pieces via WhatsApp inquiry.

**Architecture:** Payload 3.x mounted inside Next.js 14 App Router, Supabase Postgres backend, Supabase Storage for images (S3 adapter), `/shop` listing + `/shop/[slug]` detail, WhatsApp CTA, sold-ribbon treatment.

**Tech Stack:** Next.js 14, Payload CMS 3, Supabase Postgres, Supabase Storage, Framer Motion (animations), `next/image`.

**Verification approach (no unit tests):** Spin up dev server, navigate to pages, confirm behavior visually. Payload admin runs at `/admin`.

---

## File Structure

**New files:**
- `payload.config.ts` — Payload config
- `src/payload/collections/Pieces.ts` — pieces collection
- `src/payload/collections/Media.ts` — media collection
- `src/payload/collections/Users.ts` — users collection
- `src/payload/access/IsAdmin.ts` — role check utility
- `src/app/shop/page.tsx` — listing RSC
- `src/app/shop/ShopGrid.tsx` — filter + grid, client component
- `src/app/shop/ShopCard.tsx` — card with sold ribbon
- `src/app/shop/[slug]/page.tsx` — detail RSC
- `src/app/shop/[slug]/ProductGallery.tsx` — image gallery, client
- `src/app/shop/[slug]/MorePieces.tsx` — related items rail
- `supabase/migrations/<ts>_extensions.sql`
- `supabase/migrations/<ts>_storage.sql`
- `.env.example` — template for env vars

**Modified files:**
- `package.json` — Payload + Supabase deps
- `next.config.mjs` — Payload config + image remotePatterns
- `tsconfig.json` — Payload compat settings
- `src/app/layout.tsx` — Payload provider wrapper (optional)

---

### Task 1: Install Payload + configure

**Files:**
- Create: `payload.config.ts`
- Modify: `package.json`, `next.config.mjs`, `tsconfig.json`

- [ ] **Step 1:** Install Payload packages
```bash
npm install payload @payloadcms/next @payloadcms/db-postgres @payloadcms/richtext-lexical @payloadcms/storage-s3 dotenv
```

- [ ] **Step 2:** Create `payload.config.ts` at project root
```typescript
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export default buildConfig({
  admin: {
    user: 'users',
    importMap: {
      baseUrl: path.resolve(__dirname, './src'),
    },
  },
  editor: lexicalEditor(),
  collections: [
    // Will add Pieces, Media, Users in later tasks
  ],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-prod',
  typescript: {
    outputFile: path.resolve(__dirname, 'src/payload-types.ts'),
  },
  plugins: [
    // Will add S3 storage plugin in Task 4
  ],
})
```

- [ ] **Step 3:** Update `next.config.mjs` to mount Payload
```javascript
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Add Supabase Storage domain in Task 4
    ],
  },
}

export default withPayload(nextConfig)
```

- [ ] **Step 4:** Update `tsconfig.json` to allow `payload-types.ts` and set `strict: false` (Payload compatibility)
```json
{
  "compilerOptions": {
    "strict": false,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

- [ ] **Step 5:** Create `src/app/admin/[[...segments]]/page.tsx` (Payload admin route)
```typescript
export { default } from '@payloadcms/next/views'
```

- [ ] **Step 6:** Commit
```bash
git add -A && git commit -m "chore: install and configure Payload CMS"
```

---

### Task 2: Supabase migrations + storage setup

**Files:**
- Create: `supabase/migrations/<ts>_enable_extensions.sql`
- Create: `supabase/migrations/<ts>_storage_bucket.sql`
- Create: `supabase/migrations/<ts>_storage_policies.sql`

- [ ] **Step 1:** Create extensions migration
```sql
-- supabase/migrations/20260423120000_enable_extensions.sql
create extension if not exists "pgcrypto";
```

- [ ] **Step 2:** Create storage bucket migration
```sql
-- supabase/migrations/20260423120100_storage_bucket.sql
insert into storage.buckets (id, name, public)
values ('pieces', 'pieces', true)
on conflict (id) do nothing;
```

- [ ] **Step 3:** Create storage RLS policies migration
```sql
-- supabase/migrations/20260423120200_storage_policies.sql
create policy "Public read on pieces bucket"
on storage.objects
for select using (bucket_id = 'pieces');

create policy "Authenticated write on pieces bucket"
on storage.objects
for insert with check (bucket_id = 'pieces' and auth.role() = 'authenticated');

create policy "Authenticated update on pieces bucket"
on storage.objects
for update using (bucket_id = 'pieces' and auth.role() = 'authenticated');

create policy "Authenticated delete on pieces bucket"
on storage.objects
for delete using (bucket_id = 'pieces' and auth.role() = 'authenticated');
```

- [ ] **Step 4:** Push migrations to Supabase
```bash
# Install Supabase CLI if not present
npm install -D supabase

# Push to remote (requires supabase login + project linked)
npx supabase db push

# Or seed locally if using local Supabase
npx supabase start
npx supabase db push --local
```

- [ ] **Step 5:** Commit
```bash
git add supabase/migrations && git commit -m "chore: add Supabase migrations for storage"
```

---

### Task 3: Pieces collection + schema

**Files:**
- Create: `src/payload/collections/Pieces.ts`
- Modify: `payload.config.ts`

- [ ] **Step 1:** Create Pieces collection
```typescript
// src/payload/collections/Pieces.ts
import { CollectionConfig } from 'payload'

export const Pieces: CollectionConfig = {
  slug: 'pieces',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'price_zar', 'created_at'],
  },
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar' },
    },
    { name: 'piece_type', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      options: ['colour', 'wood', 'upholstery', 'custom'],
      required: true,
    },
    { name: 'year', type: 'text' },
    { name: 'price_zar', type: 'number', required: true },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'available', 'sold'],
      required: true,
      defaultValue: 'draft',
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
    },
    {
      name: 'dimensions',
      type: 'group',
      fields: [
        { name: 'width_cm', type: 'number' },
        { name: 'height_cm', type: 'number' },
        { name: 'depth_cm', type: 'number' },
      ],
    },
    { name: 'materials', type: 'text' },
    {
      name: 'before_image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'after_images',
      type: 'array',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
      required: true,
      minRows: 1,
    },
    { name: 'featured', type: 'checkbox' },
    { name: 'sold_at', type: 'date', admin: { readOnly: true } },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        if (data.status === 'sold' && !data.sold_at) {
          data.sold_at = new Date().toISOString()
        }
        return data
      },
    ],
    // Slug auto-generation: if title changes, regenerate slug unless user manually edited
    beforeValidate: [
      ({ data, operation }) => {
        if (!data.slug || operation === 'create') {
          data.slug = data.title
            ?.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]/g, '')
        }
        return data
      },
    ],
  },
}
```

- [ ] **Step 2:** Import and add Pieces to `payload.config.ts` collections array
```typescript
import { Pieces } from './src/payload/collections/Pieces'

// Inside buildConfig:
collections: [
  Pieces,
  // Media and Users come next
]
```

- [ ] **Step 3:** Commit
```bash
git add src/payload/collections/Pieces.ts payload.config.ts && git commit -m "feat: add pieces collection"
```

---

### Task 4: Media collection + S3 storage adapter

**Files:**
- Create: `src/payload/collections/Media.ts`
- Modify: `payload.config.ts`, `next.config.mjs`, `.env.example`

- [ ] **Step 1:** Create Media collection
```typescript
// src/payload/collections/Media.ts
import { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: ({ req }) => req.user?.role === 'admin',
    update: ({ req }) => req.user?.role === 'admin',
    delete: ({ req }) => req.user?.role === 'admin',
  },
  upload: {
    staticDir: 'media', // fallback, S3 adapter overrides
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    disableLocalStorage: true, // Use S3 only
  },
  fields: [
    { name: 'alt', type: 'text', required: true },
  ],
}
```

- [ ] **Step 2:** Install S3 adapter
```bash
npm install @payloadcms/storage-s3
```

- [ ] **Step 3:** Add S3 adapter to `payload.config.ts` plugins
```typescript
import { s3Storage } from '@payloadcms/storage-s3'

// Inside buildConfig, add to plugins array:
plugins: [
  s3Storage({
    collections: {
      media: {
        generateUrl: ({ filename }) => {
          const bucketUrl = process.env.SUPABASE_STORAGE_URL
          return `${bucketUrl}/object/public/pieces/${filename}`
        },
        s3: {
          credentials: {
            accessKeyId: process.env.SUPABASE_ACCESS_KEY_ID,
            secretAccessKey: process.env.SUPABASE_SECRET_ACCESS_KEY,
          },
          region: 'auto',
          endpoint: process.env.SUPABASE_STORAGE_ENDPOINT,
          bucket: process.env.SUPABASE_STORAGE_BUCKET || 'pieces',
          forcePathStyle: true,
        },
      },
    },
  }),
]
```

- [ ] **Step 4:** Update `next.config.mjs` remotePatterns
```javascript
// Add Supabase Storage domain (example: project.supabase.co)
const supabaseStoragePattern = process.env.SUPABASE_URL?.replace('https://', '')

export default withPayload({
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: supabaseStoragePattern },
    ],
  },
})
```

- [ ] **Step 5:** Create `.env.example`
```bash
DATABASE_URL=postgresql://user:password@host:5432/db
PAYLOAD_SECRET=generate-a-long-random-string-here

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_STORAGE_URL=https://your-project.supabase.co/storage/v1
SUPABASE_STORAGE_ENDPOINT=https://your-project.supabase.co
SUPABASE_STORAGE_BUCKET=pieces
SUPABASE_ACCESS_KEY_ID=your-key
SUPABASE_SECRET_ACCESS_KEY=your-secret

# First admin seed (optional after first login)
ADMIN_EMAIL=katinka@example.com
ADMIN_PASSWORD=temporary-password-change-me
```

- [ ] **Step 6:** Commit
```bash
git add src/payload/collections/Media.ts payload.config.ts next.config.mjs .env.example && git commit -m "feat: add media collection with S3 storage"
```

---

### Task 5: Users collection + admin role

**Files:**
- Create: `src/payload/collections/Users.ts`
- Create: `src/payload/access/IsAdmin.ts`
- Modify: `payload.config.ts`

- [ ] **Step 1:** Create access control utility
```typescript
// src/payload/access/IsAdmin.ts
import { Access } from 'payload'

export const isAdmin: Access = ({ req }) => {
  return req.user?.role === 'admin'
}

export const isAdminOrLoggedIn: Access = ({ req }) => {
  return !!req.user
}
```

- [ ] **Step 2:** Create Users collection
```typescript
// src/payload/collections/Users.ts
import { CollectionConfig } from 'payload'
import { isAdmin } from '../access/IsAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    create: isAdmin,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    {
      name: 'role',
      type: 'select',
      options: ['admin', 'editor'],
      required: true,
      defaultValue: 'editor',
    },
  ],
}
```

- [ ] **Step 3:** Add Users + Media to `payload.config.ts` collections array and set auth
```typescript
import { Users } from './src/payload/collections/Users'
import { Media } from './src/payload/collections/Media'

export default buildConfig({
  // ...
  collections: [Pieces, Media, Users],
  // Set the auth collection
  auth: {
    users: 'users',
    cookies: {
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    },
  },
})
```

- [ ] **Step 4:** Document seed script (env vars method)
> After first `npm run dev`, the admin `/admin` route will prompt to create the initial admin user if none exists. Use `ADMIN_EMAIL` and `ADMIN_PASSWORD` env vars to seed. Change password immediately in `/admin`.

- [ ] **Step 5:** Commit
```bash
git add src/payload/collections/Users.ts src/payload/access/IsAdmin.ts payload.config.ts && git commit -m "feat: add users collection and role-based access"
```

---

### Task 6: Shop listing page `/shop`

**Files:**
- Create: `src/app/shop/page.tsx`
- Create: `src/app/shop/ShopGrid.tsx`
- Create: `src/app/shop/ShopCard.tsx`

**Design note:** Invoke `/design-taste-frontend` skill before building ShopGrid + ShopCard.

- [ ] **Step 1:** Create RSC listing page
```typescript
// src/app/shop/page.tsx
import type { Metadata } from 'next'
import { ShopGrid } from './ShopGrid'

export const metadata: Metadata = {
  title: 'Shop — Time & Again',
  description: 'Restored one-of-a-kind furniture pieces for sale.',
}

export default function ShopPage() {
  return (
    <div className="relative bg-cream">
      <section className="container-outer pt-36 md:pt-48 pb-16 md:pb-24">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-slate-brand/40" />
            <span className="eyebrow">Available Now</span>
          </div>
          <h1 className="font-display text-6xl md:text-7xl lg:text-8xl text-slate-brand leading-[0.95] tracking-tight">
            Ready to take home.
          </h1>
          <p className="mt-6 text-base md:text-lg text-charcoal/75 max-w-lg">
            Each piece is one-of-a-kind and restored to order. Claim yours via WhatsApp.
          </p>
        </div>
      </section>

      <ShopGrid />
    </div>
  )
}
```

- [ ] **Step 2:** Create client grid component with filter
```typescript
// src/app/shop/ShopGrid.tsx
'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { getPayload } from 'payload'
import { ShopCard } from './ShopCard'
import { GALLERY_CATEGORIES } from '@/lib/constants'

type Filter = 'all' | 'colour' | 'wood' | 'upholstery' | 'custom'

export function ShopGrid() {
  const [filter, setFilter] = useState<Filter>('all')
  const [pieces, setPieces] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch pieces server-side via Payload local API
  useEffect(() => {
    const fetchPieces = async () => {
      const payload = await getPayload()
      const { docs } = await payload.find({
        collection: 'pieces',
        where: {
          status: { in: ['available', 'sold'] },
        },
        sort: '-featured,-sold_at,created_at',
      })
      setPieces(docs)
      setLoading(false)
    }
    fetchPieces()
  }, [])

  const filtered = useMemo(
    () => (filter === 'all' ? pieces : pieces.filter((p) => p.category === filter)),
    [pieces, filter]
  )

  return (
    <section className="container-outer pb-32">
      <div className="sticky top-24 z-20 -mx-1 mb-12">
        <div className="inline-flex gap-1 rounded-full bg-cream/85 backdrop-blur-md ring-1 ring-slate-brand/10 p-1 shadow-soft">
          {GALLERY_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setFilter(cat.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                filter === cat.key
                  ? 'bg-slate-brand text-cream'
                  : 'text-slate-brand/75 hover:bg-slate-brand/5'
              }`}
              aria-pressed={filter === cat.key}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((piece, i) => (
            <ShopCard key={piece.id} piece={piece} index={i} />
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-slate-brand/60">
          No pieces available in this category.
        </div>
      )}
    </section>
  )
}
```

- [ ] **Step 3:** Create card component with sold treatment
```typescript
// src/app/shop/ShopCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowUpRight } from '@phosphor-icons/react'

export function ShopCard({ piece, index }) {
  const isSold = piece.status === 'sold'
  const firstAfter = piece.after_images?.[0]?.image

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ delay: (index % 3) * 0.05 }}
    >
      <Link
        href={`/shop/${piece.slug}`}
        className={`group relative block overflow-hidden rounded-[20px] ring-1 ring-slate-brand/10 aspect-[4/5] bg-slate-brand/5 ${
          isSold ? 'opacity-75' : ''
        }`}
      >
        {firstAfter && (
          <Image
            src={firstAfter.url}
            alt={piece.title}
            fill
            className={`object-cover transition-transform group-hover:scale-105 ${
              isSold ? 'saturate-75' : ''
            }`}
          />
        )}

        {isSold && (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-brand/40 to-transparent flex items-center justify-center">
            <span className="text-cream font-display text-2xl font-light tracking-wider">
              Sold
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/60 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

        <div className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3">
          <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="font-display text-xl text-cream">{piece.title}</div>
            <div className="text-xs uppercase tracking-widest text-cream/75 mt-1">
              {piece.piece_type}
            </div>
            {!isSold && (
              <div className="text-sm font-medium text-sage mt-2">
                R {piece.price_zar.toLocaleString()}
              </div>
            )}
          </div>

          {!isSold && (
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-cream/90 text-slate-brand flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-500">
              <ArrowUpRight size={14} weight="bold" />
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
```

- [ ] **Step 4:** Commit
```bash
git add src/app/shop/page.tsx src/app/shop/ShopGrid.tsx src/app/shop/ShopCard.tsx && git commit -m "feat: add shop listing page with filter and sold treatment"
```

---

### Task 7: Shop detail page `/shop/[slug]`

**Files:**
- Create: `src/app/shop/[slug]/page.tsx`
- Create: `src/app/shop/[slug]/ProductGallery.tsx`
- Create: `src/app/shop/[slug]/MorePieces.tsx`
- Create: `src/components/ui/WhatsAppCTA.tsx`

**Design note:** Invoke `/design-taste-frontend` skill before building ProductGallery + MorePieces.

- [ ] **Step 1:** Create detail page RSC
```typescript
// src/app/shop/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { ProductGallery } from './ProductGallery'
import { MorePieces } from './MorePieces'
import { WhatsAppCTA } from '@/components/ui/WhatsAppCTA'

export async function generateMetadata({ params }): Promise<Metadata> {
  const payload = await getPayload()
  const piece = await payload.findByID({ collection: 'pieces', id: params.slug })

  if (!piece) return { title: 'Not found' }

  return {
    title: `${piece.title} — Time & Again`,
    description: `${piece.piece_type}. Restored by Time & Again.`,
  }
}

export default async function ProductPage({ params }) {
  const payload = await getPayload()
  const piece = await payload.find({
    collection: 'pieces',
    where: { slug: { equals: params.slug } },
  })

  if (!piece.docs?.[0] || piece.docs[0].status === 'draft') {
    notFound()
  }

  const product = piece.docs[0]
  const isSold = product.status === 'sold'

  return (
    <div className="bg-cream">
      <div className="container-outer pt-32 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <ProductGallery piece={product} />

          <div className="flex flex-col justify-center">
            {isSold && (
              <div className="mb-6 inline-flex items-center gap-3 rounded-full bg-slate-brand/10 px-4 py-2 w-fit">
                <span className="inline-block w-2 h-2 rounded-full bg-slate-brand/50" />
                <span className="text-sm font-medium text-slate-brand">This piece found its home</span>
              </div>
            )}

            <h1 className="font-display text-6xl md:text-7xl text-slate-brand leading-tight">
              {product.title}
            </h1>
            <p className="text-xl text-charcoal/75 mt-4">{product.piece_type}</p>

            {!isSold && (
              <p className="text-3xl font-display text-sage mt-8">
                R {product.price_zar.toLocaleString()}
              </p>
            )}

            {product.materials && (
              <div className="mt-10">
                <div className="text-xs uppercase tracking-widest text-slate-brand/60 mb-2">
                  Materials
                </div>
                <p className="text-charcoal">{product.materials}</p>
              </div>
            )}

            {product.dimensions && (
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-slate-brand/60 mb-2">
                  Dimensions
                </div>
                <p className="text-charcoal">
                  {product.dimensions.width_cm} × {product.dimensions.height_cm} ×{' '}
                  {product.dimensions.depth_cm} cm
                </p>
              </div>
            )}

            <div className="mt-12">
              {isSold ? (
                <a
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-slate-brand text-cream font-medium hover:bg-charcoal transition-colors"
                >
                  Browse available pieces
                </a>
              ) : (
                <WhatsAppCTA piece={product} />
              )}
            </div>

            {product.description && (
              <div className="mt-12 prose prose-sm max-w-none">
                {/* Render richText */}
                {product.description}
              </div>
            )}
          </div>
        </div>
      </div>

      <MorePieces category={product.category} excludeSlug={product.slug} />
    </div>
  )
}
```

- [ ] **Step 2:** Create gallery component
```typescript
// src/app/shop/[slug]/ProductGallery.tsx
'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'

export function ProductGallery({ piece }) {
  const [showBefore, setShowBefore] = useState(false)
  const afterImages = piece.after_images || []
  const beforeImage = piece.before_image

  const currentImage = showBefore ? beforeImage : afterImages[0]

  return (
    <div className="space-y-4">
      <motion.div className="relative aspect-square rounded-[24px] overflow-hidden ring-1 ring-slate-brand/10 bg-slate-brand/5">
        {currentImage && (
          <Image
            src={currentImage.url}
            alt={showBefore ? `${piece.title} before` : piece.title}
            fill
            className={`object-cover transition-all duration-500 ${
              showBefore ? 'saturate-50' : 'saturate-100'
            }`}
            priority
          />
        )}

        <button
          onClick={() => setShowBefore(!showBefore)}
          className="absolute bottom-4 left-4 px-3 py-2 rounded-full bg-slate-brand/80 text-cream text-xs font-medium uppercase tracking-widest hover:bg-slate-brand transition-colors"
        >
          {showBefore ? 'After' : 'Before'}
        </button>
      </motion.div>

      {/* Thumbnail carousel for afterImages */}
      {afterImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto">
          {afterImages.map((img, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-20 h-20 rounded-lg ring-1 ring-slate-brand/10 overflow-hidden cursor-pointer hover:ring-sage transition-all"
              onClick={() => setShowBefore(false)}
            >
              <Image src={img.image.url} alt="" width={80} height={80} className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 3:** Create WhatsApp CTA component
```typescript
// src/components/ui/WhatsAppCTA.tsx
'use client'

import { BRAND } from '@/lib/constants'
import { WhatsappLogo } from '@phosphor-icons/react'

export function WhatsAppCTA({ piece }) {
  const message = `Hi Katinka, I'm interested in ${piece.title} (${piece.piece_type}) — ${process.env.NEXT_PUBLIC_SITE_URL}/shop/${piece.slug}`
  const encoded = encodeURIComponent(message)
  const href = `${BRAND.whatsappHref}?text=${encoded}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-sage text-cream font-medium hover:bg-slate-brand transition-colors"
    >
      <WhatsappLogo size={18} weight="fill" />
      Inquire via WhatsApp
    </a>
  )
}
```

- [ ] **Step 4:** Create related pieces rail
```typescript
// src/app/shop/[slug]/MorePieces.tsx
import { getPayload } from 'payload'
import Link from 'next/link'
import Image from 'next/image'

export async function MorePieces({ category, excludeSlug }) {
  const payload = await getPayload()
  const { docs } = await payload.find({
    collection: 'pieces',
    where: {
      category: { equals: category },
      status: { in: ['available', 'sold'] },
      slug: { not_equals: excludeSlug },
    },
    limit: 3,
  })

  if (docs.length === 0) return null

  return (
    <section className="container-outer py-20">
      <h2 className="font-display text-4xl text-slate-brand mb-10">More from this category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {docs.map((piece) => (
          <Link
            key={piece.id}
            href={`/shop/${piece.slug}`}
            className="group rounded-[20px] overflow-hidden ring-1 ring-slate-brand/10 aspect-[4/5]"
          >
            {piece.after_images?.[0]?.image && (
              <Image
                src={piece.after_images[0].image.url}
                alt={piece.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-brand/60 to-transparent flex items-end p-5">
              <div className="text-cream">
                <div className="font-display text-lg">{piece.title}</div>
                <div className="text-xs uppercase tracking-widest text-cream/75">{piece.piece_type}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 5:** Commit
```bash
git add src/app/shop/\[slug\]/ src/components/ui/WhatsAppCTA.tsx && git commit -m "feat: add product detail page with gallery and WhatsApp CTA"
```

---

### Task 8: Verify end-to-end

- [ ] **Step 1:** Create `.env.local` with your Supabase credentials (copy from `.env.example`)

- [ ] **Step 2:** Start dev server
```bash
npm run dev
```

- [ ] **Step 3:** Migrate Payload schema
```bash
npm run payload migrate
```

- [ ] **Step 4:** Visit http://localhost:3000/admin, create admin user if prompted

- [ ] **Step 5:** Create a test piece:
  - Title: "Test Dresser"
  - Category: colour
  - Price: 5000
  - Upload before + after images
  - Status: available

- [ ] **Step 6:** Visit http://localhost:3000/shop, verify listing appears, filter works

- [ ] **Step 7:** Click the piece, verify detail page loads, before/after toggle works, WhatsApp CTA links correctly

- [ ] **Step 8:** Mark piece as sold, verify ribbon + banner appear

- [ ] **Step 9:** Commit
```bash
git commit -m "chore: verify shop end-to-end" --allow-empty
```

---

## Summary

8 tasks, ~50 steps total. After completion: fully functional Payload CMS–powered shop with `/shop` listing, `/shop/[slug]` detail, WhatsApp inquiries, sold-piece handling, and a polished admin UI at `/admin`.

Next: deploy to Vercel (instructions in separate doc).

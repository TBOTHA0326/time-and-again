// Extract hostname from SUPABASE_URL for next/image remotePatterns.
// SUPABASE_URL is typically https://<project-ref>.supabase.co
const supabaseHostname = process.env.SUPABASE_URL
  ? new URL(process.env.SUPABASE_URL).hostname
  : '*.supabase.co'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      // Supabase Storage — pieces bucket
      {
        protocol: 'https',
        hostname: supabaseHostname,
        pathname: '/storage/v1/object/public/pieces/**',
      },
    ],
  },
}

export default nextConfig

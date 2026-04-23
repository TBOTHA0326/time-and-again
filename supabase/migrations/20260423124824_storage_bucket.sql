-- Create the 'pieces' storage bucket for furniture images
-- public = true allows unauthenticated reads via the Supabase Storage API
-- Payload CMS uses @payloadcms/storage-s3 which connects to Supabase Storage over S3-compatible API

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pieces',
  'pieces',
  true,
  52428800, -- 50 MB per file
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif',
    'image/avif'
  ]
)
ON CONFLICT (id) DO NOTHING;

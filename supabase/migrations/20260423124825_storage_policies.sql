-- RLS policies for the 'pieces' storage bucket
--
-- Policy matrix:
--   PUBLIC  → SELECT (read)        — Next/Image and browser can fetch images without auth
--   AUTHENTICATED → INSERT (write) — Only Payload CMS admin uploads new images
--   AUTHENTICATED → UPDATE         — Only Payload CMS admin replaces/edits existing images
--   AUTHENTICATED → DELETE         — Only Payload CMS admin removes images
--
-- Note: Supabase Storage RLS operates on the storage.objects table.
-- The bucket_id column identifies which bucket the object belongs to.

-- 1. Public read — anyone can view images in the pieces bucket
CREATE POLICY "pieces: public read"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'pieces');

-- 2. Authenticated write — only authenticated users (Payload admin) can upload
CREATE POLICY "pieces: authenticated insert"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'pieces');

-- 3. Authenticated update — only authenticated users can overwrite existing objects
CREATE POLICY "pieces: authenticated update"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (bucket_id = 'pieces')
  WITH CHECK (bucket_id = 'pieces');

-- 4. Authenticated delete — only authenticated users can remove objects
CREATE POLICY "pieces: authenticated delete"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'pieces');

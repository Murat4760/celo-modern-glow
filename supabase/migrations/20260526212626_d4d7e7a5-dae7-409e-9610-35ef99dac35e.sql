DROP POLICY IF EXISTS "Public read menu-images" ON storage.objects;

CREATE POLICY "Public read individual menu-images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'menu-images' AND auth.role() = 'anon' IS NOT NULL AND name IS NOT NULL);

DROP POLICY IF EXISTS "Public read individual menu-images" ON storage.objects;

CREATE POLICY "Read menu-images files"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'menu-images');

CREATE POLICY "Block anon insert menu-images"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (false);

CREATE POLICY "Block anon update menu-images"
ON storage.objects FOR UPDATE
TO anon, authenticated
USING (false);

CREATE POLICY "Block anon delete menu-images"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (false);
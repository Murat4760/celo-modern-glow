UPDATE storage.buckets SET public = false WHERE id = 'menu-images';

DROP POLICY IF EXISTS "Read menu-images files" ON storage.objects;
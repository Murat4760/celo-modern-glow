insert into storage.buckets (id, name, public) values ('menu-images', 'menu-images', true) on conflict (id) do nothing;

create policy "Public read menu-images"
on storage.objects for select
to public
using (bucket_id = 'menu-images');
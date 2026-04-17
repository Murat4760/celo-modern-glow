import { useEffect, useState } from "react";

interface MenuItemCardProps {
  name: string;
  desc: string;
  price: string;
  available: boolean;
  /** Optional explicit image URL (e.g. from a Google Sheet). Takes priority. */
  imageUrl?: string;
  /** English item name used as the Pexels search query. */
  searchName: string;
  notAvailableLabel: string;
}

// Module-level cache: searchName (lowercased) -> resolved URL or null (failed)
const pexelsCache = new Map<string, string | null>();
const inflight = new Map<string, Promise<string | null>>();

const PROJECT_ID = import.meta.env.VITE_SUPABASE_PROJECT_ID as string;
const ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;

async function fetchPexelsImage(query: string): Promise<string | null> {
  const key = query.toLowerCase();
  if (pexelsCache.has(key)) return pexelsCache.get(key)!;
  if (inflight.has(key)) return inflight.get(key)!;

  const promise = (async () => {
    try {
      const url = `https://${PROJECT_ID}.supabase.co/functions/v1/pexels-image?q=${encodeURIComponent(query)}`;
      const res = await fetch(url, {
        headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` },
      });
      if (!res.ok) throw new Error(String(res.status));
      const json = (await res.json()) as { url: string | null };
      pexelsCache.set(key, json.url ?? null);
      return json.url ?? null;
    } catch {
      pexelsCache.set(key, null);
      return null;
    } finally {
      inflight.delete(key);
    }
  })();

  inflight.set(key, promise);
  return promise;
}

const MenuItemCard = ({
  name,
  desc,
  price,
  available,
  imageUrl,
  searchName,
  notAvailableLabel,
}: MenuItemCardProps) => {
  const cacheKey = searchName.toLowerCase();
  const cached = pexelsCache.get(cacheKey);
  const [src, setSrc] = useState<string | null>(
    imageUrl || (cached !== undefined ? cached : null),
  );
  const [failed, setFailed] = useState<boolean>(
    !imageUrl && cached === null,
  );

  useEffect(() => {
    if (imageUrl) {
      setSrc(imageUrl);
      setFailed(false);
      return;
    }
    let cancelled = false;
    fetchPexelsImage(searchName).then((url) => {
      if (cancelled) return;
      if (url) {
        setSrc(url);
        setFailed(false);
      } else {
        setFailed(true);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [imageUrl, searchName]);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  const showImage = !failed && !!src;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-copper/40 ${
        !available ? "opacity-50" : ""
      }`}
    >
      <div className="relative h-48 w-full">
        {showImage ? (
          <img
            src={src!}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="text-4xl font-bold text-copper opacity-40">
              {initials}
            </span>
          </div>
        )}
        {showImage && (
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
        )}
      </div>

      <div className="p-5">
        <div className="mb-1 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">{name}</h3>
          <span className="ml-3 shrink-0 text-lg font-bold text-copper">
            {price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{desc}</p>
        {!available && (
          <span className="mt-2 inline-block rounded-full bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive">
            {notAvailableLabel}
          </span>
        )}
      </div>
    </div>
  );
};

export default MenuItemCard;

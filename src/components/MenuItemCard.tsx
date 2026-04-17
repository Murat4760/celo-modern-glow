import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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

// Module-level cache so re-renders / category switches don't refetch the same dish.
const pexelsCache = new Map<string, string | null>();

const MenuItemCard = ({
  name,
  desc,
  price,
  available,
  imageUrl,
  searchName,
  notAvailableLabel,
}: MenuItemCardProps) => {
  const [src, setSrc] = useState<string | null>(
    imageUrl || pexelsCache.get(searchName.toLowerCase()) || null,
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (imageUrl) return; // explicit image wins
    const key = searchName.toLowerCase();
    if (pexelsCache.has(key)) {
      const cached = pexelsCache.get(key) ?? null;
      setSrc(cached);
      if (!cached) setFailed(true);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        const { data, error } = await supabase.functions.invoke(
          "pexels-image",
          { body: null, method: "GET" } as never,
        ).catch(() => ({ data: null, error: true }));

        // supabase-js doesn't pass query params via invoke nicely; use direct fetch instead
        if (cancelled) return;
        if (error || !data) {
          await fetchViaUrl(key, cancelled);
          return;
        }
      } catch {
        if (!cancelled) await fetchViaUrl(key, cancelled);
      }
    })();

    async function fetchViaUrl(k: string, isCancelled: boolean) {
      try {
        const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const url = `https://${projectId}.supabase.co/functions/v1/pexels-image?q=${encodeURIComponent(searchName)}`;
        const res = await fetch(url, {
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
          },
        });
        if (!res.ok) throw new Error(String(res.status));
        const json = (await res.json()) as { url: string | null };
        if (isCancelled) return;
        pexelsCache.set(k, json.url);
        if (json.url) setSrc(json.url);
        else setFailed(true);
      } catch {
        if (!isCancelled) {
          pexelsCache.set(k, null);
          setFailed(true);
        }
      }
    }

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

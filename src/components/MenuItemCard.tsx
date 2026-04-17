import { useState } from "react";

interface MenuItemCardProps {
  name: string;
  desc: string;
  price: string;
  available: boolean;
  imageUrl: string;
  unsplashUrl: string;
  notAvailableLabel: string;
}

const MenuItemCard = ({
  name,
  desc,
  price,
  available,
  imageUrl,
  unsplashUrl,
  notAvailableLabel,
}: MenuItemCardProps) => {
  // Prefer explicit Sheet image, fall back to Unsplash, then to letter placeholder
  const initialSrc = imageUrl || unsplashUrl;
  const [src, setSrc] = useState<string>(initialSrc);
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-copper/40 ${
        !available ? "opacity-50" : ""
      }`}
    >
      {/* Background image or placeholder */}
      <div className="relative h-48 w-full">
        {!failed ? (
          <img
            src={src}
            alt={name}
            loading="lazy"
            onError={() => {
              // If the explicit image failed and we have an Unsplash fallback, try it
              if (src !== unsplashUrl && unsplashUrl) {
                setSrc(unsplashUrl);
              } else {
                setFailed(true);
              }
            }}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-secondary">
            <span className="text-4xl font-bold text-copper opacity-40">
              {initials}
            </span>
          </div>
        )}
        {/* Dark overlay for readability of any text overlaid on the image */}
        {!failed && (
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

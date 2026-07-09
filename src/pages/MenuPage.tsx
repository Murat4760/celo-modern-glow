import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Search, ImageIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

type CategoryKey =
  | "starters"
  | "mains"
  | "kebabs"
  | "specials"
  | "grills"
  | "bakery";

interface MenuItemView {
  name: string;
  desc: string;
  price: string;
  available: boolean;
  image?: string;
  alt?: string;
  ikram?: readonly string[];
  kcal?: number;
  subheading?: string;
  subheadingImage?: string;
  standardSides?: boolean;
}

const CATEGORY_KEYS: CategoryKey[] = [
  "starters",
  "mains",
  "kebabs",
  "specials",
  "grills",
  "bakery",
];

const STANDARD_SIDES =
  "Salata · Bulgur Pilavı · Soslu Soğan · Çiğköfte · Peynir · Karamelize Soğan · Ayran Aşı";

const MenuPage = () => {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryKey>("starters");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const itemsByCat = useMemo<Record<CategoryKey, MenuItemView[]>>(() => {
    const result = {} as Record<CategoryKey, MenuItemView[]>;
    const raw = t.menuItems as unknown as Record<string, readonly Partial<MenuItemView>[]>;
    for (const key of CATEGORY_KEYS) {
      const list = raw[key] || [];
      result[key] = list.map((i) => ({
        name: i.name ?? "",
        desc: i.desc ?? "",
        price: i.price ?? "",
        image: i.image,
        alt: i.alt,
        ikram: i.ikram,
        kcal: i.kcal,
        subheading: i.subheading,
        subheadingImage: (i as MenuItemView).subheadingImage,
        standardSides: i.standardSides,
        available: true,
      }));
    }
    return result;
  }, [t]);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredItemsByCat = useMemo<Record<CategoryKey, MenuItemView[]>>(() => {
    if (!normalizedQuery) return itemsByCat;
    const result = {} as Record<CategoryKey, MenuItemView[]>;
    for (const key of CATEGORY_KEYS) {
      result[key] = itemsByCat[key].filter(
        (i) =>
          i.name.toLowerCase().includes(normalizedQuery) ||
          i.desc.toLowerCase().includes(normalizedQuery),
      );
    }
    return result;
  }, [itemsByCat, normalizedQuery]);

  const visibleCategories = useMemo(
    () => CATEGORY_KEYS.filter((k) => filteredItemsByCat[k].length > 0),
    [filteredItemsByCat],
  );

  // Scrollspy: highlight active category based on which section is closest to viewport top
  useEffect(() => {
    const handler = () => {
      const stickyOffset = 200;
      let current: CategoryKey = visibleCategories[0] ?? "starters";
      for (const key of visibleCategories) {
        const el = sectionRefs.current[key];
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top - stickyOffset <= 0) current = key;
      }
      setActiveCat(current);
    };
    handler();
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [visibleCategories]);

  const selectCategory = useCallback((key: CategoryKey) => {
    const el = sectionRefs.current[key];
    if (!el) return;
    const stickyOffset = 140;
    const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }, []);

  const searchPlaceholder = lang === "tr" ? "Yemek ara..." : "Search dishes...";
  const emptyMsg = lang === "tr" ? "Sonuç bulunamadı." : "No results found.";
  const askPrice = lang === "tr" ? "fiyat sor" : "ask price";
  const sidesLabel =
    lang === "tr" ? "Standart yan ürünler" : "Standard sides";

  const renderImage = (item: MenuItemView, cat: CategoryKey) => {
    const isFirin = typeof item.image === "string" && item.image.includes("/firin.png");
    const portrait =
      cat === "mains" || cat === "kebabs" || cat === "grills" ||
      item.name.includes("Dürüm") || isFirin;
    const aspectClass = portrait ? "aspect-[3/4]" : "aspect-[4/3]";
    const isPhoto = item.image && item.image.startsWith("/");
    const shiftDown =
      item.name.includes("Süper İkili") || item.name.includes("Patates Tava");
    if (isPhoto) {
      return (
        <img
          src={item.image}
          alt={item.alt || item.name}
          loading="lazy"
          style={shiftDown ? { objectPosition: "center 20%" } : undefined}
          className={`${aspectClass} w-24 shrink-0 rounded-lg object-cover sm:w-28`}
        />
      );
    }
    const caption =
      item.image === "skeleton-soon"
        ? t.menuPage.photoUpdating
        : t.menuPage.photoSoon;
    return (
      <div
        className={`${aspectClass} w-24 shrink-0 rounded-lg bg-muted/60 border border-border/60 flex flex-col items-center justify-center text-center px-1 sm:w-28`}
        aria-label={caption}
      >
        <ImageIcon size={18} className="text-muted-foreground/70 mb-1" />
        <span className="text-[10px] leading-tight text-muted-foreground">
          {caption}
        </span>
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />

      {/* Banner */}
      <section className="px-5 pt-16 pb-10 text-center">
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
          {t.menuPage.label}
        </p>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          {t.menuPage.title}{" "}
          <span className="italic font-light">{t.menuPage.titleItalic}</span>
        </h1>
      </section>

      {/* Sticky scrollspy nav */}
      <section className="sticky top-16 z-20 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="relative flex-1 md:max-w-sm">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                className="w-full rounded-full border border-input bg-card py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-copper focus:outline-none"
              />
            </div>
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
              role="tablist"
              aria-label="Menu categories"
            >
              {(normalizedQuery ? visibleCategories : CATEGORY_KEYS).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={activeCat === key}
                  onClick={() => selectCategory(key)}
                  className={`shrink-0 whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs uppercase tracking-wider min-h-[36px] transition-colors ${
                    activeCat === key
                      ? "border-copper bg-copper-gradient text-accent-foreground"
                      : "border-border bg-card text-muted-foreground hover:border-copper hover:text-foreground"
                  }`}
                >
                  {t.menuPage.categories[key as keyof typeof t.menuPage.categories]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Long-scroll menu */}
      <section className="mx-auto max-w-4xl px-5 py-12">
        {visibleCategories.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{emptyMsg}</p>
        ) : (
          <div className="space-y-16">
            {visibleCategories.map((key) => {
              const items = filteredItemsByCat[key];
              return (
                <section
                  key={key}
                  data-cat={key}
                  ref={(el) => {
                    sectionRefs.current[key] = el;
                  }}
                  className="scroll-mt-40"
                  aria-labelledby={`heading-${key}`}
                >
                  <h2
                    id={`heading-${key}`}
                    className="mb-8 border-b border-border pb-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
                  >
                    {t.menuPage.categories[key as keyof typeof t.menuPage.categories]}
                  </h2>

                  {/* İkram block on every section */}
                  <div className="mb-8 rounded-xl border border-copper/40 bg-copper/10 px-4 py-3">
                    <span className="mb-1 inline-block rounded-full bg-copper-gradient px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-foreground">
                      İkram
                    </span>
                    <p className="text-sm leading-snug text-foreground/90">
                      İçli Köfte · Fındık Lahmacun · Salata · Soğan Salatası ·
                      Ezme · Çiğ Köfte · Peynir
                    </p>
                  </div>


                  <div className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                    {items.map((item, i) => {
                      const isDrink = !item.image || item.image === "";
                      return (
                        <div key={i} className="contents">
                          {item.subheading && (
                            <div className="col-span-full mt-6 mb-2 flex items-center gap-4">
                              {item.subheadingImage && (
                                <img
                                  src={item.subheadingImage}
                                  alt={item.subheading}
                                  loading="lazy"
                                  className="h-28 w-20 shrink-0 rounded-lg object-cover sm:h-32 sm:w-24"
                                />
                              )}
                              <h3 className="text-xl font-semibold tracking-tight text-copper">
                                {item.subheading}
                              </h3>
                            </div>
                          )}
                          <article
                            role="listitem"
                            className={`flex items-start gap-4 border-b border-border/50 py-4 ${
                              !item.available ? "opacity-50" : ""
                            }`}
                          >
                            {!isDrink && renderImage(item, key)}
                            <div className="flex flex-1 flex-col gap-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="text-base font-semibold text-foreground sm:text-lg">
                                  {item.name}
                                </h4>
                                {item.price ? (
                                  <span className="shrink-0 text-base font-semibold text-copper sm:text-lg">
                                    {item.price}
                                  </span>
                                ) : (
                                  <span
                                    className="shrink-0 rounded-full border border-copper/40 bg-copper/10 px-2.5 py-0.5 text-[11px] font-medium uppercase tracking-wider text-copper"
                                    aria-label={askPrice}
                                  >
                                    {askPrice}
                                  </span>
                                )}
                              </div>
                              {item.kcal !== undefined && (
                                <span className="inline-block w-fit rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                                  {item.kcal} kcal
                                </span>
                              )}
                              {item.desc && (
                                <p className="text-xs leading-snug text-muted-foreground sm:text-sm">
                                  {item.desc}
                                </p>
                              )}
                              {item.standardSides && (
                                <p className="text-[11px] leading-snug text-muted-foreground/80">
                                  <span className="font-semibold text-foreground/70">
                                    {sidesLabel}:
                                  </span>{" "}
                                  {STANDARD_SIDES}
                                </p>
                              )}
                            </div>
                          </article>
                        </div>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </section>

      <FooterSection />
    </main>
  );
};

export default MenuPage;

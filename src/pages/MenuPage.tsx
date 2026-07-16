import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ImageIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

type CategoryKey =
  | "starters"
  | "soups"
  | "mains"
  | "grills"
  | "firin"
  | "durum"
  | "tatli"
  | "icecek";

interface MenuItemView {
  name: string;
  nameTranslation?: string;
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
  "soups",
  "mains",
  "grills",
  "firin",
  "durum",
  "tatli",
  "icecek",
];

const MenuPage = () => {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const [activeCat, setActiveCat] = useState<CategoryKey>("starters");
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const itemRefs = useRef<Record<string, HTMLElement | null>>({});

  const itemsByCat = useMemo<Record<CategoryKey, MenuItemView[]>>(() => {
    const result = {} as Record<CategoryKey, MenuItemView[]>;
    const raw = t.menuItems as unknown as Record<string, readonly Partial<MenuItemView>[]>;
    for (const key of CATEGORY_KEYS) {
      const list = raw[key] || [];
      result[key] = list.map((i) => ({
        name: i.name ?? "",
        nameTranslation: (i as MenuItemView).nameTranslation,
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

  const visibleCategories = useMemo(
    () => CATEGORY_KEYS.filter((k) => itemsByCat[k].length > 0),
    [itemsByCat],
  );

  // Deep-link support: /menu?item=<dish name> scrolls to and highlights that item.
  useEffect(() => {
    const target = searchParams.get("item");
    if (!target) return;
    const timeout = setTimeout(() => {
      itemRefs.current[target]?.scrollIntoView({ behavior: "smooth", block: "center" });
      setHighlightedItem(target);
      setTimeout(() => setHighlightedItem(null), 2500);
    }, 100);
    return () => clearTimeout(timeout);
  }, [searchParams, itemsByCat]);

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

  const askPrice = t.menuPage.askPrice;
  const sidesLabel = t.menuPage.sidesLabel;

  const renderImage = (item: MenuItemView, cat: CategoryKey) => {
    const portrait =
      cat === "mains" || cat === "grills" || item.name.includes("Dürüm");
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
        <h1 className="text-6xl font-bold tracking-tight text-copper sm:text-7xl md:text-8xl">
          {t.menuPage.titleItalic}
        </h1>
      </section>

      {/* Sticky scrollspy nav */}
      <section className="sticky top-16 z-20 border-y border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div
              className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
              role="tablist"
              aria-label="Menu categories"
            >
              {CATEGORY_KEYS.map((key) => (
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
        <div className="space-y-16">
            {visibleCategories.map((key) => {
              const items = itemsByCat[key];
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
                            ref={(el) => {
                              itemRefs.current[item.name] = el;
                            }}
                            className={`flex items-start gap-4 rounded-lg border-b border-border/50 py-4 transition-colors duration-500 ${
                              !item.available ? "opacity-50" : ""
                            } ${
                              highlightedItem === item.name
                                ? "bg-copper/10 ring-2 ring-copper"
                                : ""
                            }`}
                          >
                            {!isDrink && renderImage(item, key)}
                            <div className="flex flex-1 flex-col gap-1">
                              <div className="flex items-baseline justify-between gap-3">
                                <h4 className="text-base font-semibold text-foreground sm:text-lg">
                                  {item.name}
                                  {lang !== "tr" &&
                                    item.nameTranslation &&
                                    item.nameTranslation.trim().toLowerCase() !==
                                      item.name.trim().toLowerCase() && (
                                      <span className="font-normal text-muted-foreground">
                                        {" "}
                                        ({item.nameTranslation})
                                      </span>
                                    )}
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
                                  {t.menuPage.standardSides}
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
      </section>

      <FooterSection />
    </main>
  );
};

export default MenuPage;

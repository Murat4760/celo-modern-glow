import { useState, useEffect, useMemo, useCallback } from "react";
import { ChevronDown, Search, ImageIcon } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";


type CategoryKey =
  | "starters"
  | "soups"
  | "oven"
  | "wraps"
  | "kebabs"
  | "specials"
  | "grills"
  | "family"
  | "desserts"
  | "drinks";

interface MenuItemView {
  name: string;
  desc: string;
  price: string;
  available: boolean;
  image?: string;
  alt?: string;
  ikram?: readonly string[];
}

const CATEGORY_KEYS: CategoryKey[] = [
  "starters",
  "soups",
  "oven",
  "wraps",
  "kebabs",
  "specials",
  "grills",
  "family",
  "desserts",
  "drinks",
];

const MenuPage = () => {
  const { t, lang } = useLanguage();
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<CategoryKey>("starters");
  const [openCats, setOpenCats] = useState<Set<CategoryKey>>(new Set(["starters"]));

  // Build item list per category from i18n
  const itemsByCat = useMemo<Record<CategoryKey, MenuItemView[]>>(() => {
    const result = {} as Record<CategoryKey, MenuItemView[]>;
    for (const key of CATEGORY_KEYS) {
      const fallback = t.menuItems[key] as readonly {
        name: string;
        desc: string;
        price: string;
        image?: string;
      }[];
      result[key] = fallback.map((i) => ({ ...i, available: true }));
    }
    return result;
  }, [t]);

  // Search filter
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

  useEffect(() => {
    if (normalizedQuery) {
      setOpenCats(new Set(visibleCategories));
    } else {
      setOpenCats(new Set([activeCat]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [normalizedQuery, activeCat]);

  const selectCategory = useCallback((key: CategoryKey) => {
    setActiveCat(key);
    setOpenCats(new Set([key]));
    requestAnimationFrame(() => {
      const el = document.querySelector<HTMLElement>(`[data-cat="${key}"]`);
      if (!el) return;
      const stickyOffset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - stickyOffset;
      window.scrollTo({ top, behavior: "smooth" });
    });
  }, []);

  const toggleCat = (key: CategoryKey) => {
    if (!openCats.has(key)) {
      selectCategory(key);
      return;
    }
    setOpenCats((prev) => {
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  };

  const searchPlaceholder = lang === "tr" ? "Yemek ara..." : "Search dishes...";
  const emptyMsg = lang === "tr" ? "Sonuç bulunamadı." : "No results found.";

  const renderImage = (item: MenuItemView) => {
    const isPhoto = item.image && item.image.startsWith("/");
    if (isPhoto) {
      return (
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="aspect-[4/3] w-24 shrink-0 rounded-lg object-cover sm:w-28"
        />
      );
    }
    const caption =
      item.image === "skeleton-soon"
        ? t.menuPage.photoUpdating
        : t.menuPage.photoSoon;
    return (
      <div
        className="aspect-[4/3] w-24 shrink-0 rounded-lg bg-muted/60 border border-border/60 flex flex-col items-center justify-center text-center px-1 sm:w-28"
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

      {/* Sticky controls */}
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
                  {t.menuPage.categories[key]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Menu list */}
      <section className="mx-auto max-w-4xl px-5 py-16">
        {visibleCategories.length === 0 ? (
          <p className="py-20 text-center text-muted-foreground">{emptyMsg}</p>
        ) : (
          <div className="space-y-6">
            {visibleCategories.map((key) => {
              const items = filteredItemsByCat[key];
              const isOpen = openCats.has(key);
              const panelId = `cat-panel-${key}`;
              return (
                <div
                  key={key}
                  data-cat={key}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm scroll-mt-40"
                >
                  <button
                    type="button"
                    onClick={() => toggleCat(key)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    className="flex w-full items-center justify-between gap-4 px-6 py-7 text-left transition-colors hover:bg-accent/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper md:px-10 md:py-9 min-h-[64px]"
                  >
                    <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl">
                      {t.menuPage.categories[key]}
                    </span>
                    <span className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="tabular-nums">{items.length}</span>
                      <ChevronDown
                        size={24}
                        className={`transition-transform ${
                          isOpen ? "rotate-180 text-copper" : ""
                        }`}
                      />
                    </span>
                  </button>
                  {isOpen && (
                    <div
                      id={panelId}
                      className="grid gap-x-8 gap-y-1 border-t border-border bg-background/40 px-5 py-6 md:grid-cols-2 md:px-8 md:py-8"
                      role="list"
                      aria-label={`${t.menuPage.categories[key]} menu items`}
                    >
                      {items.map((item, i) => (
                        <article
                          key={i}
                          role="listitem"
                          className={`flex items-center gap-4 border-b border-border/50 py-4 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0 ${
                            !item.available ? "opacity-50" : ""
                          }`}
                        >
                          {renderImage(item)}
                          <div className="flex flex-1 items-baseline justify-between gap-4">
                            <div className="flex-1">
                              <h3 className="text-base font-semibold text-foreground sm:text-lg">
                                {item.name}
                              </h3>
                              {item.desc && (
                                <p className="mt-1 text-sm text-muted-foreground">
                                  {item.desc}
                                </p>
                              )}
                              {!item.available && (
                                <span className="mt-1 inline-block rounded-full bg-destructive/20 px-2 py-0.5 text-xs font-medium text-destructive">
                                  {t.menuPage.notAvailable}
                                </span>
                              )}
                            </div>
                            {item.price && (
                              <span className="shrink-0 text-base font-bold tabular-nums text-copper sm:text-lg">
                                {item.price}
                              </span>
                            )}
                          </div>
                        </article>
                      ))}
                    </div>
                  )}
                </div>
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

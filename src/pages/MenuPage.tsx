import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Skeleton } from "@/components/ui/skeleton";
import Papa from "papaparse";

type CategoryKey =
  | "soups"
  | "kebabs"
  | "pans"
  | "steaks"
  | "oven"
  | "wraps"
  | "desserts"
  | "drinks";

interface SheetRow {
  category: string;
  nameTr: string;
  nameEn: string;
  descTr: string;
  descEn: string;
  price: string;
  available: boolean;
  imageUrl: string;
}

// Map Sheet "Category" cell values to internal keys (Turkish names from the doc)
const CATEGORY_MAP: Record<string, CategoryKey> = {
  Çorbalar: "soups",
  Corbalar: "soups",
  Kebaplar: "kebabs",
  "Tava Çeşitleri": "pans",
  "Tava Cesitleri": "pans",
  Steakler: "steaks",
  "Fırın Çeşitleri": "oven",
  "Firin Cesitleri": "oven",
  Dürümler: "wraps",
  Durumler: "wraps",
  Tatlılar: "desserts",
  Tatlilar: "desserts",
  İçecekler: "drinks",
  Icecekler: "drinks",
};

// Replace SHEET_ID with your actual Google Sheets ID
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv";

const MenuPage = () => {
  const { t, lang } = useLanguage();
  const [active, setActive] = useState<CategoryKey>("kebabs");
  const [sheetData, setSheetData] = useState<SheetRow[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const categoryKeys: CategoryKey[] = [
    "soups",
    "kebabs",
    "pans",
    "steaks",
    "oven",
    "wraps",
    "desserts",
    "drinks",
  ];

  // Fetch from Google Sheets
  useEffect(() => {
    const fetchSheet = async () => {
      try {
        const res = await fetch(SHEET_CSV_URL);
        if (!res.ok) throw new Error("fetch failed");
        const csv = await res.text();
        const parsed = Papa.parse(csv, { header: true, skipEmptyLines: true });
        const rows: SheetRow[] = (parsed.data as Record<string, string>[]).map((r) => ({
          category: r["Category"] || "",
          nameTr: r["Item Name TR"] || "",
          nameEn: r["Item Name EN"] || "",
          descTr: r["Description TR"] || "",
          descEn: r["Description EN"] || "",
          price: r["Price"] || "",
          available: (r["Available"] || "TRUE").toUpperCase() !== "FALSE",
          imageUrl: r["Image URL"] || "",
        }));
        setSheetData(rows);
        setLastUpdated(new Date().toLocaleString(lang === "tr" ? "tr-TR" : "en-US"));
      } catch {
        // Fallback to hardcoded — leave sheetData null
      }
      setLoading(false);
    };
    fetchSheet();
  }, [lang]);

  // Build items for current category
  const items = useMemo(() => {
    if (sheetData) {
      return sheetData
        .filter((r) => CATEGORY_MAP[r.category] === active)
        .map((r) => ({
          name: lang === "tr" ? r.nameTr : r.nameEn,
          nameEn: r.nameEn || r.nameTr,
          desc: lang === "tr" ? r.descTr : r.descEn,
          price: r.price,
          available: r.available,
          imageUrl: r.imageUrl,
        }));
    }
    // Fallback to hardcoded
    return (t.menuItems[active] as readonly { name: string; desc: string; price: string }[]).map(
      (item) => ({ ...item, nameEn: item.name, available: true, imageUrl: "" })
    );
  }, [sheetData, active, lang, t]);


  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />
      <section className="px-5 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
              {t.menuPage.label}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t.menuPage.title}{" "}
              <span className="italic font-light">{t.menuPage.titleItalic}</span>
            </h1>
          </div>


          {/* Category tabs — wrap vertically, no horizontal scroll */}
          <div className="mb-12 flex flex-wrap gap-3 pb-2 justify-center">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full px-5 py-2.5 min-h-[44px] text-sm font-medium uppercase tracking-wider transition-all ${
                  active === key
                    ? "bg-copper-gradient text-accent-foreground"
                    : "border border-copper text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.menuPage.categories[key]}
              </button>
            ))}
          </div>

          {/* Loading skeleton */}
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center justify-between py-5">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                  <Skeleton className="h-5 w-16 ml-6" />
                </div>
              ))}
            </div>
          ) : (
            /* List view */
            <div className="space-y-1">
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`group flex items-baseline justify-between border-b border-border py-5 transition-colors hover:border-copper ${
                    !item.available ? "opacity-50" : ""
                  }`}
                >
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-copper-gradient transition-colors">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    {!item.available && (
                      <span className="mt-1 inline-block rounded-full bg-destructive/20 px-3 py-1 text-xs font-medium text-destructive">
                        {t.menuPage.notAvailable}
                      </span>
                    )}
                  </div>
                  <span className="ml-6 shrink-0 text-lg font-bold text-copper">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Last updated */}
          {lastUpdated && (
            <p className="mt-8 text-center text-xs text-muted-foreground">
              {t.menuPage.lastUpdated}: {lastUpdated}
            </p>
          )}
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default MenuPage;

import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

type CategoryKey = "kebabs" | "pides" | "starters" | "desserts" | "drinks";

const MenuPage = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState<CategoryKey>("kebabs");

  const categoryKeys: CategoryKey[] = ["kebabs", "pides", "starters", "desserts", "drinks"];
  const items = t.menuItems[active];

  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
              {t.menuPage.label}
            </p>
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              {t.menuPage.title}{" "}
              <span className="italic font-light">{t.menuPage.titleItalic}</span>
            </h1>
          </div>

          {/* Category tabs */}
          <div className="mb-12 flex flex-wrap justify-center gap-3">
            {categoryKeys.map((key) => (
              <button
                key={key}
                onClick={() => setActive(key)}
                className={`rounded-full px-5 py-2 text-sm font-medium uppercase tracking-wider transition-all ${
                  active === key
                    ? "bg-copper-gradient text-accent-foreground"
                    : "border border-copper text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.menuPage.categories[key]}
              </button>
            ))}
          </div>

          {/* Menu items */}
          <div className="space-y-1">
            {items.map((item, i) => (
              <div
                key={i}
                className="group flex items-baseline justify-between border-b border-border py-5 transition-colors hover:border-copper"
              >
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-copper-gradient transition-colors">
                    {item.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                </div>
                <span className="ml-6 shrink-0 text-lg font-bold text-copper">
                  {item.price}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default MenuPage;

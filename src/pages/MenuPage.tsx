import { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface MenuItem {
  name: string;
  price: string;
}

interface Category {
  id: string;
  title: string;
  items: MenuItem[];
}

// PLACEHOLDER DATA — swap with real CELO menu later
const CATEGORIES: Category[] = [
  {
    id: "kahvalti",
    title: "Kahvaltı",
    items: [
      { name: "Serpme Kahvaltı", price: "₺——" },
      { name: "Menemen", price: "₺——" },
      { name: "Sucuklu Yumurta", price: "₺——" },
      { name: "Bal-Kaymak", price: "₺——" },
      { name: "Sahanda Yumurta", price: "₺——" },
    ],
  },
  {
    id: "corbalar",
    title: "Çorbalar",
    items: [
      { name: "Mercimek Çorbası", price: "₺——" },
      { name: "Ezogelin", price: "₺——" },
      { name: "İşkembe", price: "₺——" },
      { name: "Yayla", price: "₺——" },
    ],
  },
  {
    id: "baslangiclar",
    title: "Başlangıçlar",
    items: [
      { name: "Humus", price: "₺——" },
      { name: "Haydari", price: "₺——" },
      { name: "Sigara Böreği", price: "₺——" },
      { name: "Atom", price: "₺——" },
      { name: "Acılı Ezme", price: "₺——" },
    ],
  },
  {
    id: "ana",
    title: "Ana Yemekler",
    items: [
      { name: "Adana Kebap", price: "₺——" },
      { name: "Urfa Kebap", price: "₺——" },
      { name: "Tavuk Şiş", price: "₺——" },
      { name: "Karışık Izgara", price: "₺——" },
      { name: "İskender", price: "₺——" },
    ],
  },
  {
    id: "pideler",
    title: "Pideler",
    items: [
      { name: "Kıymalı Pide", price: "₺——" },
      { name: "Kaşarlı Pide", price: "₺——" },
      { name: "Kuşbaşılı Pide", price: "₺——" },
      { name: "Karışık Pide", price: "₺——" },
    ],
  },
  {
    id: "tatlilar",
    title: "Tatlılar",
    items: [
      { name: "Künefe", price: "₺——" },
      { name: "Baklava", price: "₺——" },
      { name: "Sütlaç", price: "₺——" },
      { name: "Kazandibi", price: "₺——" },
    ],
  },
  {
    id: "icecekler",
    title: "İçecekler",
    items: [
      { name: "Ayran", price: "₺——" },
      { name: "Şalgam", price: "₺——" },
      { name: "Türk Kahvesi", price: "₺——" },
      { name: "Çay", price: "₺——" },
      { name: "Limonata", price: "₺——" },
    ],
  },
];

const NAV_OFFSET = 80; // fixed navbar height + small breathing room

const MenuPage = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState<string>(CATEGORIES[0].id);
  const headerRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const lastScrollY = useRef<number>(typeof window !== "undefined" ? window.scrollY : 0);
  const advanceLocked = useRef<boolean>(false);
  const programmaticScroll = useRef<boolean>(false);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const scrollHeaderIntoView = useCallback((id: string) => {
    const el = headerRefs.current[id];
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
    programmaticScroll.current = true;
    window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" });
    window.setTimeout(() => {
      programmaticScroll.current = false;
    }, 700);
  }, [prefersReducedMotion]);

  // Reset advance lock whenever the open category changes
  useEffect(() => {
    advanceLocked.current = false;
  }, [open]);

  // Track scroll direction
  useEffect(() => {
    const onScroll = () => {
      lastScrollY.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver on sentinel for auto-progression
  useEffect(() => {
    if (prefersReducedMotion) return;
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const currentIdx = CATEGORIES.findIndex((c) => c.id === open);
    if (currentIdx === -1 || currentIdx >= CATEGORIES.length - 1) return;

    let prevY = window.scrollY;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const currentY = window.scrollY;
        const goingDown = currentY > prevY;
        prevY = currentY;

        if (programmaticScroll.current) return;
        if (advanceLocked.current) return;
        if (!entry.isIntersecting) return;
        if (entry.intersectionRatio < 0.99) return;
        if (!goingDown) return;

        const nextId = CATEGORIES[currentIdx + 1]?.id;
        if (!nextId) return;
        advanceLocked.current = true;
        setOpen(nextId);
        // Wait a tick for accordion state to settle, then scroll
        window.setTimeout(() => scrollHeaderIntoView(nextId), 60);
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [open, prefersReducedMotion, scrollHeaderIntoView]);

  const handleValueChange = (value: string) => {
    // Radix passes "" when collapsing the open item
    setOpen(value);
    if (value) {
      // user-initiated open → scroll header just under nav
      window.setTimeout(() => scrollHeaderIntoView(value), 60);
    }
  };

  return (
    <main className="min-h-screen bg-background pt-20">
      <Navbar />
      <section className="px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
              {t.menuPage.label}
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              {t.menuPage.title}{" "}
              <span className="italic font-light">{t.menuPage.titleItalic}</span>
            </h1>
          </div>

          <Accordion
            type="single"
            collapsible
            value={open}
            onValueChange={handleValueChange}
            className="w-full"
          >
            {CATEGORIES.map((cat) => {
              const isOpen = open === cat.id;
              return (
                <AccordionItem
                  key={cat.id}
                  value={cat.id}
                  className="border-b border-border"
                >
                  <div
                    ref={(el) => (headerRefs.current[cat.id] = el)}
                    className="scroll-mt-24"
                  >
                    <AccordionTrigger
                      className={`min-h-[64px] py-6 text-left hover:no-underline ${
                        prefersReducedMotion ? "[&[data-state=open]>svg]:rotate-180" : ""
                      }`}
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                          {cat.title}
                        </span>
                        <span className="text-sm font-medium uppercase tracking-wider text-copper">
                          · {cat.items.length}
                        </span>
                      </span>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent
                    className={
                      prefersReducedMotion
                        ? "!animate-none data-[state=closed]:!animate-none data-[state=open]:!animate-none"
                        : ""
                    }
                  >
                    <ul className="space-y-1 pb-4">
                      {cat.items.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-baseline justify-between border-b border-border/50 py-4 last:border-b-0"
                        >
                          <span className="text-base font-medium text-foreground sm:text-lg">
                            {item.name}
                          </span>
                          <span className="ml-6 shrink-0 text-base font-bold text-copper sm:text-lg">
                            {item.price}
                          </span>
                        </li>
                      ))}
                    </ul>
                    {isOpen && (
                      <div
                        ref={sentinelRef}
                        aria-hidden="true"
                        className="h-px w-full"
                      />
                    )}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </section>
      <FooterSection />
    </main>
  );
};

export default MenuPage;

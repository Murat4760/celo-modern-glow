import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ChefRecommendations = () => {
  const { t } = useLanguage();
  const { ref, visible } = useScrollAnimation();

  const allMenuItems = Object.values(
    t.menuItems as unknown as Record<string, readonly { name: string; price: string }[]>
  ).flat();
  const priceFor = (name: string) =>
    allMenuItems.find((item) => item.name === name)?.price ?? "";

  return (
    <section id="menu" className="relative py-24 px-5">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.chef.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.chef.title} <span className="italic font-light">{t.chef.titleItalic}</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {t.chef.dishes.map((dish, i) => (
            <Link
              to="/menu"
              key={dish.name}
              className={`relative rounded-2xl border border-copper/40 bg-card p-6 transition-all duration-700 hover:border-copper ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: visible ? `${i * 150}ms` : "0ms" }}
            >
              <div className="mb-4">
                <span className="bg-copper-gradient rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                  {dish.tag}
                </span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-xl font-semibold">{dish.name}</h3>
                <span className="text-lg font-bold text-copper">{priceFor(dish.name)}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {dish.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefRecommendations;

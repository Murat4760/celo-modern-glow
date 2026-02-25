import zirhKebab from "@/assets/zirh-kebab.jpg";
import pide from "@/assets/pide.jpg";
import baklava from "@/assets/baklava.jpg";
import { useLanguage } from "@/i18n/LanguageContext";

const images = [zirhKebab, pide, baklava];
const prices = ["₺450", "₺280", "₺180"];

const ChefRecommendations = () => {
  const { t } = useLanguage();

  return (
    <section id="menu" className="relative py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.chef.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.chef.title} <span className="italic font-light">{t.chef.titleItalic}</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {t.chef.dishes.map((dish, i) => (
            <div
              key={dish.name}
              className="group relative overflow-hidden rounded-2xl border border-copper bg-card transition-all duration-500 hover:glow-copper"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={images[i]}
                  alt={dish.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-copper-gradient rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent-foreground">
                    {dish.tag}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xl font-semibold">{dish.name}</h3>
                  <span className="text-lg font-bold text-copper">{prices[i]}</span>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {dish.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChefRecommendations;

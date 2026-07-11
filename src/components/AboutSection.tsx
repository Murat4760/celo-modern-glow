import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const IMG_ABOUT_INTERIOR = "/about/celo-interior.jpg";
const IMG_ABOUT_EXTERIOR = "/about/celo-exterior.jpg";

const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, visible } = useScrollAnimation();

  const numericValues = [1979, 3, 100];

  return (
    <section id="about" className="relative py-24 px-5">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div
          className={`mx-auto max-w-4xl text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.about.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.about.title}{" "}
            <span className="italic font-light">{t.about.titleItalic}</span>
          </h2>
        </div>

        <div
          className={`mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="order-2 space-y-6 md:order-1">
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t.about.text}
            </p>
            {t.about.quotes.map((quote) => (
              <blockquote
                key={quote.name}
                className="border-l-2 border-copper/60 pl-5 text-sm italic leading-relaxed text-muted-foreground"
              >
                <p>&ldquo;{quote.text}&rdquo;</p>
                <footer className="mt-2 text-xs font-semibold not-italic uppercase tracking-wider text-copper">
                  — {quote.name}
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="order-1 grid grid-cols-2 gap-4 md:order-2">
            <img
              src={IMG_ABOUT_INTERIOR}
              alt={t.about.title}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-2xl border border-border object-cover"
            />
            <img
              src={IMG_ABOUT_EXTERIOR}
              alt={t.about.titleItalic}
              loading="lazy"
              className="aspect-[3/4] w-full rounded-2xl border border-border object-cover md:mt-8"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 text-center sm:grid-cols-3">
          {t.about.stats.map((stat, i) => (
            <StatItem
              key={stat.label}
              label={stat.label}
              value={stat.value}
              numEnd={numericValues[i]}
              visible={visible}
              delay={i * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

function StatItem({
  label,
  value,
  numEnd,
  visible,
  delay,
}: {
  label: string;
  value: string;
  numEnd: number;
  visible: boolean;
  delay: number;
}) {
  const count = useCountUp(numEnd, visible);
  // Extract suffix from value (e.g. "6+" → "+", "1200°" → "°", "100%" → "%")
  const suffix = value.replace(/[\d]/g, "");

  return (
    <div
      className={`space-y-2 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      <p className="text-copper-gradient text-4xl font-bold">
        {count}
        {suffix}
      </p>
      <p className="text-sm uppercase tracking-wider text-muted-foreground">{label}</p>
    </div>
  );
}

export default AboutSection;

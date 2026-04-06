import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollAnimation, useCountUp } from "@/hooks/useScrollAnimation";

const AboutSection = () => {
  const { t } = useLanguage();
  const { ref, visible } = useScrollAnimation();

  const numericValues = [6, 1200, 100];

  return (
    <section id="about" className="relative py-24 px-5">
      <div className="mx-auto max-w-4xl text-center" ref={ref}>
        <div
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.about.label}
          </p>
          <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            {t.about.title}{" "}
            <span className="italic font-light">{t.about.titleItalic}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t.about.text}
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-3">
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

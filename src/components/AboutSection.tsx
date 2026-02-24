import { useLanguage } from "@/i18n/LanguageContext";

const AboutSection = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="mx-auto max-w-4xl text-center">
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

        <div className="mt-16 grid gap-8 sm:grid-cols-3">
          {t.about.stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-copper-gradient text-4xl font-bold">{stat.value}</p>
              <p className="text-sm uppercase tracking-wider text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

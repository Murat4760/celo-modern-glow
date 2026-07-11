import { Link } from "react-router-dom";
import OpenStatus from "./OpenStatus";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/40 via-background to-background" />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-copper">
          {t.hero.subtitle}
        </p>
        <img
          src="/logo.png"
          alt="CELO Restaurant"
          className="mb-6 h-40 w-auto sm:h-48 md:h-56 lg:h-64"
        />
        <p className="mb-8 max-w-md text-base sm:text-lg text-muted-foreground">
          {t.hero.tagline}
        </p>
        <div className="mb-8">
          <OpenStatus />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Link
            to="/menu"
            className="bg-copper-gradient flex h-11 items-center rounded-full px-8 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:opacity-90"
          >
            {t.hero.viewMenu}
          </Link>
          <a
            href="#about"
            className="flex h-11 items-center rounded-full border border-copper px-8 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-secondary"
          >
            {t.hero.ourStory}
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-12 w-px bg-copper-gradient opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;

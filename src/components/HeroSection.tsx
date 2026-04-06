import heroImage from "@/assets/hero-kebab.jpg";
import OpenStatus from "./OpenStatus";
import ReservationModal from "./ReservationModal";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Signature kebabs at CELO Restaurant"
          className="h-full w-full object-cover"
        />
        <div className="overlay-dark absolute inset-0" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-copper">
          {t.hero.subtitle}
        </p>
        <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-7xl lg:text-9xl">
          <span className="text-copper-gradient">CELO</span>
          <br />
          <span className="text-cream font-light italic">Restaurant</span>
        </h1>
        <p className="mb-8 max-w-md text-base sm:text-lg text-muted-foreground">
          {t.hero.tagline}
        </p>
        <div className="mb-8">
          <OpenStatus />
        </div>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#menu"
            className="bg-copper-gradient flex h-11 items-center rounded-full px-8 text-sm font-semibold uppercase tracking-wider text-accent-foreground transition-all hover:opacity-90"
          >
            {t.hero.viewMenu}
          </a>
          <a
            href="#about"
            className="flex h-11 items-center rounded-full border border-copper px-8 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-secondary"
          >
            {t.hero.ourStory}
          </a>
          <ReservationModal>
            <button className="flex h-11 items-center rounded-full border border-copper px-8 text-sm font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-secondary">
              {t.reservation.cta}
            </button>
          </ReservationModal>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <div className="h-12 w-px bg-copper-gradient opacity-50" />
      </div>
    </section>
  );
};

export default HeroSection;

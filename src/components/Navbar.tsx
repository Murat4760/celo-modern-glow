import { useLanguage } from "@/i18n/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Navbar = () => {
  const { t } = useLanguage();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-background/60 border-b border-copper/20">
      <a href="#" className="text-copper-gradient text-xl font-bold font-display">
        CELO
      </a>
      <div className="hidden items-center gap-8 sm:flex">
        <a href="#menu" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t.nav.menu}
        </a>
        <a href="/menu" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t.menuPage.label}
        </a>
        <a href="#about" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t.nav.about}
        </a>
        <a href="#contact" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
          {t.nav.contact}
        </a>
      </div>
      <LanguageSwitcher />
    </nav>
  );
};

export default Navbar;

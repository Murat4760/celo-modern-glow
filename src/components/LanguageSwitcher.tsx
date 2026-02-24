import { useLanguage } from "@/i18n/LanguageContext";

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="inline-flex items-center overflow-hidden rounded-full border border-copper bg-secondary">
      <button
        onClick={() => setLang("en")}
        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
          lang === "en"
            ? "bg-copper-gradient text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLang("tr")}
        className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all ${
          lang === "tr"
            ? "bg-copper-gradient text-accent-foreground"
            : "text-muted-foreground hover:text-foreground"
        }`}
      >
        TR
      </button>
    </div>
  );
};

export default LanguageSwitcher;

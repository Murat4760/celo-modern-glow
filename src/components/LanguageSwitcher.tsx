import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/translations";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Globe } from "lucide-react";

const LANGUAGES: { code: Language; label: string; flag: string; native: string }[] = [
  { code: "tr", label: "TR", flag: "🇹🇷", native: "Türkçe" },
  { code: "en", label: "EN", flag: "🇬🇧", native: "English" },
  { code: "ar", label: "AR", flag: "🇸🇦", native: "العربية" },
  { code: "ru", label: "RU", flag: "🇷🇺", native: "Русский" },
  { code: "ja", label: "JA", flag: "🇯🇵", native: "日本語" },
  { code: "zh", label: "ZH", flag: "🇨🇳", native: "中文" },
  { code: "it", label: "IT", flag: "🇮🇹", native: "Italiano" },
];

const LanguageSwitcher = () => {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const current = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-label="Select language"
          className="inline-flex items-center gap-2 rounded-full border border-copper bg-secondary px-3 py-2 text-xs font-semibold uppercase tracking-wider text-foreground transition-all hover:bg-copper/10"
        >
          <Globe className="h-3.5 w-3.5 text-copper" />
          <span className="text-base leading-none">{current.flag}</span>
          <span>{current.label}</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        sideOffset={8}
        className="w-[260px] border-copper/40 bg-secondary p-2"
      >
        <div className="grid grid-cols-2 gap-2">
          {LANGUAGES.map((l) => {
            const active = l.code === lang;
            return (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left transition-all ${
                  active
                    ? "border-copper bg-copper-gradient text-accent-foreground"
                    : "border-copper/30 bg-background/40 text-foreground hover:border-copper hover:bg-copper/10"
                }`}
              >
                <span className="text-lg leading-none">{l.flag}</span>
                <span className="flex flex-col leading-tight">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-80">
                    {l.label}
                  </span>
                  <span className="text-xs font-medium">{l.native}</span>
                </span>
              </button>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageSwitcher;

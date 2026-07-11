import { useLanguage } from "@/i18n/LanguageContext";

const FooterSection = () => {
  const { t } = useLanguage();

  return (
    <footer className="border-t border-copper py-16 px-5">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 grid-cols-1 sm:grid-cols-3">
          <div>
            <img src="/logo.png" alt="CELO Restaurant" className="mb-4 h-12 w-auto" />
            <p className="text-sm leading-relaxed text-muted-foreground">{t.footer.tagline}</p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.hoursLabel}
            </h4>
            <p className="text-sm text-muted-foreground">
              {t.footer.everyDay}
              <br />
              11:30 – 03:00
              <br />
              {t.contact.hoursMonday}
            </p>
          </div>
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t.footer.contactLabel}
            </h4>
            <p className="text-sm text-muted-foreground">
              +90 530 171 34 52
              <br />
              Kavaklı, Oğuzhan Cd. No:22
              <br />
              34520 Beylikdüzü/İstanbul
            </p>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} CELO Restaurant. {t.footer.rights}
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;

import { useLanguage } from "@/i18n/LanguageContext";
import { MapPin, Clock, Phone, Mail, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ContactSection = () => {
  const { t } = useLanguage();
  const { ref, visible } = useScrollAnimation();

  const items = [
    { icon: MapPin, label: t.contact.addressLabel, value: t.contact.address },
    { icon: Clock, label: t.contact.hoursLabel, value: `${t.contact.hours}\n${t.contact.hoursDetail}\n${t.contact.hoursMonday}` },
    { icon: Phone, label: t.contact.phoneLabel, value: t.contact.phone },
    { icon: Star, label: "Google", value: t.contact.rating },
  ];

  return (
    <section id="contact" className="relative py-24 px-5">
      <div className="mx-auto max-w-6xl" ref={ref}>
        <div
          className={`mb-16 text-center transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-copper">
            {t.contact.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {t.contact.title}{" "}
            <span className="italic font-light">{t.contact.titleItalic}</span>
          </h2>
        </div>

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center gap-4 rounded-2xl border border-copper bg-card p-6 sm:p-8 text-center transition-all hover:glow-copper"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-copper-gradient">
                <item.icon className="h-5 w-5 text-accent-foreground" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                {item.label}
              </h3>
              <p className="whitespace-pre-line text-sm leading-relaxed text-muted-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 overflow-hidden rounded-2xl border border-copper glow-copper">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3011.5!2d28.6564357!3d40.9802695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b55f4db400989f%3A0xb8c2b44a5cd1e62a!2sCELO%20RESTAURANT!5e0!3m2!1str!2str!4v1"
            width="100%"
            height="350"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="CELO Restaurant location"
          />
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

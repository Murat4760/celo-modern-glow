import { useLanguage } from "@/i18n/LanguageContext";
import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const { lang } = useLanguage();
  const message =
    lang === "tr"
      ? "Merhaba, rezervasyon yapmak istiyorum."
      : "Hello, I'd like to make a reservation.";
  const url = `https://wa.me/905301713452?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
    >
      <span className="absolute inset-0 animate-ping rounded-full opacity-30" style={{ backgroundColor: "#25D366" }} />
      <MessageCircle className="relative h-7 w-7 text-white" fill="white" />
    </a>
  );
};

export default WhatsAppButton;

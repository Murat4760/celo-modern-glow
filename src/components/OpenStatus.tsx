import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const OpenStatus = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [h, setH] = useState(0);
  const [m, setM] = useState(0);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Open every day 11:30–03:00 (overnight).
      const openTime = 11 * 60 + 30; // 11:30
      const closeTime = 3 * 60; // 03:00 (overnight, next day)

      const open = currentMinutes >= openTime || currentMinutes < closeTime;
      setIsOpen(open);

      let minsLeft: number;
      if (open) {
        minsLeft = currentMinutes >= openTime
          ? (24 * 60 - currentMinutes) + closeTime
          : closeTime - currentMinutes;
      } else {
        minsLeft = openTime - currentMinutes;
      }
      setH(Math.floor(minsLeft / 60));
      setM(minsLeft % 60);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const timeLabel = isOpen ? t.status.closesIn : t.status.opensIn;

  return (
    <div className="inline-flex items-center gap-3 rounded-full border border-copper bg-secondary px-5 py-2.5">
      <span className="relative flex h-3 w-3">
        <span
          className={`absolute inline-flex h-full w-full animate-pulse-glow rounded-full ${
            isOpen ? "bg-green-500" : "bg-red-500"
          } opacity-75`}
        />
        <span
          className={`relative inline-flex h-3 w-3 rounded-full ${
            isOpen ? "bg-green-400" : "bg-red-400"
          }`}
        />
      </span>
      <span className="text-sm font-medium tracking-wide text-foreground">
        {isOpen ? t.status.open : t.status.closed}{" "}
        <span className="text-muted-foreground">· {timeLabel} {h}{t.status.hourShort} {m}{t.status.minShort}</span>
      </span>
    </div>
  );
};

export default OpenStatus;

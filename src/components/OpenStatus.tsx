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
      const day = now.getDay(); // 0=Sun
      const currentMinutes = now.getHours() * 60 + now.getMinutes();

      // Day-specific hours from Google Maps data
      // Mon (1): 11:30–22:30, Sat (6): 11:00–02:00, Others: 11:30–02:00
      const isMonday = day === 1;
      const isSaturday = day === 6;

      const openTime = isSaturday ? 11 * 60 : 11 * 60 + 30; // 11:00 or 11:30
      const closeTime = isMonday ? 22 * 60 + 30 : 2 * 60; // 22:30 or 02:00

      let open: boolean;
      if (isMonday) {
        // Monday: simple range, no overnight
        open = currentMinutes >= openTime && currentMinutes < closeTime;
      } else {
        // Overnight: open from openTime to next day 2:00
        open = currentMinutes >= openTime || currentMinutes < closeTime;
      }
      setIsOpen(open);

      let minsLeft: number;
      if (open) {
        if (isMonday) {
          minsLeft = closeTime - currentMinutes;
        } else {
          minsLeft = currentMinutes >= openTime
            ? (24 * 60 - currentMinutes) + closeTime
            : closeTime - currentMinutes;
        }
      } else {
        if (currentMinutes >= openTime) {
          // After close on Monday, next day opens at 11:30
          minsLeft = (24 * 60 - currentMinutes) + 11 * 60 + 30;
        } else {
          minsLeft = openTime - currentMinutes;
        }
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
        <span className="text-muted-foreground">· {timeLabel} {h}h {m}m</span>
      </span>
    </div>
  );
};

export default OpenStatus;

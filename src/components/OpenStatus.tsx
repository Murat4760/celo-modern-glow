import { useEffect, useState } from "react";

const OpenStatus = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeUntil, setTimeUntil] = useState("");

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const currentMinutes = hours * 60 + minutes;

      // Open: 11:30 (690) to 2:00 AM next day (1560 = 26*60)
      // So open from 690 to 1440 (midnight) OR 0 to 120
      const openTime = 11 * 60 + 30; // 690
      const closeTime = 2 * 60; // 120

      const open = currentMinutes >= openTime || currentMinutes < closeTime;
      setIsOpen(open);

      if (open) {
        // Time until close (2:00 AM)
        let minsLeft: number;
        if (currentMinutes >= openTime) {
          minsLeft = (24 * 60 - currentMinutes) + closeTime;
        } else {
          minsLeft = closeTime - currentMinutes;
        }
        const h = Math.floor(minsLeft / 60);
        const m = minsLeft % 60;
        setTimeUntil(`Closes in ${h}h ${m}m`);
      } else {
        const minsLeft = openTime - currentMinutes;
        const h = Math.floor(minsLeft / 60);
        const m = minsLeft % 60;
        setTimeUntil(`Opens in ${h}h ${m}m`);
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

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
        {isOpen ? "Open Now" : "Closed"}{" "}
        <span className="text-muted-foreground">· {timeUntil}</span>
      </span>
    </div>
  );
};

export default OpenStatus;

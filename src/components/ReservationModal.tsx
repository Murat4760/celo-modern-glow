import { useState, useMemo } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// All possible slots: 11:30 → 01:00 in 30-min intervals
const ALL_SLOTS: string[] = [];
for (let h = 11; h <= 24; h++) {
  for (const m of [0, 30]) {
    if (h === 11 && m === 0) continue;
    const displayH = h === 24 ? 0 : h;
    ALL_SLOTS.push(`${String(displayH).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
}
ALL_SLOTS.push("01:00");

const partySizes = Array.from({ length: 20 }, (_, i) => String(i + 1)).concat(["20+"]);

function isSunday(d: Date) {
  return d.getDay() === 0;
}

/** Convert slot string to minutes since midnight (handles 00:xx and 01:00 as next-day) */
function slotToMinutes(slot: string): number {
  const [h, m] = slot.split(":").map(Number);
  // 00:00, 00:30, 01:00 are after midnight → treat as 24+h
  if (h < 2) return (24 + h) * 60 + m;
  return h * 60 + m;
}

const ReservationModal = ({ children }: { children: React.ReactNode }) => {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date>();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [time, setTime] = useState("");
  const [party, setParty] = useState("");

  const tr = lang === "tr";

  const isSelectedSunday = date ? isSunday(date) : false;

  const isToday = useMemo(() => {
    if (!date) return false;
    const now = new Date();
    return (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === now.getDate()
    );
  }, [date]);

  const { availableSlots, allSlotsPassed } = useMemo(() => {
    if (!isToday) return { availableSlots: ALL_SLOTS, allSlotsPassed: false };
    const now = new Date();
    let nowMinutes = now.getHours() * 60 + now.getMinutes();
    // If it's between midnight and 2am, treat as 24+ for comparison
    if (now.getHours() < 2) nowMinutes += 24 * 60;
    const filtered = ALL_SLOTS.filter((s) => slotToMinutes(s) > nowMinutes);
    return { availableSlots: filtered, allSlotsPassed: filtered.length === 0 };
  }, [isToday, date]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !date || !time || !party) return;
    setLoading(true);

    // Format date in Turkish locale: e.g. "18 Nisan 2026 Cumartesi"
    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık",
    ];
    const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    const formattedDate = `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()} ${days[date.getDay()]}`;

    const message =
      `Merhaba CELO Restaurant 👋\n\n` +
      `Ad: ${name}\n` +
      `Tarih: ${formattedDate}\n` +
      `Saat: ${time}\n` +
      `Kişi Sayısı: ${party}\n` +
      `Telefon: ${phone}\n\n` +
      `Rezervasyon talebi iletiyorum, onayınızı bekliyorum.`;

    const url = `https://wa.me/905301713452?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setLoading(false);
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setName("");
    setPhone("");
    setDate(undefined);
    setTime("");
    setParty("");
  };

  // Clear time if date changes and current time is no longer valid
  const handleDateSelect = (d: Date | undefined) => {
    setDate(d);
    setTime("");
  };

  const sundayMessage = tr
    ? "Pazar günleri kapalıyız"
    : "We are closed on Sundays";
  const noSlotsMessage = tr
    ? "Bugün rezervasyon saatleri doldu"
    : "No more reservations available today";

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="border-copper bg-card sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {tr ? "Rezervasyon Yap" : "Reserve a Table"}
          </DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-foreground">
              {tr ? "Rezervasyonunuz alındı!" : "Your reservation has been received!"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {tr ? "En kısa sürede sizi arayacağız." : "We'll call you shortly to confirm."}
            </p>
            <Button
              onClick={() => setOpen(false)}
              className="mt-6 bg-copper-gradient text-accent-foreground"
            >
              {tr ? "Kapat" : "Close"}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              required
              placeholder={tr ? "Adınız" : "Your Name"}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="min-h-[44px] border-copper bg-background"
            />
            <Input
              required
              type="tel"
              placeholder={tr ? "Telefon" : "Phone"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="min-h-[44px] border-copper bg-background"
            />

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full min-h-[44px] justify-start border-copper bg-background text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy") : tr ? "Tarih Seçin" : "Pick a Date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-copper bg-card" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            {/* Sunday message */}
            {isSelectedSunday && (
              <p className="text-sm font-medium text-destructive text-center py-2">
                {sundayMessage}
              </p>
            )}

            {/* All slots passed message */}
            {!isSelectedSunday && isToday && allSlotsPassed && (
              <p className="text-sm font-medium text-destructive text-center py-2">
                {noSlotsMessage}
              </p>
            )}

            {/* Time dropdown - hidden on Sunday or when no slots */}
            {!isSelectedSunday && !(isToday && allSlotsPassed) && (
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger className="min-h-[44px] border-copper bg-background">
                  <SelectValue placeholder={tr ? "Saat Seçin" : "Select Time"} />
                </SelectTrigger>
                <SelectContent className="border-copper bg-card">
                  {availableSlots.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            <Select value={party} onValueChange={setParty} required>
              <SelectTrigger className="min-h-[44px] border-copper bg-background">
                <SelectValue placeholder={tr ? "Kişi Sayısı" : "Party Size"} />
              </SelectTrigger>
              <SelectContent className="border-copper bg-card">
                {partySizes.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s} {tr ? "Kişi" : s === "1" ? "Guest" : "Guests"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="submit"
              disabled={loading || isSelectedSunday || (isToday && allSlotsPassed)}
              className="w-full min-h-[44px] bg-copper-gradient text-accent-foreground font-semibold uppercase tracking-wider"
            >
              {loading ? "..." : tr ? "Rezervasyon Yap" : "Reserve Now"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

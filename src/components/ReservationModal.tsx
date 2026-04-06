import { useState } from "react";
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

const timeSlots: string[] = [];
for (let h = 11; h <= 24; h++) {
  for (const m of [0, 30]) {
    const hour = h === 24 ? 0 : h > 24 ? h - 24 : h;
    if (h === 11 && m === 0) continue; // start at 11:30
    if (h > 25) break;
    timeSlots.push(`${String(hour).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
  }
}
// add 01:00
timeSlots.push("01:00");

const partySizes = Array.from({ length: 20 }, (_, i) => String(i + 1)).concat(["20+"]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Replace this URL with your actual Formspree endpoint
      // e.g. https://formspree.io/f/YOUR_FORM_ID
      await fetch("https://formspree.io/f/REPLACE_WITH_FORMSPREE_ID", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          date: date ? format(date, "yyyy-MM-dd") : "",
          time,
          partySize: party,
        }),
      });
    } catch {
      // silently handle
    }
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
              {tr
                ? "Rezervasyonunuz alındı!"
                : "Your reservation has been received!"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {tr
                ? "En kısa sürede sizi arayacağız."
                : "We'll call you shortly to confirm."}
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
                  {date ? format(date, "dd/MM/yyyy") : (tr ? "Tarih Seçin" : "Pick a Date")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-copper bg-card" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>

            <Select value={time} onValueChange={setTime} required>
              <SelectTrigger className="min-h-[44px] border-copper bg-background">
                <SelectValue placeholder={tr ? "Saat Seçin" : "Select Time"} />
              </SelectTrigger>
              <SelectContent className="border-copper bg-card">
                {timeSlots.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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
              disabled={loading}
              className="w-full min-h-[44px] bg-copper-gradient text-accent-foreground font-semibold uppercase tracking-wider"
            >
              {loading
                ? "..."
                : tr
                ? "Rezervasyon Yap"
                : "Reserve Now"}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ReservationModal;

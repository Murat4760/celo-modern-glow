import { Phone } from "lucide-react";

const CallButton = () => {
  return (
    <a
      href="tel:+905301713452"
      aria-label="Call"
      className="fixed bottom-24 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#16a34a" }}
    >
      <Phone className="relative h-7 w-7 text-white" fill="white" />
    </a>
  );
};

export default CallButton;

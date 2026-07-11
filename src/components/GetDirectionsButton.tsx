import { MapPin } from "lucide-react";

const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=" +
  encodeURIComponent("CELO Restaurant, Kavaklı, Oğuzhan Cd. No:22, 34520 Beylikdüzü/İstanbul");

const GetDirectionsButton = () => {
  return (
    <a
      href={DIRECTIONS_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Get Directions"
      className="fixed bottom-[168px] right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-110"
      style={{ backgroundColor: "#2563eb" }}
    >
      <MapPin className="relative h-7 w-7 text-white" fill="white" />
    </a>
  );
};

export default GetDirectionsButton;

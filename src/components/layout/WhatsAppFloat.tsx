import { site } from "@/config/site";
import { MessageCircle } from "lucide-react";

export function WhatsAppFloat() {
  const href = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
    "Hi! I'd like to book a vehicle.",
  )}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full text-white shadow-elegant transition-smooth hover:scale-110"
      style={{ backgroundColor: "#25D366" }}
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

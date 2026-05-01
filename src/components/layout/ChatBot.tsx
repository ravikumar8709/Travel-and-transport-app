import { useState, useRef, useEffect } from "react";
import { Bot, Send, X } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

type Msg = { from: "bot" | "user"; text: string; cta?: { label: string; to: string } };

const FAQ: { match: RegExp; reply: string; cta?: { label: string; to: string } }[] = [
  { match: /price|cost|fare|rate|charge/i, reply: "Pricing depends on distance and vehicle type. Get an instant quote on the booking form — no obligation.", cta: { label: "Get a quote", to: "/book" } },
  { match: /book|reserve|hire/i, reply: "You can book in under a minute. Tap below to open the booking form.", cta: { label: "Book now", to: "/book" } },
  { match: /airport/i, reply: "Yes — we offer 24/7 airport pickups & drops with flight tracking and 60 min free wait.", cta: { label: "Book airport cab", to: "/book" } },
  { match: /truck|goods|transport|cargo|shift/i, reply: "We move goods from 750 kg up to 16 tonne. Pick a vehicle on the Fleet page.", cta: { label: "See fleet", to: "/fleet" } },
  { match: /hour|open|time|24/i, reply: `We operate ${site.hours}.` },
  { match: /contact|phone|call|whatsapp/i, reply: `Call us at ${site.phone} or message on WhatsApp anytime.` },
  { match: /area|city|location|where/i, reply: "We serve all major metro areas and offer outstation trips across the country." },
];

function reply(input: string): Msg {
  for (const item of FAQ) if (item.match.test(input)) return { from: "bot", text: item.reply, cta: item.cta };
  return { from: "bot", text: "I can help with bookings, pricing, vehicles, and contact info. What do you need?", cta: { label: "Open booking form", to: "/book" } };
}

export function ChatBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { from: "bot", text: `Hi! 👋 I'm the ${site.name} assistant. Ask me about bookings, pricing, or vehicles.` },
  ]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setMsgs((m) => [...m, { from: "user", text }, reply(text)]);
    setInput("");
  };

  return (
    <>
      <button
        aria-label="Open chat"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-elegant transition-smooth hover:scale-110"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <div
        className={cn(
          "fixed bottom-24 left-5 z-50 w-[min(360px,calc(100vw-2.5rem))] origin-bottom-left overflow-hidden rounded-2xl border border-border bg-card shadow-elegant transition-all",
          open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <div className="flex items-center gap-2 bg-gradient-primary p-3 text-primary-foreground">
          <Bot className="h-5 w-5" />
          <div>
            <p className="text-sm font-semibold">Quick Help</p>
            <p className="text-xs opacity-80">Replies instantly</p>
          </div>
        </div>
        <div className="max-h-80 space-y-2 overflow-y-auto p-3">
          {msgs.map((m, i) => (
            <div key={i} className={cn("flex flex-col gap-1", m.from === "user" ? "items-end" : "items-start")}>
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                  m.from === "user"
                    ? "rounded-br-sm bg-primary text-primary-foreground"
                    : "rounded-bl-sm bg-secondary text-foreground",
                )}
              >
                {m.text}
              </div>
              {m.cta && (
                <Link
                  to={m.cta.to}
                  className="text-xs font-medium text-primary underline-offset-2 hover:underline"
                >
                  {m.cta.label} →
                </Link>
              )}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-center gap-2 border-t border-border p-2"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
          />
          <Button type="submit" size="icon" className="bg-primary text-primary-foreground">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </>
  );
}

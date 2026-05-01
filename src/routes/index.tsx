import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Truck, Phone, ShieldCheck, Clock, MapPin, Star, BadgeCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { testimonials } from "@/data/testimonials";
import kaladhar from "../assets/kaladhar.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${site.name} — Reliable Travel & Transport Services` },
      { name: "description", content: site.description },
      { property: "og:title", content: `${site.name} — Reliable Travel & Transport` },
      { property: "og:description", content: site.description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#0b1f4a] via-[#122868] to-[#1a3a8c] text-white overflow-hidden">
        {/* subtle dot grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* trust badge – top right */}
        <div className="absolute right-4 top-4 z-10 hidden sm:flex flex-col items-center rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center backdrop-blur-sm">
          <ShieldCheck className="h-6 w-6 text-yellow-400" />
          <p className="mt-1 text-xs font-semibold leading-tight text-white/90">
            भरोसेमंद सेवा,
            <br />
            हर सफर के लिए
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 items-stretch md:min-h-[600px]">
          {/* Left – copy */}
          <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-20 pt-14 pb-12">
            {/* company badge */}
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest backdrop-blur-sm">
              <Car className="h-3.5 w-3.5 text-yellow-400" />
              {site.name} — Travels &amp; Transport
            </span>

            {/* Hindi headline */}
            <h1 className="mt-5 font-display leading-tight font-extrabold text-4xl sm:text-5xl lg:text-6xl text-balance">
              आपकी यात्रा और
              <br />
              आपका भरोसा,
              <br />
              <span className="text-yellow-400">हमारी ज़िम्मेदारी</span>
            </h1>

            {/* Hindi sub-copy */}
            <p className="mt-4 text-sm sm:text-base text-white/75 max-w-sm leading-relaxed">
              शहर के अंदर हो या बाहर, सफर हो या सामान,
              <br />
              हम पहुंचाते हैं सुरक्षित और समय पर।
            </p>

            {/* stats row */}
            <div className="mt-6 flex flex-wrap gap-6">
              {[
                { icon: <ShieldCheck className="h-5 w-5" />, label: "सत्यापित और\nअनुभवी ड्राइवर" },
                { icon: <Car className="h-5 w-5" />, label: "बिना छिपी फीस\nसस्ती यात्रा" },
                { icon: <span className="text-base font-bold">₹</span>, label: "पारदर्शी\nकिराया" },
                { icon: <Clock className="h-5 w-5" />, label: "24/7\nसहायता" },
              ].map(({ icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1 text-center">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-white/10 border border-white/20 text-yellow-400">
                    {icon}
                  </div>
                  <p className="text-[10px] leading-tight text-white/70 whitespace-pre-line">{label}</p>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-white text-[#0b1f4a] font-bold hover:bg-white/90 shadow-lg"
              >
                <a href={`tel:${site.phoneRaw}`}>
                  <Phone className="mr-2 h-4 w-4" /> अभी कॉल करें
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                className="rounded-full border border-white/30 bg-white/10 text-white font-semibold backdrop-blur-sm hover:bg-white/20"
              >
                <Link to="/book">
                  <span className="mr-2">📅</span> बुक करें
                </Link>
              </Button>
            </div>
          </div>

          {/* Right – hero image full bleed to bottom */}
          <div className="block w-full md:block">
            <img
              src={kaladhar}
              alt="TransitGo driver with vehicles"
              className="w-full object-cover object-top"
              style={{ display: "block", width: "100%", height: "100%", minHeight: "300px", objectFit: "cover", objectPosition: "top" }}
            />
          </div>
        </div>

      </section>

      {/* ── Why us ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">हमारे बारे में</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">हर सफर के लिए एक भरोसेमंद साथी</h2>
          <p className="mt-4 text-muted-foreground">
            {site.name} — शहरी यात्रा से लेकर लंबे सफर और माल ढुलाई तक, हम हर काम में समय पर, सुरक्षित और पारदर्शी सेवा देते हैं।
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { Icon: ShieldCheck, title: "सत्यापित ड्राइवर", text: "बैकग्राउंड चेक और प्रशिक्षित ड्राइवर हर यात्रा पर।" },
            { Icon: Clock, title: "समय पर हमेशा", text: "हर बुकिंग की रियल-टाइम ट्रैकिंग — देरी नहीं, बहाना नहीं।" },
            { Icon: MapPin, title: "व्यापक कवरेज", text: "शहर, आउटस्टेशन और पैन-इंडिया ट्रांसपोर्ट — एक टीम, एक ऐप।" },
          ].map(({ Icon, title, text }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Services highlight ─────────────────────────────────── */}
      <section className="bg-secondary/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">हमारी सेवाएं</p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">अपनी जरूरत चुनें</h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <ServiceHighlight
              icon={<Car className="h-6 w-6" />}
              title="यात्री परिवहन"
              text="व्यक्तिगत और समूह यात्रा के लिए लोकल, आउटस्टेशन और एयरपोर्ट ट्रांसफर।"
              bullets={["लोकल और घंटे के हिसाब से", "आउटस्टेशन वन-वे / राउंड-ट्रिप", "एयरपोर्ट पिकअप और ड्रॉप"]}
              cta="कैब बुक करें"
              image="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=900&q=80"
            />
            <ServiceHighlight
              icon={<Truck className="h-6 w-6" />}
              title="माल परिवहन"
              text="शिफ्टिंग, रिटेल सप्लाई और औद्योगिक कार्गो के लिए मिनी, मीडियम और हेवी ट्रक।"
              bullets={["हल्का (1.5T तक)", "मीडियम (1.5T–7T)", "हेवी (7T+)"]}
              cta="ट्रक बुक करें"
              image="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=900&q=80"
            />
          </div>
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">ग्राहक क्या कहते हैं</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">हर सफर पर भरोसा</h2>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex gap-0.5 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < t.rating ? "fill-current" : ""}`} />
                ))}
              </div>
              <blockquote className="mt-3 text-sm text-foreground">"{t.text}"</blockquote>
              <figcaption className="mt-4 text-sm">
                <div className="font-semibold">{t.name}</div>
                <div className="text-muted-foreground">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── CTA band ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b1f4a] to-[#1a3a8c] p-10 text-white shadow-elegant md:p-14">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                यात्रा करें या माल भेजें — हम तैयार हैं!
              </h2>
              <p className="mt-2 max-w-2xl text-white/80">
                एक मिनट में बुक करें। मुफ्त कोट पाएं, कोई बाध्यता नहीं।
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-yellow-400 text-[#0b1f4a] font-bold hover:bg-yellow-300"
              >
                <Link to="/book">अभी बुक करें</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
              >
                <a href={`tel:${site.phoneRaw}`}>
                  <Phone className="mr-2 h-4 w-4" /> कॉल करें
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Service highlight card ────────────────────────────────────
function ServiceHighlight({
  icon,
  title,
  text,
  bullets,
  cta,
  image,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  bullets: string[];
  cta: string;
  image: string;
}) {
  return (
    <div className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card-soft transition-all hover:-translate-y-1 hover:shadow-elegant">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          {icon} {title}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-display text-xl font-bold">{title}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{text}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <BadgeCheck className="h-4 w-4 text-primary" />
              {b}
            </li>
          ))}
        </ul>
        <Button
          asChild
          className="mt-5 bg-gradient-to-r from-[#0b1f4a] to-[#1a3a8c] text-white hover:opacity-95"
        >
          <Link to="/book">
            {cta} <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

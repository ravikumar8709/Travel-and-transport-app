import { createFileRoute } from "@tanstack/react-router";
import { ShieldCheck, Clock, Award, Heart } from "lucide-react";
import { site } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — TransitGo Travels" },
      { name: "description", content: "Learn about TransitGo Travels: our mission, values, and the team behind safe, reliable travel and transport services." },
      { property: "og:title", content: "About TransitGo Travels" },
      { property: "og:description", content: "Reliable people behind reliable journeys." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">About {site.name}</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            We started with one simple idea: make booking a vehicle — for people or goods — as easy as ordering food online.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2">
        <img
          src="https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80"
          alt="Our team"
          className="h-full w-full rounded-3xl object-cover shadow-elegant"
        />
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Our story</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Built for everyday journeys</h2>
          <p className="mt-4 text-muted-foreground">
            From a single cab in 2023 to a fleet of 120+ vehicles today, we've earned the trust of thousands of riders and businesses. Every booking is handled by a real human, every driver is verified, and every vehicle is regularly serviced.
          </p>
          <p className="mt-3 text-muted-foreground">
            Whether you need a quick airport drop, a weekend road trip, or a heavy truck for industrial cargo, we're the partner you can count on.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-4">
          {[
            { Icon: ShieldCheck, title: "Safety first", text: "Verified drivers, insured trips, sanitised vehicles." },
            { Icon: Clock, title: "Always on time", text: "We respect your schedule. Period." },
            { Icon: Award, title: "Fair pricing", text: "No hidden charges. What we quote is what you pay." },
            { Icon: Heart, title: "Customer-first", text: "24/7 human support — never a chatbot wall." },
          ].map(({ Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 shadow-card-soft">
              <Icon className="h-7 w-7 text-primary" />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

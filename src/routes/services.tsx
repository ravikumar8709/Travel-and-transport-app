import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Car, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Cab Booking & Goods Transport | TransitGo Travels" },
      { name: "description", content: "Local cabs, outstation rides, airport transfers and light/medium/heavy goods trucks. Book any service in under a minute." },
      { property: "og:title", content: "Our Services — TransitGo Travels" },
      { property: "og:description", content: "Passenger travel and goods transport with transparent pricing." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const travel = services.filter((s) => s.category === "travel");
  const transport = services.filter((s) => s.category === "transport");

  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Our Services</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Everything you need to travel or transport — under one roof.
          </p>
        </div>
      </section>

      <Section icon={<Car className="h-5 w-5" />} title="Passenger Travel" subtitle="Comfortable rides for every occasion">
        <Grid items={travel} />
      </Section>

      <Section icon={<Truck className="h-5 w-5" />} title="Goods Transport" subtitle="Move anything, anywhere">
        <Grid items={transport} />
      </Section>
    </>
  );
}

function Section({ icon, title, subtitle, children }: { icon: React.ReactNode; title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">{icon}</span>
        <div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Grid({ items }: { items: typeof services }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {items.map((s) => {
        const Icon = s.icon;
        return (
          <div key={s.id} className="group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card-soft transition-smooth hover:-translate-y-1 hover:border-primary/30 hover:shadow-elegant">
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-primary text-primary-foreground shadow-elegant">
              <Icon className="h-6 w-6" />
            </span>
            <h3 className="mt-4 font-display text-lg font-bold">{s.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{s.description}</p>
            <ul className="mt-4 space-y-1 text-sm text-foreground/80">
              {s.features.map((f) => <li key={f}>• {f}</li>)}
            </ul>
            <Button asChild className="mt-6 self-start bg-gradient-primary text-primary-foreground">
              <Link to="/book" search={{ service: s.category, vehicle: s.title } as any}>
                Book this <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        );
      })}
    </div>
  );
}

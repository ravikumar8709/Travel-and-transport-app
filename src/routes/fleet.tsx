import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Users, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fleet } from "@/data/fleet";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fleet")({
  head: () => ({
    meta: [
      { title: "Fleet — Cars, SUVs & Trucks | TransitGo Travels" },
      { name: "description", content: "Browse our well-maintained fleet of hatchbacks, sedans, SUVs, mini-buses, and light/medium/heavy goods trucks." },
      { property: "og:title", content: "Our Vehicle — TransitGo Travels" },
      { property: "og:description", content: "Vehicles for every passenger and cargo need." },
    ],
  }),
  component: FleetPage,
});

const filters = [
  { id: "all", label: "All Vehicles" },
  { id: "cab", label: "Cabs" },
  { id: "truck", label: "Trucks" },
] as const;

function FleetPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]["id"]>("all");
  const items = filter === "all" ? fleet : fleet.filter((v) => v.type === filter);

  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Our Vehicles</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            हर तरह की यात्रा के लिए आधुनिक, साफ-सुथरी और नियमित रूप से सर्विस की गई गाड़ियां।
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-smooth",
                filter === f.id
                  ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                  : "border-border bg-card hover:border-primary/40",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {items.map((v) => (
            <article key={v.id} className="group overflow-hidden rounded-2xl border border-border bg-card shadow-card-soft transition-smooth hover:-translate-y-1 hover:shadow-elegant">
              <div className="relative h-44 overflow-hidden bg-secondary">
                <img src={v.image} alt={v.name} loading="lazy" className="h-full w-full object-cover transition-smooth group-hover:scale-105" />
                <span className={cn(
                  "absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold",
                  v.type === "cab" ? "bg-primary text-primary-foreground" : "bg-accent text-accent-foreground",
                )}>
                  {v.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-bold">{v.name}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  {v.type === "cab" ? <Users className="h-4 w-4" /> : <Package className="h-4 w-4" />}
                  {v.capacity}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {v.features.map((f) => (
                    <li key={f} className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">{f}</li>
                  ))}
                </ul>
                <Button asChild className="mt-4 w-full bg-gradient-primary text-primary-foreground">
                  <Link to="/book" search={{ vehicle: v.name, service: v.type === "cab" ? "travel" : "transport" } as any}>
                    Book Now <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

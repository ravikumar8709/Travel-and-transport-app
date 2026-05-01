import { Link, useLocation } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Menu, X, Phone, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/fleet", label: "Vehicle" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-smooth",
        scrolled
          ? "bg-background/85 backdrop-blur border-b border-border shadow-card-soft"
          : "bg-background/60 backdrop-blur",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground shadow-elegant">
            <Truck className="h-5 w-5" />
          </span>
          <span className="text-foreground">{site.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-smooth hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "text-primary bg-secondary" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={`tel:${site.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-smooth hover:text-primary"
          >
            <Phone className="h-4 w-4" /> {site.phone}
          </a>
          <Button asChild className="bg-gradient-primary text-primary-foreground shadow-elegant hover:opacity-95">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <button
          aria-label="Toggle menu"
          className="grid h-10 w-10 place-items-center rounded-md border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground transition-smooth hover:bg-secondary"
                activeProps={{ className: "text-primary bg-secondary" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            ))}
            <a
              href={`tel:${site.phoneRaw}`}
              className="mt-2 inline-flex items-center gap-2 rounded-md border border-border px-3 py-3 text-base font-medium"
            >
              <Phone className="h-4 w-4" /> Call {site.phone}
            </a>
            <Button asChild className="mt-2 bg-gradient-primary text-primary-foreground">
              <Link to="/book">Book Now</Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}

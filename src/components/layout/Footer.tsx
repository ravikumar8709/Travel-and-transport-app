import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube, MapPin, Phone, Mail, Truck } from "lucide-react";
import { site } from "@/config/site";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 font-display text-lg font-bold">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-primary text-primary-foreground">
              <Truck className="h-5 w-5" />
            </span>
            {site.name}
          </Link>
          <p className="mt-3 text-sm text-muted-foreground">{site.description}</p>
          <div className="mt-4 flex gap-3">
            {[
              { href: site.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: site.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: site.social.twitter, Icon: Twitter, label: "Twitter" },
              { href: site.social.youtube, Icon: Youtube, label: "YouTube" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background transition-smooth hover:border-primary hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><Link to="/services" className="hover:text-primary">Services</Link></li>
            <li><Link to="/fleet" className="hover:text-primary">Our Vehicles</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Services</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link to="/services" className="hover:text-primary">Local Cabs</Link></li>
            <li><Link to="/services" className="hover:text-primary">Outstation</Link></li>
            <li><Link to="/services" className="hover:text-primary">Airport Transfer</Link></li>
            <li><Link to="/services" className="hover:text-primary">Goods Transport</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wide text-foreground">Get in touch</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{site.address}</li>
            <li><a href={`tel:${site.phoneRaw}`} className="flex items-center gap-2 hover:text-primary"><Phone className="h-4 w-4 text-primary" /> {site.phone}</a></li>
            <li><a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-primary"><Mail className="h-4 w-4 text-primary" /> {site.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-muted-foreground sm:flex-row sm:px-6">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Built for reliable journeys.</p>
        </div>
      </div>
    </footer>
  );
}

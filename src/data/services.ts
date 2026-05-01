import { Car, Plane, MapPin, Truck, Package, Boxes, type LucideIcon } from "lucide-react";

export type ServiceItem = {
  id: string;
  category: "travel" | "transport";
  title: string;
  description: string;
  icon: LucideIcon;
  features: string[];
};

export const services: ServiceItem[] = [
  {
    id: "local-cab",
    category: "travel",
    title: "Local Cab",
    description: "Hourly and point-to-point rides within the city. Clean cars, courteous drivers, fair fares.",
    icon: Car,
    features: ["Hourly packages", "AC sedans & SUVs", "Doorstep pickup"],
  },
  {
    id: "outstation",
    category: "travel",
    title: "Outstation Trips",
    description: "Comfortable one-way and round-trip rides to nearby cities and weekend getaways.",
    icon: MapPin,
    features: ["One-way & round-trip", "Multiple stops", "Experienced drivers"],
  },
  {
    id: "airport",
    category: "travel",
    title: "Airport Transfer",
    description: "On-time pickups and drops with flight tracking and a 60-minute free wait.",
    icon: Plane,
    features: ["Flight tracking", "Meet & greet", "24/7 availability"],
  },
  {
    id: "light-truck",
    category: "transport",
    title: "Light Goods (up to 1.5T)",
    description: "Mini-trucks and pickups for home shifting, e-commerce delivery, and small loads.",
    icon: Package,
    features: ["Tata Ace, Bolero", "Same-day booking", "Loaders on request"],
  },
  {
    id: "medium-truck",
    category: "transport",
    title: "Medium Goods (1.5T – 7T)",
    description: "Reliable medium trucks for office shifting, retail supply, and inter-city transport.",
    icon: Truck,
    features: ["Eicher, Tata 407", "GPS tracked", "Insured cargo"],
  },
  {
    id: "heavy-truck",
    category: "transport",
    title: "Heavy Goods (7T+)",
    description: "Heavy-duty trucks and trailers for industrial cargo and long-haul transport.",
    icon: Boxes,
    features: ["Ashok Leyland, BharatBenz", "Fleet contracts", "Pan-India delivery"],
  },
];

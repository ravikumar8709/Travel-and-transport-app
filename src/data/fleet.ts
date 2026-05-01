export type Vehicle = {
  id: string;
  name: string;
  type: "cab" | "truck";
  category: string;
  capacity: string;
  image: string;
  features: string[];
};

export const fleet: Vehicle[] = [
  {
    id: "tata-punch",
    name: "Tata Punch",
    type: "cab",
    category: "Hatchback",
    capacity: "4 passengers",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "2 bags", "Fuel efficient"],
  },
  {
    id: "swift-dzire",
    name: "Maruti Swift Dzire",
    type: "cab",
    category: "Sedan",
    capacity: "4 passengers",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "3 bags", "Comfort ride"],
  },
  {
    id: "innova",
    name: "Toyota Innova Crysta",
    type: "cab",
    category: "SUV",
    capacity: "6+1 passengers",
    image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "5 bags", "Outstation ready"],
  },
  {
    id: "tempo-traveller",
    name: "Force Tempo Traveller",
    type: "cab",
    category: "Mini-bus",
    capacity: "12+1 passengers",
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=800&q=80",
    features: ["AC", "Group travel", "Pushback seats"],
  },
  {
    id: "tata-ace",
    name: "Tata Ace Mini Truck",
    type: "truck",
    category: "Light",
    capacity: "Up to 750 kg",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80",
    features: ["City delivery", "Same-day", "Loader available"],
  },
  {
    id: "bolero-pickup",
    name: "Mahindra Bolero Pickup",
    type: "truck",
    category: "Light",
    capacity: "Up to 1.5 tonne",
    image: "https://images.unsplash.com/photo-1519440788831-78b1cebff7e8?auto=format&fit=crop&w=800&q=80",
    features: ["Open body", "Reliable", "Inter-city"],
  },
  {
    id: "eicher-14",
    name: "Eicher 14ft",
    type: "truck",
    category: "Medium",
    capacity: "Up to 4 tonne",
    image: "https://images.unsplash.com/photo-1586191582056-b7f0b9b1c4d8?auto=format&fit=crop&w=800&q=80",
    features: ["Closed body", "GPS tracked", "Office shifting"],
  },
  {
    id: "ashok-leyland",
    name: "Ashok Leyland 1616",
    type: "truck",
    category: "Heavy",
    capacity: "Up to 16 tonne",
    image: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80&sat=-20",
    features: ["Long-haul", "Insured cargo", "Pan-India"],
  },
];

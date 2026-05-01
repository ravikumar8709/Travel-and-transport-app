import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CalendarIcon, CheckCircle2, Loader2, Send, Phone, MessageCircle } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import { fleet } from "@/data/fleet";
import { api, saveLocalBooking } from "@/lib/api";
import { site } from "@/config/site";
import { cn } from "@/lib/utils";

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  phone: z.string().trim().regex(/^[+0-9 ()-]{7,20}$/, "Enter a valid phone number"),
  serviceType: z.enum(["travel", "transport"]),
  pickup: z.string().trim().min(2, "Pickup is required").max(200),
  drop: z.string().trim().min(2, "Drop location is required").max(200),
  date: z.date({ required_error: "Pick a date" }),
  vehicleType: z.string().min(1, "Choose a vehicle"),
});
type BookingValues = z.infer<typeof bookingSchema>;

type Search = { service?: "travel" | "transport"; vehicle?: string };

export const Route = createFileRoute("/book")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    service: s.service === "transport" ? "transport" : s.service === "travel" ? "travel" : undefined,
    vehicle: typeof s.vehicle === "string" ? s.vehicle : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Book / Get a Quote — TransitGo Travels" },
      { name: "description", content: "Book a cab or truck in under a minute. Free, no-obligation quotes for travel and goods transport." },
      { property: "og:title", content: "Book a vehicle — TransitGo Travels" },
      { property: "og:description", content: "Instant booking for cabs and trucks." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const search = Route.useSearch();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ id: string } | null>(null);

  const {
    register, handleSubmit, watch, setValue, reset,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      serviceType: search.service ?? "travel",
      vehicleType: search.vehicle ?? "",
    },
  });

  const serviceType = watch("serviceType");
  const date = watch("date");
  const vehicleType = watch("vehicleType");

  const vehicleOptions = useMemo(() => {
    return fleet.filter((v) => (serviceType === "travel" ? v.type === "cab" : v.type === "truck"));
  }, [serviceType]);

  const onSubmit = async (values: BookingValues) => {
    setSubmitting(true);
    try {
      const payload = { ...values, date: values.date.toISOString() };
      let result: { id: string };
      try {
        result = await api.createBooking(payload);
      } catch {
        result = saveLocalBooking(payload);
      }
      setSuccess(result);
      reset();
      toast.success("Booking received!");
    } catch (e: any) {
      toast.error(e.message || "Failed to submit booking");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-hero py-14 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Book or Get a Quote</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            हमें बताएं आपको कहाँ, कब और क्या चाहिए — बाकी सब हम संभाल लेंगे। इसमें एक मिनट से भी कम समय लगेगा।
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card-soft sm:p-8">
            {success ? (
              <div className="flex flex-col items-center rounded-2xl bg-success/10 p-8 text-center">
                <CheckCircle2 className="h-14 w-14 text-success" />
                <h2 className="mt-4 font-display text-2xl font-bold">Booking confirmed!</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Your reference is <span className="font-mono font-semibold text-foreground">{success.id}</span>
                </p>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  हम आपकी जानकारी की पुष्टि के लिए कॉल करेंगे। तुरंत बुकिंग के लिए सीधे कॉल करें।
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild className="bg-gradient-primary text-primary-foreground"><a href={`tel:${site.phoneRaw}`}><Phone className="mr-2 h-4 w-4" /> Call now</a></Button>
                  <Button variant="outline" onClick={() => setSuccess(null)}>New booking</Button>
                  <Button asChild variant="ghost"><Link to="/">Back to home</Link></Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <Label>Service Type</Label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(["travel", "transport"] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => { setValue("serviceType", opt); setValue("vehicleType", ""); }}
                        className={cn(
                          "rounded-xl border px-4 py-3 text-sm font-medium capitalize transition-smooth",
                          serviceType === opt
                            ? "border-primary bg-primary text-primary-foreground shadow-elegant"
                            : "border-border bg-card hover:border-primary/40",
                        )}
                      >
                        {opt === "travel" ? "🚖 Passenger Travel" : "🚚 Goods Transport"}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" {...register("name")} placeholder="Your name" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="phone">Phone number</Label>
                  <Input id="phone" type="tel" {...register("phone")} placeholder="+91 98xxxxxxxx" />
                  {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p>}
                </div>

                <div>
                  <Label htmlFor="pickup">Pickup location</Label>
                  <Input id="pickup" {...register("pickup")} placeholder="e.g. MG Road, Bengaluru" />
                  {errors.pickup && <p className="mt-1 text-xs text-destructive">{errors.pickup.message}</p>}
                </div>
                <div>
                  <Label htmlFor="drop">Drop location</Label>
                  <Input id="drop" {...register("drop")} placeholder="e.g. Airport / Mysore" />
                  {errors.drop && <p className="mt-1 text-xs text-destructive">{errors.drop.message}</p>}
                </div>

                <div>
                  <Label>Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button type="button" variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(d) => d && setValue("date", d, { shouldValidate: true })}
                        disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  {errors.date && <p className="mt-1 text-xs text-destructive">{errors.date.message as string}</p>}
                </div>

                <div>
                  <Label>Vehicle</Label>
                  <Select value={vehicleType} onValueChange={(v) => setValue("vehicleType", v, { shouldValidate: true })}>
                    <SelectTrigger><SelectValue placeholder={`Select a ${serviceType === "travel" ? "cab" : "truck"}`} /></SelectTrigger>
                    <SelectContent>
                      {vehicleOptions.map((v) => (
                        <SelectItem key={v.id} value={v.name}>{v.name} — {v.capacity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.vehicleType && <p className="mt-1 text-xs text-destructive">{errors.vehicleType.message}</p>}
                </div>

                <Button type="submit" disabled={submitting} className="sm:col-span-2 bg-gradient-primary text-primary-foreground">
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...</> : <><Send className="mr-2 h-4 w-4" /> Book / Get Quote</>}
                </Button>
                <p className="sm:col-span-2 text-center text-xs text-muted-foreground">By submitting, you agree to be contacted regarding your booking. No spam.</p>
              </form>
            )}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
            <h3 className="font-semibold">Need help right now?</h3>
            <p className="mt-1 text-sm text-muted-foreground">Talk to a real person 24/7.</p>
            <div className="mt-4 grid gap-2">
              <Button asChild className="w-full bg-gradient-primary text-primary-foreground"><a href={`tel:${site.phoneRaw}`}><Phone className="mr-2 h-4 w-4" /> {site.phone}</a></Button>
              <Button asChild variant="outline" className="w-full"><a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer"><MessageCircle className="mr-2 h-4 w-4" /> WhatsApp</a></Button>
            </div>
          </div>
          <div className="rounded-2xl bg-gradient-primary p-5 text-primary-foreground shadow-elegant">
            <h3 className="font-display text-lg font-bold">Why book with us?</h3>
            <ul className="mt-3 space-y-1.5 text-sm text-white/90">
              <li>✓ Transparent, no-surprise pricing</li>
              <li>✓ Verified, courteous drivers</li>
              <li>✓ Real-time updates on every trip</li>
              <li>✓ Free cancellation up to 1 hour</li>
            </ul>
          </div>
        </aside>
      </section>
    </>
  );
}

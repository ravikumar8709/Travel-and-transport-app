import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Loader2, Send, CheckCircle2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { site } from "@/config/site";
import { api, saveLocalContact } from "@/lib/api";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — TransitGo Travels" },
      { name: "description", content: "Get in touch with TransitGo Travels. Call, WhatsApp, email, or send us a message — we reply within an hour." },
      { property: "og:title", content: "Contact TransitGo Travels" },
      { property: "og:description", content: "We're available 24/7 — call, WhatsApp, or email anytime." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Name is required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(1000),
});
type FormValues = z.infer<typeof schema>;

function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (values: FormValues) => {
    setSubmitting(true);
    try {
      try {
        await api.createContact(values);
      } catch {
        saveLocalContact(values);
      }
      setDone(true);
      reset();
      toast.success("Message sent! We'll get back to you shortly.");
    } catch (e: any) {
      toast.error(e.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h1 className="font-display text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Questions, bookings, or feedback — we're listening.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
          <ContactCard Icon={Phone} title="Call us" value={site.phone} href={`tel:${site.phoneRaw}`} subtitle={site.hours} />
          <ContactCard Icon={MessageCircle} title="WhatsApp" value="Chat instantly" href={`https://wa.me/${site.whatsapp}`} subtitle="Replies in minutes" />
          <ContactCard Icon={Mail} title="Email" value={site.email} href={`mailto:${site.email}`} subtitle="We reply within an hour" />
          <ContactCard Icon={MapPin} title="Visit us" value={site.address} subtitle="" />
        </div>

        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card-soft sm:p-8">
            <h2 className="font-display text-2xl font-bold">Send a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll respond as soon as we can.</p>

            {done ? (
              <div className="mt-8 flex flex-col items-center rounded-2xl bg-success/10 p-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-success" />
                <h3 className="mt-3 text-xl font-semibold">Thanks — message sent!</h3>
                <p className="mt-1 text-sm text-muted-foreground">A team member will get back to you shortly.</p>
                <Button className="mt-6" onClick={() => setDone(false)}>Send another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" {...register("name")} placeholder="John Doe" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="you@example.com" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea id="message" rows={5} {...register("message")} placeholder="How can we help?" />
                  {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" disabled={submitting} className="w-full bg-gradient-primary text-primary-foreground">
                  {submitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : <><Send className="mr-2 h-4 w-4" /> Send message</>}
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="overflow-hidden rounded-3xl border border-border shadow-card-soft">
          <iframe
            title="Office location"
            src={site.mapEmbed}
            width="100%"
            height="380"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
    </>
  );
}

function ContactCard({ Icon, title, value, subtitle, href }: {
  Icon: any; title: string; value: string; subtitle?: string; href?: string;
}) {
  const inner = (
    <div className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card-soft transition-smooth hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-elegant">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-sm font-semibold text-foreground">{title}</p>
        <p className="text-sm">{value}</p>
        {subtitle && <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>}
      </div>
    </div>
  );
  return href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">{inner}</a> : inner;
}

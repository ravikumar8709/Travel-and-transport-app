import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { site } from "@/config/site";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login — TransitGo Travels" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminLogin,
});

const schema = z.object({
  email: z.string().trim().email("Invalid email"),
  password: z.string().min(6, "Password is required"),
});
type Values = z.infer<typeof schema>;

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    setLoading(true);
    try {
      const res = await api.login(v.email, v.password);
      localStorage.setItem("admin_token", res.token);
      localStorage.setItem("admin_user", JSON.stringify(res.user));
      toast.success("Welcome back!");
      navigate({ to: "/admin" });
    } catch (e: any) {
      toast.error(e.message || "Login failed. Is the backend running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-elegant">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-gradient-primary text-primary-foreground"><ShieldCheck className="h-5 w-5" /></span>
          <div>
            <h1 className="font-display text-xl font-bold">{site.name} Admin</h1>
            <p className="text-xs text-muted-foreground">Sign in to manage bookings</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="admin@example.com" />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" {...register("password")} placeholder="••••••••" />
            {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>}
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gradient-primary text-primary-foreground">
            {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...</> : <><LogIn className="mr-2 h-4 w-4" /> Sign in</>}
          </Button>
        </form>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          <Link to="/" className="hover:text-primary">← Back to website</Link>
        </p>
      </div>
    </div>
  );
}

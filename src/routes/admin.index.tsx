import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { LogOut, RefreshCw, Search, Download, Inbox, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { api } from "@/lib/api";
import { site } from "@/config/site";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — TransitGo Travels" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminDashboard,
});

type Booking = {
  _id?: string; id?: string;
  name: string; phone: string; serviceType: string;
  pickup: string; drop: string; date: string; vehicleType: string;
  status: string; createdAt: string;
};
type Contact = { _id?: string; id?: string; name: string; email: string; message: string; status: string; createdAt: string };

function AdminDashboard() {
  const navigate = useNavigate();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    const t = localStorage.getItem("admin_token");
    if (!t) { navigate({ to: "/admin/login" }); return; }
    setAuthed(true);
  }, [navigate]);

  const load = async () => {
    setLoading(true);
    try {
      try {
        const [b, c] = await Promise.all([api.listBookings(), api.listContacts()]);
        setBookings(b.bookings || []);
        setContacts(c.contacts || []);
      } catch {
        // backend not reachable — fall back to local
        const lb = JSON.parse(localStorage.getItem("local_bookings") || "[]");
        const lc = JSON.parse(localStorage.getItem("local_contacts") || "[]");
        setBookings(lb);
        setContacts(lc);
        toast.info("Showing local submissions (backend not connected).");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (authed) load(); }, [authed]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    navigate({ to: "/admin/login" });
  };

  const filteredBookings = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return bookings;
    return bookings.filter((b) =>
      [b.name, b.phone, b.pickup, b.drop, b.vehicleType, b.serviceType].join(" ").toLowerCase().includes(s),
    );
  }, [q, bookings]);
  const filteredContacts = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return contacts;
    return contacts.filter((c) => [c.name, c.email, c.message].join(" ").toLowerCase().includes(s));
  }, [q, contacts]);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.updateBookingStatus(id, status);
      setBookings((prev) => prev.map((b) => ((b._id || b.id) === id ? { ...b, status } : b)));
      toast.success("Status updated");
    } catch (e: any) {
      // local fallback
      const lb = JSON.parse(localStorage.getItem("local_bookings") || "[]");
      const next = lb.map((b: Booking) => ((b._id || b.id) === id ? { ...b, status } : b));
      localStorage.setItem("local_bookings", JSON.stringify(next));
      setBookings(next);
      toast.success("Status updated (local)");
    }
  };

  const exportCsv = (rows: any[], name: string) => {
    if (!rows.length) return toast.error("Nothing to export");
    const headers = Object.keys(rows[0]);
    const csv = [
      headers.join(","),
      ...rows.map((r) => headers.map((h) => JSON.stringify(r[h] ?? "")).join(",")),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `${name}-${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  if (!authed) return null;

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <h1 className="font-display text-lg font-bold">{site.name} Admin</h1>
            <p className="text-xs text-muted-foreground">Manage bookings & messages</p>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm"><Link to="/">View site</Link></Button>
            <Button variant="outline" size="sm" onClick={load} disabled={loading}>
              <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            <Button variant="outline" size="sm" onClick={logout}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <div className="mb-6 grid gap-4 sm:grid-cols-3">
          <Stat label="Total bookings" value={bookings.length} />
          <Stat label="New / Pending" value={bookings.filter((b) => b.status === "new").length} />
          <Stat label="Contact messages" value={contacts.length} />
        </div>

        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search..." className="pl-9" />
          </div>
        </div>

        <Tabs defaultValue="bookings">
          <TabsList>
            <TabsTrigger value="bookings">Bookings ({filteredBookings.length})</TabsTrigger>
            <TabsTrigger value="contacts">Messages ({filteredContacts.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="mt-4">
            <div className="mb-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => exportCsv(filteredBookings, "bookings")}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr>
                      <Th>When</Th><Th>Name</Th><Th>Phone</Th><Th>Service</Th>
                      <Th>Pickup → Drop</Th><Th>Date</Th><Th>Vehicle</Th><Th>Status</Th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr><td colSpan={8} className="p-6 text-center"><Loader2 className="mx-auto h-5 w-5 animate-spin" /></td></tr>
                    ) : filteredBookings.length === 0 ? (
                      <Empty cols={8} />
                    ) : filteredBookings.map((b) => {
                      const id = (b._id || b.id)!;
                      return (
                        <tr key={id} className="border-t border-border">
                          <Td className="text-xs text-muted-foreground">{new Date(b.createdAt).toLocaleString()}</Td>
                          <Td className="font-medium">{b.name}</Td>
                          <Td><a href={`tel:${b.phone}`} className="text-primary hover:underline">{b.phone}</a></Td>
                          <Td className="capitalize">{b.serviceType}</Td>
                          <Td>{b.pickup} → {b.drop}</Td>
                          <Td>{new Date(b.date).toLocaleDateString()}</Td>
                          <Td>{b.vehicleType}</Td>
                          <Td>
                            <Select value={b.status} onValueChange={(v) => updateStatus(id, v)}>
                              <SelectTrigger className="h-8 w-[130px]"><SelectValue /></SelectTrigger>
                              <SelectContent>
                                <SelectItem value="new">New</SelectItem>
                                <SelectItem value="contacted">Contacted</SelectItem>
                                <SelectItem value="confirmed">Confirmed</SelectItem>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                          </Td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="contacts" className="mt-4">
            <div className="mb-3 flex justify-end">
              <Button variant="outline" size="sm" onClick={() => exportCsv(filteredContacts, "contacts")}><Download className="mr-2 h-4 w-4" />Export CSV</Button>
            </div>
            <div className="overflow-hidden rounded-2xl border border-border bg-card">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50 text-left text-xs uppercase tracking-wide text-muted-foreground">
                    <tr><Th>When</Th><Th>Name</Th><Th>Email</Th><Th>Message</Th></tr>
                  </thead>
                  <tbody>
                    {filteredContacts.length === 0 ? <Empty cols={4} /> : filteredContacts.map((c) => (
                      <tr key={c._id || c.id} className="border-t border-border">
                        <Td className="text-xs text-muted-foreground whitespace-nowrap">{new Date(c.createdAt).toLocaleString()}</Td>
                        <Td className="font-medium">{c.name}</Td>
                        <Td><a className="text-primary hover:underline" href={`mailto:${c.email}`}>{c.email}</a></Td>
                        <Td className="max-w-md">{c.message}</Td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-3xl font-bold">{value}</p>
    </div>
  );
}
function Th({ children }: { children: React.ReactNode }) { return <th className="px-4 py-3">{children}</th>; }
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}
function Empty({ cols }: { cols: number }) {
  return (
    <tr><td colSpan={cols} className="p-10 text-center text-sm text-muted-foreground">
      <Inbox className="mx-auto mb-2 h-6 w-6 opacity-50" />
      No records yet.
    </td></tr>
  );
}

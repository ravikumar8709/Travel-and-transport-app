import { site } from "@/config/site";

const BASE = site.apiBaseUrl;

export type BookingPayload = {
  name: string;
  phone: string;
  serviceType: "travel" | "transport";
  pickup: string;
  drop: string;
  date: string; // ISO
  vehicleType: string;
};

export type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
  const res = await fetch(`${BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers || {}),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || `Request failed (${res.status})`);
  }
  return res.json();
}

export const api = {
  createBooking: (data: BookingPayload) =>
    request<{ id: string }>("/booking", { method: "POST", body: JSON.stringify(data) }),
  createContact: (data: ContactPayload) =>
    request<{ id: string }>("/contact", { method: "POST", body: JSON.stringify(data) }),
  login: (email: string, password: string) =>
    request<{ token: string; user: { email: string; role: string } }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  listBookings: () => request<{ bookings: any[] }>("/bookings"),
  listContacts: () => request<{ contacts: any[] }>("/contacts"),
  updateBookingStatus: (id: string, status: string) =>
    request<{ ok: boolean }>(`/bookings/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    }),
};

// Local fallback so the booking form still works in the live preview when
// no backend is running. Saves to localStorage and returns a mock id.
export function saveLocalBooking(data: BookingPayload) {
  const key = "local_bookings";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  const id = `LOCAL-${Date.now().toString(36).toUpperCase()}`;
  list.unshift({ id, ...data, status: "new", createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
  return { id };
}

export function saveLocalContact(data: ContactPayload) {
  const key = "local_contacts";
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  const id = `LOCAL-${Date.now().toString(36).toUpperCase()}`;
  list.unshift({ id, ...data, status: "new", createdAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(list));
  return { id };
}

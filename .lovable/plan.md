
# Travel & Transport Service Website

A clean, professional, mobile-responsive marketing + lead-gen site for a travel and transport business, with passenger cab booking and goods truck booking. Blue + white theme, Uber/Ola-inspired UI.

## Important: Stack note

You asked to keep the MERN spec. This Lovable preview runs on TanStack Start (React + Vite), not Node/Express. So the deliverable will be split:

- **Frontend (runs live in this preview):** React + Tailwind, fully built and clickable. Forms post to a configurable API base URL.
- **Backend (delivered as a separate downloadable code package, not running here):** complete Node.js + Express + MongoDB project — `server/` folder with routes, Mongoose schemas, JWT admin auth, and a README to run locally with `npm install && npm run dev`.
- **Admin dashboard:** built into the frontend at `/admin`, protected by login, calls the Node backend.

If you'd rather have everything actually live in the preview (recommended), say the word and I'll switch to Lovable Cloud — same features, no separate server to run.

## Pages & UX

1. **Home (`/`)** — Hero "Reliable Travel & Transport Services", three CTAs (Book Now, Get Quote, Call Now), short intro, two service highlight cards (Passenger Travel, Goods Transport), trust strip (years/trips/cities/vehicles), testimonials preview, final CTA band.
2. **Services (`/services`)** — Two clearly separated sections:
   - Passenger Travel: Local cab, Outstation, Airport transfer
   - Goods Transport: Light (mini-truck), Medium, Heavy
   Each item: icon, description, "Book this" CTA prefilling the booking form.
3. **Fleet (`/fleet`)** — Filter tabs (All / Cabs / Trucks). Vehicle cards with image, name (Tata Punch, Toyota Innova, Tata Ace, Ashok Leyland 1616, etc.), capacity (passengers or load tonnage), type badge, Book Now button.
4. **Book / Quote (`/book`)** — Single form: Name, Phone, Service Type (Travel/Transport), Pickup, Drop, Date, Vehicle Type (dependent on service type). Client-side validation with zod + react-hook-form. Success screen after submit with reference ID.
5. **Contact (`/contact`)** — Click-to-call phone, email, address, embedded Google Map, contact form (name/email/message).
6. **Admin (`/admin`)** — Login page → dashboard with two tabs: Bookings, Contact Messages. Table view, search, status update (new/contacted/done), CSV export.

Global:
- Sticky responsive navbar with mobile drawer.
- Footer: nav links, social icons, contact info, copyright.
- Floating WhatsApp button (bottom-right, all pages).
- Floating chatbot widget (rule-based FAQ: pricing, areas, hours, "book now" → routes to form).
- Smooth hover/transition animations, loading skeletons, toast notifications.

## Design

- Blue + white theme (primary deep blue, white surfaces, subtle gray borders, yellow accent for CTAs only).
- Lucide icons (Car, Truck, Phone, MapPin, Calendar).
- Inter font, generous spacing, rounded-xl cards, soft shadows.
- Fully responsive (mobile-first, tested 375px → 1440px).
- Placeholder business info (editable in one config file): "TransitGo Travels", placeholder phone/WhatsApp/address.

## Frontend technical details

- Routes as separate files (`/`, `/services`, `/about`, `/fleet`, `/book`, `/contact`, `/admin`, `/admin/login`) — each with its own SEO meta.
- Forms: `react-hook-form` + `zod`, shadcn `Form`, `Input`, `Select`, `Calendar`, `Button`.
- API client: small `src/lib/api.ts` reading `VITE_API_BASE_URL` (defaults to `http://localhost:5000/api`). Handles errors, returns typed responses.
- Admin auth: JWT stored in `localStorage`, route guard via `_authenticated` layout.
- Vehicle data + service data in `src/data/` (typed TS arrays) so they're easy to edit.
- Vehicle images: free placeholder image URLs (Unsplash) — easy to swap later.

## Backend package (delivered as `server/` folder)

```text
server/
  src/
    index.js                 Express bootstrap, CORS, JSON, routes
    db.js                    Mongoose connection
    models/
      Booking.js             name, phone, serviceType, pickup, drop, date, vehicleType, status, createdAt
      Contact.js             name, email, message, status, createdAt
      User.js                email, passwordHash, role
    middleware/
      auth.js                JWT verify + requireAdmin
      validate.js            zod request validation
    routes/
      booking.js             POST /booking (public), GET /bookings (admin), PATCH /bookings/:id/status
      contact.js             POST /contact (public), GET /contacts (admin)
      auth.js                POST /auth/login, POST /auth/seed-admin (one-time)
  .env.example               MONGODB_URI, JWT_SECRET, ADMIN_EMAIL, ADMIN_PASSWORD, PORT, CORS_ORIGIN
  package.json               express, mongoose, cors, dotenv, jsonwebtoken, bcryptjs, zod, nodemon
  README.md                  Step-by-step run instructions
```

API endpoints:
- `POST /api/booking` — public, validated, returns `{ id }`
- `POST /api/contact` — public, validated
- `POST /api/auth/login` — returns JWT
- `GET /api/bookings` — admin, paginated
- `GET /api/contacts` — admin
- `PATCH /api/bookings/:id/status` — admin

Security: zod validation, bcrypt passwords, JWT auth, CORS locked to frontend origin, input length caps.

## How to run (will be in README)

```text
1. cd server && cp .env.example .env  (set MONGODB_URI, JWT_SECRET)
2. npm install && npm run seed:admin   (creates admin from env)
3. npm run dev                          (server on :5000)
4. In Lovable: set VITE_API_BASE_URL to http://localhost:5000/api
```

## Out of scope (can add later)

- Payment gateway / live fare calculation
- SMS/email notifications on booking
- Real-time vehicle tracking
- Multi-language

## Build order

1. Theme tokens + layout shell (navbar, footer, WhatsApp button, chatbot).
2. Home, Services, Fleet, Contact pages with placeholder data.
3. Booking form with validation + success state.
4. Admin login + dashboard with bookings/contacts tables.
5. API client wired to `VITE_API_BASE_URL`.
6. Generate `server/` Node/Express/MongoDB package with README.

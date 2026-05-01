import { Outlet, useLocation } from "@tanstack/react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { WhatsAppFloat } from "./WhatsAppFloat";
import { ChatBot } from "./ChatBot";

export function SiteLayout() {
  const { pathname } = useLocation();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <Outlet />;
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFloat />
      <ChatBot />
    </div>
  );
}

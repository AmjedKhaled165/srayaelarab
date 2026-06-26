"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  PlusCircle,
  QrCode,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

function AdminShell({ children }: { children: ReactNode }) {
  const { user, loading, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (!loading && !user && !isLoginPage) {
      router.replace("/admin/login");
    }
    if (!loading && user && isLoginPage) {
      router.replace("/admin");
    }
  }, [user, loading, isLoginPage, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isLoginPage) return <>{children}</>;
  if (!user) return null;

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/add", label: "Add Item", icon: PlusCircle },
    { href: "/admin/qr", label: "QR Code", icon: QrCode },
  ];

  return (
    <div className="min-h-screen bg-background">
      <aside className="fixed top-0 left-0 bottom-0 w-56 bg-surface border-r border-white/5 hidden md:flex flex-col">
        <Link
          href="/admin"
          className="h-16 flex items-center gap-2 px-5 border-b border-white/5 font-display text-primary text-lg"
        >
          <LayoutDashboard size={18} />
          Admin Panel
        </Link>
        <nav className="flex-1 py-4 space-y-1 px-3">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted hover:text-foreground hover:bg-surface-light"
                }`}
              >
                <item.icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-sm text-muted hover:text-red-400 hover:bg-surface-light transition-all"
          >
            <LogOut size={17} />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="md:ml-56">
        <header className="sticky top-0 z-30 h-14 bg-background/90 backdrop-blur-lg border-b border-white/5 flex items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-3">
            {pathname !== "/admin" && (
              <button
                onClick={() => router.back()}
                className="md:hidden text-muted hover:text-foreground"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <Link href="/" className="text-xs text-muted hover:text-primary transition-colors">
              ← View Site
            </Link>
          </div>
          <div className="flex md:hidden items-center gap-2">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`p-2 rounded-lg transition-all ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground"
                  }`}
                >
                  <item.icon size={18} />
                </Link>
              );
            })}
            <button
              onClick={() => signOut()}
              className="p-2 text-muted hover:text-red-400 transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6 pb-24 md:pb-6">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <AdminShell>{children}</AdminShell>
    </AuthProvider>
  );
}

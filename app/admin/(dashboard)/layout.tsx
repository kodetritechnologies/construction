"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  Building,
  Briefcase,
  Star,
  HelpCircle,
  Layers,
  Settings,
  LogOut,
  Menu,
  X,
  ExternalLink,
  Bell,
  Shield,
} from "lucide-react";
import toast from "react-hot-toast";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Check current admin session
    const fetchMe = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.success && data.admin) {
          setAdminUser(data.admin);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await fetch("/api/dashboard/stats");
        const data = await res.json();
        if (data.success && data.stats) {
          setUnreadCount(data.stats.newInquiries || 0);
        }
      } catch (err) {
        // quiet
      }
    };

    fetchMe();
    fetchStats();
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      toast.success("Logged out successfully");
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    {
      label: "Inquiries & Leads",
      href: "/admin/inquiries",
      icon: MessageSquare,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    { label: "Projects Portfolio", href: "/admin/projects", icon: Building },
    { label: "Construction Services", href: "/admin/services", icon: Briefcase },
    { label: "Client Testimonials", href: "/admin/reviews", icon: Star },
    { label: "Frequently Asked Qs", href: "/admin/faqs", icon: HelpCircle },
    { label: "Materials & Standards", href: "/admin/materials", icon: Layers },
    { label: "Website Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#0E1114] text-gray-200 flex flex-col lg:flex-row font-sans">
      {/* Mobile Top Bar */}
      <div className="lg:hidden bg-[#14171B] border-b border-white/10 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-white">
            <Shield className="w-4 h-4" />
          </div>
          <span className="font-serif font-bold text-white text-base tracking-wide">
            Shreeji Admin
          </span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-gray-400 hover:text-white rounded-md"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#14171B] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col flex-1 overflow-y-auto">
          {/* Brand header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#D4AF37] to-[#9A7B1C] flex items-center justify-center text-white shadow-gold">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5 text-white"
                >
                  <path d="M3 21h18" />
                  <path d="M5 21V7l7-4 7 4v14" />
                  <path d="M9 10h6" />
                  <path d="M9 14h6" />
                  <path d="M9 18h6" />
                </svg>
              </div>
              <div>
                <span className="font-serif font-bold text-white text-base tracking-wide block leading-none">
                  Shreeji
                </span>
                <span className="text-[10px] text-[#C59B27] font-semibold tracking-widest uppercase">
                  Admin Console
                </span>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 flex-1">
            {navItems.map((item) => {
              const isActive = item.exact
                ? pathname === item.href
                : pathname.startsWith(item.href);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#C59B27] text-white shadow-gold font-semibold"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer info & Logout */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>View Live Website</span>
          </Link>

          <div className="pt-2 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#C59B27]/20 border border-[#C59B27]/40 flex items-center justify-center text-[#D4AF37] font-bold text-xs uppercase">
                {adminUser?.name ? adminUser.name.charAt(0) : "A"}
              </div>
              <div className="text-left">
                <div className="text-xs font-semibold text-white truncate max-w-[110px]">
                  {adminUser?.name || "Administrator"}
                </div>
                <div className="text-[10px] text-gray-500 uppercase tracking-wider">
                  Superadmin
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className="hidden lg:flex items-center justify-between px-8 py-5 border-b border-white/10 bg-[#14171B]/50 backdrop-blur-md sticky top-0 z-30">
          <div>
            <h2 className="text-xl font-serif font-bold text-white">
              Shreeji Constructions Management
            </h2>
            <p className="text-xs text-gray-400">
              Contractor and Client Relationship Management
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/inquiries"
              className="relative p-2 text-gray-400 hover:text-[#D4AF37] hover:bg-white/5 rounded-full transition-colors"
              title="New Inquiries"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping" />
              )}
            </Link>

            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/15 text-xs font-medium text-gray-300 hover:text-white hover:border-[#C59B27] transition-all"
            >
              <span>Visit Site</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C59B27]" />
            </Link>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

"use client";

import React, { useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  LayoutDashboard,
  Globe,
  Sliders,
  Palette,
  Type,
  LayoutTemplate,
  Sparkles,
  Image as ImageIcon,
  Video,
  Grid,
  Calendar,
  Layers,
  FileText,
  Inbox,
  Navigation as NavIcon,
  MousePointer,
  Film,
  Zap,
  History,
  Archive,
  Activity,
  LogOut,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Wrench,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { useSiteConfig } from "@/context/SiteConfigContext";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { config, updateLocalDraftConfig, saveDraft, publish, refreshConfig } = useSiteConfig();

  const [authChecked, setAuthChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [savingStatus, setSavingStatus] = useState<string | null>(null);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    const verifyAuth = async () => {
      try {
        const res = await fetch("/api/admin/auth/me", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          if (data.authenticated) {
            setIsAuthenticated(true);
            setAuthChecked(true);
            return;
          }
        }
      } catch (e) {
        console.warn("Auth verify error:", e);
      }
      setIsAuthenticated(false);
      setAuthChecked(true);
      router.push("/admin/login");
    };

    verifyAuth();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/auth/logout", { method: "POST" });
    } catch (e) {
      console.warn("Logout error:", e);
    }
    sessionStorage.removeItem("fashai_admin_token");
    router.push("/admin/login");
  };

  const handleToggleMaintenance = async () => {
    const currentState = config?.maintenanceSettings?.enabled || false;
    const newState = !currentState;
    setSavingStatus("Updating Maintenance Mode...");

    updateLocalDraftConfig((prev) => ({
      ...prev,
      maintenanceSettings: {
        ...prev.maintenanceSettings,
        enabled: newState,
      },
    }));

    setTimeout(async () => {
      await saveDraft();
      await publish(`Maintenance Mode set to ${newState ? "ON" : "OFF"}`);
      setSavingStatus(null);
    }, 200);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-12 h-12 border-2 border-[#FAB60A] border-t-transparent rounded-full animate-spin mb-4" />
        <p className="font-syne text-xs uppercase tracking-widest text-[#FAB60A]">
          VERIFYING ADMIN AUTHENTICATION...
        </p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const isMaintenanceOn = config?.maintenanceSettings?.enabled;

  const sidebarNavItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Website Control", href: "/admin/website", icon: Globe },
    { label: "Global Settings", href: "/admin/settings", icon: Sliders },
    { label: "Theme & Colors", href: "/admin/theme", icon: Palette },
    { label: "Typography", href: "/admin/typography", icon: Type },
    { label: "Homepage Builder", href: "/admin/homepage", icon: LayoutTemplate },
    { label: "Hero Control", href: "/admin/hero", icon: Sparkles },
    { label: "Media Library", href: "/admin/media", icon: ImageIcon },
    { label: "Video Library", href: "/admin/video", icon: Video },
    { label: "Gallery Manager", href: "/admin/gallery", icon: Grid },
    { label: "Event Manager", href: "/admin/events", icon: Calendar },
    { label: "Event Popup", href: "/admin/popup", icon: Layers },
    { label: "Applications", href: "/admin/applications", icon: FileText },
    { label: "Form Submissions", href: "/admin/submissions", icon: Inbox },
    { label: "Navigation", href: "/admin/navigation", icon: NavIcon },
    { label: "Footer Control", href: "/admin/footer", icon: MousePointer },
    { label: "Motion & Animation", href: "/admin/motion", icon: Film },
    { label: "Page Manager", href: "/admin/pages", icon: Zap },
    { label: "Version History", href: "/admin/history", icon: History },
    { label: "Backups & Restore", href: "/admin/backups", icon: Archive },
    { label: "Activity Log", href: "/admin/activity", icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans select-none antialiased">
      {/* TOP HEADER BAR */}
      <header className="h-16 bg-[#0F0E0D] border-b border-white/10 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-[100] shadow-md">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white"
            aria-label="Toggle Mobile Navigation Drawer"
          >
            {mobileDrawerOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>

          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="FashAI Logo"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-serif-display text-lg sm:text-xl font-light text-white uppercase tracking-tight hidden xs:inline">
              FashAI <span className="text-[#FAB60A]">Master</span>
            </span>
          </Link>
        </div>

        {/* Status Pill & Header Actions */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <button
            onClick={handleToggleMaintenance}
            title="Click to toggle Maintenance Mode ON/OFF"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-syne font-bold uppercase tracking-wider transition-all ${
              isMaintenanceOn
                ? "bg-[#F15E1C]/20 border-[#F15E1C] text-[#F15E1C] animate-pulse"
                : "bg-[#2E936F]/20 border-[#2E936F] text-[#2E936F]"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${isMaintenanceOn ? "bg-[#F15E1C]" : "bg-[#2E936F]"}`} />
            <span>{isMaintenanceOn ? "MAINTENANCE MODE" : "ONLINE"}</span>
          </button>

          {savingStatus && (
            <span className="hidden md:inline-flex items-center gap-1.5 text-xs text-[#FAB60A] font-syne">
              <CheckCircle2 className="w-3.5 h-3.5 animate-spin" />
              {savingStatus}
            </span>
          )}

          {/* Preview Public Website */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white px-3.5 py-1.5 rounded-lg font-syne text-xs font-bold uppercase tracking-wider transition-all"
          >
            <span>PREVIEW SITE</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#FAB60A]" />
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-[#F15E1C]/15 hover:bg-[#F15E1C] text-[#F15E1C] hover:text-white px-3.5 py-1.5 rounded-lg font-syne text-xs font-bold uppercase tracking-wider transition-all border border-[#F15E1C]/30"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden xs:inline">LOG OUT</span>
          </button>
        </div>
      </header>

      {/* BODY CONTENT WRAPPER */}
      <div className="flex flex-1 relative">
        {/* DESKTOP SIDEBAR */}
        <aside className="hidden lg:flex w-64 bg-[#0B0A09] border-r border-white/10 flex-col py-4 px-3 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto shrink-0">
          <div className="px-3 pb-3 mb-2 border-b border-white/10 flex items-center justify-between">
            <span className="text-[11px] font-syne font-bold uppercase tracking-[0.2em] text-[#FAB60A]">
              MASTER CONTROL
            </span>
            <ShieldCheck className="w-4 h-4 text-[#2E936F]" />
          </div>

          <nav className="space-y-1">
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-syne text-xs font-semibold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#F15E1C] text-white shadow-md font-bold"
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#FAB60A]"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileDrawerOpen && (
          <div className="lg:hidden fixed inset-0 z-[150] flex">
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setMobileDrawerOpen(false)}
            />
            <div className="relative w-72 max-w-[80vw] bg-[#0F0E0D] border-r border-white/10 h-full p-4 flex flex-col z-[160] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10">
                <span className="font-serif-display text-lg font-light text-white uppercase">
                  ADMIN NAVIGATION
                </span>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="p-1 text-white/70 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1.5 flex-1">
                {sidebarNavItems.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-syne text-xs font-semibold uppercase tracking-wider transition-all ${
                        isActive
                          ? "bg-[#F15E1C] text-white shadow-md"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-[#FAB60A]" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="pt-4 border-t border-white/10">
                <Link
                  href="/"
                  target="_blank"
                  className="w-full flex items-center justify-center gap-2 bg-white/10 py-2.5 rounded-xl text-xs font-syne font-bold uppercase text-white"
                >
                  <span>PREVIEW PUBLIC WEBSITE</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#FAB60A]" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* MAIN PANEL CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {children}
        </main>
      </div>
    </div>
  );
}

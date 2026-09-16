"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export const NAV_ITEMS = [
  { label: "HOME", href: "/" },
  { label: "PROJECTS", href: "/projects" },
  { label: "UPCOMING", href: "/upcoming" },
  { label: "GALLERY", href: "/gallery" },
  { label: "CONTACT", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-void/85 backdrop-blur-md border-b border-hairline transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Logo / Monogram */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-serif-display text-2xl font-light tracking-tight text-brand-off-white group-hover:text-brand-orange transition-colors">
            FASHPRISM
          </span>
          <span className="hidden sm:inline-block text-[9px] font-syne tracking-micro text-brand-orange border border-brand-orange/40 px-1.5 py-0.5">
            INTL
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-syne tracking-caps">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1 transition-colors ${
                  isActive
                    ? "text-brand-orange font-bold"
                    : "text-brand-off-white/80 hover:text-brand-gold"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-brand-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-4">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-brand-orange px-5 py-2 text-[11px] font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
            data-cursor="explore"
          >
            BE A PART ↗
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-brand-off-white hover:text-brand-orange transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={NAV_ITEMS}
        currentPath={pathname}
      />
    </header>
  );
}


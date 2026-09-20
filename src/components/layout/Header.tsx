"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";

export const NAV_ITEMS = [
  { label: "Landing", href: "/" },
  { label: "Contact Us", href: "/contact" },
  { label: "Projects", href: "/projects" },
  { label: "Upcoming", href: "/upcoming" },
  { label: "Gallery", href: "/gallery" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-void/90 backdrop-blur-md border-b border-hairline-orange/40 transition-all duration-300">
      <div className="container-editorial flex items-center justify-between py-3 min-h-[64px]">
        {/* Official FashAI Universe Brand Lockup */}
        <Link href="/" className="flex items-center gap-3.5 group py-1 min-h-[44px]">
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 overflow-hidden rounded-md border border-brand-orange/30 bg-black shadow-md">
            <Image
              src="/assets/logo/main-logo.jpeg"
              alt="FashAI Universe Official Logo"
              fill
              priority
              sizes="(max-width: 640px) 32px, 40px"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-syne text-base sm:text-lg tracking-[0.18em] font-extrabold text-brand-white group-hover:text-brand-orange transition-colors leading-tight">
              FashAI Universe
            </span>
            <span className="font-syne text-[9px] sm:text-[10px] tracking-micro text-brand-orange font-semibold uppercase leading-tight mt-0.5">
              Powered by Arav Innovation
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-9 text-[11px] font-syne tracking-caps font-medium">
          {NAV_ITEMS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative py-1.5 transition-colors duration-200 ${
                  isActive
                    ? "text-brand-orange font-bold"
                    : "text-brand-white/80 hover:text-brand-lemon"
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-brand-orange px-5 py-2 text-[11px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-1px] transition-all duration-200 shadow-md"
            data-cursor="explore"
          >
            CONTACT US ↗
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
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




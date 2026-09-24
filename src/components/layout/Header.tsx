"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ui/ThemeToggle";
import { useSiteConfig } from "@/context/SiteConfigContext";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = (config.navigationSettings && config.navigationSettings.length > 0
    ? config.navigationSettings.filter((item) => item.enabled)
    : [
        { id: "home", label: "HOME", href: "/", enabled: true, order: 1 },
        { id: "upcoming", label: "UPCOMING", href: "/upcoming", enabled: true, order: 2 },
        { id: "gallery", label: "GALLERY", href: "/gallery", enabled: true, order: 3 },
        { id: "apply", label: "APPLY", href: "/apply", enabled: true, order: 4 },
        { id: "contact", label: "CONTACT", href: "/contact", enabled: true, order: 5 },
      ]
  ).sort((a, b) => a.order - b.order);

  return (
    <>
      {/* FLOATING GLASS EDITORIAL NAVBAR CONTAINER */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[200] transition-all duration-400 rounded-full select-none ${
          isScrolled
            ? "top-1 sm:top-1.5 h-13 sm:h-[56px] w-[calc(100%-2rem)] max-w-[1240px] bg-[#0c0c0c]/85 dark:bg-[#070707]/88 html-light-header-scrolled border border-white/15 dark:border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
            : "top-1.5 sm:top-2.5 md:top-3 h-15 sm:h-16 md:h-[66px] w-[calc(100%-1.5rem)] max-w-[1400px] bg-transparent border-transparent shadow-none backdrop-blur-none"
        }`}
      >
        <div className={`h-full flex items-center justify-between relative transition-all duration-400 ${
          isScrolled ? "px-3.5 sm:px-5 gap-2 sm:gap-3" : "px-4 sm:px-6 gap-3 sm:gap-4"
        }`}>
          
          {/* LOGO AREA (LEFT) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className={`relative flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
              isScrolled ? "w-7 h-7 sm:w-8 sm:h-8" : "w-8 h-8 sm:w-9 sm:h-9"
            }`}>
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="FashAI Universal Logo"
                fill
                priority
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className={`font-serif-display font-light tracking-wider uppercase leading-none transition-all duration-300 ${
                isScrolled ? "text-sm sm:text-base lg:text-lg" : "text-base sm:text-lg lg:text-xl"
              }`}>
                <span className="fashai-brand-text text-white">FashAI</span> <span className="font-serif italic font-normal text-[#FAB60A] capitalize ml-1">Universal</span>
              </span>
            </div>
          </Link>

          {/* DESKTOP / LAPTOP CENTER NAVIGATION LINKS */}
          <nav className={`hidden lg:flex items-center text-xs font-syne tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
            isScrolled ? "space-x-5 xl:space-x-7" : "space-x-7 xl:space-x-9"
          }`}>
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`relative py-1 transition-colors duration-200 ${
                    isActive
                      ? "text-[#FAB60A] font-bold"
                      : isScrolled
                      ? "text-white/85 hover:text-[#FAB60A]"
                      : "text-white/90 hover:text-[#FAB60A] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FAB60A] rounded-full shadow-[0_0_8px_rgba(250,182,10,0.6)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CIRCULAR ACTION CONTROLS */}
          <div className={`flex items-center shrink-0 transition-all duration-300 ${
            isScrolled ? "gap-1.5 sm:gap-2" : "gap-2 sm:gap-3"
          }`}>
            
            {/* CIRCULAR GLASS THEME TOGGLE */}
            <ThemeToggle />

            {/* CONTACT US CTA BUTTON */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center justify-center bg-[#FAB60A] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 whitespace-nowrap ${
                isScrolled
                  ? "text-[10px] sm:text-[11px] px-3.5 sm:px-5 py-1.5 sm:py-2"
                  : "text-[11px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5"
              }`}
              data-cursor="explore"
            >
              CONTACT US →
            </Link>

            {/* CIRCULAR MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden rounded-full flex items-center justify-center shrink-0 transition-all duration-300 aspect-square ${
                isScrolled
                  ? "w-8 h-8 sm:w-9 sm:h-9 bg-white/10 dark:bg-white/10 border border-white/15 text-white hover:border-[#FAB60A]"
                  : "w-9 h-9 sm:w-10 sm:h-10 bg-black/25 dark:bg-black/30 border border-white/20 text-white hover:border-[#FAB60A] backdrop-blur-sm shadow-md"
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </header>

      {/* FULLSCREEN EDITORIAL MOBILE NAVIGATION MENU */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={navItems.map((n) => ({ label: n.label, href: n.href }))}
        currentPath={pathname}
      />
    </>
  );
}

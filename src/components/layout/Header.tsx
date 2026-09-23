"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ui/ThemeToggle";
import { SERVICES_DATA } from "@/data/services";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Keyboard navigation: Escape key closes dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesDropdownOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setServicesDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 250);
  };

  const handleOpenMobileServices = () => {
    setMobileServicesOpen(true);
    setMobileMenuOpen(true);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 html-light-header-scrolled border-b border-white/10 shadow-lg py-2.5 backdrop-blur-md"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container-editorial flex items-center justify-between min-h-[50px] relative">
        {/* Official Editorial Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group py-1 min-h-[44px]">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 overflow-hidden bg-black/90 border border-brand-orange/40 shadow-[0_0_15px_rgba(241,94,28,0.2)] group-hover:border-brand-orange group-hover:shadow-[0_0_22px_rgba(241,94,28,0.4)] transition-all duration-300">
            <Image
              src="/assets/brand/logo_transparent.png"
              alt="FashAI Universal Logo"
              fill
              priority
              sizes="36px"
              className="object-contain p-0.5 group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-serif-display text-lg sm:text-xl font-light tracking-wider text-brand-white uppercase group-hover:text-brand-orange transition-colors leading-none">
              FashAI <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden capitalize">Universal</span>
            </span>
            <span className="text-[8px] font-syne tracking-[0.22em] text-brand-platinum/70 uppercase font-bold mt-0.5">
              DUBAI · EST. 2026
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8 text-[11px] font-syne tracking-caps font-medium">
          {/* HOME */}
          <Link
            href="/"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname === "/" ? "text-brand-orange font-bold" : "text-brand-white/80 hover:text-brand-lemon"
            }`}
          >
            HOME
            {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />}
          </Link>

          {/* SERVICES DROPDOWN TRIGGER */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              id="header-services-trigger"
              onClick={() => setServicesDropdownOpen((prev) => !prev)}
              aria-expanded={servicesDropdownOpen}
              aria-haspopup="true"
              aria-controls="desktop-services-dropdown"
              className={`flex items-center gap-1.5 py-1.5 transition-colors duration-200 ${
                servicesDropdownOpen ? "text-brand-yellow-golden font-bold" : "text-brand-white/80 hover:text-brand-yellow-golden"
              }`}
            >
              <span>SERVICES</span>
              <ChevronDown className={`w-3.5 h-3.5 text-brand-yellow-golden transition-transform duration-300 ${servicesDropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* DESKTOP DROPDOWN PANEL (BLACK + GOLD EDITORIAL UI) */}
            {servicesDropdownOpen && (
              <div
                id="desktop-services-dropdown"
                className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[680px] bg-[#0B0908] border border-brand-yellow-golden/40 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.9)] z-[300] backdrop-blur-xl animate-fadeIn"
              >
                {/* Header Lockup in Dropdown */}
                <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
                  <div className="flex items-center gap-2 text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-brand-orange" />
                    <span>ARAV INNOVATIONS ENTERPRISE SERVICES</span>
                  </div>
                  <span className="text-[10px] font-mono text-brand-platinum/50">8 PORTFOLIO CAPABILITIES</span>
                </div>

                {/* 2-Column Services Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {SERVICES_DATA.map((service) => (
                    <a
                      key={service.number}
                      href={service.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-start justify-between p-3 bg-black/60 border border-white/10 hover:border-brand-yellow-golden/60 hover:bg-[#15120E] transition-all duration-300 relative overflow-hidden"
                    >
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-brand-yellow-golden font-bold group-hover:text-brand-orange transition-colors">
                            {service.number}
                          </span>
                          <h4 className="font-syne text-xs font-bold text-brand-white group-hover:text-brand-yellow-golden uppercase tracking-wide transition-colors leading-snug">
                            {service.name}
                          </h4>
                        </div>
                        <p className="text-[10px] font-sans text-brand-platinum/70 font-light truncate max-w-[240px]">
                          {service.shortDesc}
                        </p>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-brand-yellow-golden/60 group-hover:text-brand-orange group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all flex-shrink-0 mt-0.5" />

                      {/* Fine Gold Line Indicator on Hover */}
                      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-yellow-golden group-hover:w-full transition-all duration-300" />
                    </a>
                  ))}
                </div>

                {/* Footer Bar */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-syne text-brand-platinum/60">
                  <span>Visit Arav Innovations Official Platform</span>
                  <span className="text-brand-yellow-golden font-bold uppercase tracking-wider">https://aravinnovations.com →</span>
                </div>
              </div>
            )}
          </div>

          {/* UPCOMING */}
          <Link
            href="/upcoming"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/upcoming") ? "text-brand-orange font-bold" : "text-brand-white/80 hover:text-brand-lemon"
            }`}
          >
            UPCOMING
            {pathname.startsWith("/upcoming") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />}
          </Link>

          {/* GALLERY */}
          <Link
            href="/gallery"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/gallery") ? "text-brand-orange font-bold" : "text-brand-white/80 hover:text-brand-lemon"
            }`}
          >
            GALLERY
            {pathname.startsWith("/gallery") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />}
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/contact") ? "text-brand-orange font-bold" : "text-brand-white/80 hover:text-brand-lemon"
            }`}
          >
            CONTACT
            {pathname.startsWith("/contact") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-orange" />}
          </Link>
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-brand-orange px-5 py-2 text-[11px] font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:translate-y-[-1px] transition-all duration-200 shadow-md"
            data-cursor="explore"
          >
            CONTACT US →
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Fullscreen Mobile Navigation Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => {
          setMobileMenuOpen(false);
          setMobileServicesOpen(false);
        }}
        items={[
          { label: "Home", href: "/" },
          { label: "Upcoming", href: "/upcoming" },
          { label: "Gallery", href: "/gallery" },
          { label: "Contact", href: "/contact" },
        ]}
        currentPath={pathname}
        servicesOpenDefault={mobileServicesOpen}
      />
    </header>
  );
}

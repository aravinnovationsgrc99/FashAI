"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ui/ThemeToggle";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[200] transition-all duration-300 ${
        isScrolled
          ? "bg-black/85 html-light-header-scrolled border-b border-brand-yellow-golden/20 shadow-lg py-2.5 backdrop-blur-md"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="container-editorial flex items-center justify-between min-h-[50px] relative">
        {/* Official Editorial Brand Lockup */}
        <Link href="/" className="flex items-center gap-3 group py-1 min-h-[44px]">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0 overflow-hidden bg-black border border-brand-yellow-golden/50 shadow-[0_0_15px_rgba(250,182,10,0.2)] group-hover:border-brand-yellow-golden group-hover:shadow-[0_0_22px_rgba(250,182,10,0.4)] transition-all duration-300">
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
            <span className="font-serif-display text-lg sm:text-xl font-light tracking-wider text-brand-white uppercase group-hover:text-brand-yellow-golden transition-colors leading-none">
              FashAI <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-golden via-[#FFEC69] to-brand-orange capitalize">Universal</span>
            </span>
            <span className="text-[8px] font-syne tracking-[0.22em] text-brand-yellow-golden/70 uppercase font-bold mt-0.5">
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
              pathname === "/" ? "text-brand-yellow-golden font-bold" : "text-brand-white/80 hover:text-brand-yellow-golden"
            }`}
          >
            HOME
            {pathname === "/" && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow-golden" />}
          </Link>

          {/* UPCOMING */}
          <Link
            href="/upcoming"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/upcoming") ? "text-brand-yellow-golden font-bold" : "text-brand-white/80 hover:text-brand-yellow-golden"
            }`}
          >
            UPCOMING
            {pathname.startsWith("/upcoming") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow-golden" />}
          </Link>

          {/* GALLERY */}
          <Link
            href="/gallery"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/gallery") ? "text-brand-yellow-golden font-bold" : "text-brand-white/80 hover:text-brand-yellow-golden"
            }`}
          >
            GALLERY
            {pathname.startsWith("/gallery") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow-golden" />}
          </Link>

          {/* CONTACT */}
          <Link
            href="/contact"
            className={`relative py-1.5 transition-colors duration-200 ${
              pathname.startsWith("/contact") ? "text-brand-yellow-golden font-bold" : "text-brand-white/80 hover:text-brand-yellow-golden"
            }`}
          >
            CONTACT
            {pathname.startsWith("/contact") && <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-yellow-golden" />}
          </Link>
        </nav>

        {/* Action Button & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="hidden sm:inline-flex items-center justify-center bg-brand-yellow-golden px-5 py-2 text-[11px] font-syne tracking-caps font-bold text-black hover:bg-[#FFEC69] hover:translate-y-[-1px] transition-all duration-200 shadow-[0_0_15px_rgba(250,182,10,0.3)]"
            data-cursor="explore"
          >
            CONTACT US →
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-yellow-golden transition-colors"
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
        items={[
          { label: "Home", href: "/" },
          { label: "Upcoming", href: "/upcoming" },
          { label: "Gallery", href: "/gallery" },
          { label: "Contact", href: "/contact" },
        ]}
        currentPath={pathname}
      />
    </header>
  );
}

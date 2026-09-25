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
  const [scrollY, setScrollY] = useState(0);
  const [heroHeight, setHeroHeight] = useState(700);
  const pathname = usePathname();
  const { config } = useSiteConfig();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const updateHeroHeight = () => {
      const whoWeAreEl = document.getElementById("who-we-are");
      if (whoWeAreEl) {
        setHeroHeight(whoWeAreEl.offsetTop - 60);
      } else {
        setHeroHeight(window.innerHeight - 60);
      }
    };

    handleScroll();
    updateHeroHeight();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateHeroHeight, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateHeroHeight);
    };
  }, [pathname]);

  const rawNavItems = (config.navigationSettings && config.navigationSettings.length > 0
    ? config.navigationSettings.filter((item) => item.enabled)
    : [
        { id: "home", label: "HOME", href: "/", enabled: true, order: 1 },
        { id: "upcoming", label: "UPCOMING", href: "/upcoming", enabled: true, order: 2 },
        { id: "services", label: "SERVICES", href: "/services", enabled: true, order: 3 },
        { id: "gallery", label: "GALLERY", href: "/gallery", enabled: true, order: 4 },
        { id: "apply", label: "APPLY", href: "/apply", enabled: true, order: 5 },
        { id: "contact", label: "CONTACT", href: "/contact", enabled: true, order: 6 },
      ]
  );

  const hasServices = rawNavItems.some((item) => item.id === "services" || item.href === "/services");
  const navItems = (hasServices
    ? rawNavItems
    : [
        ...rawNavItems.slice(0, 2),
        { id: "services", label: "SERVICES", href: "/services", enabled: true, order: 3 },
        ...rawNavItems.slice(2),
      ]
  ).sort((a, b) => a.order - b.order);

  // Over cinematic hero video on homepage (until "A GLOBAL FASHION MOVEMENT..." / #who-we-are section)
  const isOverVideo = pathname === "/" && scrollY < heroHeight;
  const isTopAtVideo = pathname === "/" && scrollY < 25;

  return (
    <>
      {/* FLOATING GLASS EDITORIAL NAVBAR CONTAINER */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[200] transition-all duration-400 rounded-full select-none ${
          isTopAtVideo
            ? "top-2 sm:top-3 md:top-3.5 h-16 sm:h-[66px] md:h-[70px] w-[calc(100%-1.5rem)] max-w-[1450px] bg-transparent border-transparent shadow-none backdrop-blur-none"
            : isOverVideo
            ? "top-1.5 sm:top-2 h-14 sm:h-[60px] w-[calc(100%-1.5rem)] max-w-[1340px] bg-black/40 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            : "top-1.5 sm:top-2 h-14 sm:h-[60px] w-[calc(100%-1.5rem)] max-w-[1340px] bg-white/80 dark:bg-[#070707]/85 border border-black/10 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between relative transition-all duration-400 ${
            isTopAtVideo ? "px-4 sm:px-7 lg:px-9 gap-4 sm:gap-6 lg:gap-8" : "px-4 sm:px-6 lg:px-8 gap-3 sm:gap-5 lg:gap-7"
          }`}
        >
          {/* LOGO AREA (LEFT) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group shrink-0">
            <div
              className={`relative flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
                isTopAtVideo ? "w-8 h-8 sm:w-9 sm:h-9" : "w-7 h-7 sm:w-8 sm:h-8"
              }`}
            >
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
              <span
                className={`font-serif-display font-light tracking-wider uppercase leading-none transition-all duration-300 ${
                  isTopAtVideo ? "text-base sm:text-lg lg:text-xl" : "text-sm sm:text-base lg:text-lg"
                }`}
              >
                <span
                  className={
                    isOverVideo
                      ? "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      : "text-[#111111] dark:text-white"
                  }
                >
                  FashAI
                </span>
                <span
                  className={
                    isOverVideo
                      ? "font-serif italic font-normal text-[#D4AF37] capitalize ml-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      : "font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37] capitalize ml-0.5"
                  }
                >
                  Universal
                </span>
              </span>
            </div>
          </Link>

          {/* DESKTOP / LAPTOP CENTER NAVIGATION LINKS */}
          <nav
            className={`hidden lg:flex items-center text-xs font-syne tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
              isTopAtVideo ? "space-x-7 xl:space-x-10" : "space-x-6 xl:space-x-9"
            }`}
          >
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
                      ? isOverVideo
                        ? "text-[#D4AF37] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                        : "text-[#F15E1C] dark:text-[#D4AF37] font-bold"
                      : isOverVideo
                      ? "text-white hover:text-[#D4AF37] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                      : "text-[#111111] dark:text-white/85 hover:text-[#F15E1C] dark:hover:text-[#D4AF37]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        isOverVideo
                          ? "bg-[#D4AF37] shadow-[0_0_8px_rgba(250,182,10,0.6)]"
                          : "bg-[#F15E1C] dark:bg-[#D4AF37] shadow-[0_0_8px_rgba(241,94,28,0.5)]"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CIRCULAR ACTION CONTROLS */}
          <div
            className={`flex items-center shrink-0 transition-all duration-300 ${
              isTopAtVideo ? "gap-2 sm:gap-3" : "gap-1.5 sm:gap-2"
            }`}
          >
            {/* CIRCULAR GLASS THEME TOGGLE */}
            <ThemeToggle isHeroHeader={isOverVideo} />

            {/* CONTACT US CTA BUTTON (DESKTOP/TABLET ONLY — KEPT INSIDE 3-LINE DRAWER FOR MOBILE) */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center justify-center bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 whitespace-nowrap ${
                isTopAtVideo
                  ? "text-xs px-5 sm:px-6 py-2 sm:py-2.5"
                  : "text-[11px] px-4 sm:px-5 py-1.5 sm:py-2"
              }`}
              data-cursor="explore"
            >
              CONTACT US →
            </Link>

            {/* CIRCULAR MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden rounded-full flex items-center justify-center shrink-0 transition-all duration-300 aspect-square ${
                isOverVideo
                  ? "w-9 h-9 sm:w-10 sm:h-10 bg-black/25 dark:bg-black/30 border border-white/20 text-white hover:border-[#D4AF37] backdrop-blur-sm shadow-md"
                  : "w-8 h-8 sm:w-9 sm:h-9 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#111111] dark:text-white hover:border-[#F15E1C] dark:hover:border-[#D4AF37]"
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu className={`w-4.5 h-4.5 ${isOverVideo ? "text-white" : "text-[#111111] dark:text-white"}`} />
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

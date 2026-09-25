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

  // Over cinematic hero video on homepage (until "A GLOBAL FASHION MOVEMENT..." / #who-we-are section)
  const isOverVideo = pathname === "/" && scrollY < heroHeight;
  const isTopAtVideo = pathname === "/" && scrollY < 25;

  return (
    <>
      {/* FLOATING GLASS EDITORIAL NAVBAR CONTAINER */}
      <header
        className={`fixed left-1/2 -translate-x-1/2 z-[200] transition-all duration-400 rounded-full select-none ${
          isTopAtVideo
            ? "top-1.5 sm:top-2.5 md:top-3 h-15 sm:h-16 md:h-[66px] w-[calc(100%-1.5rem)] max-w-[1400px] bg-transparent border-transparent shadow-none backdrop-blur-none"
            : isOverVideo
            ? "top-1 sm:top-1.5 h-13 sm:h-[56px] w-[calc(100%-2rem)] max-w-[1240px] bg-black/40 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            : "top-1 sm:top-1.5 h-13 sm:h-[56px] w-[calc(100%-2rem)] max-w-[1240px] bg-white/80 dark:bg-[#070707]/85 border border-black/10 dark:border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between relative transition-all duration-400 ${
            isTopAtVideo ? "px-4 sm:px-6 gap-3 sm:gap-4" : "px-3.5 sm:px-5 gap-2 sm:gap-3"
          }`}
        >
          {/* LOGO AREA (LEFT) */}
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
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
                      ? "font-serif italic font-normal text-[#FAB60A] capitalize ml-0.5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
                      : "font-serif italic font-normal text-[#F15E1C] dark:text-[#FAB60A] capitalize ml-0.5"
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
              isTopAtVideo ? "space-x-7 xl:space-x-9" : "space-x-5 xl:space-x-7"
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
                        ? "text-[#FAB60A] font-bold drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                        : "text-[#F15E1C] dark:text-[#FAB60A] font-bold"
                      : isOverVideo
                      ? "text-white hover:text-[#FAB60A] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                      : "text-[#111111] dark:text-white/85 hover:text-[#F15E1C] dark:hover:text-[#FAB60A]"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                        isOverVideo
                          ? "bg-[#FAB60A] shadow-[0_0_8px_rgba(250,182,10,0.6)]"
                          : "bg-[#F15E1C] dark:bg-[#FAB60A] shadow-[0_0_8px_rgba(241,94,28,0.5)]"
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

            {/* CONTACT US CTA BUTTON */}
            <Link
              href="/contact"
              className={`hidden sm:inline-flex items-center justify-center bg-[#FAB60A] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold tracking-wider uppercase rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 shrink-0 whitespace-nowrap ${
                isTopAtVideo
                  ? "text-[11px] sm:text-xs px-4 sm:px-6 py-2 sm:py-2.5"
                  : "text-[10px] sm:text-[11px] px-3.5 sm:px-5 py-1.5 sm:py-2"
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
                  ? "w-9 h-9 sm:w-10 sm:h-10 bg-black/25 dark:bg-black/30 border border-white/20 text-white hover:border-[#FAB60A] backdrop-blur-sm shadow-md"
                  : "w-8 h-8 sm:w-9 sm:h-9 bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/15 text-[#111111] dark:text-white hover:border-[#F15E1C] dark:hover:border-[#FAB60A]"
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

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, ArrowRight } from "lucide-react";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "../ui/ThemeToggle";
import GradientFlowText from "../ui/GradientFlowText";
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
        className={`fixed left-1/2 -translate-x-1/2 [transform-style:preserve-3d] [backface-visibility:hidden] z-[200] transition-all duration-400 rounded-full select-none ${
          isTopAtVideo
            ? "top-2 sm:top-3 md:top-3.5 h-16 sm:h-[66px] md:h-[70px] w-[calc(100%-1.5rem)] max-w-[1520px] bg-transparent border-transparent shadow-none backdrop-blur-none"
            : isOverVideo
            ? "top-1.5 sm:top-2 h-14 sm:h-[60px] w-[calc(100%-1.5rem)] max-w-[1420px] bg-black/40 border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
            : "top-1.5 sm:top-2 h-14 sm:h-[60px] w-[calc(100%-1.5rem)] max-w-[1420px] bg-[#080706]/90 dark:bg-[#070707]/85 border border-[#D4AF37]/45 dark:border-white/15 shadow-[0_8px_32px_rgba(212,175,55,0.2)] dark:shadow-[0_14px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        }`}
      >
        <div
          className={`h-full flex items-center justify-between relative transition-all duration-400 ${
            isTopAtVideo ? "px-6 sm:px-9 lg:px-12 gap-5 sm:gap-8 lg:gap-10" : "px-5 sm:px-8 lg:px-11 gap-4 sm:gap-6 lg:gap-8"
          }`}
        >
          {/* LOGO AREA (LEFT) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group shrink-0">
            <div
              className={`relative flex-shrink-0 transition-all duration-300 group-hover:scale-105 ${
                isTopAtVideo
                  ? "w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 xl:w-[50px] xl:h-[50px]"
                  : "w-8.5 h-8.5 sm:w-10 sm:h-10 md:w-11 md:h-11 xl:w-[46px] xl:h-[46px]"
              }`}
            >
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="FashAI Universal Logo"
                fill
                priority
                sizes="(max-width: 640px) 40px, (max-width: 1024px) 48px, 56px"
                className="object-contain filter drop-shadow-[0_1px_2px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1px_3px_rgba(212,175,55,0.25)]"
              />
            </div>
            <div className="flex flex-col justify-center">
              <span
                className={`font-serif-display font-light tracking-wider uppercase leading-none transition-all duration-300 ${
                  isTopAtVideo
                    ? "text-base sm:text-xl lg:text-2xl xl:text-[26px]"
                    : "text-sm sm:text-lg lg:text-xl xl:text-2xl"
                }`}
              >
                <span className="text-[#D4AF37] dark:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-none">
                  FashAI
                </span>
                <span className="font-serif italic font-normal text-[#D4AF37] capitalize ml-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.25)] dark:drop-shadow-none">
                  Universal
                </span>
              </span>
            </div>
          </Link>

          {/* DESKTOP / LAPTOP CENTER NAVIGATION LINKS */}
          <nav
            className={`hidden lg:flex items-center text-xs font-syne tracking-[0.18em] font-semibold uppercase transition-all duration-300 ${
              isTopAtVideo ? "space-x-9 xl:space-x-14" : "space-x-8 xl:space-x-12"
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
                  className={`group relative py-1.5 transition-colors duration-200 text-[#D4AF37] dark:text-white/85 hover:text-[#FFEC69] dark:hover:text-[#D4AF37] subpixel-antialiased ${
                    isActive ? "font-bold" : "font-semibold"
                  }`}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#D4AF37] origin-center transition-transform duration-[250ms] ease-out ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT CIRCULAR ACTION CONTROLS */}
          <div
            className={`flex items-center shrink-0 transition-all duration-300 ${
              isTopAtVideo ? "gap-3 sm:gap-4" : "gap-2.5 sm:gap-3.5"
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
              <GradientFlowText variant="primary">
                CONTACT US →
              </GradientFlowText>
            </Link>

            {/* CIRCULAR MOBILE HAMBURGER BUTTON */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden rounded-full flex items-center justify-center shrink-0 transition-all duration-300 aspect-square w-[34px] h-[34px] sm:w-[38px] sm:h-[38px] bg-[#D4AF37]/15 dark:bg-white/15 border border-[#D4AF37]/45 dark:border-white/20 backdrop-blur-md text-[#D4AF37] dark:text-white hover:bg-[#D4AF37]/25 dark:hover:bg-white/25 hover:border-[#D4AF37] shadow-sm"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-[18px] h-[18px] sm:w-5 sm:h-5 text-[#D4AF37] dark:text-white stroke-[2.2]" />
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

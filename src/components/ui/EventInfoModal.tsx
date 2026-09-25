"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export default function EventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle CTA Navigation: Register / Enquire
  const handleRegisterClick = () => {
    handleClose();
    if (pathname === "/") {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push("/contact?type=Registration");
  };

  // Handle CTA Navigation: Sponsorship Enquiry
  const handleSponsorshipClick = () => {
    handleClose();
    if (pathname === "/") {
      const contactElem = document.getElementById("contact");
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: "smooth" });
        const enquirySelect = document.getElementById("enquiryType") as HTMLSelectElement;
        if (enquirySelect) {
          enquirySelect.value = "Sponsorship";
          enquirySelect.dispatchEvent(new Event("change", { bubbles: true }));
        }
        return;
      }
    }
    router.push("/contact?type=Sponsorship");
  };

  // Scroll threshold trigger (15% - 25% scroll on homepage) + session persistence
  useEffect(() => {
    // Only trigger on homepage
    if (pathname !== "/") return;

    try {
      const alreadyShown = sessionStorage.getItem("fashai_event_announcement_shown");
      if (alreadyShown === "true") return;
    } catch {
      // ignore
    }

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) return;

      const scrollPercent = (window.scrollY / scrollHeight) * 100;

      if (scrollPercent >= 15) {
        setIsOpen(true);
        try {
          sessionStorage.setItem("fashai_event_announcement_shown", "true");
        } catch {
          // ignore
        }
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // Manage body scroll locking when open & handle Escape key
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          handleClose();
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => {
        window.removeEventListener("keydown", handleKeyDown);
      };
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence
      onExitComplete={() => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      }}
    >
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Upcoming Event Announcement: LifeStyle 2026 Dubai"
        >
          {/* 1. Backdrop Overlay (Dark Translucent with Blur) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[300]"
            style={{
              WebkitBackdropFilter: "blur(16px)",
              backdropFilter: "blur(16px)",
            }}
          />

          {/* 2. Main Centered Premium Event Panel (Matching Reference Design Image) */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-[310] w-[92vw] sm:w-[90vw] max-w-[1450px] max-h-[90vh] sm:max-h-[88vh] overflow-y-auto no-scrollbar border border-[#F15E1C]/50 dark:border-brand-yellow-golden/60 bg-white dark:bg-[#070605] text-[#111111] dark:text-brand-white rounded-2xl md:rounded-3xl shadow-[0_12px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_0_80px_rgba(250,182,10,0.2)] my-auto"
          >
            {/* Background Image Container (Light & Dark Mode Adaptive) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              {/* Light Mode Background Image */}
              <Image
                src="/assets/events/instagram_background_light.png"
                alt="LifeStyle 2026 Dubai Background Light"
                fill
                priority
                sizes="(max-width: 1450px) 100vw, 1450px"
                className="block dark:hidden object-cover object-right md:object-right-top opacity-95 filter contrast-105"
              />
              {/* Dark Mode Background Image */}
              <Image
                src="/assets/hero/fallback.png"
                alt="LifeStyle 2026 Dubai Background Dark"
                fill
                priority
                sizes="(max-width: 1450px) 100vw, 1450px"
                className="hidden dark:block object-cover object-right md:object-right-top opacity-90 filter contrast-105"
              />
              {/* Light Mode Overlays */}
              <div className="block dark:hidden absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-white/40 md:to-transparent" />
              <div className="block dark:hidden absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-white/60" />

              {/* Dark Mode Overlays */}
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/30 md:to-transparent" />
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60" />
            </div>

            {/* Top Right Control Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close event announcement"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-[320] p-2.5 sm:p-3 min-w-[44px] min-h-[44px] flex items-center justify-center bg-white/90 dark:bg-black/80 border border-[#F15E1C]/40 dark:border-brand-yellow-golden/70 rounded-lg text-[#111111] dark:text-white hover:text-[#F15E1C] dark:hover:text-brand-yellow-golden hover:border-[#F15E1C] dark:hover:border-brand-yellow-golden transition-all shadow-xl group"
            >
              <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Panel Content Overlay Container */}
            <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-14 flex flex-col justify-between min-h-full">
              {/* TOP / MAIN CONTENT AREA */}
              <div className="max-w-2xl space-y-4 sm:space-y-5">
                {/* Small Eyebrow */}
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-[#F15E1C] dark:bg-brand-yellow-golden shadow-[0_0_8px_rgba(241,94,28,0.6)] dark:shadow-[0_0_8px_rgba(250,182,10,0.8)] shrink-0" />
                  <span className="font-syne text-[11px] sm:text-xs tracking-[0.25em] text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase drop-shadow-sm">
                    LIFESTYLE 2026 · DUBAI · 2026
                  </span>
                </div>

                {/* Subtitle */}
                <p className="font-serif italic text-base sm:text-xl text-[#333333] dark:text-brand-platinum/90 font-light drop-shadow-sm">
                  An international fashion and lifestyle experience.
                </p>

                {/* Main Headline Title */}
                <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light uppercase tracking-tight leading-none text-[#111111] dark:text-white drop-shadow-sm">
                  LIFESTYLE <span className="font-serif italic text-[#F15E1C] dark:text-brand-yellow-golden font-normal">2026</span>
                </h2>

                {/* Location Tag */}
                <div className="inline-block border-b border-[#F15E1C]/40 dark:border-brand-yellow-golden/50 pb-2">
                  <span className="font-syne text-xs sm:text-sm tracking-[0.3em] font-bold text-[#F15E1C] dark:text-brand-yellow-golden uppercase">
                    DUBAI · 2026
                  </span>
                </div>

                {/* Announcement Container Box */}
                <div className="bg-white/85 dark:bg-black/60 backdrop-blur-md border border-[#F15E1C]/30 dark:border-brand-yellow-golden/40 p-4 sm:p-5 rounded-xl sm:rounded-2xl max-w-xl shadow-lg my-3">
                  <h3 className="font-syne text-xs sm:text-sm tracking-wider font-bold text-[#F15E1C] dark:text-brand-yellow-golden uppercase mb-1">
                    REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#333333] dark:text-brand-platinum/90 font-light leading-relaxed">
                    Open for delegates, international designers, press, and brand partners.
                  </p>
                </div>

                {/* 3 Event Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 max-w-2xl">
                  {/* Event Date */}
                  <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-black/10 dark:border-white/15 p-3.5 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>EVENT DATE</span>
                    </div>
                    <span className="font-syne text-xs font-bold text-[#111111] dark:text-white uppercase tracking-wide">
                      TO BE ANNOUNCED
                    </span>
                  </div>

                  {/* Event Venue */}
                  <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-black/10 dark:border-white/15 p-3.5 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase mb-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>EVENT VENUE</span>
                    </div>
                    <span className="font-syne text-xs font-bold text-[#111111] dark:text-white uppercase tracking-wide">
                      DUBAI, UAE
                    </span>
                  </div>

                  {/* Dress Code */}
                  <div className="bg-white/90 dark:bg-black/70 backdrop-blur-sm border border-black/10 dark:border-white/15 p-3.5 sm:p-4 rounded-xl flex flex-col justify-between shadow-sm">
                    <div className="flex items-center gap-2 text-[10px] font-syne tracking-micro text-[#F15E1C] dark:text-brand-yellow-golden font-bold uppercase mb-1">
                      <span>DRESS CODE</span>
                    </div>
                    <span className="font-syne text-[11px] font-bold text-[#111111] dark:text-white uppercase tracking-wide leading-tight">
                      FASHIONABLE &amp; HAUTE COUTURE
                    </span>
                  </div>
                </div>

                {/* 2 Functional Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 max-w-xl">
                  <button
                    onClick={handleRegisterClick}
                    className="flex-1 bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] hover:shadow-[0_0_25px_rgba(250,182,10,0.5)] transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 rounded-xl font-syne text-xs tracking-caps font-bold shadow-xl"
                  >
                    <span>REGISTER / ENQUIRE</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleSponsorshipClick}
                    className="flex-1 border border-[#F15E1C]/60 dark:border-brand-yellow-golden/70 bg-white/90 dark:bg-black/60 backdrop-blur-sm px-6 py-4 text-xs font-syne tracking-caps font-bold text-[#111111] dark:text-white hover:bg-[#F15E1C]/10 dark:hover:bg-brand-yellow-golden/20 hover:border-[#F15E1C] dark:hover:border-brand-yellow-golden transition-all duration-300 min-h-[48px] flex items-center justify-center gap-2 rounded-xl shadow-sm"
                  >
                    <span>SPONSORSHIP ENQUIRY</span>
                    <ExternalLink className="w-4 h-4 text-[#F15E1C] dark:text-brand-yellow-golden" />
                  </button>
                </div>
              </div>

              {/* BOTTOM FOOTER BRANDING */}
              <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Image
                    src="/assets/brand/Final_Powered_by_logo.png"
                    alt="Arav Innovation Logo"
                    width={220}
                    height={58}
                    priority
                    className="h-6 sm:h-7 w-auto object-contain dark:brightness-100"
                  />
                </div>
                <div className="font-syne text-[10px] sm:text-xs tracking-[0.2em] font-bold text-[#555555] dark:text-brand-platinum/70 uppercase">
                  FASHAI UNIVERSAL · DUBAI 2026
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

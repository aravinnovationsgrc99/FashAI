"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { X, Calendar, MapPin, Sparkles, ArrowRight, ExternalLink } from "lucide-react";

export default function EventAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  // Scroll threshold trigger (15% - 25%) + session persistence
  useEffect(() => {
    try {
      const alreadyShown = sessionStorage.getItem("fashai_event_announcement_shown");
      if (alreadyShown === "true") return;
    } catch {
      // Ignore if sessionStorage is restricted
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
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  // Handle Keyboard Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handleClose]);

  // CTA Action: Register / Enquire
  const handleRegisterClick = () => {
    handleClose();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/contact?type=Registration");
    }
  };

  // CTA Action: Sponsorship Enquiry
  const handleSponsorshipClick = () => {
    handleClose();
    const contactElem = document.getElementById("contact");
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: "smooth" });
      const enquirySelect = document.getElementById("enquiryType") as HTMLSelectElement;
      if (enquirySelect) {
        enquirySelect.value = "Sponsorship";
        enquirySelect.dispatchEvent(new Event("change", { bubbles: true }));
      }
    } else {
      router.push("/contact?type=Sponsorship");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none">
          {/* 1. Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            style={{
              WebkitBackdropFilter: "blur(16px)",
              backdropFilter: "blur(16px)",
            }}
          />

          {/* 2. Main Centered Premium Event Panel */}
          <motion.div
            initial={{ opacity: 0, y: 25, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.97 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 w-[94vw] sm:w-[85vw] md:w-[78vw] max-w-[860px] max-h-[92vh] sm:max-h-[84vh] overflow-y-auto no-scrollbar border border-brand-yellow-golden/60 bg-[#070605] text-brand-white rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(250,182,10,0.2)]"
            role="dialog"
            aria-modal="true"
            aria-label="Upcoming Event Announcement: LifeStyle 2026 Dubai"
          >
            {/* Background Fallback Image (Framed exactly as in reference design) */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
              <Image
                src="/assets/hero/fallback.png"
                alt="LifeStyle 2026 Dubai Background"
                fill
                priority
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover object-right md:object-right-top opacity-90 filter contrast-105"
              />
              {/* Dark Gradient Overlay: Heavy on left for text contrast, soft on right for fashion model */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/30 md:to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-transparent to-black/60" />
            </div>

            {/* Top Right Control Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close event announcement"
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-30 p-1.5 sm:p-2 min-w-[34px] min-h-[34px] sm:min-w-[38px] sm:min-h-[38px] flex items-center justify-center bg-black/80 border border-brand-yellow-golden/70 rounded-lg text-white hover:text-brand-yellow-golden hover:border-brand-yellow-golden hover:bg-black transition-all shadow-xl group"
            >
              <X className="w-4 h-4 sm:w-4.5 sm:h-4.5 group-hover:scale-110 transition-transform" />
            </button>

            {/* Panel Content Overlay Container */}
            <div className="relative z-10 p-4 sm:p-6 md:p-8 flex flex-col justify-between min-h-full">
              {/* TOP / MAIN CONTENT AREA */}
              <div className="max-w-xl space-y-3 sm:space-y-4">
                {/* Small Eyebrow */}
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-brand-yellow-golden shadow-[0_0_8px_rgba(250,182,10,0.8)] shrink-0" />
                  <span className="font-syne text-[10px] sm:text-[11px] tracking-[0.2em] text-brand-yellow-golden font-bold uppercase drop-shadow">
                    LIFESTYLE 2026 · DUBAI · 2026
                  </span>
                </div>

                {/* Subtitle */}
                <p className="font-serif italic text-xs sm:text-base text-brand-platinum/90 font-light drop-shadow">
                  An international fashion and lifestyle experience.
                </p>

                {/* Main Headline Title */}
                <h2 className="font-serif-display text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-tight leading-none text-white drop-shadow-[0_8px_25px_rgba(0,0,0,0.9)]">
                  LIFESTYLE <span className="font-serif italic text-brand-yellow-golden font-normal">2026</span>
                </h2>

                {/* Location Tag */}
                <div className="inline-block border-b border-brand-yellow-golden/50 pb-1 sm:pb-1.5">
                  <span className="font-syne text-[10px] sm:text-xs tracking-[0.25em] font-bold text-brand-yellow-golden uppercase">
                    DUBAI · 2026
                  </span>
                </div>

                {/* Announcement Container Box */}
                <div className="bg-black/60 backdrop-blur-md border border-brand-yellow-golden/40 p-3 sm:p-4 rounded-lg sm:rounded-xl max-w-lg shadow-lg my-2">
                  <h3 className="font-syne text-[11px] sm:text-xs tracking-wider font-bold text-brand-yellow-golden uppercase mb-0.5">
                    REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                  </h3>
                  <p className="font-sans text-[10px] sm:text-xs text-brand-platinum/90 font-light leading-relaxed">
                    Open for delegates, international designers, press, and brand partners.
                  </p>
                </div>

                {/* 3 Event Details Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 pt-1 max-w-xl">
                  {/* Event Date */}
                  <div className="bg-black/70 backdrop-blur-sm border border-white/15 p-2.5 sm:p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-0.5">
                      <Calendar className="w-3 h-3" />
                      <span>EVENT DATE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">
                      TO BE ANNOUNCED
                    </span>
                  </div>

                  {/* Event Venue */}
                  <div className="bg-black/70 backdrop-blur-sm border border-white/15 p-2.5 sm:p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-0.5">
                      <MapPin className="w-3 h-3" />
                      <span>EVENT VENUE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-xs font-bold text-white uppercase tracking-wide">
                      DUBAI, UAE
                    </span>
                  </div>

                  {/* Dress Code */}
                  <div className="bg-black/70 backdrop-blur-sm border border-white/15 p-2.5 sm:p-3 rounded-lg flex flex-col justify-between">
                    <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-0.5">
                      <span>DRESS CODE</span>
                    </div>
                    <span className="font-syne text-[10px] sm:text-[11px] font-bold text-white uppercase tracking-wide leading-tight">
                      FASHIONABLE &amp; HAUTE COUTURE
                    </span>
                  </div>
                </div>

                {/* 2 Functional Action CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 pt-2 max-w-lg">
                  <button
                    onClick={handleRegisterClick}
                    className="flex-1 bg-brand-yellow-golden px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-syne tracking-caps font-bold text-black hover:bg-[#FFEC69] hover:shadow-[0_0_20px_rgba(250,182,10,0.5)] transition-all duration-300 min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1.5 rounded-lg shadow-lg"
                  >
                    <span>REGISTER / ENQUIRE</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={handleSponsorshipClick}
                    className="flex-1 border border-brand-yellow-golden/70 bg-black/60 backdrop-blur-sm px-4 py-2.5 sm:py-3 text-[11px] sm:text-xs font-syne tracking-caps font-bold text-white hover:bg-brand-yellow-golden/20 hover:border-brand-yellow-golden transition-all duration-300 min-h-[38px] sm:min-h-[42px] flex items-center justify-center gap-1.5 rounded-lg"
                  >
                    <span>SPONSORSHIP ENQUIRY</span>
                    <ExternalLink className="w-3.5 h-3.5 text-brand-yellow-golden" />
                  </button>
                </div>
              </div>

              {/* BOTTOM FOOTER BRANDING */}
              <div className="mt-5 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                <div className="flex items-center gap-2">
                  <Image
                    src="/assets/brand/Final_Powered_by_logo.png"
                    alt="Arav Innovation Logo"
                    width={180}
                    height={46}
                    priority
                    className="h-4.5 sm:h-5.5 w-auto object-contain"
                  />
                </div>
                <div className="font-syne text-[9px] sm:text-[10px] tracking-[0.18em] font-bold text-brand-platinum/70 uppercase">
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

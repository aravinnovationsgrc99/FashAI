"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sparkles } from "lucide-react";

export default function EventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerElementRef = useRef<HTMLElement | null>(null);

  // Close modal and set seen in localStorage safely
  const handleClose = useCallback(() => {
    setIsOpen(false);
    try {
      localStorage.setItem("fashai_event_popup_seen", "true");
    } catch {
      // Safe fallback if localStorage is disabled
    }

    // Restore background page scrolling
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    // Return focus if practical
    if (triggerElementRef.current) {
      triggerElementRef.current.focus?.();
    }
  }, []);

  // Handle CTA Navigation
  const handleCtaClick = (type: "Registration" | "Sponsorship") => {
    handleClose();
    router.push(`/contact?type=${type}`);
  };

  // 1. First-Visit Scroll Listener Logic
  useEffect(() => {
    // Check if user has already seen popup
    try {
      const hasSeen = localStorage.getItem("fashai_event_popup_seen");
      if (hasSeen === "true") {
        return;
      }
    } catch {
      // Continue if localStorage read fails
    }

    let triggered = false;

    const handleScroll = () => {
      if (triggered) return;

      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

      // Trigger after 15–25% first meaningful scroll or at least 220px scroll offset
      if (scrollTop > 220 || scrollPercentage >= 15) {
        triggered = true;
        triggerElementRef.current = document.activeElement as HTMLElement;
        setIsOpen(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 2. Manage Lock Scroll & Escape Key Listener when Open
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
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, handleClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          {/* Backdrop (Z-300): Dark Translucent Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[300]"
            style={{
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          />

          {/* Modal Container Card (Z-310) */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[310] w-full max-w-2xl bg-[#0B0908]/95 border border-brand-orange/40 p-6 sm:p-10 shadow-[0_0_60px_rgba(241,94,28,0.25)] text-brand-white overflow-hidden max-h-[88vh] flex flex-col justify-between my-auto rounded-none"
          >
            {/* Corner Decorative Accent */}
            <div className="absolute top-0 left-0 w-24 h-24 bg-gradient-to-br from-brand-orange/15 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-brand-green/10 via-transparent to-transparent pointer-events-none" />

            {/* Close Button (Z-320) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 rounded-full bg-brand-void border border-brand-orange/40 text-brand-white hover:text-brand-orange hover:border-brand-orange transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-[320] focus:outline-none focus:ring-2 focus:ring-brand-orange"
              aria-label="Close event information"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body Content (Scrollable if viewport is small) */}
            <div className="overflow-y-auto pr-1 space-y-5">
              
              {/* Eyebrow Label & Tagline */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-orange font-bold uppercase">
                    UPCOMING EVENT · DUBAI 2026
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-brand-yellow-golden font-light tracking-wide">
                  “BIGGEST INTERNATIONAL FASHION EVENTS, DUBAI | 2026”
                </p>
              </div>

              {/* Event Title */}
              <div>
                <h2
                  id="event-modal-title"
                  className="font-serif-display text-3xl sm:text-5xl font-light text-brand-white uppercase tracking-tight leading-none mb-2"
                >
                  LIFESTYLE 2026
                </h2>
                <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 font-light">
                  An international fashion and lifestyle experience.
                </p>
              </div>

              {/* Status Banner Box */}
              <div className="border-l-2 border-brand-orange pl-4 py-2.5 bg-brand-orange/10 border border-brand-orange/20">
                <span className="font-syne text-xs tracking-caps text-brand-orange font-bold uppercase block mb-0.5">
                  REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                </span>
                <span className="font-sans text-xs text-brand-white/90 font-light">
                  Open for delegates, international designers, press, and brand partners.
                </span>
              </div>

              {/* Key Event Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Event Date */}
                <div className="bg-brand-charcoal/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-orange text-xs mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="font-syne text-[9px] tracking-micro uppercase font-bold text-brand-platinum">
                      EVENT DATE
                    </span>
                  </div>
                  <span className="font-syne text-xs text-brand-white font-bold uppercase">
                    TO BE ANNOUNCED
                  </span>
                </div>

                {/* Event Venue */}
                <div className="bg-brand-charcoal/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-orange text-xs mb-2">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="font-syne text-[9px] tracking-micro uppercase font-bold text-brand-platinum">
                      EVENT VENUE
                    </span>
                  </div>
                  <span className="font-syne text-xs text-brand-white font-bold uppercase">
                    TO BE ANNOUNCED
                  </span>
                </div>

                {/* Dress Code */}
                <div className="bg-brand-charcoal/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-green text-xs mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-syne text-[9px] tracking-micro uppercase font-bold text-brand-platinum">
                      DRESS CODE
                    </span>
                  </div>
                  <span className="font-syne text-xs text-brand-green font-bold uppercase">
                    HAUTE COUTURE
                  </span>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={() => handleCtaClick("Registration")}
                  className="bg-brand-orange px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] hover:shadow-[0_0_20px_rgba(241,94,28,0.4)] transition-all duration-300 text-center min-h-[44px] flex items-center justify-center rounded-none group flex-1"
                >
                  <span>REGISTER / ENQUIRE</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={() => handleCtaClick("Sponsorship")}
                  className="border border-brand-yellow-golden/50 bg-brand-void/80 backdrop-blur-md px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[44px] flex items-center justify-center rounded-none flex-1"
                >
                  SPONSORSHIP ENQUIRY ↗
                </button>
              </div>

            </div>

            {/* Modal Footer Lockup: Supporting Arav Innovation Branding */}
            <div className="pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <span className="font-syne text-[10px] tracking-micro text-brand-platinum/70 uppercase">
                FASHAI UNIVERSAL · DUBAI 2026
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

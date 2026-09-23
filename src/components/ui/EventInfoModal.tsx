"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, MapPin, Sparkles } from "lucide-react";

export default function EventInfoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const modalRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Close modal and initiate smooth exit animation
  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle CTA Navigation
  const handleCtaClick = (type: "Registration" | "Sponsorship") => {
    handleClose();
    router.push(`/contact?type=${type}`);
  };

  // Route-aware 3-second delay popup trigger
  useEffect(() => {
    // Clear any existing timer when route changes or component mounts
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    // Reset modal state on route transition
    setIsOpen(false);

    // Schedule popup display exactly 3 seconds after entering page
    timerRef.current = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [pathname]);

  // Manage body scroll locking when open & handle Escape key for smooth exit
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
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 md:p-8 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          {/* Backdrop (Z-300): Dark Translucent Overlay (Subtle temporary visual treatment) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/85 backdrop-blur-md z-[300]"
          />

          {/* Modal Container Card (Z-310) - Smooth Entrance & Exit Animations */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[310] w-full max-w-2xl bg-[#080808] border border-brand-yellow-golden/50 p-6 sm:p-10 shadow-[0_0_80px_rgba(250,182,10,0.25)] text-brand-white overflow-hidden max-h-[88vh] flex flex-col justify-between my-auto rounded-none"
          >
            {/* Ambient Gold & Orange Subtle Glows */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-brand-yellow-golden/20 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-36 h-36 bg-gradient-to-tl from-brand-orange/15 via-transparent to-transparent pointer-events-none" />

            {/* Close Button (Z-320) */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2.5 bg-black/80 border border-brand-yellow-golden/40 text-brand-white hover:text-brand-yellow-golden hover:border-brand-yellow-golden transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-[320] focus:outline-none focus:ring-1 focus:ring-brand-yellow-golden"
              aria-label="Close event information"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Modal Body Content */}
            <div className="overflow-y-auto pr-1 space-y-5">
              
              {/* Eyebrow Tagline & Gold Indicator */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="h-2 w-2 rounded-full bg-brand-yellow-golden animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase">
                    LIFESTYLE 2026 · DUBAI · 2026
                  </span>
                </div>
                <p className="font-serif italic text-xs sm:text-sm text-brand-yellow-golden/90 font-light tracking-wide">
                  An international fashion and lifestyle experience.
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
                <p className="font-syne text-xs sm:text-sm text-brand-yellow-golden font-bold uppercase tracking-wide">
                  DUBAI · 2026
                </p>
              </div>

              {/* Status Banner Box */}
              <div className="border-l-2 border-brand-yellow-golden pl-4 py-3 bg-brand-yellow-golden/10 border border-brand-yellow-golden/30">
                <span className="font-syne text-xs tracking-caps text-brand-yellow-golden font-bold uppercase block mb-1">
                  REGISTRATIONS &amp; SPONSORSHIPS ARE OPEN
                </span>
                <span className="font-sans text-xs text-brand-white/90 font-light">
                  Open for delegates, international designers, press, and brand partners.
                </span>
              </div>

              {/* Key Event Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                {/* Event Date */}
                <div className="bg-black/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-yellow-golden text-xs mb-2">
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
                <div className="bg-black/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-yellow-golden text-xs mb-2">
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
                <div className="bg-black/80 border border-white/10 p-3.5 flex flex-col justify-between">
                  <div className="flex items-center gap-2 text-brand-yellow-golden text-xs mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span className="font-syne text-[9px] tracking-micro uppercase font-bold text-brand-platinum">
                      DRESS CODE
                    </span>
                  </div>
                  <span className="font-syne text-[11px] text-brand-yellow-golden font-bold uppercase leading-tight">
                    FASHIONABLE &amp; HAUTE COUTURE
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-3">
                <button
                  onClick={() => handleCtaClick("Registration")}
                  className="bg-brand-yellow-golden px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-black hover:bg-[#ffec69] transition-all duration-300 text-center min-h-[44px] flex items-center justify-center rounded-none group flex-1 shadow-[0_0_20px_rgba(250,182,10,0.3)]"
                >
                  <span>REGISTER / ENQUIRE</span>
                  <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                </button>
                <button
                  onClick={() => handleCtaClick("Sponsorship")}
                  className="border border-brand-yellow-golden/60 bg-black/80 px-6 py-3.5 text-xs font-syne tracking-caps font-bold text-brand-white hover:bg-brand-yellow-golden/10 hover:border-brand-yellow-golden transition-all duration-300 text-center min-h-[44px] flex items-center justify-center rounded-none flex-1"
                >
                  SPONSORSHIP ENQUIRY ↗
                </button>
              </div>

            </div>

            {/* Modal Footer Lockup: Powered by Arav Innovation */}
            <div className="pt-5 mt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div className="flex items-center gap-3">
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
              <span className="font-syne text-[10px] tracking-micro text-brand-platinum/70 uppercase font-bold">
                FASHAI UNIVERSAL · DUBAI 2026
              </span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

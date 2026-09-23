"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronDown, ArrowUpRight, Sparkles } from "lucide-react";
import ThemeToggle from "../ui/ThemeToggle";
import { SERVICES_DATA } from "@/data/services";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  currentPath: string;
  servicesOpenDefault?: boolean;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  currentPath,
  servicesOpenDefault = false,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);
  const [isServicesAccordionOpen, setIsServicesAccordionOpen] = useState(servicesOpenDefault);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setIsServicesAccordionOpen(servicesOpenDefault);
    }
  }, [isOpen, servicesOpenDefault]);

  // Prevent background scrolling when open (Body Scroll Locked)
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

  // Support Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const content = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[250] lg:hidden flex flex-col">
          {/* Dark Translucent Backdrop Overlay with Heavy Blur (z-[250]) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            style={{
              WebkitBackdropFilter: "blur(20px)",
              backdropFilter: "blur(20px)",
            }}
          />

          {/* Mobile Panel Content (z-[260]) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[260] flex flex-col justify-between h-full w-full bg-[#080808]/95 px-6 pt-6 pb-8 text-brand-off-white overflow-y-auto"
          >
            {/* Header Brand Lockup in Mobile Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 pt-2 flex-shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 min-h-[44px]">
                <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden bg-black/90 border border-brand-orange/40 shadow-[0_0_15px_rgba(241,94,28,0.2)]">
                  <Image
                    src="/assets/brand/logo_transparent.png"
                    alt="FashAI Universal Logo"
                    fill
                    priority
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="font-serif-display text-lg font-light tracking-wider text-brand-white uppercase leading-none">
                    FashAI <span className="font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-orange via-[#ff8833] to-brand-yellow-golden capitalize">Universal</span>
                  </span>
                  <span className="text-[8px] font-syne tracking-[0.22em] text-brand-platinum/70 uppercase font-bold mt-0.5">
                    DUBAI · EST. 2026
                  </span>
                </div>
              </Link>

              {/* Theme Toggle & Close Button (z-[270]) */}
              <div className="flex items-center gap-2 z-[270]">
                <ThemeToggle />
                <button
                  onClick={onClose}
                  className="p-2.5 rounded-full bg-brand-void border border-brand-orange/40 text-brand-white hover:text-brand-orange transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                  aria-label="Close Navigation Menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Navigation Links + SERVICES Accordion */}
            <nav className="flex flex-col space-y-3 my-auto py-6 flex-shrink-0">
              {/* Home */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.08 }}>
                <Link
                  href="/"
                  onClick={onClose}
                  className={`group flex items-center justify-between py-3 px-4 rounded-lg border ${
                    currentPath === "/"
                      ? "text-brand-orange bg-brand-orange/10 font-bold border-brand-orange/40"
                      : "text-brand-white border-transparent hover:border-brand-orange/30 hover:bg-brand-orange/5"
                  } transition-all duration-200 min-h-[48px]`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-syne text-brand-orange/90 font-bold">01</span>
                    <span className="font-syne text-2xl xs:text-3xl font-extrabold tracking-wide uppercase">HOME</span>
                  </span>
                  <span className="text-sm font-syne text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </Link>
              </motion.div>

              {/* SERVICES ACCORDION TRIGGER */}
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.13 }}>
                <button
                  onClick={() => setIsServicesAccordionOpen((prev) => !prev)}
                  aria-expanded={isServicesAccordionOpen}
                  className={`w-full group flex items-center justify-between py-3 px-4 rounded-lg border ${
                    isServicesAccordionOpen
                      ? "text-brand-yellow-golden bg-brand-yellow-golden/10 font-bold border-brand-yellow-golden/40"
                      : "text-brand-white border-transparent hover:border-brand-yellow-golden/30 hover:bg-brand-yellow-golden/5"
                  } transition-all duration-200 min-h-[48px]`}
                >
                  <span className="flex items-center gap-4">
                    <span className="text-xs font-syne text-brand-yellow-golden font-bold">02</span>
                    <span className="font-syne text-2xl xs:text-3xl font-extrabold tracking-wide uppercase flex items-center gap-2">
                      <span>SERVICES</span>
                      <Sparkles className="w-4 h-4 text-brand-yellow-golden inline" />
                    </span>
                  </span>
                  <div className="flex items-center gap-1 text-brand-yellow-golden">
                    <span className="text-xs font-mono">{isServicesAccordionOpen ? "HIDE" : "SHOW"}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isServicesAccordionOpen ? "rotate-180" : ""}`} />
                  </div>
                </button>

                {/* EXPANDABLE 8 SERVICES ACCORDION LIST */}
                <AnimatePresence>
                  {isServicesAccordionOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden bg-[#0D0B0A] border border-brand-yellow-golden/30 mt-2 p-3 space-y-1.5"
                    >
                      <div className="px-3 py-1 text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase border-b border-white/10 mb-2 flex items-center justify-between">
                        <span>ARAV INNOVATIONS SERVICES</span>
                        <span>8 SERVICES</span>
                      </div>

                      {SERVICES_DATA.map((service) => (
                        <a
                          key={service.number}
                          href={service.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className="flex items-center justify-between py-2.5 px-3 min-h-[44px] bg-black/40 border border-white/10 hover:border-brand-yellow-golden/50 hover:bg-[#16120E] text-brand-white hover:text-brand-yellow-golden transition-all group"
                        >
                          <div className="flex items-center gap-3 truncate">
                            <span className="text-xs font-mono font-bold text-brand-yellow-golden">{service.number}</span>
                            <span className="text-xs font-syne font-bold uppercase truncate">{service.name}</span>
                          </div>
                          <ArrowUpRight className="w-4 h-4 text-brand-yellow-golden/70 group-hover:text-brand-orange transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 ml-2" />
                        </a>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Other Items */}
              {items.slice(1).map((item, index) => {
                const isActive = currentPath.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between py-3 px-4 rounded-lg border ${
                        isActive
                          ? "text-brand-orange bg-brand-orange/10 font-bold border-brand-orange/40"
                          : "text-brand-white border-transparent hover:border-brand-orange/30 hover:bg-brand-orange/5"
                      } transition-all duration-200 min-h-[48px]`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-xs font-syne text-brand-orange/90 font-bold">0{index + 3}</span>
                        <span className="font-syne text-2xl xs:text-3xl font-extrabold tracking-wide uppercase">
                          {item.label}
                        </span>
                      </span>
                      <span className="text-sm font-syne text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Footer Details in Menu */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.3 }}
              className="border-t border-white/10 pt-6 flex flex-col space-y-4 flex-shrink-0"
            >
              <Link
                href="/contact"
                onClick={onClose}
                className="w-full bg-brand-orange py-4 text-center text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors min-h-[48px] flex items-center justify-center shadow-lg rounded-none"
              >
                CONTACT US →
              </Link>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[10px] font-syne tracking-micro text-brand-platinum/80 pt-1">
                <span>@fashai_universal</span>
                <Image
                  src="/assets/brand/Final_Powered_by_logo.png"
                  alt="Powered by Arav Innovation"
                  width={180}
                  height={47}
                  className="h-6 w-auto object-contain"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}

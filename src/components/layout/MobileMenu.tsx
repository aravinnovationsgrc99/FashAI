"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  currentPath: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  currentPath,
}: MobileMenuProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
        <div className="fixed inset-0 z-[100] lg:hidden flex flex-col">
          {/* Dark Translucent Backdrop Overlay with Heavy Blur (z-[100]) */}
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

          {/* Mobile Panel Content (z-[110]) */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-[110] flex flex-col justify-between h-full w-full bg-[#080808]/95 px-6 pt-6 pb-8 text-brand-off-white overflow-y-auto"
          >
            {/* Header Brand Lockup in Mobile Menu */}
            <div className="flex items-center justify-between border-b border-white/10 pb-5 pt-2 flex-shrink-0">
              <Link href="/" onClick={onClose} className="flex items-center gap-3 min-h-[44px]">
                <div className="relative w-8 h-8 flex-shrink-0 overflow-hidden rounded-md border border-brand-orange/40 bg-black shadow-lg">
                  <Image
                    src="/assets/brand/logo_transparent.png"
                    alt="FashAI Logo"
                    fill
                    priority
                    sizes="32px"
                    className="object-contain p-0.5"
                  />
                </div>
                <span className="font-syne text-base tracking-[0.16em] font-extrabold text-brand-white leading-snug">
                  FashAI Universal
                </span>
              </Link>

              {/* Close Button (z-[120]) */}
              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-brand-void border border-brand-orange/40 text-brand-white hover:text-brand-orange transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center z-[120]"
                aria-label="Close Navigation Menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col space-y-3 my-auto py-6 flex-shrink-0">
              {items.map((item, index) => {
                const isActive =
                  item.href === "/"
                    ? currentPath === "/"
                    : currentPath.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + index * 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={`group flex items-center justify-between py-3 px-4 rounded-lg border ${
                        isActive
                          ? "text-brand-orange bg-brand-orange/10 font-bold border-brand-orange/40"
                          : "text-brand-white border-transparent hover:border-brand-orange/30 hover:bg-brand-orange/5"
                      } transition-all duration-200`}
                    >
                      <span className="flex items-center gap-4">
                        <span className="text-xs font-syne text-brand-orange/90 font-bold">
                          0{index + 1}
                        </span>
                        <span className="font-syne text-2xl xs:text-3xl font-extrabold tracking-wide uppercase">
                          {item.label}
                        </span>
                      </span>
                      <span
                        className={`text-sm font-syne text-brand-orange ${
                          isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        } transition-opacity`}
                      >
                        →
                      </span>
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
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
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

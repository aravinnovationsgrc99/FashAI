"use client";

import { useEffect } from "react";
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
  // Prevent background scrolling when open
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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-brand-void/98 px-6 pt-safe pb-safe text-brand-off-white backdrop-blur-2xl lg:hidden min-h-[100dvh] w-full"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
            className="flex items-center justify-between border-b border-hairline-gold pb-4 pt-2"
          >
            <Link href="/" onClick={onClose} className="flex items-center min-h-[44px]">
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="Fashprism Internationals Logo"
                width={190}
                height={54}
                priority
                className="h-9 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-3 min-w-[44px] min-h-[44px] flex items-center justify-center text-brand-off-white hover:text-brand-gold transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </motion.div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-5 my-auto py-6">
            {items.map((item, index) => {
              const isActive =
                item.href === "/"
                  ? currentPath === "/"
                  : currentPath.startsWith(item.href);

              return (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + index * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between py-2 min-h-[44px] text-2xl xs:text-3xl sm:text-4xl font-serif-display ${
                      isActive ? "text-brand-orange font-medium" : "text-brand-white hover:text-brand-lemon"
                    } transition-colors duration-200`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-syne text-brand-orange/80 font-normal">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>
                    <span className={`text-xs font-syne text-brand-orange ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"} transition-opacity`}>
                      ↗
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Action CTA & Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="border-t border-hairline-orange pt-6 pb-4 flex flex-col space-y-4"
          >
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full bg-brand-orange py-4 text-center text-xs font-syne tracking-caps font-bold text-white hover:bg-[#ff6f2d] transition-colors min-h-[48px] flex items-center justify-center shadow-lg"
            >
              BE A PART ↗
            </Link>
            <div className="flex justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-1">
              <span>FASHPRISM INTERNATIONALS</span>
              <span className="text-brand-orange font-bold">DUBAI — PARIS</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




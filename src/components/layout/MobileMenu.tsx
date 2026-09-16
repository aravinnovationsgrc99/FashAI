"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  id: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
  activeSection: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  items,
  activeSection,
}: MobileMenuProps) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
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
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-brand-void/98 px-6 py-8 text-brand-off-white backdrop-blur-xl md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <span className="font-serif-display text-xl tracking-tight">FASHPRISM</span>
            <button
              onClick={onClose}
              className="p-2 text-brand-off-white hover:text-brand-orange transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-6 my-auto">
            {items.map((item, index) => {
              const isActive = activeSection === item.id;
              return (
                <motion.a
                  key={item.id}
                  href={item.href}
                  onClick={onClose}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                  className={`group flex items-center justify-between text-2xl font-serif-display ${
                    isActive ? "text-brand-orange" : "text-brand-off-white hover:text-brand-gold"
                  } transition-colors`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-xs font-syne text-brand-platinum">0{index + 1}</span>
                    {item.label}
                  </span>
                  <span className="text-xs font-syne text-brand-orange opacity-0 group-hover:opacity-100 transition-opacity">
                    ↗
                  </span>
                </motion.a>
              );
            })}
          </nav>

          {/* Bottom Action CTA */}
          <div className="border-t border-hairline pt-6 flex flex-col space-y-4">
            <a
              href="#accreditation"
              onClick={onClose}
              className="w-full bg-brand-orange py-4 text-center text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
            >
              BE A PART ↗
            </a>
            <div className="flex justify-between text-[10px] font-syne tracking-micro text-brand-platinum">
              <span>PARIS — DUBAI</span>
              <span>HAUTE COUTURE</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

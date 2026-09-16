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
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-brand-void/98 px-6 py-8 text-brand-off-white backdrop-blur-xl lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between border-b border-hairline pb-4">
            <Link href="/" onClick={onClose} className="flex items-center">
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="Fashprism Internationals Logo"
                width={180}
                height={50}
                priority
                className="h-8 w-auto object-contain"
              />
            </Link>
            <button
              onClick={onClose}
              className="p-2 text-brand-off-white hover:text-brand-gold transition-colors"
              aria-label="Close Navigation Menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col space-y-6 my-auto">
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
                  transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center justify-between text-3xl sm:text-4xl font-serif-display ${
                      isActive ? "text-brand-gold" : "text-brand-off-white hover:text-brand-gold"
                    } transition-colors`}
                  >
                    <span className="flex items-center gap-4">
                      <span className="text-xs font-syne text-brand-platinum font-normal">
                        0{index + 1}
                      </span>
                      {item.label}
                    </span>
                    <span className="text-xs font-syne text-brand-gold opacity-0 group-hover:opacity-100 transition-opacity">
                      ↗
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Bottom Action CTA */}
          <div className="border-t border-hairline pt-6 flex flex-col space-y-4">
            <Link
              href="/contact"
              onClick={onClose}
              className="w-full bg-brand-gold py-4 text-center text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors"
            >
              BE A PART ↗
            </Link>
            <div className="flex justify-between text-[10px] font-syne tracking-micro text-brand-platinum">
              <span>FASHPRISM INTERNATIONALS</span>
              <span className="text-brand-gold">PARIS — DUBAI</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}




"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen flex flex-col">
        {/* Subtle Gold Curtain Reveal Overlay */}
        <motion.div
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 1 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{ originY: 0 }}
          className="fixed inset-0 z-[90] bg-brand-void pointer-events-none border-b border-brand-gold/40"
        />
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="min-h-screen w-full">
        {/* Subtle Black + Gold Overlay Reveal on Route Transition */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[300] pointer-events-none bg-brand-void flex flex-col justify-between p-8"
        >
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />
          <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold to-transparent opacity-60" />
        </motion.div>

        {children}
      </motion.div>
    </AnimatePresence>
  );
}

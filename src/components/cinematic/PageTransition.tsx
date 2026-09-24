"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Reset scroll position to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    
    // Ensure body scroll is unlocked on navigation
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className="min-h-screen w-full"
    >
      {children}
    </motion.div>
  );
}

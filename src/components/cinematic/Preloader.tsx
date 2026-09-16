"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500);
          return 100;
        }
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 80);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-brand-void px-6 py-12 text-brand-off-white"
        >
          {/* Header Tag */}
          <div className="flex w-full justify-between text-xs font-syne tracking-micro text-brand-platinum border-b border-hairline pb-4">
            <span>FASHPRISM INTERNATIONALS</span>
            <span>DIGITAL ATELIER</span>
          </div>

          {/* Central Monogram / Title */}
          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light tracking-tight"
            >
              FASHPRISM
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-syne text-[10px] sm:text-xs tracking-caps text-brand-orange mt-2"
            >
              FASHION BEYOND BORDERS
            </motion.p>

            {/* Progress Bar & Percentage */}
            <div className="w-64 sm:w-80 mt-12">
              <div className="relative h-[1px] w-full bg-brand-charcoal-border">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-brand-orange"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between items-center mt-3 text-[10px] font-syne tracking-micro text-brand-platinum">
                <span>INITIALIZING DIGITAL ATELIER</span>
                <span className="text-brand-orange">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex w-full justify-between text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline">
            <span>PARIS — DUBAI</span>
            <span>HAUTE COUTURE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

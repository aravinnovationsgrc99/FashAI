"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
          <div className="flex w-full justify-between text-xs font-syne tracking-micro text-brand-platinum border-b border-hairline-orange pb-4 max-w-7xl">
            <span className="text-brand-orange font-bold">FASHPRISM INTERNATIONALS</span>
            <span>DIGITAL ATELIER</span>
          </div>

          {/* Central Logo & Progress */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4"
            >
              <Image
                src="/assets/brand/logo_transparent.png"
                alt="FashAI Universal Logo"
                width={360}
                height={100}
                priority
                className="h-20 sm:h-28 w-auto object-contain"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-syne text-[10px] sm:text-xs tracking-caps text-brand-orange mt-2 font-bold"
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
          <div className="flex w-full justify-between text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline max-w-7xl">
            <span>PARIS — DUBAI</span>
            <span>HAUTE COUTURE</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


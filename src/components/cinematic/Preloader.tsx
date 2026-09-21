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
          <div className="flex w-full justify-between items-center text-xs font-syne tracking-micro text-brand-platinum border-b border-hairline-orange pb-4 max-w-7xl">
            <span className="text-brand-orange font-bold">FASHAI UNIVERSAL</span>
            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 flex-shrink-0 overflow-hidden rounded-[2px] bg-black border border-brand-orange/40">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Arav Innovation Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-brand-yellow-golden font-bold uppercase">Powered by Arav Innovation</span>
            </div>
          </div>

          {/* Central Logo & Progress */}
          <div className="flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 flex flex-col items-center"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 mb-6 rounded-xl border border-brand-orange/40 bg-black shadow-[0_0_30px_rgba(241,94,28,0.3)] overflow-hidden">
                <Image
                  src="/assets/logo/main-logo.jpeg"
                  alt="FashAI Universal Official Logo"
                  fill
                  priority
                  sizes="(max-width: 640px) 80px, 112px"
                  className="object-cover"
                />
              </div>
              <h1 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-white tracking-widest uppercase">
                FASHAI UNIVERSAL
              </h1>
              <div className="flex items-center gap-2 mt-3">
                <div className="relative w-5 h-5 flex-shrink-0 overflow-hidden rounded-[2px] bg-black border border-brand-orange/40">
                  <Image
                    src="/assets/brand/PoweredByAravInnovation.jpeg"
                    alt="Arav Innovation Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="font-syne text-xs sm:text-sm tracking-[0.2em] text-brand-yellow-golden font-bold uppercase">
                  Powered by Arav Innovation
                </p>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-syne text-[10px] sm:text-xs tracking-caps text-brand-orange mt-2 font-bold uppercase"
            >
              FASHION × AI × EXPERIENCE
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
                <span>INITIALIZING SYSTEM</span>
                <span className="text-brand-orange font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Footer Metadata */}
          <div className="flex w-full justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline-orange/40 max-w-7xl">
            <span>FASHAI UNIVERSAL</span>
            <div className="flex items-center gap-1.5">
              <div className="relative w-3.5 h-3.5 flex-shrink-0 overflow-hidden rounded-[2px] bg-black border border-brand-orange/40">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Arav Innovation Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-brand-orange font-bold uppercase">POWERED BY ARAV INNOVATION</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


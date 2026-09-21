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
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-brand-void px-6 py-12 text-brand-off-white overflow-hidden"
        >
          {/* Subtle Ambient Radial Glow in Preloader */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 blur-[150px] pointer-events-none rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/10 blur-[140px] pointer-events-none rounded-full" />

          {/* Header Tag */}
          <div className="relative z-10 flex w-full justify-between items-center text-xs font-syne tracking-micro text-brand-platinum border-b border-hairline-orange pb-4 max-w-7xl">
            <span className="text-brand-orange font-bold uppercase tracking-widest">FASHAI UNIVERSAL</span>
            <Image
              src="/assets/brand/PoweredByAravInnovation.jpeg"
              alt="Powered by Arav Innovation"
              width={180}
              height={47}
              priority
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>

          {/* Central Logo & Progress */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="mb-4 flex flex-col items-center"
            >
              <div className="relative w-20 h-20 sm:w-28 sm:h-28 mb-6 rounded-xl border border-brand-orange/40 bg-black shadow-[0_0_40px_rgba(241,94,28,0.35)] overflow-hidden">
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

              {/* Official Powered by Arav Innovation Logo Image Badge */}
              <div className="mt-4 flex items-center justify-center">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={260}
                  height={68}
                  priority
                  className="h-9 sm:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(241,94,28,0.25)] hover:scale-105 transition-transform"
                />
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
            <div className="w-64 sm:w-80 mt-10">
              <div className="relative h-[1px] w-full bg-brand-charcoal-border">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-brand-orange shadow-[0_0_12px_#F15E1C]"
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
          <div className="relative z-10 flex w-full justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline-orange/40 max-w-7xl">
            <span>FASHAI UNIVERSAL</span>
            <Image
              src="/assets/brand/PoweredByAravInnovation.jpeg"
              alt="Powered by Arav Innovation"
              width={180}
              height={47}
              priority
              className="h-6 sm:h-7 w-auto object-contain"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


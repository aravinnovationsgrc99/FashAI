"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldRender, setShouldRender] = useState(true);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    // 1. Session Persistence Check: Only run full cinematic preloader once per browsing session
    try {
      const alreadyShown = sessionStorage.getItem("fashai_preloader_shown");
      if (alreadyShown === "true") {
        setIsLoading(false);
        setShouldRender(false);
        return;
      }
    } catch {
      // Safe fallback if sessionStorage is disabled
    }

    // 2. Lock body scroll during preloader display
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    // 3. Smooth non-linear progress progression (~3.2s total duration)
    const startTime = Date.now();
    const duration = 3200; // Target duration in ms

    const updateProgress = () => {
      if (hasCompletedRef.current) return;

      const elapsed = Date.now() - startTime;
      const rawRatio = Math.min(elapsed / duration, 1);

      // Easing curve: Slow start (0-20%), steady middle (20-70%), smooth finish (70-100%)
      let easedProgress = 0;
      if (rawRatio < 0.2) {
        easedProgress = (rawRatio / 0.2) * 20 * 0.9;
      } else if (rawRatio < 0.7) {
        easedProgress = 18 + ((rawRatio - 0.2) / 0.5) * 52;
      } else if (rawRatio < 0.95) {
        easedProgress = 70 + ((rawRatio - 0.7) / 0.25) * 25;
      } else {
        easedProgress = 95 + ((rawRatio - 0.95) / 0.05) * 5;
      }

      const currentPercent = Math.min(Math.round(easedProgress), 100);
      setProgress(currentPercent);

      if (rawRatio < 1 && currentPercent < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // Complete sequence
        finishLoading();
      }
    };

    const animFrame = requestAnimationFrame(updateProgress);

    // 4. Hard Safety Timeout Maximum (4.8s limit guarantees user is never stuck)
    const hardTimeout = setTimeout(() => {
      finishLoading();
    }, 4800);

    const finishLoading = () => {
      if (hasCompletedRef.current) return;
      hasCompletedRef.current = true;
      setProgress(100);

      // Brief hold at 100% completed state (300ms) before smooth reveal
      setTimeout(() => {
        setIsLoading(false);

        // Restore normal page scrolling
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";

        // Record in sessionStorage
        try {
          sessionStorage.setItem("fashai_preloader_shown", "true");
        } catch {
          // ignore
        }

        // Unmount after reveal animation ends
        setTimeout(() => {
          setShouldRender(false);
        }, 800);
      }, 300);
    };

    return () => {
      cancelAnimationFrame(animFrame);
      clearTimeout(hardTimeout);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -20,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-between bg-[#050505] px-6 py-12 text-brand-off-white overflow-hidden select-none"
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="FashAI Universal Loading Experience"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-orange/10 blur-[160px] pointer-events-none rounded-full" />
          <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-brand-green/8 blur-[150px] pointer-events-none rounded-full" />

          {/* Top Tag Bar */}
          <div className="relative z-10 flex w-full justify-between items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum/70 border-b border-white/10 pb-4 max-w-7xl">
            <span className="text-brand-orange font-bold uppercase tracking-widest">
              FASHAI UNIVERSAL
            </span>
            <span>DUBAI · 2026</span>
          </div>

          {/* Central Logo Lockup & Progress Bar */}
          <div className="relative z-10 flex flex-col items-center text-center my-auto w-full max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center mb-8"
            >
              {/* Official FashAI Logo Mark Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-5 overflow-hidden rounded-xl border border-brand-orange/40 bg-black shadow-[0_0_35px_rgba(241,94,28,0.3)] p-2">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Universal Official Logo"
                  fill
                  priority
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              {/* Main Brand Title */}
              <h1 className="font-serif-display text-3xl sm:text-4xl font-light text-brand-white tracking-widest uppercase mb-2">
                FASHAI UNIVERSAL
              </h1>

              {/* Supporting Entity Lockup */}
              <div className="flex items-center justify-center gap-2 pt-1">
                <span className="font-syne text-[10px] sm:text-xs tracking-widest text-brand-platinum/70 uppercase">
                  POWERED BY
                </span>
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={220}
                  height={58}
                  priority
                  className="h-6 sm:h-7 w-auto object-contain"
                />
              </div>
            </motion.div>

            {/* Smooth Progress Track & Counter */}
            <div className="w-full max-w-xs sm:max-w-sm px-2">
              <div className="relative h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-brand-orange shadow-[0_0_15px_#F15E1C]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="flex justify-between items-center mt-3 text-[10px] sm:text-xs font-syne tracking-micro text-brand-platinum">
                <span className="text-brand-platinum/80 uppercase">
                  ENTERING FASHAI UNIVERSAL
                </span>
                <span className="text-brand-orange font-bold text-xs sm:text-sm">
                  {progress}%
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="relative z-10 flex w-full justify-between items-center text-[10px] font-syne tracking-micro text-brand-platinum/60 pt-4 border-t border-white/10 max-w-7xl">
            <span>FASHION × AI × EXPERIENCE</span>
            <span>POWERED BY ARAV INNOVATION</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

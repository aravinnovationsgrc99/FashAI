"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Elegant fast initial loader that clears quickly (300ms) without fake counter or stuck states
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 350);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-brand-void px-6 py-12 text-brand-off-white overflow-hidden select-none pointer-events-none"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-orange/15 blur-[140px] pointer-events-none rounded-full" />

          {/* Central Logo Lockup */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-4 overflow-hidden rounded-xl border border-brand-orange/40 bg-black shadow-[0_0_30px_rgba(241,94,28,0.3)] p-2">
                <Image
                  src="/assets/brand/logo_transparent.png"
                  alt="FashAI Universal Logo"
                  fill
                  priority
                  sizes="96px"
                  className="object-contain"
                />
              </div>

              <h1 className="font-serif-display text-2xl sm:text-3xl font-light text-brand-white tracking-widest uppercase mb-2">
                FASHAI UNIVERSAL
              </h1>

              {/* Official Arav Innovation Logo Badge Image */}
              <div className="mt-1 flex items-center justify-center">
                <Image
                  src="/assets/brand/PoweredByAravInnovation.jpeg"
                  alt="Powered by Arav Innovation"
                  width={200}
                  height={52}
                  priority
                  className="h-7 sm:h-8 w-auto object-contain"
                />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

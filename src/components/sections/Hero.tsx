"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Enforce strict 0s -> 7.9s smooth looping boundary
  const handleTimeUpdate = () => {
    if (videoRef.current && videoRef.current.currentTime >= 7.9) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  }, []);

  return (
    <section className="relative min-h-[100vh] min-h-[100svh] w-full flex flex-col justify-between pt-24 sm:pt-28 pb-6 px-4 sm:px-8 lg:px-12 overflow-hidden bg-black text-brand-white">
      
      {/* LAYER 1: Full-Screen Crisp Background Video (No CSS Blur, Exactly 8.2s Loop) */}
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          loop
          preload="auto"
          poster="/assets/models/model_01.jpeg"
          onTimeUpdate={handleTimeUpdate}
          onError={() => setVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover object-center scale-[1.05] origin-center z-0 pointer-events-none select-none"
        >
          <source src="/videos/homepage-main.mp4" type="video/mp4" />
        </video>
      ) : (
        /* Fallback Background Image */
        <Image
          src="/assets/models/model_01.jpeg"
          alt="FashAI Universal Background"
          fill
          priority
          className="absolute inset-0 w-full h-full object-cover object-center z-0 pointer-events-none"
        />
      )}

      {/* LAYER 2: Readability Gradients (Video remains sharp & visible) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 pointer-events-none z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black/70 via-transparent to-transparent pointer-events-none z-[1]" />

      {/* LAYER 3: Main Centered Editorial Composition (Z-10) */}
      <div className="relative z-10 my-auto container-editorial py-6 sm:py-8 flex flex-col items-center justify-center text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.1 }
            }
          }}
          className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto space-y-6 sm:space-y-8"
        >
          {/* Main Headline Typography: FASHAI Universal */}
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 28 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="font-serif-display leading-[0.88] tracking-tight select-none flex flex-col items-center justify-center w-full"
          >
            <span className="block text-7xl sm:text-8xl md:text-9xl xl:text-[10.5rem] font-serif font-light text-brand-white uppercase tracking-tight drop-shadow-[0_12px_35px_rgba(0,0,0,0.9)]">
              FASHAI
            </span>
            <span className="block text-5xl sm:text-7xl md:text-8xl xl:text-[8.5rem] font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow-golden via-[#FFF494] to-brand-yellow-golden -mt-3 sm:-mt-6 md:-mt-8 xl:-mt-10 tracking-normal drop-shadow-[0_0_25px_rgba(250,182,10,0.4)]">
              Universal
            </span>
          </motion.h1>

          {/* Powered by Arav Innovation Lockup (BIGGER LOGO) */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4.5 bg-black/65 backdrop-blur-xl border-2 border-brand-yellow-golden/60 rounded-full shadow-[0_0_35px_rgba(250,182,10,0.3)] group hover:border-brand-yellow-golden hover:shadow-[0_0_45px_rgba(250,182,10,0.5)] hover:scale-[1.03] transition-all duration-300 my-2"
          >
            <Image
              src="/assets/brand/Final_Powered_by_logo.png"
              alt="Powered by Arav Innovation"
              width={340}
              height={90}
              priority
              className="h-9 sm:h-12 md:h-14 lg:h-16 w-auto object-contain brightness-110 contrast-105 filter drop-shadow-[0_0_15px_rgba(250,182,10,0.3)]"
            />
          </motion.div>

          {/* Centered Action CTAs */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } }
            }}
            style={{ willChange: "transform, opacity" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto pt-2"
          >
            <Link
              href="/projects"
              className="w-full sm:w-auto min-w-[220px] bg-gradient-to-r from-brand-yellow-golden via-[#FFE853] to-brand-yellow-golden px-9 py-4.5 text-xs sm:text-sm font-syne tracking-caps font-extrabold text-black hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 text-center min-h-[52px] flex items-center justify-center rounded-none shadow-[0_0_30px_rgba(250,182,10,0.45)] hover:shadow-[0_0_40px_rgba(250,182,10,0.65)]"
              data-cursor="explore"
            >
              EXPLORE FASHAI →
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto min-w-[220px] border-2 border-brand-yellow-golden/70 bg-black/70 backdrop-blur-md px-9 py-4.5 text-xs sm:text-sm font-syne tracking-caps font-extrabold text-brand-white hover:bg-brand-yellow-golden/20 hover:border-brand-yellow-golden hover:scale-[1.04] active:scale-[0.98] transition-all duration-300 text-center min-h-[52px] flex items-center justify-center rounded-none shadow-[0_0_20px_rgba(0,0,0,0.5)]"
              data-cursor="view"
            >
              GET INVOLVED ↗
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* LAYER 4: Subtle Editorial Right-Side Stack (Desktop Only) */}
      <div className="hidden lg:flex absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 flex-col items-end space-y-3 text-right z-10 pointer-events-none opacity-50 select-none">
        <span className="text-[11px] font-syne tracking-widest text-brand-white uppercase font-bold hover:text-brand-yellow-golden transition-colors">PEOPLE</span>
        <span className="text-[11px] font-syne tracking-widest text-brand-white uppercase font-bold hover:text-brand-yellow-golden transition-colors">FASHION</span>
        <span className="text-[11px] font-syne tracking-widest text-brand-white uppercase font-bold hover:text-brand-yellow-golden transition-colors">IDEAS</span>
        <span className="text-[11px] font-syne tracking-widest text-brand-white uppercase font-bold hover:text-brand-yellow-golden transition-colors">EXPERIENCES</span>
        <span className="w-10 h-[2px] bg-gradient-to-r from-transparent to-brand-yellow-golden/80 mt-1" />
      </div>

      {/* LAYER 5: Bottom Editorial Details */}
      <div className="relative z-10 container-editorial flex flex-row justify-between items-center text-[10px] sm:text-xs font-syne tracking-micro text-brand-white/90 pt-4 border-t border-white/15">
        {/* Bottom Left: DUBAI 2026 */}
        <div className="flex items-center gap-2.5 font-bold uppercase tracking-widest text-brand-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="h-4 w-[2px] bg-brand-yellow-golden shadow-[0_0_10px_rgba(250,182,10,0.8)]" />
          <span>DUBAI <span className="text-brand-yellow-golden font-bold">2026</span></span>
        </div>

        {/* Bottom Right: Scroll Cue */}
        <div className="flex items-center gap-2 font-bold uppercase tracking-widest text-brand-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          <span className="hover:text-brand-yellow-golden transition-colors">SCROLL TO EXPLORE ↓</span>
        </div>
      </div>
    </section>
  );
}

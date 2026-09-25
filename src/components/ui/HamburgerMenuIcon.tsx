"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface HamburgerMenuIconProps {
  isOpen: boolean;
  className?: string;
}

/**
 * Reusable HamburgerMenuIcon Component
 * Morphing 3-bar hamburger icon to 'X' close icon driven by Framer Motion.
 * Integrates cleanly with header nav and respects accessibility/reduced-motion settings.
 */
export default function HamburgerMenuIcon({
  isOpen,
  className = "",
}: HamburgerMenuIconProps) {
  const shouldReduceMotion = useReducedMotion();

  const transition = shouldReduceMotion
    ? { duration: 0.15 }
    : { type: "spring", duration: 0.3, bounce: 0 };

  return (
    <div
      className={`relative flex items-center justify-center w-5 h-5 pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Top Bar */}
      <motion.span
        className="absolute w-4.5 h-[2px] bg-current rounded-full origin-center"
        initial={false}
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 0 : -6,
        }}
        transition={transition}
      />

      {/* Middle Bar */}
      <motion.span
        className="absolute w-4.5 h-[2px] bg-current rounded-full origin-center"
        initial={false}
        animate={{
          opacity: isOpen ? 0 : 1,
          scaleX: isOpen ? 0.3 : 1,
        }}
        transition={transition}
      />

      {/* Bottom Bar */}
      <motion.span
        className="absolute w-4.5 h-[2px] bg-current rounded-full origin-center"
        initial={false}
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? 0 : 6,
        }}
        transition={transition}
      />
    </div>
  );
}

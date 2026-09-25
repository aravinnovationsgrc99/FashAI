"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

interface GradientFlowTextProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "gold";
  className?: string;
}

/**
 * GradientFlowText Component
 * Continuously sweeps a refined FashAI metallic gold gradient across text.
 * Uses Framer Motion to animate backgroundPosition from 0% -> 200% infinitely over 2 seconds.
 */
export default function GradientFlowText({
  children,
  variant = "gold",
  className = "",
}: GradientFlowTextProps) {
  const shouldReduceMotion = useReducedMotion();

  // FashAI Palette Gradients:
  // Primary (for Gold CTA Button): Rich dark obsidian to gold-tinted metallic dark to obsidian
  // Secondary / Gold (for Dark Glass CTA Button): FashAI Gold (#D4AF37) -> Lemon (#FFEC69) -> Peach (#F7D7B0) -> FashAI Gold (#D4AF37)
  const gradientStyle =
    variant === "primary"
      ? "linear-gradient(90deg, #080706 0%, #4D3B0C 25%, #1A1405 50%, #4D3B0C 75%, #080706 100%)"
      : "linear-gradient(90deg, #D4AF37 0%, #FFEC69 25%, #F7D7B0 50%, #FFEC69 75%, #D4AF37 100%)";

  if (shouldReduceMotion) {
    return (
      <span
        className={`inline-block font-bold ${
          variant === "primary" ? "text-[#080706]" : "text-[#D4AF37]"
        } ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-block bg-clip-text text-transparent select-none ${className}`}
      style={{
        backgroundImage: gradientStyle,
        backgroundSize: "200% auto",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      animate={{
        backgroundPosition: ["0% center", "200% center"],
      }}
      transition={{
        duration: 2,
        ease: "linear",
        repeat: Infinity,
      }}
    >
      {children}
    </motion.span>
  );
}

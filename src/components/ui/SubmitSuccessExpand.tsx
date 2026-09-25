"use client";

import React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface SubmitSuccessExpandProps {
  show: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * SubmitSuccessExpand Component
 * Reusable animation container that smoothly expands form success states into view
 * (height: 0 -> auto, opacity: 0 -> 1 over 300ms ease-out) after successful submission.
 */
export default function SubmitSuccessExpand({
  show,
  children,
  className = "",
}: SubmitSuccessExpandProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div
          key="submit-success-expand"
          role="status"
          aria-live="polite"
          initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
          animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

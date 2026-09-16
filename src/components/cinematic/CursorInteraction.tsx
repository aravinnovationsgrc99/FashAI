"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorInteraction() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<"default" | "hover" | "view" | "explore">("default");
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouch(window.matchMedia("(pointer: coarse)").matches);
    };
    checkTouch();
    window.addEventListener("resize", checkTouch);

    if (isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorAttr = target.getAttribute("data-cursor");
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive");

      if (cursorAttr === "view" || target.closest("[data-cursor='view']")) {
        setCursorType("view");
      } else if (cursorAttr === "explore" || target.closest("[data-cursor='explore']")) {
        setCursorType("explore");
      } else if (isInteractive) {
        setCursorType("hover");
      } else {
        setCursorType("default");
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", checkTouch);
    };
  }, [isVisible, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[999] flex items-center justify-center"
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: "spring",
        damping: 28,
        stiffness: 350,
        mass: 0.2,
      }}
      style={{
        transform: "translate(-50%, -50%)",
      }}
    >
      {cursorType === "default" && (
        <motion.div
          className="h-2 w-2 bg-brand-orange"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
        />
      )}

      {cursorType === "hover" && (
        <motion.div
          className="h-8 w-8 border border-brand-gold bg-brand-orange/20"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
        />
      )}

      {cursorType === "view" && (
        <motion.div
          className="flex h-16 w-16 items-center justify-center border border-brand-orange bg-brand-void/90 text-[10px] font-syne tracking-micro text-brand-off-white shadow-2xl"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
        >
          VIEW ↗
        </motion.div>
      )}

      {cursorType === "explore" && (
        <motion.div
          className="flex h-20 w-20 items-center justify-center border border-brand-gold bg-brand-orange/90 text-[10px] font-syne tracking-micro text-brand-void font-bold shadow-2xl"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.5 }}
        >
          EXPLORE ↗
        </motion.div>
      )}
    </motion.div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";

/**
 * Custom hook to detect when an element scrolls into the viewport using IntersectionObserver.
 * Triggers a one-time reveal state when the element reaches the specified visibility threshold (default 35%).
 */
export function useViewportReveal(threshold: number = 0.35) {
  const [isRevealed, setIsRevealed] = useState(false);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // If reduced motion is preferred, reveal immediately
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsRevealed(true);
      return;
    }

    const element = elementRef.current;
    if (!element) return;

    // Check if element is already in viewport on initial mount
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return { elementRef, isRevealed };
}

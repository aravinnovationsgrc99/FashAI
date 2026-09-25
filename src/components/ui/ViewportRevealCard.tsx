"use client";

import React from "react";
import { useViewportReveal } from "@/hooks/useViewportReveal";

interface ViewportRevealCardProps {
  children: (isRevealed: boolean) => React.ReactNode;
  className?: string;
  threshold?: number;
}

/**
 * ViewportRevealCard Component
 * Wraps image cards and provides a viewport visibility state (isRevealed)
 * powered by native IntersectionObserver. Automatically transitions blurred images
 * to sharp/clear as they scroll into view on mobile, tablet, and desktop touch screens.
 */
export default function ViewportRevealCard({
  children,
  className = "",
  threshold = 0.35,
}: ViewportRevealCardProps) {
  const { elementRef, isRevealed } = useViewportReveal(threshold);

  return (
    <div ref={elementRef} className={className}>
      {children(isRevealed)}
    </div>
  );
}

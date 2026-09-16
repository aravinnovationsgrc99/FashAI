"use client";

import { useEffect, useState } from "react";

interface CountdownProps {
  targetDate?: string; // ISO String e.g. "2026-11-15T18:00:00Z"
}

export default function Countdown({ targetDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    if (!targetDate) return;

    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft(null);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  if (!targetDate || !timeLeft) {
    return (
      <div className="inline-flex items-center gap-4 border border-brand-orange/40 bg-brand-void/80 px-6 py-4">
        <span className="h-2 w-2 bg-brand-orange animate-ping" />
        <span className="font-syne text-xs tracking-micro text-brand-gold font-bold">
          STATUS: NEXT CHAPTER / 2026 DUBAI
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-4 max-w-lg border border-hairline p-6 bg-brand-void/90">
      <div className="text-center border-r border-hairline pr-2">
        <div className="font-serif-display text-3xl sm:text-4xl text-brand-orange">
          {String(timeLeft.days).padStart(2, "0")}
        </div>
        <div className="font-syne text-[9px] tracking-micro text-brand-platinum mt-1">
          DAYS
        </div>
      </div>

      <div className="text-center border-r border-hairline pr-2">
        <div className="font-serif-display text-3xl sm:text-4xl text-brand-off-white">
          {String(timeLeft.hours).padStart(2, "0")}
        </div>
        <div className="font-syne text-[9px] tracking-micro text-brand-platinum mt-1">
          HOURS
        </div>
      </div>

      <div className="text-center border-r border-hairline pr-2">
        <div className="font-serif-display text-3xl sm:text-4xl text-brand-off-white">
          {String(timeLeft.minutes).padStart(2, "0")}
        </div>
        <div className="font-syne text-[9px] tracking-micro text-brand-platinum mt-1">
          MINS
        </div>
      </div>

      <div className="text-center">
        <div className="font-serif-display text-3xl sm:text-4xl text-brand-gold">
          {String(timeLeft.seconds).padStart(2, "0")}
        </div>
        <div className="font-syne text-[9px] tracking-micro text-brand-platinum mt-1">
          SECS
        </div>
      </div>
    </div>
  );
}

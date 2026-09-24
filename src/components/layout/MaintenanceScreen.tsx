"use client";

import Link from "next/link";
import Image from "next/image";
import { Wrench, ShieldAlert } from "lucide-react";

interface MaintenanceScreenProps {
  title?: string;
  message?: string;
}

export default function MaintenanceScreen({
  title = "WEBSITE TEMPORARILY UNAVAILABLE",
  message = "FashAI Universal is currently undergoing scheduled platform maintenance. Public access will resume shortly.",
}: MaintenanceScreenProps) {
  return (
    <div className="min-h-screen w-full bg-[#050505] text-white flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#F15E1C]/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto space-y-6">
        {/* Brand Logo */}
        <div className="flex justify-center mb-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20">
            <Image
              src="/assets/brand/logo_transparent.png"
              alt="FashAI Universal Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* Maintenance Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FAB60A]/15 border border-[#FAB60A]/30 text-[#FAB60A] text-xs font-syne font-bold uppercase tracking-[0.2em]">
          <Wrench className="w-3.5 h-3.5 animate-bounce" />
          <span>SCHEDULED MAINTENANCE</span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif-display text-3xl sm:text-5xl font-light uppercase tracking-tight text-white leading-tight">
          {title}
        </h1>

        {/* Custom Message */}
        <p className="font-sans text-sm sm:text-base text-white/80 max-w-lg mx-auto leading-relaxed">
          {message}
        </p>

        {/* Additional Note */}
        <div className="pt-4 border-t border-white/10 max-w-md mx-auto flex items-center justify-center gap-2 text-xs font-syne text-white/60">
          <ShieldAlert className="w-4 h-4 text-[#F15E1C]" />
          <span>All system data &amp; application records remain securely preserved.</span>
        </div>

        {/* Admin Portal Access Link */}
        <div className="pt-6">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase tracking-wider text-[#FAB60A] hover:underline"
          >
            <span>MASTER ADMIN PORTAL →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface NodeItem {
  id: string;
  label: string;
  category: string;
  description: string;
  angle: number; // for circular arrangement on desktop
}

const ECOSYSTEM_NODES: NodeItem[] = [
  {
    id: "design",
    label: "DESIGN ATELIERS",
    category: "COUTURE",
    description: "Couture houses, independent fashion designers, and apparel ateliers.",
    angle: 0,
  },
  {
    id: "talent",
    label: "CREATIVE TALENT",
    category: "CREATIVE NETWORK",
    description: "Models, makeup artists, stylists, choreographers, and creators.",
    angle: 45,
  },
  {
    id: "brands",
    label: "BRAND HOUSES",
    category: "SPONSORS & LUXURY",
    description: "Global luxury brands, apparel sponsors, and lifestyle partners.",
    angle: 90,
  },
  {
    id: "events",
    label: "EVENT PRODUCTIONS",
    category: "SHOWCASE & RUNWAY",
    description: "Runway showcases, stage presentations, and production teams.",
    angle: 135,
  },
  {
    id: "media",
    label: "MEDIA & JOURNALISM",
    category: "PRESS & COMMENTARY",
    description: "Fashion journalists, publication editors, and commentary creators.",
    angle: 180,
  },
  {
    id: "corporate",
    label: "CORPORATE TEAMS",
    category: "ENTERPRISE",
    description: "Enterprise organizations collaborating on galas, launches, and summits.",
    angle: 225,
  },
  {
    id: "lifestyle",
    label: "LIFESTYLE PARTNERS",
    category: "EXPERIENCE",
    description: "Hospitality groups, luxury venues, and VIP curation teams.",
    angle: 270,
  },
  {
    id: "technology",
    label: "TECHNOLOGY & IT",
    category: "COMPUTATIONAL FASHION",
    description: "Technology platforms, digital forums, and computational fashion.",
    angle: 315,
  },
];

export default function WithWhomWeWorkSection() {
  const [activeNode, setActiveNode] = useState<NodeItem | null>(ECOSYSTEM_NODES[0]);

  return (
    <section id="ecosystem" className="relative py-24 sm:py-36 bg-black border-b border-white/10 text-brand-white overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute bottom-1/3 right-1/4 w-[550px] h-[550px] bg-brand-yellow-golden/5 blur-[200px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5 text-brand-yellow-golden" />
              <span>THE PROFESSIONAL ARCHITECTURE</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-[0.95]">
              THE ECOSYSTEM <br />
              <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">Behind The</span> Experience
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-brand-platinum/90 max-w-lg font-light leading-relaxed">
            From independent creative talent to brands, production teams and organizations, FashAI Universal develops experiences around the people and disciplines that make them possible.
          </p>
        </div>

        {/* EDITORIAL ECOSYSTEM DIAGRAM (NO CARDS / NO Saas GRIDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-4">
          {/* Left Details Info Panel */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 bg-[#090807] border border-brand-yellow-golden/40 rounded-3xl space-y-4 shadow-2xl">
              <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase px-3 py-1 bg-brand-yellow-golden/10 rounded-full border border-brand-yellow-golden/30 inline-block">
                {activeNode?.category || "ECOSYSTEM NODE"}
              </span>

              <h3 className="font-serif-display text-2xl sm:text-3xl font-light text-white uppercase">
                {activeNode?.label || "FASHAI UNIVERSAL CORE"}
              </h3>

              <p className="font-sans text-xs sm:text-sm text-brand-platinum/85 font-light leading-relaxed">
                {activeNode?.description ||
                  "Connecting design, talent, media, production, and luxury brand partners within one seamless platform architecture."}
              </p>

              <div className="pt-2 border-t border-white/10 text-[10px] font-syne tracking-wider text-brand-platinum/50 uppercase">
                Hover or select an ecosystem node to explore connections
              </div>
            </div>
          </div>

          {/* Right Diagram Visualization Canvas */}
          <div className="lg:col-span-8 relative flex items-center justify-center min-h-[440px] sm:min-h-[500px]">
            {/* Concentric Subtle Gold Orbital Lines */}
            <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] border border-brand-yellow-golden/15 rounded-full pointer-events-none" />
            <div className="absolute w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] border border-brand-yellow-golden/10 rounded-full pointer-events-none" />

            {/* Central Core Identity */}
            <div className="relative z-20 w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-black border-2 border-brand-yellow-golden p-4 flex flex-col items-center justify-center text-center shadow-[0_0_50px_rgba(250,182,10,0.25)]">
              <span className="font-serif-display text-base sm:text-xl font-light tracking-wider text-white uppercase leading-none">
                FashAI
              </span>
              <span className="font-serif italic font-normal text-xs sm:text-sm text-brand-yellow-golden">
                Universal
              </span>
              <span className="text-[9px] font-syne tracking-micro text-white/50 uppercase mt-1">
                CORE HUB
              </span>
            </div>

            {/* Floating Diagram Nodes (Desktop & Tablet) */}
            <div className="hidden sm:block absolute inset-0">
              {ECOSYSTEM_NODES.map((node, idx) => {
                const isActive = activeNode?.id === node.id;
                // Calculate position around 360 degrees circle
                const radius = 180; // px
                const rad = (node.angle * Math.PI) / 180;
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                return (
                  <div
                    key={node.id}
                    onMouseEnter={() => setActiveNode(node)}
                    onClick={() => setActiveNode(node)}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    className="absolute top-1/2 left-1/2 cursor-pointer group z-30 transition-all duration-300"
                  >
                    {/* Thin Connector Line to Center */}
                    <svg
                      className="absolute pointer-events-none overflow-visible z-10"
                      style={{
                        width: `${Math.abs(x)}px`,
                        height: `${Math.abs(y)}px`,
                        left: x > 0 ? `-${x}px` : "50%",
                        top: y > 0 ? `-${y}px` : "50%",
                      }}
                    >
                      <line
                        x1={x > 0 ? 0 : Math.abs(x)}
                        y1={y > 0 ? 0 : Math.abs(y)}
                        x2={x > 0 ? Math.abs(x) : 0}
                        y2={y > 0 ? Math.abs(y) : 0}
                        stroke={isActive ? "#FAB60A" : "rgba(255,255,255,0.15)"}
                        strokeWidth={isActive ? "1.5" : "1"}
                        strokeDasharray={isActive ? "none" : "3 3"}
                      />
                    </svg>

                    {/* Node Element */}
                    <div
                      className={`px-3.5 py-2 rounded-full border text-[10px] font-syne tracking-wider font-bold uppercase transition-all duration-300 flex items-center gap-2 backdrop-blur-md ${
                        isActive
                          ? "bg-brand-yellow-golden text-black border-brand-yellow-golden shadow-[0_0_20px_rgba(250,182,10,0.5)] scale-105"
                          : "bg-black/90 text-white/80 border-white/20 hover:border-brand-yellow-golden/60 hover:text-white"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          isActive ? "bg-black animate-pulse" : "bg-brand-yellow-golden"
                        }`}
                      />
                      <span>{node.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Mobile Vertical Flowing Diagram List (No Stacked Cards) */}
            <div className="sm:hidden w-full space-y-3 pt-6 relative z-30">
              <div className="text-center font-syne text-[10px] tracking-micro text-brand-yellow-golden font-bold uppercase mb-2">
                ECOSYSTEM NODES ↓
              </div>
              {ECOSYSTEM_NODES.map((node) => {
                const isActive = activeNode?.id === node.id;
                return (
                  <div
                    key={node.id}
                    onClick={() => setActiveNode(node)}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      isActive
                        ? "bg-brand-yellow-golden/10 border-brand-yellow-golden text-white"
                        : "bg-[#090807] border-white/10 text-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-serif-display text-sm font-light uppercase">
                        {node.label}
                      </span>
                      <span className="text-[9px] font-syne text-brand-yellow-golden font-bold uppercase">
                        {node.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

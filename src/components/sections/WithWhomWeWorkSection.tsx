"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, Compass } from "lucide-react";

export interface ConstellationNode {
  id: string;
  label: string;
  category: string;
  description: string;
  metadata: string[];
  image: string;
  angle: number; // orbital angle in degrees
  radiusScale?: number; // minor offset for asymmetric organic feel
}

const CONSTELLATION_NODES: ConstellationNode[] = [
  {
    id: "design",
    label: "DESIGN",
    category: "COUTURE & ATELIER",
    description:
      "Creative direction begins with an idea — from emerging designers and couture houses to the visual language of a complete fashion experience.",
    metadata: ["COUTURE", "DESIGN DIRECTION", "SHOWCASE", "COLLABORATION"],
    image: "/assets/master/designer/designer_01.png",
    angle: 0,
    radiusScale: 1.02,
  },
  {
    id: "talent",
    label: "TALENT",
    category: "RUNWAY & EDITORIAL",
    description:
      "Runway talent, models and creative personalities become part of productions designed around presence, movement and visual identity.",
    metadata: ["RUNWAY", "EDITORIAL", "CAMPAIGNS", "CASTING"],
    image: "/assets/master/models/model_01.png",
    angle: 36,
    radiusScale: 0.95,
  },
  {
    id: "styling",
    label: "STYLING",
    category: "WARDROBE DIRECTION",
    description:
      "Styling shapes the visual identity of a production — from wardrobe direction to the final runway look.",
    metadata: ["WARDROBE", "EDITORIAL", "RUNWAY", "CAMPAIGNS"],
    image: "/assets/master/stylist/stylist_01.png",
    angle: 72,
    radiusScale: 1.05,
  },
  {
    id: "beauty",
    label: "BEAUTY",
    category: "BACKSTAGE ARTISTRY",
    description:
      "Makeup, hair and beauty direction complete the visual language of a fashion experience.",
    metadata: ["BEAUTY", "EDITORIAL", "BACKSTAGE", "CAMPAIGNS"],
    image: "/assets/master/makeup/makeup_01.png",
    angle: 108,
    radiusScale: 0.98,
  },
  {
    id: "movement",
    label: "MOVEMENT",
    category: "CHOREOGRAPHY & STAGE",
    description:
      "Choreography transforms a runway into a performance, shaping pace, movement, formations and audience experience.",
    metadata: ["RUNWAY", "CHOREOGRAPHY", "STAGE", "PERFORMANCE"],
    image: "/assets/master/choreographer/choreographer.png",
    angle: 144,
    radiusScale: 1.03,
  },
  {
    id: "production",
    label: "PRODUCTION",
    category: "SHOWCASE & RUNWAY",
    description:
      "From concept and staging to execution, productions bring the creative vision together as one experience.",
    metadata: ["RUNWAY", "STAGE", "PRODUCTION", "EVENTS"],
    image: "/assets/events/fashion_events.png",
    angle: 180,
    radiusScale: 0.96,
  },
  {
    id: "brands",
    label: "BRANDS",
    category: "BRAND EXPERIENCES",
    description:
      "Brand partnerships create opportunities for fashion, lifestyle and commercial experiences to meet.",
    metadata: ["BRAND EXPERIENCE", "ACTIVATION", "CAMPAIGN", "PARTNERSHIP"],
    image: "/assets/events/lifestyle_events.png",
    angle: 216,
    radiusScale: 1.04,
  },
  {
    id: "media",
    label: "MEDIA",
    category: "EDITORIAL & STORYTELLING",
    description:
      "Editorial, social and event storytelling extend the experience beyond the room.",
    metadata: ["EDITORIAL", "CONTENT", "COVERAGE", "DIGITAL"],
    image: "/assets/master/influencers/influencer_01.png",
    angle: 252,
    radiusScale: 0.97,
  },
  {
    id: "lifestyle",
    label: "LIFESTYLE",
    category: "LUXURY & CULTURE",
    description:
      "Luxury lifestyle experiences combine fashion, culture, hospitality and curated moments.",
    metadata: ["LUXURY", "EXPERIENCE", "CULTURE", "EVENTS"],
    image: "/assets/master/celebrity/celebrity_01.png",
    angle: 288,
    radiusScale: 1.02,
  },
  {
    id: "technology",
    label: "TECHNOLOGY",
    category: "DIGITAL INNOVATION",
    description:
      "Technology adds new dimensions to fashion and event experiences through digital, interactive and AI-led possibilities.",
    metadata: ["AI", "DIGITAL", "INTERACTIVE", "EXPERIENCE"],
    image: "/assets/events/it_events.png",
    angle: 324,
    radiusScale: 0.99,
  },
];

export default function WithWhomWeWorkSection() {
  const [selectedNode, setSelectedNode] = useState<ConstellationNode>(CONSTELLATION_NODES[0]);
  const [hasExplored, setHasExplored] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const handleSelectNode = (node: ConstellationNode) => {
    setSelectedNode(node);
    if (!hasExplored) setHasExplored(true);
  };

  return (
    <section
      id="constellation"
      className="relative py-14 sm:py-20 bg-[#040404] border-b border-white/10 text-brand-white overflow-hidden selection:bg-brand-yellow-golden selection:text-black"
    >
      {/* Editorial Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] bg-brand-yellow-golden/5 blur-[240px] rounded-full" />
      </div>

      <div className="container-editorial relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 text-brand-yellow-golden text-xs font-syne tracking-micro font-bold uppercase mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE CREATIVE CONSTELLATION</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-[0.95]">
              THE CREATIVE <br />
              <span className="font-serif italic font-normal text-brand-yellow-golden capitalize">Constellation</span>
            </h2>
          </div>

          <div className="max-w-md space-y-3">
            <p className="font-sans text-sm sm:text-base text-brand-white/90 font-light leading-relaxed">
              &quot;Where talent, design, production and industry come together to shape the experience.&quot;
            </p>
            <p className="font-sans text-xs text-brand-platinum/70 font-light leading-relaxed">
              From the first creative direction to the final spotlight, FashAI Universal brings together the people, disciplines and industries that shape memorable fashion and event experiences.
            </p>
          </div>
        </div>

        {/* ASYMMETRIC DYNAMIC CONSTELLATION ENGINE (NO CARDS / NO Saas GRIDS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT 45%: Selected Node Interactive Narrative Panel */}
          <div className="lg:col-span-5 space-y-8">
            {/* Interactive Status Indicator */}
            <div className="flex items-center gap-2 text-xs font-syne tracking-wider text-brand-yellow-golden uppercase font-bold">
              <Compass className="w-4 h-4 text-brand-yellow-golden animate-spin-slow" />
              <span>{hasExplored ? "EXPLORE ANOTHER →" : "EXPLORE THE CONNECTIONS"}</span>
            </div>

            {/* Dynamic Selected Node Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-6"
              >
                <div>
                  <span className="text-[10px] font-syne tracking-micro text-brand-yellow-golden font-bold uppercase px-3 py-1 bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 rounded-full inline-block mb-3">
                    {selectedNode.category}
                  </span>
                  <h3 className="font-serif-display text-4xl sm:text-5xl font-light text-brand-white uppercase tracking-tight">
                    {selectedNode.label}
                  </h3>
                </div>

                <p className="font-sans text-sm sm:text-base text-brand-platinum/90 font-light leading-relaxed">
                  {selectedNode.description}
                </p>

                {/* Metadata Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {selectedNode.metadata.map((meta) => (
                    <span
                      key={meta}
                      className="text-[10px] font-syne tracking-wider text-white/80 bg-white/5 border border-white/15 px-3 py-1.5 rounded-full uppercase"
                    >
                      {meta}
                    </span>
                  ))}
                </div>

                {/* Soft Editorial Image Mask Reveal */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-brand-yellow-golden/30 bg-[#090807] shadow-2xl mt-4">
                  <Image
                    src={selectedNode.image}
                    alt={selectedNode.label}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover object-top filter contrast-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-syne text-brand-yellow-golden uppercase font-bold tracking-wider">
                    <span>{selectedNode.label} DIRECTION</span>
                    <span>FASHAI UNIVERSAL</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Bottom Text Link CTA to Event Formats */}
            <div className="pt-4 border-t border-white/10">
              <Link
                href="#what-we-do"
                className="inline-flex items-center gap-3 text-xs font-syne tracking-caps font-bold text-brand-white hover:text-brand-yellow-golden transition-colors group"
              >
                <span>EXPLORE WHAT WE CREATE</span>
                <ArrowRight className="w-4 h-4 text-brand-yellow-golden group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>
          </div>

          {/* RIGHT 55%: Interactive Constellation Canvas */}
          <div className="lg:col-span-7 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
            {/* Ambient Faint Orbital Rings */}
            <div
              className={`absolute w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] border border-brand-yellow-golden/15 rounded-full pointer-events-none ${
                prefersReducedMotion ? "" : "animate-spin-slow"
              }`}
            />
            <div className="absolute w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] border border-white/10 rounded-full pointer-events-none" />

            {/* Central Circular Organic FashAI Core */}
            <div className="relative z-20 w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-black border-2 border-brand-yellow-golden p-4 flex flex-col items-center justify-center text-center shadow-[0_0_60px_rgba(250,182,10,0.25)] select-none">
              <div className="w-2.5 h-2.5 bg-brand-yellow-golden rounded-full mb-1 animate-pulse" />
              <span className="font-serif-display text-lg sm:text-2xl font-light tracking-wider text-white uppercase leading-none">
                FashAI
              </span>
              <span className="font-serif italic font-normal text-xs sm:text-base text-brand-yellow-golden">
                Universal
              </span>
              <span className="text-[9px] font-syne tracking-micro text-white/50 uppercase mt-1">
                CENTRAL HUB
              </span>
            </div>

            {/* Desktop & Tablet Floating Orbital Constellation Nodes */}
            <div className="hidden sm:block absolute inset-0 pointer-events-none">
              {/* SVG Vector Connector Paths */}
              <svg className="w-full h-full absolute inset-0 overflow-visible pointer-events-none">
                {CONSTELLATION_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  const rad = (node.angle * Math.PI) / 180;
                  const baseRadius = 220;
                  const radius = baseRadius * (node.radiusScale || 1);
                  const x = Math.cos(rad) * radius;
                  const y = Math.sin(rad) * radius;

                  return (
                    <g key={`line-${node.id}`}>
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% + ${x}px)`}
                        y2={`calc(50% + ${y}px)`}
                        stroke={isSelected ? "#FAB60A" : "rgba(250, 182, 10, 0.15)"}
                        strokeWidth={isSelected ? "2" : "1"}
                        strokeDasharray={isSelected ? "none" : "3 3"}
                        className="transition-all duration-500"
                      />
                      {isSelected && (
                        <circle
                          cx={`calc(50% + ${x * 0.5}px)`}
                          cy={`calc(50% + ${y * 0.5}px)`}
                          r="2.5"
                          fill="#FAB60A"
                          className="animate-ping"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>

              {/* Interactive Node Buttons */}
              {CONSTELLATION_NODES.map((node) => {
                const isSelected = selectedNode.id === node.id;
                const rad = (node.angle * Math.PI) / 180;
                const baseRadius = 220;
                const radius = baseRadius * (node.radiusScale || 1);
                const x = Math.cos(rad) * radius;
                const y = Math.sin(rad) * radius;

                return (
                  <div
                    key={node.id}
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    className="absolute top-1/2 left-1/2 pointer-events-auto z-30 transition-all duration-300"
                  >
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Select ${node.label} discipline`}
                      onClick={() => handleSelectNode(node)}
                      onMouseEnter={() => handleSelectNode(node)}
                      className={`group cursor-pointer px-4 py-2 rounded-full border text-[11px] font-syne tracking-wider font-bold uppercase transition-all duration-300 flex items-center gap-2.5 backdrop-blur-md shadow-xl ${
                        isSelected
                          ? "bg-brand-yellow-golden text-black border-brand-yellow-golden shadow-[0_0_25px_rgba(250,182,10,0.6)] scale-110"
                          : "bg-black/85 text-white/80 border-white/20 hover:border-brand-yellow-golden/70 hover:text-white hover:scale-105"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full transition-colors ${
                          isSelected ? "bg-black animate-pulse" : "bg-brand-yellow-golden"
                        }`}
                      />
                      <span>{node.label}</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Mobile Flowing Pill Selector (Accessibility & Touch Optimization) */}
            <div className="sm:hidden w-full space-y-4 pt-4 relative z-30">
              <div className="flex items-center justify-between text-[11px] font-syne tracking-wider text-brand-yellow-golden font-bold uppercase">
                <span>SELECT DISCIPLINE NODE</span>
                <span>10 DISCIPLINES</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {CONSTELLATION_NODES.map((node) => {
                  const isSelected = selectedNode.id === node.id;
                  return (
                    <button
                      key={node.id}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`Select ${node.label} discipline`}
                      onClick={() => handleSelectNode(node)}
                      className={`px-3.5 py-2 rounded-full text-xs font-syne font-bold uppercase tracking-wider transition-all border ${
                        isSelected
                          ? "bg-brand-yellow-golden text-black border-brand-yellow-golden shadow-md"
                          : "bg-black/90 text-white/80 border-white/20 hover:border-brand-yellow-golden/50"
                      }`}
                    >
                      {node.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

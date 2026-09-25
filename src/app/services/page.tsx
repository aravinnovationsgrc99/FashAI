import type { Metadata } from "next";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import WithWhomWeWorkSection from "@/components/sections/WithWhomWeWorkSection";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, ShieldCheck, Cpu, Globe } from "lucide-react";

export const metadata: Metadata = {
  title: "Services & Event Formats — FashAI Universal",
  description:
    "Discover FashAI Universal's core services: Haute Couture Catwalk Presentations, AI & Computational Fashion Design, Luxury Brand Activations, International Talent Curation, and Spatial Media across Dubai, UAE & India.",
};

const SERVICES_DETAILED = [
  {
    id: "catwalk-presentation",
    number: "01",
    title: "Haute Runway & Catwalk Presentations",
    category: "RUNWAY & SHOWCASE",
    description:
      "End-to-end luxury fashion show production combining physical garment choreography, spatial lighting installations, runway staging, and international buyer viewings.",
    features: [
      "Bespoke Runway Staging & Lighting Design",
      "Haute Couture Choreography & Music Curation",
      "Global Buyer & Press Guest Management",
      "4K Ultra-HD Media Distribution",
    ],
    icon: Sparkles,
  },
  {
    id: "computational-design",
    number: "02",
    title: "AI & Computational Fashion Design",
    category: "INNOVATION & TECH",
    description:
      "Integrating cutting-edge generative AI, 3D garment simulation, digital twin creation, and virtual runway models with physical haute couture craftsmanship.",
    features: [
      "Generative Silhouette Exploration",
      "3D Virtual Garment & Fabric Simulation",
      "Digital Twin Creation for Physical Collections",
      "AI-Driven Fashion Campaign Storytelling",
    ],
    icon: Cpu,
  },
  {
    id: "brand-activations",
    number: "03",
    title: "Luxury Brand Activations & Summits",
    category: "BRAND EXPERIENCES",
    description:
      "Curating ultra-exclusive brand experiences, private delegate summits, luxury product viewings, and VIP networking galas across Dubai, UAE, and India.",
    features: [
      "High-Net-Worth Delegate & VIP Hosting",
      "Bespoke Brand Curation & Installation",
      "Private Salon Viewings & Trunk Shows",
      "International Sponsor Integration",
    ],
    icon: Globe,
  },
  {
    id: "talent-network",
    number: "04",
    title: "International Talent Curation & Direction",
    category: "TALENT & CREATIVE",
    description:
      "Managing and styling international runway models, couture makeup artists, fashion stylists, and creative directors for world-class fashion productions.",
    features: [
      "Global Model Scouting & Booking",
      "Haute Couture Styling & Art Direction",
      "Editorial Makeup & Hair Styling Teams",
      "Backstage Operations & Choreography",
    ],
    icon: ShieldCheck,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-[#050505] text-[#111111] dark:text-white pt-24 min-h-screen">
      {/* 01. SERVICES HERO BANNER */}
      <section className="relative py-16 sm:py-24 border-b border-black/10 dark:border-white/10 bg-[#FAF8F5] dark:bg-[#080706]">
        <div className="container-editorial max-w-6xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-[2px] bg-[#F15E1C] dark:bg-[#D4AF37]" />
              <span className="font-syne text-xs tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
                03 / SERVICES &amp; EVENT ARCHITECTURE
              </span>
            </div>
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-[#111111] dark:text-white uppercase leading-[0.95]">
              OUR <span className="font-serif italic text-[#F15E1C] dark:text-[#D4AF37]">SERVICES</span> &amp; FORMATS
            </h1>
            <p className="font-sans text-sm sm:text-base text-[#444444] dark:text-white/80 font-light leading-relaxed max-w-2xl">
              FashAI Universal delivers specialized fashion show production, AI-driven computational design, luxury brand activations, and global talent orchestration bridging Dubai, the UAE, and India.
            </p>
          </div>
        </div>
      </section>

      {/* 02. CORE SERVICES ARCHITECTURE GRID */}
      <section className="py-16 sm:py-24 border-b border-black/10 dark:border-white/10">
        <div className="container-editorial max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-12">
            <h2 className="font-syne text-xs tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase mb-2">
              CORE CAPABILITIES
            </h2>
            <h3 className="font-serif-display text-3xl sm:text-5xl font-light text-[#111111] dark:text-white uppercase">
              WHAT WE DELIVER
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {SERVICES_DETAILED.map((service) => {
              const IconComp = service.icon;
              return (
                <div
                  key={service.id}
                  className="p-6 sm:p-8 rounded-2xl border border-black/10 dark:border-white/15 bg-[#FAF8F5] dark:bg-[#090807] hover:border-[#F15E1C] dark:hover:border-[#D4AF37] transition-all duration-300 shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-serif-display text-3xl font-light text-[#F15E1C] dark:text-[#D4AF37]">
                        {service.number}
                      </span>
                      <span className="text-[10px] font-syne tracking-wider text-[#F15E1C] dark:text-[#D4AF37] bg-[#F15E1C]/10 dark:bg-[#D4AF37]/10 px-3 py-1 rounded-full font-bold uppercase">
                        {service.category}
                      </span>
                    </div>

                    <h4 className="font-serif-display text-2xl sm:text-3xl font-light text-[#111111] dark:text-white group-hover:text-[#F15E1C] dark:group-hover:text-[#D4AF37] transition-colors">
                      {service.title}
                    </h4>

                    <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-white/80 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="pt-2 border-t border-black/10 dark:border-white/10 space-y-2">
                      {service.features.map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-syne text-[#333333] dark:text-white/90">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F15E1C] dark:bg-[#D4AF37]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 mt-6 border-t border-black/10 dark:border-white/10 flex justify-end">
                    <Link
                      href="/contact?type=Services"
                      className="inline-flex items-center gap-2 text-xs font-syne font-bold uppercase text-[#F15E1C] dark:text-[#D4AF37] hover:underline"
                    >
                      <span>ENQUIRE FOR THIS SERVICE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 03. WHAT WE DO SECTION */}
      <WhatWeDoSection />

      {/* 04. WHO WE SERVE SECTION */}
      <WhoWeServeSection />

      {/* 05. WITH WHOM WE WORK SECTION */}
      <WithWhomWeWorkSection />

      {/* 06. SERVICE INQUIRY CTA */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] dark:bg-[#080706] border-t border-black/10 dark:border-white/10">
        <div className="container-editorial max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <span className="text-xs font-syne tracking-[0.25em] text-[#F15E1C] dark:text-[#D4AF37] font-bold uppercase">
            COMMISSION A SHOW OR BRAND EXPERIENCE
          </span>
          <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-[#111111] dark:text-white uppercase leading-tight">
            READY TO ELEVATE YOUR <br />
            <span className="font-serif italic font-normal text-[#F15E1C] dark:text-[#D4AF37]">FASHION EXPERIENCE?</span>
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#444444] dark:text-white/80 max-w-xl mx-auto leading-relaxed">
            Contact our editorial team to discuss runway presentations, computational design collaborations, or sponsorship partnerships in Dubai, UAE &amp; India.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="bg-[#D4AF37] text-[#111111] hover:bg-[#FFEC69] font-syne font-bold text-xs tracking-caps px-8 py-4 rounded-full shadow-lg transition-all duration-300 w-full sm:w-auto"
            >
              INITIATE SERVICE ENQUIRY →
            </Link>
            <Link
              href="/apply"
              className="border border-[#F15E1C] dark:border-white/30 text-[#111111] dark:text-white hover:bg-[#F15E1C]/10 dark:hover:bg-white/10 font-syne font-bold text-xs tracking-caps px-8 py-4 rounded-full transition-all duration-300 w-full sm:w-auto"
            >
              APPLY FOR NOMINATION →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import UpcomingClientContent from "@/components/sections/UpcomingClientContent";

export const metadata: Metadata = {
  title: "UPCOMING — FASHPRISM LIFESTYLE 2026 DUBAI",
  description:
    "The next chapter of Fashprism Internationals. Fashprism Lifestyle returns to Dubai in 2026.",
};

export default function UpcomingPage() {
  return (
    <div className="pt-28 pb-32 bg-brand-void text-brand-off-white min-h-screen">
      {/* Hero Header */}
      <section className="relative px-6 sm:px-12 py-20 max-w-7xl mx-auto overflow-hidden border-b border-hairline">
        {/* Background Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <Image
            src="/assets/models/model_14.jpeg"
            alt="Dubai Skyline Preview"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter grayscale contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl">
          <span className="text-xs font-syne tracking-micro text-brand-orange block mb-4">
            CHAPTER 03 / UPCOMING INITIATIVE
          </span>
          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
            FASHPRISM
            <span className="block italic text-brand-orange font-normal">
              LIFESTYLE 2026
            </span>
          </h1>
          <p className="font-syne text-sm sm:text-base tracking-caps text-brand-gold mt-6">
            DUBAI, UNITED ARAB EMIRATES
          </p>
        </div>
      </section>

      {/* SECTION 1 — INTRO */}
      <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto border-b border-hairline">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3">
              01 / INTRO
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white leading-tight">
              THE NEXT <br />
              <span className="italic text-brand-gold font-normal">CHAPTER.</span>
            </h2>
          </div>
          <div className="lg:col-span-6 border-l border-hairline pl-6 sm:pl-8">
            <p className="font-serif-display text-2xl text-brand-off-white font-light mb-4">
              Fashprism Lifestyle 2026 — Dubai.
            </p>
            <p className="font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed">
              An anticipatory edition synthesizing international couture, bespoke luxury installations, and curated delegate gatherings set against Dubai’s monumental architecture.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 — 2026 VISUAL */}
      <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto border-b border-hairline relative">
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-hairline bg-brand-charcoal flex items-center justify-center">
          <Image
            src="/assets/models/model_07.jpeg"
            alt="2026 Visual"
            fill
            sizes="100vw"
            className="object-cover filter grayscale contrast-125 opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-void via-transparent to-brand-void" />

          {/* Monolithic 2026 Overlay */}
          <div className="relative z-10 text-center">
            <span className="font-serif-display text-8xl sm:text-[140px] md:text-[200px] font-light text-brand-orange tracking-tighter leading-none select-none opacity-90 drop-shadow-2xl">
              2026
            </span>
            <div className="font-syne text-xs tracking-micro text-brand-gold font-bold uppercase mt-2">
              DUBAI EDITION — PREVIEW
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT TO EXPECT */}
      <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto border-b border-hairline">
        <div className="mb-16">
          <span className="text-xs font-syne tracking-micro text-brand-orange block mb-2">
            02 / CORE PILLARS
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-off-white">
            WHAT TO EXPECT
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              title: "FASHION",
              description:
                "Haute couture runway reveals and bespoke sartorial craftsmanship presented through cinematic spatial production.",
            },
            {
              title: "EXPERIENCE",
              description:
                "Immersive spatial environments bridging physical luxury with digital atmospheric installations.",
            },
            {
              title: "CULTURE",
              description:
                "Cross-cultural dialogues linking international fashion capitals with regional creative heritage.",
            },
            {
              title: "CONNECTION",
              description:
                "Exclusive delegate assemblies for couturiers, luxury patrons, press correspondents, and industry leaders.",
            },
          ].map((pillar, idx) => (
            <div
              key={pillar.title}
              className="border border-hairline bg-brand-atelier p-8 flex flex-col justify-between"
            >
              <div>
                <div className="text-xs font-syne text-brand-orange mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-serif-display text-2xl font-light text-brand-off-white mb-4">
                  {pillar.title}
                </h3>
                <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-hairline-light text-[10px] font-syne text-brand-gold">
                LIFESTYLE 2026
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 4 — EVENT INFORMATION */}
      <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto border-b border-hairline">
        <div className="mb-16">
          <span className="text-xs font-syne tracking-micro text-brand-orange block mb-2">
            03 / FACTUAL STATUS
          </span>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-off-white">
            EVENT SPECIFICATIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border border-hairline bg-brand-charcoal p-8">
            <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-2">
              DATE
            </span>
            <div className="font-serif-display text-2xl text-brand-orange font-light">
              COMING SOON
            </div>
            <p className="font-sans text-xs text-brand-platinum font-light mt-2">
              Official schedule updates will be announced.
            </p>
          </div>

          <div className="border border-hairline bg-brand-charcoal p-8">
            <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-2">
              LOCATION
            </span>
            <div className="font-serif-display text-2xl text-brand-off-white font-light">
              DUBAI
            </div>
            <p className="font-sans text-xs text-brand-platinum font-light mt-2">
              United Arab Emirates.
            </p>
          </div>

          <div className="border border-hairline bg-brand-charcoal p-8">
            <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-2">
              VENUE
            </span>
            <div className="font-serif-display text-2xl text-brand-off-white font-light">
              TO BE ANNOUNCED
            </div>
            <p className="font-sans text-xs text-brand-platinum font-light mt-2">
              Official venue details reserved for confirmed delegates.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="px-6 sm:px-12 py-28 max-w-7xl mx-auto text-center flex flex-col items-center">
        <span className="text-xs font-syne tracking-micro text-brand-orange block mb-4">
          04 / INVITATION
        </span>
        <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light text-brand-off-white mb-6">
          BE PART OF <br />
          <span className="italic text-brand-orange font-normal">
            THE NEXT MOMENT.
          </span>
        </h2>
        <p className="font-sans text-sm sm:text-base text-brand-platinum font-light max-w-lg mb-10 leading-relaxed">
          Express interest for participation, sponsorship, press coverage, or attendance updates for Dubai 2026.
        </p>

        <UpcomingClientContent />
      </section>
    </div>
  );
}

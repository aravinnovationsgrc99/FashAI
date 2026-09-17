import type { Metadata } from "next";
import Image from "next/image";
import UpcomingClientContent from "@/components/sections/UpcomingClientContent";

export const metadata: Metadata = {
  title: "UPCOMING — FASHPRISM LIFESTYLE 2026 DUBAI",
  description:
    "The next chapter of Fashprism Internationals. Fashprism Lifestyle returns to Dubai in 2026.",
};

export default function UpcomingPage() {
  return (
    <div className="bg-brand-void text-brand-off-white">
      {/* CHAPTER 1 — HERO: 2026 MONOLITHIC VISUAL */}
      <section className="relative min-h-[100svh] w-full flex flex-col justify-between px-4 sm:px-12 pt-28 pb-12 sm:pb-16 overflow-hidden border-b border-hairline-gold">
        {/* Background Film Atmosphere */}
        <div className="absolute inset-0 pointer-events-none opacity-20 z-0">
          <Image
            src="/assets/models/model_14.jpeg"
            alt="Dubai Skyline Preview"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center filter grayscale contrast-125 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-void/90 via-transparent to-brand-void/90" />
        </div>

        {/* Top Tagline */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-4 sm:pt-8">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold">
            <span className="h-px w-6 sm:w-8 bg-brand-gold/60" />
            <span>CHAPTER 03 / UPCOMING INITIATIVE</span>
          </div>
        </div>

        {/* Centerpiece Monolithic Typography */}
        <div className="relative z-10 max-w-7xl mx-auto w-full my-auto text-center flex flex-col items-center justify-center py-8 sm:py-12">
          <span className="font-syne text-[10px] sm:text-xs md:text-sm tracking-[0.3em] sm:tracking-[0.4em] text-brand-platinum uppercase mb-3 sm:mb-4">
            FASHPRISM LIFESTYLE
          </span>

          <h1 className="font-serif-display text-[72px] xs:text-[96px] sm:text-[180px] md:text-[240px] lg:text-[320px] font-light leading-none tracking-tighter select-none bg-gradient-to-b from-[#FFF5DC] via-[#D4AF37] to-[#7A5B18] bg-clip-text text-transparent drop-shadow-2xl">
            2026
          </h1>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-8 mt-2">
            <span className="font-syne text-xs sm:text-base tracking-[0.3em] text-brand-gold font-bold uppercase">
              DUBAI
            </span>
            <span className="hidden sm:inline text-brand-gold/40">•</span>
            <span className="font-syne text-[10px] sm:text-xs tracking-[0.25em] text-brand-orange font-bold uppercase border border-brand-orange/30 bg-brand-orange/5 px-3 sm:px-4 py-1.5">
              COMING SOON
            </span>
          </div>
        </div>

        {/* Bottom Scroll Indicator */}
        <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between items-end border-t border-hairline pt-4 sm:pt-6 text-[9px] sm:text-[10px]">
          <span className="font-syne tracking-micro text-brand-platinum">
            LOCATION: DUBAI, UAE
          </span>
          <span className="font-syne tracking-micro text-brand-gold flex items-center gap-2">
            EXPLORE SPECIFICATIONS <span className="animate-bounce">↓</span>
          </span>
        </div>
      </section>

      {/* CHAPTER 2 — INTRO & STATEMENT */}
      <section className="min-h-[100svh] w-full flex flex-col justify-center px-4 sm:px-12 py-16 sm:py-24 border-b border-hairline relative bg-gradient-to-b from-brand-void via-[#0a0805] to-brand-void">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange mb-4">
              <span className="h-px w-6 bg-brand-orange" />
              <span>01 / THE VISION</span>
            </div>
            <h2 className="font-serif-display text-4xl xs:text-5xl sm:text-7xl font-light text-brand-off-white leading-[1.05]">
              THE NEXT <br />
              <span className="italic text-gold-gradient font-normal">
                CHAPTER.
              </span>
            </h2>
            <div className="h-0.5 w-20 sm:w-24 bg-gradient-to-r from-[#D4AF37] to-transparent mt-6 sm:mt-8" />
          </div>

          <div className="lg:col-span-6 border-l border-hairline-gold pl-6 sm:pl-12 space-y-4 sm:space-y-6">
            <p className="font-serif-display text-xl sm:text-3xl text-brand-off-white font-light leading-snug">
              Fashprism Lifestyle 2026 — Dubai.
            </p>
            <p className="font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed">
              An anticipatory edition synthesizing international couture, bespoke luxury installations, and curated delegate assemblies set against Dubai’s monumental architectural canvas.
            </p>
            <div className="pt-2 sm:pt-4 flex items-center gap-4 sm:gap-6 font-syne text-xs tracking-caps text-brand-gold">
              <span>ESTIMATED 2026</span>
              <span className="h-3 w-px bg-brand-gold/40" />
              <span>DUBAI, UAE</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 3 — CORE PILLARS */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 border-b border-hairline bg-brand-void">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-20">
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-3">
              <span className="h-px w-8 bg-brand-gold" />
              <span>02 / CORE INITIATIVES</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white tracking-tight">
              WHAT TO EXPECT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "FASHION",
                description:
                  "Haute couture runway reveals and bespoke sartorial craftsmanship presented through cinematic spatial production.",
              },
              {
                num: "02",
                title: "EXPERIENCE",
                description:
                  "Immersive spatial environments bridging physical luxury with digital atmospheric light installations.",
              },
              {
                num: "03",
                title: "CULTURE",
                description:
                  "Cross-cultural dialogues linking international fashion capitals with regional creative heritage.",
              },
              {
                num: "04",
                title: "CONNECTION",
                description:
                  "Exclusive delegate assemblies for couturiers, luxury patrons, press correspondents, and industry leaders.",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="border border-hairline-gold bg-brand-charcoal/60 p-8 sm:p-10 flex flex-col justify-between hover:border-brand-gold transition-colors duration-500 group"
              >
                <div>
                  <div className="text-xs font-syne text-brand-orange font-bold mb-6 group-hover:text-brand-gold transition-colors">
                    {pillar.num}
                  </div>
                  <h3 className="font-serif-display text-2xl font-light text-brand-off-white mb-4 group-hover:text-brand-gold transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
                <div className="mt-10 pt-4 border-t border-hairline text-[10px] font-syne tracking-micro text-brand-gold">
                  DUBAI 2026 EDITION
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHAPTER 4 — EVENT SPECIFICATIONS */}
      <section className="min-h-screen w-full flex flex-col justify-center px-6 sm:px-12 py-24 border-b border-hairline relative bg-gradient-to-b from-brand-void to-[#080705]">
        <div className="max-w-7xl mx-auto w-full">
          <div className="mb-16">
            <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-orange mb-3">
              <span className="h-px w-6 bg-brand-orange" />
              <span>03 / FACTUAL STATUS</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white tracking-tight">
              EVENT SPECIFICATIONS
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border border-hairline-gold bg-brand-charcoal/80 p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-3">
                  DATE
                </span>
                <div className="font-serif-display text-3xl text-gold-gradient font-light mb-2">
                  COMING SOON
                </div>
                <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                  Official schedule updates will be announced directly to registered guests.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-hairline text-[10px] font-syne text-brand-gold/60">
                STATUS: SCHEDULE IN PROGRESS
              </div>
            </div>

            <div className="border border-hairline-gold bg-brand-charcoal/80 p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-3">
                  LOCATION
                </span>
                <div className="font-serif-display text-3xl text-brand-off-white font-light mb-2">
                  DUBAI
                </div>
                <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                  United Arab Emirates.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-hairline text-[10px] font-syne text-brand-gold/60">
                STATUS: CONFIRMED DESTINATION
              </div>
            </div>

            <div className="border border-hairline-gold bg-brand-charcoal/80 p-10 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-3">
                  VENUE
                </span>
                <div className="font-serif-display text-3xl text-brand-off-white font-light mb-2">
                  TO BE ANNOUNCED
                </div>
                <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
                  Official venue details reserved for confirmed delegates and accredited press.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-hairline text-[10px] font-syne text-brand-gold/60">
                STATUS: VENUE SELECTION
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHAPTER 5 — INVITATION & CTA */}
      <section className="min-h-screen w-full flex flex-col justify-center items-center px-6 sm:px-12 py-24 text-center bg-brand-void relative">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-6">
            <span className="h-px w-8 bg-brand-gold" />
            <span>04 / INVITATION</span>
            <span className="h-px w-8 bg-brand-gold" />
          </div>

          <h2 className="font-serif-display text-5xl sm:text-7xl md:text-8xl font-light text-brand-off-white mb-8 leading-tight">
            BE PART OF <br />
            <span className="italic text-gold-gradient font-normal">
              THE NEXT MOMENT.
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-brand-platinum font-light max-w-xl mb-12 leading-relaxed">
            Express interest for participation, sponsorship, press coverage, or attendance updates for Dubai 2026.
          </p>

          <UpcomingClientContent />
        </div>
      </section>
    </div>
  );
}


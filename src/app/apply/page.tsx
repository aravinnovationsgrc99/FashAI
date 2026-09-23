import { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ArrowRight, Sparkles, Award, UserPlus } from "lucide-react";

export const metadata: Metadata = {
  title: "Official Applications & Nominations | FashAI Universal Talent Network",
  description:
    "Official application interface for Model, Designer, Makeup Artist, Fashion Stylist, Choreographer, Influencer, Celebrity, CSTP, and Fashion Commentary opportunities.",
};

const APPLICATION_STREAMS = [
  {
    slug: "model",
    title: "MODEL APPLICATION",
    subtitle: "Runway, editorial, and commercial modeling participation.",
    badge: "RUNWAY & EDITORIAL",
  },
  {
    slug: "designer",
    title: "DESIGNER APPLICATION",
    subtitle: "Present couture collections, apparel design, or luxury lines.",
    badge: "COUTURE ATELIER",
  },
  {
    slug: "makeup-artist",
    title: "MAKEUP ARTIST APPLICATION",
    subtitle: "Beauty direction, backstage artistry, and look styling.",
    badge: "BEAUTY ARTISTRY",
  },
  {
    slug: "fashion-stylist",
    title: "FASHION STYLIST APPLICATION",
    subtitle: "Wardrobe coordination, campaign lookbook, and editorial styling.",
    badge: "WARDROBE & STYLING",
  },
  {
    slug: "choreographer",
    title: "CHOREOGRAPHER APPLICATION",
    subtitle: "Catwalk choreography, runway movement, and stage direction.",
    badge: "MOVEMENT CHOREOGRAPHY",
  },
  {
    slug: "influencer",
    title: "INFLUENCER / CREATOR APPLICATION",
    subtitle: "Digital media storytelling and event content amplification.",
    badge: "DIGITAL CREATORS",
  },
  {
    slug: "celebrity",
    title: "CELEBRITY / PUBLIC FIGURE",
    subtitle: "Special appearances, VIP participation, and campaign roles.",
    badge: "CONFIDENTIAL VIP",
  },
  {
    slug: "cstp",
    title: "CSTP APPLICATION",
    subtitle: "Computational Style & Talent Program specialization.",
    badge: "COMPUTATIONAL FASHION",
  },
  {
    slug: "fashion-commentary",
    title: "FASHION COMMENTARY",
    subtitle: "Fashion journalism, runway critique, and media coverage.",
    badge: "JOURNALISM & MEDIA",
  },
  {
    slug: "nomination",
    title: "CREATIVE NOMINATION",
    subtitle: "Nominate a talented designer, artist, model or stylist.",
    badge: "NOMINATION FLOW",
    isNomination: true,
  },
];

export default function ApplyIndexPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-brand-white pt-28 pb-24">
      <Header />

      <div className="container-editorial relative z-10">
        {/* Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3">
              <Sparkles className="w-4 h-4" />
              <span>OFFICIAL TALENT NETWORK</span>
            </div>
            <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              APPLICATIONS &amp; <span className="font-serif italic text-brand-yellow-golden capitalize">Nominations</span>
            </h1>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Select your specific professional domain below to access your dedicated single-role application interface. No generic search redirects — only role-focused curation.
          </p>
        </div>

        {/* Grid of Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {APPLICATION_STREAMS.map((item) => (
            <div
              key={item.slug}
              className={`group relative p-6 sm:p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between ${
                item.isNomination
                  ? "bg-gradient-to-b from-[#1a150c] to-[#0D0B0A] border-brand-yellow-golden/50 hover:border-brand-yellow-golden shadow-[0_0_40px_rgba(250,182,10,0.15)]"
                  : "bg-[#0B0A09] border-white/10 hover:border-brand-yellow-golden/60"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-syne uppercase font-bold tracking-wider px-3 py-1 rounded-full ${
                      item.isNomination
                        ? "bg-brand-yellow-golden/20 text-brand-yellow-golden border border-brand-yellow-golden/40"
                        : "bg-white/10 text-white/80 border border-white/20"
                    }`}
                  >
                    {item.badge}
                  </span>
                  {item.isNomination ? (
                    <Award className="w-5 h-5 text-brand-yellow-golden" />
                  ) : (
                    <UserPlus className="w-5 h-5 text-brand-platinum/50 group-hover:text-brand-yellow-golden transition-colors" />
                  )}
                </div>

                <h2 className="font-serif-display text-2xl font-light text-white uppercase mb-3 group-hover:text-brand-yellow-golden transition-colors">
                  {item.title}
                </h2>

                <p className="font-sans text-xs text-brand-platinum/70 leading-relaxed font-light mb-8">
                  {item.subtitle}
                </p>
              </div>

              <Link
                href={`/apply/${item.slug}`}
                className={`w-full py-3.5 px-6 rounded-2xl font-syne text-xs font-bold tracking-caps flex items-center justify-between transition-all ${
                  item.isNomination
                    ? "bg-brand-yellow-golden text-black hover:bg-yellow-400 shadow-lg"
                    : "bg-white/10 text-white hover:bg-brand-yellow-golden hover:text-black shadow-md"
                }`}
              >
                <span>OPEN {item.isNomination ? "NOMINATE FORM" : "APPLICATION"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import MagazineArticleModal, { MagazineArticle } from "@/components/magazine/MagazineArticleModal";

const ARTICLES_DATA: MagazineArticle[] = [
  {
    id: "runway-dynamics",
    category: "RUNWAY",
    title: "THE ARCHITECTURE OF MOVEMENT: CATWALK DYNAMICS IN DUBAI",
    subtitle: "An in-depth editorial look at how couture silhouettes and spatial lighting redefine the modern runway experience.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/master/models/model_01.png",
    primaryImageAlt: "High fashion model presenting runway couture during FashAI Universal showcase",
    imagePosition: "object-top",
    content: [
      "Runway presentation is an intricate balance of silhouette architecture, cadence, and ambient lighting. In our Dubai showcases, catwalk choreography is crafted to complement each designer's textural language.",
      "From dramatic floor-length trains to structural tailoring, movement on the runway bridges the boundary between physical garment artistry and spatial performance.",
      "The FashAI Universal runway ecosystem brings together international models, lighting directors, and movement choreographers to deliver high-impact runway presentations across international fashion hubs."
    ],
    galleryImages: [
      { src: "/assets/models/model_01.jpeg", alt: "LifeStyle 2025 Runway Presentation Photo 1" },
      { src: "/assets/models/model_03.jpeg", alt: "LifeStyle 2025 Runway Presentation Photo 3" }
    ]
  },
  {
    id: "designer-spotlight",
    category: "DESIGNERS",
    title: "ATELIER PERSPECTIVES & COUTURE INTEGRITY",
    subtitle: "Exploring high-end craftsmanship, material selection, and structural garment construction with participating ateliers.",
    readTime: "5 MIN READ",
    primaryImage: "/assets/master/designer/designer_01.png",
    primaryImageAlt: "Fashion designer in couture atelier inspecting garment construction",
    imagePosition: "object-top",
    content: [
      "Crafting couture requires an uncompromising focus on fabric weight, hand-stitching, and geometric proportions. Designers within our network combine traditional atelier techniques with avant-garde aesthetic visions.",
      "By offering dedicated presentation platforms, FashAI Universal enables designers to showcase their creative direction directly to press, buyers, and high-net-worth patrons across the UAE and India.",
      "Each atelier presentation reflects months of meticulous craftsmanship, turning raw textiles into emotive fashion statements on the global stage."
    ],
    galleryImages: [
      { src: "/assets/master/designer/designer_02.jpg", alt: "Couture Atelier Material Selection Detail" }
    ]
  },
  {
    id: "lifestyle-retrospective",
    category: "LIFESTYLE",
    title: "LIFESTYLE 2025: VISUAL RETROSPECTIVE",
    subtitle: "A visual record of the physical garment art, luxury lighting, and delegate gatherings from LifeStyle 2025.",
    readTime: "3 MIN READ",
    primaryImage: "/assets/models/model_02.jpeg",
    primaryImageAlt: "Editorial model portrait from LifeStyle 2025 showcase",
    imagePosition: "object-center",
    content: [
      "LifeStyle 2025 represented a landmark edition in our visual archive, uniting fashion designers, creative directors, and industry guests under an immersive atmosphere.",
      "The retrospective highlights runway moments, lookbook captures, and spatial design elements that defined the completed edition.",
      "As we prepare for LifeStyle 2026 in Dubai, the visual archive of 2025 serves as a foundational benchmark for event production excellence."
    ],
    galleryImages: [
      { src: "/assets/models/model_05.jpeg", alt: "LifeStyle 2025 Event Atmosphere" }
    ]
  },
  {
    id: "styling-direction",
    category: "CREATIVE",
    title: "WARDROBE DIRECTION & CAMPAIGN VISUALS",
    subtitle: "Behind the styling process for editorial shoots, campaign lookbooks, and high-fashion stage presentations.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/master/stylist/stylist_01.png",
    primaryImageAlt: "Fashion stylist curating wardrobe looks for campaign production",
    imagePosition: "object-top",
    content: [
      "Styling is the connective thread that unifies garment design, model presence, and campaign storytelling. Stylists curate look pairings, accessory accents, and footwear balance.",
      "In FashAI Universal productions, styling direction ensures that every outfit communicates a clear aesthetic narrative aligned with the event format.",
      "Collaborating with top-tier fashion stylists creates memorable editorial imagery for digital media, press features, and brand campaigns."
    ]
  },
  {
    id: "beauty-artistry",
    category: "FASHION",
    title: "BACKSTAGE BEAUTY & EDITORIAL ARTISTRY",
    subtitle: "Precision beauty direction and makeup artistry crafted for high-definition catwalk and camera lighting.",
    readTime: "3 MIN READ",
    primaryImage: "/assets/master/makeup/makeup_01.png",
    primaryImageAlt: "Makeup artist applying editorial beauty direction backstage",
    imagePosition: "object-top",
    content: [
      "Backstage makeup artistry requires high-precision application tailored to venue lighting and runway cameras. Beauty directors craft clean, glowing skin textures and graphic accents.",
      "Harmonizing beauty direction with garment palettes ensures a cohesive aesthetic vision across the entire designer collection.",
      "Our backstage beauty teams bring technical expertise to both live runway productions and editorial campaign shoots."
    ]
  },
  {
    id: "gala-appearances",
    category: "EVENTS",
    title: "VIP SALONS & GLOBAL PATRON ENGAGEMENT",
    subtitle: "High-profile VIP gatherings, luxury galas, and celebrity appearances across our event formats.",
    readTime: "4 MIN READ",
    primaryImage: "/assets/master/celebrity/celebrity_01.png",
    primaryImageAlt: "Public figure and celebrity guest attending fashion gala event",
    imagePosition: "object-top",
    content: [
      "Luxury event experiences thrive on exclusive audience engagement. FashAI Universal galas host celebrities, public figures, and industry leaders.",
      "The intersection of fashion, enterprise, and lifestyle creates networking salons for collaboration and cultural exchange in Dubai and India.",
      "Every event format is curated with executive hospitality, red carpet press opportunities, and spatial elegance."
    ]
  }
];

const FILTER_CATEGORIES = [
  { id: "ALL", label: "ALL" },
  { id: "FASHION", label: "FASHION" },
  { id: "EVENTS", label: "EVENTS" },
  { id: "DESIGNERS", label: "DESIGNERS" },
  { id: "RUNWAY", label: "RUNWAY" },
  { id: "LIFESTYLE", label: "LIFESTYLE" },
  { id: "CREATIVE", label: "CREATIVE" },
];

export default function FashionMagazineSection() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedArticle, setSelectedArticle] = useState<MagazineArticle | null>(null);

  const filteredArticles = activeFilter === "ALL"
    ? ARTICLES_DATA
    : ARTICLES_DATA.filter((art) => art.category === activeFilter);

  const featuredArticle = filteredArticles[0] || ARTICLES_DATA[0];
  const gridArticles = filteredArticles.slice(1);

  return (
    <section id="magazine" className="relative py-14 sm:py-20 bg-[#050505] border-b border-white/10 overflow-hidden">
      {/* Background Ambience & Editorial Watermark */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/3 w-[550px] h-[550px] bg-brand-yellow-golden/5 blur-[190px] rounded-full" />
        <div className="editorial-watermark absolute top-6 right-4 text-[16vw] font-serif-display font-light uppercase text-white/[0.02] leading-none pointer-events-none">
          EDITORIAL
        </div>
      </div>

      <div className="container-editorial relative z-10">
        {/* Magazine Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-3 bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 px-3 py-1 rounded-full w-fit">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FASHAI UNIVERSAL EDITORIAL</span>
            </div>
            <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-white uppercase leading-none">
              FASHION <span className="font-serif italic font-normal text-brand-yellow-golden">MAGAZINE</span>
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum/90 max-w-md font-light leading-relaxed">
            Fashion stories, event moments, creative perspectives and visual highlights from the FashAI Universal ecosystem.
          </p>
        </div>

        {/* Compact Filter Navigation */}
        <div className="mb-12 overflow-x-auto no-scrollbar pb-2">
          <div className="flex items-center gap-2 sm:gap-3 min-w-max">
            {FILTER_CATEGORIES.map((cat) => {
              const isActive = activeFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveFilter(cat.id)}
                  className={`px-4 py-2 font-syne text-[11px] tracking-micro font-bold uppercase rounded-full transition-all duration-300 border ${
                    isActive
                      ? "bg-brand-yellow-golden text-black border-brand-yellow-golden shadow-[0_0_20px_rgba(250,182,10,0.3)]"
                      : "bg-[#0A0A0A] text-brand-platinum/70 border-white/10 hover:border-brand-yellow-golden/40 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dominant Editorial Featured Story */}
        {featuredArticle && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 group relative bg-[#0A0908] border border-brand-yellow-golden/40 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:border-brand-yellow-golden"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Featured Image (Large Surface) */}
              <div className="lg:col-span-7 relative aspect-[16/10] lg:aspect-[4/3] w-full overflow-hidden bg-black">
                <Image
                  src={featuredArticle.primaryImage}
                  alt={featuredArticle.primaryImageAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className={`object-cover ${featuredArticle.imagePosition || "object-center"} filter contrast-105 group-hover:scale-[1.03] transition-transform duration-700 ease-out`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0908] via-transparent to-transparent opacity-80 lg:opacity-40" />
              </div>

              {/* Featured Content Area */}
              <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-[10px] font-syne text-brand-yellow-golden font-bold uppercase tracking-wider bg-brand-yellow-golden/10 border border-brand-yellow-golden/30 px-3 py-1 rounded-full">
                      FEATURED ARTICLE · {featuredArticle.category}
                    </span>
                    <span className="text-[10px] font-syne text-brand-platinum/60 uppercase">
                      {featuredArticle.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-2xl sm:text-4xl font-light text-white uppercase leading-tight group-hover:text-brand-yellow-golden transition-colors mb-4">
                    {featuredArticle.title}
                  </h3>

                  <p className="font-sans text-xs sm:text-sm text-brand-platinum/80 leading-relaxed font-light mb-6">
                    {featuredArticle.subtitle}
                  </p>
                </div>

                <div>
                  <button
                    onClick={() => setSelectedArticle(featuredArticle)}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-yellow-golden to-amber-500 hover:opacity-95 text-black py-3.5 px-7 rounded-2xl font-syne text-xs font-bold tracking-caps shadow-xl transition-all group/btn"
                  >
                    <span>READ STORY</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Asymmetric Editorial Grid for Supporting Stories */}
        {gridArticles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <AnimatePresence>
              {gridArticles.map((article, idx) => (
                <motion.div
                  key={article.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="group relative bg-[#090807] border border-white/10 rounded-2xl overflow-hidden p-6 hover:border-brand-yellow-golden/60 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    {/* Story Image Crop */}
                    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl mb-5 bg-black border border-white/10">
                      <Image
                        src={article.primaryImage}
                        alt={article.primaryImageAlt}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className={`object-cover ${article.imagePosition || "object-center"} filter contrast-105 group-hover:scale-[1.04] transition-transform duration-700 ease-out`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-transparent to-transparent opacity-60" />
                      <div className="absolute top-3 left-3">
                        <span className="text-[9px] font-syne text-brand-yellow-golden font-bold uppercase tracking-wider bg-black/80 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-full">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    <h4 className="font-serif-display text-xl font-light text-white uppercase leading-snug mb-3 group-hover:text-brand-yellow-golden transition-colors">
                      {article.title}
                    </h4>

                    <p className="font-sans text-xs text-brand-platinum/70 leading-relaxed font-light mb-6 line-clamp-3">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[10px] font-syne text-brand-platinum/50 uppercase">
                      {article.readTime}
                    </span>
                    <button
                      onClick={() => setSelectedArticle(article)}
                      className="inline-flex items-center gap-1.5 text-xs font-syne text-brand-yellow-golden font-bold uppercase hover:text-white transition-colors group/link"
                    >
                      <span>READ STORY</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Editorial Article Reader Modal */}
      <MagazineArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
      />
    </section>
  );
}

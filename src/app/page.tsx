import Hero from "@/components/sections/Hero";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import OpenNominationsSection from "@/components/sections/OpenNominationsSection";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import OurEventsSection from "@/components/sections/OurEventsSection";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";
import FashPrismStoriesSection from "@/components/sections/FashPrismStoriesSection";
import AboutUsSection from "@/components/sections/AboutUsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-brand-orange selection:text-white">
      {/* 01. HERO / TOP PLATFORM POSITIONING */}
      <Hero />

      {/* 02. PLATFORM VISION & MOVEMENT */}
      <WhoWeAreSection />

      {/* 03. SERVICES — WHAT WE PROVIDE (FASHION EVENTS, BRAND SHOOTS, LIFESTYLE, PRODUCT, CORPORATE, IT) */}
      <WhatWeDoSection />

      {/* 04. INDUSTRIES WE SUPPORT (JEWELLERY, CLOTHING, ACCESSORIES, ELECTRONICS, PERFUMES) */}
      <WhoWeServeSection />

      {/* 05. PAST / DELIVERED WORK — WHAT WE'VE DONE */}
      <Chapter2025 />

      {/* 06. DELIVERED EXPERIENCES & STORIES */}
      <FashPrismStoriesSection />

      {/* 07. EDITORIAL PUBLICATIONS & ARCHIVES */}
      <FashionMagazineSection />

      {/* 08. UPCOMING EVENTS & ECOSYSTEM */}
      <OurEventsSection />

      {/* 09. UPCOMING CHAPTER — LIFESTYLE 2026 DUBAI */}
      <Chapter2026 />

      {/* 10. OPEN NOMINATIONS & ROLE GATEWAY */}
      <OpenNominationsSection />

      {/* 11. GLOBAL COMMUNITY & TALENT */}
      <FashionCommunitySection />

      {/* 12. ABOUT US PLATFORM OVERVIEW */}
      <AboutUsSection />

      {/* 13. FAQ */}
      <FaqSection />

      {/* 14. CONTACT & ENQUIRIES */}
      <ContactSection />

      {/* 15. OFFICIAL INSTAGRAM (@FASHAI_UNIVERSAL) */}
      <InstagramSection />
    </main>
  );
}


import Hero from "@/components/sections/Hero";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import WhatWeDoSection from "@/components/sections/WhatWeDoSection";
import WhoWeServeSection from "@/components/sections/WhoWeServeSection";
import WithWhomWeWorkSection from "@/components/sections/WithWhomWeWorkSection";
import OpenNominationsSection from "@/components/sections/OpenNominationsSection";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import OurEventsSection from "@/components/sections/OurEventsSection";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import DesignersSection from "@/components/sections/DesignersSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";
import AboutUsSection from "@/components/sections/AboutUsSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-brand-white selection:bg-brand-orange selection:text-white">
      {/* 01. HERO / LANDING PAGE (PROTECTED CINEMATIC STARTER) */}
      <Hero />

      {/* 02. WHO WE ARE */}
      <WhoWeAreSection />

      {/* 03. WHAT WE DO */}
      <WhatWeDoSection />

      {/* 04. WHO WE SERVE */}
      <WhoWeServeSection />

      {/* 05. WITH WHOM WE WORK */}
      <WithWhomWeWorkSection />

      {/* 06. OPEN NOMINATIONS & ROLE GATEWAY */}
      <OpenNominationsSection />

      {/* 07. FASHION COMMUNITY & TALENT NETWORK */}
      <FashionCommunitySection />

      {/* 08. EVENT ECOSYSTEM */}
      <OurEventsSection />

      {/* 09. FASHION MAGAZINE */}
      <FashionMagazineSection />

      {/* 10. DESIGNERS SHOWCASE & APPLICATION */}
      <DesignersSection />

      {/* 11. UPCOMING EVENTS — LIFESTYLE 2026 DUBAI */}
      <Chapter2026 />

      {/* 12. PREVIOUS EVENTS — LIFESTYLE 2025 ARCHIVE */}
      <Chapter2025 />

      {/* 13. ABOUT US */}
      <AboutUsSection />

      {/* 14. FAQ / AEO */}
      <FaqSection />

      {/* 15. CONTACT & ENQUIRY SELECTOR */}
      <ContactSection />

      {/* 16. INSTAGRAM (@FASHAI_UNIVERSAL) */}
      <InstagramSection />
    </main>
  );
}

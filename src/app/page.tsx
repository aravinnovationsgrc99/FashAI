import Hero from "@/components/sections/Hero";
import UpcomingLifestyleBanner from "@/components/sections/UpcomingLifestyleBanner";
import OurEventsSection from "@/components/sections/OurEventsSection";
import Chapter2025 from "@/components/sections/Chapter2025";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import ServicesCtaSection from "@/components/sections/ServicesCtaSection";
import InstagramSection from "@/components/sections/InstagramSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-void text-brand-white selection:bg-brand-orange selection:text-white">
      {/* 01. HERO SECTION */}
      <Hero />

      {/* 02. LIFESTYLE 2026 UPCOMING EVENT BANNER */}
      <UpcomingLifestyleBanner />

      {/* 03. EVENTS & PROJECTS (OUR EVENTS + 2025 ARCHIVE) */}
      <OurEventsSection />
      <Chapter2025 />

      {/* 04. PEOPLE / INDUSTRY CATEGORIES (FASHION COMMUNITY & TALENT NETWORK) */}
      <FashionCommunitySection />

      {/* 05. ARAV INNOVATIONS BEYOND FASHAI SERVICES CTA */}
      <ServicesCtaSection />

      {/* 06. INSTAGRAM (@FASHAI_UNIVERSAL) */}
      <InstagramSection />

      {/* 07. CONTACT & ENQUIRIES */}
      <ContactSection />
    </main>
  );
}

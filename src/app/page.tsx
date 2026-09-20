import Hero from "@/components/sections/Hero";
import FashAiIntro from "@/components/sections/FeshAiIntro";
import Chapter2025 from "@/components/sections/Chapter2025";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import HomeGalleryPreview from "@/components/sections/HomeGalleryPreview";
import InstagramSection from "@/components/sections/InstagramSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-void text-brand-white selection:bg-brand-orange selection:text-white">
      {/* 01 LANDING HERO */}
      <Hero />

      {/* 02 ABOUT / UNIVERSE */}
      <FashAiIntro />

      {/* 03 LIFESTYLE 2025 — PREVIOUS EDITION */}
      <Chapter2025 />

      {/* 04 LIFESTYLE 2026 — UPCOMING EVENT */}
      <HomeUpcomingFeature />

      {/* 05 GALLERY — LIFESTYLE 2025 VISUAL ARCHIVE */}
      <HomeGalleryPreview />

      {/* 06 INSTAGRAM — @FASHAI_UNIVERSAL */}
      <InstagramSection />

      {/* 07 CONTACT — ENQUIRIES, ADDRESS & MAPS */}
      <ContactSection />
    </main>
  );
}

import Hero from "@/components/sections/Hero";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import HomeGalleryPreview from "@/components/sections/HomeGalleryPreview";
import InstagramSection from "@/components/sections/InstagramSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-brand-void text-brand-white selection:bg-brand-orange selection:text-white">
      <Hero />
      <HomeFeaturedProjects />
      <HomeUpcomingFeature />
      <HomeGalleryPreview />
      <InstagramSection />
      <ContactSection />
    </main>
  );
}

import type { Metadata } from "next";
import AboutUsSection from "@/components/sections/AboutUsSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "About Us — FashAI Universal",
  description:
    "Learn about FashAI Universal: an international fashion, lifestyle, and events platform connecting Dubai, UAE, and India.",
};

export default function AboutPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <AboutUsSection />
      <WhoWeAreSection />
      <InstagramSection />
    </div>
  );
}

import type { Metadata } from "next";
import FashionCommunitySection from "@/components/sections/FashionCommunitySection";
import OpenNominationsSection from "@/components/sections/OpenNominationsSection";

export const metadata: Metadata = {
  title: "Talent Community & Network — FashAI Universal",
  description:
    "Join the international creative network connecting Designers, Models, Makeup Artists, Stylists, Choreographers, and Influencers.",
};

export default function CommunityPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashionCommunitySection />
      <OpenNominationsSection />
    </div>
  );
}

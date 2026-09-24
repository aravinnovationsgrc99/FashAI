import type { Metadata } from "next";
import FashionMagazineSection from "@/components/sections/FashionMagazineSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Fashion Magazine — FashAI Universal",
  description:
    "Official editorial fashion publication, runway insights, couture coverage, and talent spotlights by FashAI Universal.",
};

export default function FashionMagazinePage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashionMagazineSection />
      <InstagramSection />
    </div>
  );
}

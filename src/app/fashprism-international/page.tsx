import type { Metadata } from "next";
import FashPrismInternationalSection from "@/components/sections/FashPrismInternationalSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "FashPrism International — FashAI Universal",
  description:
    "Explore the FashPrism International experience connecting global fashion creators, Dubai runway showcases, and international couture.",
};

export default function FashPrismInternationalPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashPrismInternationalSection />
      <InstagramSection />
    </div>
  );
}

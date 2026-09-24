import type { Metadata } from "next";
import FashPrismIndiaSection from "@/components/sections/FashPrismIndiaSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "FashPrism India — FashAI Universal",
  description:
    "Explore the FashPrism India visual archive, featuring couture garment art, runway highlights, and luxury fashion identities.",
};

export default function FashPrismIndiaPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <FashPrismIndiaSection />
      <InstagramSection />
    </div>
  );
}

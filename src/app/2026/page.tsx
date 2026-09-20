import type { Metadata } from "next";
import HomeUpcomingFeature from "@/components/sections/HomeUpcomingFeature";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "2026 Dubai — FashAI Universe",
  description:
    "The upcoming 2026 Dubai chapter of FashAI Universe. Powered by Arav Innovation.",
};

export default function Page2026() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <HomeUpcomingFeature />
      <InstagramSection />
    </div>
  );
}

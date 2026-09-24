import type { Metadata } from "next";
import OurEventsSection from "@/components/sections/OurEventsSection";
import Chapter2026 from "@/components/sections/Chapter2026";
import Chapter2025 from "@/components/sections/Chapter2025";

export const metadata: Metadata = {
  title: "Event Ecosystem — FashAI Universal",
  description:
    "Explore the event ecosystem of FashAI Universal across fashion, lifestyle, product, corporate, and IT event formats.",
};

export default function EventsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-20 min-h-screen">
      <OurEventsSection />
      <Chapter2026 />
      <Chapter2025 />
    </div>
  );
}

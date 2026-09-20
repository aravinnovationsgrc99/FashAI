import type { Metadata } from "next";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";

export const metadata: Metadata = {
  title: "LifeStyle Editions — FashAI Universe",
  description:
    "Explore previous and upcoming editions of LifeStyle by FashAI Universe. Powered by Arav Innovation.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <HomeFeaturedProjects />
    </div>
  );
}

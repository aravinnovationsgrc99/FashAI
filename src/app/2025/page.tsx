import type { Metadata } from "next";
import HomeFeaturedProjects from "@/components/sections/HomeFeaturedProjects";

export const metadata: Metadata = {
  title: "2025 Chapter — FashAI Universal",
  description:
    "The 2025 chapter and foundation of FashAI Universal. Powered by Arav Innovation.",
};

export default function Page2025() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <HomeFeaturedProjects />
    </div>
  );
}

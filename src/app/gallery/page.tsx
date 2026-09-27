import type { Metadata } from "next";
import GalleryView from "@/components/sections/GalleryView";

export const metadata: Metadata = {
  title: "Gallery — FashAI Universal Editorial Visual Archive",
  description:
    "Editorial visual archive of FashAI Universal captures. Runway, backstage, architecture, lighting and couture details.",
  alternates: {
    canonical: "https://fashai-beryl.vercel.app/gallery",
  },
  openGraph: {
    title: "Gallery — FashAI Universal Editorial Visual Archive",
    description:
      "Editorial visual archive of FashAI Universal captures. Runway, backstage, architecture, lighting and couture details.",
    url: "https://fashai-beryl.vercel.app/gallery",
  },
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 md:pt-24 min-h-screen">
      <GalleryView />
    </div>
  );
}

import type { Metadata } from "next";
import GalleryView from "@/components/sections/GalleryView";

export const metadata: Metadata = {
  title: "Gallery — FashAI Universal",
  description:
    "Editorial visual archive of FashAI Universal captures. Runway, backstage, architecture, lighting and couture details. Powered by Arav Innovation.",
};

export default function GalleryPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-14 sm:pt-20 md:pt-24 min-h-screen">
      <GalleryView />
    </div>
  );
}

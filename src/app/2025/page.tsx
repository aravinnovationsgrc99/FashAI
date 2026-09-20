import type { Metadata } from "next";
import Chapter2025 from "@/components/sections/Chapter2025";
import HomeContactInvitation from "@/components/sections/HomeContactInvitation";

export const metadata: Metadata = {
  title: "2025 — FESH AI UNIVERSE",
  description:
    "The 2025 past chapter and foundation of Fesh AI Universe. Powered by RA Innovation. A project within Fesh Prism.",
};

export default function Page2025() {
  return (
    <div className="bg-brand-void text-brand-off-white pt-20">
      <Chapter2025 />
      <HomeContactInvitation />
    </div>
  );
}

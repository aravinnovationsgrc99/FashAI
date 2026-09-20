import type { Metadata } from "next";
import Chapter2026 from "@/components/sections/Chapter2026";
import HomeContactInvitation from "@/components/sections/HomeContactInvitation";

export const metadata: Metadata = {
  title: "2026 DUBAI — FESH AI UNIVERSE",
  description:
    "The upcoming 2026 Dubai chapter of Fesh AI Universe. Powered by RA Innovation. A project within Fesh Prism.",
};

export default function Page2026() {
  return (
    <div className="bg-brand-void text-brand-off-white pt-20">
      <Chapter2026 />
      <HomeContactInvitation />
    </div>
  );
}

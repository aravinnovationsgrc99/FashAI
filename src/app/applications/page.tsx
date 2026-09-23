import { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ApplicationSelectionPage from "@/components/sections/ApplicationSelectionPage";

export const metadata: Metadata = {
  title: "OPEN NOMINATIONS & APPLICATIONS | FashAI Universal Talent Network",
  description:
    "Official application interface for Model, Designer, Makeup Artist, Fashion Stylist, Choreographer, Influencer, Celebrity, CSTP, and Fashion Commentary opportunities.",
};

export default function ApplicationsPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-brand-white pt-20">
      <Header />
      <ApplicationSelectionPage basePath="/applications" />
      <Footer />
    </main>
  );
}

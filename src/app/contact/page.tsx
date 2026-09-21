import type { Metadata } from "next";
import ContactSection from "@/components/sections/ContactSection";
import InstagramSection from "@/components/sections/InstagramSection";

export const metadata: Metadata = {
  title: "Contact Us — FashAI Universal",
  description:
    "Let's create the next experience. Contact FashAI Universal. Powered by Arav Innovation.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-void text-brand-white pt-24 min-h-screen">
      <ContactSection />
      <InstagramSection />
    </div>
  );
}

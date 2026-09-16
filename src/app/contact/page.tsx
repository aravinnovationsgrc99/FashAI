import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "CONTACT US — FASHPRISM INTERNATIONALS",
  description:
    "For enquiries, collaborations, partnerships, media and participation in Fashprism Internationals.",
};

export default function ContactPage() {
  return (
    <div className="bg-brand-void text-brand-off-white min-h-screen flex flex-col justify-between">
      {/* Full-Screen Luxury Invitation Header */}
      <section className="relative min-h-[60vh] sm:min-h-[70vh] w-full flex flex-col justify-end px-6 sm:px-12 pt-28 pb-16 border-b border-hairline-gold overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute inset-0 bg-radial-vignette opacity-70 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 text-xs font-syne tracking-micro text-brand-gold mb-6">
            <span className="h-px w-8 bg-brand-gold" />
            <span>CHAPTER 05 / LUXURY INVITATION</span>
          </div>

          <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
            LET’S CREATE <br />
            <span className="italic text-gold-gradient font-normal">
              THE NEXT MOMENT.
            </span>
          </h1>

          <div className="mt-8 border-t border-hairline pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <p className="font-serif-display text-lg sm:text-2xl text-brand-platinum italic font-light max-w-2xl">
              "For enquiries, collaborations, partnerships, media and participation."
            </p>
            <span className="text-[10px] font-syne tracking-micro text-brand-gold uppercase">
              EXECUTIVE ATELIER DESK — PARIS × DUBAI
            </span>
          </div>
        </div>
      </section>

      {/* Main Contact Form Section */}
      <section className="px-6 sm:px-12 py-24 max-w-7xl mx-auto w-full flex-1">
        <ContactForm />
      </section>
    </div>
  );
}


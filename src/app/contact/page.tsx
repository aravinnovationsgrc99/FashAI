import type { Metadata } from "next";
import ContactForm from "@/components/sections/ContactForm";

export const metadata: Metadata = {
  title: "CONTACT US — FASHPRISM INTERNATIONALS",
  description:
    "For enquiries, collaborations, partnerships, media and participation in Fashprism Internationals.",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-32 bg-brand-void text-brand-off-white min-h-screen">
      {/* Hero Header */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-hairline">
        <span className="text-xs font-syne tracking-micro text-brand-orange block mb-4">
          CHAPTER 05 / GET IN TOUCH
        </span>
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
          LET’S CREATE <br />
          <span className="italic text-brand-orange font-normal">
            THE NEXT MOMENT.
          </span>
        </h1>
        <p className="font-serif-display text-xl sm:text-2xl text-brand-gold italic font-light mt-6 max-w-2xl">
          "For enquiries, collaborations, partnerships, media and participation."
        </p>
      </section>

      {/* Main Contact Form Section */}
      <section className="px-6 sm:px-12 py-20 max-w-7xl mx-auto">
        <ContactForm />
      </section>
    </div>
  );
}

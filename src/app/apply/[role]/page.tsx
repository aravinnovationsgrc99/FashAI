import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import RoleApplicationForm, { RoleSlug } from "@/components/forms/RoleApplicationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface RolePageProps {
  params: Promise<{
    role: string;
  }>;
}

const ALLOWED_SLUGS: Record<string, RoleSlug> = {
  model: "model",
  designer: "designer",
  "makeup-artist": "makeup-artist",
  makeup_artist: "makeup-artist",
  "fashion-stylist": "fashion-stylist",
  stylist: "fashion-stylist",
  choreographer: "choreographer",
  influencer: "influencer",
  "influencer-creator": "influencer",
  celebrity: "celebrity",
  "celebrity-public-figure": "celebrity",
  cstp: "cstp",
  "fashion-commentary": "fashion-commentary",
  fashion_commentary: "fashion-commentary",
  nomination: "nomination",
};

export async function generateMetadata({ params }: RolePageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const slugKey = resolvedParams.role?.toLowerCase();
  const matchedSlug = ALLOWED_SLUGS[slugKey];

  if (!matchedSlug) {
    return {
      title: "Application Not Found | FashAI Universal",
    };
  }

  const roleTitle = matchedSlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${roleTitle} Application | FashAI Universal Talent Network`,
    description: `Dedicated ${roleTitle} application form for FashAI Universal talent network, runway presentations, and luxury showcases.`,
  };
}

export default async function DedicatedRolePage({ params }: RolePageProps) {
  const resolvedParams = await params;
  const slugKey = resolvedParams.role?.toLowerCase();
  const matchedSlug = ALLOWED_SLUGS[slugKey];

  if (!matchedSlug) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-brand-white pt-24 pb-24">
      <Header />

      <div className="container-editorial relative z-10">
        <div className="mb-6">
          <Link
            href="/apply"
            className="inline-flex items-center gap-2 text-xs font-syne tracking-caps font-bold text-brand-platinum/70 hover:text-brand-yellow-golden transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> ALL APPLICATION ROLES
          </Link>
        </div>

        {/* Single-Role Dedicated Form Engine */}
        <RoleApplicationForm roleSlug={matchedSlug} isModal={false} />
      </div>

      <Footer />
    </main>
  );
}

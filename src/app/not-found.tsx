import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-[#050505] text-brand-white flex flex-col items-center justify-center px-4 py-24 text-center select-none">
      <div className="max-w-xl space-y-6">
        <div className="inline-flex items-center gap-2 text-xs font-syne tracking-micro text-brand-yellow-golden font-bold uppercase mb-2">
          <Sparkles className="w-4 h-4 text-brand-yellow-golden" />
          <span>404 ERROR</span>
        </div>

        <h1 className="font-serif-display text-5xl sm:text-7xl font-light text-brand-white uppercase leading-none tracking-tight">
          PAGE <span className="font-serif italic text-brand-yellow-golden font-normal">NOT FOUND</span>
        </h1>

        <div className="w-16 h-[2px] bg-brand-yellow-golden mx-auto shadow-[0_0_10px_rgba(250,182,10,0.6)]" />

        <p className="font-sans text-sm sm:text-base text-brand-platinum/80 font-light leading-relaxed max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Explore FashAI Universal or return to our homepage.
        </p>

        <div className="pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-brand-yellow-golden text-black px-8 py-3.5 text-xs font-syne font-bold tracking-caps rounded-full hover:bg-yellow-400 transition-all duration-300 shadow-[0_0_20px_rgba(250,182,10,0.3)] hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" /> BACK TO FASHAI UNIVERSAL →
          </Link>
        </div>
      </div>
    </div>
  );
}

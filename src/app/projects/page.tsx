import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export const metadata: Metadata = {
  title: "PROJECTS — FASHPRISM INTERNATIONALS",
  description:
    "Moments that have already happened. Explore completed Fashprism runway presentations and luxury lifestyle symposiums.",
};

export default function ProjectsPage() {
  return (
    <div className="pt-28 pb-32 bg-brand-void text-brand-off-white min-h-screen">
      {/* Page Opening Hero */}
      <section className="min-h-[70vh] flex flex-col justify-center px-6 sm:px-12 py-20 max-w-7xl mx-auto border-b border-hairline relative">
        <span className="text-xs font-syne tracking-micro text-brand-gold block mb-4 font-bold">
          CHAPTER 02 / COMPLETED INITIATIVES
        </span>
        <h1 className="font-serif-display text-6xl sm:text-8xl md:text-9xl lg:text-[130px] font-light leading-none tracking-tight">
          PROJECTS
        </h1>
        <p className="font-serif-display text-2xl sm:text-4xl text-gold-gradient italic font-light mt-6">
          "Moments that have already happened."
        </p>
      </section>

      {/* Projects Full-Screen Visual Chapters */}
      <div className="space-y-40">
        {PROJECTS_DATA.map((project: ProjectItem) => (
          <article
            key={project.id}
            className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-12 border-b border-hairline relative"
          >
            <div className="max-w-7xl mx-auto w-full">
              {/* Project Hero Header */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-4 text-xs font-syne tracking-micro text-brand-gold mb-3 font-bold">
                    <span>PROJECT {project.number}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                    <span>•</span>
                    <span>{project.location}</span>
                  </div>
                  <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light leading-tight">
                    {project.title}
                  </h2>
                </div>
                <div className="lg:col-span-4 border-l border-brand-gold/40 pl-6">
                  <div className="text-xs font-syne tracking-micro text-brand-gold mb-2 font-bold">
                    CATEGORY
                  </div>
                  <div className="text-sm font-syne tracking-caps font-bold text-brand-off-white">
                    {project.category}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-brand-platinum font-light leading-relaxed mt-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Main Full-Bleed Hero Image */}
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-charcoal border border-hairline mb-20">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1200px"
                  className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-void/80 via-transparent to-transparent" />
                <div className="absolute top-6 left-6 font-serif-display text-7xl sm:text-9xl text-brand-gold/15 select-none font-light">
                  {project.number}
                </div>
              </div>

              {/* Editorial Image Sequence */}
              <div className="space-y-20">
                {project.sequence.map((item, idx) => {
                  if (item.type === "image" && item.image) {
                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        <div className="md:col-span-8 relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden border border-hairline bg-brand-charcoal">
                          <Image
                            src={item.image}
                            alt={item.caption || project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 70vw"
                            className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        <div className="md:col-span-4 border-l border-brand-gold/40 pl-6">
                          <div className="text-[10px] font-syne tracking-micro text-brand-gold mb-2 font-bold">
                            SEQUENCE 0{idx + 1}
                          </div>
                          <p className="font-sans text-xs sm:text-sm text-brand-platinum font-light leading-relaxed">
                            {item.caption}
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (item.type === "text") {
                    return (
                      <div
                        key={idx}
                        className="my-20 py-16 px-8 sm:px-12 border-t border-b border-hairline bg-brand-atelier"
                      >
                        <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-3 font-bold">
                          ATELIER INSIGHT
                        </span>
                        <h3 className="font-serif-display text-2xl sm:text-4xl text-brand-off-white font-light mb-4">
                          {item.title}
                        </h3>
                        <p className="font-sans text-sm sm:text-base text-brand-platinum max-w-3xl font-light leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    );
                  }

                  if (item.type === "full-width" && item.image) {
                    return (
                      <div key={idx} className="my-20">
                        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden border border-hairline bg-brand-charcoal">
                          <Image
                            src={item.image}
                            alt={item.caption || project.title}
                            fill
                            sizes="100vw"
                            className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                        {item.caption && (
                          <div className="mt-3 text-right text-[10px] font-syne tracking-micro text-brand-gold font-bold">
                            {item.caption}
                          </div>
                        )}
                      </div>
                    );
                  }

                  if (item.type === "detail" && item.image) {
                    return (
                      <div
                        key={idx}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                      >
                        <div className="md:col-span-5 md:col-start-8 relative aspect-square w-full overflow-hidden border border-hairline bg-brand-charcoal">
                          <Image
                            src={item.image}
                            alt={item.caption || project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 40vw"
                            className="object-cover filter grayscale contrast-125 hover:grayscale-0 transition-all duration-700"
                          />
                        </div>
                      </div>
                    );
                  }

                  return null;
                })}
              </div>

              {/* Project Footer CTA */}
              <div className="mt-20 pt-10 border-t border-hairline flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div>
                  <div className="text-xs font-syne tracking-caps text-brand-gold font-bold">
                    WHAT: {project.category} | WHEN: {project.year} | WHERE: {project.location}
                  </div>
                </div>
                <Link
                  href="/gallery"
                  className="inline-flex items-center gap-3 bg-brand-gold px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors"
                  data-cursor="explore"
                >
                  <span>VIEW GALLERY ↗</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}


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
      {/* Page Opening */}
      <section className="px-6 sm:px-12 py-16 max-w-7xl mx-auto border-b border-hairline">
        <span className="text-xs font-syne tracking-micro text-brand-orange block mb-4">
          CHAPTER 02 / COMPLETED INITIATIVES
        </span>
        <h1 className="font-serif-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light leading-none tracking-tight">
          PROJECTS
        </h1>
        <p className="font-serif-display text-xl sm:text-3xl text-brand-gold italic font-light mt-4">
          "Moments that have already happened."
        </p>
      </section>

      {/* Projects Sequence */}
      <div className="space-y-36 mt-20">
        {PROJECTS_DATA.map((project: ProjectItem) => (
          <article
            key={project.id}
            className="px-6 sm:px-12 max-w-7xl mx-auto border-b border-hairline pb-28"
          >
            {/* Project Hero Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
              <div className="lg:col-span-8">
                <div className="flex items-center gap-4 text-xs font-syne tracking-micro text-brand-orange mb-3">
                  <span>PROJECT {project.number}</span>
                  <span>•</span>
                  <span>{project.year}</span>
                  <span>•</span>
                  <span>{project.location}</span>
                </div>
                <h2 className="font-serif-display text-4xl sm:text-6xl md:text-7xl font-light leading-tight">
                  {project.title}
                </h2>
              </div>
              <div className="lg:col-span-4 border-l border-hairline pl-6">
                <div className="text-xs font-syne tracking-micro text-brand-gold mb-2">
                  CATEGORY
                </div>
                <div className="text-sm font-syne tracking-caps font-bold">
                  {project.category}
                </div>
                <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed mt-3">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Main Hero Image */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-brand-charcoal border border-hairline mb-16">
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1200px"
                className="object-cover filter grayscale contrast-125"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-void/80 via-transparent to-transparent" />
            </div>

            {/* Editorial Image Sequence */}
            <div className="space-y-16">
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
                      <div className="md:col-span-4 border-l border-brand-orange/40 pl-6">
                        <div className="text-[10px] font-syne tracking-micro text-brand-orange mb-2">
                          SEQUENCE 0{idx + 1}
                        </div>
                        <p className="font-sans text-xs text-brand-platinum font-light leading-relaxed">
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
                      className="my-16 py-12 px-8 sm:px-12 border-t border-b border-hairline bg-brand-atelier"
                    >
                      <span className="text-[10px] font-syne tracking-micro text-brand-gold block mb-3">
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
                    <div key={idx} className="my-16">
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
                        <div className="mt-3 text-right text-[10px] font-syne tracking-micro text-brand-platinum">
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
            <div className="mt-16 pt-10 border-t border-hairline flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div>
                <div className="text-xs font-syne tracking-caps text-brand-gold">
                  WHAT: {project.category} | WHEN: {project.year} | WHERE: {project.location}
                </div>
              </div>
              <Link
                href="/gallery"
                className="inline-flex items-center gap-3 bg-brand-orange px-8 py-4 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
                data-cursor="explore"
              >
                <span>VIEW GALLERY ↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

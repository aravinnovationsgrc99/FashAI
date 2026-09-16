"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export default function HomeFeaturedProjects() {
  return (
    <section className="bg-brand-void border-b border-hairline overflow-hidden">
      {/* Section Header */}
      <div className="py-20 px-6 sm:px-12 mx-auto max-w-7xl border-b border-hairline flex flex-col sm:flex-row justify-between items-start sm:items-end">
        <div>
          <span className="text-xs font-syne tracking-micro text-brand-gold block mb-3 font-bold">
            02 / FEATURED PROJECTS
          </span>
          <h2 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-light text-brand-off-white">
            THE MOMENTS WE CREATE
          </h2>
        </div>
        <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0 font-light">
          International runway presentations and luxury lifestyle symposiums.
        </p>
      </div>

      {/* Featured Projects Full-Screen Chapters */}
      <div>
        {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={project.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="min-h-screen w-full flex flex-col justify-between py-24 px-6 sm:px-12 border-b border-hairline relative"
            >
              {/* Background Imagery */}
              <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  sizes="100vw"
                  className="object-cover filter grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-void via-brand-void/85 to-brand-void/70" />
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto">
                {/* Large Photography Frame */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden border border-hairline bg-brand-charcoal ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  data-cursor="view"
                >
                  <Link href="/projects">
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80" />

                      {/* Large Project Number Overlay */}
                      <div className="absolute top-6 left-6 font-serif-display text-7xl sm:text-9xl text-brand-gold/15 select-none font-light">
                        {project.number}
                      </div>

                      {/* Hover Gold Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-brand-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Small Metadata Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <span className="text-[10px] font-syne tracking-micro text-brand-gold bg-brand-void/90 px-3 py-1 border border-hairline">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-syne tracking-micro text-brand-gold font-bold">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>

                {/* Content Frame */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <div>
                    <div className="text-xs font-syne tracking-micro text-brand-gold mb-3 font-bold">
                      PROJECT {project.number} / {project.year}
                    </div>

                    <h3 className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-light text-brand-off-white leading-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm sm:text-base text-brand-platinum font-light leading-relaxed mb-8">
                      {project.description}
                    </p>

                    <div className="border-t border-hairline pt-6 mb-8 flex items-center justify-between text-xs font-syne tracking-caps text-brand-gold">
                      <span>LOCATION: {project.location}</span>
                      <span className="font-bold">{project.year}</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-3 bg-brand-charcoal border border-brand-gold/40 px-8 py-4 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-gold hover:text-brand-black hover:border-brand-gold transition-all duration-300"
                      data-cursor="explore"
                    >
                      <span>DISCOVER PROJECT</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="relative z-10 max-w-7xl mx-auto w-full flex justify-between text-[10px] font-syne tracking-micro text-brand-platinum pt-4 border-t border-hairline">
                <span>HAUTE PRESENTATION {project.number}</span>
                <span className="text-brand-gold font-bold">{project.subtitle}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Projects CTA */}
      <div className="py-20 text-center bg-brand-atelier">
        <Link
          href="/projects"
          className="inline-flex items-center gap-3 bg-brand-gold px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-black hover:bg-brand-gold-pure transition-colors"
          data-cursor="explore"
        >
          <span>VIEW ALL PROJECTS ↗</span>
        </Link>
      </div>
    </section>
  );
}


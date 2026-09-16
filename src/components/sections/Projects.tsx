"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 border-b border-hairline pb-6">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-2">
              02 / CURATED INITIATIVES
            </span>
            <h2 className="font-serif-display text-4xl sm:text-6xl font-light text-brand-off-white">
              PROJECTS
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-brand-platinum max-w-xs mt-4 sm:mt-0">
            High-fashion runway editions and international lifestyle symposiums.
          </p>
        </div>

        {/* Project List Items */}
        <div className="space-y-24">
          {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Image Container */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  data-cursor="view"
                >
                  <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-brand-charcoal border border-hairline">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80" />

                    {/* Overlay Project Number */}
                    <div className="absolute top-6 left-6 font-serif-display text-6xl sm:text-8xl text-brand-off-white/20 select-none">
                      {project.number}
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                      <span className="text-xs font-syne tracking-micro text-brand-gold bg-brand-void/80 px-3 py-1 border border-hairline">
                        {project.category}
                      </span>
                      <span className="text-xs font-syne tracking-micro text-brand-orange">
                        {project.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Container */}
                <div
                  className={`lg:col-span-5 flex flex-col justify-between ${
                    isEven ? "lg:order-2 lg:pl-6" : "lg:order-1 lg:pr-6"
                  }`}
                >
                  <div>
                    <div className="text-xs font-syne tracking-micro text-brand-orange mb-3">
                      PROJECT {project.number} / {project.year}
                    </div>

                    <h3 className="font-serif-display text-3xl sm:text-5xl font-light text-brand-off-white leading-tight mb-4">
                      {project.title}
                    </h3>

                    <p className="font-sans text-sm text-brand-platinum font-light leading-relaxed mb-8">
                      {project.description}
                    </p>

                    {/* Metadata Stats */}
                    <div className="grid grid-cols-3 gap-4 border-t border-b border-hairline py-4 mb-8">
                      {project.stats.map((stat, i) => (
                        <div key={i}>
                          <div className="text-[10px] font-syne tracking-micro text-brand-platinum">
                            {stat.label}
                          </div>
                          <div className="text-xs font-syne tracking-caps text-brand-off-white font-bold mt-1">
                            {stat.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <a
                      href="#gallery"
                      className="inline-flex items-center gap-3 bg-brand-charcoal border border-brand-gold/40 px-6 py-3.5 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-orange hover:text-brand-void hover:border-brand-orange transition-all duration-300"
                      data-cursor="explore"
                    >
                      <span>VIEW PROJECT ARCHIVE</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

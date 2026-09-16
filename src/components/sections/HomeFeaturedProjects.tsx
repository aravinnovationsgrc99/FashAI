"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { PROJECTS_DATA, ProjectItem } from "@/data/projects";

export default function HomeFeaturedProjects() {
  return (
    <section className="py-24 sm:py-32 px-6 sm:px-12 bg-brand-void border-b border-hairline overflow-hidden">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-20 border-b border-hairline pb-8">
          <div>
            <span className="text-xs font-syne tracking-micro text-brand-orange block mb-3">
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

        {/* Featured Projects List */}
        <div className="space-y-28">
          {PROJECTS_DATA.map((project: ProjectItem, index: number) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Large Photography Container */}
                <div
                  className={`lg:col-span-7 relative group overflow-hidden ${
                    isEven ? "lg:order-1" : "lg:order-2"
                  }`}
                  data-cursor="view"
                >
                  <Link href="/projects">
                    <div className="relative aspect-[4/5] sm:aspect-[16/10] w-full overflow-hidden bg-brand-charcoal border border-hairline">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 60vw"
                        className="object-cover object-center filter grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-void/90 via-transparent to-transparent opacity-80" />

                      {/* Large Project Number Overlay */}
                      <div className="absolute top-6 left-6 font-serif-display text-6xl sm:text-8xl text-brand-off-white/20 select-none">
                        {project.number}
                      </div>

                      {/* Hover Orange Accent Line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                      {/* Small Metadata Overlay */}
                      <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                        <span className="text-[10px] font-syne tracking-micro text-brand-gold bg-brand-void/90 px-3 py-1 border border-hairline">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-syne tracking-micro text-brand-orange font-bold">
                          {project.location}
                        </span>
                      </div>
                    </div>
                  </Link>
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

                    <div className="border-t border-hairline pt-6 mb-8 flex items-center justify-between text-xs font-syne tracking-caps text-brand-gold">
                      <span>LOCATION: {project.location}</span>
                      <span>{project.year}</span>
                    </div>
                  </div>

                  <div>
                    <Link
                      href="/projects"
                      className="inline-flex items-center gap-3 bg-brand-charcoal border border-brand-gold/40 px-6 py-3.5 text-xs font-syne tracking-caps text-brand-off-white hover:bg-brand-orange hover:text-brand-void hover:border-brand-orange transition-all duration-300"
                      data-cursor="explore"
                    >
                      <span>DISCOVER PROJECT</span>
                      <span>↗</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View All Projects CTA */}
        <div className="mt-20 text-center border-t border-hairline pt-12">
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 bg-brand-orange px-10 py-5 text-xs font-syne tracking-caps font-bold text-brand-void hover:bg-brand-gold transition-colors"
            data-cursor="explore"
          >
            <span>VIEW ALL PROJECTS ↗</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

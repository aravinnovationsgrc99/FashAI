export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  description: string;
  image: string;
  accentColor?: string;
  stats: { label: string; value: string }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-runway-2025",
    number: "01",
    title: "FASHPRISM RUNWAY 2025",
    subtitle: "HAUTE COUTURE EDITION",
    category: "RUNWAY PRESENTATION",
    year: "2025",
    location: "PARIS — DUBAI",
    description:
      "A cinematic runway presentation uniting international couture houses and avant-garde designers. Pioneering digital craftsmanship and atmospheric fashion storytelling beyond borders.",
    image: "/assets/models/model_01.jpeg",
    stats: [
      { label: "PRESENTATION", value: "COUTURE" },
      { label: "FORMAT", value: "HYBRID RUNWAY" },
      { label: "EDITION", value: "INAUGURAL 2025" },
    ],
  },
  {
    id: "project-lifestyle-2025",
    number: "02",
    title: "FASHPRISM LIFESTYLE 2025",
    subtitle: "DUBAI SYMPOSIUM",
    category: "LIFESTYLE & ART",
    year: "2025",
    location: "DUBAI, UAE",
    description:
      "An exclusive convergence of high fashion, curated lifestyle installations, and private salon gatherings celebrating haute luxury and visionary design.",
    image: "/assets/models/model_03.jpeg",
    stats: [
      { label: "LOCATION", value: "DUBAI" },
      { label: "DISCIPLINE", value: "CULTURE & LUXURY" },
      { label: "SEASON", value: "AUTUMN / WINTER" },
    ],
  },
];

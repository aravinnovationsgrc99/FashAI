export interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  location: string;
  description: string;
  heroImage: string;
  sequence: {
    type: "image" | "text" | "full-width" | "detail";
    image?: string;
    title?: string;
    text?: string;
    caption?: string;
    aspect?: string;
  }[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "project-runway-2025",
    number: "01",
    title: "FASHPRISM RUNWAY 2025",
    subtitle: "HAUTE COUTURE PRESENTATION",
    category: "RUNWAY PRESENTATION",
    year: "2025",
    location: "PARIS — DUBAI",
    description:
      "A cinematic runway presentation uniting international couture silhouettes with digital spatial identity. Pioneering fashion storytelling beyond traditional borders.",
    heroImage: "/assets/models/model_01.jpeg",
    sequence: [
      {
        type: "image",
        image: "/assets/models/model_02.jpeg",
        caption: "Couture Silhouette Study — Runway Movement",
        aspect: "aspect-[4/5]",
      },
      {
        type: "text",
        title: "THE VISUAL DIALECTIC",
        text: "Every garment in Fashprism Runway 2025 responds to light, space, and architectural motion. Where craftsmanship meets digital spatial dimension.",
      },
      {
        type: "image",
        image: "/assets/models/model_04.jpeg",
        caption: "Drapery & Light Intervention",
        aspect: "aspect-[3/4]",
      },
      {
        type: "full-width",
        image: "/assets/models/model_05.jpeg",
        caption: "Full View — Obsidian Spectrum",
      },
      {
        type: "detail",
        image: "/assets/models/model_07.jpeg",
        caption: "Textile Detail & Prism Refraction",
        aspect: "aspect-square",
      },
    ],
  },
  {
    id: "project-lifestyle-2025",
    number: "02",
    title: "FASHPRISM LIFESTYLE 2025 — DUBAI",
    subtitle: "DUBAI SYMPOSIUM",
    category: "LIFESTYLE & ART",
    year: "2025",
    location: "DUBAI",
    description:
      "An exclusive convergence of high fashion, curated lifestyle installations, and private delegate salons celebrating haute luxury and visionary design in Dubai.",
    heroImage: "/assets/models/model_03.jpeg",
    sequence: [
      {
        type: "image",
        image: "/assets/models/model_06.jpeg",
        caption: "Private Salon Exhibition — Dubai Edition",
        aspect: "aspect-square",
      },
      {
        type: "text",
        title: "CULTURE & CONVERGENCE",
        text: "Curated gatherings bridging international luxury houses with regional visionaries, crafting immersive environments beyond conventional exhibitions.",
      },
      {
        type: "image",
        image: "/assets/models/model_08.jpeg",
        caption: "Atmospheric Backstage Installation",
        aspect: "aspect-[16/9]",
      },
      {
        type: "full-width",
        image: "/assets/models/model_10.jpeg",
        caption: "The Dubai Horizon Series",
      },
      {
        type: "detail",
        image: "/assets/models/model_12.jpeg",
        caption: "Bespoke Material Engineering",
        aspect: "aspect-[4/5]",
      },
    ],
  },
];


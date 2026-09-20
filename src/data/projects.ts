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
    id: "lifestyle-2025",
    number: "01",
    title: "LIFESTYLE 2025",
    subtitle: "PREVIOUS EDITION — VISUAL ARCHIVE",
    category: "PREVIOUS EDITION",
    year: "2025",
    location: "DUBAI",
    description:
      "A visual record of the LifeStyle 2025 experience. Bringing together fashion, computational design, and high-couture identity.",
    heroImage: "/assets/models/model_01.jpeg",
    sequence: [
      {
        type: "image",
        image: "/assets/models/model_02.jpeg",
        caption: "LifeStyle 2025 — Haute Couture Silhouette Study",
        aspect: "aspect-[4/5]",
      },
      {
        type: "text",
        title: "THE LIFESTYLE ARCHIVE",
        text: "Every piece in LifeStyle 2025 reflects the convergence of physical garment artistry, spatial light, and luxury fashion design.",
      },
      {
        type: "image",
        image: "/assets/models/model_04.jpeg",
        caption: "LifeStyle 2025 — Spatial Drapery & Light",
        aspect: "aspect-[3/4]",
      },
      {
        type: "full-width",
        image: "/assets/models/model_05.jpeg",
        caption: "LifeStyle 2025 — Editorial Presentation",
      },
      {
        type: "detail",
        image: "/assets/models/model_07.jpeg",
        caption: "LifeStyle 2025 — Textile & Material Study",
        aspect: "aspect-square",
      },
    ],
  },
  {
    id: "lifestyle-2026",
    number: "02",
    title: "LIFESTYLE 2026",
    subtitle: "UPCOMING EVENT — DUBAI 2026",
    category: "UPCOMING EVENT",
    year: "2026",
    location: "DUBAI, UNITED ARAB EMIRATES",
    description:
      "An international fashion and lifestyle experience in Dubai. Registrations and sponsorships are open for delegates, designers, and brand partners.",
    heroImage: "/assets/models/model_03.jpeg",
    sequence: [
      {
        type: "image",
        image: "/assets/models/model_06.jpeg",
        caption: "LifeStyle 2026 — Dubai Preview",
        aspect: "aspect-square",
      },
      {
        type: "text",
        title: "REGISTRATIONS & SPONSORSHIPS ARE OPEN",
        text: "LifeStyle 2026 brings together international fashion houses, technology leaders, and luxury delegates in Dubai. Enquire for registration and sponsorship opportunities.",
      },
      {
        type: "image",
        image: "/assets/models/model_08.jpeg",
        caption: "LifeStyle 2026 — Experience Lounge",
        aspect: "aspect-[16/9]",
      },
      {
        type: "full-width",
        image: "/assets/models/model_10.jpeg",
        caption: "LifeStyle 2026 — Dubai Horizon Series",
      },
      {
        type: "detail",
        image: "/assets/models/model_12.jpeg",
        caption: "LifeStyle 2026 — High-Couture Innovation",
        aspect: "aspect-[4/5]",
      },
    ],
  },
];

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
  socialUrl?: string;
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
    id: "runway-2025",
    number: "01",
    title: "RUNWAY 2025",
    subtitle: "PREVIOUS EDITION — HAUTE RUNWAY PRESENTATION",
    category: "COMPLETED EDITION",
    year: "2025",
    location: "DUBAI",
    description:
      "A high-couture catwalk presentation within the FashAI Universal ecosystem. Highlighting spatial choreography, lighting art, and designer silhouettes.",
    heroImage: "/assets/models/model_12.jpeg",
    socialUrl: "https://www.facebook.com/profile.php?id=61573489951314",
    sequence: [
      {
        type: "image",
        image: "/assets/models/model_07.jpeg",
        caption: "Runway 2025 — Catwalk Presentation",
        aspect: "aspect-[4/5]",
      },
      {
        type: "text",
        title: "THE RUNWAY PRESENTATION",
        text: "Runway 2025 presented physical garment artistry integrated with spatial light installations and couture music direction.",
      },
      {
        type: "image",
        image: "/assets/models/model_09.jpeg",
        caption: "Runway 2025 — Silhouette & Lighting Study",
        aspect: "aspect-[3/4]",
      },
      {
        type: "full-width",
        image: "/assets/models/model_14.jpeg",
        caption: "Runway 2025 — Grand Finale Catwalk",
      },
    ],
  },
  {
    id: "lifestyle-2025",
    number: "02",
    title: "LIFESTYLE 2025",
    subtitle: "PREVIOUS EDITION — VISUAL ARCHIVE",
    category: "COMPLETED EDITION",
    year: "2025",
    location: "DUBAI",
    description:
      "A visual record of the LifeStyle 2025 experience. Bringing together physical garment art with spatial light and luxury fashion identity.",
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
    ],
  },
  {
    id: "lifestyle-2026",
    number: "03",
    title: "LIFESTYLE 2026",
    subtitle: "UPCOMING EVENT — DUBAI NOVEMBER 2026",
    category: "UPCOMING EVENT",
    year: "2026",
    location: "DUBAI · UNITED ARAB EMIRATES",
    description:
      "An international fashion and lifestyle experience in Dubai. Registrations and sponsorships are open for delegates, international designers, press, and brand partners.",
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
        image: "/assets/models/model_11.jpeg",
        caption: "LifeStyle 2026 — Dubai Horizon Series",
      },
    ],
  },
];

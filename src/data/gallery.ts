export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: "4/5" | "16/9" | "1/1" | "3/4" | "9/16";
  image: string;
  category: "RUNWAY 2025" | "LIFESTYLE 2025" | "LIFESTYLE 2026";
  tag: string;
  year: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-01",
    title: "ARCHITECTURAL DRAPERY",
    subtitle: "Couture Silhouette Study I",
    aspectRatio: "4/5",
    image: "/assets/models/model_01.jpeg",
    category: "RUNWAY 2025",
    tag: "COUTURE LOOK",
    year: "2025",
  },
  {
    id: "gal-02",
    title: "OBSIDIAN SILHOUETTE",
    subtitle: "Monolith Runway Series",
    aspectRatio: "16/9",
    image: "/assets/models/model_02.jpeg",
    category: "RUNWAY 2025",
    tag: "LIGHT & SHADOW",
    year: "2025",
  },
  {
    id: "gal-03",
    title: "CHAMPAGNE REVEAL",
    subtitle: "Private Salon Exhibition",
    aspectRatio: "1/1",
    image: "/assets/models/model_03.jpeg",
    category: "LIFESTYLE 2025",
    tag: "SALON INSTALLATION",
    year: "2025",
  },
  {
    id: "gal-04",
    title: "PRISM SPECTRUM",
    subtitle: "Digital Runway Artifacts",
    aspectRatio: "3/4",
    image: "/assets/models/model_04.jpeg",
    category: "RUNWAY 2025",
    tag: "EDITORIAL",
    year: "2025",
  },
  {
    id: "gal-05",
    title: "DUBAI HORIZON",
    subtitle: "Atmospheric Backstage Study",
    aspectRatio: "16/9",
    image: "/assets/models/model_05.jpeg",
    category: "LIFESTYLE 2025",
    tag: "BACKSTAGE",
    year: "2025",
  },
  {
    id: "gal-06",
    title: "AVANT-GARDE STRUCTURE",
    subtitle: "Textile Engineering",
    aspectRatio: "4/5",
    image: "/assets/models/model_06.jpeg",
    category: "RUNWAY 2025",
    tag: "HAUTE COUTURE",
    year: "2025",
  },
  {
    id: "gal-07",
    title: "EMIRATES PRISM",
    subtitle: "Dubai Edition Preview",
    aspectRatio: "3/4",
    image: "/assets/models/model_07.jpeg",
    category: "LIFESTYLE 2026",
    tag: "PREVIEW 2026",
    year: "2026",
  },
  {
    id: "gal-08",
    title: "LUMINOUS MONOLITH",
    subtitle: "Haute Couture Composition",
    aspectRatio: "4/5",
    image: "/assets/models/model_08.jpeg",
    category: "RUNWAY 2025",
    tag: "COUTURE LOOK",
    year: "2025",
  },
  {
    id: "gal-09",
    title: "DESERT SOVEREIGN",
    subtitle: "Luxury Salon Series — Dubai",
    aspectRatio: "1/1",
    image: "/assets/models/model_09.jpeg",
    category: "LIFESTYLE 2025",
    tag: "DUBAI SYMPOSIUM",
    year: "2025",
  },
  {
    id: "gal-10",
    title: "FUTURE HORIZON 2026",
    subtitle: "Digital Spatial Campaign",
    aspectRatio: "16/9",
    image: "/assets/models/model_11.jpeg",
    category: "LIFESTYLE 2026",
    tag: "CONCEPT 2026",
    year: "2026",
  },
  {
    id: "gal-11",
    title: "OPULENT TEXTURE",
    subtitle: "Silk & Metal Alloy Drapery",
    aspectRatio: "3/4",
    image: "/assets/models/model_13.jpeg",
    category: "RUNWAY 2025",
    tag: "TEXTILE CRAFT",
    year: "2025",
  },
  {
    id: "gal-12",
    title: "DUBAI SKYLINE REFRACTION",
    subtitle: "Atmospheric Light Study",
    aspectRatio: "4/5",
    image: "/assets/models/model_14.jpeg",
    category: "LIFESTYLE 2026",
    tag: "DUBAI 2026",
    year: "2026",
  },
];


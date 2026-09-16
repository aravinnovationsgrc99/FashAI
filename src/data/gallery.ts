export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: "4/5" | "16/9" | "1/1" | "3/4";
  image: string;
  category: string;
  year: string;
  designer?: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "gal-01",
    title: "ARCHITECTURAL DRAPERY",
    subtitle: "Couture Silhouette Study I",
    aspectRatio: "4/5",
    image: "/assets/models/model_04.jpeg",
    category: "RUNWAY LOOK",
    year: "2025",
  },
  {
    id: "gal-02",
    title: "OBSIDIAN SILHOUETTE",
    subtitle: "Monolith Runway Series",
    aspectRatio: "16/9",
    image: "/assets/models/model_05.jpeg",
    category: "LIGHT & SHADOW",
    year: "2025",
  },
  {
    id: "gal-03",
    title: "CHAMPAGNE REVEAL",
    subtitle: "Private Salon Exhibition",
    aspectRatio: "1/1",
    image: "/assets/models/model_06.jpeg",
    category: "LIFESTYLE",
    year: "2025",
  },
  {
    id: "gal-04",
    title: "PRISM SPECTRUM",
    subtitle: "Digital Runway Artifacts",
    aspectRatio: "3/4",
    image: "/assets/models/model_07.jpeg",
    category: "EDITORIAL",
    year: "2025",
  },
  {
    id: "gal-05",
    title: "DUBAI HORIZON",
    subtitle: "Atmospheric Backstage Study",
    aspectRatio: "16/9",
    image: "/assets/models/model_08.jpeg",
    category: "BACKSTAGE",
    year: "2025",
  },
  {
    id: "gal-06",
    title: "AVANT-GARDE STRUCTURE",
    subtitle: "Textile Engineering",
    aspectRatio: "4/5",
    image: "/assets/models/model_09.jpeg",
    category: "HAUTE COUTURE",
    year: "2025",
  },
];

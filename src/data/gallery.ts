export type GalleryCategory =
  | "ALL"
  | "RUNWAY & STAGE"
  | "COUTURE DETAILS"
  | "PEOPLE & MOMENTS"
  | "ARCHITECTURE & LIGHTING"
  | "EXPERIENCE";

export interface GalleryItem {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: "4/5" | "16/9" | "1/1" | "3/4" | "16/10" | "9/16";
  src: string;
  thumb: string;
  category: Exclude<GalleryCategory, "ALL">;
  tag: string;
  year: string;
  alt: string;
  width: number;
  height: number;
}

export const GALLERY_CATEGORIES: { id: GalleryCategory; label: string }[] = [
  { id: "ALL", label: "ALL" },
  { id: "RUNWAY & STAGE", label: "RUNWAY & STAGE" },
  { id: "COUTURE DETAILS", label: "COUTURE DETAILS" },
  { id: "PEOPLE & MOMENTS", label: "PEOPLE & MOMENTS" },
  { id: "ARCHITECTURE & LIGHTING", label: "ARCHITECTURE & LIGHTING" },
  { id: "EXPERIENCE", label: "EXPERIENCE" },
];

export const GALLERY_DATA: GalleryItem[] = [
  // 1. RUNWAY & STAGE
  {
    id: "gal-01",
    title: "LIFESTYLE 2025 RUNWAY I",
    subtitle: "High-Couture Silhouette & Stage Lighting",
    aspectRatio: "4/5",
    src: "/assets/models/model_01.jpeg",
    thumb: "/assets/models/model_01.jpeg",
    category: "RUNWAY & STAGE",
    tag: "COUTURE RUNWAY",
    year: "2025",
    alt: "FashAI Universal Runway Model Presentation 1",
    width: 1200,
    height: 1500,
  },
  {
    id: "gal-02",
    title: "DUBAI EDITION RUNWAY SHOWCASE",
    subtitle: "Monolithic Stage Design & Avant-Garde Draping",
    aspectRatio: "16/10",
    src: "/assets/models/model_02.jpeg",
    thumb: "/assets/models/model_02.jpeg",
    category: "RUNWAY & STAGE",
    tag: "STAGE SHOWCASE",
    year: "2025",
    alt: "FashAI Universal Stage Showcase 2",
    width: 1600,
    height: 1000,
  },
  {
    id: "gal-03",
    title: "GLOBAL FASHION WEEK CAPTURE",
    subtitle: "Catwalk Geometry & High-Fashion Motion",
    aspectRatio: "3/4",
    src: "/assets/models/model_07.jpeg",
    thumb: "/assets/models/model_07.jpeg",
    category: "RUNWAY & STAGE",
    tag: "CATWALK ART",
    year: "2026",
    alt: "FashAI Universal Runway Catwalk 3",
    width: 1200,
    height: 1600,
  },
  {
    id: "gal-04",
    title: "LIFESTYLE 2026 RUNWAY PREVIEW",
    subtitle: "Spatial Catwalk Illumination",
    aspectRatio: "4/5",
    src: "/assets/models/model-01/image-01.webp",
    thumb: "/assets/models/model-01/image-01_thumb.webp",
    category: "RUNWAY & STAGE",
    tag: "DUBAI 2026",
    year: "2026",
    alt: "FashAI Universal Stage Illumination 4",
    width: 1279,
    height: 1600,
  },

  // 2. COUTURE DETAILS
  {
    id: "gal-05",
    title: "COUTURE TEXTURE COMPOSITION I",
    subtitle: "Garment Craftsmanship & Material Engineering",
    aspectRatio: "1/1",
    src: "/assets/models/model_03.jpeg",
    thumb: "/assets/models/model_03.jpeg",
    category: "COUTURE DETAILS",
    tag: "TEXTILE STUDY",
    year: "2025",
    alt: "FashAI Universal Garment Craftsmanship Detail 5",
    width: 1200,
    height: 1200,
  },
  {
    id: "gal-06",
    title: "HAUTE COUTURE EMBROIDERIES",
    subtitle: "Artisanal Draping & Metallic Silk Focus",
    aspectRatio: "3/4",
    src: "/assets/models/model_04.jpeg",
    thumb: "/assets/models/model_04.jpeg",
    category: "COUTURE DETAILS",
    tag: "GARMENT ART",
    year: "2025",
    alt: "FashAI Universal Metallic Silk Draping 6",
    width: 1200,
    height: 1600,
  },
  {
    id: "gal-07",
    title: "HIGH-JEWELRY & SILHOUETTE DETAIL",
    subtitle: "Precision Atelier Tailoring",
    aspectRatio: "4/5",
    src: "/assets/models/model_06.jpeg",
    thumb: "/assets/models/model_06.jpeg",
    category: "COUTURE DETAILS",
    tag: "ATELIER DETAIL",
    year: "2025",
    alt: "FashAI Universal High Jewelry Tailoring 7",
    width: 1200,
    height: 1500,
  },
  {
    id: "gal-08",
    title: "LUXURY FABRIC REFLECTION",
    subtitle: "Structural Silhouette Form Study",
    aspectRatio: "3/4",
    src: "/assets/models/model-01/image-03.webp",
    thumb: "/assets/models/model-01/image-03_thumb.webp",
    category: "COUTURE DETAILS",
    tag: "SILHOUETTE FORM",
    year: "2026",
    alt: "FashAI Universal Structural Silhouette 8",
    width: 1066,
    height: 1600,
  },

  // 3. PEOPLE & MOMENTS
  {
    id: "gal-09",
    title: "DUBAI BACKSTAGE MOMENTS I",
    subtitle: "Spontaneous Backstage Expression & Styling",
    aspectRatio: "16/10",
    src: "/assets/models/model_05.jpeg",
    thumb: "/assets/models/model_05.jpeg",
    category: "PEOPLE & MOMENTS",
    tag: "BACKSTAGE PASS",
    year: "2025",
    alt: "FashAI Universal Backstage Styling 9",
    width: 1600,
    height: 1000,
  },
  {
    id: "gal-10",
    title: "ARTISTIC DIRECTOR PORTRAIT",
    subtitle: "Editorial Model Series & Expression",
    aspectRatio: "4/5",
    src: "/assets/models/model_08.jpeg",
    thumb: "/assets/models/model_08.jpeg",
    category: "PEOPLE & MOMENTS",
    tag: "PORTRAIT SERIES",
    year: "2025",
    alt: "FashAI Universal Portrait Series 10",
    width: 1200,
    height: 1500,
  },
  {
    id: "gal-11",
    title: "VIP GUEST & LIFESTYLE MOMENT",
    subtitle: "Salon Retrospective Capture",
    aspectRatio: "1/1",
    src: "/assets/models/model_09.jpeg",
    thumb: "/assets/models/model_09.jpeg",
    category: "PEOPLE & MOMENTS",
    tag: "COMMUNITY MOMENT",
    year: "2025",
    alt: "FashAI Universal VIP Guest Capture 11",
    width: 1200,
    height: 1200,
  },
  {
    id: "gal-12",
    title: "CHOREOGRAPHY & TALENT HARMONY",
    subtitle: "Stage Coordination & Ensemble Portrait",
    aspectRatio: "4/5",
    src: "/assets/models/model_10.jpeg",
    thumb: "/assets/models/model_10.jpeg",
    category: "PEOPLE & MOMENTS",
    tag: "TALENT NETWORK",
    year: "2025",
    alt: "FashAI Universal Ensemble Talent 12",
    width: 1200,
    height: 1500,
  },

  // 4. ARCHITECTURE & LIGHTING
  {
    id: "gal-13",
    title: "DUBAI SPATIAL ARCHITECTURE I",
    subtitle: "Atmospheric Raytracing & Volumetric Light",
    aspectRatio: "16/10",
    src: "/assets/models/model_11.jpeg",
    thumb: "/assets/models/model_11.jpeg",
    category: "ARCHITECTURE & LIGHTING",
    tag: "SPATIAL LIGHT",
    year: "2026",
    alt: "FashAI Universal Volumetric Lighting 13",
    width: 1600,
    height: 1000,
  },
  {
    id: "gal-14",
    title: "SALON MONOLITH & SHADOWS",
    subtitle: "Minimalist Venue Geometry",
    aspectRatio: "3/4",
    src: "/assets/models/model_12.jpeg",
    thumb: "/assets/models/model_12.jpeg",
    category: "ARCHITECTURE & LIGHTING",
    tag: "MONOLITH ARCHITECTURE",
    year: "2025",
    alt: "FashAI Universal Minimalist Architecture 14",
    width: 1200,
    height: 1600,
  },
  {
    id: "gal-15",
    title: "CINEMATIC EVENT ILLUMINATION",
    subtitle: "Spotlight Precision & Metallic Grids",
    aspectRatio: "4/5",
    src: "/assets/models/model_13.jpeg",
    thumb: "/assets/models/model_13.jpeg",
    category: "ARCHITECTURE & LIGHTING",
    tag: "CINEMATIC LIGHT",
    year: "2025",
    alt: "FashAI Universal Cinematic Illumination 15",
    width: 1200,
    height: 1500,
  },

  // 5. EXPERIENCE
  {
    id: "gal-16",
    title: "FASHAI UNIVERSAL IMMERSIVE SALON",
    subtitle: "Lifestyle 2026 Experience Preview",
    aspectRatio: "4/5",
    src: "/assets/models/model_14.jpeg",
    thumb: "/assets/models/model_14.jpeg",
    category: "EXPERIENCE",
    tag: "IMMERSIVE SALON",
    year: "2026",
    alt: "FashAI Universal Immersive Experience 16",
    width: 1200,
    height: 1500,
  },
  {
    id: "gal-17",
    title: "DUBAI SKYLINE EXPERIENTIAL",
    subtitle: "Luxury Lifestyle Showcase & High Fashion Integration",
    aspectRatio: "3/4",
    src: "/assets/models/model_15.jpeg",
    thumb: "/assets/models/model_15.jpeg",
    category: "EXPERIENCE",
    tag: "DUBAI 2026",
    year: "2026",
    alt: "FashAI Universal Dubai Experiential 17",
    width: 1200,
    height: 1600,
  },
  {
    id: "gal-18",
    title: "LIFESTYLE ARCHIVE FINALE",
    subtitle: "Universal Fashion Platform Retrospective",
    aspectRatio: "16/10",
    src: "/assets/models/model-02/image-01.webp",
    thumb: "/assets/models/model-02/image-01_thumb.webp",
    category: "EXPERIENCE",
    tag: "RETROSPECTIVE",
    year: "2025",
    alt: "FashAI Universal Experiential Finale 18",
    width: 1600,
    height: 1000,
  },
];

export const getGalleryItemsByCategory = (category: GalleryCategory): GalleryItem[] => {
  if (category === "ALL") return GALLERY_DATA;
  return GALLERY_DATA.filter((item) => item.category === category);
};

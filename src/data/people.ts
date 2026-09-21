export interface PeopleCategory {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  primaryImage: string;
  secondaryImages: string[];
  objectPosition: string; // Tailored object position to prevent face/head cropping
  aspectRatioClass: string;
  gridSpan: string;
}

export const PEOPLE_MASTER_DATA: PeopleCategory[] = [
  {
    id: "designers",
    title: "DESIGNERS",
    subtitle: "Discover international couture designers and garment artistry",
    tagline: "COUTURE ATELIER & DIRECTION",
    primaryImage: "/assets/master/designer/designer_01.png",
    secondaryImages: [
      "/assets/master/designer/designer_02.jpg",
      "/assets/master/designer/designer_03.jpg",
      "/assets/master/designer/designer_04.jpg",
    ],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "models",
    title: "MODELS",
    subtitle: "Explore featured runway talent and silhouette choreography",
    tagline: "RUNWAY & CATWALK DIRECTION",
    primaryImage: "/assets/master/models/model_01.png",
    secondaryImages: ["/assets/master/models/model_02.jpg"],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "makeup-artists",
    title: "MAKEUP ARTISTS",
    subtitle: "Beauty direction, backstage artistry, and spatial cosmetics",
    tagline: "BEAUTY & BACKSTAGE ARTISTRY",
    primaryImage: "/assets/master/makeup/makeup_01.png",
    secondaryImages: [
      "/assets/master/makeup/makeup_02.png",
      "/assets/master/makeup/makeup_03.jpg",
      "/assets/master/makeup/makeup_04.jpg",
    ],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "celebrities",
    title: "CELEBRITIES",
    subtitle: "Featured personalities, guests of honor, and VIP appearances",
    tagline: "GLOBAL PATRONS & VIP SALONS",
    primaryImage: "/assets/master/celebrity/celebrity_01.png",
    secondaryImages: ["/assets/master/celebrity/celebrity_02.jpg"],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "influencers",
    title: "INFLUENCERS",
    subtitle: "Creators, digital ambassadors, and international media voices",
    tagline: "DIGITAL CREATORS & VOICES",
    primaryImage: "/assets/master/influencers/influencer_01.png",
    secondaryImages: [
      "/assets/master/influencers/influencer_02.png",
      "/assets/master/influencers/influencer_03.png",
    ],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "stylists",
    title: "STYLISTS",
    subtitle: "Fashion preparation, wardrobe curation, and visual direction",
    tagline: "WARDROBE & STYLING DIRECTION",
    primaryImage: "/assets/master/stylist/stylist_01.png",
    secondaryImages: [
      "/assets/master/stylist/stylist_02.png",
      "/assets/master/stylist/stylist_03.png",
    ],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
];

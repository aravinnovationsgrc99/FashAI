export interface PeopleCategory {
  id: string;
  categoryId:
    | "fashion_designer"
    | "model"
    | "makeup_artist"
    | "fashion_stylist"
    | "influencer_creator"
    | "celebrity_public_figure"
    | "choreographer";
  title: string;
  subtitle: string;
  ctaLabel: string;
  tagline: string;
  primaryImage: string;
  secondaryImages: string[];
  objectPosition: string;
  aspectRatioClass: string;
  gridSpan: string;
}

export const PEOPLE_MASTER_DATA: PeopleCategory[] = [
  {
    id: "designers",
    categoryId: "fashion_designer",
    title: "FASHION DESIGNER",
    subtitle: "Showcase your design language and collaborate across fashion experiences.",
    ctaLabel: "JOIN AS A FASHION DESIGNER",
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
    categoryId: "model",
    title: "MODEL",
    subtitle: "Explore featured runway talent and silhouette choreography.",
    ctaLabel: "BECOME A MODEL",
    tagline: "RUNWAY & CATWALK DIRECTION",
    primaryImage: "/assets/master/models/model_01.png",
    secondaryImages: ["/assets/master/models/model_02.jpg"],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "makeup-artists",
    categoryId: "makeup_artist",
    title: "MAKEUP ARTIST",
    subtitle: "Bring beauty direction, editorial artistry and professional makeup expertise to our productions.",
    ctaLabel: "JOIN AS A MAKEUP ARTIST",
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
    id: "stylists",
    categoryId: "fashion_stylist",
    title: "FASHION STYLIST",
    subtitle: "Shape the visual language of fashion campaigns, editorials and runway experiences.",
    ctaLabel: "JOIN AS A FASHION STYLIST",
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
  {
    id: "influencers",
    categoryId: "influencer_creator",
    title: "INFLUENCER / CONTENT CREATOR",
    subtitle: "Create fashion, beauty and lifestyle stories with FashAI Universal.",
    ctaLabel: "JOIN AS A CREATOR",
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
    id: "celebrities",
    categoryId: "celebrity_public_figure",
    title: "CELEBRITY / PUBLIC FIGURE",
    subtitle: "Explore opportunities across fashion campaigns, events, shoots and brand experiences.",
    ctaLabel: "JOIN AS A CELEBRITY / PUBLIC FIGURE",
    tagline: "GLOBAL PATRONS & VIP SALONS",
    primaryImage: "/assets/master/celebrity/celebrity_01.png",
    secondaryImages: ["/assets/master/celebrity/celebrity_02.jpg"],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
  {
    id: "choreographers",
    categoryId: "choreographer",
    title: "CHOREOGRAPHER",
    subtitle: "Focus on movement, choreography, runway direction, performance and stage presentation.",
    ctaLabel: "APPLY AS CHOREOGRAPHER",
    tagline: "MOVEMENT & CATWALK CHOREOGRAPHY",
    primaryImage: "/assets/master/choreographer/choreographer.png",
    secondaryImages: ["/assets/master/choreographer/Chreographer.png"],
    objectPosition: "object-top",
    aspectRatioClass: "aspect-[4/5]",
    gridSpan: "lg:col-span-4",
  },
];

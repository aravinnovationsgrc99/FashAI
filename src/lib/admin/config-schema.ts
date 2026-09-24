export interface MaintenanceSettings {
  enabled: boolean;
  title: string;
  message: string;
  allowNavigation: boolean;
  allowEnquiryForms: boolean;
  allowRegistrations: boolean;
  allowApplications: boolean;
  allowGalleryInteraction: boolean;
  allowCTA: boolean;
}

export interface GlobalSettings {
  siteTitle: string;
  metaTitle: string;
  metaDescription: string;
  favicon: string;
  ogImage: string;
  contactEmail: string;
  instagramUrl: string;
  copyrightYear: string;
  defaultCtaText: string;
  defaultCtaUrl: string;
}

export interface ColorPalette {
  background: string;
  primaryText: string;
  secondaryText: string;
  primaryAccent: string;
  secondaryAccent: string;
  softSurface: string;
  border: string;
}

export interface ThemeSettings {
  light: ColorPalette;
  dark: ColorPalette;
}

export interface TypographySettings {
  headingFont: string;
  bodyFont: string;
  navigationFont: string;
  headingScale: number;
  bodyScale: number;
  letterSpacing: string;
  lineHeight: string;
}

export interface HeroSettings {
  title: string;
  subtitle: string;
  eyebrow: string;
  supportingText: string;
  ctaText: string;
  ctaUrl: string;
  heroImage: string;
  heroFallbackImage: string;
  heroVideo: string;
  posterImage: string;
  overlayOpacity: number;
  brightness: number;
  imagePosition: string;
  videoAutoplay: boolean;
  videoLoop: boolean;
  videoMuted: boolean;
  mobileImage: string;
  mobileVideo: string;
  mobileFallback: string;
}

export interface HomepageSectionConfig {
  id: string;
  title: string;
  enabled: boolean;
  order: number;
}

export interface EventConfig {
  id: string;
  title: string;
  category: "LIFESTYLE" | "RUNWAY";
  description: string;
  location: string;
  date: string;
  venue: string;
  status: string;
  registrationStatus: string;
  sponsorshipStatus: string;
  dressCode: string;
  coverImage: string;
  galleryImages: string[];
  ctaText: string;
  ctaUrl: string;
  featured: boolean;
}

export interface PopupSettings {
  enabled: boolean;
  eventId: string;
  title: string;
  subtitle: string;
  backgroundImage: string;
  overlayOpacity: number;
  date: string;
  venue: string;
  dressCode: string;
  registrationCtaText: string;
  sponsorshipCtaText: string;
  registrationUrl: string;
  sponsorshipUrl: string;
  displayDelay: number;
  scrollTriggerPercentage: number;
  showOncePerSession: boolean;
  showOncePerVisitor: boolean;
}

export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
  order: number;
}

export interface FooterLink {
  label: string;
  href: string;
  enabled: boolean;
}

export interface FooterSettings {
  brandName: string;
  description: string;
  instagramHandle: string;
  instagramUrl: string;
  exploreLinks: FooterLink[];
  getInvolvedLinks: FooterLink[];
  legalLinks: FooterLink[];
  poweredByLogo: string;
}

export interface ApplicationCategoryConfig {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
  fields: { name: string; label: string; required: boolean; type: string }[];
}

export interface MotionSettings {
  globalAnimations: boolean;
  pageTransitions: boolean;
  scrollAnimations: boolean;
  hoverAnimations: boolean;
  backgroundMotion: boolean;
  customCursor: boolean;
  backgroundVideo: boolean;
  reducedMotionSafe: boolean;
}

export interface PageConfig {
  id: string;
  route: string;
  title: string;
  metaDescription: string;
  published: boolean;
  visibility: "PUBLIC" | "PRIVATE" | "DRAFT";
}

export interface MediaItem {
  id: string;
  filename: string;
  url: string;
  type: "image" | "video";
  size: number;
  dimensions?: string;
  altText: string;
  caption: string;
  category: string;
  tags: string[];
  focalPoint?: string;
  uploadedAt: string;
  usedIn: string[];
}

export interface GalleryItemConfig {
  id: string;
  title: string;
  image: string;
  category: string;
  caption: string;
  altText: string;
  published: boolean;
  featured: boolean;
  order: number;
}

export interface VersionHistoryEntry {
  versionId: string;
  publishedAt: string;
  publishedBy: string;
  note: string;
  configSnapshot: MasterSiteConfig;
}

export interface MasterSiteConfig {
  maintenanceSettings: MaintenanceSettings;
  globalSettings: GlobalSettings;
  themeSettings: ThemeSettings;
  typographySettings: TypographySettings;
  heroSettings: HeroSettings;
  homepageSections: HomepageSectionConfig[];
  events: EventConfig[];
  popupSettings: PopupSettings;
  navigationSettings: NavItemConfig[];
  footerSettings: FooterSettings;
  applicationCategories: ApplicationCategoryConfig[];
  motionSettings: MotionSettings;
  pages: PageConfig[];
  galleryItems: GalleryItemConfig[];
  mediaLibrary: MediaItem[];
  lastUpdated: string;
  lastMediaUpdate: string;
  isDraft?: boolean;
}

export interface SubmissionRecord {
  id: string;
  type: "CONTACT" | "APPLICATION";
  applicationType?: string;
  fullName: string;
  email: string;
  phone?: string;
  country?: string;
  city?: string;
  organization?: string;
  role?: string;
  enquiryType?: string;
  eventInterest?: string;
  message?: string;
  categoryDetails?: Record<string, unknown>;
  status: "NEW" | "UNDER REVIEW" | "CONTACTED" | "ARCHIVED";
  submittedAt: string;
}

export interface ActivityLogEntry {
  id: string;
  action: string;
  actor: string;
  timestamp: string;
  details: string;
  category: "AUTH" | "CONTENT" | "THEME" | "MEDIA" | "MAINTENANCE" | "BACKUP" | "SETTINGS";
}

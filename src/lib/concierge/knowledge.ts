export interface QuickAction {
  id: string;
  label: string;
  actionType: "navigate" | "query" | "enquiry" | "filter_gallery";
  target?: string;
}

export interface ConciergeMessageResponse {
  message: string;
  quickActions?: QuickAction[];
  navigationTarget?: string;
  galleryCategory?: string;
  enquiryPrompt?: boolean;
}

export const FASHAI_KNOWLEDGE = {
  brand: "FashAI Universal",
  parentEntity: "Powered by Arav Innovation",
  websiteUrl: "https://fashai-beryl.vercel.app",
  officialParentUrl: "https://aravinnovations.com/",
  officialInstagram: "https://www.instagram.com/fashai_universal",
  upcomingEdition: "LifeStyle 2026",
  upcomingLocation: "Dubai · 2026",
  previousEdition: "LifeStyle 2025",
  currentStatus: "Registrations and sponsorships are open.",
  
  galleryCategories: [
    { id: "RUNWAY", label: "RUNWAY & STAGE", query: "runway" },
    { id: "COUTURE", label: "COUTURE DETAILS", query: "couture" },
    { id: "PEOPLE", label: "PEOPLE & MOMENTS", query: "people" },
    { id: "ARCHITECTURE", label: "ARCHITECTURE & LIGHTING", query: "architecture" },
    { id: "EXPERIENCE", label: "EXPERIENCE", query: "experience" },
  ],

  guardrailResponse: "That information has not been announced yet. Details regarding exact dates, specific venues, and full guest lists will be announced officially. Registrations and sponsorships are currently open.",

  initialGreeting: "Hi! How can I help you?",
  
  initialQuickActions: [
    { id: "lifestyle-2026", label: "LifeStyle 2026", actionType: "query", target: "LifeStyle 2026" },
    { id: "runway", label: "Runway", actionType: "query", target: "Runway" },
    { id: "registration", label: "Register / Enquire", actionType: "enquiry", target: "Registration" },
    { id: "sponsorship", label: "Sponsorship", actionType: "enquiry", target: "Sponsorship" },
    { id: "gallery", label: "Gallery", actionType: "navigate", target: "/gallery" },
    { id: "talent-network", label: "Talent Network", actionType: "query", target: "Talent Network" },
    { id: "contact-fashai", label: "Contact FashAI", actionType: "navigate", target: "/contact" },
  ] as QuickAction[],

  intentOptions: [
    { id: "attend", label: "Attend Event", intent: "attendee" },
    { id: "sponsor", label: "Sponsorship", intent: "sponsor" },
    { id: "designer", label: "Designer / Professional", intent: "designer" },
    { id: "media", label: "Press & Media", intent: "media" },
    { id: "collaboration", label: "Collaboration", intent: "collaboration" },
    { id: "exploring", label: "Explore Experience", intent: "exploring" },
  ]
};

// Knowledge query matcher for fallback/deterministic responses
export function queryKnowledgeBase(query: string, intentContext?: string | null): ConciergeMessageResponse {
  const q = query.toLowerCase();

  // 1. Sponsorship Queries
  if (q.includes("sponsor") || q.includes("sponsorship") || q.includes("partner")) {
    return {
      message: "FashAI Universal offers premium partnership opportunities for global fashion, technology, and luxury brands at LifeStyle 2026 in Dubai. Registrations and sponsorship enquiries are open.",
      quickActions: [
        { id: "submit-sponsor", label: "Sponsorship Enquiry →", actionType: "enquiry", target: "Sponsorship" },
        { id: "explore-projects", label: "View Previous Editions", actionType: "navigate", target: "/projects" },
      ],
      navigationTarget: "/contact?type=Sponsorship",
      enquiryPrompt: true
    };
  }

  // 2. Registration / Attendance / Ticket Queries
  if (q.includes("register") || q.includes("registration") || q.includes("attend") || q.includes("ticket") || q.includes("delegate") || q.includes("enquire")) {
    return {
      message: "Registrations and sponsorship enquiries are open for international delegates, designers, media representatives, and fashion professionals for LifeStyle 2026 Dubai.",
      quickActions: [
        { id: "submit-reg", label: "Register / Enquire →", actionType: "enquiry", target: "Registration" },
        { id: "explore-lifestyle", label: "Explore LifeStyle 2026", actionType: "navigate", target: "/upcoming" },
      ],
      navigationTarget: "/contact?type=Registration",
      enquiryPrompt: true
    };
  }

  // 3. Gallery & Visual Archive Queries
  if (q.includes("gallery") || q.includes("photo") || q.includes("picture") || q.includes("image") || q.includes("lookbook")) {
    if (q.includes("runway") || q.includes("stage")) {
      return {
        message: "Navigating to the Visual Archive — filtered by Runway & Stage.",
        quickActions: [
          { id: "full-gallery", label: "Explore All Archives", actionType: "navigate", target: "/gallery" }
        ],
        navigationTarget: "/gallery",
        galleryCategory: "RUNWAY"
      };
    }

    return {
      message: "The FashAI Universal Visual Archive showcases moments across Runway & Stage, Couture Details, People & Moments, Architecture & Spatial Lighting, and Experience.",
      quickActions: [
        { id: "nav-gallery", label: "View Gallery Archive ↗", actionType: "navigate", target: "/gallery" },
        { id: "explore-2025", label: "LifeStyle 2025 Retrospective", actionType: "navigate", target: "/2025" }
      ],
      navigationTarget: "/gallery"
    };
  }

  // 4. LifeStyle 2026 / Dubai / Runway Queries
  if (q.includes("2026") || q.includes("lifestyle 2026") || q.includes("dubai") || q.includes("upcoming") || q.includes("runway")) {
    return {
      message: "LifeStyle 2026 is FashAI Universal's upcoming international fashion and lifestyle experience in Dubai. Registrations and sponsorship enquiries are open.",
      quickActions: [
        { id: "explore-2026-page", label: "Explore LifeStyle 2026 ↗", actionType: "navigate", target: "/upcoming" },
        { id: "register-2026", label: "Register / Enquire", actionType: "enquiry", target: "Registration" },
        { id: "sponsor-2026", label: "Sponsorship Enquiry", actionType: "enquiry", target: "Sponsorship" }
      ],
      navigationTarget: "/upcoming"
    };
  }

  // 5. Talent / Models / Designers / Community Queries
  if (q.includes("talent") || q.includes("designer") || q.includes("model") || q.includes("community") || q.includes("makeup") || q.includes("stylist")) {
    return {
      message: "FashAI Universal connects international designers, runway models, makeup artists, celebrities, and stylists across our Dubai 2026 platform. Applications for designer showcases and creative participation are open.",
      quickActions: [
        { id: "community-reg", label: "Register / Enquire →", actionType: "enquiry", target: "Registration" },
        { id: "view-community", label: "Explore Fashion Community", actionType: "navigate", target: "/#people" },
      ],
      navigationTarget: "/#people"
    };
  }

  // 6. Specific Date / Venue / Schedule / Unannounced Details Guardrail
  if (q.includes("date") || q.includes("venue") || q.includes("address") || q.includes("price") || q.includes("cost") || q.includes("schedule") || q.includes("when") || q.includes("where")) {
    return {
      message: "That information has not been announced yet. Event date and venue details will be released officially. Registrations and sponsorships are open.",
      quickActions: [
        { id: "reg-interest", label: "Register / Enquire →", actionType: "enquiry", target: "Registration" },
        { id: "contact-page", label: "Contact FashAI", actionType: "navigate", target: "/contact" }
      ]
    };
  }

  // 7. Contact & Communication Queries
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone")) {
    return {
      message: "You can reach the FashAI Universal team directly through our official enquiry portal or by submitting your details online.",
      quickActions: [
        { id: "contact-form-nav", label: "Contact FashAI ↗", actionType: "navigate", target: "/contact" },
        { id: "direct-enquiry", label: "Register / Enquire", actionType: "enquiry", target: "General Enquiry" },
      ],
      navigationTarget: "/contact"
    };
  }

  // Default Editorial Fallback
  return {
    message: "FashAI Universal is an international fashion and lifestyle experience in Dubai · 2026. How can I help you today?",
    quickActions: [
      { id: "qa-lifestyle", label: "LifeStyle 2026", actionType: "navigate", target: "/upcoming" },
      { id: "qa-gallery", label: "Gallery", actionType: "navigate", target: "/gallery" },
      { id: "qa-enquiry", label: "Register / Enquire", actionType: "enquiry", target: "Registration" }
    ]
  };
}

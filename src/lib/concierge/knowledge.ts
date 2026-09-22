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

  guardrailResponse: "Details regarding exact schedules, full guest lists, and specific venue addresses are yet to be announced. Registrations and sponsorships are currently open.",

  initialGreeting: "Welcome to FashAI Universal. How can I guide you today?",
  
  initialQuickActions: [
    { id: "lifestyle-2026", label: "LifeStyle 2026", actionType: "query", target: "LifeStyle 2026" },
    { id: "runway", label: "Runway", actionType: "query", target: "Runway" },
    { id: "registration", label: "Registration", actionType: "enquiry", target: "Registration" },
    { id: "sponsorship", label: "Sponsorship", actionType: "enquiry", target: "Sponsorship" },
    { id: "gallery", label: "Gallery", actionType: "navigate", target: "/gallery" },
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
      message: "FashAI Universal offers premium partnership opportunities for global fashion, technology, and luxury brands at LifeStyle 2026 in Dubai. Registrations & sponsorships are currently open.",
      quickActions: [
        { id: "submit-sponsor", label: "Send Sponsorship Enquiry →", actionType: "enquiry", target: "Sponsorship" },
        { id: "explore-projects", label: "View Previous Editions", actionType: "navigate", target: "/projects" },
      ],
      navigationTarget: "/contact?type=Sponsorship",
      enquiryPrompt: true
    };
  }

  // 2. Registration / Attendance / Ticket Queries
  if (q.includes("register") || q.includes("registration") || q.includes("attend") || q.includes("ticket") || q.includes("delegate")) {
    return {
      message: "Registrations are open for international delegates, designers, media representatives, and fashion professionals for LifeStyle 2026 Dubai.",
      quickActions: [
        { id: "submit-reg", label: "Begin Registration →", actionType: "enquiry", target: "Registration" },
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
    if (q.includes("couture") || q.includes("detail")) {
      return {
        message: "Navigating to the Visual Archive — filtered by Couture Details.",
        quickActions: [
          { id: "full-gallery", label: "Explore All Archives", actionType: "navigate", target: "/gallery" }
        ],
        navigationTarget: "/gallery",
        galleryCategory: "COUTURE"
      };
    }
    if (q.includes("people") || q.includes("moments") || q.includes("model")) {
      return {
        message: "Navigating to the Visual Archive — filtered by People & Moments.",
        quickActions: [
          { id: "full-gallery", label: "Explore All Archives", actionType: "navigate", target: "/gallery" }
        ],
        navigationTarget: "/gallery",
        galleryCategory: "PEOPLE"
      };
    }

    return {
      message: "The FashAI Universal Visual Archive showcases moments across Runway & Stage, Couture Details, People & Moments, Architecture & Spatial Lighting, and Experience.",
      quickActions: [
        { id: "nav-gallery", label: "View Gallery Archive ↗", actionType: "navigate", target: "/gallery" },
        { id: "explore-2025", label: "LifeStyle 2025 Chapter", actionType: "navigate", target: "/2025" }
      ],
      navigationTarget: "/gallery"
    };
  }

  // 4. LifeStyle 2026 / Dubai Queries
  if (q.includes("2026") || q.includes("lifestyle 2026") || q.includes("dubai") || q.includes("upcoming")) {
    return {
      message: "LifeStyle 2026 is the premier upcoming computational fashion and haute couture event taking place in Dubai · 2026. Registrations and sponsorships are actively open.",
      quickActions: [
        { id: "explore-2026-page", label: "Explore LifeStyle 2026 ↗", actionType: "navigate", target: "/upcoming" },
        { id: "register-2026", label: "Register / Enquire", actionType: "enquiry", target: "Registration" }
      ],
      navigationTarget: "/upcoming"
    };
  }

  // 5. LifeStyle 2025 Queries
  if (q.includes("2025") || q.includes("lifestyle 2025") || q.includes("previous")) {
    return {
      message: "LifeStyle 2025 was an landmark architectural haute presentation where AI technology, spatial lighting, and high-couture identity converged.",
      quickActions: [
        { id: "view-2025", label: "View 2025 Retrospective ↗", actionType: "navigate", target: "/2025" },
        { id: "view-gallery", label: "Visual Archive", actionType: "navigate", target: "/gallery" }
      ],
      navigationTarget: "/2025"
    };
  }

  // 6. Specific Date / Venue / Schedule / Unannounced Details Guardrail
  if (q.includes("date") || q.includes("venue") || q.includes("address") || q.includes("price") || q.includes("cost") || q.includes("ticket price") || q.includes("schedule")) {
    return {
      message: "Exact event dates, venue locations, and detailed program schedules are yet to be announced for LifeStyle 2026 Dubai. You may register your interest to receive official updates immediately upon announcement.",
      quickActions: [
        { id: "reg-interest", label: "Register Interest →", actionType: "enquiry", target: "Registration" },
        { id: "contact-page", label: "Contact Us", actionType: "navigate", target: "/contact" }
      ]
    };
  }

  // 7. Designers, Makeup Artists, Models, Stylists & Community Queries
  if (q.includes("designer") || q.includes("makeup") || q.includes("model") || q.includes("stylist") || q.includes("influencer") || q.includes("community")) {
    return {
      message: "FashAI Universal connects international designers, runway models, makeup artists, celebrities, influencers, and stylists across our Dubai 2026 platform. Applications for designer showcases and creative participation are open.",
      quickActions: [
        { id: "community-reg", label: "Apply as Professional →", actionType: "enquiry", target: "Registration" },
        { id: "view-community", label: "Explore Fashion Community", actionType: "navigate", target: "/#people" },
      ],
      navigationTarget: "/#people"
    };
  }

  // 8. Contact & Communication Queries
  if (q.includes("contact") || q.includes("email") || q.includes("reach") || q.includes("phone") || q.includes("location")) {
    return {
      message: "You can reach the FashAI Universal team directly through our official enquiry portal or by registering your details online.",
      quickActions: [
        { id: "contact-form-nav", label: "Contact Form ↗", actionType: "navigate", target: "/contact" },
        { id: "direct-enquiry", label: "Submit Direct Enquiry", actionType: "enquiry", target: "General Enquiry" },
      ],
      navigationTarget: "/contact"
    };
  }

  // 9. General Brand & Arav Innovation Queries
  if (q.includes("arav") || q.includes("about") || q.includes("who") || q.includes("fashai")) {
    return {
      message: "FashAI Universal is an international architectural fashion platform powered by Arav Innovation, bringing together computational design, spatial lighting, luxury couture, and artificial intelligence.",
      quickActions: [
        { id: "explore-lifestyle", label: "Explore LifeStyle", actionType: "navigate", target: "/projects" },
        { id: "contact-team", label: "Contact FashAI Team", actionType: "navigate", target: "/contact" }
      ]
    };
  }

  // Default Editorial Fallback
  return {
    message: "FashAI Universal represents the convergence of haute couture, computational fashion, and spatial experiences in Dubai · 2026. How can I guide your discovery today?",
    quickActions: [
      { id: "qa-lifestyle", label: "LifeStyle 2026", actionType: "navigate", target: "/upcoming" },
      { id: "qa-gallery", label: "Visual Archive", actionType: "navigate", target: "/gallery" },
      { id: "qa-enquiry", label: "Register / Enquire", actionType: "enquiry", target: "Registration" }
    ]
  };
}

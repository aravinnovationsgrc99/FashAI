export interface QuickChip {
  id: string;
  label: string;
  actionKey: string;
  payload?: string;
}

export interface ConciergeKnowledgeResponse {
  message: string;
  quickChips?: QuickChip[];
  navigationTarget?: string;
  detectedRole?: string;
  startFlow?: "CREATIVE" | "SPONSORSHIP" | "REGISTRATION" | "CONTACT";
}

export function queryKnowledgeBase(queryText: string, siteConfig?: any): ConciergeKnowledgeResponse {
  const q = queryText.toLowerCase().trim();

  // Dynamic values from live site config (Source of Truth)
  const brandName = siteConfig?.footerSettings?.brandName || siteConfig?.globalSettings?.siteTitle || "FashAI Universal";
  const upcomingEventName = siteConfig?.events?.[0]?.title || "LifeStyle 2026";
  const upcomingLocation = siteConfig?.events?.[0]?.location || "Dubai · UAE";

  // 1. GREETINGS & GENERAL BRAND INTENT
  if (q === "hi" || q === "hello" || q === "hey" || q.startsWith("good morning") || q.startsWith("good evening")) {
    return {
      message: `Hi, welcome to ${brandName}.\nHow can I help?`,
      quickChips: [
        { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
        { id: "qp-join", label: "Join the network", actionKey: "JOIN_NETWORK" },
        { id: "qp-apply", label: "Apply / nominate", actionKey: "APPLY_NOMINATE" },
        { id: "qp-contact", label: "Contact the team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  if (
    q.includes("what is fashai") ||
    q.includes("tell me about fashai") ||
    q.includes("what do you do") ||
    q.includes("what is this website") ||
    q.includes("who are you")
  ) {
    return {
      message: `${brandName} is a fashion and experience platform connecting fashion, talent, creativity and events across Dubai, UAE and India.`,
      quickChips: [
        { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
        { id: "qp-join", label: "Join the network", actionKey: "JOIN_NETWORK" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  if (q.includes("how can you help") || q.includes("what can i do here") || q.includes("i want to know more")) {
    return {
      message: `I can help you explore upcoming events, apply for talent & designer showcases, submit nominations, or connect with our team for sponsorships and enquiries.`,
      quickChips: [
        { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
        { id: "qp-join", label: "Join the network", actionKey: "JOIN_NETWORK" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 2. LOCATION & PRESENCE
  if (q.includes("where are you based") || q.includes("location") || q.includes("where is fashai")) {
    return {
      message: `${brandName} operates internationally across the United Arab Emirates (${upcomingLocation}) and India.`,
      quickChips: [
        { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 3. EVENT QUERIES (LifeStyle, Runway, Upcoming)
  if (
    q.includes("what events") ||
    q.includes("upcoming events") ||
    q.includes("what is upcoming") ||
    q.includes("tell me about lifestyle") ||
    q.includes("what is lifestyle") ||
    q.includes("tell me about runway") ||
    q.includes("runway event") ||
    q.includes("lifestyle event") ||
    q.includes("event details") ||
    q === "show upcoming" ||
    q === "upcoming"
  ) {
    return {
      message: `${upcomingEventName} is our upcoming international fashion and lifestyle experience in ${upcomingLocation}, bringing together runway presentations, couture details, and creative talent.`,
      quickChips: [
        { id: "qp-nav-upcoming", label: "View upcoming page ↗", actionKey: "NAVIGATE", payload: "/upcoming" },
        { id: "qp-reg", label: "Register / enquire", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Sponsorship", actionKey: "START_SPONSORSHIP" },
      ],
      navigationTarget: "/upcoming",
    };
  }

  // Specific Date/Venue Guardrail
  if (
    q.includes("where is the event") ||
    q.includes("when is the event") ||
    q.includes("exact date") ||
    q.includes("exact venue") ||
    q.includes("ticket price") ||
    q.includes("ticket cost")
  ) {
    return {
      message: "That detail hasn't been announced yet. You can register your interest or contact our team for official updates.",
      quickChips: [
        { id: "qp-reg", label: "Register / enquire", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Sponsorship", actionKey: "START_SPONSORSHIP" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  if (
    q.includes("how can i attend") ||
    q.includes("how can i participate") ||
    q.includes("registration open") ||
    q.includes("is registration open") ||
    q.includes("sponsorship open") ||
    q.includes("is sponsorship open")
  ) {
    return {
      message: `Registrations and sponsorship enquiries are currently open for ${upcomingEventName} in ${upcomingLocation}.`,
      quickChips: [
        { id: "qp-reg", label: "Register / enquire", actionKey: "START_REGISTRATION" },
        { id: "qp-sponsor", label: "Sponsorship", actionKey: "START_SPONSORSHIP" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 4. MODEL ROLE & APPLICATION
  if (
    q.includes("model") ||
    q.includes("become a model") ||
    q.includes("modeling") ||
    q.includes("i am a model")
  ) {
    return {
      message: "Applications are open for runway and showcase models. Would you like to start your model application?",
      detectedRole: "model",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-model", label: "Start application", actionKey: "START_ROLE_APP", payload: "model" },
        { id: "qp-other-roles", label: "Explore other roles", actionKey: "JOIN_NETWORK" },
      ],
    };
  }

  // 5. DESIGNER ROLE & APPLICATION
  if (
    q.includes("designer") ||
    q.includes("fashion designer") ||
    q.includes("showcase my designs") ||
    q.includes("i am a designer") ||
    q.includes("i'm a designer")
  ) {
    return {
      message: "We welcome international designers for runway and collection presentations. Would you like to start your designer application?",
      detectedRole: "fashion_designer",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-designer", label: "Start application", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
        { id: "qp-sponsor", label: "Sponsorship enquiry", actionKey: "START_SPONSORSHIP" },
      ],
    };
  }

  // 6. MAKEUP ARTIST ROLE
  if (
    q.includes("makeup") ||
    q.includes("make up") ||
    q.includes("i do makeup") ||
    q.includes("makeup artist")
  ) {
    return {
      message: "Applications are open for editorial and runway makeup artists. Would you like to start your application?",
      detectedRole: "makeup_artist",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-makeup", label: "Start application", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
      ],
    };
  }

  // 7. STYLIST ROLE
  if (
    q.includes("stylist") ||
    q.includes("fashion stylist") ||
    q.includes("i am a stylist") ||
    q.includes("i'm a stylist") ||
    q.includes("styling")
  ) {
    return {
      message: "Applications are open for fashion and editorial stylists. Would you like to start your application?",
      detectedRole: "fashion_stylist",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-stylist", label: "Start application", actionKey: "START_ROLE_APP", payload: "fashion_stylist" },
      ],
    };
  }

  // 8. CREATOR / INFLUENCER ROLE
  if (
    q.includes("influencer") ||
    q.includes("content creator") ||
    q.includes("fashion content") ||
    q.includes("creator") ||
    q.includes("i create fashion content")
  ) {
    return {
      message: "We collaborate with fashion influencers and content creators across Dubai and international editions. Would you like to apply?",
      detectedRole: "influencer_creator",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-creator", label: "Start application", actionKey: "START_ROLE_APP", payload: "influencer_creator" },
      ],
    };
  }

  // 9. CELEBRITY / PUBLIC FIGURE ROLE
  if (
    q.includes("celebrity") ||
    q.includes("public figure") ||
    q.includes("vip guest")
  ) {
    return {
      message: "We host public figures, celebrities, and VIP talent across our runway galas. Would you like to submit your details?",
      detectedRole: "celebrity_public_figure",
      startFlow: "CREATIVE",
      quickChips: [
        { id: "qp-start-celeb", label: "Submit details", actionKey: "START_ROLE_APP", payload: "celebrity_public_figure" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 10. NOMINATIONS
  if (
    q.includes("nominate") ||
    q.includes("nomination") ||
    q.includes("open nominations") ||
    q.includes("i want to nominate someone")
  ) {
    return {
      message: "Open nominations are available for outstanding creative talent and industry visionaries. Would you like to submit a nomination?",
      quickChips: [
        { id: "qp-start-nomination", label: "Submit nomination", actionKey: "START_ROLE_APP", payload: "nomination" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 11. GENERAL APPLICATIONS / JOIN / PARTICIPATE
  if (
    q.includes("i want to apply") ||
    q.includes("how do i apply") ||
    q.includes("where can i apply") ||
    q.includes("are applications open") ||
    q.includes("open applications") ||
    q.includes("i want to join") ||
    q.includes("can i join") ||
    q.includes("how do i get involved")
  ) {
    return {
      message: "Applications and registrations are open across our creative network. What role would you like to participate as?",
      quickChips: [
        { id: "qp-join-designer", label: "Designer", actionKey: "START_ROLE_APP", payload: "fashion_designer" },
        { id: "qp-join-model", label: "Model", actionKey: "START_ROLE_APP", payload: "model" },
        { id: "qp-join-makeup", label: "Makeup Artist", actionKey: "START_ROLE_APP", payload: "makeup_artist" },
        { id: "qp-join-all", label: "View all options", actionKey: "JOIN_NETWORK" },
      ],
    };
  }

  // 12. SPONSORSHIP & PARTNERSHIP
  if (
    q.includes("sponsor") ||
    q.includes("sponsorship") ||
    q.includes("how do i sponsor") ||
    q.includes("i want to sponsor") ||
    q.includes("brand partner")
  ) {
    return {
      message: `FashAI Universal offers title, showcase, IT, and media sponsorship opportunities for ${upcomingEventName}. Would you like to start a sponsorship enquiry?`,
      startFlow: "SPONSORSHIP",
      quickChips: [
        { id: "qp-start-sp", label: "Start sponsorship enquiry", actionKey: "START_SPONSORSHIP" },
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
      ],
    };
  }

  // 13. COLLABORATION / WORK WITH US
  if (
    q.includes("collaborate") ||
    q.includes("i want to collaborate") ||
    q.includes("work with you") ||
    q.includes("i want to work with you")
  ) {
    return {
      message: "We welcome creative, media, and brand collaborations across Dubai and India. Would you like to connect with our team?",
      quickChips: [
        { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" },
        { id: "qp-sponsor", label: "Sponsorship", actionKey: "START_SPONSORSHIP" },
      ],
    };
  }

  // 14. GALLERY & VISUAL ARCHIVE
  if (
    q.includes("gallery") ||
    q.includes("show me the gallery") ||
    q.includes("show me your work") ||
    q.includes("show previous events") ||
    q.includes("photo") ||
    q.includes("picture") ||
    q.includes("lookbook")
  ) {
    return {
      message: "The FashAI Universal Visual Archive showcases moments across Runway & Stage, Couture Details, People & Moments, and Experience.",
      quickChips: [
        { id: "qp-nav-gallery", label: "View gallery archive ↗", actionKey: "NAVIGATE", payload: "/gallery" },
        { id: "qp-events", label: "Upcoming events", actionKey: "EXPLORE_EVENTS" },
      ],
      navigationTarget: "/gallery",
    };
  }

  // 15. CONTACT & REACH OUT
  if (
    q.includes("contact") ||
    q.includes("how can i contact you") ||
    q.includes("reach") ||
    q.includes("email") ||
    q.includes("phone")
  ) {
    return {
      message: "You can reach the FashAI Universal team directly through our enquiry portal or online contact form.",
      quickChips: [
        { id: "qp-nav-contact", label: "View contact page ↗", actionKey: "NAVIGATE", payload: "/contact" },
        { id: "qp-start-contact", label: "Send a message", actionKey: "START_CONTACT" },
      ],
      navigationTarget: "/contact",
    };
  }

  // 16. FALLBACK FOR UNRESOLVED QUERIES (NO HALLUCINATIONS, SOFT REDIRECT)
  return {
    message: "I'm not completely sure what you're looking for. Try one of these options:",
    quickChips: [
      { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
      { id: "qp-join", label: "Join the network", actionKey: "JOIN_NETWORK" },
      { id: "qp-apply", label: "Apply / nominate", actionKey: "APPLY_NOMINATE" },
      { id: "qp-contact", label: "Contact the team", actionKey: "CONTACT_TEAM" },
    ],
  };
}

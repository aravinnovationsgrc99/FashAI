export interface VisitorPreferences {
  visitorId: string;
  interests: {
    lifestyle: number;
    runway: number;
    registration: number;
    sponsorship: number;
    gallery: number;
    collaboration: number;
    media: number;
    designer: number;
  };
  intent: "attendee" | "sponsor" | "designer" | "media" | "collaboration" | "exploring" | null;
  viewedSections: string[];
  clickedCTAs: string[];
  chatbotTopics: string[];
  galleryCategoriesViewed: string[];
  registrationInterest: boolean;
  sponsorshipInterest: boolean;
  explicitlyProvided: {
    name: string | null;
    email: string | null;
    organization: string | null;
    role: string | null;
  };
  consent: {
    personalization: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

const PREFERENCE_KEY = "fashai_visitor_preferences_v1";

export function getOrCreateVisitorProfile(): VisitorPreferences {
  if (typeof window === "undefined") {
    return createEmptyProfile("ssr-temp-id");
  }

  try {
    const existing = localStorage.getItem(PREFERENCE_KEY);
    if (existing) {
      const parsed = JSON.parse(existing) as VisitorPreferences;
      if (parsed.visitorId) {
        return parsed;
      }
    }
  } catch {
    // safe fallback if storage unavailable
  }

  const newId = generateVisitorUUID();
  const profile = createEmptyProfile(newId);
  saveVisitorProfile(profile);
  return profile;
}

function createEmptyProfile(id: string): VisitorPreferences {
  const now = new Date().toISOString();
  return {
    visitorId: id,
    interests: {
      lifestyle: 0,
      runway: 0,
      registration: 0,
      sponsorship: 0,
      gallery: 0,
      collaboration: 0,
      media: 0,
      designer: 0,
    },
    intent: null,
    viewedSections: [],
    clickedCTAs: [],
    chatbotTopics: [],
    galleryCategoriesViewed: [],
    registrationInterest: false,
    sponsorshipInterest: false,
    explicitlyProvided: {
      name: null,
      email: null,
      organization: null,
      role: null,
    },
    consent: {
      personalization: false,
    },
    createdAt: now,
    updatedAt: now,
  };
}

export function saveVisitorProfile(profile: VisitorPreferences): void {
  if (typeof window === "undefined") return;
  try {
    profile.updatedAt = new Date().toISOString();
    localStorage.setItem(PREFERENCE_KEY, JSON.stringify(profile));
  } catch {
    // ignore
  }
}

export function updateConsent(personalizationConsent: boolean): VisitorPreferences {
  const profile = getOrCreateVisitorProfile();
  profile.consent.personalization = personalizationConsent;
  saveVisitorProfile(profile);
  return profile;
}

export function setVisitorIntent(intent: VisitorPreferences["intent"]): VisitorPreferences {
  const profile = getOrCreateVisitorProfile();
  profile.intent = intent;
  
  if (intent === "attendee") profile.interests.registration += 2;
  if (intent === "sponsor") profile.interests.sponsorship += 2;
  if (intent === "designer") profile.interests.designer += 2;
  if (intent === "media") profile.interests.media += 2;
  if (intent === "collaboration") profile.interests.collaboration += 2;

  saveVisitorProfile(profile);
  return profile;
}

export function trackEngagementEvent(eventName: string, payload?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;

  const profile = getOrCreateVisitorProfile();
  
  if (eventName.startsWith("topic_")) {
    const topic = eventName.replace("topic_", "");
    if (!profile.chatbotTopics.includes(topic)) {
      profile.chatbotTopics.push(topic);
    }
    if (topic in profile.interests) {
      const key = topic as keyof typeof profile.interests;
      profile.interests[key] += 1;
    }
  }

  if (eventName === "registration_cta_clicked") {
    profile.registrationInterest = true;
    profile.interests.registration += 1;
  }

  if (eventName === "sponsorship_cta_clicked") {
    profile.sponsorshipInterest = true;
    profile.interests.sponsorship += 1;
  }

  saveVisitorProfile(profile);

  // Structured event log for analytics foundation
  console.log(`[FashAI Concierge Analytics Event]: ${eventName}`, {
    visitorId: profile.visitorId,
    timestamp: new Date().toISOString(),
    payload,
  });
}

function generateVisitorUUID(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "fashai-v-" + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

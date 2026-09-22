import { NextResponse } from "next/server";
import { queryKnowledgeBase, FASHAI_KNOWLEDGE, ConciergeMessageResponse } from "@/lib/concierge/knowledge";

// In-memory rate limiting for Concierge API
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 30; // Max 30 messages per 10 mins

function sanitizeInput(str: string | undefined): string {
  if (!str || typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

export async function POST(request: Request) {
  try {
    // 1. Rate Limiting Check
    const forwarded = request.headers.get("x-forwarded-for");
    const clientIp = forwarded ? forwarded.split(",")[0].trim() : "127.0.0.1";

    const now = Date.now();
    const userLimit = rateLimitMap.get(clientIp);

    if (userLimit && now < userLimit.resetTime) {
      if (userLimit.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          {
            success: false,
            message: "You have sent several messages recently. Please wait a few moments before asking FashAI Concierge again.",
            quickActions: [
              { id: "explore-site", label: "Explore Website", actionType: "navigate", target: "/projects" },
              { id: "contact-us", label: "Contact Us", actionType: "navigate", target: "/contact" }
            ]
          },
          { status: 429 }
        );
      }
      userLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, {
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW_MS,
      });
    }

    // 2. Parse & Sanitize Request
    const body = await request.json();
    const message = sanitizeInput(body.message);
    const intent = sanitizeInput(body.intent);

    if (!message) {
      return NextResponse.json(
        { error: "Message content cannot be empty." },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: "Message exceeds maximum permitted length (500 characters)." },
        { status: 400 }
      );
    }

    // 3. AI Service Provider Routing with Fallback
    const apiKey = process.env.AI_API_KEY || process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        // Example LLM integration if environment key is active
        const aiResponse = await callExternalAiProvider(apiKey, message, intent);
        if (aiResponse) {
          return NextResponse.json({ success: true, ...aiResponse });
        }
      } catch (err) {
        console.warn("External AI provider call failed, using verified knowledge engine fallback:", err);
      }
    }

    // 4. Default Verified Knowledge Engine Response
    const knowledgeResponse: ConciergeMessageResponse = queryKnowledgeBase(message, intent);

    return NextResponse.json({
      success: true,
      ...knowledgeResponse,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "FashAI Concierge is temporarily unavailable. You can still explore the website or contact the FashAI Universal team directly.",
        quickActions: [
          { id: "explore-site", label: "Explore Website", actionType: "navigate", target: "/projects" },
          { id: "contact-us", label: "Contact Us", actionType: "navigate", target: "/contact" }
        ]
      },
      { status: 500 }
    );
  }
}

// Helper function to query external LLM API if key is set
async function callExternalAiProvider(
  apiKey: string,
  userMessage: string,
  intent?: string
): Promise<ConciergeMessageResponse | null> {
  // If OpenAI key format is detected
  if (apiKey.startsWith("sk-")) {
    const systemPrompt = `You are FashAI Concierge, the official personal guide for FashAI Universal (Powered by Arav Innovation).
Website: ${FASHAI_KNOWLEDGE.websiteUrl}
Upcoming Event: ${FASHAI_KNOWLEDGE.upcomingEdition} (${FASHAI_KNOWLEDGE.upcomingLocation})
Status: Registrations & sponsorships are open.
Rules:
1. Be premium, fashion-forward, concise, and helpful.
2. NEVER invent exact dates, venue addresses, ticket prices, sponsors, or unverified guest lists. If asked, state "Details are yet to be announced."
3. Keep responses under 3 sentences. Provide a clear next action.`;

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Visitor Intent: ${intent || "general"}. Query: ${userMessage}` },
        ],
        temperature: 0.3,
        max_tokens: 150,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      const content = data.choices?.[0]?.message?.content?.trim();
      if (content) {
        const fallback = queryKnowledgeBase(userMessage, intent);
        return {
          message: content,
          quickActions: fallback.quickActions,
          navigationTarget: fallback.navigationTarget,
          galleryCategory: fallback.galleryCategory,
        };
      }
    }
  }
  return null;
}

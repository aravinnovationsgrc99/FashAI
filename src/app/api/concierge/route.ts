import { NextResponse } from "next/server";
import { queryKnowledgeBase } from "@/lib/concierge/knowledge";

const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 30;

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
            quickChips: [
              { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
              { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" }
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

    const body = await request.json();
    const message = sanitizeInput(body.message);

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

    const knowledgeResponse = queryKnowledgeBase(message);

    return NextResponse.json({
      success: true,
      ...knowledgeResponse,
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "I don't have that information right now. You can explore our events or contact our team directly.",
        quickChips: [
          { id: "qp-events", label: "Explore events", actionKey: "EXPLORE_EVENTS" },
          { id: "qp-contact", label: "Contact team", actionKey: "CONTACT_TEAM" }
        ]
      },
      { status: 500 }
    );
  }
}

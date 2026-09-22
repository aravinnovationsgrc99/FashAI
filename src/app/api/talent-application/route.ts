import { NextResponse } from "next/server";

// Rate Limiter: In-memory per IP instance (15 min window, max 5 applications per IP)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

function sanitizeInput(str: unknown): string {
  if (typeof str !== "string") return "";
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/<[^>]+>/g, "")
    .replace(/javascript:/gi, "")
    .replace(/onerror\s*=/gi, "")
    .replace(/onload\s*=/gi, "")
    .trim();
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidUrl(url: string): boolean {
  if (!url) return true; // Optional fields can be empty
  try {
    const formatted = url.startsWith("http://") || url.startsWith("https://") ? url : `https://${url}`;
    new URL(formatted);
    return true;
  } catch {
    return false;
  }
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
          { error: "Too many application attempts. Please wait a few minutes before submitting again." },
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

    // 2. Parse Body Payload
    const body = await request.json();
    const applicationType = sanitizeInput(body.applicationType);

    const validTypes = [
      "fashion_designer",
      "model",
      "makeup_artist",
      "fashion_stylist",
      "influencer_creator",
      "celebrity_public_figure",
    ];

    if (!applicationType || !validTypes.includes(applicationType)) {
      return NextResponse.json(
        { error: "Invalid application type specified." },
        { status: 400 }
      );
    }

    // Common Personal Data
    const fullName = sanitizeInput(body.fullName);
    const email = sanitizeInput(body.email);
    const whatsapp = sanitizeInput(body.whatsapp || body.phone);
    const cityCountry = sanitizeInput(body.cityCountry || body.location);

    if (!fullName || !email || !whatsapp || !cityCountry) {
      return NextResponse.json(
        { error: "Please complete all mandatory contact fields." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Category Specific Sanitized & Validated Record
    let categoryDetails: Record<string, unknown> = {};

    switch (applicationType) {
      case "fashion_designer": {
        const brandName = sanitizeInput(body.brandName);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const experience = sanitizeInput(body.experience);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const fileName = sanitizeInput(body.fileName);
        const availableCollab = body.availableCollab === true || body.availableCollab === "Yes";
        const notes = sanitizeInput(body.notes);

        if (portfolioUrl && !isValidUrl(portfolioUrl)) {
          return NextResponse.json({ error: "Please provide a valid Portfolio URL." }, { status: 400 });
        }
        if (instagramUrl && !isValidUrl(instagramUrl)) {
          return NextResponse.json({ error: "Please provide a valid Instagram URL." }, { status: 400 });
        }

        categoryDetails = {
          brandName,
          specializations,
          experience,
          portfolioUrl,
          instagramUrl,
          fileName,
          availableCollab,
          notes,
        };
        break;
      }

      case "model": {
        const age = Number(body.age);
        const gender = sanitizeInput(body.gender);
        const heightCm = Number(body.heightCm);
        const measurements = sanitizeInput(body.measurements); // Bust/Chest - Waist - Hips
        const shoeSize = sanitizeInput(body.shoeSize);
        const categories = Array.isArray(body.categories)
          ? body.categories.map(sanitizeInput)
          : [sanitizeInput(body.categories)];
        const instagramLink = sanitizeInput(body.instagramLink);
        const fileNames = Array.isArray(body.fileNames) ? body.fileNames.map(sanitizeInput) : [sanitizeInput(body.fileName)];
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";

        if (isNaN(age) || age < 14 || age > 99) {
          return NextResponse.json({ error: "Please enter a valid age." }, { status: 400 });
        }
        if (isNaN(heightCm) || heightCm < 120 || heightCm > 230) {
          return NextResponse.json({ error: "Please enter a valid height in centimeters (e.g. 178)." }, { status: 400 });
        }
        if (instagramLink && !isValidUrl(instagramLink)) {
          return NextResponse.json({ error: "Please enter a valid Instagram or Portfolio link." }, { status: 400 });
        }

        categoryDetails = {
          age,
          gender,
          heightCm,
          measurements,
          shoeSize,
          categories,
          instagramLink,
          fileNames,
          availableTravel,
        };
        break;
      }

      case "makeup_artist": {
        const experience = sanitizeInput(body.experience);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const styleExpertise = sanitizeInput(body.styleExpertise);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const fileName = sanitizeInput(body.fileName);
        const hasKit = body.hasKit === true || body.hasKit === "Yes";
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const notes = sanitizeInput(body.notes);

        if (instagramUrl && !isValidUrl(instagramUrl)) {
          return NextResponse.json({ error: "Please enter a valid Instagram URL." }, { status: 400 });
        }
        if (portfolioUrl && !isValidUrl(portfolioUrl)) {
          return NextResponse.json({ error: "Please enter a valid Portfolio URL." }, { status: 400 });
        }

        categoryDetails = {
          experience,
          specializations,
          styleExpertise,
          instagramUrl,
          portfolioUrl,
          fileName,
          hasKit,
          availableTravel,
          notes,
        };
        break;
      }

      case "fashion_stylist": {
        const experience = sanitizeInput(body.experience);
        const specializations = Array.isArray(body.specializations)
          ? body.specializations.map(sanitizeInput)
          : [sanitizeInput(body.specializations)];
        const stylingAesthetic = sanitizeInput(body.stylingAesthetic);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const portfolioUrl = sanitizeInput(body.portfolioUrl);
        const fileName = sanitizeInput(body.fileName);
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";
        const availableFreelance = body.availableFreelance === true || body.availableFreelance === "Yes";

        if (instagramUrl && !isValidUrl(instagramUrl)) {
          return NextResponse.json({ error: "Please enter a valid Instagram URL." }, { status: 400 });
        }
        if (portfolioUrl && !isValidUrl(portfolioUrl)) {
          return NextResponse.json({ error: "Please enter a valid Portfolio URL." }, { status: 400 });
        }

        categoryDetails = {
          experience,
          specializations,
          stylingAesthetic,
          instagramUrl,
          portfolioUrl,
          fileName,
          availableTravel,
          availableFreelance,
        };
        break;
      }

      case "influencer_creator": {
        const stageName = sanitizeInput(body.stageName);
        const contentCategories = Array.isArray(body.contentCategories)
          ? body.contentCategories.map(sanitizeInput)
          : [sanitizeInput(body.contentCategories)];
        const primaryPlatform = sanitizeInput(body.primaryPlatform);
        const socialHandle = sanitizeInput(body.socialHandle);
        const followerCount = Number(body.followerCount);
        const avgViewsReach = sanitizeInput(body.avgViewsReach);
        const engagementRate = sanitizeInput(body.engagementRate);
        const mediaKitFileName = sanitizeInput(body.fileName);
        const availableCollab = body.availableCollab === true || body.availableCollab === "Yes";

        if (isNaN(followerCount) || followerCount < 0) {
          return NextResponse.json({ error: "Please enter a valid follower count number." }, { status: 400 });
        }

        categoryDetails = {
          stageName,
          contentCategories,
          primaryPlatform,
          socialHandle,
          followerCount,
          avgViewsReach,
          engagementRate,
          mediaKitFileName,
          availableCollab,
        };
        break;
      }

      case "celebrity_public_figure": {
        const stageName = sanitizeInput(body.stageName);
        const realNamePrivate = sanitizeInput(body.realNamePrivate); // PRIVATE / CONFIDENTIAL
        const profession = sanitizeInput(body.profession);
        const professionalContact = sanitizeInput(body.professionalContact);
        const instagramUrl = sanitizeInput(body.instagramUrl);
        const followerCount = Number(body.followerCount);
        const majorAchievements = sanitizeInput(body.majorAchievements);
        const mediaKitUrl = sanitizeInput(body.mediaKitUrl);
        const managementContact = sanitizeInput(body.managementContact);
        const interests = Array.isArray(body.interests)
          ? body.interests.map(sanitizeInput)
          : [sanitizeInput(body.interests)];
        const availableTravel = body.availableTravel === true || body.availableTravel === "Yes";

        if (instagramUrl && !isValidUrl(instagramUrl)) {
          return NextResponse.json({ error: "Please enter a valid Social Profile URL." }, { status: 400 });
        }
        if (mediaKitUrl && !isValidUrl(mediaKitUrl)) {
          return NextResponse.json({ error: "Please enter a valid Portfolio/Media Kit URL." }, { status: 400 });
        }

        categoryDetails = {
          stageName,
          realNamePrivate, // Preserved strictly in backend payload, never publicly exposed
          profession,
          professionalContact,
          instagramUrl,
          followerCount,
          majorAchievements,
          mediaKitUrl,
          managementContact,
          interests,
          availableTravel,
        };
        break;
      }
    }

    const applicationRecord = {
      applicationType,
      fullName,
      email,
      whatsapp,
      cityCountry,
      categoryDetails,
      submittedAt: new Date().toISOString(),
    };

    // Log internally for backend talent database processing
    console.log("FashAI Universal Talent Network Application Received:", {
      applicationType,
      fullName,
      email,
      whatsapp,
      cityCountry,
      submittedAt: applicationRecord.submittedAt,
    });

    return NextResponse.json({
      success: true,
      message: "Application received successfully. Thank you for applying to the FashAI Universal Talent Network.",
      submittedAt: applicationRecord.submittedAt,
    });
  } catch (err) {
    console.error("Talent application submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your application. Please try again." },
      { status: 500 }
    );
  }
}

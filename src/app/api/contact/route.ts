import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      country,
      city,
      organization,
      role,
      enquiryType,
      eventInterest,
      message,
    } = body;

    const selectedEnquiryType = enquiryType || body.subject || body.inquiryType || "Registration";
    const selectedEventInterest = eventInterest || body.interest || "LifeStyle 2026";

    if (!name || !email || !selectedEnquiryType || !selectedEventInterest || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields (*)." },
        { status: 400 }
      );
    }

    // Server-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a detailed message (minimum 10 characters)." },
        { status: 400 }
      );
    }

    console.log("FashAI Universal Official Enquiry Received:", {
      name,
      email,
      phone,
      country,
      city,
      organization,
      role,
      enquiryType: selectedEnquiryType,
      eventInterest: selectedEventInterest,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been submitted successfully to FashAI Universal.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, inquiryType, subject, message } = body;
    const selectedCategory = interest || inquiryType || subject;

    if (!name || !email || !selectedCategory || !message) {
      return NextResponse.json(
        { error: "Please complete all required fields." },
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

    console.log("FashAI Universal Contact Enquiry Received:", {
      name,
      email,
      phone,
      interest: selectedCategory,
      message,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Enquiry recorded successfully.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process enquiry. Please try again." },
      { status: 500 }
    );
  }
}

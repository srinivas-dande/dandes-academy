import { NextResponse } from "next/server";
import { saveWebinarFeedbackAndSendEmail } from "./feedbackService";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      fullName,
      email,
      whatsappNumber,
      webinarRating,
      programInterest,
    } = body;

    if (
      !fullName ||
      !email ||
      !whatsappNumber ||
      !webinarRating ||
      !programInterest
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await saveWebinarFeedbackAndSendEmail(body);

    return NextResponse.json({ success: true }, { status: 201 });

  } catch (error) {
    console.error("Webinar feedback API error:", error);

    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
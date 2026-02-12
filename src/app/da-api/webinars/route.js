import { NextResponse } from "next/server";
import { registerWebinar, getWebinarCount} from "./webinarservice";
import { sendLeadConfirmationEmail } from "@/lib/mail/sendLeadEmails";



export async function POST(req) {
  try {
    const body = await req.json();

    const result = await registerWebinar(body);

    if (body?.fullName && body?.email) {
      await sendLeadConfirmationEmail({
        name: body.fullName,
        email: body.email,
      });
    }

    return NextResponse.json({
      success: true,
      data: result,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 400 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const webinarId = searchParams.get("webinarId");

    const webinar = await getWebinarCount(webinarId);

    return NextResponse.json({
      count: webinar?.no_of_Registractions || 0,
      web_Date: webinar?.web_Date
        ? webinar.web_Date.toLocaleString("en-IN", {
            timeZone: "Asia/Kolkata"
          })
        : null
    });


  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 }
    );
  }
}

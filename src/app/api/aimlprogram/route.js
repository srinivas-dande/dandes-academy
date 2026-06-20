import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendLeadConfirmationEmail, sendSalesLeadEmail, } from "@/lib/mail/sendLeadEmails";

export async function POST(req) {
  try {
    const body = await req.json();

    const lead = await prisma.Batch3_Leads.create({
      data: {
        fullName: body.fullName,
        emailId: body.email,
        phone: body.phone,
        form_type: "Marketing Automation",
        utmSource: body.utmSource,
        
      },
    });
   
    try {
      await Promise.all([
        sendLeadConfirmationEmail({
          name: body.fullName,
          email: body.email,
        }),

        sendSalesLeadEmail({
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          form_type: "Marketing Automation",
          utmSource: body.utmSource,
        }),
      ]);
    } catch (emailError) {
      
    }

    return NextResponse.json({
      success: true,
      lead,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to save lead",
      },
      { status: 500 }
    );
  }
}
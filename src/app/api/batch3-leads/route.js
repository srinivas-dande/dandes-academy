import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { sendSalesLeadEmail, } from "@/lib/mail/sendLeadEmails";

export async function POST(req) {
  try {
    const body = await req.json();

    const lead = await prisma.Batch3_Leads.create({
      data: {
        fullName: body.fullName,
        emailId: body.email,
        phone: body.phone,
        form_type: "Demo Registration",

        leadStatus: body.lead_status,
        leadSource: body.lead_source,
        leadSubSource: body.lead_sub_source,
      },
    });

    // ✅ Pabbly Webhook
    try {
      const webhookRes = await fetch(
        "https://connect.pabbly.com/webhook-listener/webhook/IjU3NjIwNTY0MDYzMTA0MzA1MjZkNTUzZCI_3D_pc/IjU3NjcwNTZlMDYzMDA0MzA1MjZjNTUzNjUxMzQi_pc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: body.fullName,
            email: body.email,
            phone: body.phone,

            form_type: "Demo Registration",

            lead_status: body.lead_status,
            lead_source: body.lead_source,
            lead_sub_source: body.lead_sub_source,

            utm_source: body.utmSource,
            utm_medium: body.utmMedium,
            utm_campaign: body.utmCampaign,
            utm_term: body.utmTerm,
            utm_content: body.utmContent,
            gclid: body.gclid,

            created_at: lead.createdAt?.toISOString?.() || new Date().toISOString(),
          }),
        }
      );

      const text = await webhookRes.text();
      console.log("Webhook status:", webhookRes.status);
      console.log("Webhook response:", text);
    } catch (err) {
      console.error("Webhook error:", err);
    }
 
    

    try {
      await Promise.all([
 
        sendSalesLeadEmail({
          fullName: body.fullName,
          email: body.email,
          phone: body.phone,
          form_type: "Demo Registration",
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
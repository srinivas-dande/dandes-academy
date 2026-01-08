import { logWhatsappService } from "./whatsappService";

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const result = await logWhatsappService(leadId);

    if (result.error) {
      return Response.json(
        { ok: false, error: result.error },
        { status: 400 }
      );
    }

    return Response.json({ ok: true, data: result.data });

  } catch (err) {
    console.error("WHATSAPP API error:", err);
    return Response.json(
      { ok: false, error: "Server error logging WhatsApp" },
      { status: 500 }
    );
  }
}

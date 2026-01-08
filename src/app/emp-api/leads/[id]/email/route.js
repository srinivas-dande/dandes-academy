import { sendEmailService } from "./service";

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    if (isNaN(leadId)) {
      return Response.json(
        { ok: false, error: "Invalid Lead ID" },
        { status: 400 }
      );
    }

    const body = await req.json();

    const result = await sendEmailService(leadId, body);

    if (!result.ok) {
      return Response.json(result, { status: 400 });
    }

    return Response.json(result, { status: 200 });

  } catch (err) {
    console.error("EMAIL API ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error sending email" },
      { status: 500 }
    );
  }
}

import { logCallService } from "./callService";

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const result = await logCallService(leadId);

    if (result.error) {
      return Response.json({ ok: false, error: result.error }, { status: 400 });
    }

    return Response.json({ ok: true, data: result.data });

  } catch (err) {
    console.error("CALL API error:", err);
    return Response.json(
      { ok: false, error: "Server error logging call" },
      { status: 500 }
    );
  }
}

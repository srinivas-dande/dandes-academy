import { getActivitiesService, updateLeadActivityService } from "./activityService";

export async function GET(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const activities = await getActivitiesService(leadId);
    return Response.json({ ok: true, data: activities });

  } catch (err) {
    console.error("GET activities error:", err);
    return Response.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const body = await req.json();

    const result = await updateLeadActivityService(leadId, body);

    if (result.error) {
      return Response.json({ ok: false, error: result.error }, { status: 400 });
    }

    return Response.json({ ok: true, data: result.data });

  } catch (err) {
    console.error("POST activities error:", err);
    return Response.json({ ok: false, error: "Server error updating lead" }, { status: 500 });
  }
}

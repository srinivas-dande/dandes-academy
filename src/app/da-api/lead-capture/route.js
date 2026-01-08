import { handleAddLeadCapture } from "./leadCaptureService";

export async function POST(req) {
  try {
    const body = await req.json();

    const result = await handleAddLeadCapture(body);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("LeadCapture POST route error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

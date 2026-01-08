import { addWebinarHandler } from "./webinarService";

export async function POST(req) {
  try {
    const body = await req.json();
    const result = await addWebinarHandler(body);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ add-webinar POST error:", err);
    return new Response(
      JSON.stringify({ ok: false, error: "Server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

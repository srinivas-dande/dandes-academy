import { addLeadHandler } from "./leadService";

export async function POST(req) {
  try {
    const body = await req.json();

    //Call lead service
    const result = await addLeadHandler(body);

    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("add-lead API error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

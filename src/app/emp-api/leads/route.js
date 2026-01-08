import { getAllLeadsHandler } from "./leadService";

export async function GET(req) {
  try {
    // ✅ Parse query params from request
    const { searchParams } = new URL(req.url);

    const params = {
      q: searchParams.get("q") || "",
      take: Number(searchParams.get("take")) || 10,
      skip: Number(searchParams.get("skip")) || 0,
      sortKey: searchParams.get("sortKey") || "createdAt",
      sortDir: searchParams.get("sortDir") || "desc",
    };

    // ✅ Just call the handler function (logic is separated)
    const result = await getAllLeadsHandler(params);

    // ✅ Return standard JSON response
    return new Response(JSON.stringify(result), {
      status: result.ok ? 200 : 400,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ GET /leads API error:", error);
    return new Response(
      JSON.stringify({ ok: false, error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

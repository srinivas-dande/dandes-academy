import { getLatestRunningWebinar } from "./service";

export async function GET() {
  const result = await getLatestRunningWebinar();

  return new Response(
    JSON.stringify(result),
    {
      status: result.ok ? 200 : 500,
      headers: { "Content-Type": "application/json" }
    }
  );
}

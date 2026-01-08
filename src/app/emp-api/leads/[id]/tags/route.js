import { addTagService, removeTagService } from "./tagService";

export async function POST(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const { tag, createdById } = await req.json();

    const result = await addTagService(leadId, tag, createdById);

    if (result.error) {
      return Response.json({ ok: false, error: result.error }, { status: 400 });
    }

    return Response.json({ ok: true, data: result.data });

  } catch (err) {
    console.error("Add tag API error:", err);
    return Response.json(
      { ok: false, error: "Server error while adding tag" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, context) {
  try {
    const { id } = await context.params;
    const leadId = Number(id);

    const { tag, createdById } = await req.json();

    const result = await removeTagService(leadId, tag, createdById);

    if (result.error) {
      return Response.json({ ok: false, error: result.error }, { status: 400 });
    }

    return Response.json({ ok: true });

  } catch (err) {
    console.error("Delete tag API error:", err);
    return Response.json(
      { ok: false, error: "Server error while removing tag" },
      { status: 500 }
    );
  }
}

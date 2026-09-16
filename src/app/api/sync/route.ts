import { NextRequest, NextResponse } from "next/server";
import { syncAll } from "@/lib/sync-all";

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get("authorization");

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { ok: false, error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const result = await syncAll();

    return NextResponse.json({
      ok: true,
      ...result,
    });
  } catch (error) {
    console.error("Error en sincronización completa:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 }
    );
  }
}
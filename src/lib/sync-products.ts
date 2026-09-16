import "server-only";

import { sheets } from "@/lib/google-sheets";
import { supabaseAdmin } from "@/lib/supabase-admin";

function toInteger(value: unknown): number {
  if (typeof value === "number") {
    return Math.trunc(value);
  }

  const cleaned = String(value ?? "").replace(/[^\d-]/g, "");
  return cleaned ? Number(cleaned) : 0;
}

export async function syncProducts() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Inventario!A2:L",
  });

  const rows = response.data.values ?? [];
  const now = new Date().toISOString();

  const productos = rows
    .filter((row) => row[0])
    .map((row) => ({
      codigo: String(row[0]).trim(),
      nombre_original_excel: String(row[1] ?? "").trim(),
      marca: String(row[2] ?? "").trim(),
      categoria: String(row[3] ?? "").trim() || null,

      // Columna G
      stock_actual: toInteger(row[6]),

      // Columna J = PRECIO VENTA
      precio: toInteger(row[9]),

      // Columna L
      url_proveedor: String(row[11] ?? "").trim() || null,

      activo: true,
      ultima_sync_sheets: now,
    }));

  if (productos.length === 0) {
    throw new Error("No se encontraron productos en Inventario.");
  }

  // Crear productos nuevos o actualizar existentes por código.
  const { error: upsertError } = await supabaseAdmin
    .from("productos")
    .upsert(productos, {
      onConflict: "codigo",
    });

  if (upsertError) {
    throw upsertError;
  }

  // Buscar productos que ya no estén en Google Sheets.
  const { data: productosBD, error: selectError } = await supabaseAdmin
    .from("productos")
    .select("codigo")
    .eq("activo", true);

  if (selectError) {
    throw selectError;
  }

  const codigosSheets = new Set(productos.map((producto) => producto.codigo));

  const codigosDesactivados =
    productosBD
      ?.filter((producto) => !codigosSheets.has(producto.codigo))
      .map((producto) => producto.codigo) ?? [];

  if (codigosDesactivados.length > 0) {
    const { error: deactivateError } = await supabaseAdmin
      .from("productos")
      .update({
        activo: false,
        ultima_sync_sheets: now,
      })
      .in("codigo", codigosDesactivados);

    if (deactivateError) {
      throw deactivateError;
    }
  }

  return {
    productosLeidos: productos.length,
    productosSincronizados: productos.length,
    productosDesactivados: codigosDesactivados.length,
    fecha: now,
  };
}
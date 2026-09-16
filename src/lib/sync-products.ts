import "server-only";

import { sheets } from "@/lib/google-sheets";
import { supabaseAdmin } from "@/lib/supabase-admin";

const POSTGRES_INTEGER_MAX = 2_147_483_647;

function normalizeHeader(value: unknown) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toUpperCase();
}

function toInteger(value: unknown): number | null {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) return null;

    return Math.trunc(value);
  }

  const cleaned = String(value ?? "")
    .trim()
    .replace(/[^\d-]/g, "");

  if (!cleaned) return null;

  const number = Number(cleaned);

  if (!Number.isFinite(number)) return null;

  return Math.trunc(number);
}

function isValidPositiveInteger(value: number | null) {
  return (
    value !== null &&
    value >= 0 &&
    value <= POSTGRES_INTEGER_MAX
  );
}

export async function syncProducts() {
  /*
   * Leemos encabezados + productos.
   * UNFORMATTED_VALUE hace que precios y cantidades
   * lleguen como números reales desde Google Sheets.
   */
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Inventario!A1:Z",
    valueRenderOption: "UNFORMATTED_VALUE",
  });

  const values = response.data.values ?? [];

  if (values.length < 2) {
    throw new Error(
      "No se encontraron productos en la hoja Inventario."
    );
  }

  const headers = values[0].map(normalizeHeader);
  const rows = values.slice(1);

  /*
   * Buscar columnas por encabezado.
   */
  function getColumnIndex(name: string) {
    const index = headers.indexOf(
      normalizeHeader(name)
    );

    if (index === -1) {
      throw new Error(
        `No se encontró la columna "${name}" en Inventario.`
      );
    }

    return index;
  }

  const columns = {
    codigo: getColumnIndex("CÓDIGO"),
    descripcion: getColumnIndex("DESCRIPCIÓN"),
    marca: getColumnIndex("MARCA"),
    categoria: getColumnIndex("Categoria"),
    stock: getColumnIndex("STOCK ACTUAL"),
    precio: getColumnIndex("PRECIO VENTA"),
    urlProveedor: getColumnIndex("URL_PROVEEDOR"),
  };

  /*
   * Productos que ya existen en Supabase.
   * Esto permite conservar los datos obtenidos
   * del proveedor.
   */
  const {
    data: existingProducts,
    error: existingError,
  } = await supabaseAdmin
    .from("productos")
    .select(`
      codigo,
      url_proveedor,
      vinculacion_estado,
      nombre,
      descripcion,
      imagen_url
    `);

  if (existingError) {
    throw existingError;
  }

  const existingByCode = new Map(
    (existingProducts ?? []).map((product) => [
      product.codigo,
      product,
    ])
  );

  const now = new Date().toISOString();

  const productos = [];
  const filasInvalidas: {
    fila: number;
    codigo: string;
    motivo: string;
  }[] = [];

  /*
   * Guardamos TODOS los códigos encontrados en Sheets,
   * incluso si una fila tiene un error.
   *
   * Así una fila temporalmente incorrecta no provoca que
   * el producto sea desactivado en Supabase.
   */
  const codigosSheets = new Set<string>();

  for (const [index, row] of rows.entries()) {
    const codigo = String(
      row[columns.codigo] ?? ""
    ).trim();

    if (!codigo) {
      continue;
    }

    codigosSheets.add(codigo);

    const precio = toInteger(
      row[columns.precio]
    );

    const stock = toInteger(
      row[columns.stock]
    );

    /*
     * Validación de precio.
     */
    if (!isValidPositiveInteger(precio)) {
      filasInvalidas.push({
        fila: index + 2,
        codigo,
        motivo: `PRECIO VENTA inválido: ${
          row[columns.precio] ?? "vacío"
        }`,
      });

      continue;
    }

    /*
     * Validación de stock.
     */
    if (!isValidPositiveInteger(stock)) {
      filasInvalidas.push({
        fila: index + 2,
        codigo,
        motivo: `STOCK ACTUAL inválido: ${
          row[columns.stock] ?? "vacío"
        }`,
      });

      continue;
    }

    const urlProveedor =
      String(
        row[columns.urlProveedor] ?? ""
      ).trim() || null;

    const previous =
      existingByCode.get(codigo);

    /*
     * Si cambia la URL del proveedor,
     * obligamos a volver a obtener:
     *
     * - nombre comercial
     * - descripción
     * - imagen
     */
    const proveedorCambio =
      Boolean(previous) &&
      previous?.url_proveedor !== urlProveedor;

    productos.push({
      codigo,

      nombre_original_excel: String(
        row[columns.descripcion] ?? ""
      ).trim(),

      marca: String(
        row[columns.marca] ?? ""
      ).trim(),

      categoria:
        String(
          row[columns.categoria] ?? ""
        ).trim() || null,

      stock_actual: stock,

      precio,

      url_proveedor: urlProveedor,

      activo: true,

      ultima_sync_sheets: now,

      nombre: proveedorCambio
        ? null
        : previous?.nombre ?? null,

      descripcion: proveedorCambio
        ? null
        : previous?.descripcion ?? null,

      imagen_url: proveedorCambio
        ? null
        : previous?.imagen_url ?? null,

      vinculacion_estado: proveedorCambio
        ? "pendiente"
        : previous?.vinculacion_estado ??
          "pendiente",
    });
  }

  /*
   * Sincronizar únicamente filas válidas.
   */
  if (productos.length > 0) {
    const { error: upsertError } =
      await supabaseAdmin
        .from("productos")
        .upsert(productos, {
          onConflict: "codigo",
        });

    if (upsertError) {
      throw upsertError;
    }
  }

  /*
   * Desactivar productos que realmente
   * desaparecieron de Google Sheets.
   */
  const {
    data: productosBD,
    error: selectError,
  } = await supabaseAdmin
    .from("productos")
    .select("codigo")
    .eq("activo", true);

  if (selectError) {
    throw selectError;
  }

  const codigosDesactivados =
    productosBD
      ?.filter(
        (product) =>
          !codigosSheets.has(product.codigo)
      )
      .map((product) => product.codigo) ??
    [];

  if (codigosDesactivados.length > 0) {
    const { error: deactivateError } =
      await supabaseAdmin
        .from("productos")
        .update({
          activo: false,
          ultima_sync_sheets: now,
        })
        .in(
          "codigo",
          codigosDesactivados
        );

    if (deactivateError) {
      throw deactivateError;
    }
  }

  return {
    productosLeidos: codigosSheets.size,
    productosSincronizados:
      productos.length,
    productosDesactivados:
      codigosDesactivados.length,
    filasInvalidas,
    fecha: now,
  };
}
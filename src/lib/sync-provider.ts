import "server-only";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { getProviderProduct } from "@/lib/provider";

export async function syncProviderProducts() {
  const { data: productos, error } = await supabaseAdmin
    .from("productos")
    .select(
      "id, codigo, url_proveedor, nombre, descripcion, imagen_url, vinculacion_estado"
    )
    .eq("activo", true)
    .not("url_proveedor", "is", null);

  if (error) {
    throw error;
  }

  let actualizados = 0;
  let omitidos = 0;
  let errores = 0;

  for (const producto of productos ?? []) {
    // Si ya tiene toda la información, no consultamos al proveedor otra vez.
    if (producto.vinculacion_estado === "vinculado") {
      omitidos++;
      continue;
    }

    try {
      const proveedor = await getProviderProduct(producto.url_proveedor);

      const { error: updateError } = await supabaseAdmin
        .from("productos")
        .update({
          nombre: proveedor.nombre ?? producto.nombre,
          descripcion: proveedor.descripcion ?? producto.descripcion,
          imagen_url: proveedor.imagenUrl ?? producto.imagen_url,
          vinculacion_estado: "vinculado",
          ultima_sync_proveedor: new Date().toISOString(),
        })
        .eq("id", producto.id);

      if (updateError) {
        throw updateError;
      }

      actualizados++;
    } catch (error) {
      console.error(
        `Error sincronizando proveedor para ${producto.codigo}:`,
        error
      );

      await supabaseAdmin
        .from("productos")
        .update({
          vinculacion_estado: "error",
          ultima_sync_proveedor: new Date().toISOString(),
        })
        .eq("id", producto.id);

      errores++;
    }
  }

  return {
    total: productos?.length ?? 0,
    actualizados,
    omitidos,
    errores,
  };
}
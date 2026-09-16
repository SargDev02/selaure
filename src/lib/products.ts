import "server-only";
import { supabase } from "@/lib/supabase";
import type { Product } from "@/types/product";

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("productos")
    .select(`
      id,
      codigo,
      nombre,
      nombre_original_excel,
      marca,
      precio,
      categoria,
      descripcion,
      imagen_url,
      activo
    `)
    .eq("activo", true)
    .order("nombre");

  if (error) {
    throw new Error(`Error cargando productos: ${error.message}`);
  }

  return data ?? [];
}
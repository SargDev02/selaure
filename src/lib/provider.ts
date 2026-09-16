import "server-only";
import * as cheerio from "cheerio";

export interface ProviderProduct {
  nombre: string | null;
  descripcion: string | null;
  imagenUrl: string | null;
}

export async function getProviderProduct(
  productUrl: string
): Promise<ProviderProduct> {
  const url = new URL(productUrl);

  // Eliminamos parámetros de búsqueda innecesarios de Shopify.
  url.search = "";

  const response = await fetch(url.toString(), {
    headers: {
      "User-Agent": "SelaureCatalogSync/1.0",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Proveedor respondió ${response.status} para ${url.toString()}`
    );
  }

  const html = await response.text();
  const $ = cheerio.load(html);

  const nombre =
    $('meta[property="og:title"]').attr("content")?.trim() ||
    $("h1").first().text().trim() ||
    null;

  const descripcion =
    $('meta[name="description"]').attr("content")?.trim() ||
    null;

  const imagenUrl =
    $('meta[property="og:image"]').attr("content")?.trim() ||
    null;

  return {
    nombre,
    descripcion,
    imagenUrl,
  };
}
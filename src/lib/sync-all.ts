import "server-only";

import { syncProducts } from "@/lib/sync-products";
import { syncProviderProducts } from "@/lib/sync-provider";

export async function syncAll() {
  const sheets = await syncProducts();
  const proveedor = await syncProviderProducts();

  return {
    sheets,
    proveedor,
    fecha: new Date().toISOString(),
  };
}
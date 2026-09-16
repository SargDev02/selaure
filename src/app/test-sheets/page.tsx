import { sheets } from "@/lib/google-sheets";

export default async function TestSheetsPage() {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEETS_ID,
    range: "Inventario!A:L",
  });

  const rows = response.data.values ?? [];

  const productos = rows
    .slice(1)
    .filter((row) => row[0]);

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Productos encontrados en Google Sheets: {productos.length}
      </h1>

      <div className="mt-6 space-y-3">
        {productos.slice(0, 40).map((producto) => (
          <div key={producto[0]} className="rounded border p-3">
            <p>Código: {producto[0]}</p>
            <p>Nombre: {producto[1]}</p>
            <p>Marca: {producto[2]}</p>
            <p>Categoría: {producto[3]}</p>
            <p>Precio venta: {producto[9]}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
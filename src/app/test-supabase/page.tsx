import { supabase } from "@/lib/supabase";

export default async function TestSupabasePage() {
  const { data, error } = await supabase
    .from("productos")
    .select("codigo, nombre, marca, precio, categoria, activo")
    .order("id");

  if (error) {
    return (
      <main className="p-6">
        <h1>Error al conectar con Supabase</h1>
        <p>{error.message}</p>
      </main>
    );
  }

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold">
        Productos encontrados: {data.length}
      </h1>

      <div className="mt-6 space-y-2">
        {data.map((producto) => (
          <div key={producto.codigo} className="border p-3 rounded">
            <p>{producto.nombre}</p>
            <p>{producto.marca}</p>
            <p>${producto.precio}</p>
            <p>{producto.categoria}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
import Image from "next/image";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  whatsappNumber: string;
  onOpen: (product: Product) => void;
}

export function ProductCard({
  product,
  whatsappNumber,
  onOpen,
}: ProductCardProps) {
  const productName =
    product.nombre ?? product.nombre_original_excel;

  const imageUrl = product.imagen_url?.replace(
    "http://",
    "https://"
  );

  const message = encodeURIComponent(
    `Hola, estoy interesado/a en el producto ${productName} de Selaure Beauty.\n\nCódigo: ${product.codigo}\nPrecio: $${product.precio.toLocaleString(
      "es-CO"
    )}\n\n¿Me das más información, por favor?`
  );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <article className="group overflow-hidden rounded-[20px] border border-border-selaure bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      {/* Parte que abre el modal */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="block w-full cursor-pointer text-left"
      >
        {/* Imagen */}
        <div className="relative aspect-square overflow-hidden bg-background-soft">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-contain p-3 transition duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-text-secondary">
              Sin imagen
            </div>
          )}

          {/* Categoría */}
          {product.categoria && (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-text-secondary shadow-sm backdrop-blur">
              {product.categoria}
            </span>
          )}
        </div>

        {/* Información */}
        <div className="px-4 pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-primary">
            {product.marca}
          </p>

          <h2 className="mt-2 line-clamp-2 min-h-10 text-sm font-medium leading-5 text-text-primary">
            {productName}
          </h2>

          <p className="mt-3 text-lg font-semibold text-selaure-black">
            ${product.precio.toLocaleString("es-CO")}
          </p>
        </div>
      </button>

      {/* Botón WhatsApp */}
      <div className="p-4 pt-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full bg-selaure-black px-3 py-3 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-gold-primary"
        >
          Consultar
        </a>
      </div>
    </article>
  );
}
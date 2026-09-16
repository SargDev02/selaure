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
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border-selaure bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md sm:rounded-[20px]">
      {/* Información clickeable */}
      <button
        type="button"
        onClick={() => onOpen(product)}
        className="flex flex-1 cursor-pointer flex-col text-left"
      >
        {/* Imagen */}
        <div className="relative aspect-square w-full overflow-hidden bg-background-soft">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={productName}
              fill
              className="object-contain p-2 transition duration-300 group-hover:scale-105 sm:p-3"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-2 text-center text-xs text-text-secondary">
              Sin imagen
            </div>
          )}

          {/* Categoría */}
          {product.categoria && (
            <span className="absolute left-2 top-2 max-w-[85%] truncate rounded-full bg-white/90 px-2 py-1 text-[8px] font-medium uppercase tracking-wide text-text-secondary shadow-sm backdrop-blur sm:left-3 sm:top-3 sm:px-3 sm:text-[10px]">
              {product.categoria}
            </span>
          )}
        </div>

        {/* Información del producto */}
        <div className="flex flex-1 flex-col p-3 sm:p-4">
          {/* Marca */}
          <p className="truncate text-[9px] font-semibold uppercase tracking-[0.14em] text-gold-primary sm:text-[10px] sm:tracking-[0.18em]">
            {product.marca}
          </p>

          {/* Nombre */}
          <h2 className="mt-1.5 line-clamp-2 min-h-9 text-xs font-medium leading-[18px] text-text-primary sm:mt-2 sm:min-h-10 sm:text-sm sm:leading-5">
            {productName}
          </h2>

          {/* Precio */}
          <p className="mt-auto pt-2 text-base font-semibold text-selaure-black sm:pt-3 sm:text-lg">
            ${product.precio.toLocaleString("es-CO")}
          </p>
        </div>
      </button>

      {/* WhatsApp */}
      <div className="px-3 pb-3 sm:px-4 sm:pb-4">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center rounded-full bg-selaure-black px-2 py-2.5 text-[10px] font-semibold uppercase tracking-wide text-white transition hover:bg-gold-primary sm:px-3 sm:py-3 sm:text-xs"
        >
          Consultar
        </a>
      </div>
    </article>
  );
}
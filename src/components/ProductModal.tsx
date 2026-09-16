"use client";

import Image from "next/image";
import { useEffect } from "react";

import type { Product } from "@/types/product";

interface ProductModalProps {
  product: Product | null;
  whatsappNumber: string;
  onClose: () => void;
}

export function ProductModal({
  product,
  whatsappNumber,
  onClose,
}: ProductModalProps) {
  useEffect(() => {
    if (!product) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.body.style.overflow = "hidden";

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [product, onClose]);

  if (!product) return null;

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
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 backdrop-blur-[2px] sm:items-center sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative max-h-[92vh] w-full overflow-y-auto rounded-t-[28px] bg-white shadow-2xl sm:max-w-3xl sm:rounded-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        {/* Barra superior móvil */}
        <div className="flex justify-center pt-3 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-neutral-300" />
        </div>

        {/* Botón cerrar */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar producto"
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-selaure-black shadow-sm backdrop-blur transition hover:bg-background-soft"
        >
          ×
        </button>

        <div className="grid sm:grid-cols-2">
          {/* Imagen */}
          <div className="relative aspect-square bg-background-soft">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-contain p-5 sm:p-8"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-text-secondary">
                Sin imagen
              </div>
            )}
          </div>

          {/* Información */}
          <div className="flex flex-col p-5 sm:p-8">
            {/* Marca */}
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-primary">
              {product.marca}
            </p>

            {/* Nombre */}
            <h2 className="mt-2 font-display text-3xl font-semibold leading-tight text-selaure-black sm:text-4xl">
              {productName}
            </h2>

            {/* Categoría */}
            {product.categoria && (
              <span className="mt-3 w-fit rounded-full bg-background-soft px-3 py-1.5 text-[10px] font-medium uppercase tracking-wide text-text-secondary">
                {product.categoria}
              </span>
            )}

            {/* Precio */}
            <p className="mt-5 text-2xl font-semibold text-selaure-black">
              ${product.precio.toLocaleString("es-CO")}
            </p>

            {/* Código */}
            <p className="mt-2 text-xs text-text-secondary">
              Código: {product.codigo}
            </p>

            {/* Descripción */}
            {product.descripcion ? (
              <div className="mt-5 border-t border-border-selaure pt-5">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-selaure-black">
                  Descripción
                </h3>

                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {product.descripcion}
                </p>
              </div>
            ) : (
              <p className="mt-5 text-sm leading-6 text-text-secondary">
                Consulta disponibilidad y más información directamente
                con nosotros.
              </p>
            )}

            {/* WhatsApp */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 flex w-full items-center justify-center rounded-full bg-selaure-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gold-primary"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Image from "next/image";
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

  const whatsappUrl =
    `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[90vh] w-full overflow-y-auto rounded-t-3xl bg-white sm:max-w-2xl sm:rounded-3xl">
        <div className="flex justify-end p-4">
          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-selaure text-xl"
          >
            ×
          </button>
        </div>

        <div className="grid gap-6 px-5 pb-6 sm:grid-cols-2 sm:px-6">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-background-soft">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={productName}
                fill
                className="object-contain p-4"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-text-secondary">
                Sin imagen
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-primary">
              {product.marca}
            </p>

            <h2 className="mt-2 font-display text-3xl font-semibold">
              {productName}
            </h2>

            {product.categoria && (
              <p className="mt-2 text-sm text-text-secondary">
                {product.categoria}
              </p>
            )}

            <p className="mt-5 text-2xl font-semibold">
              ${product.precio.toLocaleString("es-CO")}
            </p>

            <p className="mt-3 text-xs text-text-secondary">
              Código: {product.codigo}
            </p>

            {product.descripcion && (
              <p className="mt-5 text-sm leading-6 text-text-secondary">
                {product.descripcion}
              </p>
            )}

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex w-full items-center justify-center rounded-full bg-selaure-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-gold-primary"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
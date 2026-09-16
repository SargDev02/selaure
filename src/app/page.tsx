import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { Footer } from "@/components/Footer";
import { getProducts } from "@/lib/products";

export default async function Home() {
  const products = await getProducts();

  const whatsappNumber =
    process.env.WHATSAPP_NUMBER ?? "573206734884";

  return (
    <>
      <Hero />

      <main className="mx-auto max-w-7xl px-4 py-10 sm:py-14">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-primary">
            Nuestro catálogo
          </p>

          <h2 className="mt-2 font-display text-4xl font-semibold text-selaure-black sm:text-5xl">
            Encuentra tus favoritos
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-text-secondary">
            Explora nuestros productos, utiliza los filtros y
            encuentra exactamente lo que estás buscando.
          </p>
        </div>

        <ProductCatalog
          products={products}
          whatsappNumber={whatsappNumber}
        />
      </main>
      <Footer />

      <FloatingWhatsAppButton
        whatsappNumber={whatsappNumber}
      />

      <FloatingWhatsAppButton
        whatsappNumber={whatsappNumber}
      />
    </>
  );
}
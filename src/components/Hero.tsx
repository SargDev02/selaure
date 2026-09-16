import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-selaure bg-background-soft">
      {/* Decoración */}
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-secondary/20 blur-3xl" />

      <div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-gold-primary/10 blur-3xl" />

      <div className="relative mx-auto flex min-h-[420px] max-w-7xl items-center px-4 py-16 sm:min-h-[500px] sm:py-24">
        <div className="mx-auto max-w-3xl text-center">

          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <Image
              src="/logo-selaure.png"
              alt="Selaure Beauty"
              width={220}
              height={100}
              priority
              className="h-auto w-40 sm:w-48 md:w-56"
            />
          </div>

          {/* Subtítulo */}
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-primary sm:text-sm">
            Selaure Beauty
          </p>

          {/* Título */}
          <h1 className="mt-5 font-display text-5xl font-semibold leading-[0.95] text-selaure-black sm:text-6xl md:text-7xl">
            Belleza que resalta
            <span className="block text-gold-primary">
              tu esencia
            </span>
          </h1>

          {/* Descripción */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-6 text-text-secondary sm:text-base sm:leading-7">
            Descubre productos de maquillaje, cuidado capilar,
            corporal y mucho más seleccionados para ti.
          </p>

          {/* Botones */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#catalogo"
              className="flex min-w-48 items-center justify-center rounded-full bg-selaure-black px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-gold-primary"
            >
              Ver catálogo
            </a>

            <a
              href="#categorias"
              className="flex min-w-48 items-center justify-center rounded-full border border-border-selaure bg-white px-7 py-3.5 text-sm font-semibold text-selaure-black transition hover:border-gold-primary hover:text-gold-primary"
            >
              Explorar categorías
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
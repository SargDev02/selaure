import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border-selaure bg-background-soft">
      {/* Decoración */}
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-gold-secondary/20 blur-3xl sm:h-72 sm:w-72" />

      <div className="absolute -bottom-32 -left-24 h-64 w-64 rounded-full bg-gold-primary/10 blur-3xl sm:h-72 sm:w-72" />

      <div className="relative mx-auto flex min-h-[390px] max-w-7xl items-center px-4 py-10 sm:min-h-[500px] sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo */}
          <div className="mb-5 flex justify-center sm:mb-8">
            <Image
              src="/logo-selaure.png"
              alt="Selaure Beauty"
              width={220}
              height={100}
              priority
              className="h-auto w-32 sm:w-48 md:w-56"
            />
          </div>

          {/* Subtítulo */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-gold-primary sm:text-sm sm:tracking-[0.3em]">
            Selaure Beauty
          </p>

          {/* Título */}
          <h1 className="mt-3 font-display text-[42px] font-semibold leading-[0.95] text-selaure-black sm:mt-5 sm:text-6xl md:text-7xl">
            Belleza que resalta
            <span className="block text-gold-primary">
              tu esencia
            </span>
          </h1>

          {/* Descripción */}
          <p className="mx-auto mt-4 max-w-md text-xs leading-5 text-text-secondary sm:mt-6 sm:max-w-xl sm:text-base sm:leading-7">
            Descubre productos de maquillaje, cuidado capilar,
            corporal y mucho más seleccionados para ti.
          </p>

          {/* Botones */}
          <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
            <a
              href="#catalogo"
              className="flex w-full max-w-xs items-center justify-center rounded-full bg-selaure-black px-6 py-3 text-xs font-semibold text-white transition hover:bg-gold-primary sm:w-auto sm:min-w-48 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Ver catálogo
            </a>

            <a
              href="#categorias"
              className="flex w-full max-w-xs items-center justify-center rounded-full border border-border-selaure bg-white px-6 py-3 text-xs font-semibold text-selaure-black transition hover:border-gold-primary hover:text-gold-primary sm:w-auto sm:min-w-48 sm:px-7 sm:py-3.5 sm:text-sm"
            >
              Explorar categorías
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
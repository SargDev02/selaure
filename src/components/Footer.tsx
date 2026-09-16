export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-border-selaure bg-background-soft sm:mt-16">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:py-10">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {/* Marca */}
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-gold-primary sm:text-xs">
              Selaure Beauty
            </p>

            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-selaure-black sm:text-3xl">
              Belleza que resalta tu esencia
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
              Productos seleccionados de maquillaje, cuidado capilar,
              corporal y belleza.
            </p>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-sm font-semibold text-selaure-black">
              Explora
            </h3>

            <div className="mt-4 flex flex-col gap-3 text-sm text-text-secondary">
              <a
                href="#catalogo"
                className="w-fit transition hover:text-gold-primary"
              >
                Catálogo
              </a>

              <a
                href="#categorias"
                className="w-fit transition hover:text-gold-primary"
              >
                Categorías
              </a>
            </div>
          </div>

          {/* Atención */}
          <div>
            <h3 className="text-sm font-semibold text-selaure-black">
              Atención
            </h3>

            <p className="mt-4 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
              ¿Tienes dudas sobre algún producto?
            </p>

            <p className="mt-1 text-xs leading-5 text-text-secondary sm:text-sm sm:leading-6">
              Contáctanos por WhatsApp y con gusto te ayudamos.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border-selaure pt-5 sm:mt-10 sm:pt-6">
          <p className="text-center text-[10px] leading-5 text-text-secondary sm:text-xs">
            © {currentYear} Selaure Beauty. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
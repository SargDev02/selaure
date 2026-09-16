export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border-selaure bg-background-soft">
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Marca */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-primary">
              Selaure Beauty
            </p>

            <h2 className="mt-3 font-display text-3xl font-semibold text-selaure-black">
              Belleza que resalta tu esencia
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-text-secondary">
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
                className="transition hover:text-gold-primary"
              >
                Catálogo
              </a>

              <a
                href="#categorias"
                className="transition hover:text-gold-primary"
              >
                Categorías
              </a>
            </div>
          </div>

          {/* Información */}
          <div>
            <h3 className="text-sm font-semibold text-selaure-black">
              Atención
            </h3>

            <p className="mt-4 text-sm leading-6 text-text-secondary">
              ¿Tienes dudas sobre algún producto?
            </p>

            <p className="mt-1 text-sm leading-6 text-text-secondary">
              Contáctanos por WhatsApp y con gusto te ayudamos.
            </p>
          </div>
        </div>

        <div className="mt-10 border-t border-border-selaure pt-6">
          <p className="text-center text-xs text-text-secondary">
            © {currentYear} Selaure Beauty. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
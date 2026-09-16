"use client";

import { useMemo, useState } from "react";

import { ProductCard } from "@/components/ProductCard";
import { ProductModal } from "@/components/ProductModal";

import type { Product } from "@/types/product";

interface ProductCatalogProps {
  products: Product[];
  whatsappNumber: string;
}

type SortOption =
  | "az"
  | "za"
  | "price-asc"
  | "price-desc";

export function ProductCatalog({
  products,
  whatsappNumber,
}: ProductCatalogProps) {
  // Buscador
  const [search, setSearch] = useState("");

  // Categoría
  const [category, setCategory] = useState("Todos");

  // Marca
  const [brand, setBrand] = useState("Todas");

  // Precio máximo
  const [maxPrice, setMaxPrice] =
    useState<number | null>(null);

  // Orden
  const [sort, setSort] =
    useState<SortOption>("az");

  // Producto seleccionado para el modal
  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  /*
   * Categorías dinámicas
   */
  const categories = useMemo(() => {
    const values = products
      .map((product) => product.categoria)
      .filter(
        (value): value is string =>
          Boolean(value)
      );

    const uniqueCategories = Array.from(
      new Set(values)
    ).sort((a, b) =>
      a.localeCompare(b, "es")
    );

    return ["Todos", ...uniqueCategories];
  }, [products]);

  /*
   * Marcas dinámicas
   */
  const brands = useMemo(() => {
    const values = products
      .map((product) => product.marca)
      .filter(Boolean);

    const uniqueBrands = Array.from(
      new Set(values)
    ).sort((a, b) =>
      a.localeCompare(b, "es")
    );

    return ["Todas", ...uniqueBrands];
  }, [products]);

  /*
   * Productos filtrados y ordenados
   */
  const filteredProducts = useMemo(() => {
    const searchValue =
      search.toLowerCase().trim();

    const filtered = products.filter(
      (product) => {
        const productName =
          product.nombre ??
          product.nombre_original_excel;

        const matchesSearch =
          !searchValue ||
          productName
            .toLowerCase()
            .includes(searchValue) ||
          product.marca
            .toLowerCase()
            .includes(searchValue) ||
          product.codigo
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          category === "Todos" ||
          product.categoria === category;

        const matchesBrand =
          brand === "Todas" ||
          product.marca === brand;

        const matchesPrice =
          maxPrice === null ||
          product.precio <= maxPrice;

        return (
          matchesSearch &&
          matchesCategory &&
          matchesBrand &&
          matchesPrice
        );
      }
    );

    return filtered.sort((a, b) => {
      const nameA =
        a.nombre ??
        a.nombre_original_excel;

      const nameB =
        b.nombre ??
        b.nombre_original_excel;

      switch (sort) {
        case "za":
          return nameB.localeCompare(
            nameA,
            "es"
          );

        case "price-asc":
          return a.precio - b.precio;

        case "price-desc":
          return b.precio - a.precio;

        case "az":
        default:
          return nameA.localeCompare(
            nameB,
            "es"
          );
      }
    });
  }, [
    products,
    search,
    category,
    brand,
    maxPrice,
    sort,
  ]);

  /*
   * Limpiar todos los filtros
   */
  function clearFilters() {
    setSearch("");
    setCategory("Todos");
    setBrand("Todas");
    setMaxPrice(null);
    setSort("az");
  }

  return (
    <section id="catalogo" className="scroll-mt-28">
      {/* Buscador */}
      <div className="mb-5">
        <input
          type="search"
          placeholder="Buscar por producto, marca o código..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded-full border border-border-selaure bg-white px-5 py-3 text-sm outline-none transition focus:border-gold-primary"
        />
      </div>

      {/* Categorías */}
      <div
        id="categorias"
        className="mb-5 scroll-mt-28 flex gap-2 overflow-x-auto pb-2"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              setCategory(item)
            }
            className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition ${category === item
                ? "bg-selaure-black text-white"
                : "border border-border-selaure bg-white text-text-secondary hover:border-gold-primary"
              }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Filtros */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {/* Marca */}
        <select
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          className="rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-primary"
        >
          {brands.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item === "Todas"
                ? "Todas las marcas"
                : item}
            </option>
          ))}
        </select>

        {/* Precio */}
        <select
          value={maxPrice ?? ""}
          onChange={(event) =>
            setMaxPrice(
              event.target.value
                ? Number(event.target.value)
                : null
            )
          }
          className="rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-primary"
        >
          <option value="">
            Cualquier precio
          </option>

          <option value="10000">
            Hasta $10.000
          </option>

          <option value="20000">
            Hasta $20.000
          </option>

          <option value="30000">
            Hasta $30.000
          </option>

          <option value="40000">
            Hasta $40.000
          </option>

          <option value="50000">
            Hasta $50.000
          </option>

          <option value="100000">
            Hasta $100.000
          </option>
        </select>

        {/* Ordenamiento */}
        <select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value as SortOption
            )
          }
          className="rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none transition focus:border-gold-primary"
        >
          <option value="az">
            Nombre: A - Z
          </option>

          <option value="za">
            Nombre: Z - A
          </option>

          <option value="price-asc">
            Precio: menor a mayor
          </option>

          <option value="price-desc">
            Precio: mayor a menor
          </option>
        </select>
      </div>

      {/* Contador y limpiar filtros */}
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm text-text-secondary">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1
            ? "producto"
            : "productos"}
        </p>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-gold-primary transition hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map(
            (product) => (
              <ProductCard
                key={product.id}
                product={product}
                whatsappNumber={
                  whatsappNumber
                }
                onOpen={
                  setSelectedProduct
                }
              />
            )
          )}
        </div>
      ) : (
        /*
         * Sin resultados
         */
        <div className="py-16 text-center">
          <p className="text-sm text-text-secondary">
            No encontramos productos con
            esos criterios.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-gold-primary transition hover:underline"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Modal del producto */}
      <ProductModal
        product={selectedProduct}
        whatsappNumber={whatsappNumber}
        onClose={() =>
          setSelectedProduct(null)
        }
      />
    </section>
  );
}
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
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todos");
  const [brand, setBrand] = useState("Todas");
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [sort, setSort] = useState<SortOption>("az");

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const values = products
      .map((product) => product.categoria)
      .filter(
        (value): value is string =>
          Boolean(value)
      );

    return [
      "Todos",
      ...Array.from(new Set(values)).sort((a, b) =>
        a.localeCompare(b, "es")
      ),
    ];
  }, [products]);

  const brands = useMemo(() => {
    const values = products
      .map((product) => product.marca)
      .filter(Boolean);

    return [
      "Todas",
      ...Array.from(new Set(values)).sort((a, b) =>
        a.localeCompare(b, "es")
      ),
    ];
  }, [products]);

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

  function clearFilters() {
    setSearch("");
    setCategory("Todos");
    setBrand("Todas");
    setMaxPrice(null);
    setSort("az");
  }

  const activeFilters =
    (brand !== "Todas" ? 1 : 0) +
    (maxPrice !== null ? 1 : 0) +
    (sort !== "az" ? 1 : 0);

  return (
    <section
      id="catalogo"
      className="scroll-mt-6"
    >
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="search"
          placeholder="Buscar productos..."
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          className="w-full rounded-full border border-border-selaure bg-white px-5 py-3.5 text-sm outline-none transition focus:border-gold-primary"
        />
      </div>

      {/* Categorías */}
      <div
        id="categorias"
        className="mb-4 flex scroll-mt-6 gap-2 overflow-x-auto pb-2"
      >
        {categories.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() =>
              setCategory(item)
            }
            className={`shrink-0 rounded-full px-4 py-2.5 text-xs font-medium transition ${
              category === item
                ? "bg-selaure-black text-white"
                : "border border-border-selaure bg-white text-text-secondary"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Barra filtros móvil */}
      <div className="mb-4 flex items-center justify-between sm:hidden">
        <button
          type="button"
          onClick={() =>
            setShowFilters(!showFilters)
          }
          className="flex items-center gap-2 rounded-full border border-border-selaure bg-white px-4 py-2.5 text-xs font-semibold text-selaure-black"
        >
          Filtros

          {activeFilters > 0 && (
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold-primary px-1 text-[10px] text-white">
              {activeFilters}
            </span>
          )}
        </button>

        <p className="text-xs text-text-secondary">
          {filteredProducts.length} productos
        </p>
      </div>

      {/* Filtros */}
      <div
        className={`mb-6 grid-cols-1 gap-3 sm:grid sm:grid-cols-3 ${
          showFilters
            ? "grid"
            : "hidden"
        }`}
      >
        {/* Marca */}
        <select
          value={brand}
          onChange={(event) =>
            setBrand(event.target.value)
          }
          className="w-full rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none focus:border-gold-primary"
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
          className="w-full rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none focus:border-gold-primary"
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

        {/* Orden */}
        <select
          value={sort}
          onChange={(event) =>
            setSort(
              event.target.value as SortOption
            )
          }
          className="w-full rounded-xl border border-border-selaure bg-white px-4 py-3 text-sm outline-none focus:border-gold-primary"
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

      {/* Contador escritorio */}
      <div className="mb-4 hidden items-center justify-between sm:flex">
        <p className="text-sm text-text-secondary">
          {filteredProducts.length} productos
        </p>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-gold-primary hover:underline"
        >
          Limpiar filtros
        </button>
      </div>

      {/* Limpiar móvil */}
      {(activeFilters > 0 ||
        search ||
        category !== "Todos") && (
        <div className="mb-4 sm:hidden">
          <button
            type="button"
            onClick={clearFilters}
            className="text-xs font-medium text-gold-primary"
          >
            Limpiar filtros
          </button>
        </div>
      )}

      {/* Productos */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
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
        <div className="py-16 text-center">
          <p className="text-sm text-text-secondary">
            No encontramos productos con esos criterios.
          </p>

          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 text-sm font-medium text-gold-primary"
          >
            Limpiar filtros
          </button>
        </div>
      )}

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
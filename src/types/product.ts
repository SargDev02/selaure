export interface Product {
  id: number;
  codigo: string;
  nombre: string | null;
  nombre_original_excel: string;
  marca: string;
  precio: number;
  categoria: string | null;
  descripcion: string | null;
  imagen_url: string | null;
  activo: boolean;
}
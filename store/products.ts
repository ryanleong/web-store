import { create } from 'zustand';
import useApi from "@/api";

type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  image: string;
  images: Array<string>;
  stock: number;
  category: string;
}

type ProductsStore = {
  products: Array<Product>,
  total: number,
  fetchProducts: () => void,
  clear: () => void,
}

export const useProductsStore = create<ProductsStore>((set) => {
  const { fetchProducts } = useApi();

  const fetchAllProducts = async () => {
    const { products } = await fetchProducts();

    const formattedProducts = products.map((product) => ({
      id: product.id,
      name: product.title,
      brand: product.brand,
      price: product.price,
      image: product.thumbnail,
      images: product.images,
      stock: product.stock,
      category: product.category,
    }));

    return set(() => ({ products: formattedProducts }))
  };

  return {
    products: [],
    total: 0,
    fetchProducts: fetchAllProducts,
    clear: () => set({ products: [], total: 0 }),
  };
});

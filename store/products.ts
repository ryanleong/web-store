import { create } from 'zustand';
import useApi from "@/api";

type ProductsStore = {
  products: Array<any>,
  total: number,
  fetchProducts: () => void,
  clear: () => void,
}

export const useProductsStore = create<ProductsStore>((set) => {
  const { fetchProducts } = useApi();

  const fetchAllProducts = async () => {
    const { products } = await fetchProducts();
    return set(() => ({ products }))
  };

  return {
    products: [],
    total: 0,
    fetchProducts: fetchAllProducts,
    clear: () => set({ products: [], total: 0 }),
  };
});

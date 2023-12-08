import { create } from "zustand";
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
};

type ProductsStore = {
  products: Array<Product>;
  categories: Array<string>;

  isLoadingAll: boolean;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;

  initProducts: () => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  clear: () => void;
};

export const useProductsStore = create<ProductsStore>((set) => {
  const { fetchProducts, fetchCategories } = useApi();

  /**
   * Fetch list of products from API
   * @param isProxyCall boolean To indicate if its a call from another action
   * @returns void
   */
  const fetchAllProducts = async (isProxyCall = false) => {
    try {
      set(() => ({ isLoadingProducts: true }));
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

      set(() => ({ products: formattedProducts, isLoadingProducts: false }));
      return formattedProducts;
    } catch (error) {
      if (isProxyCall) throw error;
      else console.log("Error: ", error);
    }
  };

    /**
   * Fetch list of categories from API
   * @param isProxyCall boolean To indicate if its a call from another action
   * @returns void
   */
  const fetchAllCategories = async (isProxyCall = false) => {
    try {
      set(() => ({ isLoadingCategories: true }));
      const categories = await fetchCategories();
      set(() => ({ categories, isLoadingCategories: false }));
      return categories;
    } catch (error) {
      if (isProxyCall) throw error;
      else console.log("Error: ", error);
    }
  };

    /**
   * Fetch list of products and categories from API
   * @returns void
   */
  const initProducts = async () => {
    try {
      set(() => ({ isLoadingAll: true }));

      await Promise.all([
        fetchAllCategories(true),
        fetchAllProducts(true),
      ]);

      set(() => ({ isLoadingAll: false }));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return {
    products: [],
    categories: [],

    isLoadingAll: false,
    isLoadingProducts: false,
    isLoadingCategories: false,

    initProducts,
    fetchProducts: fetchAllProducts,
    fetchCategories: fetchAllCategories,
    clear: () => set({ products: [], categories: [] }),
  };
});

import { create } from "zustand";

import { ValueLabel } from "@/utils/types";
import useApi from "@/api";
import { kebabToText } from "@/utils/string";

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

interface Category extends ValueLabel {}

type ProductsStore = {
  products: Array<Product>;
  productsCount: number;
  categories: Array<Category>;

  isLoadingAll: boolean;
  isLoadingProducts: boolean;
  isLoadingCategories: boolean;

  initProducts: () => void;
  fetchProducts: () => void;
  fetchCategories: () => void;
  clear: () => void;
};

const defaultValues = {
  products: [],
  categories: [],
  productsCount: 0,

  isLoadingAll: false,
  isLoadingProducts: false,
  isLoadingCategories: false,
}

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
      const { products, limit } = await fetchProducts();

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

      set(() => ({
        products: formattedProducts,
        isLoadingProducts: false,
        // NOTE: using limit as we don't have pagination and its the current total
        productsCount: limit,
      }));
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

      const formattedCategory = categories.map((category) => ({
        value: category,
        label: kebabToText(category),
      }));

      set(() => ({
        categories: formattedCategory,
        isLoadingCategories: false,
      }));
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

      await Promise.all([fetchAllCategories(true), fetchAllProducts(true)]);

      set(() => ({ isLoadingAll: false }));
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const clear = () => set({ ...defaultValues });

  return {
    ...defaultValues,
    initProducts,
    fetchProducts: fetchAllProducts,
    fetchCategories: fetchAllCategories,
    clear,
  };
});

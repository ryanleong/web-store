import { StateCreator } from "zustand";

import { FetchAllProductOptions, FilterSlice, ProductsSlice } from "./types";
import { kebabToText } from "@/utils/string";
import useApi from "@/api/useApi";
import { getFilteredProducts, productResponseToProduct } from "@/utils/product";

const defaultValues = {
  products: [],
  filteredProducts: [],
  categories: [],
  productsCount: 0,

  isLoadingAll: false,
  isLoadingProducts: false,
  isLoadingCategories: false,
};

const createProductsSlice: StateCreator<
  ProductsSlice & FilterSlice,
  [],
  [],
  ProductsSlice
> = (set, get) => {
  // Disable ESLint as this edge case is in a Zustand store custom hook
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fetchProducts, fetchCategories } = useApi();

  /**
   * Fetch list of products from API
   * @param isProxyCall boolean To indicate if its a call from another action
   * @returns void
   */
  const fetchAllProducts = async (options: FetchAllProductOptions) => {
    const { category } = options;

    try {
      set(() => ({ isLoadingProducts: true }));
      const { products } = await fetchProducts({ category });
      const formattedProducts = products.map(productResponseToProduct);

      set((state) => {
        const filteredProducts = getFilteredProducts(
          formattedProducts,
          state.filterValues
        );

        return {
          products: formattedProducts,
          filteredProducts,
          isLoadingProducts: false,
          // NOTE: using limit as we don't have pagination and its the current total
          productsCount: filteredProducts.length,
        };
      });

      // updateFilteredProducts();
      return formattedProducts;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  /**
   * Fetch list of categories from API
   * @param isProxyCall boolean To indicate if its a call from another action
   * @returns void
   */
  const fetchAllCategories = async () => {
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
      console.log("Error: ", error);
    }
  };

  /**
   *  Reset product data
   * @returns void
   */
  const clear = () => set({ ...defaultValues });

  return {
    ...defaultValues,
    fetchProducts: fetchAllProducts,
    fetchCategories: fetchAllCategories,
    getProductById: (id: string) => get().products.find((p) => `${p.id}` === id),
    clear,
  };
};

export default createProductsSlice;

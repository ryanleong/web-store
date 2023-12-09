import { StateCreator } from "zustand";

import { FetchAllProductOptions, FilterSlice, ProductsSlice } from "./types";
import { kebabToText } from "@/utils/string";
import useApi from "@/api";
import { getFilteredProducts } from "@/utils/product";

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
> = (set) => {
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
      const { products, limit } = await fetchProducts({ category });

      const formattedProducts = products.map((product) => ({
        id: product.id,
        name: product.title,
        brand: product.brand,
        price: product.price,
        image: product.thumbnail,
        images: product.images,
        stock: product.stock,
        category: product.category,
        rating: product.rating,
      }));

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
          productsCount: limit,
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
    clear,
  };
};

export default createProductsSlice;

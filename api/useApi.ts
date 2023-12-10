import { FetchProductsOptions, HookApi } from "./types";

const useApi = (): HookApi => {
  const fetchProducts = async (options: FetchProductsOptions) => {
    const { category } = options;
    const categoryPath = category ? `/category/${category}` : '';

    const res = await fetch(`/api/products${categoryPath}`);
    const data = await res.json();
    return data;
  };

  const fetchProduct = async (productId: string) => {
    const res = await fetch(`/api/products/${productId}`);
    const data = await res.json();
    return data;
  };

  const fetchCategories = async () => {
    const res = await fetch(`/api/products/categories`);
    const data = await res.json();
    return data;
  }

  return {
    fetchProducts,
    fetchProduct,
    fetchCategories,
  };
};

export default useApi;

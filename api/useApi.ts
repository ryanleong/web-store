import { FetchProductsOptions, HookApi } from './types';

const useApi = (): HookApi => {
  const fetchProducts = async (options: FetchProductsOptions) => {
    const { category } = options;
    const categoryPath = category ? `/category/${category}` : '';

    const res = await fetch(`/api/products${categoryPath}`);
    if (!res.ok) {
      throw new Error(`${res.statusText}`, { cause: res });
    }
    const data = await res.json();
    return data;
  };

  const fetchProduct = async (productId: string) => {
    const res = await fetch(`/api/products/${productId}`);
    if (!res.ok) {
      throw new Error(`${res.statusText}`, { cause: res });
    }
    const data = await res.json();
    return data;
  };

  const fetchCategories = async () => {
    const res = await fetch('/api/products/categories');
    if (!res.ok) {
      throw new Error(`${res.statusText}`, { cause: res });
    }
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

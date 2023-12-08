import { API_URL } from "@/utils/constants";

type ResponseProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: Array<string>;
};

type ResponseProducts = {
  products: Array<ResponseProduct>;
  total: number;
  limit: number;
};

type ResponseCategories = Array<string>;


type HookApi = {
  fetchProducts: () => Promise<ResponseProducts>;
  fetchProduct: (productId: string) => Promise<ResponseProduct>;
  fetchCategories: () => Promise<ResponseCategories>;
};

const useApi = (): HookApi => {
  const fetchProducts = async () => {
    const res = await fetch(`${API_URL}/products`);
    const data = await res.json();
    return data;
  };

  const fetchProduct = async (productId: string) => {
    const res = await fetch(`${API_URL}/products/${productId}`);
    const data = await res.json();
    return data;
  };

  const fetchCategories = async () => {
    const res = await fetch(`${API_URL}/products/categories`);
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

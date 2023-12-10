export type ResponseProduct = {
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

export type ResponseProducts = {
  products: Array<ResponseProduct>;
  total: number;
  limit: number;
};

export type ResponseCategories = Array<string>;

export type FetchProductsOptions = {
  category?: string;
}

export type HookApi = {
  fetchProducts: (options: FetchProductsOptions) => Promise<ResponseProducts>;
  fetchProduct: (productId: string) => Promise<ResponseProduct>;
  fetchCategories: () => Promise<ResponseCategories>;
};
import { ValueLabel } from "@/utils/types";

/**
 * Filter types
 */
export enum FilterType {
  CATEGORY = "category",
  RATING = "rating",
  PRICE = "price",
}
export interface FilterValues {
  [FilterType.CATEGORY]: string;
  [FilterType.RATING]: Array<string>;
  [FilterType.PRICE]: Array<string>;
}

export type IntialiseFilterValues = () => void;

export type SetFilterValue = (
  filterType: FilterType,
  value: string | Array<string>
) => void;
export interface FilterSlice {
  filterValues: FilterValues;

  intialiseFilterValues: IntialiseFilterValues;
  setFilterValue: SetFilterValue;
}

/**
 * Product types
 */

export type Product = {
  id: number;
  name: string;
  brand: string;
  price: number;
  discountPercentage: number;
  image: string;
  images: Array<string>;
  stock: number;
  category: string;
  rating: number,
  description: string;
};
export interface Category extends ValueLabel {}

export interface FetchAllProductOptions {
  category?: string;
}

export type ProductsSlice = {
  products: Array<Product>;
  filteredProducts: Array<Product>;
  productsCount: number;
  categories: Array<Category>;

  isLoadingProducts: boolean;
  isLoadingCategories: boolean;

  fetchProducts: (options: FetchAllProductOptions) => void;
  fetchCategories: () => void;
  clear: () => void;

  getProductById: (id: string) => Product | undefined;
};

/**
 * Cart Types
 */
export type CartItem = {
  product: Product;
  quantity: number;
}

export type AddItemToCart = (product: Product, quantity?: number) => void;
export type RemoveItemFromCart = (productId: number) => void;
export type UpdateCartItemQuantity = (productId: number, quantity: number) => void;

export type CartSlice = {
  cartItems: Array<CartItem>;
  addItemToCart: AddItemToCart;
  removeItemFromCart: RemoveItemFromCart;
  updateCartItemQuantity: UpdateCartItemQuantity;
};

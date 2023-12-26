import { ValueLabel } from '@/utils/types';

/**
 * Filter types
 */
export enum FilterType {
  CATEGORY = 'category',
  RATING = 'rating',
  PRICE = 'price',
}
export interface FilterValues {
  [FilterType.CATEGORY]: string;
  [FilterType.RATING]: Array<string>;
  [FilterType.PRICE]: Array<string>;
}

export enum SortValue {
  PRICE_LOW_TO_HIGH = 'price_low_to_high',
  PRICE_HIGH_TO_LOW = 'price_high_to_low',
}

export type IntialiseFilterValues = () => void;

export type SetFilterValue = (
  filterType: FilterType,
  value: string | Array<string>
) => void;

export type SetSortValue = (sortValue: SortValue) => void;

export interface FilterSlice {
  filterValues: FilterValues;
  sortValue: SortValue;
  hasBeenInitialized: boolean;
  intialiseFilterValues: IntialiseFilterValues;
  setFilterValue: SetFilterValue;
  setSortValue: SetSortValue;
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
  discountedPrice: number;
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
  subTotalPrice: number;
}

export type AddItemToCart = (product: Product, quantity?: number) => void;
export type RemoveItemFromCart = (productId: number) => void;
export type UpdateCartItemQuantity = (productId: number, quantity: number) => void;
export type GetCartItemQuantity = (id: number) => number;

export type CartSlice = {
  cartItems: Array<CartItem>;
  totalPrice: number;
  initCart: () => void;
  addItemToCart: AddItemToCart;
  removeItemFromCart: RemoveItemFromCart;
  updateCartItemQuantity: UpdateCartItemQuantity;
  getCartItemCount: () => number;
  getCartItemQuantity: GetCartItemQuantity;
};

/**
 * Notification Types
 */
export enum NotificationType {
  ADD_TO_CART = 'add_to_cart',
}

export type Notification = {
  message: string;
  type: NotificationType;
};

export type PushNotification = (notification: Notification) => void;
export type ShiftNotification = () => void;

export type NotificationSlice = {
  notifications: Array<Notification>;
  pushNotification: PushNotification;
  shiftNotification: ShiftNotification;
};
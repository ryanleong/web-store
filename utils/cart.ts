import { CartItem } from '@/store/types';

/**
 * Calculate total price of cart
 * @param cartItems
 * @returns
 */
const calculateTotalPriceOfCart = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, cartItem) => total + cartItem.subTotalPrice,
    0
  );
};

/**
 * Calculate total price of item
 * @param item
 * @returns
 */
const calculateTotalPriceOfItem = (item: CartItem): CartItem => {
  const unitPrice = item.product.discountedPrice || item.product.price;
  const subTotalPrice = item.quantity * unitPrice;
  return { ...item, subTotalPrice };
};

export { calculateTotalPriceOfItem, calculateTotalPriceOfCart };

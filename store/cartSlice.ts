import { StateCreator } from 'zustand';
import {
  AddItemToCart,
  CartItem,
  CartSlice,
  NotificationType,
  NotificationSlice,
  RemoveItemFromCart,
  UpdateCartItemQuantity,
  GetCartItemQuantity,
} from './types';
import {
  calculateTotalPriceOfCart,
  calculateTotalPriceOfItem,
} from '@/utils/cart';
import { fromLocalStorage, toLocalStorage } from '@/utils/local';
import { CART_STORAGE_KEY } from '@/config/constants';

const createCartSlice: StateCreator<
  CartSlice & NotificationSlice,
  [],
  [],
  CartSlice
> = (set, get) => {
  /**
   * Initialize cart from local storage
   */
  const initCart = () => {
    const existingCartData = fromLocalStorage(CART_STORAGE_KEY);

    if (existingCartData) {
      set((state) => {
        return { ...state, ...existingCartData };
      });
    }
  };

  /**
   * Add item to cart
   * @param product
   */
  const addItemToCart: AddItemToCart = (product, quantity = 1) => {
    set((state) => {
      const { cartItems, pushNotification } = state;
      let updatedCartItems = cartItems;

      // check if item already exists in cart
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );

      if (existingCartItem) {
        // if item exists, increase quantity
        updatedCartItems = cartItems.map((cartItem) => {
          if (cartItem.product.id !== product.id) return cartItem;

          const updatedQuantity = cartItem.quantity + quantity;
          const updatedCartItem = { ...cartItem, quantity: updatedQuantity };
          return calculateTotalPriceOfItem(updatedCartItem);
        });
      } else {
        // if item does not exist, add new item
        const newItem = { product, quantity, subTotalPrice: 0 };
        const finalItem = calculateTotalPriceOfItem(newItem);
        updatedCartItems = [...cartItems, finalItem];
      }

      // Push a notification
      pushNotification({
        type: NotificationType.ADD_TO_CART,
        message: 'Your item has been added to cart',
      });

      const totalPrice = calculateTotalPriceOfCart(updatedCartItems);
      const finalCart = { totalPrice, cartItems: updatedCartItems };

      // API call would be made here to persist the cart items.
      // For this demo, we will just store the cart items in localStorage
      // as the mock API does not persist the data
      toLocalStorage(CART_STORAGE_KEY, finalCart);
      return { ...state, ...finalCart };
    });
  };

  /**
   * Remove item from cart
   * @param productId
   */
  const removeItemFromCart: RemoveItemFromCart = (productId) => {
    set((state) => {
      const { cartItems } = state;

      const updatedCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      );

      const totalPrice = calculateTotalPriceOfCart(updatedCartItems);
      const finalCart = { totalPrice, cartItems: updatedCartItems };

      // API call would be made here to persist the cart items.
      // For this demo, we will just store the cart items in localStorage
      // as the mock API does not persist the data
      toLocalStorage(CART_STORAGE_KEY, finalCart);
      return { ...state, ...finalCart };
    });
  };

  /**
   * Update item quantity
   * @param productId
   * @param quantity
   */
  const updateCartItemQuantity: UpdateCartItemQuantity = (
    productId,
    quantity
  ) => {
    set((state) => {
      const { cartItems } = state;

      // update quantity of item
      const updatedCartItems = cartItems.reduce(
        (cart: Array<CartItem>, cartItem) => {
          if (cartItem.product.id !== productId) return [...cart, cartItem];

          // Remove if quantity is 0
          if (quantity === 0) return cart;

          // Update quantity
          const updatedCartItem = { ...cartItem, quantity };
          return [...cart, calculateTotalPriceOfItem(updatedCartItem)];
        },
        []
      );

      const totalPrice = calculateTotalPriceOfCart(updatedCartItems);
      const finalCart = { totalPrice, cartItems: updatedCartItems };

      // API call would be made here to persist the cart items.
      // For this demo, we will just store the cart items in localStorage
      // as the mock API does not persist the data
      toLocalStorage(CART_STORAGE_KEY, finalCart);
      return { ...state, ...finalCart };
    });
  };

  /**
   * Get total number of items in cart
   * @returns
   */
  const getCartItemCount = () => {
    const cartItems = get().cartItems;
    const total = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.quantity,
      0
    );

    return total;
  };

  /**
   * Get quantity of item in cart
   * @param productId
   * @returns number
   */
  const getCartItemQuantity: GetCartItemQuantity = (productId) => {
    const cartItems = get().cartItems;
    const item = cartItems.find(
      (cartItem) => cartItem.product.id === productId
    );
    return item ? item.quantity : 0;
  };

  return {
    cartItems: [],
    totalPrice: 0,
    initCart,
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    getCartItemCount,
    getCartItemQuantity,
  };
};

export default createCartSlice;

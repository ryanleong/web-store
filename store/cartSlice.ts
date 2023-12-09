import { StateCreator } from "zustand";
import { AddItemToCart, CartSlice, RemoveItemFromCart, UpdateCartItemQuantity } from "./types";

const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set, get) => {
  /**
   * Add item to cart
   * @param product
   */
  const addItemToCart: AddItemToCart = (product, quantity = 1) => {
    // API call would be made here to persist the cart items.
    // For this demo, we will just store the cart items in memory
    // as the mock API does not persist the data

    set((state) => {
      const { cartItems } = state;

      // check if item already exists in cart
      const existingCartItem = cartItems.find(
        (cartItem) => cartItem.product.id === product.id
      );

      // if item exists, increase quantity
      if (existingCartItem) {
        return {
          ...state,
          cartItems: cartItems.map((cartItem) =>
            cartItem.product.id === product.id
              ? { ...cartItem, quantity: cartItem.quantity + quantity }
              : cartItem
          ),
        };
      }

      // if item does not exist, add new item
      return {
        ...state,
        cartItems: [...cartItems, { product, quantity }],
      };
    })
  };

  /**
   * Remove item from cart
   * @param productId
   */
  const removeItemFromCart: RemoveItemFromCart = (productId) => {
    // API call would be made here to persist the cart items.
    // For this demo, we will just store the cart items in memory
    // as the mock API does not persist the data

    set((state) => {
      const { cartItems } = state;

      const filteredCartItems = cartItems.filter(
        (cartItem) => cartItem.product.id !== productId
      );

      return { ...state, cartItems: filteredCartItems };
    });
  };

  /**
   * Update item quantity
   * @param productId
   * @param quantity
   */
  const updateCartItemQuantity: UpdateCartItemQuantity = (productId, quantity) => {
    // API call would be made here to persist the cart items.
    // For this demo, we will just store the cart items in memory
    // as the mock API does not persist the data

    set((state) => {
      const { cartItems } = state;

      // update quantity of item
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem.product.id === productId
          ? { ...cartItem, quantity }
          : cartItem
      );

      return { ...state, cartItems: updatedCartItems };
    });
  };

  const getCartItemCount = () => {
    const cartItems = get().cartItems;
    const total = cartItems.reduce((acc, cartItem) => acc + cartItem.quantity, 0);

    return total;
  }

  return {
    cartItems: [],
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
    getCartItemCount,
  };
};

export default createCartSlice;

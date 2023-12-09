import { StateCreator } from "zustand";
import { AddItemToCart, CartSlice, RemoveItemFromCart, UpdateCartItemQuantity } from "./types";

const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => {
  /**
   * Add item to cart
   * @param product
   */
  const addItemToCart: AddItemToCart = (product, quantity = 1) => {
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

  return {
    cartItems: [],
    addItemToCart,
    removeItemFromCart,
    updateCartItemQuantity,
  };
};

export default createCartSlice;

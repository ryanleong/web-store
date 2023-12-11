import { CART_STORAGE_KEY } from '@/config/constants';
import cartSlice from '../cartSlice';
import { fromLocalStorage, toLocalStorage } from '@/utils/local';
import { mockCart, mockProduct2 } from '../../config/tests/mocks';

jest.mock('@/utils/local')

describe('cartSlice', () => {
  describe('#initCart', () => {
    let mockState = {
      totalPrice: 0,
      cartItems: []
    }
    const localStorageCart = {
      totalPrice: 200,
      cartItems: mockCart
    }

    fromLocalStorage.mockReturnValue(localStorageCart);
    const set = jest.fn((updateState) => {
      mockState = updateState();
    });

    const store = cartSlice(set);

    it('should initialize cart', () => {
      store.initCart();

      expect(store.cartItems).toEqual([]);
      expect(store.totalPrice).toEqual(0);
    });

    it('should initialize from localStorage', async () => {
      store.initCart();

      expect(fromLocalStorage).toHaveBeenCalledWith(CART_STORAGE_KEY);
      expect(mockState.totalPrice).toBe(200);
      expect(mockState.cartItems).toBe(mockCart);
    })
  });

  describe('#addItemToCart', () => {
    let mockState = {
      totalPrice: 1,
      cartItems: [mockCart[0]]
    }

    const set = (updateStateFn) => {
      mockState = updateStateFn(mockState);
    };
    const store = cartSlice(set);

    it('should add a new item to the cart', () => {
      store.addItemToCart(mockProduct2, 3);
      expect(mockState.totalPrice).toBe(170);
      expect(mockState.cartItems).toStrictEqual(mockCart);
    })

    it('should update an existing item in cart', () => {
      toLocalStorage.mockReturnValue(true);

      store.addItemToCart(mockProduct2, 1);

      expect(toLocalStorage).toHaveBeenCalled();
      expect(mockState.totalPrice).toBe(193);
      expect(mockState.cartItems).toStrictEqual([
        mockCart[0],
        {
          product: mockProduct2,
          quantity: 4,
          subTotalPrice: 92,
        }
      ]);
    })
  });

  describe('#removeItemFromCart', () => {
    let mockState = {
      totalPrice: 1,
      cartItems: mockCart
    };

    const set = (updateStateFn) => {
      mockState = updateStateFn(mockState);
    };
    const store = cartSlice(set);

    it('should add a new item to the cart', () => {
      toLocalStorage.mockReturnValue(true);
      store.removeItemFromCart(mockCart[0].product.id);

      expect(toLocalStorage).toHaveBeenCalled();
      expect(mockState.totalPrice).toBe(69);
      expect(mockState.cartItems).toStrictEqual([mockCart[1]]);
    })
  });

  describe('#updateCartItemQuantity', () => {
    let mockState = {
      totalPrice: 339,
      cartItems: mockCart
    };

    const set = (updateStateFn) => {
      mockState = updateStateFn(mockState);
    };
    const store = cartSlice(set);

    it('should remove quantity from the item in cart', () => {
      toLocalStorage.mockReturnValue(true);
      store.updateCartItemQuantity(mockCart[1].product.id, 2);

      expect(toLocalStorage).toHaveBeenCalled();
      expect(mockState.totalPrice).toBe(147);
      expect(mockState.cartItems).toStrictEqual([
        mockCart[0],
        { product: mockProduct2, quantity: 2, subTotalPrice: 46 }
      ]);
    });

    it('should remove the item from cart when no quantity', () => {
      toLocalStorage.mockReturnValue(true);
      store.updateCartItemQuantity(mockCart[1].product.id, 0);

      expect(toLocalStorage).toHaveBeenCalled();
      expect(mockState.totalPrice).toBe(101);
      expect(mockState.cartItems).toStrictEqual([mockCart[0]]);
    });
  });

  describe('#getCartItemCount', () => {
    let mockState = {
      totalPrice: 339,
      cartItems: mockCart
    };

    const get = () => mockState;
    const store = cartSlice(() => {}, get);

    it('should return total number of items in cart', () => {
      const result = store.getCartItemCount();
      expect(result).toBe(4);
    });
  });
});
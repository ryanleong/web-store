import { calculateTotalPriceOfCart, calculateTotalPriceOfItem } from '../cart';

describe('utils/cart', () => {
  describe('#calculateTotalPriceOfCart', () => {
    it('should correctly calculate the total price of the cart', () => {
      const cartItems = [
        { subTotalPrice: 10 },
        { subTotalPrice: 20 },
        { subTotalPrice: 30 },
      ];

      const totalPrice = calculateTotalPriceOfCart(cartItems);
      expect(totalPrice).toBe(60);
    });
  });

  describe('#calculateTotalPriceOfItem', () => {
    it('should calculate the total price of an item without a discount', () => {
      const item = {
        product: {
          price: 100,
        },
        quantity: 2,
      };

      const result = calculateTotalPriceOfItem(item);
      expect(result.subTotalPrice).toEqual(200);
    });

    it('should calculate the total price of an item with a discount', () => {
      const item = {
        product: {
          price: 100,
          discountedPrice: 80,
        },
        quantity: 2,
      };

      const result = calculateTotalPriceOfItem(item);
      expect(result.subTotalPrice).toEqual(160);
    });
  });
});

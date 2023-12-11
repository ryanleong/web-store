import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useStore } from '@/store';
import CartItem from '../CartItem';

jest.mock('@/store');

describe('CartItem', () => {
  const mockItem = {
    product: {
      id: '12',
      name: 'Test Product',
      brand: 'Test Brand',
      image: '/test.jpg',
    },
    quantity: 1,
    subTotalPrice: 100,
  };

  it('displays the correct product name, brand, and price', () => {
    useStore.mockReturnValue({
      updateCartItemQuantity: jest.fn(),
      removeItemFromCart: jest.fn(),
    });
    const { getByTestId } = render(<CartItem item={mockItem} />);
    expect(getByTestId('name').textContent).toBe(mockItem.product.name);
    expect(getByTestId('brand').textContent).toBe(mockItem.product.brand);
    expect(getByTestId('price').textContent).toBe(`$${mockItem.subTotalPrice}`);
  });

  it ('should normalise the price', () => {
    useStore.mockReturnValue({
      updateCartItemQuantity: jest.fn(),
      removeItemFromCart: jest.fn(),
    });
    const item = { ...mockItem, subTotalPrice: 23.92839827}
    const { getByTestId } = render(<CartItem item={item} />);
    expect(getByTestId('price').textContent).toBe('$23.93');
  });

  it('calls removeItemFromCart when remove button is clicked', () => {
    const removeItemFromCart = jest.fn();
    useStore.mockReturnValue({ updateCartItemQuantity: jest.fn(), removeItemFromCart });

    const { getByTestId } = render(<CartItem item={mockItem} />);
    fireEvent.click(getByTestId('remove-btn'));

    expect(removeItemFromCart).toHaveBeenCalledWith(mockItem.product.id);
  });
});

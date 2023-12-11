import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { useStore } from '@/store';
import { mockCart } from '@/config/tests/mocks';
import CartItems from '../CartItems';

jest.mock('@/store');
jest.mock('../CartItem', () => {
  const MockCartItemComponent = () => <div data-testid="cart-item">CartItem</div>
  return MockCartItemComponent
});

afterEach(cleanup);

describe('CartItems', () => {
  it('renders quantity and pricing column headers', () => {
    useStore.mockReturnValue({ cartItems: mockCart });
    const { getByText } = render(<CartItems />);
    expect(getByText('Quantity')).toBeInTheDocument();
    expect(getByText('Price')).toBeInTheDocument();
  });

  it('renders correct number of CartItem components', () => {
    useStore.mockReturnValue({ cartItems: mockCart });
    const { getAllByTestId } = render(<CartItems />);
    expect(getAllByTestId(/cart-item/).length).toBe(mockCart.length);
  });
});
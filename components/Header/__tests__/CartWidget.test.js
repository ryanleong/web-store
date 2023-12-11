import React from 'react';
import { render, act } from '@testing-library/react';
import { useStore } from '@/store';
import CartWidget from '../CartWidget';

jest.mock('@/store');

describe('CartWidget', () => {
  it('renders without crashing', () => {
    useStore.mockReturnValue({
      initCart: jest.fn(),
      getCartItemCount: jest.fn().mockReturnValue(0),
    });

    const { getByTestId } = render(<CartWidget />);

    expect(getByTestId('cart-link')).toBeInTheDocument();
  });

  it('shows notification when item is added to cart', async () => {
    let itemCount = 0;
    useStore.mockReturnValue({
      initCart: jest.fn(),
      getCartItemCount: () => itemCount,
    });

    const { getByTestId, rerender } = render(<CartWidget />);

    // Initially, the notification should not be present
    expect(getByTestId('notification')).not.toHaveClass('opacity-100');

    // Simulate adding an item to the cart
    act(() => {
      itemCount = 1;
    });
    rerender(<CartWidget />);

    // Now, the notification should be present
    expect(getByTestId('notification')).toHaveClass('opacity-100');
  });
});

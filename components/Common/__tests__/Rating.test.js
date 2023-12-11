import React from 'react';
import { render } from '@testing-library/react';
import Rating from '../Rating';

describe('Rating', () => {
  it('renders correct number of stars', () => {
    const rating = 4;
    const { getAllByTestId } = render(<Rating rating={rating} />);
    expect(getAllByTestId('star').length).toBe(rating);
  });
});

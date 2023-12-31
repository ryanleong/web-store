import React from 'react';
import { render } from '@testing-library/react';
import Footer from '../Footer';

describe('Footer', () => {
  test('renders Footer component', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('footer-message')).toBeInTheDocument();
  });
});

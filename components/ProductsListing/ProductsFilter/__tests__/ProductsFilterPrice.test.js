import React from 'react';
import { render } from '@testing-library/react';

import { FilterType } from '@/store/types';
import ProductsFilterPrice from '../ProductsFilterPrice';

jest.mock('../ProductsFilterCheckbox', () => {
  const MockComponent = () => <div data-testid="mock">mock</div>
  return MockComponent
});

describe('ProductsFilterPrice', () => {
  const mockProps = {
    filterType: FilterType.PRICE,
    items: [{ min: 0, max: 100, label: '0-100' }],
  };

  it('renders without crashing', () => {
    const { getByTestId } = render(<ProductsFilterPrice {...mockProps} />);
    expect(getByTestId('mock')).toBeInTheDocument();
  });
});
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useStore } from '@/store';
import { FilterType } from '@/store/types';
import ProductsFilterToggle from '../ProductsFilterToggle';
import { mockFilterValues } from '../../../../config/tests/mocks';

jest.mock('@/store');

describe('ProductsFilterToggle', () => {
  const mockUseStore = {
    filterValues: '',
    setFilterValue: jest.fn(),
  };

  const items = [
    { label: 'label1', value: 'label1' },
    { label: 'label2', value: 'label2' },
    { label: 'label3', value: 'label3' },
  ];

  beforeEach(() => {
    useStore.mockReturnValue(mockUseStore);
  });

  it('should render button elements', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductsFilterToggle filterType={FilterType.CATEGORY} items={items} />
    );

    expect(getAllByTestId('button').length).toBe(items.length);
    expect(getByTestId('title')).toBeInTheDocument();
  });

  it('should call setFilterValues when button is clicked', () => {
    const { getAllByTestId } = render(
      <ProductsFilterToggle filterType={FilterType.CATEGORY} items={items} />
    );

    // When button is clicked, it should add the value
    fireEvent.click(getAllByTestId('button')[1]);
    expect(mockUseStore.setFilterValue).toHaveBeenCalledWith(
      FilterType.CATEGORY,
      'label2'
    );

    // When button another button is clicked
    fireEvent.click(getAllByTestId('button')[2]);
    expect(mockUseStore.setFilterValue).toHaveBeenCalledWith(
      FilterType.CATEGORY,
      'label3'
    );
  });
});

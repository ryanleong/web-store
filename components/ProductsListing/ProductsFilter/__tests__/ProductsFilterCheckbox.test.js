import React from 'react';
import { render, fireEvent } from '@testing-library/react';

import { useStore } from '@/store';
import { FilterType } from '@/store/types';
import ProductsFilterCheckbox from '../ProductsFilterCheckbox';
import { mockFilterValues } from '../../../../config/tests/mocks';

jest.mock('@/store');

describe('ProductsFilterCheckbox', () => {
  const mockUseStore = {
    filterValues: mockFilterValues,
    setFilterValue: jest.fn(),
  };

  const items = [
    { label: 'label1', value: '1' },
    { label: 'label2', value: '2' },
    { label: 'label3', value: '3' },
  ];

  beforeEach(() => {
    useStore.mockReturnValue(mockUseStore);
  });

  it('should render checkbox elements', () => {
    const { getByTestId, getAllByTestId } = render(
      <ProductsFilterCheckbox filterType={FilterType.RATING} items={items} />
    );

    expect(getAllByTestId('checkbox').length).toBe(items.length);
    expect(getByTestId('label')).toBeInTheDocument();
  });

  it('should call setFilterValues when checkbox is clicked', () => {
    const { getAllByTestId } = render(
      <ProductsFilterCheckbox filterType={FilterType.RATING} items={items} />
    );

    // When checkbox is clicked, it should add the value
    fireEvent.click(getAllByTestId('checkbox')[1]);
    expect(mockUseStore.setFilterValue).toHaveBeenCalledWith(
      FilterType.RATING,
      ['1', '3', '5', '2']
    );

    // When checkbox is clicked again, it should remove the value
    fireEvent.click(getAllByTestId('checkbox')[0]);
    expect(mockUseStore.setFilterValue).toHaveBeenCalledWith(
      FilterType.RATING,
      ['3', '5']
    );
  });
});

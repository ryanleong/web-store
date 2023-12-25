import React from 'react';
import { useStore } from '@/store';
import { SortValue } from '@/store/types';

const classes = {
  sort: 'ml-auto',
};

interface ProductsSortProps {}

const ProductsSort: React.FC<ProductsSortProps> = (props) => {
  const {} = props;
  const { sortValue, setSortValue } = useStore();

  const onSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as SortValue;
    setSortValue(value);
  };

  return (
    <select
      className={classes.sort}
      onChange={onSelectChange}
      value={sortValue}
    >
      <option value={SortValue.PRICE_HIGH_TO_LOW}>High to Low</option>
      <option value={SortValue.PRICE_LOW_TO_HIGH}>Low to High</option>
    </select>
  );
};

export default ProductsSort;

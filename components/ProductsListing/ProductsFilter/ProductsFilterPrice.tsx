import React from 'react';
import { ProductPriceRange } from '@/utils/types';
import ProductsFilterCheckbox, {
  ProductsFilterCheckboxProps,
} from './ProductsFilterCheckbox';

interface ProductsFilterPriceProps extends ProductsFilterCheckboxProps {
  items: Array<ProductPriceRange>;
}

const ProductsFilterPrice: React.FC<ProductsFilterPriceProps> = (props) => {
  const { filterType, items = [] } = props;

  return (
    <ProductsFilterCheckbox
      filterType={filterType}
      items={items}
    />
  );
};

export default ProductsFilterPrice;

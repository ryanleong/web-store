import React from 'react';

import { FilterType } from '@/store/types';
import { ValueLabel } from '@/utils/types';
import { useStore } from '@/store';

interface ProductsFilterToggleProps {
  filterType: FilterType;
  items: Array<ValueLabel>;
}

const classes = {
  wrapper: 'border-b-2 mb-4 w-full',
  title: 'font-semibold mb-3.5 uppercase',
  fieldSet: 'flex flex-col mb-4',
  inputWrapper: 'cursor-pointer',
  label: 'capitalize',
};

const ProductsFilterToggle: React.FC<ProductsFilterToggleProps> = (props) => {
  const { filterValues, setFilterValue } = useStore();

  const { filterType, items = [] } = props;
  const selectedValue = filterValues[filterType];

  const updateFilterValue = (value: string) => {
    const updatedValue = selectedValue === value ? '' : value;
    setFilterValue(filterType, updatedValue);
  }

  const renderItems = () => {
    return items.map(({ value, label }) => {
      return (
        <div key={value} className={classes.inputWrapper}>
          <button
            className={`${classes.label} ${
              selectedValue === value ? 'text-red-800' : ''
            }`}
            onClick={() => updateFilterValue(value)}
          >
            {label}
          </button>
        </div>
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>{filterType}</h3>
      <fieldset className={classes.fieldSet}>{renderItems()}</fieldset>
    </div>
  );
};

export default ProductsFilterToggle;

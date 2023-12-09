import React from "react";

import { ValueLabel } from "@/utils/types";
import { FilterType } from "@/store/types";
import { useProductsFilterStore } from "@/store/productsFilter";
import { useRouter } from "next/router";

interface ProductsFilterToggleProps {
  filterType: FilterType;
  items: Array<ValueLabel>;
}

const classes = {
  wrapper: "border-b-2 last:border-b-0 mb-4",
  title: "font-semibold mb-3.5 uppercase",
  fieldSet: "flex flex-col mb-4",
  inputWrapper: "cursor-pointer",
  inputLabel: "capitalize",
};

const ProductsFilterToggle: React.FC<ProductsFilterToggleProps> = (props) => {
  const router = useRouter();
  const { filterValues, setFilterValue } = useProductsFilterStore();

  const { filterType, items = [] } = props;
  const selectedValue = filterValues[filterType];

  const updateFilterValue = (value: string) => {
    const updatedValue = selectedValue === value ? "" : value;
    setFilterValue(filterType, updatedValue);
  }

  const renderItems = () => {
    return items.map(({ value, label }) => {
      return (
        <div key={value} className={classes.inputWrapper}>
          <button
            className={`${classes.inputLabel} ${
              selectedValue === value ? "text-red-800" : ""
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

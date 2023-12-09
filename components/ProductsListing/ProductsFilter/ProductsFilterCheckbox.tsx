import React from "react";

import { ValueLabel } from "@/utils/types";
import { FilterType } from "@/store/types";
import { useStore } from "@/store";

export interface ProductsFilterCheckboxProps {
  filterType: FilterType;
  items: Array<ValueLabel>;
}

const classes = {
  wrapper: "border-b-2 mb-4 w-full",
  title: "font-semibold mb-3.5 uppercase",
  fieldSet: "flex flex-col mb-4",
  inputWrapper: "flex align-center cursor-pointer",
  inputLabel: "capitalize ml-2",
};

const ProductsFilterCheckbox: React.FC<ProductsFilterCheckboxProps> = (props) => {
  const { filterValues, setFilterValue } = useStore();
  const { filterType, items = [] } = props;
  const selectedValue = filterValues[filterType] as Array<string>;

  const updatesSelectedValue = (value: string) => {
    if (selectedValue.includes(value)) {
      setFilterValue(filterType, selectedValue.filter((item) => item !== value));
    } else {
      setFilterValue(filterType, [...selectedValue, value]);
    }
  }

  const renderItems = () => {
    return items.map(({value, label}) => {
      return (
        <div key={value} className={classes.inputWrapper}>
          <input
            type="checkbox"
            id={`${value}`}
            name={filterType}
            value={value}
            checked={selectedValue.includes(`${value}`)}
            onChange={(e) => updatesSelectedValue(e.target.value)}
          />
          <label
            htmlFor={`${value}`}
            className={`${classes.inputLabel}`}
          >
            {label}
          </label>
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

export default ProductsFilterCheckbox;

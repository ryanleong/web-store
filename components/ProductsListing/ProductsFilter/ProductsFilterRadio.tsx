import React, { useState } from "react";
import { ValueLabel } from "@/utils/types";
import { FilterType } from "./types";

interface ProductsFilterRadioProps {
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

const ProductsFilterRadio: React.FC<ProductsFilterRadioProps> = (props) => {
  const { filterType, items = [] } = props;
  const [selectedValue, setSelectedValue] = useState("");

  const renderItems = () => {
    return items.map(({value, label}) => {
      return (
        <div key={value} className={classes.inputWrapper}>
          <input
            type="radio"
            id={`${value}`}
            name={filterType}
            value={value}
            hidden
            checked={selectedValue === value}
            onChange={(e) => setSelectedValue(e.target.value)}
          />
          <label
            htmlFor={`${value}`}
            className={`${classes.inputLabel} ${
              selectedValue === value ? "text-red-800" : ""
            }`}
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

export default ProductsFilterRadio;

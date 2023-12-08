import React, { useState } from "react";

export enum FilterType {
  CATEGORY = "category",
  RATING = "rating",
  PRICE = "price",
  NONE = "none",
}

export interface ProductsFilterProps {
  filterType: FilterType;
  toggleState: (dropdown: FilterType) => void;
  isActive: boolean;
}

const ProductsFilter: React.FC<ProductsFilterProps> = (props) => {
  const { filterType, toggleState, isActive } = props;
  const rotateClass = isActive ? "rotate-180" : "";
  const hideClass = isActive ? "scale-y-100 h-auto" : "scale-y-0 h-0 pointer-events-none";

  return (
    <div className="relative">
      <button
        className="flex items-center uppercase block w-full sm:w-auto h-10 sm:h-auto"
        onClick={() => toggleState(filterType)}
      >
        { filterType }
        <span
          className={`material-symbols-outlined ml-auto transition-all ${rotateClass}`}
        >
          expand_more
        </span>
      </button>

      <div className={`sm:absolute bg-white sm:w-36 sm:border-2 sm:z-10 sm:top-9 transition-all overflow-hidden origin-top ${hideClass}`}>
        <ul>
          <li className="p-2">ajfoiwej</li>
          <li className="p-2">ajfoiwej</li>
          <li className="p-2">ajfoiwej</li>
          <li className="p-2">ajfoiwej</li>
          <li className="p-2">ajfoiwej</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductsFilter;

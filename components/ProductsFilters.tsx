import React, { useState } from "react";
import ProductsFilter from "./ProductsFilter";
import { FilterType } from "./ProductsFilter";

interface ProductsFiltersProps {}

// Static classes
const filterClassesMobile = 'w-screen p-4 fixed left-0 bottom-0 z-10 bg-white border-t-2 border-neutral-500 transition-all origin-bottom';
const filterClasses = 'sm:w-auto sm:flex sm:space-x-4 sm:p-0 sm:relative sm:border-t-0';

const ProductsFilters: React.FC<ProductsFiltersProps> = () => {
  const [isFilterHiddenMobile, setIsFilterHiddenMobile] = useState<boolean>(false);
  const [activeDropdown, setActiveDropDown] = useState<FilterType>(
    FilterType.NONE
  );

  const filterHiddenMobileClasses = isFilterHiddenMobile ? '' : "scale-y-0 pointer-events-none sm:scale-y-100 sm:pointer-events-auto";

  const toggleMobileFilterDrawer = () => {
    setIsFilterHiddenMobile(!isFilterHiddenMobile);
  }

  const updateActiveDropdown = (dropdown: FilterType) => {
    if (activeDropdown === dropdown) {
      setActiveDropDown(FilterType.NONE);
    } else {
      setActiveDropDown(dropdown);
    }
  };

  return (
    <div className="h-12 w-full flex items-center">
      <div className="flex">
        <button className="mr-4" onClick={toggleMobileFilterDrawer}>Filter By:</button>

        <div className={`${filterClassesMobile} ${filterClasses} ${filterHiddenMobileClasses}`}>
          <ProductsFilter
            filterType={FilterType.CATEGORY}
            toggleState={updateActiveDropdown}
            isActive={activeDropdown === FilterType.CATEGORY}
          />
          <ProductsFilter
            filterType={FilterType.RATING}
            toggleState={updateActiveDropdown}
            isActive={activeDropdown === FilterType.RATING}
          />
        </div>
      </div>

      <div className="flex ml-auto">
        <span className="mr-4">Sort By:</span>

        {/* <div className="flex space-x-4 absolute sm:relative">
          Sortby
        </div> */}
      </div>
    </div>
  );
};

export default ProductsFilters;

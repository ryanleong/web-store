import React, { useState } from "react";

interface ProductsSortProps {}

const classes = {
  wrapper: 'ml-auto flex align-middle',
  cta: 'flex',
  sidebar: 'fixed right-0 top-0 w-80 h-screen bg-white z-30 p-4',
  sidebarDesktop: '',
  title: "text-2xl mb-4",
}

const ProductsSort: React.FC<ProductsSortProps> = () => {
  return (
    <div className={classes.wrapper}>
      <button className={classes.cta}>
        Sort by
        <span className="material-symbols-outlined ml-2">sort</span>
      </button>

      <div className={`${classes.sidebar} ${classes.sidebarDesktop}`}>
        <h3 className={classes.title}>Sort by</h3>
        {/* TODO */}
      </div>
    </div>
  );
};

export default ProductsSort;

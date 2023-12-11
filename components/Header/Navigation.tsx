import React from 'react';
import Link from 'next/link';

interface NavigationProps {}

const classes = {
  wrapper: 'ml-auto',
  content: 'flex space-x-4',
};

const Navigation: React.FC<NavigationProps> = ({}) => {
  return (
    <div className={classes.wrapper}>
      <ul className={classes.content}>
        <li data-testid="products-link">
          <Link href="/">Home</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

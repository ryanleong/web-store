import React from "react";
import Link from "next/link";

interface NavigationProps {}

const Navigation: React.FC<NavigationProps> = ({}) => {
  return (
    <div id="nav-items">
      <ul className="flex space-x-4">
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

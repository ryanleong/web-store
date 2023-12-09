import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import { LOGO_URL } from "@/utils/constants";

interface HeaderProps {}

const classes = {
  wrapper: 'sticky top-0 z-40 bg-white shadow-[0_3px_16px_-2px_rgba(0,0,0,0.3)]',
  content: 'h-16 container mx-auto px-4 flex items-center',
  logo: 'mr-8',
  cart: 'ml-6',
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <nav className={classes.wrapper}>
      <div className={classes.content}>
        <Link href="/" className={classes.logo}>
          <Image src={LOGO_URL} width={110} height={42} alt="SecretLab Logo" />
        </Link>

        <Navigation />

        <div className={classes.cart}>
          <Link href="/cart">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

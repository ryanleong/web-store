import React from "react";
import Link from "next/link";
import Image from "next/image";
import Navigation from "./Navigation";
import { LOGO_URL } from "@/utils/constants";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <nav>
      <div className="h-16 container mx-auto px-4 flex items-center">
        <Link className="mr-8" href="/">
          <Image src={LOGO_URL} width={110} height={42} alt="SecretLab Logo" />
        </Link>

        <Navigation />

        <div className="ml-6">
          <Link href="/cart">
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;

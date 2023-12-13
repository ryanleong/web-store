import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';
import Notification from './Notification';
import { LOGO_URL } from '@/config/constants';
import CartWidget from './CartWidget';

interface HeaderProps {}

const classes = {
  wrapper:
    'sticky top-0 z-40 bg-white shadow-[0_3px_16px_-2px_rgba(0,0,0,0.3)]',
  content: 'h-16 container mx-auto px-4 flex items-center relative',
  logo: 'mr-8',
};

const Header: React.FC<HeaderProps> = () => {
  return (
    <nav className={classes.wrapper}>
      <div className={classes.content}>
        <Link href="/" className={classes.logo}>
          <Image src={LOGO_URL} width={110} height={42} alt="SecretLab Logo" />
        </Link>

        <Navigation />
        <CartWidget />
        <Notification />
      </div>
    </nav>
  );
};

export default Header;

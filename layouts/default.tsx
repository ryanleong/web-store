import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import React from 'react';

const DefaultLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default DefaultLayout;

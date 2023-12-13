import React from 'react';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import { useRouter } from 'next/router';

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
}

const transition = { duration: 0.75 };

const DefaultLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const {route} = useRouter();

  return (
    <>
      <Header />
      <motion.main
        key={route}
        initial="initial"
        animate="animate"
        variants={variants}
        transition={transition}
      >
        {children}
      </motion.main>
      <Footer />
    </>
  );
};

export default DefaultLayout;

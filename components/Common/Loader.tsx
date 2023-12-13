import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

import { LOADER_DURATION } from '@/config/constants';

interface LoaderProps {
  children: React.ReactNode;
  containerClasses?: string;
  loaderClasses?: string;
  isLoading?: boolean;
}

const spinTransition = {
  repeat: Infinity,
  ease: 'linear',
  duration: 1,
};

const classes = {
  wrapper: 'w-full',
  animationWrapper: 'w-full flex justify-center mt-40',
  animationContainer: 'relative h-16 w-16',
  animationElement: 'block h-12 w-12 border-t-4 border-gray-900 rounded-full top-0 left-0',
}

const Loader: React.FC<LoaderProps> = (props) => {
  const {
    children,
    containerClasses = '',
    loaderClasses = '',
    isLoading = false,
  } = props;
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShowLoader(true);
      setTimeout(() => setShowLoader(false), LOADER_DURATION);
    }
  }, [isLoading]);

  const renderLoadingAnimation = () => {
    return (
      <div
        className={`${classes.animationWrapper} ${loaderClasses}`}
        data-testid="loader"
      >
        <div className={classes.animationContainer}>
          <motion.span
            className={classes.animationElement}
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`${classes.wrapper} ${containerClasses}`}>
      {isLoading || showLoader ? renderLoadingAnimation() : children}
    </div>
  );
};

export default Loader;

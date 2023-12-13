import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
      setTimeout(() => setShowLoader(false), 1000);
    }
  }, [isLoading]);

  const renderLoadingAnimation = () => {
    return (
      <div
        className={`w-full flex justify-center mt-40 ${loaderClasses}`}
        data-testid="loader"
      >
        <div className="relative h-16 w-16">
          <motion.span
            className="block h-12 w-12 border-t-4 border-gray-900 rounded-full top-0 left-0"
            animate={{ rotate: 360 }}
            transition={spinTransition}
          />
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${containerClasses}`}>
      {isLoading || showLoader ? renderLoadingAnimation() : children}
    </div>
  );
};

export default Loader;

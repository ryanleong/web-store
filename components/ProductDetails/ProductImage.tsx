import React, { useState } from 'react';
import Image from 'next/image';

import { MAX_DETAILS_IMAGES } from '@/utils/constants';

interface ProductImageProps {
  images: Array<string>;
}

const classes = {
  wrapper: 'flex flex-col',
  mainImage: 'relative h-[400px] mb-4',
  mainImageDesktop: 'lg:h-[500px] xl:h-[600px]',
  thumbnails: 'w-full flex gap-4 justify-center',
  thumbnailButton: 'relative xl:h-36 h-24 xl:w-36 w-24',
};

const ProductImage: React.FC<ProductImageProps> = (props) => {
  const { images } = props;
  const [activeImage, setActiveImage] = useState(images[0]);

  const onThumbnailClick = (value: string) => {
    setActiveImage(value);
  };

  const renderThumnails = () => {
    const filteredImages = images.filter(
      (image, idx) => idx < MAX_DETAILS_IMAGES
    );

    return filteredImages.map((image, idx) => {
      return (
        <button
          key={image}
          className={classes.thumbnailButton}
          onClick={() => onThumbnailClick(image)}
        >
          <Image
            src={image}
            alt={`${image}-${idx}`}
            sizes="300px"
            fill
            style={{ objectFit: 'contain' }}
          />
        </button>
      );
    });
  };

  return (
    <div className={classes.wrapper}>
      <div className={`${classes.mainImage} ${classes.mainImageDesktop}`}>
        <Image
          src={activeImage}
          alt="Product Name"
          sizes="300px"
          fill
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className={classes.thumbnails}>{renderThumnails()}</div>
    </div>
  );
};

export default ProductImage;

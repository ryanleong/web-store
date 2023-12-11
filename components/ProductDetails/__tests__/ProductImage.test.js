import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ProductImage from '../ProductImage';
import { MAX_DETAILS_IMAGES } from '@/config/constants';

describe('ProductImage', () => {
  const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
  const altText = 'Product Name image';

  it('renders without crashing', () => {
    render(<ProductImage images={images} altText={altText} />);
  });

  it('displays the first image as the active image initially', () => {
    const { getByAltText } = render(
      <ProductImage images={images} altText={altText} />
    );
    const activeImage = getByAltText(altText);
    expect(activeImage.src).toContain('image1.jpg');
  });

  it('changes the active image when a thumbnail is clicked', () => {
    const { getByAltText, getAllByRole } = render(
      <ProductImage images={images} altText={altText} />
    );
    const thumbnails = getAllByRole('button');
    fireEvent.click(thumbnails[1]);
    const activeImage = getByAltText(altText);
    expect(activeImage.src).toContain('image2.jpg');
  });

  it('renders only up to MAX_DETAILS_IMAGES thumbnails', () => {
    const imagesList = [
      '/image1.jpg',
      '/image2.jpg',
      '/image3.jpg',
      '/image4.jpg',
      '/image5.jpg',
    ];
    const { getAllByRole } = render(
      <ProductImage images={imagesList} altText={altText} />
    );
    const thumbnails = getAllByRole('button');
    expect(thumbnails.length).toBeLessThanOrEqual(MAX_DETAILS_IMAGES);
  });
});

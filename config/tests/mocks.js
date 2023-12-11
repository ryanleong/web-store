import { FilterType } from '@/store/types';
import { PRODUCT_PRICE_RANGE } from '../constants';

export const mockAPIProduct = {
  id: 132,
  title: 'Product name',
  brand: 'Brand name',
  price: 132,
  discountPercentage: 23,
  thumbnail: '/product.jpg',
  images: ['/product.jpg', '/product2.jpg'],
  stock: 10,
  category: 'smartphones',
  rating: 3.2,
  description: 'lorem ipsum dolor sit amet',
};


export const mockProduct = {
  id: 132,
  name: 'Product name',
  brand: 'Brand name',
  price: 132,
  discountPercentage: 23,
  discountedPrice: 101,
  image: '/product.jpg',
  images: ['/product.jpg', '/product2.jpg'],
  stock: 10,
  category: 'smartphones',
  rating: 3.2,
  description: 'lorem ipsum dolor sit amet',
};

export const mockProduct2 = {
  id: 10,
  name: 'Product name 2',
  brand: 'Brand name 2',
  price: 44,
  discountPercentage: 1,
  discountedPrice: 23,
  image: '/product-2.jpg',
  images: ['/product-2.jpg', '/product2-2.jpg'],
  stock: 30,
  category: 'clothing',
  rating: 5,
  description: 'lorem ipsum dolor sit amet igor',
};

export const mockCartItem = {
  product: mockProduct,
  quantity: 1,
  subTotalPrice: 101,
};

export const mockCartItem2 = {
  product: mockProduct2,
  quantity: 3,
  subTotalPrice: 69,
};

export const mockCart = [mockCartItem, mockCartItem2];

export const mockFilterValues = {
  [FilterType.CATEGORY]: 'smartphones',
  [FilterType.RATING]: ['1', '3', '5'],
  [FilterType.PRICE]: [
    PRODUCT_PRICE_RANGE[0].value,
    PRODUCT_PRICE_RANGE[1].value,
  ],
};

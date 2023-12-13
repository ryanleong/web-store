import { FilterType } from '@/store/types';

export const LOGO_URL = 'https://images.secretlab.co/theme/common/logo_secretlab_xmas.svg';
export const CART_STORAGE_KEY = 'cartItems';
export const CART_NOTIFICATION_DURATION = 3500;
export const MAX_DETAILS_IMAGES = 4;
export const MIN_PURCHASE_QUANTITY = 1;
export const LOADER_DURATION = 500;

export const PRODUCT_RATINGS = [
  {
    value: '5',
    label: '⭐⭐⭐⭐⭐',
  },
  {
    value: '4',
    label: '⭐⭐⭐⭐',
  },
  {
    value: '3',
    label: '⭐⭐⭐',
  },
  {
    value: '2',
    label: '⭐⭐',
  },
  {
    value: '1',
    label: '⭐',
  }
];

export const PRODUCT_PRICE_RANGE = [
  {
    value: '0-100',
    label: '< $100',
    min: 0,
    max: 100,
  },
  {
    value: '101-200',
    label: '$101 to $200',
    min: 101,
    max: 200,
  },
  {
    value: '201-300',
    label: '$201 to $300',
    min: 201,
    max: 300,
  },
  {
    value: '301-400',
    label: '$301 to $400',
    min: 301,
    max: 400,
  },
  {
    value: '401-500',
    label: '$401 to $500',
    min: 401,
    max: 500,
  },
  {
    value: '>500',
    label: 'Over $500',
    min: 500,
    max: -1,
  },
]

export const DEFAULT_FILTER_VALUES = {
  [FilterType.CATEGORY]: '',
  [FilterType.RATING]: PRODUCT_RATINGS.map(({ value }) => value),
  [FilterType.PRICE]: PRODUCT_PRICE_RANGE.map(({ value }) => value),
}

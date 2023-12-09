export enum FilterType {
  CATEGORY = "category",
  RATING = "rating",
  PRICE = "price",
}

export interface FilterValues {
  [FilterType.CATEGORY]: string;
  [FilterType.RATING]: Array<string>;
  [FilterType.PRICE]: Array<string>;
}


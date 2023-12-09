export type ValueLabel = {
  value: string;
  label: string;
}

export interface ProductPriceRange extends ValueLabel {
  min: number;
  max: number;
}

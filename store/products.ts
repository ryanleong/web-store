import { create } from 'zustand'

type ProductsStore = {
  products: Array<any>,
  total: number,
  fetch: (products: Array<any>) => void,
  clear: () => void,
}

export const useCartStore = create<ProductsStore>((set) => ({
  products: [],
  total: 0,
  fetch: (products) => set((state) => ({ products })),
  clear: () => set({ products: [], total: 0 }),
}));

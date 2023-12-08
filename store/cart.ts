import { create } from 'zustand'

type CartStore = {
  products: Array<any>,
  removeAll: () => void
}

export const useCartStore = create<CartStore>((set) => ({
  products: [],
  removeAll: () => set({ products: [] }),
}));

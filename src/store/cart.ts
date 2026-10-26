import { create } from 'zustand';
import type { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  add: (product: Product) => void;
  clear: () => void;
  items: CartItem[];
  remove: (productId: string) => void;
};

// Day 1: store shell. Day 4 wires this up to the cart screen
// with quantity controls, totals and AsyncStorage persistence.
export const useCartStore = create<CartState>()((set) => ({
  add: (product) =>
    set((state) => {
      const existing = state.items.find((i) => i.product.id === product.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
          ),
        };
      }
      return { items: [...state.items, { product, quantity: 1 }] };
    }),
  clear: () => set({ items: [] }),
  items: [],
  remove: (productId) => set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Product } from '@/data/products';

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  add: (product: Product, quantity?: number) => void;
  clear: () => void;
  items: CartItem[];
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: Math.min(10, i.quantity + quantity) }
                  : i,
              ),
            };
          }
          return { items: [...state.items, { product, quantity: Math.max(1, Math.min(10, quantity)) }] };
        }),
      clear: () => set({ items: [] }),
      items: [],
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== productId) })),
      setQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((i) => i.product.id !== productId) };
          }
          return {
            items: state.items.map((i) =>
              i.product.id === productId ? { ...i, quantity: Math.min(10, quantity) } : i,
            ),
          };
        }),
    }),
    {
      name: 'rn-e-com-cart',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function deliveryFee(subtotal: number): number {
  if (subtotal <= 0) return 0;
  return subtotal >= 999 ? 0 : 49;
}

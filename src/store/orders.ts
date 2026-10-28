import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem } from '@/store/cart';

export type Order = {
  address: string;
  date: string;
  delivery: string;
  id: string;
  items: CartItem[];
  payment: string;
  status: string;
  total: number;
};

type OrdersState = {
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  orders: Order[];
};

export const useOrdersStore = create<OrdersState>()(
  persist(
    (set) => ({
      addOrder: (order) => {
        const full: Order = {
          ...order,
          date: new Date().toISOString(),
          id: `RNE-${Date.now().toString().slice(-6)}`,
          status: 'Placed',
        };
        set((state) => ({ orders: [full, ...state.orders] }));
        return full;
      },
      orders: [],
    }),
    {
      name: 'rn-e-com-orders',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { CartItem } from '@/store/cart';

export type OrderStatus = 'Placed' | 'Packed' | 'Shipped' | 'Out for delivery' | 'Delivered';

export type OrderStage = {
  description: string;
  label: string;
  shortLabel: string;
  status: OrderStatus;
};

/**
 * The five stages every order moves through. There is no backend yet, so an
 * order advances automatically with time (demo timeline): it is packed a few
 * minutes after being placed, shipped within the hour, out for delivery a
 * couple of hours later, and delivered after 3 hours — so the full journey
 * is visible in one session instead of staying stuck on "Placed".
 */
export const ORDER_STAGES: OrderStage[] = [
  { description: 'Your order has been confirmed.', label: 'Order placed', shortLabel: 'Placed', status: 'Placed' },
  { description: 'Your items are being packed.', label: 'Packed', shortLabel: 'Packed', status: 'Packed' },
  { description: 'Your order has left the warehouse.', label: 'Shipped', shortLabel: 'Shipped', status: 'Shipped' },
  { description: 'Your order is on its way to you.', label: 'Out for delivery', shortLabel: 'Out', status: 'Out for delivery' },
  { description: 'Your order has been delivered.', label: 'Delivered', shortLabel: 'Delivered', status: 'Delivered' },
];

// Milliseconds after the order date at which each stage is reached.
const STAGE_REACHED_AFTER_MS: Record<OrderStatus, number> = {
  Delivered: 3 * 60 * 60 * 1000,
  'Out for delivery': 60 * 60 * 1000,
  Packed: 2 * 60 * 1000,
  Placed: 0,
  Shipped: 10 * 60 * 1000,
};

export function getOrderStatus(order: Pick<Order, 'date'>, now = Date.now()): OrderStatus {
  const elapsed = now - new Date(order.date).getTime();
  let status: OrderStatus = 'Placed';
  for (const stage of ORDER_STAGES) {
    if (elapsed >= STAGE_REACHED_AFTER_MS[stage.status]) {
      status = stage.status;
    }
  }
  return status;
}

export function getStageIndex(status: OrderStatus): number {
  return ORDER_STAGES.findIndex((stage) => stage.status === status);
}

export function getStageReachedAt(order: Pick<Order, 'date'>, status: OrderStatus): Date {
  return new Date(new Date(order.date).getTime() + STAGE_REACHED_AFTER_MS[status]);
}

/** Estimated delivery: 4 days after the order was placed. */
export function getEstimatedDelivery(order: Pick<Order, 'date'>): Date {
  return new Date(new Date(order.date).getTime() + 4 * 24 * 60 * 60 * 1000);
}

export type Order = {
  address: string;
  couponCode?: string;
  date: string;
  delivery: string;
  discount?: number;
  id: string;
  items: CartItem[];
  payment: string;
  status: OrderStatus;
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

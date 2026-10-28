import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type WishlistState = {
  ids: string[];
  isWished: (productId: string) => boolean;
  toggle: (productId: string) => void;
};

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      ids: [],
      isWished: (productId) => get().ids.includes(productId),
      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
    }),
    {
      name: 'rn-e-com-wishlist',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

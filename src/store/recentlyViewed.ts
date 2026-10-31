import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type RecentlyViewedState = {
  add: (productId: string) => void;
  ids: string[];
};

export const useRecentlyViewedStore = create<RecentlyViewedState>()(
  persist(
    (set) => ({
      add: (productId) =>
        set((state) => ({
          ids: [productId, ...state.ids.filter((id) => id !== productId)].slice(0, 8),
        })),
      ids: [],
    }),
    {
      name: 'rn-e-com-recently-viewed',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

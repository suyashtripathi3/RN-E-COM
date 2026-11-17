import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type SearchHistoryState = {
  add: (query: string) => void;
  clear: () => void;
  queries: string[];
  remove: (query: string) => void;
};

const MAX_HISTORY = 8;

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      add: (query) => {
        const trimmed = query.trim();
        if (trimmed === '') return;
        set((state) => ({
          queries: [
            trimmed,
            ...state.queries.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
          ].slice(0, MAX_HISTORY),
        }));
      },
      clear: () => set({ queries: [] }),
      queries: [],
      remove: (query) =>
        set((state) => ({
          queries: state.queries.filter((item) => item.toLowerCase() !== query.toLowerCase()),
        })),
    }),
    {
      name: 'rn-e-com-search-history',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

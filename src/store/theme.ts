import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { darkColors, lightColors, type Palette } from '@/theme';

type ThemeMode = 'dark' | 'light';

type ThemeState = {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggle: () => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mode: 'light',
      setMode: (mode) => set({ mode }),
      toggle: () => set((state) => ({ mode: state.mode === 'dark' ? 'light' : 'dark' })),
    }),
    {
      name: 'rn-e-com-theme',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export function useThemeColors(): Palette {
  const mode = useThemeStore((state) => state.mode);
  return mode === 'dark' ? darkColors : lightColors;
}

export function useIsDark(): boolean {
  return useThemeStore((state) => state.mode === 'dark');
}

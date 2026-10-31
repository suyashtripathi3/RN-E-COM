export const lightColors = {
  background: '#F8FAFC',
  border: '#E2E8F0',
  card: '#FFFFFF',
  danger: '#DC2626',
  dangerSoft: '#FEE2E2',
  muted: '#64748B',
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  primarySoft: '#EEF2FF',
  rating: '#F59E0B',
  success: '#16A34A',
  successSoft: '#DCFCE7',
  text: '#0F172A',
};

export const darkColors = {
  background: '#0F172A',
  border: '#334155',
  card: '#1E293B',
  danger: '#F87171',
  dangerSoft: '#450A0A',
  muted: '#94A3B8',
  primary: '#818CF8',
  primaryDark: '#6366F1',
  primarySoft: '#312E81',
  rating: '#FBBF24',
  success: '#34D399',
  successSoft: '#14532D',
  text: '#F1F5F9',
};

export type Palette = typeof lightColors;

// Kept for any static (non-themed) usage; themed components should use
// useThemeColors() from '@/store/theme' instead so they re-render on toggle.
export const colors = lightColors;

export const spacing = {
  lg: 16,
  md: 12,
  sm: 8,
  xl: 24,
  xs: 4,
  xxl: 32,
};

export const radius = {
  lg: 16,
  md: 12,
  pill: 999,
  sm: 8,
  xl: 20,
};

export const shadows = {
  card: {
    elevation: 3,
    shadowColor: '#0F172A',
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  tabBar: {
    elevation: 8,
    shadowColor: '#0F172A',
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
  },
};

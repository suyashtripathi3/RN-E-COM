import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useIsDark } from '@/store/theme';

export default function RootLayout() {
  const isDark = useIsDark();
  return (
    <>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="product/[id]" />
        <Stack.Screen name="checkout" />
        <Stack.Screen name="order-success" />
      </Stack>
    </>
  );
}

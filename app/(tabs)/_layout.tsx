import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { cartCount, useCartStore } from '@/store/cart';
import { colors } from '@/theme';

export default function TabsLayout() {
  const items = useCartStore((state) => state.items);
  const count = cartCount(items);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: { paddingBottom: 6, height: 60 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={typeof color === 'string' ? color : colors.primary} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarBadge: count > 0 ? count : undefined,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" color={typeof color === 'string' ? color : colors.primary} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="wishlist"
        options={{
          title: 'Wishlist',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart-outline" color={typeof color === 'string' ? color : colors.primary} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={typeof color === 'string' ? color : colors.primary} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}

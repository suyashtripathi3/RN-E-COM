import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cartCount, useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { radius, shadows, spacing } from '@/theme';
import { useThemeColors } from '@/store/theme';

type IconName = 'home' | 'home-outline' | 'cart' | 'cart-outline' | 'heart' | 'heart-outline' | 'person' | 'person-outline';

const icons: Record<string, { active: IconName; inactive: IconName }> = {
  cart: { active: 'cart', inactive: 'cart-outline' },
  index: { active: 'home', inactive: 'home-outline' },
  profile: { active: 'person', inactive: 'person-outline' },
  wishlist: { active: 'heart', inactive: 'heart-outline' },
};

// Expo Router passes { state, descriptors, emitter, navigateToTab, insets } to a
// custom tabBar. The prop type varies by router version, so this component
// takes them loosely and reads only what it needs.
export default function TabBar({ descriptors, emitter, navigateToTab, state }: any) {
  const colors = useThemeColors();
  const styles = StyleSheet.create({
  badge: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    borderColor: '#fff',
    borderRadius: 9,
    borderWidth: 1.5,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -6,
    top: -6,
  },
  badgeText: { color: '#fff', fontSize: 10, fontWeight: '800' },
  container: {
    alignSelf: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.xl + 8,
    borderWidth: 1,
    flexDirection: 'row',
    height: 68,
    left: spacing.lg,
    paddingHorizontal: spacing.sm,
    position: 'absolute',
    right: spacing.lg,
    ...shadows.tabBar,
  },
  iconWrap: {
    alignItems: 'center',
    borderRadius: radius.pill,
    height: 34,
    justifyContent: 'center',
    width: 52,
  },
  iconWrapActive: { backgroundColor: colors.primarySoft },
  label: { color: colors.muted, fontSize: 11, fontWeight: '600', marginTop: 2 },
  labelActive: { color: colors.primary, fontWeight: '800' },
  tab: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingVertical: 6 },
});
  const insets = useSafeAreaInsets();
  const cartItems = useCartStore((s) => s.items);
  const wishlistIds = useWishlistStore((s) => s.ids);
  const cartBadge = cartCount(cartItems);
  const wishlistBadge = wishlistIds.length;

  const badgeFor = (name: string) => {
    if (name === 'cart') return cartBadge;
    if (name === 'wishlist') return wishlistBadge;
    return 0;
  };

  return (
    <View style={[styles.container, { bottom: Math.max(insets.bottom, 12) }]}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = typeof options.title === 'string' ? options.title : route.name;
        const iconSet = icons[route.name] ?? icons.index;
        const badge = badgeFor(route.name);

        const onPress = () => {
          const event = emitter.emit({ canPreventDefault: true, target: route.key, type: 'tabPress' });
          if (!isFocused && !event.defaultPrevented) {
            navigateToTab(route.key);
          }
        };

        const onLongPress = () => {
          emitter.emit({ target: route.key, type: 'tabLongPress' });
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <View style={[styles.iconWrap, isFocused && styles.iconWrapActive]}>
              <Ionicons
                name={isFocused ? iconSet.active : iconSet.inactive}
                size={22}
                color={isFocused ? colors.primary : colors.muted}
              />
              {badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge > 99 ? '99+' : String(badge)}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isFocused && styles.labelActive]}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

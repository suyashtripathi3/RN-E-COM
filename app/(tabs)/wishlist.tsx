import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

// Day 6: wishlist with heart toggle.
export default function WishlistScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>Coming in Day 6 — save products you love.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, padding: spacing.lg },
  subtitle: { color: colors.muted, marginTop: 8 },
  title: { fontSize: 24, fontWeight: '800' },
});

import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useWishlistStore } from '@/store/wishlist';
import { colors, spacing } from '@/theme';

export default function WishlistScreen() {
  const ids = useWishlistStore((state) => state.ids);
  const wished = products.filter((p) => ids.includes(p.id));

  if (wished.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>No favourites yet</Text>
        <Text style={styles.emptySubtitle}>Tap the heart on any product to save it here.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryButtonText}>Browse products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wishlist</Text>
      <Text style={styles.subtitle}>
        {wished.length} {wished.length === 1 ? 'product' : 'products'} saved
      </Text>
      <FlatList
        data={wished}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={(selected) => router.push(`/product/${selected.id}`)} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, paddingTop: 56 },
  empty: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptySubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '800' },
  list: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  row: { gap: spacing.md, justifyContent: 'space-between' },
  subtitle: { color: colors.muted, fontSize: 14, marginHorizontal: spacing.lg, marginTop: 4 },
  title: { fontSize: 24, fontWeight: '800', marginHorizontal: spacing.lg },
});

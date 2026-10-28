import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPrice, type Product } from '@/data/products';
import { useWishlistStore } from '@/store/wishlist';
import { colors, radius, spacing } from '@/theme';

type Props = {
  onPress?: (product: Product) => void;
  product: Product;
};

export default function ProductCard({ onPress, product }: Props) {
  const wished = useWishlistStore((state) => state.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)} activeOpacity={0.85}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <TouchableOpacity
        style={[styles.heart, wished && styles.heartActive]}
        onPress={() => toggleWishlist(product.id)}
        hitSlop={8}
      >
        <Text style={[styles.heartText, wished && styles.heartTextActive]}>{wished ? '♥' : '♡'}</Text>
      </TouchableOpacity>
      <View style={styles.body}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.rating}>
          ★ {product.rating} ({product.reviews})
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  body: { padding: spacing.md },
  card: { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, flex: 1, marginTop: spacing.md, overflow: 'hidden' },
  category: { color: colors.muted, fontSize: 11, fontWeight: '600', textTransform: 'uppercase' },
  heart: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    width: 36,
    zIndex: 1,
  },
  heartActive: { backgroundColor: '#FEE2E2' },
  heartText: { color: colors.muted, fontSize: 20, lineHeight: 22 },
  heartTextActive: { color: '#DC2626' },
  image: { aspectRatio: 1, width: '100%' },
  name: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  price: { color: colors.primary, fontSize: 16, fontWeight: '800', marginTop: 6 },
  rating: { color: colors.rating, fontSize: 12, fontWeight: '600', marginTop: 4 },
});

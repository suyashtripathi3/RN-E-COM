import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPrice, type Product } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { colors, radius, shadows, spacing } from '@/theme';

type Props = {
  onPress?: (product: Product) => void;
  product: Product;
};

export default function ProductCard({ onPress, product }: Props) {
  const wished = useWishlistStore((state) => state.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const addToCart = useCartStore((state) => state.add);
  const [added, setAdded] = useState(false);

  const handleQuickAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)} activeOpacity={0.88}>
      <View style={styles.imageWrap}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingBadgeText}>★ {product.rating}</Text>
        </View>
        <TouchableOpacity
          style={[styles.heart, wished && styles.heartActive]}
          onPress={() => toggleWishlist(product.id)}
          hitSlop={8}
        >
          <Text style={[styles.heartText, wished && styles.heartTextActive]}>{wished ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.body}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.reviews}>{product.reviews} reviews</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{formatPrice(product.price)}</Text>
          <TouchableOpacity
            style={[styles.addButton, added && styles.addButtonAdded]}
            onPress={handleQuickAdd}
            hitSlop={6}
          >
            <Text style={styles.addButtonText}>{added ? '✓' : '+'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  addButtonAdded: { backgroundColor: colors.success },
  addButtonText: { color: '#fff', fontSize: 18, fontWeight: '800', lineHeight: 20 },
  body: { padding: spacing.md },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.xl,
    borderWidth: 1,
    flex: 1,
    marginTop: spacing.md,
    overflow: 'hidden',
    ...shadows.card,
  },
  category: { color: colors.muted, fontSize: 11, fontWeight: '700', letterSpacing: 0.5, textTransform: 'uppercase' },
  footer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  heart: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    position: 'absolute',
    right: spacing.sm,
    top: spacing.sm,
    width: 36,
  },
  heartActive: { backgroundColor: colors.dangerSoft },
  heartText: { color: colors.muted, fontSize: 20, lineHeight: 22 },
  heartTextActive: { color: colors.danger },
  image: { aspectRatio: 1, width: '100%' },
  imageWrap: { position: 'relative' },
  name: { fontSize: 14, fontWeight: '700', marginTop: 4, minHeight: 36 },
  price: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  ratingBadge: {
    backgroundColor: 'rgba(15,23,42,0.85)',
    borderRadius: radius.pill,
    bottom: spacing.sm,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    position: 'absolute',
  },
  ratingBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  reviews: { color: colors.muted, fontSize: 12, fontWeight: '600', marginTop: 2 },
});

import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { discountPercent, formatPrice, type Product } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { useWishlistStore } from '@/store/wishlist';
import { colors, radius, shadows, spacing } from '@/theme';

type Props = {
  index?: number;
  onPress?: (product: Product) => void;
  product: Product;
};

export default function ProductCard({ index = 0, onPress, product }: Props) {
  const wished = useWishlistStore((state) => state.ids.includes(product.id));
  const toggleWishlist = useWishlistStore((state) => state.toggle);
  const addToCart = useCartStore((state) => state.add);
  const [added, setAdded] = useState(false);

  const fade = useRef(new Animated.Value(0)).current;
  const slide = useRef(new Animated.Value(16)).current;
  const heartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fade, { delay: Math.min(index, 8) * 60, duration: 400, toValue: 1, useNativeDriver: true }),
      Animated.timing(slide, { delay: Math.min(index, 8) * 60, duration: 400, toValue: 0, useNativeDriver: true }),
    ]).start();
  }, [fade, index, slide]);

  const handleQuickAdd = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    Animated.sequence([
      Animated.spring(heartScale, { friction: 4, toValue: 1.35, useNativeDriver: true }),
      Animated.spring(heartScale, { friction: 5, toValue: 1, useNativeDriver: true }),
    ]).start();
  };

  const discount = discountPercent(product);

  return (
    <Animated.View style={[styles.animated, { opacity: fade, transform: [{ translateY: slide }] }]}>
      <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)} activeOpacity={0.88}>
        <View style={styles.imageWrap}>
          <Image source={{ uri: product.image }} style={styles.image} />
          {discount > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountBadgeText}>-{discount}%</Text>
            </View>
          )}
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingBadgeText}>★ {product.rating}</Text>
          </View>
          <Animated.View style={[styles.heartWrap, { transform: [{ scale: heartScale }] }]}>
            <TouchableOpacity
              style={[styles.heart, wished && styles.heartActive]}
              onPress={handleWishlist}
              hitSlop={8}
            >
              <Text style={[styles.heartText, wished && styles.heartTextActive]}>{wished ? '♥' : '♡'}</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <View style={styles.body}>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.name} numberOfLines={2}>
            {product.name}
          </Text>
          <Text style={styles.reviews}>{product.reviews} reviews</Text>
          <View style={styles.footer}>
            <View>
              <Text style={styles.price}>{formatPrice(product.price)}</Text>
              {product.originalPrice && (
                <Text style={styles.originalPrice}>{formatPrice(product.originalPrice)}</Text>
              )}
            </View>
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
    </Animated.View>
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
  animated: { flex: 1 },
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
  discountBadge: {
    backgroundColor: colors.danger,
    borderRadius: radius.pill,
    left: spacing.sm,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    position: 'absolute',
    top: spacing.sm,
  },
  discountBadgeText: { color: '#fff', fontSize: 11, fontWeight: '800' },
  footer: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  heart: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  heartWrap: { position: 'absolute', right: spacing.sm, top: spacing.sm },
  heartActive: { backgroundColor: colors.dangerSoft },
  heartText: { color: colors.muted, fontSize: 20, lineHeight: 22 },
  heartTextActive: { color: colors.danger },
  image: { aspectRatio: 1, width: '100%' },
  imageWrap: { position: 'relative' },
  name: { fontSize: 14, fontWeight: '700', marginTop: 4, minHeight: 36 },
  originalPrice: { color: colors.muted, fontSize: 12, textDecorationLine: 'line-through' },
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

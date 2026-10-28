import { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import ProductCard from '@/components/ProductCard';
import { formatPrice, products } from '@/data/products';
import { useCartStore } from '@/store/cart';
import { colors, radius, spacing } from '@/theme';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const product = products.find((item) => item.id === id);
  const addToCart = useCartStore((state) => state.add);

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(undefined);
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);
  const [added, setAdded] = useState(false);

  // Reset selections when navigating between products.
  useEffect(() => {
    setQuantity(1);
    setSelectedColor(undefined);
    setSelectedSize(undefined);
    setAdded(false);
  }, [id]);

  if (!product) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundTitle}>Product not found</Text>
        <Text style={styles.notFoundSubtitle}>This product may have been removed.</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>‹ Back to shop</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const related = products.filter((item) => item.category === product.category && item.id !== product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <TouchableOpacity style={styles.backLink} onPress={() => router.back()}>
        <Text style={styles.backLinkText}>‹ Back</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.image} />

      <View style={styles.body}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.rating}>
          ★ {product.rating} · {product.reviews} reviews
        </Text>
        <Text style={styles.price}>{formatPrice(product.price)}</Text>

        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{product.description}</Text>

        {product.colors && product.colors.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Colour{selectedColor ? ` — ${selectedColor}` : ''}</Text>
            <View style={styles.optionsRow}>
              {product.colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.option, selectedColor === color && styles.optionActive]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text style={[styles.optionText, selectedColor === color && styles.optionTextActive]}>
                    {color}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        {product.sizes && product.sizes.length > 0 && (
          <>
            <Text style={styles.sectionTitle}>Size{selectedSize ? ` — ${selectedSize}` : ''}</Text>
            <View style={styles.optionsRow}>
              {product.sizes.map((size) => (
                <TouchableOpacity
                  key={size}
                  style={[styles.option, selectedSize === size && styles.optionActive]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text style={[styles.optionText, selectedSize === size && styles.optionTextActive]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}

        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
            onPress={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityValue}>{quantity}</Text>
          <TouchableOpacity
            style={[styles.quantityButton, quantity >= 10 && styles.quantityButtonDisabled]}
            onPress={() => setQuantity((q) => Math.min(10, q + 1))}
            disabled={quantity >= 10}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <Text style={styles.totalText}>Total: {formatPrice(product.price * quantity)}</Text>
        </View>

        <TouchableOpacity
          style={[styles.addButton, added && styles.addButtonAdded]}
          onPress={handleAddToCart}
        >
          <Text style={styles.addButtonText}>
            {added ? '✓ Added to cart' : `Add to cart · ${formatPrice(product.price * quantity)}`}
          </Text>
        </TouchableOpacity>

        {related.length > 0 && (
          <>
            <Text style={styles.relatedTitle}>Related products</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.relatedList}>
              {related.map((item) => (
                <View key={item.id} style={styles.relatedCard}>
                  <ProductCard
                    product={item}
                    onPress={(selected) => router.push(`/product/${selected.id}`)}
                  />
                </View>
              ))}
            </ScrollView>
          </>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  addButtonAdded: { backgroundColor: colors.success },
  addButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  backButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  backButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  backLink: { paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  backLinkText: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  body: { padding: spacing.lg, paddingTop: spacing.md },
  category: { color: colors.muted, fontSize: 12, fontWeight: '600', textTransform: 'uppercase' },
  container: { backgroundColor: colors.background, flex: 1 },
  description: { color: colors.text, fontSize: 15, lineHeight: 22, marginTop: spacing.sm },
  image: { aspectRatio: 1, width: '100%' },
  name: { fontSize: 24, fontWeight: '800', marginTop: 4 },
  notFound: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  notFoundSubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  notFoundTitle: { fontSize: 18, fontWeight: '700' },
  option: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  optionTextActive: { color: '#fff' },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  price: { color: colors.primary, fontSize: 24, fontWeight: '800', marginTop: spacing.sm },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  quantityButtonDisabled: { opacity: 0.4 },
  quantityButtonText: { color: colors.text, fontSize: 20, fontWeight: '700' },
  quantityRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  quantityValue: { fontSize: 17, fontWeight: '700', minWidth: 24, textAlign: 'center' },
  rating: { color: colors.rating, fontSize: 14, fontWeight: '600', marginTop: spacing.sm },
  relatedCard: { width: 170 },
  relatedList: { gap: spacing.md, paddingBottom: spacing.xl },
  relatedTitle: { fontSize: 18, fontWeight: '700', marginTop: spacing.xl },
  sectionTitle: { fontSize: 15, fontWeight: '700', marginTop: spacing.lg },
  totalText: { color: colors.muted, fontSize: 14, fontWeight: '600', marginLeft: spacing.sm },
});

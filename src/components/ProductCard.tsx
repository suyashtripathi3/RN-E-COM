import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { formatPrice, type Product } from '@/data/products';
import { colors, radius, spacing } from '@/theme';

type Props = {
  onPress?: (product: Product) => void;
  product: Product;
};

export default function ProductCard({ onPress, product }: Props) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress?.(product)} activeOpacity={0.85}>
      <Image source={{ uri: product.image }} style={styles.image} />
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
  image: { aspectRatio: 1, width: '100%' },
  name: { fontSize: 14, fontWeight: '700', marginTop: 4 },
  price: { color: colors.primary, fontSize: 16, fontWeight: '800', marginTop: 6 },
  rating: { color: colors.rating, fontSize: 12, fontWeight: '600', marginTop: 4 },
});

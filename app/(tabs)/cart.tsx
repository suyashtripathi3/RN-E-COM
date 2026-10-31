import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { formatPrice } from '@/data/products';
import { cartCount, cartSubtotal, deliveryFee, useCartStore } from '@/store/cart';
import { colors, radius, spacing } from '@/theme';

export default function CartScreen() {
  const items = useCartStore((state) => state.items);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const removeItem = useCartStore((state) => state.remove);
  const clearCart = useCartStore((state) => state.clear);

  const subtotal = cartSubtotal(items);
  const fee = deliveryFee(subtotal);
  const total = subtotal + fee;
  const count = cartCount(items);

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>Add some products and they will show up here.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryButtonText}>Browse products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your cart</Text>
        <Text style={styles.subtitle}>
          {count} {count === 1 ? 'item' : 'items'}
        </Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={styles.clearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.product.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Image source={{ uri: item.product.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={2}>
                {item.product.name}
              </Text>
              <Text style={styles.price}>{formatPrice(item.product.price)}</Text>
              <View style={styles.qtyRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => setQuantity(item.product.id, item.quantity - 1)}
                >
                  <Text style={styles.qtyButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyValue}>{item.quantity}</Text>
                <TouchableOpacity
                  style={[styles.qtyButton, item.quantity >= 10 && styles.qtyButtonDisabled]}
                  onPress={() => setQuantity(item.product.id, item.quantity + 1)}
                  disabled={item.quantity >= 10}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeItem(item.product.id)}>
                  <Text style={styles.removeText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
            <Text style={styles.lineTotal}>{formatPrice(item.product.price * item.quantity)}</Text>
          </View>
        )}
      />

      <View style={styles.summary}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery {fee === 0 ? '(Free)' : ''}</Text>
          <Text style={styles.summaryValue}>{fee === 0 ? 'Free' : formatPrice(fee)}</Text>
        </View>
        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.min(100, Math.round((subtotal / 999) * 100))}%` }]} />
          </View>
          <Text style={styles.freeNote}>
            {subtotal >= 999
              ? 'You have unlocked FREE delivery.'
              : `${formatPrice(999 - subtotal)} away from FREE delivery`}
          </Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => router.push({ pathname: '/checkout' })}>
          <Text style={styles.checkoutButtonText}>Proceed to checkout · {formatPrice(total)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.md,
    paddingVertical: spacing.md,
  },
  checkoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  clearText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
  container: { backgroundColor: colors.background, flex: 1 },
  empty: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptySubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  emptyTitle: { fontSize: 20, fontWeight: '800' },
  freeNote: { color: colors.muted, fontSize: 12, marginTop: spacing.sm },
  progressFill: { backgroundColor: colors.success, borderRadius: 4, height: 8 },
  progressTrack: { backgroundColor: colors.border, borderRadius: 4, height: 8, marginTop: spacing.md, overflow: 'hidden' },
  progressWrap: { marginTop: spacing.sm },
  header: { flexDirection: 'row', alignItems: 'baseline', gap: spacing.sm, paddingHorizontal: spacing.lg, paddingTop: 56 },
  image: { borderRadius: radius.md, height: 72, width: 72 },
  info: { flex: 1 },
  lineTotal: { fontSize: 15, fontWeight: '800' },
  list: { padding: spacing.lg, paddingBottom: spacing.md },
  name: { fontSize: 15, fontWeight: '700' },
  price: { color: colors.primary, fontSize: 14, fontWeight: '700', marginTop: 2 },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  qtyButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  qtyButtonDisabled: { opacity: 0.4 },
  qtyButtonText: { fontSize: 18, fontWeight: '700' },
  qtyRow: { alignItems: 'center', flexDirection: 'row', gap: spacing.sm, marginTop: spacing.sm },
  qtyValue: { fontSize: 15, fontWeight: '700', minWidth: 20, textAlign: 'center' },
  removeText: { color: colors.muted, fontSize: 13, fontWeight: '600', marginLeft: spacing.sm },
  row: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  subtitle: { color: colors.muted, fontSize: 14, flex: 1 },
  summary: {
    backgroundColor: colors.card,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    padding: spacing.lg,
    paddingBottom: 104,
  },
  summaryLabel: { color: colors.muted, fontSize: 14 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  summaryValue: { fontSize: 14, fontWeight: '700' },
  title: { fontSize: 24, fontWeight: '800' },
  totalLabel: { fontSize: 16, fontWeight: '800' },
  totalRow: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  totalValue: { color: colors.primary, fontSize: 18, fontWeight: '800' },
});

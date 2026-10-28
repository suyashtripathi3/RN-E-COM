import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { formatPrice } from '@/data/products';
import { useOrdersStore } from '@/store/orders';
import { colors, radius, spacing } from '@/theme';

export default function OrderSuccessScreen() {
  const { orderId } = useLocalSearchParams<{ orderId: string }>();
  const order = useOrdersStore((state) => state.orders.find((o) => o.id === orderId));

  const deliveryDate = new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    weekday: 'long',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.check}>✓</Text>
      <Text style={styles.title}>Order placed!</Text>
      <Text style={styles.subtitle}>Thank you — your order is confirmed.</Text>

      {order ? (
        <View style={styles.card}>
          <Text style={styles.row}>
            Order ID: <Text style={styles.bold}>{order.id}</Text>
          </Text>
          <Text style={styles.row}>
            Total: <Text style={styles.bold}>{formatPrice(order.total)}</Text>
          </Text>
          <Text style={styles.row}>
            Payment: <Text style={styles.bold}>{order.payment}</Text>
          </Text>
          <Text style={styles.row}>
            Delivery: <Text style={styles.bold}>{order.delivery}</Text>
          </Text>
          <Text style={styles.row}>
            Arriving by: <Text style={styles.bold}>{deliveryDate}</Text>
          </Text>
          <Text style={styles.row}>
            Items: <Text style={styles.bold}>{order.items.reduce((n, i) => n + i.quantity, 0)}</Text>
          </Text>
        </View>
      ) : (
        <Text style={styles.subtitle}>Order {orderId ?? ''} was placed. You can see it in My Orders.</Text>
      )}

      <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)/profile')}>
        <Text style={styles.primaryButtonText}>View my orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(tabs)')}>
        <Text style={styles.secondaryButtonText}>Continue shopping</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  bold: { fontWeight: '800' },
  card: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginTop: spacing.lg,
    padding: spacing.lg,
    width: '100%',
  },
  check: {
    alignSelf: 'center',
    backgroundColor: colors.success,
    borderRadius: 40,
    color: '#fff',
    fontSize: 36,
    fontWeight: '800',
    height: 80,
    lineHeight: 76,
    textAlign: 'center',
    width: 80,
  },
  container: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', padding: spacing.xl },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    width: '100%',
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  row: { color: colors.muted, fontSize: 15, marginTop: spacing.sm },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    width: '100%',
  },
  secondaryButtonText: { color: colors.text, fontSize: 15, fontWeight: '700' },
  subtitle: { color: colors.muted, fontSize: 15, marginTop: spacing.sm, textAlign: 'center' },
  title: { fontSize: 24, fontWeight: '800', marginTop: spacing.lg },
});

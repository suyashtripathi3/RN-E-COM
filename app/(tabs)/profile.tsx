import { useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { formatPrice } from '@/data/products';
import { useOrdersStore } from '@/store/orders';
import { colors, radius, spacing } from '@/theme';

export default function ProfileScreen() {
  const orders = useOrdersStore((state) => state.orders);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>ST</Text>
        </View>
        <View>
          <Text style={styles.name}>Suyash Tripathi</Text>
          <Text style={styles.email}>suyashtripathi3 · GitHub</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>My Orders</Text>
      {orders.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No orders yet</Text>
          <Text style={styles.emptySubtitle}>Your orders will show up here after checkout.</Text>
          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
            <Text style={styles.primaryButtonText}>Start shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{item.id}</Text>
                <Text style={styles.status}>{item.status}</Text>
              </View>
              <Text style={styles.orderMeta}>
                {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                {' · '}
                {item.items.reduce((n, i) => n + i.quantity, 0)} items · {item.payment}
              </Text>
              <Text style={styles.orderMeta} numberOfLines={2}>
                {item.items.map((i) => i.product.name).join(', ')}
              </Text>
              <Text style={styles.orderTotal}>{formatPrice(item.total)}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  avatarText: { color: '#fff', fontSize: 18, fontWeight: '800' },
  container: { backgroundColor: colors.background, flex: 1, paddingTop: 56 },
  email: { color: colors.muted, fontSize: 13, marginTop: 2 },
  empty: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptySubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  emptyTitle: { fontSize: 18, fontWeight: '700' },
  header: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg },
  list: { padding: spacing.lg },
  name: { fontSize: 20, fontWeight: '800' },
  orderCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.lg,
    borderWidth: 1,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  orderId: { fontSize: 15, fontWeight: '800' },
  orderMeta: { color: colors.muted, fontSize: 13, marginTop: spacing.sm },
  orderTotal: { color: colors.primary, fontSize: 16, fontWeight: '800', marginTop: spacing.sm },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: spacing.lg, marginTop: spacing.xl },
  status: { color: colors.success, fontSize: 13, fontWeight: '700' },
});

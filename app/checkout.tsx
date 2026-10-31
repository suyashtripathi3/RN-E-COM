import { useMemo, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { formatPrice } from '@/data/products';
import { cartSubtotal, deliveryFee, useCartStore } from '@/store/cart';
import { useOrdersStore } from '@/store/orders';
import { radius, spacing } from '@/theme';
import { useThemeColors } from '@/store/theme';

const deliveryOptions = [
  { id: 'standard', label: 'Standard delivery · 3–5 days', price: 0 },
  { id: 'express', label: 'Express delivery · 1–2 days', price: 99 },
];

const paymentOptions = ['UPI', 'Card', 'Cash on delivery'];

export default function CheckoutScreen() {
  const colors = useThemeColors();
  const styles = StyleSheet.create({
  backLink: { color: colors.primary, fontSize: 15, fontWeight: '700' },
  container: { backgroundColor: colors.background, flex: 1 },
  content: { padding: spacing.lg, paddingBottom: spacing.xl, paddingTop: 56 },
  empty: { alignItems: 'center', backgroundColor: colors.background, flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptySubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm },
  emptyTitle: { color: colors.text, fontSize: 20, fontWeight: '800' },
  half: { flex: 1 },
  input: {
    backgroundColor: colors.card,
    color: colors.text,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    fontSize: 15,
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  mockNote: { color: colors.muted, fontSize: 12, marginTop: spacing.sm },
  option: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    padding: spacing.md,
  },
  optionActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  optionText: { color: colors.text, fontSize: 14, fontWeight: '600' },
  optionTextActive: { color: '#fff' },
  optionsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginTop: spacing.sm },
  placeButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
  },
  placeButtonText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  primaryButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  row: { flexDirection: 'row', gap: spacing.sm },
  sectionTitle: { color: colors.text, fontSize: 16, fontWeight: '800', marginTop: spacing.lg },
  summary: { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, marginTop: spacing.sm, padding: spacing.md },
  summaryLabel: { color: colors.muted, fontSize: 14, flex: 1 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: spacing.sm },
  summaryValue: { color: colors.text, fontSize: 14, fontWeight: '700' },
  title: { color: colors.text, fontSize: 24, fontWeight: '800', marginTop: spacing.sm },
  totalLabel: { color: colors.text, fontSize: 16, fontWeight: '800' },
  totalRow: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
  totalValue: { color: colors.primary, fontSize: 18, fontWeight: '800' },
});
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clear);
  const addOrder = useOrdersStore((state) => state.addOrder);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [delivery, setDelivery] = useState('standard');
  const [payment, setPayment] = useState('UPI');
  const [placing, setPlacing] = useState(false);

  const subtotal = cartSubtotal(items);
  const baseFee = deliveryFee(subtotal);
  const deliveryPrice = delivery === 'express' ? 99 : baseFee;
  const total = subtotal + deliveryPrice;

  const deliveryLabel = useMemo(
    () => deliveryOptions.find((o) => o.id === delivery)?.label ?? 'Standard delivery',
    [delivery],
  );

  if (items.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyTitle}>Nothing to check out</Text>
        <Text style={styles.emptySubtitle}>Your cart is empty.</Text>
        <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(tabs)')}>
          <Text style={styles.primaryButtonText}>Browse products</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const placeOrder = () => {
    if (!name.trim() || !phone.trim() || !address.trim() || !city.trim() || !pincode.trim()) {
      Alert.alert('Missing details', 'Please fill in your name, phone, address, city and pincode.');
      return;
    }
    if (phone.replace(/\D/g, '').length < 10) {
      Alert.alert('Invalid phone', 'Please enter a valid 10-digit phone number.');
      return;
    }
    if (pincode.replace(/\D/g, '').length !== 6) {
      Alert.alert('Invalid pincode', 'Please enter a valid 6-digit pincode.');
      return;
    }
    setPlacing(true);
    const order = addOrder({
      address: `${name.trim()}, ${address.trim()}, ${city.trim()} — ${pincode.trim()}, Phone: ${phone.trim()}`,
      delivery: deliveryLabel,
      items,
      payment,
      total,
    });
    clearCart();
    setPlacing(false);
    router.replace({ pathname: '/order-success', params: { orderId: order.id } });
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <TouchableOpacity onPress={() => router.back()}>
        <Text style={styles.backLink}>‹ Back to cart</Text>
      </TouchableOpacity>
      <Text style={styles.title}>Checkout</Text>

      <Text style={styles.sectionTitle}>Delivery address</Text>
      <TextInput style={styles.input} placeholder="Full name" value={name} onChangeText={setName} />
      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phone}
        onChangeText={setPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Flat, street, landmark"
        value={address}
        onChangeText={setAddress}
        multiline
      />
      <View style={styles.row}>
        <TextInput style={[styles.input, styles.half]} placeholder="City" value={city} onChangeText={setCity} />
        <TextInput
          style={[styles.input, styles.half]}
          placeholder="Pincode"
          value={pincode}
          onChangeText={setPincode}
          keyboardType="number-pad"
          maxLength={6}
        />
      </View>

      <Text style={styles.sectionTitle}>Delivery option</Text>
      {deliveryOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, delivery === option.id && styles.optionActive]}
          onPress={() => setDelivery(option.id)}
        >
          <Text style={[styles.optionText, delivery === option.id && styles.optionTextActive]}>{option.label}</Text>
          <Text style={[styles.optionText, delivery === option.id && styles.optionTextActive]}>
            {option.id === 'express' ? formatPrice(99) : baseFee === 0 ? 'Free' : formatPrice(baseFee)}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.sectionTitle}>Payment method</Text>
      <View style={styles.optionsRow}>
        {paymentOptions.map((method) => (
          <TouchableOpacity
            key={method}
            style={[styles.option, payment === method && styles.optionActive]}
            onPress={() => setPayment(method)}
          >
            <Text style={[styles.optionText, payment === method && styles.optionTextActive]}>{method}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.mockNote}>This is a demo checkout — no real payment is taken.</Text>

      <Text style={styles.sectionTitle}>Order summary</Text>
      <View style={styles.summary}>
        {items.map((item) => (
          <View key={item.product.id} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {item.product.name} × {item.quantity}
            </Text>
            <Text style={styles.summaryValue}>{formatPrice(item.product.price * item.quantity)}</Text>
          </View>
        ))}
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>{formatPrice(subtotal)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Delivery</Text>
          <Text style={styles.summaryValue}>{deliveryPrice === 0 ? 'Free' : formatPrice(deliveryPrice)}</Text>
        </View>
        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>{formatPrice(total)}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.placeButton} onPress={placeOrder} disabled={placing}>
        <Text style={styles.placeButtonText}>{placing ? 'Placing order…' : `Place order · ${formatPrice(total)}`}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

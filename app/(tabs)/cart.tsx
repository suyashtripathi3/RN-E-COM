import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

// Day 4: full cart — add/remove, quantity, totals, AsyncStorage persistence.
export default function CartScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your cart</Text>
      <Text style={styles.subtitle}>Coming in Day 4 — cart, totals and saved items.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, padding: spacing.lg },
  subtitle: { color: colors.muted, marginTop: 8 },
  title: { fontSize: 24, fontWeight: '800' },
});

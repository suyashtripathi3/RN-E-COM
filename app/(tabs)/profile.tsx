import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

// Day 6: profile + My Orders.
export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Coming in Day 6 — orders, settings and profile.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1, padding: spacing.lg },
  subtitle: { color: colors.muted, marginTop: 8 },
  title: { fontSize: 24, fontWeight: '800' },
});

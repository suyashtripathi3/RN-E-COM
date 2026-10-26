import { FlatList, StyleSheet, Text, View } from 'react-native';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { colors, spacing } from '@/theme';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Header title="RN-E-COM" subtitle="Shop smart, live better" />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>New season, new picks</Text>
        <Text style={styles.heroSubtitle}>Up to 40% off on top products this week.</Text>
      </View>
      <Text style={styles.sectionTitle}>Featured products</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => <ProductCard product={item} />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.background, flex: 1 },
  hero: { backgroundColor: colors.primary, borderRadius: 16, marginHorizontal: spacing.lg, marginTop: spacing.md, padding: spacing.lg },
  heroSubtitle: { color: '#E0E7FF', fontSize: 14, marginTop: 4 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  list: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg },
  row: { gap: spacing.md, justifyContent: 'space-between' },
  sectionTitle: { fontSize: 18, fontWeight: '700', marginHorizontal: spacing.lg, marginTop: spacing.lg },
});

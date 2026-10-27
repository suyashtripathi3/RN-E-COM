import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/data/products';
import { colors, radius, spacing } from '@/theme';

type SortKey = 'popular' | 'priceAsc' | 'priceDesc';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'priceAsc', label: 'Price: Low to High' },
  { key: 'priceDesc', label: 'Price: High to Low' },
];

export default function HomeScreen() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortKey>('popular');

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const filtered = products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        (needle === '' || product.name.toLowerCase().includes(needle)),
    );
    return [...filtered].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      // Popularity: highest rating first, reviews as the tiebreak.
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [query, category, sort]);

  const hasActiveFilters = query.trim() !== '' || category !== 'All' || sort !== 'popular';

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('popular');
  };

  return (
    <View style={styles.container}>
      <Header title="RN-E-COM" subtitle="Shop smart, live better" />
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>New season, new picks</Text>
        <Text style={styles.heroSubtitle}>Up to 40% off on top products this week.</Text>
      </View>

      <TextInput
        style={styles.search}
        placeholder="Search products…"
        placeholderTextColor={colors.muted}
        value={query}
        onChangeText={setQuery}
        clearButtonMode="while-editing"
        returnKeyType="search"
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.chips}
      >
        {categories.map((item) => (
          <TouchableOpacity
            key={item}
            style={[styles.chip, category === item && styles.chipActive]}
            onPress={() => setCategory(item)}
          >
            <Text style={[styles.chipText, category === item && styles.chipTextActive]}>{item}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>
          {category === 'All' ? 'All products' : category}
        </Text>
        <Text style={styles.resultCount}>
          {visibleProducts.length} {visibleProducts.length === 1 ? 'product' : 'products'}
        </Text>
      </View>

      <View style={styles.sortRow}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[styles.sortButton, sort === option.key && styles.sortButtonActive]}
            onPress={() => setSort(option.key)}
          >
            <Text style={[styles.sortText, sort === option.key && styles.sortTextActive]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {visibleProducts.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No products match your search</Text>
          <Text style={styles.emptySubtitle}>Try a different search term or category.</Text>
          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FlatList
          data={visibleProducts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ProductCard product={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  chips: { gap: spacing.sm, paddingHorizontal: spacing.lg, paddingVertical: spacing.sm },
  chip: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  chipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  chipText: { color: colors.text, fontSize: 13, fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  clearButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    marginTop: spacing.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  clearButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  container: { backgroundColor: colors.background, flex: 1 },
  empty: { alignItems: 'center', flex: 1, justifyContent: 'center', paddingHorizontal: spacing.xl },
  emptySubtitle: { color: colors.muted, fontSize: 14, marginTop: spacing.sm, textAlign: 'center' },
  emptyTitle: { fontSize: 17, fontWeight: '700' },
  hero: { backgroundColor: colors.primary, borderRadius: 16, marginHorizontal: spacing.lg, marginTop: spacing.md, padding: spacing.lg },
  heroSubtitle: { color: '#E0E7FF', fontSize: 14, marginTop: 4 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800' },
  list: { paddingBottom: spacing.xl, paddingHorizontal: spacing.lg },
  listHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  resultCount: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  row: { gap: spacing.md, justifyContent: 'space-between' },
  search: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.md,
    borderWidth: 1,
    fontSize: 15,
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  sectionTitle: { fontSize: 18, fontWeight: '700' },
  sortButton: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.sm,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
  },
  sortButtonActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  sortRow: { flexDirection: 'row', gap: spacing.sm, marginHorizontal: spacing.lg, marginTop: spacing.sm },
  sortText: { color: colors.text, fontSize: 12, fontWeight: '600' },
  sortTextActive: { color: '#fff' },
});

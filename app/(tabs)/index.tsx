import { useMemo, useState } from 'react';
import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { categories, formatPrice, products } from '@/data/products';
import { useRecentlyViewedStore } from '@/store/recentlyViewed';
import { useSearchHistoryStore } from '@/store/searchHistory';
import { radius, spacing } from '@/theme';
import { useThemeColors } from '@/store/theme';

type SortKey = 'popular' | 'priceAsc' | 'priceDesc';

const sortOptions: { key: SortKey; label: string }[] = [
  { key: 'popular', label: 'Popular' },
  { key: 'priceAsc', label: 'Price: Low to High' },
  { key: 'priceDesc', label: 'Price: High to Low' },
];

type PriceBandKey = 'under1000' | '1000to1999' | '2000to2999' | '3000plus';

const priceBands: { key: PriceBandKey; label: string; max: number | null; min: number }[] = [
  { key: 'under1000', label: 'Under ₹1,000', min: 0, max: 999 },
  { key: '1000to1999', label: '₹1,000–₹1,999', min: 1000, max: 1999 },
  { key: '2000to2999', label: '₹2,000–₹2,999', min: 2000, max: 2999 },
  { key: '3000plus', label: '₹3,000+', min: 3000, max: null },
];

export default function HomeScreen() {
  const colors = useThemeColors();
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
  emptyTitle: { color: colors.text, fontSize: 17, fontWeight: '700' },
  hero: { backgroundColor: colors.primary, borderRadius: radius.xl, marginHorizontal: spacing.lg, marginTop: spacing.md, overflow: 'hidden', padding: spacing.lg },
  heroButton: { alignSelf: 'flex-start', backgroundColor: '#fff', borderRadius: radius.pill, marginTop: spacing.md, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  heroButtonText: { color: colors.primary, fontSize: 13, fontWeight: '800' },
  heroCircle: { backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: 100, height: 160, position: 'absolute', right: -40, top: -60, width: 160 },
  heroSubtitle: { color: '#E0E7FF', fontSize: 14, marginTop: 4 },
  heroTag: { color: '#C7D2FE', fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  heroTitle: { color: '#fff', fontSize: 22, fontWeight: '800', marginTop: 4 },
  historyChip: { alignItems: 'center', flexDirection: 'row', gap: 6 },
  historyClear: { color: colors.primary, fontSize: 12, fontWeight: '700' },
  historyHeader: { alignItems: 'baseline', flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: spacing.lg, marginTop: spacing.sm },
  historyRemove: { color: colors.muted, fontSize: 14, fontWeight: '700' },
  historyTitle: { color: colors.muted, fontSize: 11, fontWeight: '800', letterSpacing: 1.5 },
  list: { paddingBottom: 110, paddingHorizontal: spacing.lg },
  listHeader: {
    alignItems: 'baseline',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: spacing.lg,
    marginTop: spacing.sm,
  },
  priceRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm, marginHorizontal: spacing.lg, marginTop: spacing.sm },
  recentCard: { backgroundColor: colors.card, borderColor: colors.border, borderRadius: radius.lg, borderWidth: 1, padding: spacing.sm, width: 120 },
  recentImage: { borderRadius: radius.md, height: 80, width: '100%' },
  recentList: { gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
  recentName: { color: colors.text, fontSize: 12, fontWeight: '700', marginTop: spacing.sm },
  recentPrice: { color: colors.primary, fontSize: 12, fontWeight: '800', marginTop: 2 },
  recentSection: { marginTop: spacing.md },
  resultCount: { color: colors.muted, fontSize: 13, fontWeight: '600' },
  row: { gap: spacing.md, justifyContent: 'space-between' },
  search: { color: colors.text, flex: 1, fontSize: 15, paddingVertical: spacing.sm },
  searchIcon: { color: colors.muted, fontSize: 20, marginRight: spacing.sm },
  searchWrap: {
    alignItems: 'center',
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: 'row',
    marginHorizontal: spacing.lg,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    elevation: 2,
    shadowColor: '#0F172A',
    shadowOffset: { height: 1, width: 0 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
  },
  sectionTitle: { color: colors.text, fontSize: 18, fontWeight: '700', marginHorizontal: spacing.lg },
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
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState<SortKey>('popular');
  const [priceBand, setPriceBand] = useState<PriceBandKey | null>(null);
  const recentIds = useRecentlyViewedStore((state) => state.ids);
  const historyQueries = useSearchHistoryStore((state) => state.queries);
  const addSearchHistory = useSearchHistoryStore((state) => state.add);
  const removeSearchHistory = useSearchHistoryStore((state) => state.remove);
  const clearSearchHistory = useSearchHistoryStore((state) => state.clear);

  const visibleProducts = useMemo(() => {
    const needle = query.trim().toLowerCase();
    const band = priceBands.find((item) => item.key === priceBand);
    const filtered = products.filter(
      (product) =>
        (category === 'All' || product.category === category) &&
        (needle === '' || product.name.toLowerCase().includes(needle)) &&
        (!band || (product.price >= band.min && (band.max === null || product.price <= band.max))),
    );
    return [...filtered].sort((a, b) => {
      if (sort === 'priceAsc') return a.price - b.price;
      if (sort === 'priceDesc') return b.price - a.price;
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.reviews - a.reviews;
    });
  }, [query, category, sort, priceBand]);

  const recentProducts = useMemo(
    () =>
      recentIds
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is (typeof products)[number] => Boolean(p)),
    [recentIds],
  );

  const hasActiveFilters = query.trim() !== '' || category !== 'All' || sort !== 'popular' || priceBand !== null;

  const clearFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('popular');
    setPriceBand(null);
  };

  const header = (
    <View>
      <Header title="RN-E-COM" subtitle="Shop smart, live better" />
      <View style={styles.hero}>
        <View style={styles.heroCircle} />
        <Text style={styles.heroTag}>LIMITED OFFER</Text>
        <Text style={styles.heroTitle}>New season, new picks</Text>
        <Text style={styles.heroSubtitle}>Up to 40% off on top products this week.</Text>
        <TouchableOpacity style={styles.heroButton} onPress={clearFilters}>
          <Text style={styles.heroButtonText}>Shop now →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.searchWrap}>
        <Text style={styles.searchIcon}>⌕</Text>
        <TextInput
          style={styles.search}
          placeholder="Search products…"
          placeholderTextColor={colors.muted}
          value={query}
          onChangeText={setQuery}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          onSubmitEditing={() => addSearchHistory(query)}
          clearButtonMode="while-editing"
          returnKeyType="search"
        />
      </View>

      {historyQueries.length > 0 && (searchFocused || query.trim() === '') && (
        <View>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>RECENT SEARCHES</Text>
            <TouchableOpacity onPress={clearSearchHistory}>
              <Text style={styles.historyClear}>Clear all</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.priceRow}>
            {historyQueries.map((item) => (
              <View key={item} style={[styles.chip, styles.historyChip]}>
                <TouchableOpacity
                  onPress={() => {
                    setQuery(item);
                    addSearchHistory(item);
                  }}
                >
                  <Text style={styles.chipText}>{item}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeSearchHistory(item)} hitSlop={8}>
                  <Text style={styles.historyRemove}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chips}>
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

      {recentProducts.length > 0 && (
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recently viewed</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recentList}>
            {recentProducts.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.recentCard}
                onPress={() => router.push(`/product/${item.id}`)}
              >
                <Image source={{ uri: item.image }} style={styles.recentImage} />
                <Text style={styles.recentName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.recentPrice}>{formatPrice(item.price)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}

      <View style={styles.listHeader}>
        <Text style={styles.sectionTitle}>{category === 'All' ? 'All products' : category}</Text>
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
            <Text style={[styles.sortText, sort === option.key && styles.sortTextActive]}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.priceRow}>
        {priceBands.map((band) => (
          <TouchableOpacity
            key={band.key}
            style={[styles.sortButton, priceBand === band.key && styles.sortButtonActive]}
            onPress={() => setPriceBand(priceBand === band.key ? null : band.key)}
            accessibilityState={{ selected: priceBand === band.key }}
          >
            <Text style={[styles.sortText, priceBand === band.key && styles.sortTextActive]}>{band.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  if (visibleProducts.length === 0) {
    return (
      <View style={styles.container}>
        {header}
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>No products match your search</Text>
          <Text style={styles.emptySubtitle}>Try a different search term, category or price range.</Text>
          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
              <Text style={styles.clearButtonText}>Clear filters</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={visibleProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        ListHeaderComponent={header}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              setTimeout(() => setRefreshing(false), 700);
            }}
          />
        }
        renderItem={({ index, item }) => (
          <ProductCard index={index} product={item} onPress={(selected) => router.push(`/product/${selected.id}`)} />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

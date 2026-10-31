import { StyleSheet, Text, View } from 'react-native';
import { radius, spacing } from '@/theme';
import { useThemeColors } from '@/store/theme';

type Props = {
  subtitle?: string;
  title: string;
};

export default function Header({ subtitle, title }: Props) {
  const colors = useThemeColors();
  const styles = StyleSheet.create({
  container: { alignItems: 'center', flexDirection: 'row', gap: spacing.md, paddingHorizontal: spacing.lg, paddingTop: 56 },
  logo: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    height: 40,
    justifyContent: 'center',
    width: 40,
  },
  logoText: { color: '#fff', fontSize: 22, fontWeight: '900' },
  subtitle: { color: colors.muted, fontSize: 13, marginTop: 1 },
  text: { flex: 1 },
  title: { color: colors.text, fontSize: 26, fontWeight: '900', letterSpacing: -0.5 },
});
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Text style={styles.logoText}>R</Text>
      </View>
      <View style={styles.text}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

import { StyleSheet, Text, View } from 'react-native';
import { colors, spacing } from '@/theme';

type Props = {
  subtitle?: string;
  title: string;
};

export default function Header({ subtitle, title }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: spacing.lg, paddingTop: 56 },
  subtitle: { color: colors.muted, fontSize: 14, marginTop: 2 },
  title: { color: colors.text, fontSize: 28, fontWeight: '800' },
});

import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  getEstimatedDelivery,
  getOrderStatus,
  getStageIndex,
  getStageReachedAt,
  ORDER_STAGES,
  type Order,
} from '@/store/orders';
import { radius, spacing } from '@/theme';
import { useThemeColors } from '@/store/theme';

function formatReachedAt(date: Date): string {
  return `${date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })} · ${date.toLocaleTimeString('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  })}`;
}

export default function OrderTracker({ now, order }: { now: number; order: Order }) {
  const colors = useThemeColors();
  const styles = StyleSheet.create({
    connector: { backgroundColor: colors.border, height: 2, left: '10%', position: 'absolute', right: '10%', top: 10 },
    connectorFill: { backgroundColor: colors.success, height: 2, left: '10%', position: 'absolute', top: 10 },
    currentDot: { alignItems: 'center', backgroundColor: colors.primary, borderColor: colors.primary, justifyContent: 'center' },
    detailDot: { borderRadius: 5, height: 10, marginTop: 5, width: 10 },
    detailLine: { backgroundColor: colors.border, bottom: -spacing.sm, left: 4, position: 'absolute', top: 18, width: 2 },
    detailRow: { flexDirection: 'row', gap: spacing.md, paddingBottom: spacing.sm, position: 'relative' },
    detailText: { flex: 1 },
    detailTime: { color: colors.muted, fontSize: 12, marginTop: 2 },
    detailTitle: { color: colors.text, fontSize: 14, fontWeight: '700' },
    doneDot: { alignItems: 'center', backgroundColor: colors.success, borderColor: colors.success, justifyContent: 'center' },
    dot: { borderRadius: 11, borderWidth: 2, height: 22, width: 22 },
    dotCheck: { color: '#fff', fontSize: 12, fontWeight: '800', lineHeight: 18, textAlign: 'center' },
    dotInner: { backgroundColor: '#fff', borderRadius: 4, height: 8, width: 8 },
    eta: { color: colors.muted, fontSize: 13, marginTop: 2 },
    expandHint: { color: colors.primary, fontSize: 12, fontWeight: '700', marginTop: spacing.sm },
    headline: { color: colors.text, fontSize: 14, fontWeight: '800' },
    step: { alignItems: 'center', flex: 1 },
    stepLabel: { color: colors.muted, fontSize: 10, marginTop: 4, textAlign: 'center' },
    stepLabelCurrent: { color: colors.primary, fontWeight: '800' },
    stepLabelDone: { color: colors.text, fontWeight: '700' },
    stepper: { marginTop: spacing.md, position: 'relative' },
    stepsRow: { flexDirection: 'row' },
    timeline: { borderTopColor: colors.border, borderTopWidth: 1, marginTop: spacing.md, paddingTop: spacing.md },
    tracker: { backgroundColor: colors.primarySoft, borderRadius: radius.md, marginTop: spacing.md, padding: spacing.md },
    upcomingDot: { backgroundColor: colors.card, borderColor: colors.muted },
  });

  const [expanded, setExpanded] = useState(false);
  const status = getOrderStatus(order, now);
  const currentIdx = getStageIndex(status);
  const currentStage = ORDER_STAGES[currentIdx];
  const eta = getEstimatedDelivery(order);
  const etaText =
    status === 'Delivered'
      ? `Delivered ${eta.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
      : `Arriving by ${eta.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', weekday: 'long' })}`;

  return (
    <View style={styles.tracker}>
      <TouchableOpacity
        accessibilityRole="button"
        accessibilityState={{ expanded }}
        activeOpacity={0.8}
        onPress={() => setExpanded((value) => !value)}
      >
        <Text style={styles.headline}>
          {currentStage.label} · {status === 'Delivered' ? '🎉' : '📦'}
        </Text>
        <Text style={styles.eta}>{etaText}</Text>

        <View style={styles.stepper}>
          <View style={styles.connector} />
          <View style={[styles.connectorFill, { width: `${(currentIdx / (ORDER_STAGES.length - 1)) * 80}%` }]} />
          <View style={styles.stepsRow}>
            {ORDER_STAGES.map((stage, index) => {
              const done = index < currentIdx;
              const current = index === currentIdx;
              return (
                <View key={stage.status} style={styles.step}>
                  <View
                    style={[
                      styles.dot,
                      done ? styles.doneDot : current ? styles.currentDot : styles.upcomingDot,
                    ]}
                  >
                    {done ? <Text style={styles.dotCheck}>✓</Text> : null}
                    {current ? <View style={styles.dotInner} /> : null}
                  </View>
                  <Text
                    style={[
                      styles.stepLabel,
                      done ? styles.stepLabelDone : current ? styles.stepLabelCurrent : null,
                    ]}
                  >
                    {stage.shortLabel}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        <Text style={styles.expandHint}>{expanded ? 'Hide tracking details ▲' : 'Tracking details ▼'}</Text>
      </TouchableOpacity>

      {expanded ? (
        <View style={styles.timeline}>
          {ORDER_STAGES.map((stage, index) => {
            const reached = index <= currentIdx;
            const reachedAt = getStageReachedAt(order, stage.status);
            return (
              <View key={stage.status} style={styles.detailRow}>
                {index < ORDER_STAGES.length - 1 ? <View style={styles.detailLine} /> : null}
                <View
                  style={[
                    styles.detailDot,
                    { backgroundColor: reached ? colors.success : colors.border },
                  ]}
                />
                <View style={styles.detailText}>
                  <Text style={styles.detailTitle}>{stage.label}</Text>
                  <Text style={styles.detailTime}>
                    {reached ? formatReachedAt(reachedAt) : 'Pending'} · {stage.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Line } from 'react-native-svg';
import { colors, fonts } from '../theme';
import { dayMonth, weekday } from '../dates';
import { reduceMotion } from '../motion';

export default function Header({ open, done, composing, onToggleCompose }) {
  const total = open + done;
  const now = new Date();
  const turn = useRef(new Animated.Value(composing ? 1 : 0)).current;

  useEffect(() => {
    if (reduceMotion()) {
      turn.setValue(composing ? 1 : 0);
      return;
    }
    Animated.timing(turn, { toValue: composing ? 1 : 0, duration: 200, useNativeDriver: true }).start();
  }, [composing]);

  return (
    <View style={styles.wrap}>
      <View style={styles.titleRow}>
        <Text style={styles.title} maxFontSizeMultiplier={1.2} accessibilityRole="header">
          TASKS
        </Text>
        <View style={styles.date}>
          <Text style={styles.dateText} maxFontSizeMultiplier={1.3}>{weekday(now)}</Text>
          <Text style={styles.dateText} maxFontSizeMultiplier={1.3}>{dayMonth(now)}</Text>
        </View>
        <Pressable
          onPress={onToggleCompose}
          accessibilityRole="button"
          accessibilityLabel={composing ? 'Close new task' : 'New task'}
          accessibilityState={{ expanded: composing }}
          style={({ pressed }) => [styles.add, pressed && styles.addPressed]}
        >
          <Animated.View
            style={{ transform: [{ rotate: turn.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '45deg'] }) }] }}
          >
            <Svg width={24} height={24} viewBox="0 0 24 24">
              <Line x1={12} y1={3} x2={12} y2={21} stroke={colors.cream} strokeWidth={3} strokeLinecap="round" />
              <Line x1={3} y1={12} x2={21} y2={12} stroke={colors.cream} strokeWidth={3} strokeLinecap="round" />
            </Svg>
          </Animated.View>
        </Pressable>
      </View>
      <View style={styles.ruleThick} />
      <View style={styles.ruleThin} />
      {total > 0 && (
        <View style={styles.counts} accessibilityLiveRegion="polite">
          {open === 0 ? (
            <Text style={styles.allDone} maxFontSizeMultiplier={1.3}>All stamped.</Text>
          ) : (
            <Count label="To do" value={open} />
          )}
          <Count label="Done" value={done} />
        </View>
      )}
    </View>
  );
}

function Count({ label, value }) {
  return (
    <Text style={styles.count} maxFontSizeMultiplier={1.3}>
      {label} <Text style={styles.countValue}>{value}</Text>
    </Text>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 14 },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  date: { alignItems: 'flex-end' },
  dateText: { fontFamily: fonts.type, fontSize: 13, lineHeight: 17, color: colors.muted },
  add: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.stamp,
    borderRadius: 2,
  },
  addPressed: { opacity: 0.8 },
  title: {
    flex: 1,
    fontFamily: fonts.title,
    fontSize: 68,
    lineHeight: 80,
    letterSpacing: 2,
    color: colors.cream,
  },
  ruleThick: { height: 3, backgroundColor: colors.cream, opacity: 0.85 },
  ruleThin: { height: 1, backgroundColor: colors.cream, opacity: 0.85, marginTop: 3 },
  counts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  count: { fontFamily: fonts.label, fontSize: 17, letterSpacing: 1.5, color: colors.muted },
  countValue: { fontFamily: fonts.typeBold, fontSize: 17, color: colors.cream },
  allDone: { fontFamily: fonts.label, fontSize: 17, letterSpacing: 1.5, color: colors.cream },
});

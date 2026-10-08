import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Path, Rect } from 'react-native-svg';
import * as Haptics from 'expo-haptics';
import Stamp from './Stamp';
import { reduceMotion } from '../motion';
import { colors, fonts } from '../theme';

const STUB = 64;
const NOTCH = 6;

export default function Slip({ task, onToggle, onDelete }) {
  const [justStamped, setJustStamped] = useState(false);
  const thump = useRef(new Animated.Value(0)).current;

  function press() {
    if (!task.done) setJustStamped(true);
    else Haptics.selectionAsync();
    onToggle(task.id);
  }

  function remove() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onDelete(task);
  }

  function impact() {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (reduceMotion()) return;
    Animated.sequence([
      Animated.timing(thump, { toValue: 2, duration: 50, useNativeDriver: true }),
      Animated.timing(thump, { toValue: 0, duration: 90, useNativeDriver: true }),
    ]).start();
  }

  return (
    <Animated.View style={[styles.slip, task.done && styles.slipDone, { transform: [{ translateY: thump }] }]}>
      <Pressable
        onPress={press}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: task.done }}
        accessibilityLabel={task.text}
        style={({ pressed }) => [styles.hit, pressed && styles.hitPressed]}
      >
        <View style={styles.stub}>
          <Svg width={26} height={26} viewBox="0 0 26 26">
            <Rect x={1.5} y={1.5} width={23} height={23} rx={2} stroke={colors.ink} strokeWidth={2} fill="none" />
            {task.done && (
              <>
                <Line x1={7} y1={7} x2={19} y2={19} stroke={colors.ink} strokeWidth={2.5} strokeLinecap="round" />
                <Line x1={19} y1={7} x2={7} y2={19} stroke={colors.ink} strokeWidth={2.5} strokeLinecap="round" />
              </>
            )}
          </Svg>
          <Text style={styles.serial} maxFontSizeMultiplier={1.2}>No. {String(task.id).padStart(2, '0')}</Text>
        </View>
        <Text style={[styles.text, task.done && styles.textDone]}>{task.text}</Text>
      </Pressable>
      <Pressable
        onPress={remove}
        accessibilityRole="button"
        accessibilityLabel={`Delete task: ${task.text}`}
        style={({ pressed }) => [styles.remove, pressed && styles.hitPressed]}
      >
        <Svg width={24} height={24} viewBox="0 0 24 24">
          <Path
            d="M4 7h16M9 7V4.5h6V7M6.5 7l1 12.5h9l1-12.5M10 11v5M14 11v5"
            stroke={colors.stamp}
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </Pressable>
      <View style={styles.perforation} pointerEvents="none">
        <Svg width={2} height="100%">
          <Line x1={1} y1={0} x2={1} y2="100%" stroke={colors.slipEdge} strokeWidth={2} strokeDasharray="2,5" strokeLinecap="round" />
        </Svg>
      </View>
      <View style={[styles.notch, { top: -NOTCH }]} />
      <View style={[styles.notch, { bottom: -NOTCH }]} />
      {task.done && (
        <Stamp id={task.id} doneAt={task.doneAt} animate={justStamped} onImpact={impact} />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  slip: {
    flexDirection: 'row',
    minHeight: 68,
    marginHorizontal: 20,
    backgroundColor: colors.slip,
    borderWidth: 1,
    borderColor: colors.slipEdge,
    borderRadius: 2,
  },
  slipDone: { backgroundColor: colors.slipDone },
  hit: { flex: 1, flexDirection: 'row' },
  remove: { width: 52, alignItems: 'center', justifyContent: 'center' },
  hitPressed: { backgroundColor: colors.slipDone },
  stub: { width: STUB, alignItems: 'center', justifyContent: 'center', gap: 4 },
  serial: { fontFamily: fonts.type, fontSize: 11, color: colors.inkFaded },
  perforation: { position: 'absolute', left: STUB - 1, top: 10, bottom: 10, width: 2 },
  notch: {
    position: 'absolute',
    left: STUB - NOTCH,
    width: NOTCH * 2,
    height: NOTCH * 2,
    borderRadius: NOTCH,
    backgroundColor: colors.desk,
  },
  text: {
    flex: 1,
    paddingLeft: 16,
    paddingRight: 4,
    paddingVertical: 16,
    fontFamily: fonts.type,
    fontSize: 17,
    lineHeight: 24,
    color: colors.ink,
    alignSelf: 'center',
  },
  textDone: { color: colors.inkFaded },
});

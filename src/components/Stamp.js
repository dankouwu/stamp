import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { dayMonth } from '../dates';
import { reduceMotion } from '../motion';

const DURATION = 170;

export default function Stamp({ id, doneAt, animate, onImpact }) {
  const progress = useRef(new Animated.Value(animate && !reduceMotion() ? 0 : 1)).current;
  const tilt = (id % 2 ? -1 : 1) * (3 + (id % 4));

  useEffect(() => {
    if (!animate) return;
    if (reduceMotion()) {
      onImpact();
      return;
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: DURATION,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => finished && onImpact());
  }, []);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.stamp,
        {
          opacity: progress.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, 0.92, 0.92] }),
          transform: [
            { rotate: `${tilt}deg` },
            { scale: progress.interpolate({ inputRange: [0, 1], outputRange: [1.9, 1] }) },
          ],
        },
      ]}
    >
      <Text style={styles.word} maxFontSizeMultiplier={1.2}>DONE</Text>
      <View style={styles.line} />
      <Text style={styles.date} maxFontSizeMultiplier={1.2}>{dayMonth(new Date(doneAt))}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  stamp: {
    position: 'absolute',
    right: 56,
    top: 0,
    bottom: 0,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  word: {
    fontFamily: fonts.title,
    fontSize: 24,
    lineHeight: 26,
    letterSpacing: 3,
    color: colors.stamp,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingTop: 2,
    borderWidth: 3,
    borderBottomWidth: 0,
    borderColor: colors.stamp,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  line: { height: 3, backgroundColor: colors.stamp },
  date: {
    fontFamily: fonts.typeBold,
    fontSize: 12,
    textAlign: 'center',
    color: colors.stamp,
    paddingVertical: 1,
    borderWidth: 3,
    borderTopWidth: 0,
    borderColor: colors.stamp,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
  },
});

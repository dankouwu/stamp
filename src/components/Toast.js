import { useEffect, useRef } from 'react';
import { AccessibilityInfo, Animated, Pressable, StyleSheet, Text } from 'react-native';
import { colors, fonts } from '../theme';
import { reduceMotion } from '../motion';

export default function Toast({ message, action, onAction }) {
  const enter = useRef(new Animated.Value(reduceMotion() ? 1 : 0)).current;

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(message);
    if (reduceMotion()) return;
    Animated.timing(enter, { toValue: 1, duration: 200, useNativeDriver: true }).start();
  }, []);

  return (
    <Animated.View
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
      style={[
        styles.toast,
        {
          opacity: enter,
          transform: [{ translateY: enter.interpolate({ inputRange: [0, 1], outputRange: [12, 0] }) }],
        },
      ]}
    >
      <Text style={styles.message} maxFontSizeMultiplier={1.3}>{message}</Text>
      {action && (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          style={({ pressed }) => [styles.action, pressed && styles.actionPressed]}
        >
          <Text style={styles.actionText} maxFontSizeMultiplier={1.2}>{action}</Text>
        </Pressable>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: '100%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 8,
    minHeight: 56,
    backgroundColor: colors.ink,
    borderRadius: 2,
  },
  message: { flex: 1, fontFamily: fonts.type, fontSize: 15, lineHeight: 21, color: colors.cream },
  action: {
    minWidth: 88,
    minHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderWidth: 1.5,
    borderColor: colors.cream,
    borderRadius: 2,
  },
  actionPressed: { backgroundColor: '#2C3760' },
  actionText: { fontFamily: fonts.title, fontSize: 20, letterSpacing: 2, color: colors.cream },
});

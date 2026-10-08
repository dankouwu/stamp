import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import { animateNextLayout, reduceMotion } from '../motion';

export default function Presence({ visible, offset = 16, onMountedChange, children }) {
  const progress = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [mounted, setMounted] = useState(visible);
  const lastChildren = useRef(children);
  if (visible) lastChildren.current = children;

  useEffect(() => {
    onMountedChange?.(mounted);
  }, [mounted]);

  useEffect(() => {
    if (visible && !mounted) {
      animateNextLayout();
      setMounted(true);
    }
    if (reduceMotion()) {
      progress.setValue(visible ? 1 : 0);
      if (!visible) setMounted(false);
      return;
    }
    Animated.timing(progress, {
      toValue: visible ? 1 : 0,
      duration: visible ? 240 : 160,
      easing: visible ? Easing.out(Easing.cubic) : Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished && !visible) {
        animateNextLayout();
        setMounted(false);
      }
    });
  }, [visible]);

  if (!visible && !mounted) return null;

  return (
    <Animated.View
      pointerEvents={visible ? 'auto' : 'none'}
      style={{
        opacity: progress,
        transform: [{ translateY: progress.interpolate({ inputRange: [0, 1], outputRange: [offset, 0] }) }],
      }}
    >
      {lastChildren.current}
    </Animated.View>
  );
}

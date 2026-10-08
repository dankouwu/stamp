import { AccessibilityInfo, LayoutAnimation } from 'react-native';

let reduced = false;
AccessibilityInfo.isReduceMotionEnabled().then((value) => {
  reduced = value;
});
AccessibilityInfo.addEventListener('reduceMotionChanged', (value) => {
  reduced = value;
});

export const reduceMotion = () => reduced;

export function animateNextLayout() {
  if (reduced) return;
  LayoutAnimation.configureNext(LayoutAnimation.create(220, 'easeInEaseOut', 'opacity'));
}

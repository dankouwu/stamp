import { useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { colors, fonts } from '../theme';
import { reduceMotion } from '../motion';

export const MAX_LENGTH = 100;
const COUNTER_FROM = 80;
const EMPTY_MESSAGE = 'Napiš, co je potřeba udělat.';

export default function Composer({ value, onChangeText, onAdd, inputRef, bottomInset }) {
  const [showError, setShowError] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;
  const empty = value.trim() === '';

  function handleChange(text) {
    onChangeText(text);
    if (showError && text.trim() !== '') setShowError(false);
  }

  function submit() {
    if (empty) {
      setShowError(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      inputRef.current?.focus();
      if (!reduceMotion()) {
        shake.setValue(0);
        Animated.sequence([6, -6, 4, -4, 0].map((toValue) =>
          Animated.timing(shake, { toValue, duration: 50, useNativeDriver: true }),
        )).start();
      }
      return;
    }
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onAdd(value.trim());
  }

  return (
    <View style={[styles.strip, { paddingBottom: bottomInset }]}>
      <Text style={styles.label} maxFontSizeMultiplier={1.3}>NOVÝ ÚKOL</Text>
      <View style={styles.row}>
        <Animated.View style={[styles.inputWrap, { transform: [{ translateX: shake }] }]}>
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={handleChange}
            onSubmitEditing={submit}
            blurOnSubmit={false}
            returnKeyType="done"
            maxLength={MAX_LENGTH}
            placeholder="Napiš úkol"
            placeholderTextColor={colors.inkFaded}
            accessibilityLabel="Nový úkol"
            aria-invalid={showError}
            style={[styles.input, showError && styles.inputError]}
            maxFontSizeMultiplier={1.3}
          />
        </Animated.View>
        <Pressable
          onPress={submit}
          accessibilityRole="button"
          accessibilityLabel="Přidat úkol"
          accessibilityHint={empty ? 'Nejdřív napiš text úkolu.' : undefined}
          style={({ pressed }) => [
            styles.button,
            empty ? styles.buttonIdle : styles.buttonReady,
            pressed && styles.buttonPressed,
          ]}
        >
          <Text style={[styles.buttonText, empty && styles.buttonTextIdle]} maxFontSizeMultiplier={1.2}>
            PŘIDAT
          </Text>
        </Pressable>
      </View>
      <View style={styles.hintRow} accessibilityLiveRegion="polite">
        {showError ? (
          <Text style={styles.error} maxFontSizeMultiplier={1.3}>! {EMPTY_MESSAGE}</Text>
        ) : (
          <View />
        )}
        {value.length >= COUNTER_FROM && (
          <Text style={styles.counter} maxFontSizeMultiplier={1.3}>{value.length}/{MAX_LENGTH}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: { backgroundColor: colors.strip, paddingTop: 12, paddingHorizontal: 20 },
  label: { fontFamily: fonts.label, fontSize: 14, letterSpacing: 3, color: colors.muted, marginBottom: 6 },
  row: { flexDirection: 'row', gap: 10 },
  inputWrap: { flex: 1 },
  input: {
    height: 52,
    paddingHorizontal: 14,
    backgroundColor: colors.slip,
    borderWidth: 2,
    borderColor: colors.slip,
    borderRadius: 2,
    fontFamily: fonts.type,
    fontSize: 17,
    color: colors.ink,
  },
  inputError: { borderColor: colors.error },
  button: {
    minWidth: 104,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 2,
  },
  buttonReady: { backgroundColor: colors.stamp, borderColor: colors.stamp },
  buttonIdle: { backgroundColor: 'transparent', borderColor: colors.muted },
  buttonPressed: { opacity: 0.8 },
  buttonText: { fontFamily: fonts.title, fontSize: 22, letterSpacing: 2, color: colors.cream },
  buttonTextIdle: { color: colors.muted },
  hintRow: { minHeight: 26, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  error: { fontFamily: fonts.typeBold, fontSize: 14, color: colors.error },
  counter: { fontFamily: fonts.type, fontSize: 13, color: colors.muted },
});

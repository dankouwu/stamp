import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';

const STARTERS = ['Vynést koš', 'Napsat domácí úkol', 'Zavolat babičce'];

export default function EmptyState({ onPick }) {
  return (
    <View style={styles.box}>
      <Text style={styles.heading} maxFontSizeMultiplier={1.3}>Lístek je prázdný.</Text>
      <Text style={styles.body} maxFontSizeMultiplier={1.3}>
        Napiš první úkol do řádku dole, nebo začni jedním z těchto:
      </Text>
      {STARTERS.map((text) => (
        <Pressable
          key={text}
          onPress={() => onPick(text)}
          accessibilityRole="button"
          accessibilityLabel={`Použít „${text}“`}
          style={({ pressed }) => [styles.starter, pressed && styles.starterPressed]}
        >
          <Text style={styles.starterText} maxFontSizeMultiplier={1.3}>+ {text}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    marginHorizontal: 20,
    marginTop: 12,
    padding: 18,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.muted,
    gap: 10,
  },
  heading: { fontFamily: fonts.title, fontSize: 32, letterSpacing: 1, color: colors.cream },
  body: { fontFamily: fonts.type, fontSize: 15, lineHeight: 21, color: colors.muted, marginBottom: 6 },
  starter: {
    minHeight: 48,
    justifyContent: 'center',
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: colors.muted,
  },
  starterPressed: { backgroundColor: colors.strip },
  starterText: { fontFamily: fonts.type, fontSize: 16, color: colors.cream },
});

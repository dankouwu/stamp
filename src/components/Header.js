import { StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme';
import { dateLine } from '../czech';

export default function Header({ open, done }) {
  const total = open + done;
  return (
    <View style={styles.wrap}>
      <View style={styles.topRow}>
        <Text style={styles.label} maxFontSizeMultiplier={1.3}>RAZÍTKO</Text>
        <Text style={styles.date} maxFontSizeMultiplier={1.3}>{dateLine(new Date())}</Text>
      </View>
      <Text style={styles.title} maxFontSizeMultiplier={1.2} accessibilityRole="header">
        ÚKOLY
      </Text>
      <View style={styles.ruleThick} />
      <View style={styles.ruleThin} />
      {total > 0 && (
        <View style={styles.counts} accessibilityLiveRegion="polite">
          {open === 0 ? (
            <Text style={styles.allDone} maxFontSizeMultiplier={1.3}>Vše orazítkováno.</Text>
          ) : (
            <Count label="K udělání" value={open} />
          )}
          <Count label="Hotovo" value={done} />
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
  topRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' },
  label: { fontFamily: fonts.label, fontSize: 15, letterSpacing: 3, color: colors.muted },
  date: { fontFamily: fonts.type, fontSize: 13, color: colors.muted },
  title: {
    fontFamily: fonts.title,
    fontSize: 68,
    lineHeight: 80,
    letterSpacing: 2,
    color: colors.cream,
    marginTop: 2,
  },
  ruleThick: { height: 3, backgroundColor: colors.cream, opacity: 0.85 },
  ruleThin: { height: 1, backgroundColor: colors.cream, opacity: 0.85, marginTop: 3 },
  counts: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 12 },
  count: { fontFamily: fonts.label, fontSize: 17, letterSpacing: 1.5, color: colors.muted },
  countValue: { fontFamily: fonts.typeBold, fontSize: 17, color: colors.cream },
  allDone: { fontFamily: fonts.label, fontSize: 17, letterSpacing: 1.5, color: colors.cream },
});

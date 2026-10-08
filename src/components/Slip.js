import { StyleSheet, Text, View } from 'react-native';
import Svg, { Line, Rect } from 'react-native-svg';
import { colors, fonts } from '../theme';

const STUB = 64;
const NOTCH = 7;

export default function Slip({ task }) {
  return (
    <View style={[styles.slip, task.done && styles.slipDone]}>
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
        <Text style={styles.serial} maxFontSizeMultiplier={1.2}>č. {String(task.id).padStart(2, '0')}</Text>
      </View>
      <Svg style={styles.perforation} width={2} height="100%">
        <Line x1={1} y1={0} x2={1} y2="100%" stroke={colors.slipEdge} strokeWidth={2} strokeDasharray="2,5" strokeLinecap="round" />
      </Svg>
      <View style={[styles.notch, { top: -NOTCH }]} />
      <View style={[styles.notch, { bottom: -NOTCH }]} />
      <Text style={styles.text}>{task.text}</Text>
    </View>
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
  stub: { width: STUB, alignItems: 'center', justifyContent: 'center', gap: 4 },
  serial: { fontFamily: fonts.type, fontSize: 11, color: colors.inkFaded },
  perforation: { position: 'absolute', left: STUB - 1, top: 10, bottom: 10 },
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
    paddingRight: 16,
    paddingVertical: 16,
    fontFamily: fonts.type,
    fontSize: 17,
    lineHeight: 24,
    color: colors.ink,
    alignSelf: 'center',
  },
});

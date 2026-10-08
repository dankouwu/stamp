import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { BarlowCondensed_600SemiBold } from '@expo-google-fonts/barlow-condensed/600SemiBold';
import { BarlowCondensed_700Bold } from '@expo-google-fonts/barlow-condensed/700Bold';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime/400Regular';
import { CourierPrime_700Bold } from '@expo-google-fonts/courier-prime/700Bold';
import Header from './src/components/Header';
import EmptyState from './src/components/EmptyState';
import { colors } from './src/theme';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  const onLayout = useCallback(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.screen} onLayout={onLayout}>
        <StatusBar style="light" />
        <Header open={0} done={0} />
        <View style={styles.body}>
          <EmptyState onPick={() => {}} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.desk },
  body: { flex: 1 },
});

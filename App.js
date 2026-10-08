import { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import { BarlowCondensed_600SemiBold } from '@expo-google-fonts/barlow-condensed/600SemiBold';
import { BarlowCondensed_700Bold } from '@expo-google-fonts/barlow-condensed/700Bold';
import { CourierPrime_400Regular } from '@expo-google-fonts/courier-prime/400Regular';
import { CourierPrime_700Bold } from '@expo-google-fonts/courier-prime/700Bold';
import Header from './src/components/Header';
import EmptyState from './src/components/EmptyState';
import Slip from './src/components/Slip';
import Composer from './src/components/Composer';
import Toast from './src/components/Toast';
import { useTasks } from './src/useTasks';
import { animateNextLayout } from './src/motion';
import { colors } from './src/theme';

SplashScreen.preventAutoHideAsync();

const STORAGE_ERRORS = {
  load: 'Uložené úkoly se nepodařilo načíst. Začínáš s prázdným seznamem.',
  save: 'Úkoly se nepodařilo uložit. Zkontroluj volné místo v telefonu.',
};

export default function App() {
  const [fontsLoaded] = useFonts({
    BarlowCondensed_600SemiBold,
    BarlowCondensed_700Bold,
    CourierPrime_400Regular,
    CourierPrime_700Bold,
  });

  return (
    <SafeAreaProvider>
      {fontsLoaded && <Screen />}
    </SafeAreaProvider>
  );
}

function Screen() {
  const insets = useSafeAreaInsets();
  const [toast, setToast] = useState(null);
  const [state, dispatch] = useTasks((kind) => setToast({ id: Date.now(), message: STORAGE_ERRORS[kind] }));
  const [draft, setDraft] = useState('');
  const [keyboardUp, setKeyboardUp] = useState(false);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const open = state.tasks.filter((t) => !t.done).length;

  useEffect(() => {
    if (state.ready) SplashScreen.hideAsync();
  }, [state.ready]);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), toast.action ? 5000 : 6000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    const show = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow', () => setKeyboardUp(true));
    const hide = Keyboard.addListener(Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide', () => setKeyboardUp(false));
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  function addTask(text) {
    animateNextLayout();
    dispatch({ type: 'add', text });
    setDraft('');
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }

  function toggleTask(id) {
    dispatch({ type: 'toggle', id });
  }

  function deleteTask(task) {
    const index = state.tasks.findIndex((t) => t.id === task.id);
    if (index === -1) return;
    animateNextLayout();
    dispatch({ type: 'remove', id: task.id });
    setToast({
      id: Date.now(),
      message: 'Úkol smazán.',
      action: 'VRÁTIT',
      onAction: () => {
        animateNextLayout();
        dispatch({ type: 'restore', task, index });
        setToast(null);
      },
    });
  }

  function pickStarter(text) {
    setDraft(text);
    inputRef.current?.focus();
  }

  if (!state.ready) return <View style={styles.screen} />;

  return (
    <View style={[styles.screen, { paddingTop: insets.top }]}>
      <StatusBar style="light" />
      <KeyboardAvoidingView style={styles.flex} behavior="padding">
        <FlatList
          ref={listRef}
          style={styles.flex}
          data={state.tasks}
          keyExtractor={(t) => String(t.id)}
          renderItem={({ item }) => <Slip task={item} onToggle={toggleTask} onDelete={deleteTask} />}
          ItemSeparatorComponent={Gap}
          ListHeaderComponent={<Header open={open} done={state.tasks.length - open} />}
          ListEmptyComponent={<EmptyState onPick={pickStarter} />}
          contentContainerStyle={styles.listContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        />
        <View>
          {toast && <Toast key={toast.id} message={toast.message} action={toast.action} onAction={toast.onAction} />}
          <Composer
            value={draft}
            onChangeText={setDraft}
            onAdd={addTask}
            inputRef={inputRef}
            bottomInset={keyboardUp ? 8 : Math.max(insets.bottom, 8)}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const Gap = () => <View style={styles.gap} />;

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.desk },
  flex: { flex: 1 },
  listContent: { paddingBottom: 20 },
  gap: { height: 16 },
});

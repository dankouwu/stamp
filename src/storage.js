import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'stamp:v1';

const isTask = (t) =>
  t !== null &&
  typeof t === 'object' &&
  Number.isInteger(t.id) &&
  typeof t.text === 'string' &&
  t.text.trim() !== '';

export async function loadState() {
  const raw = await AsyncStorage.getItem(KEY);
  if (raw === null) return { next: 1, tasks: [] };
  const data = JSON.parse(raw);
  const tasks = (Array.isArray(data.tasks) ? data.tasks : []).filter(isTask).map((t) => ({
    id: t.id,
    text: t.text,
    done: t.done === true,
    doneAt: t.done === true && Number.isFinite(t.doneAt) ? t.doneAt : null,
  }));
  const next = Math.max(Number(data.next) || 1, ...tasks.map((t) => t.id + 1));
  return { next, tasks };
}

export function saveState({ next, tasks }) {
  return AsyncStorage.setItem(KEY, JSON.stringify({ next, tasks }));
}

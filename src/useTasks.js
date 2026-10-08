import { useEffect, useReducer, useRef } from 'react';
import { loadState, saveState } from './storage';

const initial = { ready: false, next: 1, tasks: [] };

function reducer(state, action) {
  switch (action.type) {
    case 'loaded':
      return { ready: true, next: action.next, tasks: action.tasks };
    case 'add':
      return {
        ...state,
        next: state.next + 1,
        tasks: [{ id: state.next, text: action.text, done: false, doneAt: null }, ...state.tasks],
      };
    case 'toggle':
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.id ? { ...t, done: !t.done, doneAt: t.done ? null : Date.now() } : t,
        ),
      };
    case 'remove':
      return { ...state, tasks: state.tasks.filter((t) => t.id !== action.id) };
    case 'restore': {
      if (state.tasks.some((t) => t.id === action.task.id)) return state;
      const tasks = [...state.tasks];
      tasks.splice(Math.min(action.index, tasks.length), 0, action.task);
      return { ...state, tasks };
    }
    default:
      return state;
  }
}

export function useTasks(onError) {
  const [state, dispatch] = useReducer(reducer, initial);
  const report = useRef(onError);
  report.current = onError;
  const saveFailed = useRef(false);

  useEffect(() => {
    loadState()
      .then(({ next, tasks }) => dispatch({ type: 'loaded', next, tasks }))
      .catch(() => {
        dispatch({ type: 'loaded', next: 1, tasks: [] });
        report.current?.('load');
      });
  }, []);

  useEffect(() => {
    if (!state.ready) return;
    saveState(state).then(
      () => {
        saveFailed.current = false;
      },
      () => {
        if (!saveFailed.current) report.current?.('save');
        saveFailed.current = true;
      },
    );
  }, [state]);

  return [state, dispatch];
}

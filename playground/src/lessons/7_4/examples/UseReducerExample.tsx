// @ts-nocheck
// useReducer - When state transitions get complex
type Action =
  | { type: 'ADD_TODO'; text: string }
  | { type: 'TOGGLE_TODO'; id: number }
  | { type: 'DELETE_TODO'; id: number };

function todoReducer(state: Todo[], action: Action): Todo[] {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { id: Date.now(), text: action.text, done: false }];
    case 'TOGGLE_TODO':
      return state.map((t) => (t.id === action.id ? { ...t, done: !t.done } : t));
    case 'DELETE_TODO':
      return state.filter((t) => t.id !== action.id);
  }
}

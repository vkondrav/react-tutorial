// @ts-nocheck
type Action =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET'; payload: number }
  | { type: 'ADD_ITEM'; payload: { id: number; name: string } };

// TypeScript ensures you handle all cases!
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'SET':
      // TypeScript knows action.payload is number here
      return { ...state, count: action.payload };
    case 'ADD_ITEM':
      // TypeScript knows payload has id and name
      return { ...state, items: [...state.items, action.payload] };
    // If you miss a case, TypeScript warns you!
  }
}

// @ts-nocheck
// Solution: useReducer centralizes all state logic
interface CartState {
  items: Product[];
  discount: number;
  shipping: number;
  isLoading: boolean;
  error: string | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'APPLY_DISCOUNT'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discount: action.payload,
      };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

// Component is now clean and simple
function ShoppingCart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // All state updates are explicit and centralized
  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };
}

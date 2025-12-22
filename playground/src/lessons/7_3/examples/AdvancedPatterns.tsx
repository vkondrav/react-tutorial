// @ts-nocheck
// Pattern 1: Named action functions (cleaner API)
function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Wrap dispatch in named functions
  const addNotification = useCallback((message, type) => {
    dispatch({ type: 'ADD', payload: { message, type } });
  }, []);

  const value = { notifications: state.notifications, addNotification };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}

// Usage: Much cleaner!
const { addNotification } = useNotifications();
addNotification('Hello!', 'success');

// Pattern 2: Selector hooks (performance)
function useCartTotal() {
  const state = useContext(CartStateContext);
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function useCartItemCount() {
  const state = useContext(CartStateContext);
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

// Usage: Components only subscribe to what they need
function Header() {
  const count = useCartItemCount(); // Only re-renders when count changes
  return <span>Cart ({count})</span>;
}

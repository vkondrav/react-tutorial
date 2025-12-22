// ============================================
// Custom Provider Demo - Reusable Patterns
// ============================================

import { useState, useReducer, createContext, useContext, useCallback } from 'react';
import { HiOutlineLightBulb, HiCheck, HiPlus, HiMinus, HiTrash } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import advancedPatternsCode from './examples/AdvancedPatterns.tsx?raw';

// ============================================
// Pattern 1: Provider with Actions
// ============================================

// Instead of exposing raw dispatch, expose named action functions
interface NotificationState {
  notifications: Array<{ id: number; message: string; type: 'success' | 'error' | 'info' }>;
}

type NotificationAction =
  | { type: 'ADD'; payload: { message: string; type: 'success' | 'error' | 'info' } }
  | { type: 'REMOVE'; payload: number }
  | { type: 'CLEAR' };

function notificationReducer(
  state: NotificationState,
  action: NotificationAction
): NotificationState {
  switch (action.type) {
    case 'ADD':
      return {
        notifications: [
          ...state.notifications,
          { id: Date.now(), message: action.payload.message, type: action.payload.type },
        ],
      };
    case 'REMOVE':
      return {
        notifications: state.notifications.filter((n) => n.id !== action.payload),
      };
    case 'CLEAR':
      return { notifications: [] };
    default:
      return state;
  }
}

// Context with both state AND action functions
interface NotificationContextValue {
  notifications: NotificationState['notifications'];
  addNotification: (message: string, type: 'success' | 'error' | 'info') => void;
  removeNotification: (id: number) => void;
  clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, { notifications: [] });

  // Memoize action functions to prevent unnecessary re-renders
  const addNotification = useCallback((message: string, type: 'success' | 'error' | 'info') => {
    dispatch({ type: 'ADD', payload: { message, type } });
  }, []);

  const removeNotification = useCallback((id: number) => {
    dispatch({ type: 'REMOVE', payload: id });
  }, []);

  const clearNotifications = useCallback(() => {
    dispatch({ type: 'CLEAR' });
  }, []);

  const value: NotificationContextValue = {
    notifications: state.notifications,
    addNotification,
    removeNotification,
    clearNotifications,
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error('useNotifications must be within NotificationProvider');
  return context;
}

// Demo components
function NotificationTriggers() {
  const { addNotification, clearNotifications } = useNotifications();

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => addNotification('Operation successful!', 'success')}
        className="btn btn-sm btn-success"
      >
        Add Success
      </button>
      <button
        onClick={() => addNotification('Something went wrong', 'error')}
        className="btn btn-sm btn-error"
      >
        Add Error
      </button>
      <button
        onClick={() => addNotification('Did you know...', 'info')}
        className="btn btn-sm btn-info"
      >
        Add Info
      </button>
      <button onClick={clearNotifications} className="btn btn-sm btn-ghost">
        Clear All
      </button>
    </div>
  );
}

function NotificationList() {
  const { notifications, removeNotification } = useNotifications();

  const typeColors = {
    success: 'bg-success/20 border-success',
    error: 'bg-error/20 border-error',
    info: 'bg-info/20 border-info',
  };

  return (
    <div className="space-y-2 mt-4">
      {notifications.length === 0 ? (
        <p className="text-sm text-base-content/60">No notifications</p>
      ) : (
        notifications.map((n) => (
          <div
            key={n.id}
            className={`flex items-center justify-between p-2 rounded border ${typeColors[n.type]}`}
          >
            <span className="text-sm">{n.message}</span>
            <button onClick={() => removeNotification(n.id)} className="btn btn-xs btn-ghost">
              <HiTrash size={14} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}

function NotificationDemo() {
  return (
    <NotificationProvider>
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <HiCheck className="text-success" size={20} />
          Pattern 1: Provider with Named Actions
        </h4>
        <p className="text-sm text-base-content/70 mb-4">
          Instead of exposing raw <code>dispatch</code>, provide named action functions for cleaner
          API.
        </p>
        <NotificationTriggers />
        <NotificationList />
      </div>
    </NotificationProvider>
  );
}

// ============================================
// Pattern 2: Selectors for Performance
// ============================================

interface CartState {
  items: Array<{ id: number; name: string; price: number; quantity: number }>;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { items: state.items.filter((i) => i.id !== action.payload) };
    case 'UPDATE_QUANTITY':
      return {
        items: state.items
          .map((i) =>
            i.id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
          )
          .filter((i) => i.quantity > 0),
      };
    default:
      return state;
  }
}

const CartStateContext = createContext<CartState | null>(null);
const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>{children}</CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

// Custom hooks with selectors
function useCartItems() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error('useCartItems must be within CartProvider');
  return state.items;
}

function useCartTotal() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error('useCartTotal must be within CartProvider');
  return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function useCartItemCount() {
  const state = useContext(CartStateContext);
  if (!state) throw new Error('useCartItemCount must be within CartProvider');
  return state.items.reduce((sum, item) => sum + item.quantity, 0);
}

function useCartDispatch() {
  const dispatch = useContext(CartDispatchContext);
  if (!dispatch) throw new Error('useCartDispatch must be within CartProvider');
  return dispatch;
}

const PRODUCTS = [
  { id: 1, name: 'Coffee', price: 4.99 },
  { id: 2, name: 'Tea', price: 3.49 },
  { id: 3, name: 'Juice', price: 5.99 },
];

function ProductButtons() {
  const dispatch = useCartDispatch();

  return (
    <div className="flex gap-2">
      {PRODUCTS.map((p) => (
        <button
          key={p.id}
          onClick={() => dispatch({ type: 'ADD_ITEM', payload: p })}
          className="btn btn-sm btn-outline"
        >
          {p.name} (${p.price})
        </button>
      ))}
    </div>
  );
}

function CartBadge() {
  const count = useCartItemCount();
  return <span className="badge badge-primary">{count} items</span>;
}

function CartTotal() {
  const total = useCartTotal();
  return <span className="font-bold text-success">${total.toFixed(2)}</span>;
}

function CartItemsList() {
  const items = useCartItems();
  const dispatch = useCartDispatch();

  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between text-sm bg-base-300 p-2 rounded"
        >
          <span>{item.name}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity - 1 },
                })
              }
              className="btn btn-xs btn-ghost"
            >
              <HiMinus size={12} />
            </button>
            <span>{item.quantity}</span>
            <button
              onClick={() =>
                dispatch({
                  type: 'UPDATE_QUANTITY',
                  payload: { id: item.id, quantity: item.quantity + 1 },
                })
              }
              className="btn btn-xs btn-ghost"
            >
              <HiPlus size={12} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function CartDemo() {
  return (
    <CartProvider>
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <HiCheck className="text-success" size={20} />
          Pattern 2: Selector Hooks
        </h4>
        <p className="text-sm text-base-content/70 mb-4">
          Create specialized hooks that return specific slices of state (like{' '}
          <code>useCartTotal</code>).
        </p>

        <ProductButtons />

        <div className="flex items-center gap-4 mt-4 mb-3">
          <CartBadge />
          <span>|</span>
          <CartTotal />
        </div>

        <CartItemsList />
      </div>
    </CartProvider>
  );
}

// ============================================
// Main Component
// ============================================

export default function CustomProviderDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Pattern 1 */}
      <NotificationDemo />

      {/* Pattern 2 */}
      <CartDemo />

      {/* Tip */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>Best Practice:</strong> Export everything from a single file:{' '}
          <code>export {'{ Provider, useAppState, useAppDispatch }'}</code>. Keep the Context itself
          private!
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline">
        {showCode ? 'Hide Code Patterns' : 'Show Code Patterns'}
      </button>

      {showCode && (
        <CodeSnippet
          title="Advanced Provider Patterns"
          code={advancedPatternsCode}
          language="tsx"
        />
      )}
    </div>
  );
}

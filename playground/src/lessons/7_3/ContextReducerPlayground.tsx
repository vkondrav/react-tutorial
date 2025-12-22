// ============================================
// Context + Reducer Playground
// ============================================

import { useState, useReducer, createContext, useContext, useCallback } from 'react';
import {
  HiOutlineMoon,
  HiOutlineSun,
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiPlus,
  HiTrash,
  HiCheck,
  HiMinus,
} from 'react-icons/hi';

// ============================================
// Demo 1: Theme Context
// ============================================

type Theme = 'light' | 'dark' | 'system';
type AccentColor = 'blue' | 'purple' | 'green' | 'orange';

interface ThemeState {
  theme: Theme;
  accent: AccentColor;
}

type ThemeAction =
  | { type: 'SET_THEME'; payload: Theme }
  | { type: 'SET_ACCENT'; payload: AccentColor }
  | { type: 'RESET' };

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_ACCENT':
      return { ...state, accent: action.payload };
    case 'RESET':
      return { theme: 'dark', accent: 'blue' };
    default:
      return state;
  }
};

const ThemeContext = createContext<{
  state: ThemeState;
  setTheme: (theme: Theme) => void;
  setAccent: (accent: AccentColor) => void;
  reset: () => void;
} | null>(null);

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(themeReducer, { theme: 'dark', accent: 'blue' });

  const setTheme = useCallback(
    (theme: Theme) => dispatch({ type: 'SET_THEME', payload: theme }),
    []
  );
  const setAccent = useCallback(
    (accent: AccentColor) => dispatch({ type: 'SET_ACCENT', payload: accent }),
    []
  );
  const reset = useCallback(() => dispatch({ type: 'RESET' }), []);

  return (
    <ThemeContext.Provider value={{ state, setTheme, setAccent, reset }}>
      {children}
    </ThemeContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be within ThemeProvider');
  return context;
}

function ThemeDemo() {
  const { state, setTheme, setAccent, reset } = useTheme();

  const themes: Theme[] = ['light', 'dark', 'system'];
  const accents: AccentColor[] = ['blue', 'purple', 'green', 'orange'];

  const accentStyles: Record<AccentColor, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Theme:</span>
        <div className="flex gap-1">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`btn btn-sm ${state.theme === t ? 'btn-primary' : 'btn-ghost'}`}
            >
              {t === 'light' && <HiOutlineSun size={16} />}
              {t === 'dark' && <HiOutlineMoon size={16} />}
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Accent:</span>
        <div className="flex gap-2">
          {accents.map((a) => (
            <button
              key={a}
              onClick={() => setAccent(a)}
              className={`w-8 h-8 rounded-full ${accentStyles[a]} ${
                state.accent === a ? 'ring-2 ring-offset-2 ring-white' : ''
              }`}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm font-semibold">Preview:</span>
        <div
          className={`p-4 rounded-lg ${state.theme === 'light' ? 'bg-white text-black' : 'bg-gray-800 text-white'}`}
        >
          <span className={`font-bold text-${state.accent}-500`}>Hello World!</span>
        </div>
      </div>

      <button onClick={reset} className="btn btn-sm btn-ghost">
        Reset to Defaults
      </button>
    </div>
  );
}

// ============================================
// Demo 2: Todo App with Context + Reducer
// ============================================

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
}

type TodoAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'SET_FILTER'; payload: TodoState['filter'] }
  | { type: 'CLEAR_COMPLETED' };

const todoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload ? { ...t, completed: !t.completed } : t
        ),
      };
    case 'DELETE_TODO':
      return { ...state, todos: state.todos.filter((t) => t.id !== action.payload) };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    case 'CLEAR_COMPLETED':
      return { ...state, todos: state.todos.filter((t) => !t.completed) };
    default:
      return state;
  }
};

const TodoStateContext = createContext<TodoState | null>(null);
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | null>(null);

function TodoProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn Context + Reducer', completed: true },
      { id: 2, text: 'Build something cool', completed: false },
    ],
    filter: 'all',
  });

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>{children}</TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) throw new Error('useTodoState must be within TodoProvider');
  return context;
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) throw new Error('useTodoDispatch must be within TodoProvider');
  return context;
}

function TodoInput() {
  const [text, setText] = useState('');
  const dispatch = useTodoDispatch();

  const handleAdd = () => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() });
      setText('');
    }
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        className="input input-bordered input-sm flex-1"
        placeholder="Add a todo..."
      />
      <button onClick={handleAdd} className="btn btn-primary btn-sm">
        <HiPlus size={16} />
      </button>
    </div>
  );
}

function TodoFilters() {
  const { filter } = useTodoState();
  const dispatch = useTodoDispatch();

  return (
    <div className="flex gap-1">
      {(['all', 'active', 'completed'] as const).map((f) => (
        <button
          key={f}
          onClick={() => dispatch({ type: 'SET_FILTER', payload: f })}
          className={`btn btn-xs ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

function TodoList() {
  const { todos, filter } = useTodoState();
  const dispatch = useTodoDispatch();

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  return (
    <div className="space-y-2">
      {filteredTodos.map((todo) => (
        <div key={todo.id} className="flex items-center gap-2 bg-base-300 p-2 rounded">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
            className="checkbox checkbox-primary checkbox-sm"
          />
          <span className={`flex-1 text-sm ${todo.completed ? 'line-through opacity-50' : ''}`}>
            {todo.text}
          </span>
          <button
            onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
            className="btn btn-ghost btn-xs text-error"
          >
            <HiTrash size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

function TodoFooter() {
  const { todos } = useTodoState();
  const dispatch = useTodoDispatch();
  const active = todos.filter((t) => !t.completed).length;

  return (
    <div className="flex justify-between items-center text-xs text-base-content/60">
      <span>{active} items left</span>
      <button
        onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
        className="btn btn-ghost btn-xs"
      >
        Clear completed
      </button>
    </div>
  );
}

function TodoDemo() {
  return (
    <TodoProvider>
      <div className="space-y-4">
        <TodoInput />
        <TodoFilters />
        <TodoList />
        <TodoFooter />
      </div>
    </TodoProvider>
  );
}

// ============================================
// Demo 3: Shopping Cart
// ============================================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: { id: number; name: string; price: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; delta: number } }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'APPLY_DISCOUNT'; payload: number }
  | { type: 'CLEAR' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.payload.id ? { ...i, quantity: i.quantity + action.payload.delta } : i
          )
          .filter((i) => i.quantity > 0),
      };
    case 'REMOVE_ITEM':
      return { ...state, items: state.items.filter((i) => i.id !== action.payload) };
    case 'APPLY_DISCOUNT':
      return { ...state, discount: action.payload };
    case 'CLEAR':
      return { items: [], discount: 0 };
    default:
      return state;
  }
};

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  subtotal: number;
  total: number;
} | null>(null);

function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], discount: 0 });

  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = subtotal * (1 - state.discount / 100);

  return (
    <CartContext.Provider value={{ state, dispatch, subtotal, total }}>
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be within CartProvider');
  return context;
}

const MENU_ITEMS = [
  { id: 1, name: '☕ Coffee', price: 4.5 },
  { id: 2, name: '🥐 Croissant', price: 3.0 },
  { id: 3, name: '🍪 Cookie', price: 2.0 },
];

function MenuItems() {
  const { dispatch } = useCart();

  return (
    <div className="grid grid-cols-3 gap-2">
      {MENU_ITEMS.map((item) => (
        <button
          key={item.id}
          onClick={() => dispatch({ type: 'ADD_ITEM', payload: item })}
          className="btn btn-sm btn-ghost flex-col h-auto py-2"
        >
          <span>{item.name}</span>
          <span className="text-xs text-primary">${item.price.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
}

function CartItems() {
  const { state, dispatch } = useCart();

  if (state.items.length === 0) {
    return <p className="text-sm text-base-content/60 text-center py-4">Cart is empty</p>;
  }

  return (
    <div className="space-y-2">
      {state.items.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between bg-base-300 p-2 rounded text-sm"
        >
          <span>{item.name}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, delta: -1 } })
              }
              className="btn btn-xs btn-ghost"
            >
              <HiMinus size={12} />
            </button>
            <span className="w-4 text-center">{item.quantity}</span>
            <button
              onClick={() =>
                dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.id, delta: 1 } })
              }
              className="btn btn-xs btn-ghost"
            >
              <HiPlus size={12} />
            </button>
            <span className="w-12 text-right">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function CartSummary() {
  const { state, dispatch, subtotal, total } = useCart();
  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'SAVE10') {
      dispatch({ type: 'APPLY_DISCOUNT', payload: 10 });
    } else if (discountCode.toUpperCase() === 'SAVE20') {
      dispatch({ type: 'APPLY_DISCOUNT', payload: 20 });
    }
  };

  return (
    <div className="border-t border-base-content/20 pt-3 mt-3 space-y-2">
      {!state.discount && (
        <div className="flex gap-2">
          <input
            type="text"
            value={discountCode}
            onChange={(e) => setDiscountCode(e.target.value)}
            className="input input-bordered input-xs flex-1"
            placeholder="Discount code"
          />
          <button onClick={handleApplyDiscount} className="btn btn-xs btn-secondary">
            Apply
          </button>
        </div>
      )}

      <div className="flex justify-between text-sm">
        <span>Subtotal:</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>

      {state.discount > 0 && (
        <div className="flex justify-between text-sm text-success">
          <span>Discount ({state.discount}%):</span>
          <span>-${((subtotal * state.discount) / 100).toFixed(2)}</span>
        </div>
      )}

      <div className="flex justify-between font-bold">
        <span>Total:</span>
        <span className="text-primary">${total.toFixed(2)}</span>
      </div>

      {state.items.length > 0 && (
        <button onClick={() => dispatch({ type: 'CLEAR' })} className="btn btn-ghost btn-xs w-full">
          Clear Cart
        </button>
      )}
    </div>
  );
}

function CartDemo() {
  return (
    <CartProvider>
      <div className="space-y-4">
        <MenuItems />
        <CartItems />
        <CartSummary />
      </div>
    </CartProvider>
  );
}

// ============================================
// Main Component with Tabs
// ============================================

type DemoTab = 'theme' | 'todo' | 'cart';

const tabs: { id: DemoTab; label: string; icon: React.ReactNode }[] = [
  { id: 'theme', label: 'Theme', icon: <HiOutlineMoon size={16} /> },
  { id: 'todo', label: 'Todo List', icon: <HiOutlineClipboardList size={16} /> },
  { id: 'cart', label: 'Shopping Cart', icon: <HiOutlineShoppingCart size={16} /> },
];

export default function ContextReducerPlayground(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<DemoTab>('theme');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn ${activeTab === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="card bg-base-200 p-6">
        {activeTab === 'theme' && (
          <ThemeProvider>
            <ThemeDemo />
          </ThemeProvider>
        )}
        {activeTab === 'todo' && <TodoDemo />}
        {activeTab === 'cart' && <CartDemo />}
      </div>

      {/* Hint */}
      <div className="alert">
        <HiCheck className="text-success" size={20} />
        <span>
          Each demo uses <strong>Context + Reducer</strong> — state is managed globally with
          structured actions!
        </span>
      </div>
    </div>
  );
}

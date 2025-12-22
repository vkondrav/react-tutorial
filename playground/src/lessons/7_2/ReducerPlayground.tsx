// ============================================
// useReducer Playground
// ============================================

import { useState, useReducer } from 'react';
import {
  HiOutlineClipboardList,
  HiOutlineShoppingCart,
  HiOutlineDocumentText,
  HiPlus,
  HiTrash,
  HiCheck,
  HiMinus,
  HiOutlineRefresh,
} from 'react-icons/hi';

// ============================================
// Demo 1: Todo List with useReducer
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
  | { type: 'CLEAR_COMPLETED' }
  | { type: 'SET_FILTER'; payload: TodoState['filter'] };

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, { id: Date.now(), text: action.payload, completed: false }],
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case 'CLEAR_COMPLETED':
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    case 'SET_FILTER':
      return { ...state, filter: action.payload };
    default:
      return state;
  }
}

function TodoListDemo() {
  const [state, dispatch] = useReducer(todoReducer, {
    todos: [
      { id: 1, text: 'Learn useReducer', completed: true },
      { id: 2, text: 'Build a todo app', completed: false },
      { id: 3, text: 'Practice TypeScript', completed: false },
    ],
    filter: 'all',
  });
  const [newTodo, setNewTodo] = useState('');

  const filteredTodos = state.todos.filter((todo) => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const handleAdd = () => {
    if (newTodo.trim()) {
      dispatch({ type: 'ADD_TODO', payload: newTodo.trim() });
      setNewTodo('');
    }
  };

  const activeCount = state.todos.filter((t) => !t.completed).length;

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineClipboardList size={18} />
        Todo List
      </h4>

      {/* Add Todo */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="input input-bordered flex-1 input-sm"
          placeholder="Add a todo..."
        />
        <button onClick={handleAdd} className="btn btn-primary btn-sm">
          <HiPlus size={16} />
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-3">
        {(['all', 'active', 'completed'] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
            className={`btn btn-xs ${state.filter === filter ? 'btn-primary' : 'btn-ghost'}`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="space-y-2 mb-3 max-h-48 overflow-auto">
        {filteredTodos.map((todo) => (
          <div key={todo.id} className="flex items-center gap-2 bg-base-200 p-2 rounded">
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

      {/* Footer */}
      <div className="flex justify-between items-center text-xs text-base-content/60">
        <span>{activeCount} items left</span>
        <button
          onClick={() => dispatch({ type: 'CLEAR_COMPLETED' })}
          className="btn btn-ghost btn-xs"
        >
          Clear completed
        </button>
      </div>
    </div>
  );
}

// ============================================
// Demo 2: Shopping Cart with useReducer
// ============================================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  discountCode: string | null;
  discountPercent: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; percent: number } }
  | { type: 'CLEAR_CART' };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== action.payload.id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };
    case 'APPLY_DISCOUNT':
      return {
        ...state,
        discountCode: action.payload.code,
        discountPercent: action.payload.percent,
      };
    case 'CLEAR_CART':
      return { items: [], discountCode: null, discountPercent: 0 };
    default:
      return state;
  }
}

const PRODUCTS = [
  { id: 1, name: 'Coffee', price: 4.99 },
  { id: 2, name: 'Sandwich', price: 8.99 },
  { id: 3, name: 'Cookie', price: 2.49 },
];

function ShoppingCartDemo() {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    discountCode: null,
    discountPercent: 0,
  });
  const [discountInput, setDiscountInput] = useState('');

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = subtotal * (state.discountPercent / 100);
  const total = subtotal - discount;

  const handleApplyDiscount = () => {
    if (discountInput.toUpperCase() === 'SAVE10') {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code: 'SAVE10', percent: 10 } });
    } else if (discountInput.toUpperCase() === 'SAVE20') {
      dispatch({ type: 'APPLY_DISCOUNT', payload: { code: 'SAVE20', percent: 20 } });
    }
  };

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineShoppingCart size={18} />
        Shopping Cart
      </h4>

      {/* Products */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {PRODUCTS.map((product) => (
          <button
            key={product.id}
            onClick={() => dispatch({ type: 'ADD_ITEM', payload: product })}
            className="btn btn-sm btn-ghost flex-col h-auto py-2"
          >
            <span className="text-xs">{product.name}</span>
            <span className="text-primary">${product.price}</span>
          </button>
        ))}
      </div>

      {/* Cart Items */}
      {state.items.length > 0 ? (
        <>
          <div className="space-y-2 mb-4 max-h-32 overflow-auto">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-base-200 p-2 rounded text-sm"
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
                  <span className="w-6 text-center">{item.quantity}</span>
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
                  <span className="w-16 text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Discount */}
          {!state.discountCode && (
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value)}
                className="input input-bordered input-sm flex-1"
                placeholder="Discount code (try SAVE10)"
              />
              <button onClick={handleApplyDiscount} className="btn btn-sm btn-secondary">
                Apply
              </button>
            </div>
          )}

          {/* Totals */}
          <div className="border-t border-base-content/20 pt-3 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {state.discountCode && (
              <div className="flex justify-between text-success">
                <span>Discount ({state.discountCode}):</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary">${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="btn btn-ghost btn-sm mt-3 w-full"
          >
            <HiTrash size={14} /> Clear Cart
          </button>
        </>
      ) : (
        <p className="text-center text-base-content/60 py-4">Cart is empty. Add some items!</p>
      )}
    </div>
  );
}

// ============================================
// Demo 3: Multi-Step Form with useReducer
// ============================================

interface FormState {
  step: number;
  data: {
    name: string;
    email: string;
    plan: 'basic' | 'pro' | 'enterprise' | null;
    addons: string[];
  };
  isSubmitting: boolean;
  isComplete: boolean;
}

type FormAction =
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'SET_NAME'; payload: string }
  | { type: 'SET_EMAIL'; payload: string }
  | { type: 'SET_PLAN'; payload: FormState['data']['plan'] }
  | { type: 'TOGGLE_ADDON'; payload: string }
  | { type: 'SUBMIT' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'RESET' };

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 3) };
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) };
    case 'SET_NAME':
      return { ...state, data: { ...state.data, name: action.payload } };
    case 'SET_EMAIL':
      return { ...state, data: { ...state.data, email: action.payload } };
    case 'SET_PLAN':
      return { ...state, data: { ...state.data, plan: action.payload } };
    case 'TOGGLE_ADDON': {
      const addons = state.data.addons.includes(action.payload)
        ? state.data.addons.filter((a) => a !== action.payload)
        : [...state.data.addons, action.payload];
      return { ...state, data: { ...state.data, addons } };
    }
    case 'SUBMIT':
      return { ...state, isSubmitting: true };
    case 'SUBMIT_SUCCESS':
      return { ...state, isSubmitting: false, isComplete: true };
    case 'RESET':
      return {
        step: 1,
        data: { name: '', email: '', plan: null, addons: [] },
        isSubmitting: false,
        isComplete: false,
      };
    default:
      return state;
  }
}

const ADDONS = ['Priority Support', 'Custom Domain', 'API Access'];

function MultiStepFormDemo() {
  const [state, dispatch] = useReducer(formReducer, {
    step: 1,
    data: { name: '', email: '', plan: null, addons: [] },
    isSubmitting: false,
    isComplete: false,
  });

  const handleSubmit = () => {
    dispatch({ type: 'SUBMIT' });
    setTimeout(() => dispatch({ type: 'SUBMIT_SUCCESS' }), 1000);
  };

  if (state.isComplete) {
    return (
      <div className="card bg-base-300 p-4 text-center">
        <HiCheck className="text-success mx-auto mb-2" size={48} />
        <h4 className="font-bold text-lg mb-2">Success!</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Welcome, {state.data.name}! Your {state.data.plan} plan is ready.
        </p>
        <button onClick={() => dispatch({ type: 'RESET' })} className="btn btn-primary btn-sm">
          <HiOutlineRefresh size={16} /> Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineDocumentText size={18} />
        Multi-Step Form (Step {state.step}/3)
      </h4>

      {/* Progress */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded ${s <= state.step ? 'bg-primary' : 'bg-base-content/20'}`}
          />
        ))}
      </div>

      {/* Step Content */}
      <div className="min-h-[150px]">
        {state.step === 1 && (
          <div className="space-y-3">
            <div className="form-control">
              <input
                type="text"
                value={state.data.name}
                onChange={(e) => dispatch({ type: 'SET_NAME', payload: e.target.value })}
                className="input input-bordered input-sm"
                placeholder="Your name"
              />
            </div>
            <div className="form-control">
              <input
                type="email"
                value={state.data.email}
                onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
                className="input input-bordered input-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>
        )}

        {state.step === 2 && (
          <div className="grid grid-cols-3 gap-2">
            {(['basic', 'pro', 'enterprise'] as const).map((plan) => (
              <button
                key={plan}
                onClick={() => dispatch({ type: 'SET_PLAN', payload: plan })}
                className={`btn btn-sm ${state.data.plan === plan ? 'btn-primary' : 'btn-ghost'}`}
              >
                {plan}
              </button>
            ))}
          </div>
        )}

        {state.step === 3 && (
          <div className="space-y-2">
            {ADDONS.map((addon) => (
              <label key={addon} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={state.data.addons.includes(addon)}
                  onChange={() => dispatch({ type: 'TOGGLE_ADDON', payload: addon })}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="text-sm">{addon}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => dispatch({ type: 'PREV_STEP' })}
          disabled={state.step === 1}
          className="btn btn-ghost btn-sm"
        >
          Back
        </button>
        {state.step < 3 ? (
          <button
            onClick={() => dispatch({ type: 'NEXT_STEP' })}
            disabled={state.step === 1 && (!state.data.name || !state.data.email)}
            className="btn btn-primary btn-sm"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={state.isSubmitting}
            className="btn btn-success btn-sm"
          >
            {state.isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// Main Component with Tabs
// ============================================

type DemoTab = 'todo' | 'cart' | 'form';

export default function ReducerPlayground(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<DemoTab>('todo');
  const [showState, setShowState] = useState(false);

  const tabs: { id: DemoTab; label: string; icon: React.ReactNode }[] = [
    { id: 'todo', label: 'Todo List', icon: <HiOutlineClipboardList size={16} /> },
    { id: 'cart', label: 'Shopping Cart', icon: <HiOutlineShoppingCart size={16} /> },
    { id: 'form', label: 'Multi-Step Form', icon: <HiOutlineDocumentText size={16} /> },
  ];

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
        {activeTab === 'todo' && <TodoListDemo />}
        {activeTab === 'cart' && <ShoppingCartDemo />}
        {activeTab === 'form' && <MultiStepFormDemo />}
      </div>

      {/* Tip */}
      <div className="alert">
        <HiCheck className="text-success" size={20} />
        <span>
          Each demo uses <strong>useReducer</strong> to manage all state transitions through
          explicit actions. Check the code to see how!
        </span>
      </div>
    </div>
  );
}

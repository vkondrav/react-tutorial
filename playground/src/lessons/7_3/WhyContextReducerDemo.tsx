// ============================================
// Why Context + Reducer Demo
// ============================================

import { useReducer, createContext, useContext } from 'react';
import { HiX, HiCheck, HiOutlineLightBulb, HiOutlineArrowRight } from 'react-icons/hi';

// ============================================
// Problem: Prop Drilling with useReducer
// ============================================

interface CounterState {
  count: number;
}

type CounterAction = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'RESET' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    default:
      return state;
  }
}

// With prop drilling - state and dispatch passed through every level
function PropDrillingExample() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <HiX className="text-error" size={16} />
          Prop Drilling Approach
        </h4>
        <span className="badge badge-error badge-sm">Tedious</span>
      </div>

      <div className="bg-base-200 p-3 rounded-lg">
        <div className="text-xs text-base-content/60 mb-2">App (owns state)</div>
        <div className="ml-4 border-l-2 border-error/30 pl-3">
          <div className="text-xs text-base-content/60 mb-2">Layout (passes props)</div>
          <div className="ml-4 border-l-2 border-error/30 pl-3">
            <div className="text-xs text-base-content/60 mb-2">Sidebar (passes props)</div>
            <div className="ml-4 border-l-2 border-error/30 pl-3">
              <div className="text-xs text-base-content/60 mb-2">Counter (finally uses it!)</div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: 'DECREMENT' })}
                  className="btn btn-xs btn-error"
                >
                  −
                </button>
                <span className="font-bold">{state.count}</span>
                <button
                  onClick={() => dispatch({ type: 'INCREMENT' })}
                  className="btn btn-xs btn-error"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-error/80 mt-3">
        Every component in between must pass state and dispatch as props, even if they don't use
        them!
      </p>
    </div>
  );
}

// ============================================
// Solution: Context + Reducer
// ============================================

const CounterStateContext = createContext<CounterState | null>(null);
const CounterDispatchContext = createContext<React.Dispatch<CounterAction> | null>(null);

function CounterProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <CounterStateContext.Provider value={state}>
      <CounterDispatchContext.Provider value={dispatch}>{children}</CounterDispatchContext.Provider>
    </CounterStateContext.Provider>
  );
}

function useCounterState() {
  const context = useContext(CounterStateContext);
  if (!context) throw new Error('useCounterState must be used within CounterProvider');
  return context;
}

function useCounterDispatch() {
  const context = useContext(CounterDispatchContext);
  if (!context) throw new Error('useCounterDispatch must be used within CounterProvider');
  return context;
}

// Deep nested component - no props needed!
function DeepCounter() {
  const { count } = useCounterState();
  const dispatch = useCounterDispatch();

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => dispatch({ type: 'DECREMENT' })} className="btn btn-xs btn-success">
        −
      </button>
      <span className="font-bold">{count}</span>
      <button onClick={() => dispatch({ type: 'INCREMENT' })} className="btn btn-xs btn-success">
        +
      </button>
    </div>
  );
}

function ContextReducerExample() {
  return (
    <CounterProvider>
      <div className="card bg-base-300 p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-sm flex items-center gap-2">
            <HiCheck className="text-success" size={16} />
            Context + Reducer Approach
          </h4>
          <span className="badge badge-success badge-sm">Clean</span>
        </div>

        <div className="bg-base-200 p-3 rounded-lg">
          <div className="text-xs text-base-content/60 mb-2">App (provides context)</div>
          <div className="ml-4 border-l-2 border-success/30 pl-3">
            <div className="text-xs text-base-content/60 mb-2">Layout (no props!)</div>
            <div className="ml-4 border-l-2 border-success/30 pl-3">
              <div className="text-xs text-base-content/60 mb-2">Sidebar (no props!)</div>
              <div className="ml-4 border-l-2 border-success/30 pl-3">
                <div className="text-xs text-base-content/60 mb-2">Counter (uses context)</div>
                <DeepCounter />
              </div>
            </div>
          </div>
        </div>

        <p className="text-xs text-success/80 mt-3">
          Components grab what they need directly from context. No prop drilling!
        </p>
      </div>
    </CounterProvider>
  );
}

// ============================================
// Comparison Visual
// ============================================

function ComparisonVisual() {
  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4">The Best of Both Worlds</h4>

      <div className="flex items-center justify-center gap-4 flex-wrap">
        <div className="card bg-primary/20 p-4 text-center">
          <div className="text-sm font-semibold text-primary">useReducer</div>
          <div className="text-xs text-base-content/70 mt-1">Structured updates</div>
          <div className="text-xs text-base-content/70">Predictable actions</div>
        </div>

        <HiOutlineArrowRight size={24} className="text-accent hidden sm:block" />
        <span className="text-2xl font-bold text-accent">+</span>

        <div className="card bg-secondary/20 p-4 text-center">
          <div className="text-sm font-semibold text-secondary">useContext</div>
          <div className="text-xs text-base-content/70 mt-1">Global access</div>
          <div className="text-xs text-base-content/70">No prop drilling</div>
        </div>

        <HiOutlineArrowRight size={24} className="text-accent hidden sm:block" />
        <span className="text-2xl font-bold text-accent">=</span>

        <div className="card bg-accent/20 p-4 text-center">
          <div className="text-sm font-semibold text-accent">Mini Redux!</div>
          <div className="text-xs text-base-content/70 mt-1">Global state</div>
          <div className="text-xs text-base-content/70">Action-based updates</div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function WhyContextReducerDemo(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Side by Side */}
      <div className="grid md:grid-cols-2 gap-4">
        <PropDrillingExample />
        <ContextReducerExample />
      </div>

      {/* Visual */}
      <ComparisonVisual />

      {/* Tip */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>When to use this pattern:</strong> Auth state, theme preferences, shopping carts,
          notifications — any state needed across many components with complex update logic.
        </div>
      </div>
    </div>
  );
}

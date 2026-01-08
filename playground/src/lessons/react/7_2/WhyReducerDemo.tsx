// ============================================
// Why useReducer Demo - When useState Gets Complex
// ============================================

import { useState, useReducer } from 'react';
import { HiX, HiCheck, HiPlus, HiMinus, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import useStateProblemCode from './examples/UseStateProblem.tsx?raw';
import useReducerSolutionCode from './examples/UseReducerSolution.tsx?raw';

// ============================================
// useState Example - Multiple interdependent states
// ============================================

function UseStateExample() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState<number[]>([0]);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Complex logic spread across multiple setState calls
  const increment = () => {
    const newCount = count + 1;
    const newHistory = [...history.slice(0, historyIndex + 1), newCount];
    setCount(newCount);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCanUndo(true);
    setCanRedo(false);
  };

  const decrement = () => {
    const newCount = count - 1;
    const newHistory = [...history.slice(0, historyIndex + 1), newCount];
    setCount(newCount);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    setCanUndo(true);
    setCanRedo(false);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setCount(history[newIndex]);
      setHistoryIndex(newIndex);
      setCanUndo(newIndex > 0);
      setCanRedo(true);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setCount(history[newIndex]);
      setHistoryIndex(newIndex);
      setCanUndo(true);
      setCanRedo(newIndex < history.length - 1);
    }
  };

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <HiX className="text-error" size={16} />
          useState Approach
        </h4>
        <span className="badge badge-error badge-sm">5 useState calls</span>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-primary mb-2">{count}</div>
        <div className="text-xs text-base-content/60">
          History: [{history.join(', ')}] @ index {historyIndex}
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-3">
        <button onClick={decrement} className="btn btn-sm btn-primary">
          <HiMinus size={16} />
        </button>
        <button onClick={increment} className="btn btn-sm btn-primary">
          <HiPlus size={16} />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
        <button onClick={undo} disabled={!canUndo} className="btn btn-sm btn-ghost">
          Undo
        </button>
        <button onClick={redo} disabled={!canRedo} className="btn btn-sm btn-ghost">
          Redo
        </button>
      </div>

      <div className="mt-4 text-xs text-error/80 bg-error/10 p-2 rounded">
        Each action requires updating 4-5 state variables. Easy to miss one and cause bugs!
      </div>
    </div>
  );
}

// ============================================
// useReducer Example - Centralized state logic
// ============================================

interface CounterState {
  count: number;
  history: number[];
  historyIndex: number;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'UNDO' }
  | { type: 'REDO' };

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT': {
      const newCount = state.count + 1;
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newCount];
      return {
        count: newCount,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    case 'DECREMENT': {
      const newCount = state.count - 1;
      const newHistory = [...state.history.slice(0, state.historyIndex + 1), newCount];
      return {
        count: newCount,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    }
    case 'UNDO': {
      if (state.historyIndex > 0) {
        const newIndex = state.historyIndex - 1;
        return {
          ...state,
          count: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;
    }
    case 'REDO': {
      if (state.historyIndex < state.history.length - 1) {
        const newIndex = state.historyIndex + 1;
        return {
          ...state,
          count: state.history[newIndex],
          historyIndex: newIndex,
        };
      }
      return state;
    }
    default:
      return state;
  }
}

function UseReducerExample() {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    history: [0],
    historyIndex: 0,
  });

  const canUndo = state.historyIndex > 0;
  const canRedo = state.historyIndex < state.history.length - 1;

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <HiCheck className="text-success" size={16} />
          useReducer Approach
        </h4>
        <span className="badge badge-success badge-sm">1 useReducer</span>
      </div>

      <div className="text-center mb-4">
        <div className="text-4xl font-bold text-primary mb-2">{state.count}</div>
        <div className="text-xs text-base-content/60">
          History: [{state.history.join(', ')}] @ index {state.historyIndex}
        </div>
      </div>

      <div className="flex gap-2 justify-center mb-3">
        <button onClick={() => dispatch({ type: 'DECREMENT' })} className="btn btn-sm btn-primary">
          <HiMinus size={16} />
        </button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })} className="btn btn-sm btn-primary">
          <HiPlus size={16} />
        </button>
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={() => dispatch({ type: 'UNDO' })}
          disabled={!canUndo}
          className="btn btn-sm btn-ghost"
        >
          Undo
        </button>
        <button
          onClick={() => dispatch({ type: 'REDO' })}
          disabled={!canRedo}
          className="btn btn-sm btn-ghost"
        >
          Redo
        </button>
      </div>

      <div className="mt-4 text-xs text-success/80 bg-success/10 p-2 rounded">
        All state logic is centralized in the reducer. dispatch() handles everything atomically!
      </div>
    </div>
  );
}

// ============================================
// Comparison Points
// ============================================

function ComparisonPoints() {
  const points = [
    {
      useState: 'Multiple useState calls',
      useReducer: 'Single useReducer with all state',
    },
    {
      useState: 'Logic scattered across handlers',
      useReducer: 'Logic centralized in reducer',
    },
    {
      useState: 'Easy to forget updating a value',
      useReducer: 'Atomic updates — all or nothing',
    },
    {
      useState: 'Hard to test state logic',
      useReducer: 'Reducer is a pure function — easy to test',
    },
    {
      useState: 'State transitions not explicit',
      useReducer: 'Actions describe what happened',
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full text-sm">
        <thead>
          <tr>
            <th className="text-error">useState</th>
            <th className="text-success">useReducer</th>
          </tr>
        </thead>
        <tbody>
          {points.map((point, i) => (
            <tr key={i}>
              <td>{point.useState}</td>
              <td>{point.useReducer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function WhyReducerDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Side by Side Demo */}
      <div className="grid md:grid-cols-2 gap-4">
        <UseStateExample />
        <UseReducerExample />
      </div>

      {/* When to use which */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>When to use useReducer:</strong> Multiple related state values, complex update
          logic, or when next state depends on previous state.
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4">useState vs useReducer</h4>
        <ComparisonPoints />
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline">
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>

      {showCode && (
        <div className="space-y-4">
          <CodeSnippet title="useState Problem" language="tsx" code={useStateProblemCode} />
          <CodeSnippet title="useReducer Solution" language="tsx" code={useReducerSolutionCode} />
        </div>
      )}
    </div>
  );
}

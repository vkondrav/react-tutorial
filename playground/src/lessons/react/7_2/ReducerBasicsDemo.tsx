// ============================================
// Reducer Basics Demo - The Fundamentals
// ============================================

import { useState, useReducer } from 'react';
import {
  HiOutlineArrowRight,
  HiChevronDown,
  HiChevronRight,
  HiOutlineLightBulb,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import reducerAnatomyCode from './examples/ReducerAnatomy.tsx?raw';
import anatomyStep1Code from './examples/AnatomyStep1State.tsx?raw';
import anatomyStep2Code from './examples/AnatomyStep2Actions.tsx?raw';
import anatomyStep3Code from './examples/AnatomyStep3Reducer.tsx?raw';
import anatomyStep4Code from './examples/AnatomyStep4Usage.tsx?raw';

// ============================================
// Interactive Counter with Action Log
// ============================================

interface CounterState {
  count: number;
}

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET'; payload: number };

interface ActionLogEntry {
  id: number;
  action: CounterAction;
  prevState: CounterState;
  nextState: CounterState;
}

function counterReducer(state: CounterState, action: CounterAction): CounterState {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    case 'RESET':
      return { count: 0 };
    case 'SET':
      return { count: action.payload };
    default:
      return state;
  }
}

function InteractiveCounter() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });
  const [actionLog, setActionLog] = useState<ActionLogEntry[]>([]);
  const [customValue, setCustomValue] = useState('10');

  // Wrap dispatch to log actions
  const loggedDispatch = (action: CounterAction) => {
    const prevState = state;
    // We need to compute next state for logging
    const nextState = counterReducer(state, action);
    setActionLog((prev) => [
      { id: Date.now(), action, prevState, nextState },
      ...prev.slice(0, 4), // Keep last 5
    ]);
    dispatch(action);
  };

  return (
    <div className="grid md:grid-cols-2 gap-4">
      {/* Counter */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4">Counter Component</h4>
        <div className="text-center mb-6">
          <div className="text-6xl font-bold text-primary">{state.count}</div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-4">
          <button onClick={() => loggedDispatch({ type: 'DECREMENT' })} className="btn btn-primary">
            − Decrement
          </button>
          <button onClick={() => loggedDispatch({ type: 'INCREMENT' })} className="btn btn-primary">
            + Increment
          </button>
        </div>

        <div className="flex gap-2 justify-center mb-4">
          <button
            onClick={() => loggedDispatch({ type: 'RESET' })}
            className="btn btn-ghost btn-sm"
          >
            Reset
          </button>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <input
            type="number"
            value={customValue}
            onChange={(e) => setCustomValue(e.target.value)}
            className="input input-bordered input-sm w-20"
          />
          <button
            onClick={() => loggedDispatch({ type: 'SET', payload: parseInt(customValue) || 0 })}
            className="btn btn-secondary btn-sm"
          >
            Set Value
          </button>
        </div>
      </div>

      {/* Action Log */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4">Action Log</h4>
        {actionLog.length === 0 ? (
          <p className="text-base-content/60 text-sm">Dispatch an action to see it logged here</p>
        ) : (
          <div className="space-y-2">
            {actionLog.map((entry) => (
              <div key={entry.id} className="bg-base-200 p-3 rounded-lg text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge badge-primary badge-sm">{entry.action.type}</span>
                  {'payload' in entry.action && (
                    <span className="text-secondary">payload: {entry.action.payload}</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-xs text-base-content/60">
                  <span>count: {entry.prevState.count}</span>
                  <HiOutlineArrowRight size={12} />
                  <span className="text-success">count: {entry.nextState.count}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Anatomy Breakdown
// ============================================

interface AnatomyStep {
  step: number;
  title: string;
  description: string;
  code: string;
}

const anatomySteps: AnatomyStep[] = [
  {
    step: 1,
    title: 'Define State Type',
    description: 'Create an interface that describes the shape of your state',
    code: anatomyStep1Code,
  },
  {
    step: 2,
    title: 'Define Action Types',
    description: 'Use a discriminated union to list all possible actions',
    code: anatomyStep2Code,
  },
  {
    step: 3,
    title: 'Create the Reducer',
    description: 'A pure function that takes state + action and returns new state',
    code: anatomyStep3Code,
  },
  {
    step: 4,
    title: 'Use in Component',
    description:
      'useReducer returns [state, dispatch] just like useState returns [state, setState]',
    code: anatomyStep4Code,
  },
];

function AnatomyBreakdown() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4">useReducer Anatomy</h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {anatomySteps.map((step) => (
          <button
            key={step.step}
            onClick={() => setActiveStep(step.step)}
            className={`btn btn-sm ${activeStep === step.step ? 'btn-primary' : 'btn-ghost'}`}
          >
            Step {step.step}
          </button>
        ))}
      </div>

      {anatomySteps.map((step) =>
        activeStep === step.step ? (
          <div key={step.step} className="space-y-3">
            <div>
              <h5 className="font-semibold text-primary">{step.title}</h5>
              <p className="text-sm text-base-content/70">{step.description}</p>
            </div>
            <CodeSnippet code={step.code} language="tsx" showCopy={false} />
          </div>
        ) : null
      )}
    </div>
  );
}

// ============================================
// Key Concepts Visual
// ============================================

function KeyConceptsVisual() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="card bg-base-200 p-6">
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 font-bold w-full text-left"
      >
        {expanded ? <HiChevronDown size={20} /> : <HiChevronRight size={20} />}
        How useReducer Works
      </button>

      {expanded && (
        <div className="mt-4 space-y-4">
          {/* Visual Flow */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <div className="card bg-base-300 p-3 text-center">
              <div className="text-xs text-base-content/60">Current</div>
              <div className="font-bold text-primary">State</div>
            </div>
            <div className="text-2xl">+</div>
            <div className="card bg-secondary/20 p-3 text-center">
              <div className="text-xs text-base-content/60">Dispatched</div>
              <div className="font-bold text-secondary">Action</div>
            </div>
            <HiOutlineArrowRight size={24} className="text-accent" />
            <div className="card bg-accent/20 p-3 text-center">
              <div className="text-xs text-base-content/60">Pure Function</div>
              <div className="font-bold text-accent">Reducer</div>
            </div>
            <HiOutlineArrowRight size={24} className="text-success" />
            <div className="card bg-success/20 p-3 text-center">
              <div className="text-xs text-base-content/60">New</div>
              <div className="font-bold text-success">State</div>
            </div>
          </div>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-3 mt-4">
            <div className="bg-base-300 p-3 rounded-lg">
              <h5 className="font-semibold text-primary text-sm">State</h5>
              <p className="text-xs text-base-content/70">
                An object containing all the data your component needs
              </p>
            </div>
            <div className="bg-base-300 p-3 rounded-lg">
              <h5 className="font-semibold text-secondary text-sm">Action</h5>
              <p className="text-xs text-base-content/70">
                An object describing what happened (type + optional payload)
              </p>
            </div>
            <div className="bg-base-300 p-3 rounded-lg">
              <h5 className="font-semibold text-accent text-sm">Reducer</h5>
              <p className="text-xs text-base-content/70">
                A pure function that computes the next state from current state + action
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function ReducerBasicsDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Interactive Counter */}
      <InteractiveCounter />

      {/* Key Concepts */}
      <KeyConceptsVisual />

      {/* Anatomy */}
      <AnatomyBreakdown />

      {/* Tips */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>Remember:</strong> The reducer must be a <strong>pure function</strong> — same
          inputs always produce same outputs, no side effects!
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline">
        {showCode ? 'Hide Full Code' : 'Show Full Code'}
      </button>

      {showCode && (
        <CodeSnippet title="Complete Example" language="tsx" code={reducerAnatomyCode} />
      )}
    </div>
  );
}

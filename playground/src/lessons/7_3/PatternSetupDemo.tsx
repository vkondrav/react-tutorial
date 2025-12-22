// ============================================
// Pattern Setup Demo - Step by Step
// ============================================

import { useState, useReducer, createContext, useContext } from 'react';
import { HiChevronRight, HiChevronDown, HiOutlineLightBulb, HiCheck } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import contextReducerSetupCode from './examples/ContextReducerSetup.tsx?raw';
import separateContextsCode from './examples/SeparateContexts.tsx?raw';
import step1TypesCode from './examples/SetupStep1Types.tsx?raw';
import step2ContextsCode from './examples/SetupStep2Contexts.tsx?raw';
import step3ReducerCode from './examples/SetupStep3Reducer.tsx?raw';
import step4ProviderCode from './examples/SetupStep4Provider.tsx?raw';
import step5HooksCode from './examples/SetupStep5Hooks.tsx?raw';
import step6UsageCode from './examples/SetupStep6Usage.tsx?raw';

// ============================================
// Step-by-Step Guide
// ============================================

interface Step {
  number: number;
  title: string;
  description: string;
  code: string;
}

const steps: Step[] = [
  {
    number: 1,
    title: 'Define Types',
    description: 'Create interfaces for your state and action types',
    code: step1TypesCode,
  },
  {
    number: 2,
    title: 'Create Contexts',
    description: 'Create SEPARATE contexts for state and dispatch (for performance)',
    code: step2ContextsCode,
  },
  {
    number: 3,
    title: 'Create Reducer',
    description: 'The reducer handles all state transitions',
    code: step3ReducerCode,
  },
  {
    number: 4,
    title: 'Create Provider',
    description: 'Provider component wraps useReducer and provides both contexts',
    code: step4ProviderCode,
  },
  {
    number: 5,
    title: 'Create Custom Hooks',
    description: 'Custom hooks provide type-safe access with helpful error messages',
    code: step5HooksCode,
  },
  {
    number: 6,
    title: 'Use in Components',
    description: 'Components use the custom hooks — clean and simple!',
    code: step6UsageCode,
  },
];

function StepByStepGuide() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4">6-Step Setup Guide</h4>

      {/* Step Navigation */}
      <div className="flex flex-wrap gap-2 mb-4">
        {steps.map((step) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className={`btn btn-sm ${activeStep === step.number ? 'btn-primary' : 'btn-ghost'}`}
          >
            Step {step.number}
          </button>
        ))}
      </div>

      {/* Active Step Content */}
      {steps.map((step) =>
        activeStep === step.number ? (
          <div key={step.number} className="space-y-3">
            <div>
              <h5 className="font-semibold text-primary flex items-center gap-2">
                <span className="badge badge-primary badge-sm">{step.number}</span>
                {step.title}
              </h5>
              <p className="text-sm text-base-content/70">{step.description}</p>
            </div>
            <CodeSnippet code={step.code} language="tsx" showCopy={false} />
          </div>
        ) : null
      )}

      {/* Progress Indicator */}
      <div className="flex gap-1 mt-4">
        {steps.map((step) => (
          <div
            key={step.number}
            className={`h-1.5 flex-1 rounded ${
              step.number <= activeStep ? 'bg-primary' : 'bg-base-content/20'
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================
// Why Separate Contexts Explanation
// ============================================

function SeparateContextsExplanation() {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="card bg-base-200 p-6">
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 font-bold w-full text-left"
      >
        {showDetails ? <HiChevronDown size={20} /> : <HiChevronRight size={20} />}
        Why Separate State and Dispatch Contexts?
      </button>

      {showDetails && (
        <div className="mt-4 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="card bg-error/10 border border-error/30 p-4">
              <h5 className="font-semibold text-error text-sm mb-2">Single Context (Bad)</h5>
              <ul className="text-xs space-y-1 text-base-content/70">
                <li>• Context value is an object: {'{state, dispatch}'}</li>
                <li>• When state changes, object reference changes</li>
                <li>• ALL consumers re-render, even if they only use dispatch</li>
                <li>• Dispatch never changes, but consumers don't know that</li>
              </ul>
            </div>

            <div className="card bg-success/10 border border-success/30 p-4">
              <h5 className="font-semibold text-success text-sm mb-2">Separate Contexts (Good)</h5>
              <ul className="text-xs space-y-1 text-base-content/70">
                <li>• StateContext holds just state</li>
                <li>• DispatchContext holds just dispatch</li>
                <li>• dispatch has stable reference (never changes)</li>
                <li>• Components using only dispatch don't re-render</li>
              </ul>
            </div>
          </div>

          <CodeSnippet
            title="Performance Optimization"
            code={separateContextsCode}
            language="tsx"
            showCopy={false}
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// Live Example
// ============================================

// Types
interface AppState {
  count: number;
  theme: 'light' | 'dark';
}

type AppAction = { type: 'INCREMENT' } | { type: 'DECREMENT' } | { type: 'TOGGLE_THEME' };

// Contexts
const AppStateContext = createContext<AppState | null>(null);
const AppDispatchContext = createContext<React.Dispatch<AppAction> | null>(null);

// Reducer
function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    default:
      return state;
  }
}

// Provider
function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, {
    count: 0,
    theme: 'dark',
  });

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>{children}</AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

// Custom Hooks
function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error('useAppState must be within AppProvider');
  return context;
}

function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (!context) throw new Error('useAppDispatch must be within AppProvider');
  return context;
}

// Components that consume the context
function CounterDisplay() {
  const { count } = useAppState();
  return <span className="text-3xl font-bold text-primary">{count}</span>;
}

function CounterControls() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex gap-2">
      <button onClick={() => dispatch({ type: 'DECREMENT' })} className="btn btn-sm btn-primary">
        −
      </button>
      <button onClick={() => dispatch({ type: 'INCREMENT' })} className="btn btn-sm btn-primary">
        +
      </button>
    </div>
  );
}

function ThemeToggle() {
  const { theme } = useAppState();
  const dispatch = useAppDispatch();
  return (
    <button onClick={() => dispatch({ type: 'TOGGLE_THEME' })} className="btn btn-sm btn-secondary">
      Theme: {theme}
    </button>
  );
}

function LiveExample() {
  return (
    <AppProvider>
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <HiCheck className="text-success" size={20} />
          Live Example
        </h4>

        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-2">
            <CounterDisplay />
            <CounterControls />
          </div>

          <div className="border-l border-base-content/20 h-16 hidden sm:block" />

          <ThemeToggle />
        </div>

        <p className="text-xs text-base-content/60 mt-4">
          Each component uses custom hooks to access exactly what it needs from context.
        </p>
      </div>
    </AppProvider>
  );
}

// ============================================
// Main Component
// ============================================

export default function PatternSetupDemo(): React.ReactElement {
  const [showFullCode, setShowFullCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Step by Step */}
      <StepByStepGuide />

      {/* Separate Contexts */}
      <SeparateContextsExplanation />

      {/* Live Example */}
      <LiveExample />

      {/* Tip */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>Pro tip:</strong> Put your context, reducer, provider, and hooks in a single file
          (e.g., <code>AppContext.tsx</code>) for easy imports and maintenance.
        </div>
      </div>

      {/* Full Code Toggle */}
      <button onClick={() => setShowFullCode(!showFullCode)} className="btn btn-sm btn-outline">
        {showFullCode ? 'Hide Full Code' : 'Show Full Code'}
      </button>

      {showFullCode && (
        <CodeSnippet
          title="Complete Context + Reducer Setup"
          code={contextReducerSetupCode}
          language="tsx"
        />
      )}
    </div>
  );
}

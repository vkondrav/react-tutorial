// ============================================
// Action Patterns Demo - Types and TypeScript
// ============================================

import { useState, useReducer } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import patternSimpleGood from './examples/PatternSimpleGood.tsx?raw';
import patternSimpleBad from './examples/PatternSimpleBad.tsx?raw';
import patternPayloadGood from './examples/PatternPayloadGood.tsx?raw';
import patternPayloadBad from './examples/PatternPayloadBad.tsx?raw';
import patternDiscriminatedGood from './examples/PatternDiscriminatedGood.tsx?raw';
import patternDiscriminatedBad from './examples/PatternDiscriminatedBad.tsx?raw';

// ============================================
// Action Pattern Examples
// ============================================

const actionPatterns = {
  simple: {
    title: 'Simple Action (no payload)',
    description: "For actions that don't need additional data",
    goodCode: patternSimpleGood,
    badCode: patternSimpleBad,
  },
  withPayload: {
    title: 'Action with Payload',
    description: 'When the action needs data to perform the update',
    goodCode: patternPayloadGood,
    badCode: patternPayloadBad,
  },
  discriminated: {
    title: 'TypeScript Discriminated Union',
    description: 'Use discriminated unions for exhaustive type checking',
    goodCode: patternDiscriminatedGood,
    badCode: patternDiscriminatedBad,
  },
};

function ActionPatternCard({
  pattern,
}: {
  pattern: (typeof actionPatterns)[keyof typeof actionPatterns];
}) {
  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold text-primary mb-2">{pattern.title}</h4>
      <p className="text-sm text-base-content/70 mb-4">{pattern.description}</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <HiCheck className="text-success" size={16} />
            <span className="font-semibold text-success">Good</span>
          </div>
          <CodeSnippet code={pattern.goodCode} language="tsx" showCopy={false} />
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2 text-sm">
            <HiX className="text-error" size={16} />
            <span className="font-semibold text-error">Avoid</span>
          </div>
          <CodeSnippet code={pattern.badCode} language="tsx" showCopy={false} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Interactive Type-Safe Example
// ============================================

interface FormState {
  name: string;
  email: string;
  age: number;
  isSubscribed: boolean;
  errors: Record<string, string>;
}

type FormAction =
  | {
      type: 'SET_FIELD';
      payload: { field: keyof Omit<FormState, 'errors'>; value: string | number | boolean };
    }
  | { type: 'SET_ERROR'; payload: { field: string; message: string } }
  | { type: 'CLEAR_ERROR'; payload: string }
  | { type: 'RESET' };

const initialFormState: FormState = {
  name: '',
  email: '',
  age: 0,
  isSubscribed: false,
  errors: {},
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: {
          ...state.errors,
          [action.payload.field]: action.payload.message,
        },
      };
    case 'CLEAR_ERROR': {
      const { [action.payload]: _, ...remainingErrors } = state.errors;
      return { ...state, errors: remainingErrors };
    }
    case 'RESET':
      return initialFormState;
    default:
      return state;
  }
}

function TypeSafeFormExample() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);
  const [lastAction, setLastAction] = useState<string | null>(null);

  const handleDispatch = (action: FormAction) => {
    setLastAction(JSON.stringify(action, null, 2));
    dispatch(action);
  };

  const validateEmail = (email: string) => {
    if (!email.includes('@')) {
      handleDispatch({ type: 'SET_ERROR', payload: { field: 'email', message: 'Invalid email' } });
    } else {
      handleDispatch({ type: 'CLEAR_ERROR', payload: 'email' });
    }
  };

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4">Type-Safe Form with useReducer</h4>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Form */}
        <div className="space-y-4">
          <div className="form-control">
            <input
              type="text"
              value={state.name}
              onChange={(e) =>
                handleDispatch({
                  type: 'SET_FIELD',
                  payload: { field: 'name', value: e.target.value },
                })
              }
              className="input input-bordered"
              placeholder="Enter name"
            />
          </div>

          <div className="form-control">
            <input
              type="email"
              value={state.email}
              onChange={(e) =>
                handleDispatch({
                  type: 'SET_FIELD',
                  payload: { field: 'email', value: e.target.value },
                })
              }
              onBlur={(e) => validateEmail(e.target.value)}
              className={`input input-bordered ${state.errors.email ? 'input-error' : ''}`}
              placeholder="Enter email"
            />
            {state.errors.email && (
              <label className="label">
                <span className="label-text-alt text-error">{state.errors.email}</span>
              </label>
            )}
          </div>

          <div className="form-control">
            <input
              type="number"
              value={state.age || ''}
              onChange={(e) =>
                handleDispatch({
                  type: 'SET_FIELD',
                  payload: { field: 'age', value: parseInt(e.target.value) || 0 },
                })
              }
              className="input input-bordered"
              placeholder="Enter age"
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                checked={state.isSubscribed}
                onChange={(e) =>
                  handleDispatch({
                    type: 'SET_FIELD',
                    payload: { field: 'isSubscribed', value: e.target.checked },
                  })
                }
                className="checkbox checkbox-primary"
              />
              <span className="label-text">Subscribe to newsletter</span>
            </label>
          </div>

          <button
            onClick={() => handleDispatch({ type: 'RESET' })}
            className="btn btn-ghost btn-sm"
          >
            Reset Form
          </button>
        </div>

        {/* State & Action Display */}
        <div className="space-y-4">
          <div>
            <h5 className="font-semibold text-sm mb-2">Current State</h5>
            <CodeSnippet code={JSON.stringify(state, null, 2)} language="json" showCopy={false} />
          </div>

          {lastAction && (
            <div>
              <h5 className="font-semibold text-sm mb-2">Last Dispatched Action</h5>
              <CodeSnippet code={lastAction} language="json" showCopy={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Action Creator Pattern
// ============================================

function ActionCreatorPattern() {
  const code = `// Action creators make dispatch calls cleaner
const actions = {
  increment: () => ({ type: 'INCREMENT' as const }),
  decrement: () => ({ type: 'DECREMENT' as const }),
  set: (value: number) => ({ type: 'SET' as const, payload: value }),
  addItem: (item: Item) => ({ type: 'ADD_ITEM' as const, payload: item }),
};

// Usage becomes more readable
dispatch(actions.increment());
dispatch(actions.set(42));
dispatch(actions.addItem({ id: 1, name: 'New Item' }));

// Instead of:
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'SET', payload: 42 });`;

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-2">Action Creators (Optional Pattern)</h4>
      <p className="text-sm text-base-content/70 mb-4">
        Action creators are functions that return action objects. They make your code more readable
        and provide a single place to define action shapes.
      </p>
      <CodeSnippet code={code} language="tsx" />
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function ActionPatternsDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'simple' | 'withPayload' | 'discriminated'>('simple');

  return (
    <div className="space-y-6">
      {/* Pattern Tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setActiveTab('simple')}
          className={`btn btn-sm ${activeTab === 'simple' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Simple Actions
        </button>
        <button
          onClick={() => setActiveTab('withPayload')}
          className={`btn btn-sm ${activeTab === 'withPayload' ? 'btn-primary' : 'btn-ghost'}`}
        >
          With Payload
        </button>
        <button
          onClick={() => setActiveTab('discriminated')}
          className={`btn btn-sm ${activeTab === 'discriminated' ? 'btn-primary' : 'btn-ghost'}`}
        >
          TypeScript Union
        </button>
      </div>

      {/* Pattern Card */}
      <ActionPatternCard pattern={actionPatterns[activeTab]} />

      {/* Interactive Example */}
      <TypeSafeFormExample />

      {/* Action Creator Pattern */}
      <ActionCreatorPattern />

      {/* Tip */}
      <div className="alert">
        <HiOutlineLightBulb className="text-warning" size={20} />
        <div>
          <strong>Best Practice:</strong> Use SCREAMING_SNAKE_CASE for action types (e.g., ADD_ITEM,
          SET_USER). It makes them stand out and is a common convention.
        </div>
      </div>
    </div>
  );
}

// ============================================
// State Preservation Problem Demo
// ============================================

import { useState } from 'react';
import { HiOutlineExclamationCircle, HiOutlineLightBulb, HiX } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import problemCode from './examples/ConditionalProblem.tsx?raw';

// A component with internal state
function Counter({ label }: { label: string }) {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-base-300 rounded-lg">
      <p className="text-sm text-base-content/70 mb-2">{label}</p>
      <div className="flex items-center gap-4">
        <button onClick={() => setCount((c) => c - 1)} className="btn btn-sm btn-outline">
          -
        </button>
        <span className="text-2xl font-bold text-primary min-w-[3ch] text-center">{count}</span>
        <button onClick={() => setCount((c) => c + 1)} className="btn btn-sm btn-outline">
          +
        </button>
      </div>
    </div>
  );
}

// Form with state that gets lost
function DraftForm() {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');

  return (
    <div className="p-4 bg-base-300 rounded-lg space-y-3">
      <p className="text-sm text-base-content/70">Draft your message:</p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something here..."
        className="textarea textarea-bordered w-full h-24"
      />
      <div className="flex items-center gap-2">
        <span className="text-sm">Priority:</span>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="select select-bordered select-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      {text && <p className="text-xs text-success">✓ {text.length} characters typed</p>}
    </div>
  );
}

export default function StatePreservationProblemDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'counter' | 'form'>('counter');
  const [showWarning, setShowWarning] = useState(true);

  return (
    <div className="space-y-4">
      {/* Warning Banner */}
      {showWarning && (
        <div className="alert bg-warning/20 border-warning">
          <HiOutlineExclamationCircle className="text-warning" size={20} />
          <div className="flex-1">
            <p className="font-semibold text-warning">Try this:</p>
            <p className="text-sm text-base-content/70">
              1. Increment the counter or type in the form
              <br />
              2. Switch to the other tab
              <br />
              3. Come back — your state is <strong className="text-error">gone!</strong>
            </p>
          </div>
          <button onClick={() => setShowWarning(false)} className="btn btn-ghost btn-sm btn-circle">
            <HiX size={16} />
          </button>
        </div>
      )}

      {/* Tab Demo */}
      <div className="card bg-base-200 p-4">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setActiveTab('counter')}
            className={`btn btn-sm ${activeTab === 'counter' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Counter Tab
          </button>
          <button
            onClick={() => setActiveTab('form')}
            className={`btn btn-sm ${activeTab === 'form' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Form Tab
          </button>
        </div>

        {/* Conditional rendering - state is destroyed! */}
        {activeTab === 'counter' && <Counter label="This counter resets when you switch tabs" />}
        {activeTab === 'form' && <DraftForm />}

        <div className="mt-4 flex items-start gap-2 text-xs text-error">
          <HiOutlineExclamationCircle className="shrink-0 mt-0.5" size={14} />
          <span>
            Using{' '}
            <code className="bg-base-300 px-1 rounded">{`{activeTab === 'x' && <Component />}`}</code>
            — component unmounts and state is lost!
          </span>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="The Problem: Conditional Rendering" language="tsx" code={problemCode} />

      {/* Explanation */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-1">Why does this happen?</p>
            <p className="text-base-content/70 text-sm">
              When a component is conditionally rendered with{' '}
              <code className="text-accent">&& </code>
              and the condition becomes false, React <strong>unmounts</strong> the component
              entirely. Unmounting destroys the component instance, including all its{' '}
              <code className="text-accent">useState</code> values.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

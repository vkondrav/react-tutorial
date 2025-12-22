// ============================================
// ControlledBasicsDemo - Basic controlled input concept
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiChevronDown, HiChevronRight } from 'react-icons/hi';

export default function ControlledBasicsDemo(): React.ReactElement {
  const [name, setName] = useState('');
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      {/* Interactive Demo */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4">Try It: Controlled Input</h4>

        <div className="space-y-4">
          {/* The controlled input */}
          <div>
            <label className="label">
              <span className="label-text">Enter your name:</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type here..."
              className="input input-bordered w-full"
            />
          </div>

          {/* Real-time display */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-base-200 rounded-lg p-4">
              <div className="text-xs text-base-content/60 mb-1">State Value</div>
              <div className="font-mono text-primary">"{name}"</div>
            </div>
            <div className="bg-base-200 rounded-lg p-4">
              <div className="text-xs text-base-content/60 mb-1">Character Count</div>
              <div className="font-mono text-secondary">{name.length}</div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-base-100 rounded-lg p-4 border border-base-300">
            <div className="text-sm text-base-content/60 mb-2">Live Preview:</div>
            <div className="text-xl">
              {name ? (
                <span>
                  Hello, <strong className="text-primary">{name}</strong>! 👋
                </span>
              ) : (
                <span className="text-base-content/40">Enter your name above...</span>
              )}
            </div>
          </div>
        </div>

        {/* Insight */}
        <div className="mt-4 flex items-start gap-2 text-sm bg-primary/10 rounded-lg p-3">
          <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
          <p className="text-base-content/70">
            Notice how the preview updates <strong className="text-primary">instantly</strong> as
            you type. This is the power of controlled components — React always knows the current
            value!
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-ghost btn-sm gap-2">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <div className="bg-base-300 rounded-lg p-4">
          <pre className="font-mono text-xs overflow-x-auto">
            <code>{`function ControlledInput() {
  // Step 1: Create state to hold the input value
  const [name, setName] = useState('');

  return (
    <div>
      {/* Step 2: Connect state to input */}
      <input
        type="text"
        value={name}              // Controlled by state
        onChange={(e) => setName(e.target.value)}  // Update state on change
      />
      
      {/* Step 3: Use the value anywhere! */}
      <p>Hello, {name}!</p>
      <p>Characters: {name.length}</p>
    </div>
  );
}`}</code>
          </pre>
        </div>
      )}

      {/* The Two-Way Connection Diagram */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4 text-center">The Controlled Component Flow</h4>
        <div className="flex items-center justify-center gap-4">
          <div className="bg-primary/20 rounded-lg p-4 text-center">
            <div className="text-xs text-base-content/60 mb-1">React State</div>
            <div className="font-mono text-primary text-lg">name</div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2">
              <span className="text-success text-xs">value={'{name}'}</span>
              <span className="text-success">→</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-warning">←</span>
              <span className="text-warning text-xs">onChange</span>
            </div>
          </div>

          <div className="bg-secondary/20 rounded-lg p-4 text-center">
            <div className="text-xs text-base-content/60 mb-1">Input Element</div>
            <div className="font-mono text-secondary text-lg">&lt;input /&gt;</div>
          </div>
        </div>
        <p className="text-center text-xs text-base-content/60 mt-4">
          <span className="text-success">value</span> pushes state to input •{' '}
          <span className="text-warning">onChange</span> updates state from input
        </p>
      </div>
    </div>
  );
}

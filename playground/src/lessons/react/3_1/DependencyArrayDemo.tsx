// ============================================
// DependencyArrayDemo - Understanding dependencies
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineExclamationCircle, HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import emptyArrayExample from './examples/EmptyArrayExample.tsx?raw';
import withDepsExample from './examples/WithDepsExample.tsx?raw';
import noArrayExample from './examples/NoArrayExample.tsx?raw';

// ============================================
// Types
// ============================================

type TabId = 'empty' | 'deps' | 'none';

interface TabConfig {
  id: TabId;
  label: string;
  color: string;
}

// ============================================
// Main Component
// ============================================

export default function DependencyArrayDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabId>('empty');

  const tabs: TabConfig[] = [
    { id: 'empty', label: '[] Empty Array', color: 'btn-success' },
    { id: 'deps', label: '[deps] With Values', color: 'btn-primary' },
    { id: 'none', label: 'No Array', color: 'btn-warning' },
  ];

  return (
    <div className="card bg-base-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Dependency Array Comparison</h3>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? tab.color : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'empty' && <EmptyArrayDemo />}
      {activeTab === 'deps' && <WithDepsDemo />}
      {activeTab === 'none' && <NoArrayDemo />}

      {/* Summary Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="table table-sm w-full">
          <thead>
            <tr className="border-base-content/20">
              <th>Syntax</th>
              <th>When it runs</th>
              <th>Use case</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-base-content/10">
              <td className="font-mono text-success">useEffect(fn, [])</td>
              <td>Once, on mount only</td>
              <td>API calls, subscriptions, one-time setup</td>
            </tr>
            <tr className="border-base-content/10">
              <td className="font-mono text-primary">useEffect(fn, [a, b])</td>
              <td>On mount + when a or b change</td>
              <td>Sync with specific values</td>
            </tr>
            <tr className="border-base-content/10">
              <td className="font-mono text-warning">useEffect(fn)</td>
              <td>After every render</td>
              <td>Rarely needed — usually a mistake!</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================
// Demo 1: Empty dependency array
// ============================================

function EmptyArrayDemo(): React.ReactElement {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This only runs once when component mounts
    console.log('[EmptyArrayDemo] Effect ran on mount');
  }, []); // Empty array = only on mount

  return (
    <div className="space-y-4">
      <div className="bg-success/10 border border-success/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <HiCheck className="text-success" size={20} />
          <span className="font-semibold text-success">Empty Array: [] — Runs ONCE</span>
        </div>
        <p className="text-sm text-base-content/70 mb-4">
          The effect only runs when the component first mounts. Clicking the button re-renders the
          component, but the effect does NOT run again.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-base-200 p-4 rounded-lg text-center">
            <p className="text-sm text-base-content/60">Re-renders (button clicks)</p>
            <p className="text-3xl font-bold text-primary">{count}</p>
            <button onClick={() => setCount((c) => c + 1)} className="btn btn-primary btn-sm mt-2">
              Re-render
            </button>
          </div>
          <div className="bg-base-200 p-4 rounded-lg text-center">
            <p className="text-sm text-base-content/60">Effect ran</p>
            <p className="text-3xl font-bold text-success">1x</p>
            <p className="text-xs text-success mt-2">✓ On mount only</p>
          </div>
        </div>

        <div className="mt-4">
          <CodeSnippet code={emptyArrayExample} language="tsx" showCopy={false} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo 2: With dependencies
// ============================================

function WithDepsDemo(): React.ReactElement {
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);

  useEffect(() => {
    // Updates document title when name changes - check your browser tab!
    if (name) {
      document.title = `Hello, ${name}!`;
    } else {
      document.title = 'React Tutorial';
    }
  }, [name]); // Only re-run when name changes

  return (
    <div className="space-y-4">
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <HiCheck className="text-primary" size={20} />
          <span className="font-semibold text-primary">
            With Dependencies: [name] — Runs on change
          </span>
        </div>
        <p className="text-sm text-base-content/70 mb-4">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          The effect only runs when <code className="text-primary">name</code> changes. Changing age
          re-renders but does NOT trigger the effect. <strong>Check your browser tab!</strong>
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-base-content/60 block mb-1">
              Name (tracked) — updates tab title
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type a name..."
              className="input input-bordered input-primary w-full"
            />
          </div>
          <div>
            <label className="text-sm text-base-content/60 block mb-1">
              Age (not tracked) — no effect
            </label>
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {name && (
          <div className="bg-base-200 p-3 rounded-lg">
            <p className="text-sm">
              <span className="text-base-content/60">Document title set to:</span>{' '}
              <span className="text-primary font-semibold">"Hello, {name}!"</span>
            </p>
          </div>
        )}

        <div className="mt-4">
          <CodeSnippet code={withDepsExample} language="tsx" showCopy={false} />
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo 3: No array (dangerous!)
// ============================================

function NoArrayDemo(): React.ReactElement {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    // Runs after EVERY render - usually not what you want!
    console.log('[NoArrayDemo] Effect ran after render');
  }); // No dependency array!

  return (
    <div className="space-y-4">
      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <HiOutlineExclamationCircle className="text-warning" size={20} />
          <span className="font-semibold text-warning">No Array — Runs EVERY render</span>
        </div>
        <p className="text-sm text-base-content/70 mb-4">
          Without a dependency array, the effect runs after <strong>every single render</strong>.
          This is rarely what you want and can cause performance issues or infinite loops!
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-base-200 p-4 rounded-lg text-center">
            <p className="text-sm text-base-content/60">Button clicks</p>
            <p className="text-3xl font-bold">{clickCount}</p>
          </div>
          <div className="bg-base-200 p-4 rounded-lg text-center">
            <p className="text-sm text-base-content/60">Effect runs</p>
            <p className="text-3xl font-bold text-warning">= Renders</p>
            <p className="text-xs text-base-content/50 mt-1">Check console!</p>
          </div>
        </div>

        <button onClick={() => setClickCount((c) => c + 1)} className="btn btn-warning btn-sm">
          Trigger Re-render
        </button>

        <div className="mt-4 p-3 bg-error/10 border border-error/30 rounded-lg">
          <div className="flex items-start gap-2">
            <HiX className="text-error shrink-0 mt-0.5" size={18} />
            <p className="text-sm text-base-content/80">
              <strong>Warning:</strong> If your effect calls setState, you'll create an infinite
              loop! Always include a dependency array.
            </p>
          </div>
        </div>

        <div className="mt-4">
          <CodeSnippet code={noArrayExample} language="tsx" showCopy={false} />
        </div>
      </div>
    </div>
  );
}

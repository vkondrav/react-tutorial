// ============================================
// CSS Approach Demo
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import cssCode from './examples/CSSHiding.tsx?raw';

// Counter component with state
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

// Form with state
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

export default function CSSApproachDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'counter' | 'form'>('counter');

  return (
    <div className="space-y-4">
      {/* Success Banner */}
      <div className="alert bg-success/20 border-success">
        <HiCheck className="text-success" size={20} />
        <div className="flex-1">
          <p className="font-semibold text-success">Try this:</p>
          <p className="text-sm text-base-content/70">
            Increment the counter or type in the form, switch tabs, come back —{' '}
            <strong className="text-success">state is preserved!</strong>
          </p>
        </div>
      </div>

      {/* Tab Demo with CSS hiding */}
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

        {/* CSS hiding - both components stay mounted! */}
        <div style={{ display: activeTab === 'counter' ? 'block' : 'none' }}>
          <Counter label="This counter keeps its value!" />
        </div>
        <div style={{ display: activeTab === 'form' ? 'block' : 'none' }}>
          <DraftForm />
        </div>

        <div className="mt-4 flex items-start gap-2 text-xs text-success">
          <HiCheck className="shrink-0 mt-0.5" size={14} />
          <span>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            Using <code className="bg-base-300 px-1 rounded">display: none</code>— components stay
            mounted, state preserved!
          </span>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="CSS Hiding Approach" language="tsx" code={cssCode} />

      {/* Trade-offs */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card bg-success/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiCheck className="text-success" />
            <h4 className="font-semibold text-success">Pros</h4>
          </div>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• State is preserved across tab switches</li>
            <li>• Simple to implement</li>
            <li>• Works in all React versions</li>
            <li>• No external dependencies</li>
          </ul>
        </div>
        <div className="card bg-error/10 p-4">
          <div className="flex items-center gap-2 mb-2">
            <HiX className="text-error" />
            <h4 className="font-semibold text-error">Cons</h4>
          </div>
          <ul className="text-sm space-y-1 text-base-content/70">
            <li>• Hidden components stay in DOM (memory)</li>
            <li>• Effects keep running (timers, subscriptions)</li>
            <li>• All tabs render on initial mount</li>
            <li>• Accessibility concerns (hidden content)</li>
          </ul>
        </div>
      </div>

      {/* When to use */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-1">When to use CSS hiding</p>
            <p className="text-base-content/70 text-sm">
              CSS hiding works well for <strong>small numbers of tabs</strong> with{' '}
              <strong>lightweight content</strong>. For many tabs or heavy components, consider
              lifting state up or using a state management solution instead.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

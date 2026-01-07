// ============================================
// Render Props Basics Demo
// Shows what render props are and why they're useful
// ============================================

import { useState, ReactNode } from 'react';
import { HiX, HiCheck, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import hardcodedCode from './examples/HardcodedComponent.tsx?raw';
import renderPropCode from './examples/RenderPropComponent.tsx?raw';

// ---- WITHOUT Render Props (hardcoded output) ----
function CounterHardcoded() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-4 bg-base-300 rounded-lg text-center">
      <p className="text-2xl font-bold">{count}</p>
      <button onClick={() => setCount((c) => c + 1)} className="btn btn-primary btn-sm mt-2">
        Increment
      </button>
    </div>
  );
}

// ---- WITH Render Props (flexible output) ----
interface CounterProps {
  render: (count: number, increment: () => void) => ReactNode;
}

function Counter({ render }: CounterProps) {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);

  // Let the consumer decide how to render!
  return <>{render(count, increment)}</>;
}

export default function RenderPropsBasicsDemo() {
  const [activeTab, setActiveTab] = useState<'hardcoded' | 'render-prop'>('hardcoded');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('hardcoded')}
          className={`btn btn-sm ${activeTab === 'hardcoded' ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} />
          Hardcoded (Rigid)
        </button>
        <button
          onClick={() => setActiveTab('render-prop')}
          className={`btn btn-sm ${activeTab === 'render-prop' ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          Render Prop (Flexible)
        </button>
      </div>

      {/* Content */}
      {activeTab === 'hardcoded' ? (
        <div className="space-y-4">
          <CodeSnippet title="Hardcoded component" language="tsx" code={hardcodedCode} />

          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Live Demo: You're Stuck with This</h4>
            <CounterHardcoded />
            <p className="text-xs text-base-content/60 mt-3">
              Want a different look? Too bad - you'd need to create a whole new component.
            </p>
          </div>

          <div className="card bg-error/10 border border-error p-4">
            <h4 className="font-semibold text-error flex items-center gap-2 mb-2">
              <HiX size={18} />
              The Problem
            </h4>
            <ul className="text-sm space-y-1 text-base-content/80">
              <li>• The component decides how it looks</li>
              <li>• Can't reuse the counter logic with different UI</li>
              <li>• Would need to duplicate code for variations</li>
              <li>• Tightly couples logic and presentation</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <CodeSnippet title="Render prop component" language="tsx" code={renderPropCode} />

          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Live Demo: Same Logic, Different UIs</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Style 1: Simple */}
              <Counter
                render={(count, increment) => (
                  <div className="p-4 bg-base-300 rounded-lg text-center">
                    <p className="text-sm text-base-content/60">Simple</p>
                    <p className="text-2xl font-bold text-primary">{count}</p>
                    <button onClick={increment} className="btn btn-primary btn-sm mt-2">
                      +1
                    </button>
                  </div>
                )}
              />

              {/* Style 2: Badge style */}
              <Counter
                render={(count, increment) => (
                  <div className="p-4 bg-base-300 rounded-lg text-center">
                    <p className="text-sm text-base-content/60">Badge Style</p>
                    <span className="badge badge-lg badge-secondary text-xl my-2">{count}</span>
                    <button onClick={increment} className="btn btn-secondary btn-sm block mx-auto">
                      Increment
                    </button>
                  </div>
                )}
              />

              {/* Style 3: Inline */}
              <Counter
                render={(count, increment) => (
                  <div className="p-4 bg-base-300 rounded-lg">
                    <p className="text-sm text-base-content/60 mb-2">Inline</p>
                    <div className="flex items-center gap-2">
                      <button onClick={increment} className="btn btn-circle btn-sm btn-accent">
                        +
                      </button>
                      <span className="text-lg">
                        Clicked <strong className="text-accent">{count}</strong> times
                      </span>
                    </div>
                  </div>
                )}
              />
            </div>
            <p className="text-xs text-base-content/60 mt-3">
              All three use the same Counter component — only the render function differs!
            </p>
          </div>

          <div className="card bg-success/10 border border-success p-4">
            <h4 className="font-semibold text-success flex items-center gap-2 mb-2">
              <HiCheck size={18} />
              The Solution
            </h4>
            <ul className="text-sm space-y-1 text-base-content/80">
              <li>• Component handles the logic (state, handlers)</li>
              <li>• Consumer decides the presentation via render function</li>
              <li>• Reuse the same logic with completely different UIs</li>
              <li>• Clean separation of concerns</li>
            </ul>
          </div>
        </div>
      )}

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">The Core Idea</h4>
            <p className="text-sm text-base-content/70">
              A render prop is a <strong className="text-primary">function that returns JSX</strong>
              . The component calls this function, passing it the data/handlers it manages. The
              function then renders whatever it wants with that data.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

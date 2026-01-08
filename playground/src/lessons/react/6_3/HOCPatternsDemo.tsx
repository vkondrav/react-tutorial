// ============================================
// HOC Patterns Demo
// Shows conventions and best practices
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import namingCode from './examples/NamingConvention.tsx?raw';
import displayNameCode from './examples/DisplayName.tsx?raw';
import passPropsCode from './examples/PassProps.tsx?raw';
import dontMutateCode from './examples/DontMutate.tsx?raw';
import composeCode from './examples/ComposeHOCs.tsx?raw';

interface ConventionCardProps {
  title: string;
  good: boolean;
  children: React.ReactNode;
}

function ConventionCard({ title, good, children }: ConventionCardProps) {
  return (
    <div
      className={`card p-4 ${good ? 'bg-success/10 border border-success' : 'bg-error/10 border border-error'}`}
    >
      <h5
        className={`font-semibold flex items-center gap-2 mb-2 ${good ? 'text-success' : 'text-error'}`}
      >
        {good ? <HiCheck size={18} /> : <HiX size={18} />}
        {title}
      </h5>
      <div className="text-sm">{children}</div>
    </div>
  );
}

export default function HOCPatternsDemo() {
  const [activePattern, setActivePattern] = useState<
    'naming' | 'displayName' | 'props' | 'mutate' | 'compose'
  >('naming');

  const patterns = [
    { id: 'naming', label: 'Naming Convention' },
    { id: 'displayName', label: 'Display Name' },
    { id: 'props', label: 'Pass Props' },
    { id: 'mutate', label: "Don't Mutate" },
    { id: 'compose', label: 'Composition' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Pattern Tabs */}
      <div className="flex gap-2 flex-wrap">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePattern(p.id)}
            className={`btn btn-sm ${activePattern === p.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Naming Convention */}
      {activePattern === 'naming' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">1. Use "with" Prefix</h4>
            <p className="text-sm text-base-content/70 mb-4">
              Name your HOCs with a <code className="text-secondary">with</code> prefix. This
              immediately tells developers it's an HOC and what it adds.
            </p>
            <CodeSnippet title="Naming convention" language="tsx" code={namingCode} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConventionCard title="Good Names" good>
              <ul className="space-y-1">
                <li>
                  <code>withAuth</code> - adds authentication
                </li>
                <li>
                  <code>withTheme</code> - adds theme support
                </li>
                <li>
                  <code>withRouter</code> - adds routing
                </li>
                <li>
                  <code>withLoading</code> - adds loading state
                </li>
              </ul>
            </ConventionCard>
            <ConventionCard title="Avoid" good={false}>
              <ul className="space-y-1">
                <li>
                  <code>enhance</code> - too vague
                </li>
                <li>
                  <code>wrap</code> - doesn't describe what
                </li>
                <li>
                  <code>make</code> - unclear purpose
                </li>
                <li>
                  <code>create</code> - confusing with factories
                </li>
              </ul>
            </ConventionCard>
          </div>
        </div>
      )}

      {/* Display Name */}
      {activePattern === 'displayName' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">2. Set displayName for Debugging</h4>
            <p className="text-sm text-base-content/70 mb-4">
              React DevTools shows component names. Without displayName, wrapped components appear
              as "Unknown" or the generic wrapper name.
            </p>
            <CodeSnippet title="Setting displayName" language="tsx" code={displayNameCode} />
          </div>

          <div className="card bg-base-300 p-4">
            <h5 className="font-semibold mb-3">React DevTools Preview</h5>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-error/10 rounded p-3">
                <p className="text-xs text-error mb-2">❌ Without displayName</p>
                <div className="font-mono text-xs space-y-1 text-base-content/70">
                  <p>▸ &lt;Unknown&gt;</p>
                  <p className="pl-4">▸ &lt;Unknown&gt;</p>
                  <p className="pl-8">▸ &lt;Dashboard&gt;</p>
                </div>
              </div>
              <div className="bg-success/10 rounded p-3">
                <p className="text-xs text-success mb-2">✅ With displayName</p>
                <div className="font-mono text-xs space-y-1 text-base-content/70">
                  <p>▸ &lt;WithAuth(Dashboard)&gt;</p>
                  <p className="pl-4">▸ &lt;WithTheme(Dashboard)&gt;</p>
                  <p className="pl-8">▸ &lt;Dashboard&gt;</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pass Props Through */}
      {activePattern === 'props' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">3. Pass Through Unrelated Props</h4>
            <p className="text-sm text-base-content/70 mb-4">
              HOCs should be <strong className="text-primary">transparent</strong> — pass all props
              to the wrapped component except those the HOC consumes.
            </p>
            <CodeSnippet title="Passing props" language="tsx" code={passPropsCode} />
          </div>

          <div className="card bg-warning/10 border border-warning p-4">
            <div className="flex gap-3">
              <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
              <div>
                <h5 className="font-semibold mb-1">Use Spread Operator</h5>
                <p className="text-sm text-base-content/70">
                  Always use <code className="text-secondary">{'{...props}'}</code> to forward
                  props. This ensures the wrapped component receives everything it needs, even props
                  you didn't anticipate.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Don't Mutate */}
      {activePattern === 'mutate' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">4. Don't Mutate the Original Component</h4>
            <p className="text-sm text-base-content/70 mb-4">
              HOCs should use <strong className="text-primary">composition</strong>, not mutation.
              Never modify the original component — return a new one.
            </p>
            <CodeSnippet title="Composition vs mutation" language="tsx" code={dontMutateCode} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ConventionCard title="Composition (Good)" good>
              <p>
                Creates a new component that wraps the original. The original is unchanged and can
                be used elsewhere without side effects.
              </p>
            </ConventionCard>
            <ConventionCard title="Mutation (Bad)" good={false}>
              <p>
                Modifies the original component directly. This causes unpredictable behavior and
                breaks component isolation.
              </p>
            </ConventionCard>
          </div>
        </div>
      )}

      {/* Composition */}
      {activePattern === 'compose' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">5. Composing Multiple HOCs</h4>
            <p className="text-sm text-base-content/70 mb-4">
              HOCs can be <strong className="text-primary">stacked</strong> on top of each other.
              Use utility functions to make this more readable.
            </p>
            <CodeSnippet title="Composing HOCs" language="tsx" code={composeCode} />
          </div>

          <div className="card bg-base-300 p-4">
            <h5 className="font-semibold mb-3">Execution Order</h5>
            <div className="text-sm text-base-content/70 mb-4">
              HOCs execute <strong className="text-primary">right to left</strong> (innermost
              first):
            </div>
            <div className="font-mono text-sm bg-base-200 rounded p-3">
              <p className="text-base-content/60">// This:</p>
              <p>withAuth(withTheme(withLogging(MyComponent)))</p>
              <p className="mt-2 text-base-content/60">// Is equivalent to:</p>
              <p>1. LoggedComponent = withLogging(MyComponent)</p>
              <p>2. ThemedComponent = withTheme(LoggedComponent)</p>
              <p>3. FinalComponent = withAuth(ThemedComponent)</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// UseClientDirectiveDemo: The "use client" Directive
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiOutlineExclamationCircle, HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import useClientBoundaryCode from './examples/UseClientBoundary.tsx?raw';
import useClientGotchasCode from './examples/UseClientGotchas.tsx?raw';

export default function UseClientDirectiveDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'syntax' | 'boundary' | 'gotchas'>('syntax');

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('syntax')}
          className={`btn btn-sm ${activeTab === 'syntax' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Syntax
        </button>
        <button
          onClick={() => setActiveTab('boundary')}
          className={`btn btn-sm ${activeTab === 'boundary' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Boundary Behavior
        </button>
        <button
          onClick={() => setActiveTab('gotchas')}
          className={`btn btn-sm ${activeTab === 'gotchas' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Common Gotchas
        </button>
      </div>

      {/* Tab content */}
      <div className="card bg-base-300 p-6">
        {activeTab === 'syntax' && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-2">The Directive Syntax</h4>

            <div className="bg-base-200 rounded-lg p-4">
              <div className="font-mono text-lg text-center mb-4">
                <span className="text-secondary">"use client"</span>
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-start gap-2">
                  <HiCheck className="text-success shrink-0 mt-0.5" size={16} />
                  <span>
                    Must be at the <strong>very top</strong> of the file (before imports)
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <HiCheck className="text-success shrink-0 mt-0.5" size={16} />
                  <span>
                    Uses double quotes: <code className="text-secondary">"use client"</code>
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <HiCheck className="text-success shrink-0 mt-0.5" size={16} />
                  <span>Marks the entire file as a Client Component</span>
                </li>
                <li className="flex items-start gap-2">
                  <HiCheck className="text-success shrink-0 mt-0.5" size={16} />
                  <span>All components exported from this file are Client Components</span>
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <div className="font-semibold text-success mb-2 flex items-center gap-2">
                  <HiCheck size={16} />
                  Correct
                </div>
                <pre className="text-xs font-mono bg-base-200 rounded p-2">
                  {`"use client";

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}`}
                </pre>
              </div>

              <div className="bg-error/10 border border-error/30 rounded-lg p-4">
                <div className="font-semibold text-error mb-2 flex items-center gap-2">
                  <HiX size={16} />
                  Wrong
                </div>
                <pre className="text-xs font-mono bg-base-200 rounded p-2">
                  {`import { useState } from 'react';

"use client"; // ❌ Too late!

export function Counter() {
  // Error: useState not available
}`}
                </pre>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'boundary' && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-2">How the Boundary Works</h4>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
              <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={20} />
              <p className="text-sm">
                <strong className="text-primary">Key insight:</strong> When you mark a file with{' '}
                <code className="text-secondary">"use client"</code>, everything that file imports
                also becomes part of the client bundle. It creates a "client boundary".
              </p>
            </div>

            <CodeSnippet
              title="Client Boundary Effect"
              language="tsx"
              code={useClientBoundaryCode}
            />

            <div className="bg-base-200 rounded-lg p-4">
              <h5 className="font-semibold mb-2 text-sm">What gets bundled for the client?</h5>
              <ul className="text-sm space-y-2 text-base-content/70">
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>
                    The <code className="text-secondary">"use client"</code> file itself
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>All modules it imports (and their imports, recursively)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-purple-400">→</span>
                  <span>BUT NOT: Server Components passed as children/props</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'gotchas' && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <HiOutlineExclamationCircle className="text-warning" size={20} />
              Common Gotchas
            </h4>

            <CodeSnippet title="Common Mistakes" language="tsx" code={useClientGotchasCode} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">❌ Don't</h5>
                <ul className="text-xs space-y-2 text-base-content/70">
                  <li>• Import heavy libraries in client components unnecessarily</li>
                  <li>• Pass functions as props from Server → Client</li>
                  <li>• Try to use server-only APIs in client components</li>
                  <li>• Add "use client" to components that don't need it</li>
                </ul>
              </div>
              <div className="bg-base-200 rounded-lg p-4">
                <h5 className="font-semibold text-sm mb-2">✅ Do</h5>
                <ul className="text-xs space-y-2 text-base-content/70">
                  <li>• Keep client components small and focused</li>
                  <li>• Pass serializable data (strings, numbers, arrays, objects)</li>
                  <li>• Use Server Actions for form handling</li>
                  <li>• Push "use client" boundary down as far as possible</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

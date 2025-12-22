// ============================================
// EventHandlersDemo - Different Handler Patterns
// ============================================

import { useState } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import inlineArrowExample from './examples/InlineArrowExample.tsx?raw';
import functionReferenceExample from './examples/FunctionReferenceExample.tsx?raw';
import passingArgumentsExample from './examples/PassingArgumentsExample.tsx?raw';

// ============================================
// Types
// ============================================

type Tab = 'inline' | 'function' | 'arguments';

interface TabConfig {
  id: Tab;
  label: string;
}

// ============================================
// Constants
// ============================================

const TABS: TabConfig[] = [
  { id: 'inline', label: 'Inline Arrow' },
  { id: 'function', label: 'Function Reference' },
  { id: 'arguments', label: 'Passing Arguments' },
];

// ============================================
// Main Component
// ============================================

export default function EventHandlersDemo(): React.ReactElement {
  const [count1, setCount1] = useState<number>(0);
  const [count2, setCount2] = useState<number>(0);
  const [count3, setCount3] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<Tab>('inline');

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b border-base-300">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-3 border-none cursor-pointer font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-base-300 border-b-2 border-b-primary text-primary'
                : 'bg-transparent border-b-2 border-b-transparent text-base-content/50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'inline' && (
          <>
            <div className="mb-6">
              <p className="text-base-content/70 text-sm m-0">
                Define the handler function directly in JSX using an arrow function:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-base-content/50 text-xs mb-3">CODE:</div>
                <CodeSnippet code={inlineArrowExample} language="tsx" showCopy={false} />
              </div>
              <div>
                <div className="text-base-content/50 text-xs mb-3">LIVE:</div>
                <button
                  onClick={() => setCount1((prev) => prev + 1)}
                  className="btn btn-primary w-full"
                >
                  Click me ({count1})
                </button>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/10 rounded-lg text-base-content/70 text-sm">
              <HiCheck className="inline text-primary mr-1" size={16} />
              <strong>Good for:</strong> Simple, one-line handlers. Easy to read.
            </div>
          </>
        )}

        {activeTab === 'function' && (
          <>
            <div className="mb-6">
              <p className="text-base-content/70 text-sm m-0">
                Define the handler function separately, then pass the reference:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-base-content/50 text-xs mb-3">CODE:</div>
                <CodeSnippet code={functionReferenceExample} language="tsx" showCopy={false} />
              </div>
              <div>
                <div className="text-base-content/50 text-xs mb-3">LIVE:</div>
                <button
                  onClick={() => {
                    const handleClick = (): void => setCount2((prev) => prev + 1);
                    handleClick();
                  }}
                  className="btn btn-success w-full"
                >
                  Click me ({count2})
                </button>
              </div>
            </div>
            <div className="mt-4 p-3 bg-success/10 rounded-lg text-base-content/70 text-sm">
              <HiCheck className="inline text-success mr-1" size={16} />
              <strong>Good for:</strong> Reusable handlers, complex logic, better performance
              (function isn't recreated on each render).
            </div>
          </>
        )}

        {activeTab === 'arguments' && (
          <>
            <div className="mb-6">
              <p className="text-base-content/70 text-sm m-0">
                To pass arguments to an event handler, wrap it in an arrow function:
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <div className="text-base-content/50 text-xs mb-3">CODE:</div>
                <CodeSnippet code={passingArgumentsExample} language="tsx" showCopy={false} />
              </div>
              <div>
                <div className="text-base-content/50 text-xs mb-3">LIVE:</div>
                <div className="flex flex-col gap-2">
                  {[1, 2, 3].map((id) => (
                    <button
                      key={id}
                      onClick={() => {
                        setCount3((prev) => prev + id);
                        console.log('Clicked item', id);
                      }}
                      className="btn btn-secondary btn-sm"
                    >
                      Delete Item {id} (check console)
                    </button>
                  ))}
                </div>
                <div className="mt-3 text-xs text-base-content/50">
                  Total: <span className="text-secondary">{count3}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-secondary/10 rounded-lg text-base-content/70 text-sm">
              <HiCheck className="inline text-secondary mr-1" size={16} />
              <strong>Pattern:</strong>{' '}
              <code className="text-secondary">{'onClick={() => handleDelete(id)}'}</code> - wrap in
              arrow function to pass arguments.
            </div>
          </>
        )}
      </div>

      {/* Common mistakes */}
      <div className="px-6 py-4 bg-error/10 border-t border-error">
        <div className="text-error text-sm mb-2 font-semibold flex items-center gap-2">
          <HiX size={16} />
          Common Mistakes:
        </div>
        <div className="text-xs text-base-content/70 leading-relaxed space-y-1">
          <div>
            <HiX className="inline text-error mr-1" size={12} />
            <code className="text-error">onClick=&#123;handleClick()&#125;</code> - Calls function
            immediately!
          </div>
          <div>
            <HiCheck className="inline text-success mr-1" size={12} />
            <code className="text-success">onClick=&#123;handleClick&#125;</code> - Passes function
            reference
          </div>
          <div className="mt-2">
            <HiX className="inline text-error mr-1" size={12} />
            <code className="text-error">onClick=&#123;handleDelete(id)&#125;</code> - Calls
            function immediately!
          </div>
          <div>
            <HiCheck className="inline text-success mr-1" size={12} />
            <code className="text-success">onClick=&#123;() =&gt; handleDelete(id)&#125;</code> -
            Wraps in arrow function
          </div>
        </div>
      </div>
    </div>
  );
}

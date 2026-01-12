// ============================================
// ServerVsClientDemo: Server vs Client Components
// ============================================

import { useState } from 'react';
import { HiOutlineServer, HiOutlineDesktopComputer, HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import compositionPatternCode from './examples/CompositionPattern.tsx?raw';

interface FeatureRow {
  feature: string;
  server: boolean;
  client: boolean;
  note?: string;
}

const FEATURES: FeatureRow[] = [
  { feature: 'Render to HTML', server: true, client: true },
  { feature: 'async/await in component', server: true, client: false, note: 'Only Server' },
  { feature: 'Direct database access', server: true, client: false },
  { feature: 'File system access', server: true, client: false },
  { feature: 'Access environment secrets', server: true, client: false },
  { feature: 'useState / useReducer', server: false, client: true, note: 'Only Client' },
  { feature: 'useEffect / useLayoutEffect', server: false, client: true },
  { feature: 'Event handlers (onClick, etc)', server: false, client: true },
  { feature: 'Browser APIs (window, document)', server: false, client: true },
  { feature: 'Custom hooks with state', server: false, client: true },
  { feature: 'useContext', server: false, client: true },
  { feature: 'Zero JS bundle cost', server: true, client: false, note: 'Server wins' },
];

export default function ServerVsClientDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'comparison' | 'composition' | 'boundary'>(
    'comparison'
  );

  return (
    <div className="space-y-4">
      {/* Tab buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('comparison')}
          className={`btn btn-sm ${activeTab === 'comparison' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Comparison Table
        </button>
        <button
          onClick={() => setActiveTab('composition')}
          className={`btn btn-sm ${activeTab === 'composition' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Composition Pattern
        </button>
        <button
          onClick={() => setActiveTab('boundary')}
          className={`btn btn-sm ${activeTab === 'boundary' ? 'btn-primary' : 'btn-ghost'}`}
        >
          The Boundary Rule
        </button>
      </div>

      {/* Tab content */}
      <div className="card bg-base-300 p-6">
        {activeTab === 'comparison' && (
          <div>
            <h4 className="font-semibold mb-4 flex items-center gap-4">
              <span className="flex items-center gap-2">
                <HiOutlineServer className="text-blue-400" size={20} />
                Server
              </span>
              <span className="text-base-content/30">vs</span>
              <span className="flex items-center gap-2">
                <HiOutlineDesktopComputer className="text-purple-400" size={20} />
                Client
              </span>
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-base-content/10">
                    <th className="text-left py-2 px-3">Feature</th>
                    <th className="text-center py-2 px-3 text-blue-400">Server</th>
                    <th className="text-center py-2 px-3 text-purple-400">Client</th>
                    <th className="text-left py-2 px-3 text-base-content/50">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURES.map((row, i) => (
                    <tr key={i} className="border-b border-base-content/5">
                      <td className="py-2 px-3">{row.feature}</td>
                      <td className="text-center py-2 px-3">
                        {row.server ? (
                          <HiCheck className="text-success inline" size={18} />
                        ) : (
                          <HiX className="text-error inline" size={18} />
                        )}
                      </td>
                      <td className="text-center py-2 px-3">
                        {row.client ? (
                          <HiCheck className="text-success inline" size={18} />
                        ) : (
                          <HiX className="text-error inline" size={18} />
                        )}
                      </td>
                      <td className="py-2 px-3 text-base-content/50 text-xs">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'composition' && (
          <div className="space-y-4">
            <p className="text-sm text-base-content/70">
              Server and Client Components can be composed together. A common pattern is to use
              Server Components for data fetching and static content, with Client Components for
              interactive parts.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              {/* Visual diagram */}
              <div className="flex-1 bg-base-200 rounded-lg p-4">
                <div className="text-xs font-mono text-base-content/50 mb-2">Component Tree</div>
                <div className="space-y-2 text-sm">
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2 flex items-center gap-2">
                    <HiOutlineServer className="text-blue-400" size={16} />
                    <span className="text-blue-400">ProductPage</span>
                    <span className="text-xs text-base-content/50">(Server)</span>
                  </div>
                  <div className="ml-4 space-y-2">
                    <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2 flex items-center gap-2">
                      <HiOutlineServer className="text-blue-400" size={16} />
                      <span className="text-blue-400">ProductDetails</span>
                      <span className="text-xs text-base-content/50">(Server)</span>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2 flex items-center gap-2">
                      <HiOutlineDesktopComputer className="text-purple-400" size={16} />
                      <span className="text-purple-400">AddToCart</span>
                      <span className="text-xs text-base-content/50">(Client)</span>
                    </div>
                    <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2 flex items-center gap-2">
                      <HiOutlineDesktopComputer className="text-purple-400" size={16} />
                      <span className="text-purple-400">ImageGallery</span>
                      <span className="text-xs text-base-content/50">(Client)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Code example */}
              <div className="flex-1">
                <CodeSnippet
                  title="Composition Pattern"
                  language="tsx"
                  code={compositionPatternCode}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'boundary' && (
          <div className="space-y-4">
            <h4 className="font-semibold mb-2">The Critical Rule: Boundary Direction</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Allowed */}
              <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HiCheck className="text-success" size={20} />
                  <span className="font-semibold text-success">Allowed</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">Server</span>
                    <span>→</span>
                    <span className="text-purple-400">Client</span>
                  </div>
                  <p className="text-base-content/70 text-xs">
                    Server Components can render Client Components as children. The Server Component
                    passes serializable props to the Client Component.
                  </p>
                  <div className="bg-base-200 rounded p-2 font-mono text-xs">
                    {`// Server Component
<ProductPage>
  <AddToCart /> {/* Client */}
</ProductPage>`}
                  </div>
                </div>
              </div>

              {/* Not Allowed */}
              <div className="bg-error/10 border border-error/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <HiX className="text-error" size={20} />
                  <span className="font-semibold text-error">Not Allowed</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">Client</span>
                    <span>→</span>
                    <span className="text-blue-400">Server</span>
                    <span className="text-error">(import)</span>
                  </div>
                  <p className="text-base-content/70 text-xs">
                    Client Components cannot import Server Components. The client bundle can't
                    include server-only code like database calls.
                  </p>
                  <div className="bg-base-200 rounded p-2 font-mono text-xs text-error">
                    {`// ❌ Client Component
"use client"
import ServerComp from './ServerComp'
// Error! Can't import server code`}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
              <p className="text-sm">
                <strong className="text-primary">The workaround:</strong> Pass Server Components as{' '}
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="text-secondary">children</code> props to Client Components. This
                way the Server Component is rendered on the server and passed as pre-rendered
                content.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

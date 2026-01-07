// ============================================
// RSCBasicsDemo: What are React Server Components?
// ============================================

import { useState } from 'react';
import {
  HiOutlineServer,
  HiOutlineDesktopComputer,
  HiOutlineLightBulb,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import serverComponentCode from './examples/ServerComponent.tsx?raw';
import clientComponentCode from './examples/ClientComponent.tsx?raw';

export default function RSCBasicsDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Visual explanation */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4 text-center">The Evolution of React Rendering</h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* CSR */}
          <div className="card bg-base-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineDesktopComputer className="text-warning" size={20} />
              <span className="font-semibold text-warning">CSR</span>
            </div>
            <p className="text-sm text-base-content/70 mb-2">Client-Side Rendering</p>
            <ul className="text-xs space-y-1 text-base-content/60">
              <li>• All JS sent to browser</li>
              <li>• Renders in browser</li>
              <li>• Slow initial load</li>
            </ul>
          </div>

          {/* SSR */}
          <div className="card bg-base-200 p-4">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineServer className="text-info" size={20} />
              <span className="font-semibold text-info">SSR</span>
            </div>
            <p className="text-sm text-base-content/70 mb-2">Server-Side Rendering</p>
            <ul className="text-xs space-y-1 text-base-content/60">
              <li>• HTML rendered on server</li>
              <li>• All JS still sent to client</li>
              <li>• Hydration required</li>
            </ul>
          </div>

          {/* RSC */}
          <div className="card bg-base-200 p-4 border-2 border-primary">
            <div className="flex items-center gap-2 mb-2">
              <HiOutlineServer className="text-primary" size={20} />
              <span className="font-semibold text-primary">RSC</span>
            </div>
            <p className="text-sm text-base-content/70 mb-2">Server Components</p>
            <ul className="text-xs space-y-1 text-base-content/60">
              <li>• Server code stays on server</li>
              <li>• Only client JS sent</li>
              <li>• Zero JS for static parts</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="bg-primary/10 border border-primary/30 rounded-lg p-4 flex items-start gap-3">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={20} />
        <div>
          <p className="text-sm leading-relaxed">
            <strong className="text-primary">The key insight:</strong> Not all components need
            interactivity. A blog post, a product description, or a navigation menu can be rendered
            once on the server and never change. RSC let you keep these components entirely
            server-side, reducing JavaScript sent to the browser.
          </p>
        </div>
      </div>

      {/* Mental Model */}
      <div className="card bg-base-300 p-6">
        <h4 className="font-semibold mb-4">Mental Model: Two Worlds</h4>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 bg-linear-to-br from-blue-900/20 to-blue-800/10 rounded-lg p-4 border border-blue-500/30">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineServer className="text-blue-400" size={24} />
              <span className="font-semibold text-blue-400">Server World</span>
            </div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Direct database access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>File system access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>API keys / secrets</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>async/await in components</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/50">
                <span className="text-error">✗</span>
                <span>No useState, useEffect</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/50">
                <span className="text-error">✗</span>
                <span>No onClick, onChange</span>
              </li>
            </ul>
          </div>

          <div className="flex items-center justify-center text-2xl text-base-content/30">→</div>

          <div className="flex-1 bg-linear-to-br from-purple-900/20 to-purple-800/10 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 mb-3">
              <HiOutlineDesktopComputer className="text-purple-400" size={24} />
              <span className="font-semibold text-purple-400">Client World</span>
            </div>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>useState, useEffect</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Event handlers</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Browser APIs</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-success">✓</span>
                <span>Real-time updates</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/50">
                <span className="text-error">✗</span>
                <span>No direct DB access</span>
              </li>
              <li className="flex items-center gap-2 text-base-content/50">
                <span className="text-error">✗</span>
                <span>No server secrets</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost gap-2">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Example Code
      </button>

      {showCode && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CodeSnippet title="Server Component" language="tsx" code={serverComponentCode} />
          <CodeSnippet title="Client Component" language="tsx" code={clientComponentCode} />
        </div>
      )}
    </div>
  );
}

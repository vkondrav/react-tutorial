// ============================================
// RSCPlayground: Interactive RSC Patterns
// ============================================

import { useState, useRef } from 'react';
import {
  HiOutlineServer,
  HiOutlineDesktopComputer,
  HiOutlineLightBulb,
  HiOutlineCode,
  HiOutlinePlay,
  HiOutlineRefresh,
  HiOutlineExternalLink,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import patternDataFetchingCode from './examples/PatternDataFetching.tsx?raw';
import patternInteractiveIslandCode from './examples/PatternInteractiveIsland.tsx?raw';
import patternChildrenPassthroughCode from './examples/PatternChildrenPassthrough.tsx?raw';

type PatternTab =
  | 'live-demo'
  | 'data-fetching'
  | 'interactive-island'
  | 'children-passthrough'
  | 'decision';

interface DecisionQuestion {
  question: string;
  yes: string;
  no: string;
}

const DECISION_QUESTIONS: DecisionQuestion[] = [
  {
    question: 'Does the component need useState, useEffect, or event handlers?',
    yes: 'Client Component',
    no: 'Server Component',
  },
  {
    question: 'Does it need browser APIs (window, document, localStorage)?',
    yes: 'Client Component',
    no: 'Server Component',
  },
  {
    question: 'Does it fetch data that could be done server-side?',
    yes: 'Server Component (use async/await)',
    no: 'Depends on other factors',
  },
  {
    question: 'Does it use a heavy library just for rendering (markdown, syntax)?',
    yes: 'Server Component (keep bundle small)',
    no: 'Either could work',
  },
];

export default function RSCPlayground(): React.ReactElement {
  const [activePattern, setActivePattern] = useState<PatternTab>('live-demo');
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    setError(null);
  };

  const handleError = () => {
    setError('Could not load RSC demo. Make sure the server is running (npm run ssr:dev).');
    setIsLoaded(true);
  };

  const refresh = () => {
    setIsLoaded(false);
    setError(null);
    if (iframeRef.current) {
      iframeRef.current.src = '/rsc-demo?' + Date.now();
    }
  };

  return (
    <div className="space-y-4">
      {/* Pattern tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActivePattern('live-demo')}
          className={`btn btn-sm ${activePattern === 'live-demo' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlinePlay size={16} />
          Live Demo
        </button>
        <button
          onClick={() => setActivePattern('data-fetching')}
          className={`btn btn-sm ${activePattern === 'data-fetching' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineServer size={16} />
          Data Fetching
        </button>
        <button
          onClick={() => setActivePattern('interactive-island')}
          className={`btn btn-sm ${activePattern === 'interactive-island' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineDesktopComputer size={16} />
          Interactive Island
        </button>
        <button
          onClick={() => setActivePattern('children-passthrough')}
          className={`btn btn-sm ${activePattern === 'children-passthrough' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineCode size={16} />
          Children Passthrough
        </button>
        <button
          onClick={() => setActivePattern('decision')}
          className={`btn btn-sm ${activePattern === 'decision' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineLightBulb size={16} />
          Decision Guide
        </button>
      </div>

      {/* Pattern content */}
      <div className="card bg-base-300 p-6">
        {activePattern === 'live-demo' && (
          <div className="space-y-4">
            {/* Instructions */}
            <div className="p-4 bg-info/10 border border-info/20 rounded-lg">
              <h4 className="font-semibold text-info mb-2 flex items-center gap-2">
                <HiOutlineExclamationCircle size={18} />
                Setup Required
              </h4>
              <p className="text-sm text-base-content/70 mb-2">
                To see the live RSC demo, make sure the SSR server is running:
              </p>
              <CodeSnippet code="npm run ssr:dev" language="bash" />
              <p className="text-xs text-base-content/50 mt-2">
                This starts both Vite (port 5173) and the Express server (port 3001) with proxy
                forwarding.
              </p>
            </div>

            {/* Controls */}
            <div className="flex gap-2">
              <button onClick={refresh} className="btn btn-primary btn-sm gap-2">
                <HiOutlineRefresh size={16} />
                Refresh
              </button>
              <a
                href="/rsc-demo"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm gap-2"
              >
                <HiOutlineExternalLink size={16} />
                Open in New Tab
              </a>
            </div>

            {/* Iframe Container */}
            <div className="border border-base-content/10 rounded-lg overflow-hidden">
              {/* Browser Chrome */}
              <div className="bg-base-200 px-3 py-2 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 bg-base-300 rounded px-3 py-1 text-xs text-base-content/50 flex items-center gap-2">
                  <span className="badge badge-xs badge-secondary">RSC</span>
                  localhost:5173/rsc-demo
                </div>
              </div>

              {/* Iframe or Error */}
              <div className="bg-gray-900 relative" style={{ height: '550px' }}>
                {!isLoaded && !error && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                    <div className="text-center">
                      <span className="loading loading-spinner loading-lg text-primary" />
                      <p className="mt-2 text-base-content/50">Loading RSC demo...</p>
                    </div>
                  </div>
                )}

                {error ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-900 p-8">
                    <div className="text-center max-w-md">
                      <div className="text-error text-5xl mb-4">⚠️</div>
                      <h3 className="text-lg font-semibold text-error mb-2">Server Not Running</h3>
                      <p className="text-base-content/70 mb-4">{error}</p>
                      <div className="bg-base-200 p-4 rounded-lg text-left">
                        <p className="text-sm font-semibold mb-2">To start the server:</p>
                        <code className="block bg-base-300 p-2 rounded text-sm font-mono">
                          cd playground && npm run ssr:dev
                        </code>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    src="/rsc-demo"
                    className="w-full h-full border-0"
                    title="RSC Demo"
                    onLoad={handleLoad}
                    onError={handleError}
                  />
                )}
              </div>
            </div>

            {/* What to look for */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-900/20 border border-blue-500/20 rounded-lg text-center">
                <HiOutlineServer className="text-blue-400 mx-auto mb-2" size={24} />
                <h4 className="font-semibold text-sm text-blue-400 mb-1">Server Components</h4>
                <p className="text-xs text-base-content/60">
                  Product details & recommendations are pure HTML - no JS
                </p>
              </div>
              <div className="p-4 bg-purple-900/20 border border-purple-500/20 rounded-lg text-center">
                <HiOutlineDesktopComputer className="text-purple-400 mx-auto mb-2" size={24} />
                <h4 className="font-semibold text-sm text-purple-400 mb-1">Client Island</h4>
                <p className="text-xs text-base-content/60">
                  Only the Add to Cart button has JavaScript
                </p>
              </div>
              <div className="p-4 bg-green-900/20 border border-green-500/20 rounded-lg text-center">
                <HiOutlineLightBulb className="text-green-400 mx-auto mb-2" size={24} />
                <h4 className="font-semibold text-sm text-green-400 mb-1">Check Console</h4>
                <p className="text-xs text-base-content/60">
                  Open DevTools to see bundle size comparison
                </p>
              </div>
            </div>
          </div>
        )}

        {activePattern === 'data-fetching' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <HiOutlineServer className="text-blue-400" size={20} />
                Pattern: Server-Side Data Fetching
              </h4>
              <p className="text-sm text-base-content/70">
                Server Components can fetch data directly using async/await. No useEffect, no
                loading state management, no race conditions.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CodeSnippet
                title="Server Component Data Fetching"
                language="tsx"
                code={patternDataFetchingCode}
              />

              <div className="space-y-4">
                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <h5 className="font-semibold text-success mb-2">Advantages</h5>
                  <ul className="text-sm space-y-1 text-base-content/70">
                    <li>• No waterfall fetching — data loads in parallel</li>
                    <li>• No client-side loading spinners for initial data</li>
                    <li>• Database calls without exposing credentials</li>
                    <li>• Results are cached and revalidated automatically</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <h5 className="font-semibold text-primary mb-2">When to Use</h5>
                  <ul className="text-sm space-y-1 text-base-content/70">
                    <li>• Page-level data loading</li>
                    <li>• Product details, blog posts, user profiles</li>
                    <li>• Any data needed for initial render</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePattern === 'interactive-island' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <HiOutlineDesktopComputer className="text-purple-400" size={20} />
                Pattern: Interactive Islands
              </h4>
              <p className="text-sm text-base-content/70">
                Keep most of your page as Server Components, with small Client Component "islands"
                for interactive parts. Minimize the client boundary.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CodeSnippet
                title="Interactive Island Pattern"
                language="tsx"
                code={patternInteractiveIslandCode}
              />

              <div className="space-y-4">
                <div className="bg-base-200 rounded-lg p-4">
                  <h5 className="font-semibold mb-2">Visual: Component Tree</h5>
                  <div className="text-sm space-y-2">
                    <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2">
                      <span className="text-blue-400">ArticlePage</span> (Server)
                    </div>
                    <div className="ml-4 space-y-2">
                      <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2">
                        <span className="text-blue-400">ArticleContent</span> (Server)
                      </div>
                      <div className="bg-blue-500/20 border border-blue-500/40 rounded p-2">
                        <span className="text-blue-400">AuthorBio</span> (Server)
                      </div>
                      <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2">
                        <span className="text-purple-400">LikeButton</span> (Client)
                        <span className="text-xs text-base-content/50 ml-2">← Island</span>
                      </div>
                      <div className="bg-purple-500/20 border border-purple-500/40 rounded p-2">
                        <span className="text-purple-400">CommentForm</span> (Client)
                        <span className="text-xs text-base-content/50 ml-2">← Island</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-success/10 border border-success/30 rounded-lg p-4">
                  <h5 className="font-semibold text-success mb-2">Result</h5>
                  <p className="text-sm text-base-content/70">
                    Most of the page is zero JS. Only the like button and comment form add to the
                    JavaScript bundle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePattern === 'children-passthrough' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <HiOutlineCode className="text-green-400" size={20} />
                Pattern: Children Passthrough
              </h4>
              <p className="text-sm text-base-content/70">
                Client Components can't import Server Components, but they can receive them as
                children. This lets you wrap Server content with Client interactivity.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <CodeSnippet
                title="Children Passthrough Pattern"
                language="tsx"
                code={patternChildrenPassthroughCode}
              />

              <div className="space-y-4">
                <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
                  <h5 className="font-semibold text-warning mb-2">Why This Works</h5>
                  <ul className="text-sm space-y-1 text-base-content/70">
                    <li>• Server Component is rendered on the server first</li>
                    <li>• Its HTML output is passed as a prop (children)</li>
                    <li>• Client Component just renders that HTML</li>
                    <li>• No server code in client bundle!</li>
                  </ul>
                </div>

                <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
                  <h5 className="font-semibold text-primary mb-2">Common Use Cases</h5>
                  <ul className="text-sm space-y-1 text-base-content/70">
                    <li>• Modal dialogs wrapping server content</li>
                    <li>• Collapsible sections with server-fetched data</li>
                    <li>• Carousels with server-rendered slides</li>
                    <li>• Tabs with server content in each panel</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePattern === 'decision' && (
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <HiOutlineLightBulb className="text-yellow-400" size={20} />
                Decision Guide: Server or Client?
              </h4>
              <p className="text-sm text-base-content/70">
                Use these questions to decide whether a component should be a Server or Client
                Component.
              </p>
            </div>

            <div className="space-y-3">
              {DECISION_QUESTIONS.map((q, index) => (
                <div key={index} className="bg-base-200 rounded-lg p-4">
                  <p className="font-medium mb-3">{q.question}</p>
                  <div className="flex gap-4">
                    <div className="flex-1 bg-purple-500/20 border border-purple-500/40 rounded p-2 text-center">
                      <div className="text-xs text-purple-400 mb-1">Yes →</div>
                      <div className="text-sm">{q.yes}</div>
                    </div>
                    <div className="flex-1 bg-blue-500/20 border border-blue-500/40 rounded p-2 text-center">
                      <div className="text-xs text-blue-400 mb-1">No →</div>
                      <div className="text-sm">{q.no}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-success/10 border border-success/30 rounded-lg p-4">
              <h5 className="font-semibold text-success mb-2">Golden Rule</h5>
              <p className="text-sm">
                <strong>Default to Server Components.</strong> Only add{' '}
                <code className="text-secondary">"use client"</code> when you actually need
                client-side interactivity. Push the client boundary down as far as possible.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Note about framework requirement */}
      <div className="bg-info/10 border border-info/30 rounded-lg p-4">
        <h5 className="font-semibold text-info mb-2">Framework Requirement</h5>
        <p className="text-sm text-base-content/70">
          React Server Components require a framework with RSC support. Currently, the main options
          are:
        </p>
        <ul className="text-sm mt-2 space-y-1">
          <li className="flex items-center gap-2">
            <span className="text-success">•</span>
            <strong>Next.js 13+ App Router</strong> — Full RSC support, most popular choice
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">•</span>
            <strong>Remix</strong> — RSC support coming (React Router 7+)
          </li>
          <li className="flex items-center gap-2">
            <span className="text-success">•</span>
            <strong>Waku</strong> — Minimal RSC framework for learning
          </li>
        </ul>
      </div>
    </div>
  );
}

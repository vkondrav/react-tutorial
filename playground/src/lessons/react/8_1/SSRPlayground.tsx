// ============================================
// SSR Playground - Live Demo with Iframe
// ============================================
// Embeds the actual SSR demo in an iframe
// ============================================

import { CodeSnippet } from '@lessons/components';
import { useState, useRef } from 'react';
import {
  HiOutlineRefresh,
  HiOutlineCode,
  HiOutlineExternalLink,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

export default function SSRPlayground(): React.ReactElement {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleLoad = () => {
    setIsLoaded(true);
    setError(null);
  };

  const handleError = () => {
    setError('Could not load SSR demo. Make sure the SSR server is running (npm run ssr:dev).');
    setIsLoaded(true);
  };

  const refresh = () => {
    setIsLoaded(false);
    if (iframeRef.current) {
      iframeRef.current.src = '/ssr-demo?' + Date.now();
    }
  };

  return (
    <div className="card bg-base-200 p-6">
      {/* Instructions */}
      <div className="mb-4 p-4 bg-info/10 border border-info/20 rounded-lg">
        <h4 className="font-semibold text-info mb-2 flex items-center gap-2">
          <HiOutlineExclamationCircle size={18} />
          Setup Required
        </h4>
        <p className="text-sm text-base-content/70 mb-2">
          To see the live SSR demo, you need to run the SSR server:
        </p>
        <CodeSnippet code="npm run ssr:dev" language="bash" />
        <p className="text-xs text-base-content/50 mt-2">
          This starts both Vite (port 5173) and the Express SSR server (port 3001) with proxy
          forwarding.
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-2 mb-4">
        <button onClick={refresh} className="btn btn-primary btn-sm gap-2">
          <HiOutlineRefresh size={16} />
          Refresh
        </button>
        <button
          onClick={() => setShowSource(!showSource)}
          className={`btn btn-sm gap-2 ${showSource ? 'btn-secondary' : 'btn-ghost'}`}
        >
          <HiOutlineCode size={16} />
          {showSource ? 'Hide Tips' : 'Show Tips'}
        </button>
        <a
          href="/ssr-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-ghost btn-sm gap-2"
        >
          <HiOutlineExternalLink size={16} />
          Open in New Tab
        </a>
      </div>

      {/* View Source Tips */}
      {showSource && (
        <div className="mb-4 p-4 bg-base-300 rounded-lg">
          <h4 className="font-semibold mb-2">How to Verify SSR</h4>
          <ol className="text-sm text-base-content/70 space-y-2">
            <li>
              <strong>1. View Page Source:</strong> Right-click the iframe → "View Frame Source".
              You'll see actual content in the HTML, not an empty div!
            </li>
            <li>
              <strong>2. Disable JavaScript:</strong> In DevTools, disable JS and refresh. With SSR,
              content still appears!
            </li>
            <li>
              <strong>3. Watch Network:</strong> The first request returns complete HTML. No
              separate data fetch needed.
            </li>
            <li>
              <strong>4. Check Console:</strong> Look for "Hydrating..." and "Hydration complete"
              messages.
            </li>
          </ol>
        </div>
      )}

      {/* Iframe Container */}
      <div className="border border-base-300 rounded-lg overflow-hidden">
        {/* Browser Chrome */}
        <div className="bg-base-300 px-3 py-2 flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
          </div>
          <div className="flex-1 bg-base-200 rounded px-3 py-1 text-xs text-base-content/50 flex items-center gap-2">
            <span className="badge badge-xs badge-primary">SSR</span>
            localhost:5173/ssr-demo
          </div>
        </div>

        {/* Iframe or Error */}
        <div className="bg-base-100 relative" style={{ height: '500px' }}>
          {!isLoaded && !error && (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100">
              <div className="text-center">
                <span className="loading loading-spinner loading-lg text-primary" />
                <p className="mt-2 text-base-content/50">Loading SSR demo...</p>
              </div>
            </div>
          )}

          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-base-100 p-8">
              <div className="text-center max-w-md">
                <div className="text-error text-5xl mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-error mb-2">SSR Server Not Running</h3>
                <p className="text-base-content/70 mb-4">{error}</p>
                <div className="bg-base-200 p-4 rounded-lg text-left">
                  <p className="text-sm font-semibold mb-2">To start the SSR server:</p>
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="block bg-base-300 p-2 rounded text-sm font-mono">
                    cd playground && npm run ssr:dev
                  </code>
                </div>
              </div>
            </div>
          ) : (
            <iframe
              ref={iframeRef}
              src="/ssr-demo"
              className="w-full h-full border-0"
              title="SSR Demo"
              onLoad={handleLoad}
              onError={handleError}
            />
          )}
        </div>
      </div>

      {/* Key Points */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 bg-base-300 rounded-lg text-center">
          <div className="text-2xl mb-2">⚡</div>
          <h4 className="font-semibold text-sm mb-1">Instant Content</h4>
          <p className="text-xs text-base-content/60">HTML arrives with content already rendered</p>
        </div>
        <div className="p-4 bg-base-300 rounded-lg text-center">
          <div className="text-2xl mb-2">🔍</div>
          <h4 className="font-semibold text-sm mb-1">SEO Ready</h4>
          <p className="text-xs text-base-content/60">
            Search engines see full content immediately
          </p>
        </div>
        <div className="p-4 bg-base-300 rounded-lg text-center">
          <div className="text-2xl mb-2">💧</div>
          <h4 className="font-semibold text-sm mb-1">Hydration</h4>
          <p className="text-xs text-base-content/60">React attaches to make it interactive</p>
        </div>
      </div>
    </div>
  );
}

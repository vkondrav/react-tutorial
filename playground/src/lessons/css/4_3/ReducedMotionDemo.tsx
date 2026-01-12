import { useState, useSyncExternalStore } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineRefresh, HiOutlineExclamation, HiOutlineCheck } from 'react-icons/hi';
import reducedMotionCode from './examples/ReducedMotion.css?raw';

// Custom hook to detect reduced motion preference
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    (callback) => {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      mediaQuery.addEventListener('change', callback);
      return () => mediaQuery.removeEventListener('change', callback);
    },
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    () => false // Server snapshot (SSR fallback)
  );
}

export default function ReducedMotionDemo(): React.ReactElement {
  const [simulateReducedMotion, setSimulateReducedMotion] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [spinnerKey, setSpinnerKey] = useState(0);

  // Detect actual system preference using useSyncExternalStore
  const systemPrefersReducedMotion = usePrefersReducedMotion();

  const isReducedMotion = simulateReducedMotion;

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* System Preference Indicator */}
      <div className="alert mb-6">
        <div className="flex items-center gap-2">
          {systemPrefersReducedMotion ? (
            <>
              <HiOutlineCheck className="text-primary" size={20} />
              <span>
                Your system has <strong>Reduce Motion</strong> enabled.
              </span>
            </>
          ) : (
            <>
              <HiOutlineExclamation className="text-warning" size={20} />
              <span>
                Your system allows motion. Toggle below to simulate{' '}
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="bg-base-200 px-1 rounded">prefers-reduced-motion</code>.
              </span>
            </>
          )}
        </div>
      </div>

      {/* Simulation Toggle */}
      <div className="flex items-center gap-4 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={simulateReducedMotion}
            onChange={(e) => setSimulateReducedMotion(e.target.checked)}
            className="toggle toggle-primary"
          />
          <span className="font-medium">Simulate Reduced Motion</span>
        </label>
        <span className={`badge ${isReducedMotion ? 'badge-warning' : 'badge-success'}`}>
          {isReducedMotion ? 'Motion Reduced' : 'Motion Enabled'}
        </span>
      </div>

      {/* Animation Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Spinner Example */}
        <div className="bg-base-300 rounded-lg p-6">
          <h4 className="font-semibold text-base-content mb-4 text-sm">Loading Spinner</h4>
          <div className="flex items-center justify-center h-24">
            <div
              key={spinnerKey}
              className={`w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full ${
                isReducedMotion ? '' : 'animate-spin'
              }`}
              style={{
                animation: isReducedMotion ? 'pulse 1.5s ease-in-out infinite' : undefined,
              }}
            />
          </div>
          <p className="text-xs text-base-content/50 text-center mt-4">
            {isReducedMotion
              ? 'Reduced: Gentle pulse instead of spin'
              : 'Normal: Continuous rotation'}
          </p>
        </div>

        {/* Slide-in Example */}
        <div className="bg-base-300 rounded-lg p-6">
          <h4 className="font-semibold text-base-content mb-4 text-sm flex items-center justify-between">
            Slide-in Animation
            <button
              onClick={() => setSpinnerKey((k) => k + 1)}
              className="btn btn-xs btn-ghost"
              title="Replay animation"
            >
              <HiOutlineRefresh size={14} />
            </button>
          </h4>
          <div className="overflow-hidden h-24 flex items-center justify-center">
            <div
              key={spinnerKey}
              className={`px-4 py-2 bg-primary text-primary-content rounded-lg font-medium ${
                isReducedMotion
                  ? 'animate-[fadeIn_0.2s_ease-out]'
                  : 'animate-[slideInRight_0.5s_ease-out]'
              }`}
              style={
                {
                  '--tw-enter-opacity': 'initial',
                  '--tw-enter-translate-x': 'initial',
                } as React.CSSProperties
              }
            >
              Welcome!
            </div>
          </div>
          <p className="text-xs text-base-content/50 text-center mt-4">
            {isReducedMotion ? 'Reduced: Simple fade-in' : 'Normal: Slide from right'}
          </p>
        </div>
      </div>

      {/* Hover Animation Example */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Hover Effects</h4>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            className={`px-6 py-3 bg-success text-success-content rounded-lg font-medium transition-all ${
              isReducedMotion
                ? 'hover:brightness-110'
                : 'hover:scale-105 hover:shadow-lg hover:shadow-success/30'
            }`}
            style={{
              transitionDuration: isReducedMotion ? '0.1s' : '0.3s',
            }}
          >
            Success
          </button>
          <button
            className={`px-6 py-3 bg-error text-error-content rounded-lg font-medium transition-all ${
              isReducedMotion
                ? 'hover:brightness-110'
                : 'hover:scale-105 hover:-translate-y-1 hover:shadow-lg hover:shadow-error/30'
            }`}
            style={{
              transitionDuration: isReducedMotion ? '0.1s' : '0.3s',
            }}
          >
            Delete
          </button>
          <button
            className={`px-6 py-3 bg-primary text-primary-content rounded-lg font-medium transition-all ${
              isReducedMotion
                ? 'hover:brightness-110'
                : 'hover:scale-105 hover:rotate-1 hover:shadow-lg hover:shadow-primary/30'
            }`}
            style={{
              transitionDuration: isReducedMotion ? '0.1s' : '0.3s',
            }}
          >
            Submit
          </button>
        </div>
        <p className="text-xs text-base-content/50 text-center mt-4">
          {isReducedMotion
            ? 'Reduced: Minimal brightness change only'
            : 'Normal: Scale, translate, rotate, and shadow effects'}
        </p>
      </div>

      {/* Best Practices */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Best Practices</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <HiOutlineCheck className="text-success mt-0.5 shrink-0" size={18} />
            <div>
              <strong className="text-sm">Keep essential feedback</strong>
              <p className="text-xs text-base-content/50">
                Loading indicators should still animate, just more subtly.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineCheck className="text-success mt-0.5 shrink-0" size={18} />
            <div>
              <strong className="text-sm">Replace, don't remove</strong>
              <p className="text-xs text-base-content/50">
                Use opacity/color changes instead of movement.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineCheck className="text-success mt-0.5 shrink-0" size={18} />
            <div>
              <strong className="text-sm">Reduce duration</strong>
              <p className="text-xs text-base-content/50">
                Faster transitions (under 100ms) cause less discomfort.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <HiOutlineCheck className="text-success mt-0.5 shrink-0" size={18} />
            <div>
              <strong className="text-sm">Respect the preference</strong>
              <p className="text-xs text-base-content/50">
                Users set this for medical reasons. Always honor it.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Autoplay Warning */}
      <div className="alert alert-warning mb-6">
        <HiOutlineExclamation size={20} />
        <div>
          <h4 className="font-semibold">Never autoplay large animations</h4>
          <p className="text-sm">
            Parallax effects, auto-playing carousels, and background videos can trigger vestibular
            disorders. Always provide controls and respect reduced motion preferences.
          </p>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Code
      </button>

      {showCode && (
        <CodeSnippet title="Reduced Motion Pattern" language="css" code={reducedMotionCode} />
      )}

      {/* Custom Keyframes for animations */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

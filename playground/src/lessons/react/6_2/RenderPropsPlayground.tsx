// ============================================
// Render Props Playground
// Combine render props in creative ways!
// ============================================

import { useState, useEffect, useRef, useCallback, useMemo, ReactNode } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';

// ============================================
// RENDER PROP COMPONENTS
// ============================================

// ---- Toggle ----
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => ReactNode;
  initial?: boolean;
}

function Toggle({ children, initial = false }: ToggleProps) {
  const [isOn, setIsOn] = useState(initial);
  return <>{children(isOn, () => setIsOn((prev) => !prev))}</>;
}

// ---- Counter ----
interface CounterProps {
  children: (
    count: number,
    actions: { increment: () => void; decrement: () => void; reset: () => void }
  ) => ReactNode;
  initial?: number;
}

function Counter({ children, initial = 0 }: CounterProps) {
  const [count, setCount] = useState(initial);
  return (
    <>
      {children(count, {
        increment: () => setCount((c) => c + 1),
        decrement: () => setCount((c) => c - 1),
        reset: () => setCount(initial),
      })}
    </>
  );
}

// ---- Mouse Position ----
interface MouseProps {
  children: (pos: { x: number; y: number }) => ReactNode;
}

function Mouse({ children }: MouseProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setPos({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    }
  };

  return (
    <div ref={ref} onMouseMove={handleMove} className="relative">
      {children(pos)}
    </div>
  );
}

// ---- Input Value ----
interface InputProps {
  children: (value: string, onChange: (value: string) => void) => ReactNode;
  initial?: string;
}

function Input({ children, initial = '' }: InputProps) {
  const [value, setValue] = useState(initial);
  return <>{children(value, setValue)}</>;
}

// ---- Timer ----
interface TimerProps {
  children: (
    seconds: number,
    actions: { start: () => void; pause: () => void; reset: () => void },
    isRunning: boolean
  ) => ReactNode;
}

function Timer({ children }: TimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Handle interval via effect - cleaner and avoids ref issues
  useEffect(() => {
    if (!isRunning) return;

    const id = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setIsRunning(false);
    setSeconds(0);
  }, []);

  const actions = useMemo(() => ({ start, pause, reset }), [start, pause, reset]);

  return <>{children(seconds, actions, isRunning)}</>;
}

// ============================================
// PLAYGROUND
// ============================================

export default function RenderPropsPlayground() {
  return (
    <div className="space-y-6">
      {/* Demo 1: Theme + Counter Combined */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Demo 1: Nested Render Props</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Combine Toggle (dark mode) + Counter in one component:
        </p>

        <Toggle>
          {(darkMode, toggleTheme) => (
            <Counter>
              {(count, { increment, decrement, reset }) => (
                <div
                  className={`p-6 rounded-lg transition-colors ${
                    darkMode ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  <div className="flex justify-between items-center mb-4">
                    <h5 className="font-bold">Theme-Aware Counter</h5>
                    <button
                      onClick={toggleTheme}
                      className={`px-3 py-1 rounded text-sm ${
                        darkMode ? 'bg-slate-700' : 'bg-slate-200'
                      }`}
                    >
                      {darkMode ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>

                  <div className="text-center">
                    <p className="text-4xl font-bold mb-4">{count}</p>
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={decrement}
                        className={`w-10 h-10 rounded-full ${
                          darkMode
                            ? 'bg-slate-700 hover:bg-slate-600'
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                      >
                        -
                      </button>
                      <button
                        onClick={reset}
                        className={`px-4 rounded ${
                          darkMode
                            ? 'bg-slate-700 hover:bg-slate-600'
                            : 'bg-slate-200 hover:bg-slate-300'
                        }`}
                      >
                        Reset
                      </button>
                      <button
                        onClick={increment}
                        className={`w-10 h-10 rounded-full ${
                          darkMode
                            ? 'bg-blue-600 hover:bg-blue-500'
                            : 'bg-blue-500 hover:bg-blue-400'
                        } text-white`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </Counter>
          )}
        </Toggle>
      </div>

      {/* Demo 2: Mouse-reactive Card */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Demo 2: Mouse-Reactive Card</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Card that reacts to mouse position with gradient lighting:
        </p>

        <Mouse>
          {({ x, y }) => (
            <div
              className="h-48 rounded-xl flex items-center justify-center relative overflow-hidden cursor-none"
              style={{
                background: `radial-gradient(circle at ${x}px ${y}px, rgba(99, 102, 241, 0.3) 0%, transparent 50%)`,
                backgroundColor: '#1e293b',
              }}
            >
              <div className="text-center z-10">
                <p className="text-white text-lg font-semibold">Move your mouse</p>
                <p className="text-slate-400 text-sm mt-1">Spotlight follows cursor</p>
              </div>
              {/* Glow effect */}
              <div
                className="absolute w-32 h-32 bg-indigo-500/20 rounded-full blur-xl pointer-events-none"
                style={{
                  left: x - 64,
                  top: y - 64,
                }}
              />
            </div>
          )}
        </Mouse>
      </div>

      {/* Demo 3: Live Search Preview */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Demo 3: Live Search Filter</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Input render prop combined with filtered list:
        </p>

        <Input>
          {(search, setSearch) => {
            const items = [
              'React',
              'Vue',
              'Angular',
              'Svelte',
              'Solid',
              'Preact',
              'Next.js',
              'Nuxt',
            ];
            const filtered = items.filter((item) =>
              item.toLowerCase().includes(search.toLowerCase())
            );

            return (
              <div className="space-y-3">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search frameworks..."
                  className="input input-bordered w-full"
                />

                <div className="flex flex-wrap gap-2">
                  {filtered.length > 0 ? (
                    filtered.map((item) => (
                      <span key={item} className="badge badge-primary badge-lg">
                        {item}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-base-content/50">No matches found</p>
                  )}
                </div>

                <p className="text-xs text-base-content/50">
                  {filtered.length} of {items.length} shown
                </p>
              </div>
            );
          }}
        </Input>
      </div>

      {/* Demo 4: Stopwatch */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Demo 4: Stopwatch Timer</h4>
        <p className="text-sm text-base-content/70 mb-4">
          Timer render prop for controlling elapsed time:
        </p>

        <Timer>
          {(seconds, { start, pause, reset }, isRunning) => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;

            return (
              <div className="bg-base-300 rounded-xl p-6">
                <div className="text-center mb-6">
                  <p className="text-5xl font-mono font-bold">
                    {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
                  </p>
                  <p className="text-sm text-base-content/50 mt-1">
                    {isRunning ? '⏱️ Running' : '⏸️ Paused'}
                  </p>
                </div>

                <div className="flex justify-center gap-3">
                  {isRunning ? (
                    <button onClick={pause} className="btn btn-warning">
                      Pause
                    </button>
                  ) : (
                    <button onClick={start} className="btn btn-success">
                      {seconds > 0 ? 'Resume' : 'Start'}
                    </button>
                  )}
                  <button onClick={reset} className="btn btn-ghost" disabled={seconds === 0}>
                    Reset
                  </button>
                </div>

                {/* Progress ring visual */}
                <div className="mt-4 flex justify-center">
                  <div className="relative w-24 h-24">
                    <svg className="w-full h-full -rotate-90">
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        className="text-base-content/10"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="44"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeDasharray={276.46}
                        strokeDashoffset={276.46 - ((seconds % 60) / 60) * 276.46}
                        className="text-primary transition-all duration-1000"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-lg font-bold">
                      {secs}s
                    </span>
                  </div>
                </div>
              </div>
            );
          }}
        </Timer>
      </div>

      {/* Hooks vs Render Props Note */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Render Props vs Custom Hooks</h4>
            <p className="text-sm text-base-content/70 mb-2">
              Modern React often uses <strong className="text-primary">custom hooks</strong> instead
              {/* eslint-disable-next-line local/no-raw-code-element */}
              of render props (e.g., <code className="text-secondary">useToggle()</code> instead of{' '}
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-secondary">&lt;Toggle&gt;</code>).
            </p>
            <p className="text-sm text-base-content/70">Render props are still useful when:</p>
            <ul className="text-sm text-base-content/70 list-disc list-inside mt-1">
              <li>You need to control exactly where/when rendering happens</li>
              <li>You're building library components with flexible APIs</li>
              <li>You need the logic to be opt-in per-render</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

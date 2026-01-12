// ============================================
// Demo: useMemo for Expensive Calculations
// ============================================

import { useState, useMemo } from 'react';
import { HiOutlineLightBulb, HiOutlineClock } from 'react-icons/hi';

// Module-level counter for calculations
let calculationCount = 0;

interface CalculationResult {
  result: number;
  duration: number;
}

// Simulate expensive calculation
function expensiveCalculation(num: number): CalculationResult {
  const start = performance.now();
  // Artificial delay - in real apps this could be filtering thousands of items
  let result = 0;
  for (let i = 0; i < num * 100000; i++) {
    result += Math.sqrt(i);
  }
  const duration = performance.now() - start;
  calculationCount++;
  return { result: Math.round(result), duration: Math.round(duration) };
}

export default function UseMemoDemo(): React.ReactElement {
  const [number, setNumber] = useState(10);
  const [darkMode, setDarkMode] = useState(false);
  const [useMemoEnabled, setUseMemoEnabled] = useState(false);
  const [, forceUpdate] = useState(0);

  // Without useMemo - recalculates every render
  const withoutMemo = !useMemoEnabled ? expensiveCalculation(number) : null;

  // With useMemo - only recalculates when `number` changes
  const withMemo = useMemo(() => {
    if (!useMemoEnabled) return null;
    return expensiveCalculation(number);
  }, [number, useMemoEnabled]);

  const result = useMemoEnabled ? withMemo : withoutMemo;

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineClock className="text-primary" size={20} />
        Expensive Calculation Demo
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Toggle dark mode (unrelated state) and watch the calculation time. Without{' '}
        {/* eslint-disable-next-line local/no-raw-code-element */}
        <code className="text-secondary">useMemo</code>, it recalculates every render!
      </p>

      {/* Controls */}
      <div className="flex flex-wrap gap-4 mb-4">
        <div>
          <label className="text-xs text-base-content/60 block mb-1">Complexity (1-50)</label>
          <input
            type="range"
            min="1"
            max="50"
            value={number}
            onChange={(e) => setNumber(Number(e.target.value))}
            className="range range-primary range-sm w-32"
          />
          <span className="ml-2 font-mono text-sm">{number}</span>
        </div>

        <div>
          <label className="text-xs text-base-content/60 block mb-1">Unrelated State</label>
          <button
            onClick={() => {
              setDarkMode((d) => !d);
              forceUpdate((n) => n + 1);
            }}
            className={`btn btn-sm ${darkMode ? 'btn-secondary' : 'btn-outline'}`}
          >
            {darkMode ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>

        <div>
          <label className="text-xs text-base-content/60 block mb-1">Memoization</label>
          <button
            onClick={() => setUseMemoEnabled((m) => !m)}
            className={`btn btn-sm ${useMemoEnabled ? 'btn-success' : 'btn-error'}`}
          >
            {useMemoEnabled ? '✓ useMemo ON' : '✗ useMemo OFF'}
          </button>
        </div>
      </div>

      {/* Results */}
      <div
        className={`rounded-lg p-4 mb-4 transition-colors ${darkMode ? 'bg-base-300' : 'bg-base-100'}`}
      >
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-xs text-base-content/60 mb-1">Result</div>
            <div className="font-mono text-xl text-primary">
              {result ? result.result.toLocaleString() : '—'}
            </div>
          </div>
          <div>
            <div className="text-xs text-base-content/60 mb-1">Calculation Time</div>
            <div
              className={`font-mono text-xl ${result && result.duration > 10 ? 'text-error' : 'text-success'}`}
            >
              {result ? `${result.duration}ms` : '—'}
            </div>
          </div>
        </div>
        <div className="mt-3 pt-3 border-t border-base-content/10 flex justify-between items-center">
          <span>
            <span className="text-xs text-base-content/60">Total calculations:</span>{' '}
            <span className="font-mono text-warning">{calculationCount}</span>
          </span>
          <button
            onClick={() => {
              calculationCount = 0;
              forceUpdate((n) => n + 1);
            }}
            className="btn btn-ghost btn-xs"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Explanation */}
      <div className="flex items-start gap-2 p-3 bg-primary/10 rounded-lg border border-primary/30">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-sm text-base-content/80">
          <strong>Try this:</strong> With useMemo OFF, click the dark/light toggle. Notice the
          {/* eslint-disable-next-line local/no-raw-code-element */}
          delay? The expensive calculation runs even though only <code>darkMode</code> changed. Turn
          useMemo ON and try again — instant toggle!
        </div>
      </div>
    </div>
  );
}

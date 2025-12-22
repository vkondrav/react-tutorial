// ============================================
// Demo: Storing Persistent Values with useRef
// ============================================

import { useState, useRef, useEffect } from 'react';
import { HiOutlineLightBulb, HiPlay, HiPause, HiOutlineRefresh } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import intervalRefExample from './examples/IntervalRefExample.tsx?raw';

export default function PersistentValueDemo(): React.ReactElement {
  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Timer with Ref (Stores Interval ID)
      </h3>

      <TimerDemo />

      {/* Explanation */}
      <div className="mt-4 p-3 rounded-lg bg-success/10 border border-success/30">
        <div className="flex items-start gap-2">
          <HiOutlineLightBulb className="text-success shrink-0 mt-0.5" size={18} />
          <div className="text-sm text-base-content/70">
            <strong className="text-success">Why use a ref here?</strong> The interval ID needs to
            persist across renders so we can clear it later, but changing it shouldn't re-render the
            component. Refs are perfect for this!
          </div>
        </div>
      </div>
    </div>
  );
}

function TimerDemo(): React.ReactElement {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Store the interval ID in a ref (not state!)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = (): void => {
    if (isRunning) return;

    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
  };

  const pause = (): void => {
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = null;
  };

  const reset = (): void => {
    pause();
    setSeconds(0);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Format time
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-4">
      {/* Timer display */}
      <div className="text-center">
        <div className="font-mono text-5xl font-bold text-primary">{formatTime(seconds)}</div>
        <div className="text-sm text-base-content/60 mt-1">
          {isRunning ? 'Running...' : 'Paused'}
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-2">
        {!isRunning ? (
          <button onClick={start} className="btn btn-primary gap-1">
            <HiPlay size={18} />
            Start
          </button>
        ) : (
          <button onClick={pause} className="btn btn-warning gap-1">
            <HiPause size={18} />
            Pause
          </button>
        )}
        <button onClick={reset} disabled={seconds === 0} className="btn btn-ghost gap-1">
          <HiOutlineRefresh size={18} />
          Reset
        </button>
      </div>

      {/* Code example */}
      <div>
        <div className="text-xs font-semibold mb-2">Storing the interval ID:</div>
        <CodeSnippet code={intervalRefExample} language="tsx" />
      </div>

      {/* Status indicator */}
      <div className="p-2 rounded bg-base-300/50 text-xs font-mono text-base-content/60">
        intervalRef.current = {isRunning ? '[Active Interval]' : 'null'}
      </div>
    </div>
  );
}

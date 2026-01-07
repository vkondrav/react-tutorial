// ============================================
// EffectTimingDemo - Visualize when effects run
// ============================================

import { useState, useEffect, useRef } from 'react';
import { HiOutlineLightBulb, HiRefresh } from 'react-icons/hi';

// ============================================
// Types
// ============================================

type EventType = 'mount' | 'render' | 'effect' | 'cleanup';

interface LifecycleEvent {
  name: string;
  type: EventType;
  time: number;
}

// ============================================
// Main Component
// ============================================

export default function EffectTimingDemo(): React.ReactElement {
  const [key, setKey] = useState(0);

  return (
    <div className="card bg-base-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Effect Lifecycle Visualization</h3>

      <p className="text-base-content/70 mb-4">
        Watch the lifecycle events in order. Click "Remount" to see the full cycle including
        cleanup.
      </p>

      <button onClick={() => setKey((k) => k + 1)} className="btn btn-primary btn-sm mb-4">
        <HiRefresh size={16} />
        Remount Component
      </button>

      <LifecycleVisualizer key={key} />

      {/* Timeline Explanation */}
      <div className="mt-6 bg-base-200 rounded-lg p-4">
        <h4 className="font-semibold mb-3">Effect Timeline</h4>
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-base-content/20" />

          {/* Timeline items */}
          <div className="space-y-4">
            {[
              {
                phase: 'Render Phase',
                desc: 'React calls your component function',
                color: 'bg-info',
              },
              {
                phase: 'Browser Paint',
                desc: 'Browser updates the screen',
                color: 'bg-warning',
              },
              {
                phase: 'useEffect Runs',
                desc: 'Effects execute after paint (non-blocking)',
                color: 'bg-success',
              },
              {
                phase: 'Cleanup (on re-render)',
                desc: 'Previous effect cleans up before new one runs',
                color: 'bg-error',
              },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 pl-1">
                <div className={`w-6 h-6 rounded-full ${item.color} shrink-0 z-10`} />
                <div>
                  <p className="font-medium">{item.phase}</p>
                  <p className="text-sm text-base-content/60">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tip */}
      <div className="mt-4 flex items-start gap-3 bg-info/10 border border-info/30 rounded-lg p-4">
        <HiOutlineLightBulb className="text-info shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-base-content/80">
          <strong>Why after paint?</strong> useEffect runs after the browser paints so it doesn't
          block the visual update. This makes your app feel faster. For layout-dependent effects,
          use <code className="text-primary">useLayoutEffect</code> instead.
        </p>
      </div>
    </div>
  );
}

// ============================================
// Lifecycle Visualizer Component
// ============================================

function LifecycleVisualizer(): React.ReactElement {
  const [events, setEvents] = useState<LifecycleEvent[]>([]);
  const [count, setCount] = useState(0);
  const mountTime = useRef(0);

  const addEvent = (name: string, type: EventType): void => {
    const elapsed = mountTime.current ? Date.now() - mountTime.current : 0;
    // Use queueMicrotask to defer setState and avoid synchronous cascading renders
    queueMicrotask(() => {
      setEvents((prev) => [...prev, { name, type, time: elapsed }]);
    });
  };

  // Main effect with cleanup
  useEffect(() => {
    addEvent('useEffect runs', 'effect');

    return () => {
      // This runs on unmount or before re-running
      addEvent('Cleanup runs', 'cleanup');
    };
  }, [count]); // Re-run when count changes

  // Initial mount effect
  useEffect(() => {
    mountTime.current = Date.now();
    addEvent('Component mounted', 'mount');
    addEvent('First render complete', 'render');
  }, []);

  const getEventColor = (type: EventType): string => {
    switch (type) {
      case 'mount':
        return 'bg-info';
      case 'render':
        return 'bg-warning';
      case 'effect':
        return 'bg-success';
      case 'cleanup':
        return 'bg-error';
    }
  };

  return (
    <div className="bg-base-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <p className="text-base-content/70">
          Count: <span className="text-primary font-bold">{count}</span>
        </p>
        <button onClick={() => setCount((c) => c + 1)} className="btn btn-sm btn-outline">
          Update State
        </button>
      </div>

      {/* Events Log */}
      <div className="bg-base-300 rounded-lg p-3 min-h-[120px] max-h-[200px] overflow-auto">
        <p className="text-xs text-base-content/50 mb-2">Lifecycle Events:</p>
        {events.length === 0 ? (
          <p className="text-sm text-base-content/40">Waiting for events...</p>
        ) : (
          <div className="space-y-1">
            {events.map((event, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-mono">
                <span className="text-base-content/40 text-xs w-12">{event.time}ms</span>
                <span className={`w-2 h-2 rounded-full ${getEventColor(event.type)}`} />
                <span className={event.type === 'cleanup' ? 'text-error' : 'text-base-content/80'}>
                  {event.name}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 text-xs">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-info" /> Mount
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-warning" /> Render
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-success" /> Effect
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-error" /> Cleanup
        </span>
      </div>
    </div>
  );
}

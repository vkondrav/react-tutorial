// ============================================
// Hydration Demo
// ============================================
// Visualizes the hydration process
// ============================================

import { useState } from 'react';
import { HiOutlinePlay, HiOutlineRefresh } from 'react-icons/hi';

type HydrationState = 'server-html' | 'js-loading' | 'hydrating' | 'interactive';

interface ButtonState {
  clicks: number;
  isHydrated: boolean;
}

export default function HydrationDemo(): React.ReactElement {
  const [state, setState] = useState<HydrationState>('server-html');
  const [buttonStates, setButtonStates] = useState<ButtonState[]>([
    { clicks: 0, isHydrated: false },
    { clicks: 0, isHydrated: false },
    { clicks: 0, isHydrated: false },
  ]);
  const [pendingClicks, setPendingClicks] = useState<number[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);

  const simulateHydration = async () => {
    setIsPlaying(true);
    setPendingClicks([]);
    setButtonStates([
      { clicks: 0, isHydrated: false },
      { clicks: 0, isHydrated: false },
      { clicks: 0, isHydrated: false },
    ]);

    // Phase 1: Server HTML arrives
    setState('server-html');
    await sleep(1500);

    // Phase 2: JS is loading
    setState('js-loading');
    await sleep(2000);

    // Phase 3: Hydrating (attaching event handlers)
    setState('hydrating');
    await sleep(500);

    // Hydrate buttons one by one
    for (let i = 0; i < 3; i++) {
      await sleep(400);
      setButtonStates((prev) => prev.map((b, j) => (j === i ? { ...b, isHydrated: true } : b)));
    }

    await sleep(300);
    setState('interactive');
    setIsPlaying(false);
  };

  const handleButtonClick = (index: number) => {
    if (state !== 'interactive' || !buttonStates[index].isHydrated) {
      // Record attempted click before hydration
      setPendingClicks((prev) => [...prev, index]);
      return;
    }

    setButtonStates((prev) =>
      prev.map((b, i) => (i === index ? { ...b, clicks: b.clicks + 1 } : b))
    );
  };

  const reset = () => {
    setState('server-html');
    setButtonStates([
      { clicks: 0, isHydrated: false },
      { clicks: 0, isHydrated: false },
      { clicks: 0, isHydrated: false },
    ]);
    setPendingClicks([]);
    setIsPlaying(false);
  };

  const getStateColor = () => {
    switch (state) {
      case 'server-html':
        return 'bg-info';
      case 'js-loading':
        return 'bg-warning';
      case 'hydrating':
        return 'bg-secondary';
      case 'interactive':
        return 'bg-success';
    }
  };

  const getStateLabel = () => {
    switch (state) {
      case 'server-html':
        return '📄 Server HTML Received';
      case 'js-loading':
        return '📦 Loading JavaScript...';
      case 'hydrating':
        return '💧 Hydrating Components...';
      case 'interactive':
        return '✅ Fully Interactive!';
    }
  };

  return (
    <div className="card bg-base-200 p-6">
      {/* Controls */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={simulateHydration}
          disabled={isPlaying}
          className="btn btn-primary btn-sm gap-2"
        >
          <HiOutlinePlay size={16} />
          {isPlaying ? 'Simulating...' : 'Simulate Hydration'}
        </button>
        <button onClick={reset} className="btn btn-ghost btn-sm gap-2">
          <HiOutlineRefresh size={16} />
          Reset
        </button>
      </div>

      {/* Browser Simulation */}
      <div className="border border-base-300 rounded-lg overflow-hidden mb-6">
        {/* Browser Chrome */}
        <div className="bg-base-300 px-3 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-error/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
            </div>
            <div className="bg-base-200 rounded px-3 py-1 text-xs text-base-content/50">
              myapp.com/dashboard
            </div>
          </div>
          <div className={`badge badge-sm ${getStateColor()} text-white`}>{getStateLabel()}</div>
        </div>

        {/* Page Content */}
        <div className="bg-base-100 p-6">
          <h3 className="text-lg font-bold mb-4">Welcome to the Dashboard</h3>

          <div className="grid grid-cols-3 gap-4">
            {buttonStates.map((btn, i) => (
              <div key={i} className="relative">
                <button
                  onClick={() => handleButtonClick(i)}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all ${
                    btn.isHydrated
                      ? 'bg-primary text-white cursor-pointer hover:bg-primary/90'
                      : 'bg-base-300 text-base-content/50 cursor-not-allowed'
                  }`}
                >
                  {btn.isHydrated ? `Clicked: ${btn.clicks}` : 'Button ' + (i + 1)}
                </button>

                {/* Hydration Indicator */}
                {state === 'hydrating' && !btn.isHydrated && (
                  <div className="absolute inset-0 flex items-center justify-center bg-secondary/20 rounded-lg">
                    <span className="loading loading-ring loading-sm text-secondary" />
                  </div>
                )}

                {/* Just hydrated flash */}
                {btn.isHydrated && state === 'hydrating' && (
                  <div className="absolute inset-0 rounded-lg border-2 border-success animate-ping opacity-50" />
                )}
              </div>
            ))}
          </div>

          {/* Click attempts before hydration */}
          {pendingClicks.length > 0 && state !== 'interactive' && (
            <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
              <p className="text-sm text-warning">
                ⚠️ {pendingClicks.length} click{pendingClicks.length > 1 ? 's' : ''} ignored –
                buttons aren't hydrated yet!
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-4 bg-base-300 rounded-lg">
          <h4 className="font-semibold text-error mb-2">Before Hydration</h4>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>• HTML is visible immediately</li>
            <li>• Buttons look clickable but don't work</li>
            <li>• No JavaScript event handlers attached</li>
            <li>• User might get frustrated clicking</li>
          </ul>
        </div>
        <div className="p-4 bg-base-300 rounded-lg">
          <h4 className="font-semibold text-success mb-2">After Hydration</h4>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>• React attaches to existing DOM</li>
            <li>• Event handlers are connected</li>
            <li>• State management is active</li>
            <li>• Full interactivity restored</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

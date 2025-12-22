// ============================================
// EffectPlayground - Practice with useEffect
// ============================================

import { useState, useEffect, useRef } from 'react';
import {
  HiOutlineDocumentText,
  HiOutlineClock,
  HiOutlineDesktopComputer,
  HiOutlineDatabase,
} from 'react-icons/hi';

export default function EffectPlayground() {
  const [activeDemo, setActiveDemo] = useState('title');

  const demos = [
    { id: 'title', label: 'Document Title', icon: HiOutlineDocumentText },
    { id: 'timer', label: 'Stopwatch', icon: HiOutlineClock },
    { id: 'resize', label: 'Window Size', icon: HiOutlineDesktopComputer },
    { id: 'storage', label: 'localStorage', icon: HiOutlineDatabase },
  ];

  return (
    <div className="card bg-base-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Try These Common Patterns</h3>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {demos.map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`btn btn-sm gap-2 ${activeDemo === demo.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            <demo.icon size={16} />
            {demo.label}
          </button>
        ))}
      </div>

      {/* Demo Content */}
      <div className="min-h-[300px]">
        {activeDemo === 'title' && <DocumentTitleDemo />}
        {activeDemo === 'timer' && <StopwatchDemo />}
        {activeDemo === 'resize' && <WindowSizeDemo />}
        {activeDemo === 'storage' && <LocalStorageDemo />}
      </div>
    </div>
  );
}

// Demo 1: Document Title
function DocumentTitleDemo() {
  const [title, setTitle] = useState('React Tutorial');
  const [notifications, setNotifications] = useState(0);

  useEffect(() => {
    const prefix = notifications > 0 ? `(${notifications}) ` : '';
    document.title = `${prefix}${title}`;

    // Cleanup: Reset title when unmounting
    return () => {
      document.title = 'React Tutorial';
    };
  }, [title, notifications]);

  return (
    <div className="space-y-4">
      <p className="text-base-content/70">
        Sync your app's state with the browser tab title. Check the tab!
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-base-content/60 block mb-1">Page Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter page title..."
          />
        </div>
        <div>
          <label className="text-sm text-base-content/60 block mb-1">Notifications</label>
          <div className="flex gap-2">
            <button
              onClick={() => setNotifications((n) => Math.max(0, n - 1))}
              className="btn btn-outline"
            >
              -
            </button>
            <input
              type="number"
              value={notifications}
              onChange={(e) => setNotifications(Math.max(0, Number(e.target.value)))}
              className="input input-bordered flex-1 text-center"
              min="0"
            />
            <button onClick={() => setNotifications((n) => n + 1)} className="btn btn-outline">
              +
            </button>
          </div>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4">
        <p className="text-sm text-base-content/60 mb-2">Browser Tab Preview:</p>
        <div className="bg-base-100 rounded-lg p-3 flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-primary/50" />
          <span className="font-mono text-sm truncate">
            {notifications > 0 ? `(${notifications}) ` : ''}
            {title}
          </span>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
        <pre>{`useEffect(() => {
  const prefix = notifications > 0 ? \`(\${notifications}) \` : '';
  document.title = \`\${prefix}\${title}\`;
}, [title, notifications]);`}</pre>
      </div>
    </div>
  );
}

// Demo 2: Stopwatch with setInterval
function StopwatchDemo() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedMs;
      intervalRef.current = setInterval(() => {
        setElapsedMs(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, elapsedMs]);

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedMs(0);
  };

  return (
    <div className="space-y-4">
      <p className="text-base-content/70">A stopwatch using setInterval with proper cleanup.</p>

      <div className="text-center py-6">
        <p className="text-6xl font-mono font-bold text-primary mb-6">{formatTime(elapsedMs)}</p>

        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`btn btn-lg ${isRunning ? 'btn-warning' : 'btn-success'}`}
          >
            {isRunning ? 'Pause' : elapsedMs > 0 ? 'Resume' : 'Start'}
          </button>
          <button
            onClick={handleReset}
            className="btn btn-lg btn-outline"
            disabled={elapsedMs === 0}
          >
            Reset
          </button>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
        <pre>{`useEffect(() => {
  if (isRunning) {
    const id = setInterval(() => {
      setElapsedMs(ms => ms + 10);
    }, 10);
    
    return () => clearInterval(id); // Cleanup!
  }
}, [isRunning]);`}</pre>
      </div>
    </div>
  );
}

// Demo 3: Window resize listener
function WindowSizeDemo() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [resizeCount, setResizeCount] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      setResizeCount((c) => c + 1);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup: Remove listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty array = setup once on mount

  const aspectRatio = (windowSize.width / windowSize.height).toFixed(2);

  return (
    <div className="space-y-4">
      <p className="text-base-content/70">
        Track window dimensions in real-time. Try resizing your browser!
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-base-200 rounded-lg p-4 text-center">
          <p className="text-base-content/60 text-sm">Width</p>
          <p className="text-3xl font-bold text-primary">{windowSize.width}</p>
          <p className="text-xs text-base-content/50">pixels</p>
        </div>
        <div className="bg-base-200 rounded-lg p-4 text-center">
          <p className="text-base-content/60 text-sm">Height</p>
          <p className="text-3xl font-bold text-secondary">{windowSize.height}</p>
          <p className="text-xs text-base-content/50">pixels</p>
        </div>
        <div className="bg-base-200 rounded-lg p-4 text-center">
          <p className="text-base-content/60 text-sm">Resize Events</p>
          <p className="text-3xl font-bold text-accent">{resizeCount}</p>
          <p className="text-xs text-base-content/50">fired</p>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4">
        <p className="text-sm text-base-content/60 mb-2">Aspect Ratio: {aspectRatio}</p>
        <div
          className="bg-primary/20 border-2 border-primary rounded transition-all duration-200"
          style={{
            width: '100%',
            height: 0,
            paddingBottom: `${(windowSize.height / windowSize.width) * 100}%`,
            maxHeight: '150px',
          }}
        />
      </div>

      <div className="bg-base-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
        <pre>{`useEffect(() => {
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };
  
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []); // Empty deps = mount/unmount only`}</pre>
      </div>
    </div>
  );
}

// Demo 4: localStorage sync
function LocalStorageDemo() {
  const [name, setName] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem('playground-name') || '';
  });
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('playground-theme') || 'default';
  });

  // Sync name to localStorage
  useEffect(() => {
    localStorage.setItem('playground-name', name);
  }, [name]);

  // Sync theme to localStorage
  useEffect(() => {
    localStorage.setItem('playground-theme', theme);
  }, [theme]);

  const clearStorage = () => {
    localStorage.removeItem('playground-name');
    localStorage.removeItem('playground-theme');
    setName('');
    setTheme('default');
  };

  const themes = ['default', 'ocean', 'forest', 'sunset', 'midnight'];

  return (
    <div className="space-y-4">
      <p className="text-base-content/70">
        Persist user preferences to localStorage. Refresh the page — your data stays!
      </p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-base-content/60 block mb-1">Your Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="Enter your name..."
          />
        </div>
        <div>
          <label className="text-sm text-base-content/60 block mb-1">Theme Preference</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="select select-bordered w-full"
          >
            {themes.map((t) => (
              <option key={t} value={t}>
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-base-200 rounded-lg p-4">
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-base-content/60">localStorage Contents:</p>
          <button onClick={clearStorage} className="btn btn-xs btn-error btn-outline">
            Clear Storage
          </button>
        </div>
        <div className="font-mono text-sm space-y-1">
          <p>
            <span className="text-primary">"playground-name"</span>:{' '}
            <span className="text-success">"{name}"</span>
          </p>
          <p>
            <span className="text-primary">"playground-theme"</span>:{' '}
            <span className="text-success">"{theme}"</span>
          </p>
        </div>
        <p className="text-xs text-success mt-2">✓ Auto-synced to localStorage</p>
      </div>

      {/* Preview */}
      {name && (
        <div
          className={`rounded-lg p-4 transition-all ${
            theme === 'ocean'
              ? 'bg-blue-900/50'
              : theme === 'forest'
                ? 'bg-green-900/50'
                : theme === 'sunset'
                  ? 'bg-orange-900/50'
                  : theme === 'midnight'
                    ? 'bg-slate-900'
                    : 'bg-base-200'
          }`}
        >
          <p className="text-lg">
            Welcome back, <span className="font-bold text-primary">{name}</span>!
          </p>
          <p className="text-sm text-base-content/60">Your {theme} theme is saved.</p>
        </div>
      )}

      <div className="bg-base-200 rounded-lg p-3 font-mono text-xs overflow-x-auto">
        <pre>{`// Initialize from localStorage
const [name, setName] = useState(() => {
  return localStorage.getItem('name') || '';
});

// Sync to localStorage when name changes
useEffect(() => {
  localStorage.setItem('name', name);
}, [name]);`}</pre>
      </div>
    </div>
  );
}

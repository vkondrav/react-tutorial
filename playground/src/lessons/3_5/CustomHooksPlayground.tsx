// ============================================
// Playground: Custom Hooks in Action
// ============================================

import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import {
  HiOutlineLightBulb,
  HiOutlineStatusOnline,
  HiOutlineStatusOffline,
  HiOutlineClock,
  HiOutlineClipboard,
  HiCheck,
} from 'react-icons/hi';

// ============================================
// Types
// ============================================
interface HoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface UseCopyToClipboardReturn {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

// ============================================
// Custom Hook: useOnlineStatus
// ============================================
function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
}

// ============================================
// Custom Hook: useInterval
// ============================================
function useInterval(callback: () => void, delay: number | null): void {
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

// ============================================
// Custom Hook: useCopyToClipboard
// ============================================
function useCopyToClipboard(): UseCopyToClipboardReturn {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
      return true;
    } catch {
      setCopiedText(null);
      return false;
    }
  }, []);

  const reset = useCallback(() => setCopiedText(null), []);

  return { copiedText, copy, reset };
}

// ============================================
// Custom Hook: useHover
// ============================================
function useHover(): [boolean, HoverBind] {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const bind: HoverBind = {
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: () => setIsHovered(false),
  };

  return [isHovered, bind];
}

export default function CustomHooksPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<string>('online');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Try These Hooks
      </h3>

      {/* Demo selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: 'online', label: 'useOnlineStatus' },
          { id: 'interval', label: 'useInterval' },
          { id: 'clipboard', label: 'useCopyToClipboard' },
          { id: 'hover', label: 'useHover' },
        ].map((demo) => (
          <button
            key={demo.id}
            onClick={() => setActiveDemo(demo.id)}
            className={`btn btn-sm ${activeDemo === demo.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {demo.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="min-h-[280px]">
        {activeDemo === 'online' && <OnlineStatusDemo />}
        {activeDemo === 'interval' && <IntervalDemo />}
        {activeDemo === 'clipboard' && <ClipboardDemo />}
        {activeDemo === 'hover' && <HoverDemo />}
      </div>
    </div>
  );
}

// ============================================
// Online Status Demo
// ============================================
function OnlineStatusDemo(): React.ReactElement {
  const isOnline = useOnlineStatus();

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Detects network status changes. Try toggling your WiFi or using DevTools Network tab!
      </p>

      <div className="card bg-base-300 p-6 text-center">
        {isOnline ? (
          <>
            <HiOutlineStatusOnline className="text-success mx-auto mb-2" size={48} />
            <div className="text-2xl font-bold text-success">Online</div>
            <div className="text-sm text-base-content/60">Connected to the internet</div>
          </>
        ) : (
          <>
            <HiOutlineStatusOffline className="text-error mx-auto mb-2" size={48} />
            <div className="text-2xl font-bold text-error">Offline</div>
            <div className="text-sm text-base-content/60">No internet connection</div>
          </>
        )}
      </div>

      <div className="bg-base-300 rounded-lg p-3">
        <div className="text-xs font-semibold text-secondary mb-2">Usage (TypeScript)</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`function useOnlineStatus(): boolean {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  // ... event listeners
  return isOnline;
}

const isOnline: boolean = useOnlineStatus();
return isOnline ? <App /> : <OfflineMessage />;`}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ============================================
// Interval Demo
// ============================================
function IntervalDemo(): React.ReactElement {
  const [count, setCount] = useState<number>(0);
  const [delay, setDelay] = useState<number>(1000);
  const [isRunning, setIsRunning] = useState<boolean>(true);

  const tick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  useInterval(tick, isRunning ? delay : null);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        A declarative interval hook. Pass <code className="text-secondary">null</code> as delay to
        pause.
      </p>

      <div className="card bg-base-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <HiOutlineClock className="text-primary inline mr-2" size={24} />
            <span className="text-4xl font-mono font-bold text-primary">{count}</span>
          </div>
          <button
            onClick={() => setIsRunning((r) => !r)}
            className={`btn ${isRunning ? 'btn-error' : 'btn-success'}`}
          >
            {isRunning ? 'Pause' : 'Resume'}
          </button>
        </div>

        <div>
          <label className="text-xs text-base-content/60 block mb-1">
            Interval: {delay}ms ({(1000 / delay).toFixed(1)} ticks/sec)
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={delay}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setDelay(Number(e.target.value))}
            className="range range-primary range-sm w-full"
          />
        </div>

        <button onClick={() => setCount(0)} className="btn btn-ghost btn-sm mt-2">
          Reset Count
        </button>
      </div>

      <div className="bg-base-300 rounded-lg p-3">
        <div className="text-xs font-semibold text-secondary mb-2">Usage (TypeScript)</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`// delay: number | null - pass null to pause
function useInterval(callback: () => void, delay: number | null): void {
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

useInterval(() => setCount(c => c + 1), isRunning ? 1000 : null);`}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ============================================
// Clipboard Demo
// ============================================
function ClipboardDemo(): React.ReactElement {
  const { copiedText, copy } = useCopyToClipboard();
  const sampleTexts: string[] = [
    'npm install react',
    'const [state, setState] = useState()',
    'npx create-react-app my-app',
    'https://react.dev',
  ];

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Copy text to clipboard with visual feedback. Click any item below!
      </p>

      <div className="space-y-2">
        {sampleTexts.map((text, i) => (
          <button
            key={i}
            onClick={() => copy(text)}
            className="w-full flex items-center justify-between bg-base-300 rounded-lg p-3 hover:bg-base-100 transition-colors text-left"
          >
            <code className="text-sm font-mono">{text}</code>
            <span className="shrink-0 ml-2">
              {copiedText === text ? (
                <HiCheck className="text-success" size={20} />
              ) : (
                <HiOutlineClipboard className="text-base-content/40" size={20} />
              )}
            </span>
          </button>
        ))}
      </div>

      {copiedText && <div className="text-center text-sm text-success">Copied to clipboard!</div>}

      <div className="bg-base-300 rounded-lg p-3">
        <div className="text-xs font-semibold text-secondary mb-2">Usage (TypeScript)</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`interface UseCopyReturn {
  copiedText: string | null;
  copy: (text: string) => Promise<boolean>;
  reset: () => void;
}

const { copiedText, copy }: UseCopyReturn = useCopyToClipboard();
<button onClick={() => copy(text)}>
  {copiedText === text ? 'Copied!' : 'Copy'}
</button>`}
          </code>
        </pre>
      </div>
    </div>
  );
}

// ============================================
// Hover Demo
// ============================================
function HoverDemo(): React.ReactElement {
  const [isHovered1, bind1] = useHover();
  const [isHovered2, bind2] = useHover();
  const [isHovered3, bind3] = useHover();

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Track hover state declaratively. Returns bind props to spread on elements.
      </p>

      <div className="grid grid-cols-3 gap-4">
        <div
          {...bind1}
          className={`card p-6 text-center cursor-pointer transition-all ${
            isHovered1 ? 'bg-primary text-primary-content scale-105' : 'bg-base-300'
          }`}
        >
          <div className="text-3xl mb-2">🎨</div>
          <div className="text-sm">{isHovered1 ? 'Hovering!' : 'Hover me'}</div>
        </div>
        <div
          {...bind2}
          className={`card p-6 text-center cursor-pointer transition-all ${
            isHovered2 ? 'bg-secondary text-secondary-content scale-105' : 'bg-base-300'
          }`}
        >
          <div className="text-3xl mb-2">🚀</div>
          <div className="text-sm">{isHovered2 ? 'Hovering!' : 'Hover me'}</div>
        </div>
        <div
          {...bind3}
          className={`card p-6 text-center cursor-pointer transition-all ${
            isHovered3 ? 'bg-accent text-accent-content scale-105' : 'bg-base-300'
          }`}
        >
          <div className="text-3xl mb-2">✨</div>
          <div className="text-sm">{isHovered3 ? 'Hovering!' : 'Hover me'}</div>
        </div>
      </div>

      <div className="bg-base-300 rounded-lg p-3">
        <div className="text-xs font-semibold text-secondary mb-2">Usage (TypeScript)</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`interface HoverBind {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const [isHovered, bind]: [boolean, HoverBind] = useHover();
<div {...bind} className={isHovered ? 'active' : ''}>
  {isHovered ? 'Hovering!' : 'Hover me'}
</div>`}
          </code>
        </pre>
      </div>
    </div>
  );
}


// ============================================
// EventBasicsDemo - Introduction to Event Handling
// ============================================

import { useState } from 'react';
import { HiChevronDown, HiChevronRight, HiOutlineExclamationCircle } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import buttonHandlerExample from './examples/ButtonHandlerExample.tsx?raw';

// ============================================
// Types
// ============================================

interface LastEventInfo {
  type: string;
  target: string;
  currentTarget: string;
  timestamp: string;
}

// ============================================
// Main Component
// ============================================

export default function EventBasicsDemo(): React.ReactElement {
  const [clickCount, setClickCount] = useState<number>(0);
  const [lastEvent, setLastEvent] = useState<LastEventInfo | null>(null);
  const [showCode, setShowCode] = useState<boolean>(true);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    setClickCount((prev) => prev + 1);
    setLastEvent({
      type: e.type,
      target: e.target instanceof Element ? e.target.tagName : 'Unknown',
      currentTarget: e.currentTarget.tagName,
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  const lastEventDisplay = lastEvent
    ? `type: "${lastEvent.type}"
target: ${lastEvent.target}
currentTarget: ${lastEvent.currentTarget}
time: ${lastEvent.timestamp}`
    : '';

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Live Demo */}
      <div className="p-8 flex flex-col items-center gap-6 border-b border-base-300">
        <div className="text-xs text-base-content/50 uppercase">
          Click the button to see events in action!
        </div>
        <button
          onClick={handleClick}
          className="btn btn-primary btn-lg active:scale-95 transition-transform"
        >
          Click Me! ({clickCount})
        </button>
        {lastEvent && (
          <div className="card bg-base-300 p-4 w-full max-w-md">
            <div className="text-base-content/50 text-xs mb-2">LAST EVENT DATA:</div>
            <CodeSnippet code={lastEventDisplay} language="json" showCopy={false} />
          </div>
        )}
      </div>

      {/* Toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="w-full px-4 py-3 bg-base-300 border-none border-b border-base-300 text-base-content/70 cursor-pointer text-sm hover:bg-base-200 transition-colors flex items-center justify-center gap-2"
      >
        {showCode ? (
          <>
            <HiChevronDown size={16} />
            Hide Code
          </>
        ) : (
          <>
            <HiChevronRight size={16} />
            Show Code
          </>
        )}
      </button>

      {/* Code Explanation */}
      {showCode && (
        <div className="p-6">
          <CodeSnippet code={buttonHandlerExample} language="tsx" showCopy={false} />

          {/* Key Points */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="card bg-base-300 p-4 border-l-4 border-primary">
              <div className="text-primary font-semibold mb-2">onClick (camelCase)</div>
              <div className="text-base-content/70 text-sm">
                React uses camelCase for event names. HTML uses lowercase{' '}
                <code className="text-error">onclick</code>, React uses{' '}
                <code className="text-success">onClick</code>.
              </div>
            </div>
            <div className="card bg-base-300 p-4 border-l-4 border-accent">
              <div className="text-accent font-semibold mb-2">Event Object (e)</div>
              <div className="text-base-content/70 text-sm">
                React wraps native events in a <strong>SyntheticEvent</strong>. Access event data
                via the <code className="text-accent">e</code> parameter.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Common mistake */}
      <div className="px-6 py-4 bg-error/10 border-t border-error flex items-center gap-3">
        <HiOutlineExclamationCircle className="text-error" size={20} />
        <span className="text-base-content/70 text-sm">
          <strong className="text-base-content">Common mistake:</strong> Don't call the function
          immediately! Use <code className="text-success">{'onClick={handleClick}'}</code>, not{' '}
          <code className="text-error">{'onClick={handleClick()}'}</code>
        </span>
      </div>
    </div>
  );
}

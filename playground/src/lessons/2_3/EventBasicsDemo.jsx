import { useState } from 'react';
import { HiChevronDown, HiChevronRight, HiOutlineExclamationCircle } from 'react-icons/hi';

export default function EventBasicsDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [lastEvent, setLastEvent] = useState(null);
  const [showCode, setShowCode] = useState(true);

  const handleClick = (e) => {
    if (!e) return;
    setClickCount((prev) => prev + 1);
    setLastEvent({
      type: e.type,
      target: e.target?.tagName || 'Unknown',
      currentTarget: e.currentTarget?.tagName || 'Unknown',
      timestamp: new Date().toLocaleTimeString(),
    });
  };

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
            <pre className="m-0 text-xs leading-relaxed">
              <code className="text-base-content/70">
                {`type: "${lastEvent.type}"\ntarget: ${lastEvent.target}\ncurrentTarget: ${lastEvent.currentTarget}\ntime: ${lastEvent.timestamp}`}
              </code>
            </pre>
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
          <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed">
            <code className="text-base-content">
              <span className="text-secondary">function</span>
              {` `}
              <span className="text-primary">Button</span>
              {`() {\n  `}
              <span className="text-secondary">const</span>
              {` [count, setCount] = `}
              <span className="text-success">useState</span>
              {`(0);\n\n  `}
              <span className="text-base-content/50">// Event handler function</span>
              {`\n  `}
              <span className="text-secondary">const</span>
              {` handleClick = (`}
              <span className="text-accent">e</span>
              {`) => {\n    `}
              <span className="text-base-content/50">// e is the SyntheticEvent object</span>
              {`\n    console.log(`}
              <span className="text-warning">'Clicked!'</span>
              {`, `}
              <span className="text-accent">e</span>
              {`);\n    setCount(count + 1);\n  };\n\n  `}
              <span className="text-secondary">return</span>
              {` (\n    <button `}
              <span className="text-primary">onClick</span>
              {`={`}
              <span className="text-warning">handleClick</span>
              {`}>\n      Click me\n    </button>\n  );\n}`}
            </code>
          </pre>

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

// ============================================
// Children as a Function Demo
// Shows the cleaner children-as-function pattern
// ============================================

import { useState, ReactNode } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';

// ---- Toggle component with children as function ----
interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => ReactNode;
  initialValue?: boolean;
}

function Toggle({ children, initialValue = false }: ToggleProps) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = () => setIsOn((prev) => !prev);

  return <>{children(isOn, toggle)}</>;
}

// ---- Hover component with children as function ----
interface HoverProps {
  children: (isHovered: boolean) => ReactNode;
}

function Hover({ children }: HoverProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {children(isHovered)}
    </div>
  );
}

// ---- WindowSize component ----
interface WindowSizeProps {
  children: (size: { width: number; height: number }) => ReactNode;
}

function WindowSize({ children }: WindowSizeProps) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useState(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  });

  return <>{children(size)}</>;
}

const namedPropCode = `// Named render prop - works but verbose
<Counter
  render={(count, increment) => (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
/>`;

const childrenAsFunctionCode = `// Children as function - cleaner syntax!
<Counter>
  {(count, increment) => (
    <div>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  )}
</Counter>`;

const toggleComponentCode = `interface ToggleProps {
  children: (isOn: boolean, toggle: () => void) => ReactNode;
  initialValue?: boolean;
}

function Toggle({ children, initialValue = false }: ToggleProps) {
  const [isOn, setIsOn] = useState(initialValue);
  const toggle = () => setIsOn(prev => !prev);

  // Call children as a function!
  return <>{children(isOn, toggle)}</>;
}

// Usage - children IS the render function
<Toggle>
  {(isOn, toggle) => (
    <button onClick={toggle}>
      {isOn ? 'ON' : 'OFF'}
    </button>
  )}
</Toggle>`;

export default function ChildrenAsFunctionDemo() {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Syntax Comparison */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Named Prop vs Children</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-base-content/60 mb-2">Named render prop</p>
            <CodeSnippet title="" language="tsx" code={namedPropCode} showCopy={false} />
          </div>
          <div>
            <p className="text-xs text-base-content/60 mb-2">Children as function ✨</p>
            <CodeSnippet title="" language="tsx" code={childrenAsFunctionCode} showCopy={false} />
          </div>
        </div>
        <p className="text-sm text-base-content/70 mt-3">
          Both work the same way, but <code className="text-secondary">children</code> feels more
          natural since it goes between the tags.
        </p>
      </div>

      {/* Component Code */}
      <div className="card bg-base-200 p-4">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-semibold">How Toggle Works</h4>
          <button onClick={() => setShowCode(!showCode)} className="btn btn-xs btn-ghost">
            {showCode ? 'Hide' : 'Show'} Code
          </button>
        </div>

        {showCode && (
          <CodeSnippet title="Toggle component" language="tsx" code={toggleComponentCode} />
        )}
      </div>

      {/* Live Demos */}
      <div className="space-y-4">
        <h4 className="font-semibold">Live Demos: Same Component, Different Renders</h4>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Toggle as switch */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">As a Switch</p>
            <Toggle>
              {(isOn, toggle) => (
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggle}
                    className={`relative w-14 h-7 rounded-full transition-colors ${
                      isOn ? 'bg-success' : 'bg-base-content/20'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                        isOn ? 'left-8' : 'left-1'
                      }`}
                    />
                  </button>
                  <span className={isOn ? 'text-success' : 'text-base-content/60'}>
                    {isOn ? 'Enabled' : 'Disabled'}
                  </span>
                </div>
              )}
            </Toggle>
          </div>

          {/* Toggle as button */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">As a Button</p>
            <Toggle>
              {(isOn, toggle) => (
                <button onClick={toggle} className={`btn ${isOn ? 'btn-primary' : 'btn-ghost'}`}>
                  {isOn ? '⭐ Favorited' : '☆ Add to Favorites'}
                </button>
              )}
            </Toggle>
          </div>

          {/* Toggle as icon */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">As Heart Icon</p>
            <Toggle>
              {(isOn, toggle) => (
                <button
                  onClick={toggle}
                  className={`text-3xl transition-transform hover:scale-110 ${
                    isOn ? 'text-red-500' : 'text-base-content/30'
                  }`}
                >
                  {isOn ? '❤️' : '🤍'}
                </button>
              )}
            </Toggle>
          </div>

          {/* Toggle as accordion header */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">As Accordion</p>
            <Toggle>
              {(isOn, toggle) => (
                <div>
                  <button
                    onClick={toggle}
                    className="flex items-center gap-2 font-medium w-full text-left"
                  >
                    <span
                      className="transition-transform"
                      style={{ transform: isOn ? 'rotate(90deg)' : '' }}
                    >
                      ▶
                    </span>
                    Click to {isOn ? 'collapse' : 'expand'}
                  </button>
                  {isOn && (
                    <p className="mt-2 text-sm text-base-content/70 pl-5">
                      This content was hidden until you clicked!
                    </p>
                  )}
                </div>
              )}
            </Toggle>
          </div>
        </div>
      </div>

      {/* More Examples */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">More Examples</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Hover */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">Hover Component</p>
            <Hover>
              {(isHovered) => (
                <div
                  className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                    isHovered ? 'border-primary bg-primary/10 scale-105' : 'border-base-content/20'
                  }`}
                >
                  <p className="text-center">{isHovered ? '🎉 Hovering!' : 'Hover over me'}</p>
                </div>
              )}
            </Hover>
          </div>

          {/* Window Size */}
          <div className="card bg-base-300 p-4">
            <p className="text-xs text-base-content/60 mb-2">WindowSize Component</p>
            <WindowSize>
              {({ width, height }) => (
                <div className="text-center">
                  <p className="text-2xl font-mono">
                    {width} × {height}
                  </p>
                  <p className="text-xs text-base-content/60">Resize the window to update</p>
                </div>
              )}
            </WindowSize>
          </div>
        </div>
      </div>

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Why Children as Function?</h4>
            <p className="text-sm text-base-content/70">
              Using <code className="text-secondary">children</code> instead of a named prop like{' '}
              <code className="text-secondary">render</code> is purely ergonomic. It reads more
              naturally and avoids extra prop syntax. Both approaches work identically!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

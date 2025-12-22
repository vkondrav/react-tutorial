// ============================================
// Demo: Accessing DOM Elements with useRef
// ============================================

import { useRef, useState, useEffect } from 'react';
import { HiOutlineCursorClick, HiOutlinePhotograph } from 'react-icons/hi';

export default function DomAccessDemo() {
  const [activeDemo, setActiveDemo] = useState('focus');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineCursorClick className="text-primary" size={20} />
        DOM Access Examples
      </h3>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'focus', label: 'Focus' },
          { id: 'scroll', label: 'Scroll' },
          { id: 'measure', label: 'Measure' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className={`btn btn-sm ${activeDemo === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="min-h-[200px]">
        {activeDemo === 'focus' && <FocusDemo />}
        {activeDemo === 'scroll' && <ScrollDemo />}
        {activeDemo === 'measure' && <MeasureDemo />}
      </div>
    </div>
  );
}

// Focus Demo
function FocusDemo() {
  const inputRef = useRef(null);
  const [value, setValue] = useState('');

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const selectAll = () => {
    inputRef.current?.select();
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Use refs to programmatically focus inputs, select text, or trigger other DOM methods.
      </p>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Click a button to interact..."
          className="input input-bordered flex-1"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={focusInput} className="btn btn-primary btn-sm">
          Focus Input
        </button>
        <button onClick={selectAll} className="btn btn-secondary btn-sm">
          Select All
        </button>
        <button onClick={() => setValue('')} className="btn btn-ghost btn-sm">
          Clear
        </button>
      </div>

      {/* Code */}
      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">const</span> inputRef ={' '}
            <span className="text-primary">useRef</span>(null);{'\n\n'}
            {'<'}
            <span className="text-accent">input</span> <span className="text-warning">ref</span>=
            {'{inputRef}'} /{'>'}
            {'\n\n'}
            inputRef.current.<span className="text-primary">focus</span>();{' '}
            <span className="text-base-content/60">// Focus the input</span>
            {'\n'}
            inputRef.current.<span className="text-primary">select</span>();{' '}
            <span className="text-base-content/60">// Select all text</span>
          </code>
        </pre>
      </div>
    </div>
  );
}

// Scroll Demo
function ScrollDemo() {
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Refs let you scroll to specific elements or positions programmatically.
      </p>

      <div className="flex gap-2 mb-2">
        <button onClick={scrollToTop} className="btn btn-primary btn-sm">
          Scroll to Top
        </button>
        <button onClick={scrollToBottom} className="btn btn-secondary btn-sm">
          Scroll to Bottom
        </button>
      </div>

      <div
        ref={containerRef}
        className="h-32 overflow-y-auto rounded-lg border border-base-300 bg-base-300/50"
      >
        <div ref={topRef} className="p-3 bg-primary/20 text-sm">
          🔝 Top of the list
        </div>
        {Array.from({ length: 10 }, (_, i) => (
          <div key={i} className="p-2 border-b border-base-300/50 text-sm text-base-content/60">
            Item {i + 1}
          </div>
        ))}
        <div ref={bottomRef} className="p-3 bg-secondary/20 text-sm">
          🔽 Bottom of the list
        </div>
      </div>

      {/* Code */}
      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">const</span> bottomRef ={' '}
            <span className="text-primary">useRef</span>(null);{'\n\n'}
            {'<'}
            <span className="text-accent">div</span> <span className="text-warning">ref</span>=
            {'{bottomRef}'}
            {'>'}Bottom{'</'}
            <span className="text-accent">div</span>
            {'>'}
            {'\n\n'}
            bottomRef.current.<span className="text-primary">scrollIntoView</span>({'{ '}behavior:
            'smooth'{' }'});
          </code>
        </pre>
      </div>
    </div>
  );
}

// Measure Demo
function MeasureDemo() {
  const boxRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [boxSize, setBoxSize] = useState(100);

  const measureBox = () => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setDimensions({ width: Math.round(rect.width), height: Math.round(rect.height) });
    }
  };

  // Measure on mount and when size changes
  useEffect(() => {
    measureBox();
  }, [boxSize]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Use refs to measure DOM elements — get width, height, position, etc.
      </p>

      <div className="flex items-start gap-4">
        <div
          ref={boxRef}
          style={{ width: boxSize, height: boxSize }}
          className="bg-linear-to-br from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold transition-all duration-300"
        >
          <HiOutlinePhotograph size={24} />
        </div>

        <div className="flex-1 space-y-2">
          <div className="text-sm">
            <span className="text-base-content/60">Width:</span>{' '}
            <span className="font-mono text-primary">{dimensions.width}px</span>
          </div>
          <div className="text-sm">
            <span className="text-base-content/60">Height:</span>{' '}
            <span className="font-mono text-secondary">{dimensions.height}px</span>
          </div>

          <div className="pt-2">
            <label className="text-xs text-base-content/60">Resize box:</label>
            <input
              type="range"
              min="50"
              max="150"
              value={boxSize}
              onChange={(e) => setBoxSize(Number(e.target.value))}
              className="range range-primary range-sm w-full"
            />
          </div>
        </div>
      </div>

      {/* Code */}
      <div className="p-3 rounded-lg bg-base-300">
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            <span className="text-secondary">const</span> rect = boxRef.current.
            <span className="text-primary">getBoundingClientRect</span>();{'\n'}
            console.log(rect.width, rect.height);{' '}
            <span className="text-base-content/60">
              // {dimensions.width}, {dimensions.height}
            </span>
          </code>
        </pre>
      </div>
    </div>
  );
}

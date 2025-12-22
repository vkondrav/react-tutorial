// ============================================
// Demo: Extracting Logic into Custom Hooks
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineLightBulb, HiCheck, HiX } from 'react-icons/hi';

// ============================================
// Custom Hook: useWindowSize
// ============================================
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default function ExtractingLogicDemo() {
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Before & After: Extracting useWindowSize
      </h3>

      {/* Toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowBefore(true)}
          className={`btn btn-sm ${showBefore ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} className={showBefore ? '' : 'opacity-0'} />
          Before (Inline)
        </button>
        <button
          onClick={() => setShowBefore(false)}
          className={`btn btn-sm ${!showBefore ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} className={!showBefore ? '' : 'opacity-0'} />
          After (Custom Hook)
        </button>
      </div>

      {/* Code comparison */}
      <div className="grid grid-cols-1 gap-4 mb-4">
        {showBefore ? <BeforeCode /> : <AfterCode />}
      </div>

      {/* Live demo */}
      <div className="bg-base-300 rounded-lg p-4">
        <div className="text-xs text-base-content/60 mb-2">Live Demo (resize window)</div>
        <WindowSizeDisplay />
      </div>
    </div>
  );
}

function BeforeCode() {
  return (
    <div className="card bg-error/10 border border-error/30 p-4">
      <div className="text-xs font-semibold text-error mb-2">Before: Logic in Component</div>
      <pre className="font-mono text-xs overflow-x-auto">
        <code>
          {`function MyComponent() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 15+ lines just for window size!
  return <div>Width: {size.width}</div>;
}`}
        </code>
      </pre>
      <p className="text-xs text-error/70 mt-2">
        Problem: This logic would be duplicated in every component that needs window size.
      </p>
    </div>
  );
}

function AfterCode() {
  return (
    <div className="space-y-4">
      <div className="card bg-success/10 border border-success/30 p-4">
        <div className="text-xs font-semibold text-success mb-2">After: Custom Hook</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => setSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}`}
          </code>
        </pre>
      </div>
      <div className="card bg-primary/10 border border-primary/30 p-4">
        <div className="text-xs font-semibold text-primary mb-2">Usage: Clean & Simple</div>
        <pre className="font-mono text-xs overflow-x-auto">
          <code>
            {`function MyComponent() {
  const { width, height } = useWindowSize();
  return <div>Width: {width}</div>;
}

// Reuse anywhere!
function AnotherComponent() {
  const { width } = useWindowSize();
  return width < 768 ? <MobileNav /> : <DesktopNav />;
}`}
          </code>
        </pre>
        <p className="text-xs text-primary/70 mt-2">
          Benefit: Write once, use everywhere. Components stay focused on rendering.
        </p>
      </div>
    </div>
  );
}

function WindowSizeDisplay() {
  const { width, height } = useWindowSize();
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1024;

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1">
        <div className="text-2xl font-mono font-bold text-primary">
          {width} × {height}
        </div>
        <div className="text-xs text-base-content/60">pixels</div>
      </div>
      <div
        className={`badge ${isMobile ? 'badge-error' : isTablet ? 'badge-warning' : 'badge-success'}`}
      >
        {isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}
      </div>
    </div>
  );
}

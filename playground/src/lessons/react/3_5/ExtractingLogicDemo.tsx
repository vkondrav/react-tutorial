// ============================================
// Demo: Extracting Logic into Custom Hooks
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineLightBulb, HiCheck, HiX } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import beforeExtractionCode from './examples/BeforeExtraction.tsx?raw';
import afterExtractionHookCode from './examples/AfterExtractionHook.tsx?raw';
import afterExtractionUsageCode from './examples/AfterExtractionUsage.tsx?raw';

// ============================================
// Types
// ============================================
interface WindowSize {
  width: number;
  height: number;
}

// ============================================
// Custom Hook: useWindowSize
// ============================================
function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
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

export default function ExtractingLogicDemo(): React.ReactElement {
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

function BeforeCode(): React.ReactElement {
  return (
    <div>
      <CodeSnippet title="Before: Logic in Component" language="tsx" code={beforeExtractionCode} />
      <p className="text-xs text-error/70 mt-2">
        Problem: This logic would be duplicated in every component that needs window size.
      </p>
    </div>
  );
}

function AfterCode(): React.ReactElement {
  return (
    <div className="space-y-4">
      <CodeSnippet
        title="After: Custom Hook (TypeScript)"
        language="tsx"
        code={afterExtractionHookCode}
      />
      <div>
        <CodeSnippet title="Usage: Clean & Simple" language="tsx" code={afterExtractionUsageCode} />
        <p className="text-xs text-primary/70 mt-2">
          Benefit: Write once, use everywhere. Components stay focused on rendering.
        </p>
      </div>
    </div>
  );
}

function WindowSizeDisplay(): React.ReactElement {
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

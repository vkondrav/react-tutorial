import { useState, useRef, useEffect } from 'react';
import { HiOutlineCheck, HiOutlineX } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import performanceCode from './examples/Performance.css?raw';

type AnimationType = 'transform' | 'left';

export default function PerformanceLayerDemo(): React.ReactElement {
  const [animationType, setAnimationType] = useState<AnimationType>('transform');
  const [isAnimating, setIsAnimating] = useState(false);
  const [fps, setFps] = useState<number | null>(null);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  // FPS counter
  useEffect(() => {
    if (!isAnimating) {
      queueMicrotask(() => setFps(null));
      return;
    }

    const measureFPS = () => {
      frameCountRef.current++;
      const now = performance.now();
      const elapsed = now - lastTimeRef.current;

      if (elapsed >= 1000) {
        setFps(Math.round((frameCountRef.current * 1000) / elapsed));
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }

      rafRef.current = requestAnimationFrame(measureFPS);
    };

    frameCountRef.current = 0;
    lastTimeRef.current = performance.now();
    rafRef.current = requestAnimationFrame(measureFPS);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAnimating]);

  const toggleAnimation = () => {
    setIsAnimating(!isAnimating);
  };

  return (
    <div className="space-y-6">
      {/* Type Toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setAnimationType('transform')}
          className={`btn btn-sm ${animationType === 'transform' ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiOutlineCheck className="mr-1" />
          transform (GPU)
        </button>
        <button
          onClick={() => setAnimationType('left')}
          className={`btn btn-sm ${animationType === 'left' ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiOutlineX className="mr-1" />
          left (Layout)
        </button>
      </div>

      {/* Animation Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Live Comparison</h4>
          <div className="flex items-center gap-4">
            {fps !== null && (
              <span
                className={`font-mono text-sm ${fps >= 55 ? 'text-success' : fps >= 30 ? 'text-warning' : 'text-error'}`}
              >
                {fps} FPS
              </span>
            )}
            <button onClick={toggleAnimation} className="btn btn-sm btn-primary">
              {isAnimating ? 'Stop' : 'Start'} Animation
            </button>
          </div>
        </div>

        {/* Animation Track */}
        <div className="animation-track relative h-24 bg-base-300 rounded-lg overflow-hidden">
          <div
            className={`
              absolute top-1/2 -translate-y-1/2 w-16 h-16 rounded-xl
              bg-linear-to-br from-primary to-secondary shadow-lg
              ${animationType === 'transform' ? 'animate-slide-transform' : 'animate-slide-left'}
              ${!isAnimating && 'animation-paused'}
            `}
            style={{
              animationPlayState: isAnimating ? 'running' : 'paused',
            }}
          />
        </div>

        {/* Explanation */}
        <div className="mt-4 grid sm:grid-cols-2 gap-4">
          <div
            className={`p-4 rounded-lg ${animationType === 'transform' ? 'bg-success/10 ring-2 ring-success' : 'bg-base-300'}`}
          >
            <h5 className="font-semibold flex items-center gap-2 text-success">
              <HiOutlineCheck /> transform: translateX()
            </h5>
            <p className="text-sm text-base-content/70 mt-2">
              Only triggers <strong>Composite</strong> phase. GPU-accelerated, runs on a separate
              thread. Smooth 60fps even with complex layouts.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-300 rounded p-2">
              Render: Composite only ✓
            </div>
          </div>

          <div
            className={`p-4 rounded-lg ${animationType === 'left' ? 'bg-error/10 ring-2 ring-error' : 'bg-base-300'}`}
          >
            <h5 className="font-semibold flex items-center gap-2 text-error">
              <HiOutlineX /> left: 0 → 300px
            </h5>
            <p className="text-sm text-base-content/70 mt-2">
              Triggers <strong>Layout → Paint → Composite</strong> every frame. Forces geometry
              recalculation. Can cause jank on complex pages.
            </p>
            <div className="mt-2 text-xs font-mono bg-base-300 rounded p-2">
              Render: Layout + Paint + Composite ✗
            </div>
          </div>
        </div>
      </div>

      {/* Rendering Pipeline */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">The Rendering Pipeline</h4>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <div className="flex-1 text-center p-3 bg-error/20 rounded-lg sm:rounded-r-none">
            <div className="font-bold text-error">Layout</div>
            <p className="text-xs mt-1">Geometry (width, height, position)</p>
            <p className="text-xs text-base-content/60 mt-1">Most expensive</p>
          </div>
          <div className="hidden sm:block text-2xl self-center">→</div>
          <div className="flex-1 text-center p-3 bg-warning/20 sm:rounded-none">
            <div className="font-bold text-warning">Paint</div>
            <p className="text-xs mt-1">Pixels (color, shadow, border)</p>
            <p className="text-xs text-base-content/60 mt-1">Moderate cost</p>
          </div>
          <div className="hidden sm:block text-2xl self-center">→</div>
          <div className="flex-1 text-center p-3 bg-success/20 rounded-lg sm:rounded-l-none">
            <div className="font-bold text-success">Composite</div>
            <p className="text-xs mt-1">Layers (transform, opacity)</p>
            <p className="text-xs text-base-content/60 mt-1">Cheapest (GPU)</p>
          </div>
        </div>
      </div>

      {/* Property Reference */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Property Performance Guide</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <h5 className="text-success font-semibold flex items-center gap-2 mb-2">
              <HiOutlineCheck /> Safe to Animate (Composite only)
            </h5>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                <code className="bg-base-300 px-1 rounded">transform</code> (translate, scale,
                rotate)
              </li>
              <li>
                <code className="bg-base-300 px-1 rounded">opacity</code>
              </li>
              <li>
                <code className="bg-base-300 px-1 rounded">filter</code> (blur, brightness)
              </li>
            </ul>
          </div>
          <div>
            <h5 className="text-error font-semibold flex items-center gap-2 mb-2">
              <HiOutlineX /> Avoid Animating (Triggers Layout)
            </h5>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                <code className="bg-base-300 px-1 rounded">left</code>,{' '}
                <code className="bg-base-300 px-1 rounded">top</code>,{' '}
                <code className="bg-base-300 px-1 rounded">right</code>,{' '}
                <code className="bg-base-300 px-1 rounded">bottom</code>
              </li>
              <li>
                <code className="bg-base-300 px-1 rounded">width</code>,{' '}
                <code className="bg-base-300 px-1 rounded">height</code>
              </li>
              <li>
                <code className="bg-base-300 px-1 rounded">margin</code>,{' '}
                <code className="bg-base-300 px-1 rounded">padding</code>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Performance-Optimized Animations" language="css" code={performanceCode} />
    </div>
  );
}

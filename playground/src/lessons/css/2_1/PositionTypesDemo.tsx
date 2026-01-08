import { useState, useRef, useEffect } from 'react';
import { HiOutlineEye, HiOutlineArrowDown } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import positionTypesCode from './examples/PositionTypes.css?raw';

type PositionType = 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';

interface PositionInfo {
  id: PositionType;
  label: string;
  color: string;
  description: string;
  inFlow: boolean;
  relativeTo: string;
}

export default function PositionTypesDemo(): React.ReactElement {
  const [activeType, setActiveType] = useState<PositionType>('static');
  const [offset, setOffset] = useState({ top: 20, left: 20 });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const positionTypes: PositionInfo[] = [
    {
      id: 'static',
      label: 'static',
      color: 'base-content',
      description: 'Default. Element follows normal flow. top/left/right/bottom are ignored.',
      inFlow: true,
      relativeTo: 'N/A (no positioning)',
    },
    {
      id: 'relative',
      label: 'relative',
      color: 'success',
      description:
        'Element stays in flow but can be offset. Creates positioning context for children.',
      inFlow: true,
      relativeTo: 'Its normal position',
    },
    {
      id: 'absolute',
      label: 'absolute',
      color: 'warning',
      description: 'Removed from flow. Positioned relative to nearest positioned ancestor.',
      inFlow: false,
      relativeTo: 'Nearest positioned ancestor (or viewport)',
    },
    {
      id: 'fixed',
      label: 'fixed',
      color: 'error',
      description: 'Removed from flow. Positioned relative to viewport. Stays put during scroll.',
      inFlow: false,
      relativeTo: 'Viewport',
    },
    {
      id: 'sticky',
      label: 'sticky',
      color: 'accent',
      description: 'Hybrid: normal until scroll threshold, then sticks within its container.',
      inFlow: true,
      relativeTo: 'Normal position, then container bounds',
    },
  ];

  const currentType = positionTypes.find((t) => t.id === activeType)!;

  // Handle scroll for sticky demo
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      setIsScrolled(el.scrollTop > 30);
    };

    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-6">
      {/* Position Type Selection */}
      <div className="flex flex-wrap gap-2">
        {positionTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setActiveType(type.id)}
            className={`btn btn-sm ${
              activeType === type.id
                ? type.id === 'static'
                  ? 'btn-neutral'
                  : `btn-${type.color}`
                : 'btn-ghost'
            }`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Info Card */}
      <div className="bg-base-200 rounded-xl p-4">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <h5 className="font-semibold mb-1">
              position: <span className={`text-${currentType.color}`}>{currentType.id}</span>
            </h5>
            <p className="text-sm text-base-content/70">{currentType.description}</p>
          </div>
          <div className="flex gap-4">
            <div className="text-center">
              <div
                className={`badge ${currentType.inFlow ? 'badge-success' : 'badge-warning'} mb-1`}
              >
                {currentType.inFlow ? 'In Flow' : 'Out of Flow'}
              </div>
              <div className="text-xs text-base-content/50">Document Flow</div>
            </div>
            <div className="text-center max-w-[150px]">
              <div className="text-xs font-mono bg-base-300 px-2 py-1 rounded">
                {currentType.relativeTo}
              </div>
              <div className="text-xs text-base-content/50 mt-1">Positioned Relative To</div>
            </div>
          </div>
        </div>
      </div>

      {/* Offset Controls (for non-static) */}
      {activeType !== 'static' && (
        <div className="bg-base-200 rounded-xl p-4">
          <h5 className="font-semibold mb-3">Offset Values</h5>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="label">
                <span className="label-text">top: {offset.top}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={offset.top}
                onChange={(e) => setOffset((o) => ({ ...o, top: parseInt(e.target.value) }))}
                className="range range-sm range-primary"
              />
            </div>
            <div>
              <label className="label">
                <span className="label-text">left: {offset.left}px</span>
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={offset.left}
                onChange={(e) => setOffset((o) => ({ ...o, left: parseInt(e.target.value) }))}
                className="range range-sm range-secondary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineEye className="text-primary" size={20} />
          <h4 className="font-semibold">Visual Demo</h4>
          {activeType === 'sticky' && (
            <span className="badge badge-accent badge-sm">Scroll the container below ↓</span>
          )}
        </div>

        {/* Demo Container */}
        <div
          ref={scrollRef}
          className="relative bg-base-300 rounded-lg overflow-auto border-2 border-dashed border-base-content/20"
          style={{ height: activeType === 'sticky' ? 200 : 300 }}
        >
          {/* Container label */}
          <span className="sticky top-0 left-0 text-xs text-base-content/50 font-mono bg-base-300 px-2 py-1 z-10">
            container (position: relative)
          </span>

          {/* Content for scrolling (sticky demo) */}
          {activeType === 'sticky' && (
            <div className="p-4 pt-0">
              <div className="bg-primary/20 rounded p-3 mb-3">
                <span className="text-sm">Content before sticky element</span>
              </div>

              {/* Sticky Element */}
              <div
                className="bg-accent text-accent-content rounded p-3 font-semibold"
                style={{
                  position: 'sticky',
                  top: offset.top,
                }}
              >
                Sticky Header (top: {offset.top}px)
                <span className="block text-xs font-normal opacity-80">
                  {isScrolled
                    ? '🔒 Now stuck! Scroll more to see it unstick at container boundary.'
                    : '📜 Scroll down to see me stick!'}
                </span>
              </div>

              <div className="space-y-3 mt-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-secondary/20 rounded p-3">
                    <span className="text-sm">Scrollable content {i}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Non-sticky demos */}
          {activeType !== 'sticky' && (
            <div className="p-4">
              {/* Static siblings */}
              <div className="bg-primary/30 border-2 border-primary border-dashed rounded p-4 mb-4">
                <span className="font-mono text-sm">Sibling 1 (static)</span>
              </div>

              {/* Target element */}
              <div
                className={`rounded p-4 font-semibold transition-all duration-300 ${
                  activeType === 'static'
                    ? 'bg-base-content/20 border-2 border-base-content/50 mb-4'
                    : activeType === 'relative'
                      ? 'bg-success text-success-content border-2 border-success mb-4'
                      : activeType === 'absolute'
                        ? 'bg-warning text-warning-content border-2 border-warning'
                        : 'bg-error text-error-content border-2 border-error'
                }`}
                style={{
                  position: activeType === 'fixed' ? 'absolute' : activeType, // Use absolute in demo for fixed
                  ...(activeType !== 'static' && {
                    top: offset.top,
                    left: offset.left,
                  }),
                }}
              >
                Target Element
                <span className="block text-xs font-normal opacity-80">
                  position: {activeType}
                  {activeType !== 'static' && ` | top: ${offset.top}px, left: ${offset.left}px`}
                </span>
              </div>

              {/* Ghost position for relative */}
              {activeType === 'relative' && (
                <div
                  className="absolute border-2 border-dashed border-success/50 rounded p-4 pointer-events-none"
                  style={{
                    top: 'calc(1rem + 60px + 1rem)',
                    left: '1rem',
                    right: '1rem',
                  }}
                >
                  <span className="font-mono text-sm text-success/50">
                    Original position (ghost)
                  </span>
                </div>
              )}

              {/* More siblings */}
              <div
                className={`bg-secondary/30 border-2 border-secondary border-dashed rounded p-4 mb-4 ${
                  activeType === 'absolute' || activeType === 'fixed' ? 'mt-0' : ''
                }`}
              >
                <span className="font-mono text-sm">Sibling 2 (static)</span>
                {(activeType === 'absolute' || activeType === 'fixed') && (
                  <span className="block text-xs text-warning mt-1">
                    ↑ Moved up because target is out of flow
                  </span>
                )}
              </div>

              <div className="bg-accent/30 border-2 border-accent border-dashed rounded p-4">
                <span className="font-mono text-sm">Sibling 3 (static)</span>
              </div>
            </div>
          )}
        </div>

        {/* Fixed demo note */}
        {activeType === 'fixed' && (
          <div className="mt-4 text-sm text-base-content/60 flex items-center gap-2">
            <HiOutlineArrowDown size={16} />
            <span>
              In this demo, we use <code>absolute</code> to simulate fixed behavior within the
              container. Real <code>fixed</code> elements would appear relative to your browser
              viewport.
            </span>
          </div>
        )}
      </div>

      {/* The Key Pattern */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">The Essential Pattern: Relative Parent + Absolute Child</h4>
          <p className="text-sm mt-1">
            <code className="bg-info-content/20 px-1 rounded">position: absolute</code> looks for
            the nearest ancestor with{' '}
            <code className="bg-info-content/20 px-1 rounded">position: relative</code> (or
            absolute/fixed). Always wrap absolute elements in a relative container!
          </p>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Position Types Reference" language="css" code={positionTypesCode} />
    </div>
  );
}

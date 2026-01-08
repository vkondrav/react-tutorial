import { useState, useRef } from 'react';
import { HiOutlineArrowsExpand, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import fluidTypographyCode from './examples/FluidTypography.css?raw';

export default function FluidTypographyDemo(): React.ReactElement {
  const [minSize, setMinSize] = useState(16);
  const [maxSize, setMaxSize] = useState(32);
  const [preferredVw, setPreferredVw] = useState(4);
  const [containerWidth, setContainerWidth] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate the computed font size based on clamp simulation
  const calculateClampedSize = (width: number): number => {
    const preferredPx = (width * preferredVw) / 100;
    return Math.min(maxSize, Math.max(minSize, preferredPx));
  };

  const computedSize = calculateClampedSize(containerWidth);

  // Generate the clamp() CSS string
  const clampString = `clamp(${minSize}px, ${preferredVw}vw, ${maxSize}px)`;

  // Calculate breakpoints where clamp kicks in
  const minBreakpoint = Math.ceil((minSize / preferredVw) * 100);
  const maxBreakpoint = Math.ceil((maxSize / preferredVw) * 100);

  return (
    <div className="space-y-6">
      {/* Interactive Controls */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <HiOutlineArrowsExpand className="text-primary" size={20} />
          Build Your clamp() Value
        </h4>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {/* Min Size */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span className="text-success font-medium">Min Size</span>
              <span className="font-mono">{minSize}px</span>
            </label>
            <input
              type="range"
              min="10"
              max="24"
              value={minSize}
              onChange={(e) => setMinSize(Number(e.target.value))}
              className="range range-xs range-success w-full"
            />
            <p className="text-xs text-base-content/60">Never smaller than this</p>
          </div>

          {/* Preferred (vw) */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span className="text-warning font-medium">Preferred</span>
              <span className="font-mono">{preferredVw}vw</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              step="0.5"
              value={preferredVw}
              onChange={(e) => setPreferredVw(Number(e.target.value))}
              className="range range-xs range-warning w-full"
            />
            <p className="text-xs text-base-content/60">Scales with viewport</p>
          </div>

          {/* Max Size */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span className="text-error font-medium">Max Size</span>
              <span className="font-mono">{maxSize}px</span>
            </label>
            <input
              type="range"
              min="24"
              max="64"
              value={maxSize}
              onChange={(e) => setMaxSize(Number(e.target.value))}
              className="range range-xs range-error w-full"
            />
            <p className="text-xs text-base-content/60">Never larger than this</p>
          </div>
        </div>

        {/* Result */}
        <div className="bg-base-300 rounded-lg p-4 font-mono text-center">
          <span className="text-sm text-base-content/60">font-size: </span>
          <span className="text-lg">
            <span className="text-success">{minSize}px</span>
            <span className="text-base-content/60">, </span>
            <span className="text-warning">{preferredVw}vw</span>
            <span className="text-base-content/60">, </span>
            <span className="text-error">{maxSize}px</span>
          </span>
          <span className="text-sm text-base-content/60">)</span>
          <div className="mt-2 text-sm text-base-content/70">
            <code className="bg-base-200 px-2 py-1 rounded">{clampString}</code>
          </div>
        </div>
      </div>

      {/* Live Preview with Resizable Container */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">Live Preview</h4>
          <span className="badge badge-lg font-mono">{containerWidth}px viewport</span>
        </div>

        {/* Width Slider */}
        <div className="mb-4">
          <input
            type="range"
            min="320"
            max="1400"
            value={containerWidth}
            onChange={(e) => setContainerWidth(Number(e.target.value))}
            className="range range-primary w-full"
          />
          <div className="flex justify-between text-xs mt-1 text-base-content/60">
            <span>320px</span>
            <span>Mobile (375px)</span>
            <span>Tablet (768px)</span>
            <span>Desktop (1024px)</span>
            <span>1400px</span>
          </div>
        </div>

        {/* Preview Container */}
        <div
          ref={containerRef}
          className="bg-base-300 rounded-lg p-6 mx-auto overflow-hidden transition-all duration-300"
          style={{ width: `${Math.min(containerWidth, 100)}%`, maxWidth: `${containerWidth}px` }}
        >
          <p
            className="leading-tight font-semibold transition-all duration-300"
            style={{ fontSize: `${computedSize}px` }}
          >
            The quick brown fox jumps over the lazy dog.
          </p>
          <p className="text-sm text-base-content/60 mt-2">
            Computed size:{' '}
            <span className="font-mono font-bold text-primary">{computedSize.toFixed(1)}px</span>
          </p>
        </div>

        {/* Size indicator bar */}
        <div className="mt-4 space-y-2">
          <div className="h-8 bg-base-300 rounded-full relative overflow-hidden">
            {/* Min zone */}
            <div
              className="absolute left-0 top-0 h-full bg-success/30"
              style={{ width: `${(minBreakpoint / 1400) * 100}%` }}
            />
            {/* Max zone */}
            <div
              className="absolute right-0 top-0 h-full bg-error/30"
              style={{ width: `${((1400 - maxBreakpoint) / 1400) * 100}%` }}
            />
            {/* Current position marker */}
            <div
              className="absolute top-0 h-full w-1 bg-primary transition-all duration-300"
              style={{ left: `${(containerWidth / 1400) * 100}%` }}
            />
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-success">
              ≤{minBreakpoint}px = {minSize}px (min)
            </span>
            <span className="text-warning">Scaling zone</span>
            <span className="text-error">
              ≥{maxBreakpoint}px = {maxSize}px (max)
            </span>
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="alert bg-base-200">
        <HiOutlineLightBulb className="text-warning shrink-0" size={24} />
        <div>
          <h4 className="font-bold">How clamp() Works</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>
              <strong className="text-success">Below {minBreakpoint}px:</strong> Uses minimum (
              {minSize}px) — prevents text from becoming unreadable
            </li>
            <li>
              <strong className="text-warning">
                Between {minBreakpoint}px - {maxBreakpoint}px:
              </strong>{' '}
              Scales with {preferredVw}vw — fluid sizing
            </li>
            <li>
              <strong className="text-error">Above {maxBreakpoint}px:</strong> Uses maximum (
              {maxSize}px) — prevents text from becoming too large
            </li>
          </ul>
        </div>
      </div>

      {/* Common Presets */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Common Typography Presets</h4>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { name: 'Body Text', value: 'clamp(1rem, 1vw + 0.75rem, 1.125rem)', demo: '16-18px' },
            { name: 'Subheading', value: 'clamp(1.25rem, 2vw + 0.5rem, 1.5rem)', demo: '20-24px' },
            { name: 'Heading', value: 'clamp(1.5rem, 3vw + 1rem, 3rem)', demo: '24-48px' },
            { name: 'Hero Title', value: 'clamp(2rem, 5vw + 1rem, 5rem)', demo: '32-80px' },
          ].map((preset) => (
            <div key={preset.name} className="bg-base-300 rounded-lg p-3">
              <p className="font-semibold text-sm">{preset.name}</p>
              <code className="text-xs text-primary break-all">{preset.value}</code>
              <p className="text-xs text-base-content/60 mt-1">{preset.demo}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet
        title="Fluid Typography with clamp()"
        language="css"
        code={fluidTypographyCode}
      />

      {/* Pro Tips */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Pro Tips</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>
              • Use <code>clamp()</code> for font-size, padding, margins, and gap
            </li>
            <li>
              • The formula <code>vw + rem</code> gives smoother scaling than pure vw
            </li>
            <li>• Test at 320px and 1440px to ensure text is always readable</li>
            <li>• Tools like utopia.fyi generate perfect fluid scales automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

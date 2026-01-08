import { useState } from 'react';
import { HiOutlineArrowsExpand, HiOutlineCalculator } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import contentBoxCode from './examples/ContentBox.css?raw';
import borderBoxCode from './examples/BorderBox.css?raw';

type BoxMode = 'content-box' | 'border-box';

interface BoxDimensions {
  width: number;
  padding: number;
  border: number;
}

export default function BoxSizingDemo(): React.ReactElement {
  const [mode, setMode] = useState<BoxMode>('content-box');
  const [dimensions, setDimensions] = useState<BoxDimensions>({
    width: 300,
    padding: 20,
    border: 5,
  });

  // Calculate rendered dimensions
  const contentWidth =
    mode === 'content-box'
      ? dimensions.width
      : dimensions.width - dimensions.padding * 2 - dimensions.border * 2;

  const totalWidth =
    mode === 'content-box'
      ? dimensions.width + dimensions.padding * 2 + dimensions.border * 2
      : dimensions.width;

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setMode('content-box')}
          className={`btn ${mode === 'content-box' ? 'btn-warning' : 'btn-ghost'}`}
        >
          content-box (default)
        </button>
        <button
          onClick={() => setMode('border-box')}
          className={`btn ${mode === 'border-box' ? 'btn-success' : 'btn-ghost'}`}
        >
          border-box (recommended)
        </button>
      </div>

      {/* Interactive Controls */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineArrowsExpand className="text-primary" size={20} />
          <h4 className="font-semibold">Adjust Dimensions</h4>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div>
            <label className="label">
              <span className="label-text">Width: {dimensions.width}px</span>
            </label>
            <input
              type="range"
              min="200"
              max="400"
              value={dimensions.width}
              onChange={(e) => setDimensions((d) => ({ ...d, width: parseInt(e.target.value) }))}
              className="range range-primary range-sm"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Padding: {dimensions.padding}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={dimensions.padding}
              onChange={(e) => setDimensions((d) => ({ ...d, padding: parseInt(e.target.value) }))}
              className="range range-secondary range-sm"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Border: {dimensions.border}px</span>
            </label>
            <input
              type="range"
              min="0"
              max="20"
              value={dimensions.border}
              onChange={(e) => setDimensions((d) => ({ ...d, border: parseInt(e.target.value) }))}
              className="range range-accent range-sm"
            />
          </div>
        </div>
      </div>

      {/* Visual Box Diagram */}
      <div className="bg-base-200 rounded-xl p-6 overflow-x-auto">
        <div className="min-w-fit">
          {/* Margin layer (outermost) */}
          <div
            className="relative bg-warning/20 mx-auto transition-all duration-300"
            style={{ width: totalWidth + 40, padding: 20 }}
          >
            <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-warning text-warning-content px-2 py-0.5 rounded">
              margin
            </span>

            {/* Border layer */}
            <div
              className="relative bg-accent transition-all duration-300"
              style={{
                width: totalWidth,
                padding: dimensions.border,
              }}
            >
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-accent text-accent-content px-2 py-0.5 rounded">
                border ({dimensions.border}px)
              </span>

              {/* Padding layer */}
              <div
                className="relative bg-secondary/50 transition-all duration-300"
                style={{ padding: dimensions.padding }}
              >
                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs bg-secondary text-secondary-content px-2 py-0.5 rounded">
                  padding ({dimensions.padding}px)
                </span>

                {/* Content layer */}
                <div
                  className="bg-primary h-24 flex items-center justify-center transition-all duration-300"
                  style={{ width: contentWidth }}
                >
                  <span className="text-primary-content font-mono text-sm">
                    content
                    <br />
                    {contentWidth}px
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Math Calculation */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineCalculator className="text-primary" size={20} />
          <h4 className="font-semibold">The Math</h4>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* content-box calculation */}
          <div
            className={`p-4 rounded-lg border-2 transition-all ${mode === 'content-box' ? 'border-warning bg-warning/10' : 'border-base-300 opacity-50'}`}
          >
            <h5 className="font-semibold text-warning mb-2">content-box</h5>
            <div className="font-mono text-sm space-y-1 text-base-content/70">
              <div>width: {dimensions.width}px = content width</div>
              <div className="border-t border-base-300 pt-1 mt-2">
                <strong>Total rendered width:</strong>
              </div>
              <div>
                {dimensions.width} + ({dimensions.padding} × 2) + ({dimensions.border} × 2)
              </div>
              <div className="text-warning font-bold">
                = {dimensions.width + dimensions.padding * 2 + dimensions.border * 2}px
              </div>
            </div>
          </div>

          {/* border-box calculation */}
          <div
            className={`p-4 rounded-lg border-2 transition-all ${mode === 'border-box' ? 'border-success bg-success/10' : 'border-base-300 opacity-50'}`}
          >
            <h5 className="font-semibold text-success mb-2">border-box</h5>
            <div className="font-mono text-sm space-y-1 text-base-content/70">
              <div>width: {dimensions.width}px = total width</div>
              <div className="border-t border-base-300 pt-1 mt-2">
                <strong>Content area:</strong>
              </div>
              <div>
                {dimensions.width} - ({dimensions.padding} × 2) - ({dimensions.border} × 2)
              </div>
              <div className="text-success font-bold">
                = {Math.max(0, dimensions.width - dimensions.padding * 2 - dimensions.border * 2)}px
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet
        title={mode === 'content-box' ? 'content-box (default)' : 'border-box (recommended)'}
        language="css"
        code={mode === 'content-box' ? contentBoxCode : borderBoxCode}
      />

      {/* Universal Reset Tip */}
      <div className="alert alert-success">
        <HiOutlineCalculator className="shrink-0" size={20} />
        <div>
          <h4 className="font-bold">Pro Tip: Universal Reset</h4>
          <p className="text-sm">
            Add{' '}
            <code className="bg-success-content/20 px-1 rounded">
              *, *::before, *::after {'{'} box-sizing: border-box; {'}'}
            </code>{' '}
            to your CSS reset. This makes all elements use border-box, which is far more intuitive.
          </p>
        </div>
      </div>
    </div>
  );
}

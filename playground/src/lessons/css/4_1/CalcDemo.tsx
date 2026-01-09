import { useState } from 'react';
import { CodeSnippet } from '@components';
import calculationsCode from './examples/Calculations.css?raw';

export default function CalcDemo(): React.ReactElement {
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarWidth, setSidebarWidth] = useState(200);
  const [spacingUnit, setSpacingUnit] = useState(4);
  const [columns, setColumns] = useState(3);

  const generatedCSS = `/* Dynamic Layout Calculations */
:root {
  --header-height: ${headerHeight}px;
  --sidebar-width: ${sidebarWidth}px;
  --spacing-unit: ${spacingUnit}px;
  --columns: ${columns};
}

.main-content {
  height: calc(100vh - var(--header-height));
  /* = calc(100vh - ${headerHeight}px) */
}

.page-body {
  width: calc(100% - var(--sidebar-width));
  /* = calc(100% - ${sidebarWidth}px) */
}

.spacing-md {
  padding: calc(var(--spacing-unit) * 4);
  /* = ${spacingUnit * 4}px */
}

.grid {
  grid-template-columns: repeat(var(--columns), 1fr);
  /* = repeat(${columns}, 1fr) */
}`;

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      <div className="grid grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-6">
          <h4 className="font-semibold">Adjust Variables</h4>

          {/* Header Height */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span>--header-height</span>
              <code className="text-primary">{headerHeight}px</code>
            </label>
            <input
              type="range"
              min="40"
              max="120"
              value={headerHeight}
              onChange={(e) => setHeaderHeight(Number(e.target.value))}
              className="range range-primary range-xs"
            />
          </div>

          {/* Sidebar Width */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span>--sidebar-width</span>
              <code className="text-primary">{sidebarWidth}px</code>
            </label>
            <input
              type="range"
              min="100"
              max="300"
              value={sidebarWidth}
              onChange={(e) => setSidebarWidth(Number(e.target.value))}
              className="range range-primary range-xs"
            />
          </div>

          {/* Spacing Unit */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span>--spacing-unit</span>
              <code className="text-primary">{spacingUnit}px</code>
            </label>
            <input
              type="range"
              min="2"
              max="8"
              value={spacingUnit}
              onChange={(e) => setSpacingUnit(Number(e.target.value))}
              className="range range-primary range-xs"
            />
          </div>

          {/* Columns */}
          <div className="space-y-2">
            <label className="flex justify-between text-sm">
              <span>--columns</span>
              <code className="text-primary">{columns}</code>
            </label>
            <input
              type="range"
              min="1"
              max="6"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="range range-primary range-xs"
            />
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-4">
          <h4 className="font-semibold">Live Preview</h4>

          {/* Layout Preview */}
          <div
            className="border border-base-300 rounded-lg overflow-hidden bg-base-300"
            style={{ height: '200px' }}
          >
            {/* Header */}
            <div
              className="bg-primary/20 flex items-center justify-center text-xs font-mono border-b border-base-300"
              style={{ height: `${(headerHeight / 300) * 100}%` }}
            >
              {headerHeight}px header
            </div>
            {/* Body */}
            <div className="flex" style={{ height: `${100 - (headerHeight / 300) * 100}%` }}>
              {/* Sidebar */}
              <div
                className="bg-secondary/20 flex items-center justify-center text-xs font-mono border-r border-base-300"
                style={{ width: `${(sidebarWidth / 400) * 100}%` }}
              >
                {sidebarWidth}px
              </div>
              {/* Main */}
              <div className="flex-1 bg-success/10 flex items-center justify-center text-xs font-mono">
                calc(100% - {sidebarWidth}px)
              </div>
            </div>
          </div>

          {/* Spacing Scale Preview */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-base-content/60">
              Spacing Scale (×{spacingUnit}px)
            </h5>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 4, 6, 8].map((multiplier) => (
                <div
                  key={multiplier}
                  className="bg-accent/30 rounded text-xs font-mono flex items-center justify-center"
                  style={{
                    width: `${spacingUnit * multiplier + 32}px`,
                    height: `${spacingUnit * multiplier + 24}px`,
                  }}
                >
                  ×{multiplier}
                </div>
              ))}
            </div>
          </div>

          {/* Grid Preview */}
          <div className="space-y-2">
            <h5 className="text-xs font-medium text-base-content/60">Grid ({columns} columns)</h5>
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
              {Array.from({ length: columns * 2 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-warning/30 rounded h-8 flex items-center justify-center text-xs font-mono"
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Generated CSS */}
      <div className="mt-6">
        <h5 className="text-sm font-medium mb-3">Generated CSS</h5>
        <CodeSnippet language="css" code={generatedCSS} showCopy={false} />
      </div>

      {/* Full Code Example */}
      <div className="mt-6">
        <CodeSnippet title="calc() with Variables" language="css" code={calculationsCode} />
      </div>
    </div>
  );
}

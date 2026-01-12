import { useState } from 'react';
import { CodeSnippet } from '@components';
import explicitGridCode from './examples/ExplicitGrid.css?raw';
import implicitGridCode from './examples/ImplicitGrid.css?raw';

type GridType = 'explicit' | 'implicit';

export default function ExplicitImplicitDemo(): React.ReactElement {
  const [gridType, setGridType] = useState<GridType>('explicit');
  const [itemCount, setItemCount] = useState(6);
  const [autoRowHeight, setAutoRowHeight] = useState(60);

  const explicitRows = 2;
  const columns = 3;
  const explicitCells = explicitRows * columns;

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap gap-4 items-center">
        <div className="flex gap-2">
          <button
            onClick={() => setGridType('explicit')}
            className={`btn btn-sm ${gridType === 'explicit' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Explicit Grid
          </button>
          <button
            onClick={() => setGridType('implicit')}
            className={`btn btn-sm ${gridType === 'implicit' ? 'btn-warning' : 'btn-ghost'}`}
          >
            Implicit Grid
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/60">Items:</span>
          <input
            type="range"
            min="1"
            max="12"
            value={itemCount}
            onChange={(e) => setItemCount(Number(e.target.value))}
            className="range range-xs range-primary w-24"
          />
          <span className="text-sm font-mono w-6">{itemCount}</span>
        </div>

        {gridType === 'implicit' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-base-content/60">Auto Row Height:</span>
            <input
              type="range"
              min="40"
              max="100"
              value={autoRowHeight}
              onChange={(e) => setAutoRowHeight(Number(e.target.value))}
              className="range range-xs range-warning w-24"
            />
            <span className="text-sm font-mono w-10">{autoRowHeight}px</span>
          </div>
        )}
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-semibold">
            {gridType === 'explicit' ? 'Explicit Grid' : 'Implicit Grid'}
          </h4>
          <div className="text-sm text-base-content/60">
            {gridType === 'explicit' ? (
              <span>
                Defined: {columns} columns × {explicitRows} rows = {explicitCells} cells
              </span>
            ) : (
              <span>
                Defined: 1 row | Auto-generated: {Math.ceil(itemCount / columns) - 1} rows
              </span>
            )}
          </div>
        </div>

        <div
          className="bg-base-300 rounded-lg p-4 border-2 border-dashed border-base-content/20"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridTemplateRows: gridType === 'explicit' ? 'repeat(2, 80px)' : '80px',
            gridAutoRows: gridType === 'implicit' ? `${autoRowHeight}px` : undefined,
            gap: '8px',
            minHeight: '180px',
          }}
        >
          {Array.from({ length: itemCount }, (_, i) => {
            const isExplicit = i < explicitCells;
            const isImplicitItem = gridType === 'implicit' && i >= columns;

            return (
              <div
                key={i}
                className={`rounded-lg flex items-center justify-center font-mono text-sm transition-all ${
                  gridType === 'explicit'
                    ? isExplicit
                      ? 'bg-primary text-primary-content'
                      : 'bg-error/50 text-error-content border-2 border-dashed border-error'
                    : isImplicitItem
                      ? 'bg-warning text-warning-content'
                      : 'bg-primary text-primary-content'
                }`}
              >
                {i + 1}
                {gridType === 'explicit' && !isExplicit && (
                  <span className="text-xs ml-1">(overflow!)</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span>Explicit (defined)</span>
          </div>
          {gridType === 'implicit' && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-warning"></div>
              <span>Implicit (auto-created)</span>
            </div>
          )}
          {gridType === 'explicit' && itemCount > explicitCells && (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-error/50 border border-dashed border-error"></div>
              <span>Overflow (no implicit grid control)</span>
            </div>
          )}
        </div>
      </div>

      {/* Explanation */}
      <div className="alert bg-base-200">
        {gridType === 'explicit' ? (
          <div>
            <h4 className="font-bold">Explicit Grid</h4>
            <p className="text-sm mt-1">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              With <code>grid-template-rows</code> and <code>grid-template-columns</code>, you
              define exactly how many rows and columns exist. Items beyond this overflow without
              proper sizing.
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-bold">Implicit Grid</h4>
            <p className="text-sm mt-1">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              Use <code>grid-auto-rows: {autoRowHeight}px</code> to control the size of auto-created
              rows. The browser creates new rows as needed to fit all items.
            </p>
          </div>
        )}
      </div>

      {/* Code Examples */}
      <CodeSnippet
        title={gridType === 'explicit' ? 'Explicit Grid' : 'Implicit Grid'}
        language="css"
        code={gridType === 'explicit' ? explicitGridCode : implicitGridCode}
      />

      {/* Pro Tip */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Pro Tip</h4>
          <p className="text-sm mt-1">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            Use <code>grid-auto-rows: minmax(100px, auto)</code> for implicit rows that are at least
            100px but can grow to fit content. This is more flexible than a fixed height.
          </p>
        </div>
      </div>
    </div>
  );
}

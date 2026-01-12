import { useState } from 'react';
import { CodeSnippet } from '@components';
import gridAlignmentCode from './examples/GridAlignment.css?raw';

type AlignmentLevel = 'items' | 'content';

const justifyOptions = ['start', 'center', 'end', 'stretch'] as const;
const alignOptions = ['start', 'center', 'end', 'stretch'] as const;

type JustifyValue = (typeof justifyOptions)[number];
type AlignValue = (typeof alignOptions)[number];

export default function GridAlignmentDemo(): React.ReactElement {
  const [level, setLevel] = useState<AlignmentLevel>('items');
  const [justifyValue, setJustifyValue] = useState<JustifyValue>('stretch');
  const [alignValue, setAlignValue] = useState<AlignValue>('stretch');

  const getGridStyles = (): React.CSSProperties => {
    if (level === 'items') {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 100px)',
        gridTemplateRows: 'repeat(2, 80px)',
        gap: '8px',
        justifyItems: justifyValue,
        alignItems: alignValue,
      };
    } else {
      return {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gridTemplateRows: 'repeat(2, 60px)',
        gap: '8px',
        height: '250px',
        justifyContent: justifyValue,
        alignContent: alignValue,
      };
    }
  };

  const generateCSS = (): string => {
    if (level === 'items') {
      return `.container {
  display: grid;
  grid-template-columns: repeat(3, 100px);
  grid-template-rows: repeat(2, 80px);
  justify-items: ${justifyValue};  /* Horizontal within cell */
  align-items: ${alignValue};      /* Vertical within cell */
}

/* Shorthand: place-items: ${alignValue} ${justifyValue}; */`;
    } else {
      return `.container {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  grid-template-rows: repeat(2, 60px);
  height: 250px; /* Container must be larger than grid */
  justify-content: ${justifyValue}; /* Horizontal grid position */
  align-content: ${alignValue};     /* Vertical grid position */
}

/* Shorthand: place-content: ${alignValue} ${justifyValue}; */`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Level Selection */}
      <div className="flex gap-4 flex-wrap">
        <div className="flex gap-2">
          <button
            onClick={() => {
              setLevel('items');
              setJustifyValue('stretch');
              setAlignValue('stretch');
            }}
            className={`btn btn-sm ${level === 'items' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Items (within cells)
          </button>
          <button
            onClick={() => {
              setLevel('content');
              setJustifyValue('start');
              setAlignValue('start');
            }}
            className={`btn btn-sm ${level === 'content' ? 'btn-warning' : 'btn-ghost'}`}
          >
            Content (grid position)
          </button>
        </div>
      </div>

      {/* Alignment Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-base-200 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">
            {level === 'items' ? 'justify-items' : 'justify-content'} (horizontal)
          </h4>
          <div className="flex flex-wrap gap-2">
            {justifyOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setJustifyValue(opt)}
                className={`btn btn-xs ${justifyValue === opt ? 'btn-success' : 'btn-ghost'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-base-200 rounded-lg p-4">
          <h4 className="font-semibold text-sm mb-2">
            {level === 'items' ? 'align-items' : 'align-content'} (vertical)
          </h4>
          <div className="flex flex-wrap gap-2">
            {alignOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setAlignValue(opt)}
                className={`btn btn-xs ${alignValue === opt ? 'btn-warning' : 'btn-ghost'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Explanation */}
      <div className="alert bg-base-200">
        {level === 'items' ? (
          <div>
            <h4 className="font-bold">Items Alignment</h4>
            <p className="text-sm mt-1">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-success">justify-items</code> and{' '}
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-warning">align-items</code> control how items are positioned{' '}
              <strong>within their grid cells</strong>. Notice how items can be smaller than their
              cells.
            </p>
          </div>
        ) : (
          <div>
            <h4 className="font-bold">Content Alignment</h4>
            <p className="text-sm mt-1">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-success">justify-content</code> and{' '}
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-warning">align-content</code> position{' '}
              <strong>the entire grid</strong> within its container. The container must be larger
              than the grid for this to have any effect.
            </p>
          </div>
        )}
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>

        <div
          className="bg-base-300 rounded-lg border-2 border-dashed border-base-content/20 p-2"
          style={level === 'content' ? { height: '250px' } : {}}
        >
          <div style={getGridStyles()}>
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className={`rounded flex items-center justify-center font-mono text-sm ${
                  level === 'items'
                    ? 'bg-primary text-primary-content'
                    : 'bg-warning text-warning-content'
                }`}
                style={
                  level === 'items'
                    ? {
                        width: justifyValue === 'stretch' ? '100%' : '60px',
                        height: alignValue === 'stretch' ? '100%' : '40px',
                      }
                    : undefined
                }
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Cell Visualization for Items mode */}
        {level === 'items' && (
          <p className="text-sm text-base-content/60 mt-2">
            Gray background shows cell boundaries. Items are{' '}
            {justifyValue === 'stretch' && alignValue === 'stretch'
              ? 'stretched to fill cells'
              : 'positioned within their cells'}
            .
          </p>
        )}

        {/* Container Visualization for Content mode */}
        {level === 'content' && (
          <p className="text-sm text-base-content/60 mt-2">
            Dashed border shows container. The grid (all items) is positioned{' '}
            {justifyValue === 'center' && alignValue === 'center'
              ? 'in the center'
              : `${alignValue} vertically, ${justifyValue} horizontally`}
            .
          </p>
        )}
      </div>

      {/* Generated CSS */}
      <CodeSnippet title="Current CSS" language="css" code={generateCSS()} />

      {/* Reference */}
      <CodeSnippet title="Alignment Reference" language="css" code={gridAlignmentCode} />

      {/* Pro Tips */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Remember the Pattern</h4>
          {/* eslint-disable local/no-raw-code-element */}
          <ul className="text-sm mt-1 space-y-1">
            <li>
              • <code>justify-*</code> = horizontal (row axis)
            </li>
            <li>
              • <code>align-*</code> = vertical (column axis)
            </li>
            <li>
              • <code>*-items</code> = individual items within cells
            </li>
            <li>
              • <code>*-content</code> = the entire grid within container
            </li>
            <li>
              • <code>place-*</code> = shorthand for both directions
            </li>
          </ul>
          {/* eslint-enable local/no-raw-code-element */}
        </div>
      </div>
    </div>
  );
}

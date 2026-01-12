import { useState } from 'react';
import { CodeSnippet } from '@components';
import frUnitCode from './examples/FrUnit.css?raw';

type Preset = 'equal' | 'sidebar' | 'mixed' | 'custom';

interface PresetConfig {
  columns: string;
  description: string;
}

const presets: Record<Preset, PresetConfig> = {
  equal: {
    columns: '1fr 1fr 1fr',
    description: 'Equal thirds (each gets 33.3% of space)',
  },
  sidebar: {
    columns: '200px 1fr',
    description: 'Fixed sidebar (200px) + flexible main',
  },
  mixed: {
    columns: '100px 1fr 2fr',
    description: 'Fixed (100px) + 1 part + 2 parts of remaining',
  },
  custom: {
    columns: '1fr 2fr 1fr',
    description: 'Custom: 25% + 50% + 25%',
  },
};

export default function FrUnitDemo(): React.ReactElement {
  const [preset, setPreset] = useState<Preset>('equal');
  const [containerWidth, setContainerWidth] = useState(600);

  const currentPreset = presets[preset];

  // Calculate actual widths for visualization
  const calculateWidths = (columns: string, totalWidth: number): number[] => {
    const parts = columns.split(' ');
    let fixedTotal = 0;
    let frTotal = 0;

    parts.forEach((part) => {
      if (part.endsWith('px')) {
        fixedTotal += parseInt(part);
      } else if (part.endsWith('fr')) {
        frTotal += parseInt(part);
      }
    });

    const gap = (parts.length - 1) * 8; // 8px gap
    const freeSpace = totalWidth - fixedTotal - gap;
    const frUnit = freeSpace / frTotal;

    return parts.map((part) => {
      if (part.endsWith('px')) {
        return parseInt(part);
      } else if (part.endsWith('fr')) {
        return parseInt(part) * frUnit;
      }
      return 0;
    });
  };

  const columnWidths = calculateWidths(currentPreset.columns, containerWidth);
  const parts = currentPreset.columns.split(' ');

  return (
    <div className="space-y-6">
      {/* Preset Selection */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(presets).map(([key]) => (
          <button
            key={key}
            onClick={() => setPreset(key as Preset)}
            className={`btn btn-sm ${preset === key ? 'btn-primary' : 'btn-ghost'}`}
          >
            {key === 'equal' && '1fr 1fr 1fr'}
            {key === 'sidebar' && '200px 1fr'}
            {key === 'mixed' && '100px 1fr 2fr'}
            {key === 'custom' && '1fr 2fr 1fr'}
          </button>
        ))}
      </div>

      {/* Container Width Control */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-base-content/60">Container Width:</span>
        <input
          type="range"
          min="400"
          max="800"
          value={containerWidth}
          onChange={(e) => setContainerWidth(Number(e.target.value))}
          className="range range-xs range-primary w-48"
        />
        <span className="text-sm font-mono">{containerWidth}px</span>
      </div>

      {/* Description */}
      <div className="alert bg-base-200">
        <div>
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-primary font-mono">{currentPreset.columns}</code>
          <p className="text-sm mt-1">{currentPreset.description}</p>
        </div>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview ({containerWidth}px container)</h4>

        <div
          className="bg-base-300 rounded-lg p-2 border-2 border-dashed border-base-content/20 mx-auto"
          style={{
            width: containerWidth,
            display: 'grid',
            gridTemplateColumns: currentPreset.columns,
            gap: '8px',
          }}
        >
          {parts.map((part, i) => {
            const width = columnWidths[i];
            const isFixed = part.endsWith('px');

            return (
              <div
                key={i}
                className={`rounded-lg p-4 text-center ${
                  isFixed ? 'bg-warning text-warning-content' : 'bg-primary text-primary-content'
                }`}
              >
                <div className="font-mono text-sm">{part}</div>
                <div className="text-xs opacity-80 mt-1">{Math.round(width)}px</div>
              </div>
            );
          })}
        </div>

        {/* Width Breakdown */}
        <div className="mt-4 p-4 bg-base-300 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">Calculation Breakdown:</h5>
          <div className="text-sm font-mono space-y-1">
            <div>Container: {containerWidth}px</div>
            {parts.some((p) => p.endsWith('px')) && (
              <div className="text-warning">
                - Fixed: {parts.filter((p) => p.endsWith('px')).join(' + ')} ={' '}
                {parts.filter((p) => p.endsWith('px')).reduce((sum, p) => sum + parseInt(p), 0)}px
              </div>
            )}
            <div className="text-base-content/60">- Gap: {(parts.length - 1) * 8}px</div>
            <div className="text-success">
              = Free space:{' '}
              {containerWidth -
                parts.filter((p) => p.endsWith('px')).reduce((sum, p) => sum + parseInt(p), 0) -
                (parts.length - 1) * 8}
              px
            </div>
            <div className="text-primary">
              ÷ Total fr:{' '}
              {parts.filter((p) => p.endsWith('fr')).reduce((sum, p) => sum + parseInt(p), 0)}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-warning"></div>
            <span>Fixed (px)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-primary"></div>
            <span>Flexible (fr)</span>
          </div>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="fr Unit vs Percentages" language="css" code={frUnitCode} />

      {/* Key Insight */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Key Insight</h4>
          <p className="text-sm mt-1">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code>fr</code> units are <strong>smarter than percentages</strong> because they only
            divide the <em>remaining</em> space after fixed sizes and gaps are calculated. This
            prevents overflow issues.
          </p>
        </div>
      </div>
    </div>
  );
}

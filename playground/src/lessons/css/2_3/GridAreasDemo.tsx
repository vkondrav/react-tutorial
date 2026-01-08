import { useState } from 'react';
import { CodeSnippet } from '@components';
import gridAreasCode from './examples/GridAreas.css?raw';

type Layout = 'holy-grail' | 'dashboard' | 'magazine' | 'custom';

interface LayoutConfig {
  areas: string[];
  columns: string;
  rows: string;
  description: string;
}

const layouts: Record<Layout, LayoutConfig> = {
  'holy-grail': {
    areas: ['"header header header"', '"sidebar main main"', '"footer footer footer"'],
    columns: '200px 1fr 1fr',
    rows: '60px 1fr 40px',
    description: 'Classic "Holy Grail" layout with header, sidebar, main, and footer',
  },
  dashboard: {
    areas: ['"nav nav nav nav"', '"side main main stats"', '"side main main stats"'],
    columns: '150px 1fr 1fr 200px',
    rows: '50px 1fr 1fr',
    description: 'Dashboard with navigation, sidebar, main content, and stats panel',
  },
  magazine: {
    areas: [
      '"featured featured sidebar"',
      '"article1 article2 sidebar"',
      '"article3 article3 sidebar"',
    ],
    columns: '1fr 1fr 200px',
    rows: '2fr 1fr 1fr',
    description: 'Magazine-style layout with featured content and sidebar',
  },
  custom: {
    areas: ['"a a b"', '"a a c"', '"d e c"'],
    columns: '1fr 1fr 1fr',
    rows: '100px 100px 80px',
    description: 'Custom asymmetric layout showing how areas can span cells',
  },
};

const areaColors: Record<string, string> = {
  header: 'bg-primary text-primary-content',
  nav: 'bg-primary text-primary-content',
  sidebar: 'bg-secondary text-secondary-content',
  side: 'bg-secondary text-secondary-content',
  main: 'bg-accent text-accent-content',
  footer: 'bg-info text-info-content',
  stats: 'bg-warning text-warning-content',
  featured: 'bg-success text-success-content',
  article1: 'bg-primary/70 text-primary-content',
  article2: 'bg-primary/50 text-primary-content',
  article3: 'bg-primary/30 text-base-content',
  a: 'bg-primary text-primary-content',
  b: 'bg-secondary text-secondary-content',
  c: 'bg-accent text-accent-content',
  d: 'bg-warning text-warning-content',
  e: 'bg-info text-info-content',
};

export default function GridAreasDemo(): React.ReactElement {
  const [layout, setLayout] = useState<Layout>('holy-grail');

  const currentLayout = layouts[layout];

  // Extract unique area names from the layout
  const getUniqueAreas = (areas: string[]): string[] => {
    const allAreas = areas.join(' ').replace(/"/g, '').split(/\s+/);
    return [...new Set(allAreas)].filter((a) => a !== '.');
  };

  const uniqueAreas = getUniqueAreas(currentLayout.areas);

  // Generate CSS code for current layout
  const generateCSS = (): string => {
    return `.container {
  display: grid;
  grid-template-columns: ${currentLayout.columns};
  grid-template-rows: ${currentLayout.rows};
  grid-template-areas:
    ${currentLayout.areas.join('\n    ')};
  gap: 8px;
  height: 100%;
}

${uniqueAreas.map((area) => `.${area} { grid-area: ${area}; }`).join('\n')}`;
  };

  return (
    <div className="space-y-6">
      {/* Layout Selection */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(layouts).map(([key]) => (
          <button
            key={key}
            onClick={() => setLayout(key as Layout)}
            className={`btn btn-sm ${layout === key ? 'btn-primary' : 'btn-ghost'}`}
          >
            {key === 'holy-grail' && 'Holy Grail'}
            {key === 'dashboard' && 'Dashboard'}
            {key === 'magazine' && 'Magazine'}
            {key === 'custom' && 'Custom'}
          </button>
        ))}
      </div>

      {/* Description */}
      <div className="alert bg-base-200">
        <span>{currentLayout.description}</span>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>

        <div
          className="bg-base-300 rounded-lg p-2 border-2 border-dashed border-base-content/20"
          style={{
            display: 'grid',
            gridTemplateColumns: currentLayout.columns,
            gridTemplateRows: currentLayout.rows,
            gridTemplateAreas: currentLayout.areas.join(' '),
            gap: '8px',
            height: '350px',
          }}
        >
          {uniqueAreas.map((area) => (
            <div
              key={area}
              className={`rounded-lg flex items-center justify-center font-mono text-sm ${areaColors[area] || 'bg-base-100'}`}
              style={{ gridArea: area }}
            >
              {area}
            </div>
          ))}
        </div>

        {/* ASCII Preview */}
        <div className="mt-4 p-4 bg-base-300 rounded-lg">
          <h5 className="font-semibold text-sm mb-2">grid-template-areas:</h5>
          <pre className="text-sm font-mono text-success">
            {currentLayout.areas.map((row) => `  ${row}`).join('\n')}
          </pre>
        </div>
      </div>

      {/* Generated CSS */}
      <CodeSnippet title="Generated CSS" language="css" code={generateCSS()} />

      {/* Reference Code */}
      <CodeSnippet title="Grid Areas Syntax" language="css" code={gridAreasCode} />

      {/* Pro Tips */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Pro Tips</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>
              • Each string in <code>grid-template-areas</code> represents one row
            </li>
            <li>• Area names must form rectangles (no L-shapes or T-shapes)</li>
            <li>
              • Use <code>.</code> (period) for empty cells
            </li>
            <li>
              • Area names are case-sensitive: <code>Header</code> ≠ <code>header</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

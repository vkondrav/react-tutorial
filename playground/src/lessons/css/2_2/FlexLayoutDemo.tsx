import { useState } from 'react';
import { CodeSnippet } from '@components';
import flexPatternsCode from './examples/FlexPatterns.css?raw';
import patternCenterCode from './examples/PatternCenter.css?raw';
import patternHeaderCode from './examples/PatternHeader.css?raw';
import patternCardRowCode from './examples/PatternCardRow.css?raw';
import patternSidebarCode from './examples/PatternSidebar.css?raw';
import patternGapCode from './examples/PatternGap.css?raw';

type Pattern = 'center' | 'header' | 'card-row' | 'holy-grail' | 'gap';

interface PatternInfo {
  id: Pattern;
  name: string;
  description: string;
}

export default function FlexLayoutDemo(): React.ReactElement {
  const [activePattern, setActivePattern] = useState<Pattern>('center');

  const patterns: PatternInfo[] = [
    {
      id: 'center',
      name: 'Perfect Centering',
      description: 'The classic centering problem, solved',
    },
    { id: 'header', name: 'Header Layout', description: 'Logo left, nav center, actions right' },
    { id: 'card-row', name: 'Card Row', description: 'Equal-width cards with consistent spacing' },
    {
      id: 'holy-grail',
      name: 'Sidebar Layout',
      description: 'Fixed sidebar + flexible main content',
    },
    { id: 'gap', name: 'Gap Property', description: 'Consistent spacing without margin hacks' },
  ];

  return (
    <div className="space-y-6">
      {/* Pattern Selection */}
      <div className="flex flex-wrap gap-2">
        {patterns.map((pattern) => (
          <button
            key={pattern.id}
            onClick={() => setActivePattern(pattern.id)}
            className={`btn btn-sm ${activePattern === pattern.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      {/* Pattern Description */}
      <div className="alert bg-base-200">
        <span>{patterns.find((p) => p.id === activePattern)?.description}</span>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">Live Preview</h4>

        {/* Perfect Centering */}
        {activePattern === 'center' && (
          <div
            className="bg-base-300 rounded-lg border-2 border-dashed border-base-content/20"
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 200,
            }}
          >
            <div className="bg-primary text-primary-content rounded-lg p-6 text-center">
              <div className="font-bold text-lg">Perfectly Centered</div>
              <div className="text-sm opacity-80">Both axes!</div>
            </div>
          </div>
        )}

        {/* Header Layout */}
        {activePattern === 'header' && (
          <div
            className="bg-base-300 rounded-lg p-4 border-2 border-dashed border-base-content/20"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <div
              className="bg-primary text-primary-content rounded px-4 py-2 font-bold"
              style={{ flex: '0 0 auto' }}
            >
              Logo
            </div>
            <nav className="bg-secondary/30 rounded px-4 py-2 text-center" style={{ flex: '1' }}>
              <span className="text-sm">Navigation (flex: 1)</span>
            </nav>
            <div
              className="bg-accent text-accent-content rounded px-4 py-2"
              style={{ flex: '0 0 auto' }}
            >
              Actions
            </div>
          </div>
        )}

        {/* Card Row */}
        {activePattern === 'card-row' && (
          <div
            className="bg-base-300 rounded-lg p-4 border-2 border-dashed border-base-content/20"
            style={{
              display: 'flex',
              gap: 16,
            }}
          >
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="bg-primary text-primary-content rounded-lg p-4 text-center"
                style={{ flex: '1' }}
              >
                <div className="font-bold text-lg">Card {num}</div>
                <div className="text-sm opacity-80">flex: 1</div>
              </div>
            ))}
          </div>
        )}

        {/* Holy Grail / Sidebar */}
        {activePattern === 'holy-grail' && (
          <div
            className="bg-base-300 rounded-lg border-2 border-dashed border-base-content/20"
            style={{
              display: 'flex',
              height: 200,
              gap: 8,
              padding: 8,
            }}
          >
            <aside
              className="bg-secondary text-secondary-content rounded-lg p-4 flex items-center justify-center"
              style={{ flex: '0 0 120px' }}
            >
              <div className="text-center">
                <div className="font-bold">Sidebar</div>
                <div className="text-xs opacity-80">flex: 0 0 120px</div>
              </div>
            </aside>
            <main
              className="bg-primary text-primary-content rounded-lg p-4 flex items-center justify-center"
              style={{ flex: '1' }}
            >
              <div className="text-center">
                <div className="font-bold">Main Content</div>
                <div className="text-xs opacity-80">flex: 1</div>
              </div>
            </main>
          </div>
        )}

        {/* Gap Property */}
        {activePattern === 'gap' && (
          <div className="space-y-4">
            <div>
              <div className="text-sm text-base-content/60 mb-2">Without gap (margin hack):</div>
              <div
                className="bg-base-300 rounded-lg p-4 border-2 border-dashed border-error/50"
                style={{ display: 'flex' }}
              >
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="bg-error/50 text-error-content rounded p-3 text-center text-sm"
                    style={{ marginRight: num < 4 ? 8 : 0 }}
                  >
                    margin-right: 8px
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm text-base-content/60 mb-2">With gap (clean!):</div>
              <div
                className="bg-base-300 rounded-lg p-4 border-2 border-dashed border-success/50"
                style={{ display: 'flex', gap: 8 }}
              >
                {[1, 2, 3, 4].map((num) => (
                  <div
                    key={num}
                    className="bg-success/50 text-success-content rounded p-3 text-center text-sm"
                  >
                    gap: 8px
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CSS for Current Pattern */}
      {activePattern === 'center' && (
        <CodeSnippet title="Perfect Centering" language="css" code={patternCenterCode} />
      )}
      {activePattern === 'header' && (
        <CodeSnippet title="Header Layout" language="css" code={patternHeaderCode} />
      )}
      {activePattern === 'card-row' && (
        <CodeSnippet title="Card Row" language="css" code={patternCardRowCode} />
      )}
      {activePattern === 'holy-grail' && (
        <CodeSnippet title="Sidebar Layout" language="css" code={patternSidebarCode} />
      )}
      {activePattern === 'gap' && (
        <CodeSnippet title="Gap Property" language="css" code={patternGapCode} />
      )}

      {/* Pro Tips */}
      <div className="alert alert-info">
        <div>
          <h4 className="font-bold">Pro Tips</h4>
          <ul className="text-sm mt-1 space-y-1">
            <li>
              • <code>gap</code> works on both flex and grid containers
            </li>
            <li>
              • Use <code>flex: 1</code> on items that should share remaining space
            </li>
            <li>
              • Use <code>flex: 0 0 auto</code> (or <code>flex: none</code>) for fixed-size items
            </li>
            <li>
              • Combine <code>justify-content: center</code> + <code>align-items: center</code> for
              perfect centering
            </li>
          </ul>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Common Flex Patterns" language="css" code={flexPatternsCode} />
    </div>
  );
}

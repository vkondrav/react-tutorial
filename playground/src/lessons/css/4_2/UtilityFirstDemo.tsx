import { useState } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineShoppingCart, HiOutlineHeart, HiOutlineStar } from 'react-icons/hi';
import utilityCode from './examples/UtilityFirst.css?raw';
import utilityHtmlCode from './examples/UtilityHTML.html?raw';
import traditionalHtmlCode from './examples/TraditionalHTML.html?raw';
import traditionalCssCode from './examples/TraditionalCSS.css?raw';

type BuildMode = 'traditional' | 'utility';

interface UtilityClass {
  name: string;
  css: string;
  category: 'layout' | 'spacing' | 'typography' | 'color' | 'border';
}

const utilityClasses: UtilityClass[] = [
  { name: 'flex', css: 'display: flex;', category: 'layout' },
  { name: 'items-center', css: 'align-items: center;', category: 'layout' },
  { name: 'justify-between', css: 'justify-content: space-between;', category: 'layout' },
  { name: 'gap-4', css: 'gap: 1rem;', category: 'spacing' },
  { name: 'p-4', css: 'padding: 1rem;', category: 'spacing' },
  { name: 'mt-2', css: 'margin-top: 0.5rem;', category: 'spacing' },
  { name: 'text-lg', css: 'font-size: 1.125rem;', category: 'typography' },
  { name: 'font-bold', css: 'font-weight: 700;', category: 'typography' },
  { name: 'text-gray-500', css: 'color: #6b7280;', category: 'color' },
  { name: 'bg-blue-500', css: 'background: #3b82f6;', category: 'color' },
  { name: 'rounded-lg', css: 'border-radius: 0.5rem;', category: 'border' },
  { name: 'shadow-md', css: 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);', category: 'border' },
];

const categoryColors: Record<string, string> = {
  layout: '#3b82f6',
  spacing: '#8b5cf6',
  typography: '#ec4899',
  color: '#f59e0b',
  border: '#10b981',
};

export default function UtilityFirstDemo(): React.ReactElement {
  const [mode, setMode] = useState<BuildMode>('utility');
  const [showCode, setShowCode] = useState(false);
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  // Product card classes used in demo
  const productClasses = [
    'rounded-lg',
    'shadow-md',
    'p-4',
    'flex',
    'gap-4',
    'items-center',
    'bg-white',
  ];

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Mode Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setMode('utility')}
          className={`btn btn-sm ${mode === 'utility' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Utility-First
        </button>
        <button
          onClick={() => setMode('traditional')}
          className={`btn btn-sm ${mode === 'traditional' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Traditional CSS
        </button>
      </div>

      {/* Concept Explanation */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-base-content mb-2 text-sm">
          {mode === 'utility' ? 'Utility-First Philosophy' : 'Traditional CSS Philosophy'}
        </h4>
        {mode === 'utility' ? (
          <p className="text-sm text-base-content/70">
            Each class does <strong className="text-primary">one thing</strong>. Combine them in
            HTML to build any design. No custom CSS needed for most layouts.
          </p>
        ) : (
          <p className="text-sm text-base-content/70">
            Write <strong className="text-primary">semantic class names</strong> that describe what
            the element is, then define all styles in a separate CSS file.
          </p>
        )}
      </div>

      {/* Side-by-Side Code Comparison */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        {/* HTML */}
        <div>
          {mode === 'utility' ? (
            <CodeSnippet title="HTML" language="html" code={utilityHtmlCode} showCopy={false} />
          ) : (
            <CodeSnippet title="HTML" language="html" code={traditionalHtmlCode} showCopy={false} />
          )}
        </div>

        {/* CSS */}
        <div>
          {mode === 'utility' ? (
            <div className="bg-base-300 rounded-lg p-4 h-full flex flex-col">
              <div className="flex items-center justify-between px-3 py-1.5 -mx-4 -mt-4 mb-4 bg-base-300 border-b border-base-100 rounded-t-lg">
                <span className="text-xs text-base-content/60">CSS</span>
                <span className="text-xs text-base-content/40">css</span>
              </div>
              <div className="text-center py-8 flex-1 flex flex-col items-center justify-center">
                <div className="text-4xl mb-2">🎉</div>
                <p className="text-sm text-success font-medium">No custom CSS needed!</p>
                <p className="text-xs text-base-content/60 mt-1">
                  Utilities are pre-defined in framework
                </p>
              </div>
            </div>
          ) : (
            <CodeSnippet title="CSS" language="css" code={traditionalCssCode} showCopy={false} />
          )}
        </div>
      </div>

      {/* Live Preview */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Live Preview</h4>

        {/* Product Card Preview */}
        <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 items-center max-w-md">
          <div className="w-20 h-20 bg-linear-to-br from-purple-400 to-pink-400 rounded flex items-center justify-center">
            <HiOutlineShoppingCart className="text-white" size={32} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-lg text-gray-900">Wireless Headphones</h3>
              <button className="text-gray-400 hover:text-red-500 transition-colors">
                <HiOutlineHeart size={20} />
              </button>
            </div>
            <div className="flex items-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <HiOutlineStar
                  key={i}
                  className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  size={14}
                />
              ))}
              <span className="text-xs text-gray-500 ml-1">(128 reviews)</span>
            </div>
            <p className="text-gray-500 mt-2 font-medium">$79.99</p>
          </div>
        </div>

        {/* Classes Used */}
        {mode === 'utility' && (
          <div className="mt-4">
            <p className="text-xs text-base-content/60 mb-2">Utility classes used:</p>
            <div className="flex flex-wrap gap-2">
              {productClasses.map((cls) => (
                <span
                  key={cls}
                  className="px-2 py-1 bg-base-200 text-xs font-mono rounded cursor-pointer hover:bg-primary/20 transition-colors"
                  onMouseEnter={() => setHoveredClass(cls)}
                  onMouseLeave={() => setHoveredClass(null)}
                >
                  .{cls}
                </span>
              ))}
            </div>
            {hoveredClass && (
              <div className="mt-2 p-2 bg-base-200 rounded text-xs font-mono">
                {utilityClasses.find((u) => u.name === hoveredClass)?.css ||
                  `/* ${hoveredClass} */`}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Common Utility Classes Reference */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">Common Utility Classes</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {utilityClasses.map((util) => (
            <div
              key={util.name}
              className="bg-base-200 rounded p-2 text-xs"
              style={{ borderLeft: `3px solid ${categoryColors[util.category]}` }}
            >
              <code className="font-bold text-base-content">.{util.name}</code>
              <div className="text-base-content/60 mt-0.5 font-mono">{util.css}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-4">
          {Object.entries(categoryColors).map(([cat, color]) => (
            <div key={cat} className="flex items-center gap-1.5 text-xs">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: color }} />
              <span className="capitalize text-base-content/60">{cat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros and Cons */}
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="bg-success/10 border border-success/30 rounded-lg p-4">
          <h5 className="font-semibold text-success mb-3 text-sm">Advantages</h5>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              No context-switching to CSS files
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              Rapid prototyping—see changes instantly
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              No naming decisions (hardest problem!)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-success">✓</span>
              Dead code elimination via PurgeCSS
            </li>
          </ul>
        </div>
        <div className="bg-error/10 border border-error/30 rounded-lg p-4">
          <h5 className="font-semibold text-error mb-3 text-sm">Trade-offs</h5>
          <ul className="space-y-2 text-sm text-base-content/70">
            <li className="flex items-start gap-2">
              <span className="text-error">✗</span>
              Long class lists in HTML
            </li>
            <li className="flex items-start gap-2">
              <span className="text-error">✗</span>
              Requires framework knowledge
            </li>
            <li className="flex items-start gap-2">
              <span className="text-error">✗</span>
              Some complex styles still need custom CSS
            </li>
            <li className="flex items-start gap-2">
              <span className="text-error">✗</span>
              Can feel verbose at first
            </li>
          </ul>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} Example Framework CSS
      </button>

      {showCode && (
        <CodeSnippet title="Utility Classes Example" language="css" code={utilityCode} />
      )}
    </div>
  );
}

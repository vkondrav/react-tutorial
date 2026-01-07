// ============================================
// SelectorMatchingDemo - How CSS matches DOM nodes
// ============================================

import { useState } from 'react';
import { HiOutlinePlay, HiOutlineRefresh } from 'react-icons/hi';

const SELECTORS = [
  {
    id: 'element',
    selector: 'p',
    description: 'Matches all <p> elements',
    matches: ['p1', 'p2', 'p3'],
  },
  {
    id: 'class',
    selector: '.highlight',
    description: 'Matches elements with class="highlight"',
    matches: ['p2', 'span1'],
  },
  {
    id: 'id',
    selector: '#main',
    description: 'Matches the element with id="main"',
    matches: ['div1'],
  },
  {
    id: 'descendant',
    selector: '.card p',
    description: 'Matches <p> inside .card (any depth)',
    matches: ['p1', 'p2'],
  },
  {
    id: 'child',
    selector: '.card > p',
    description: 'Matches <p> that is direct child of .card',
    matches: ['p1'],
  },
  {
    id: 'attribute',
    selector: '[data-tooltip]',
    description: 'Matches elements with data-tooltip attribute',
    matches: ['span1'],
  },
];

export default function SelectorMatchingDemo(): React.ReactElement {
  const [activeSelector, setActiveSelector] = useState<string | null>(null);
  const [showMatches, setShowMatches] = useState(false);

  const currentSelector = SELECTORS.find((s) => s.id === activeSelector);

  const handleTrySelector = (selectorId: string) => {
    setActiveSelector(selectorId);
    setShowMatches(false);
    // Small delay to show the animation
    setTimeout(() => setShowMatches(true), 100);
  };

  const handleReset = () => {
    setActiveSelector(null);
    setShowMatches(false);
  };

  const isMatched = (nodeId: string) => {
    return showMatches && currentSelector?.matches.includes(nodeId);
  };

  return (
    <div className="space-y-6">
      {/* Selector Buttons */}
      <div className="flex flex-wrap gap-2">
        {SELECTORS.map((s) => (
          <button
            key={s.id}
            onClick={() => handleTrySelector(s.id)}
            className={`btn btn-sm gap-2 ${
              activeSelector === s.id ? 'btn-primary' : 'btn-outline'
            }`}
          >
            <HiOutlinePlay size={14} />
            <code className="font-mono">{s.selector}</code>
          </button>
        ))}
        <button onClick={handleReset} className="btn btn-sm btn-ghost gap-2">
          <HiOutlineRefresh size={14} />
          Reset
        </button>
      </div>

      {/* Description */}
      {currentSelector && (
        <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
          <p className="text-sm">
            <code className="text-primary font-bold">{currentSelector.selector}</code>
            {' → '}
            {currentSelector.description}
          </p>
        </div>
      )}

      {/* Visual DOM Tree */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="font-mono text-sm space-y-1">
          {/* div#main */}
          <div
            className={`transition-all duration-300 ${isMatched('div1') ? 'bg-success/30 rounded px-2 -mx-2' : ''}`}
          >
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">div</span>
            <span className="text-warning"> id</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"main"</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* div.card */}
          <div className="ml-4">
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">div</span>
            <span className="text-warning"> class</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"card"</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* p (first) */}
          <div
            className={`ml-8 transition-all duration-300 ${isMatched('p1') ? 'bg-success/30 rounded px-2 -mx-2' : ''}`}
          >
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">p</span>
            <span className="text-base-content/50">&gt;</span>
            <span className="text-base-content/70">First paragraph</span>
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">p</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* div.content */}
          <div className="ml-8">
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">div</span>
            <span className="text-warning"> class</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"content"</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* p.highlight (nested) */}
          <div
            className={`ml-12 transition-all duration-300 ${isMatched('p2') ? 'bg-success/30 rounded px-2 -mx-2' : ''}`}
          >
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">p</span>
            <span className="text-warning"> class</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"highlight"</span>
            <span className="text-base-content/50">&gt;</span>
            <span className="text-base-content/70">Nested paragraph</span>
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">p</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* close div.content */}
          <div className="ml-8">
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">div</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* close div.card */}
          <div className="ml-4">
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">div</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* p (outside) */}
          <div
            className={`ml-4 transition-all duration-300 ${isMatched('p3') ? 'bg-success/30 rounded px-2 -mx-2' : ''}`}
          >
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">p</span>
            <span className="text-base-content/50">&gt;</span>
            <span className="text-base-content/70">Outside paragraph</span>
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">p</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* span.highlight[data-tooltip] */}
          <div
            className={`ml-4 transition-all duration-300 ${isMatched('span1') ? 'bg-success/30 rounded px-2 -mx-2' : ''}`}
          >
            <span className="text-base-content/50">&lt;</span>
            <span className="text-info">span</span>
            <span className="text-warning"> class</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"highlight"</span>
            <span className="text-warning"> data-tooltip</span>
            <span className="text-base-content/50">=</span>
            <span className="text-success">"Hello"</span>
            <span className="text-base-content/50">&gt;</span>
            <span className="text-base-content/70">Tooltip text</span>
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">span</span>
            <span className="text-base-content/50">&gt;</span>
          </div>

          {/* close div#main */}
          <div>
            <span className="text-base-content/50">&lt;/</span>
            <span className="text-info">div</span>
            <span className="text-base-content/50">&gt;</span>
          </div>
        </div>
      </div>

      {/* Match count */}
      {showMatches && currentSelector && (
        <div className="text-center text-sm text-base-content/70">
          <span className="badge badge-success badge-lg">
            {currentSelector.matches.length} element
            {currentSelector.matches.length !== 1 ? 's' : ''} matched
          </span>
        </div>
      )}
    </div>
  );
}

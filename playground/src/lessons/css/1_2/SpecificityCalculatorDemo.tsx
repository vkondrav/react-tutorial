// ============================================
// SpecificityCalculatorDemo - Interactive specificity calculator
// ============================================

import { useState } from 'react';
import { HiOutlinePlay, HiOutlineRefresh, HiOutlinePlus } from 'react-icons/hi';

interface SpecificityScore {
  inline: number;
  id: number;
  classAttr: number;
  element: number;
}

interface SelectorExample {
  selector: string;
  score: SpecificityScore;
  explanation: string;
}

const PRESET_SELECTORS: SelectorExample[] = [
  {
    selector: 'p',
    score: { inline: 0, id: 0, classAttr: 0, element: 1 },
    explanation: '1 element selector',
  },
  {
    selector: '.btn',
    score: { inline: 0, id: 0, classAttr: 1, element: 0 },
    explanation: '1 class selector',
  },
  {
    selector: '#header',
    score: { inline: 0, id: 1, classAttr: 0, element: 0 },
    explanation: '1 ID selector',
  },
  {
    selector: 'div.card',
    score: { inline: 0, id: 0, classAttr: 1, element: 1 },
    explanation: '1 element + 1 class',
  },
  {
    selector: '.nav .nav-item.active',
    score: { inline: 0, id: 0, classAttr: 3, element: 0 },
    explanation: '3 class selectors',
  },
  {
    selector: '#sidebar .widget h2',
    score: { inline: 0, id: 1, classAttr: 1, element: 1 },
    explanation: '1 ID + 1 class + 1 element',
  },
  {
    selector: 'ul li a:hover',
    score: { inline: 0, id: 0, classAttr: 1, element: 3 },
    explanation: '3 elements + 1 pseudo-class',
  },
  {
    selector: '[type="text"]',
    score: { inline: 0, id: 0, classAttr: 1, element: 0 },
    explanation: '1 attribute selector (same as class)',
  },
  {
    selector: 'style=""',
    score: { inline: 1, id: 0, classAttr: 0, element: 0 },
    explanation: 'Inline styles beat everything (except !important)',
  },
];

function calculateSpecificity(selector: string): SpecificityScore {
  // Simple specificity calculator (not perfect but good for demos)
  let inline = 0;
  let id = 0;
  let classAttr = 0;
  let element = 0;

  // Check for inline styles
  if (selector.includes('style=')) {
    inline = 1;
    return { inline, id, classAttr, element };
  }

  // Remove pseudo-elements (::) first - they don't add specificity
  const withoutPseudoElements = selector.replace(/::[a-z-]+/gi, '');

  // Count IDs
  id = (withoutPseudoElements.match(/#[a-z_-]+/gi) || []).length;

  // Count classes, pseudo-classes (:), and attributes ([])
  classAttr =
    (withoutPseudoElements.match(/\.[a-z_-]+/gi) || []).length +
    (withoutPseudoElements.match(/:[a-z-]+/gi) || []).length +
    (withoutPseudoElements.match(/\[[^\]]+\]/gi) || []).length;

  // Count elements (simple approach - words that aren't classes/ids)
  const cleaned = withoutPseudoElements
    .replace(/#[a-z_-]+/gi, '')
    .replace(/\.[a-z_-]+/gi, '')
    .replace(/\[[^\]]+\]/gi, '')
    .replace(/:[a-z-]+/gi, '');
  element = (cleaned.match(/[a-z]+/gi) || []).length;

  return { inline, id, classAttr, element };
}

function compareScores(a: SpecificityScore, b: SpecificityScore): number {
  if (a.inline !== b.inline) return a.inline - b.inline;
  if (a.id !== b.id) return a.id - b.id;
  if (a.classAttr !== b.classAttr) return a.classAttr - b.classAttr;
  return a.element - b.element;
}

function scoreToString(score: SpecificityScore): string {
  return `(${score.inline}, ${score.id}, ${score.classAttr}, ${score.element})`;
}

export default function SpecificityCalculatorDemo(): React.ReactElement {
  const [selectedSelectors, setSelectedSelectors] = useState<SelectorExample[]>([]);
  const [customSelector, setCustomSelector] = useState('');

  const handleAddPreset = (preset: SelectorExample) => {
    if (selectedSelectors.length < 5) {
      setSelectedSelectors([...selectedSelectors, preset]);
    }
  };

  const handleAddCustom = () => {
    if (customSelector.trim() && selectedSelectors.length < 5) {
      const score = calculateSpecificity(customSelector);
      setSelectedSelectors([
        ...selectedSelectors,
        {
          selector: customSelector,
          score,
          explanation: 'Custom selector',
        },
      ]);
      setCustomSelector('');
    }
  };

  const handleReset = () => {
    setSelectedSelectors([]);
    setCustomSelector('');
  };

  // Sort by specificity (highest first)
  const sortedSelectors = [...selectedSelectors].sort((a, b) => -compareScores(a.score, b.score));

  return (
    <div className="space-y-6">
      {/* Specificity Formula Reference */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4 text-center">Specificity Score Format</h4>
        <div className="flex justify-center items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1">
            <span className="badge badge-lg badge-error">Inline</span>
            <span className="text-xs text-base-content/50">(1,0,0,0)</span>
          </div>
          <span className="text-xl text-base-content/30">&gt;</span>
          <div className="flex items-center gap-1">
            <span className="badge badge-lg badge-warning">ID</span>
            <span className="text-xs text-base-content/50">(0,1,0,0)</span>
          </div>
          <span className="text-xl text-base-content/30">&gt;</span>
          <div className="flex items-center gap-1">
            <span className="badge badge-lg badge-info">Class/Attr</span>
            <span className="text-xs text-base-content/50">(0,0,1,0)</span>
          </div>
          <span className="text-xl text-base-content/30">&gt;</span>
          <div className="flex items-center gap-1">
            <span className="badge badge-lg badge-success">Element</span>
            <span className="text-xs text-base-content/50">(0,0,0,1)</span>
          </div>
        </div>
      </div>

      {/* Preset Selectors */}
      <div>
        <h4 className="font-semibold text-sm text-base-content/70 mb-3">
          Click selectors to compare (max 5):
        </h4>
        <div className="flex flex-wrap gap-2">
          {PRESET_SELECTORS.map((preset, i) => (
            <button
              key={i}
              onClick={() => handleAddPreset(preset)}
              disabled={selectedSelectors.length >= 5}
              className="btn btn-sm btn-outline gap-1"
            >
              <HiOutlinePlus size={12} />
              <code className="font-mono text-xs">{preset.selector}</code>
            </button>
          ))}
        </div>
      </div>

      {/* Custom Selector Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={customSelector}
          onChange={(e) => setCustomSelector(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddCustom()}
          placeholder="Enter a CSS selector..."
          className="input input-bordered flex-1 font-mono"
        />
        <button
          onClick={handleAddCustom}
          disabled={!customSelector.trim() || selectedSelectors.length >= 5}
          className="btn btn-primary gap-2"
        >
          <HiOutlinePlay size={16} />
          Calculate
        </button>
        <button onClick={handleReset} className="btn btn-ghost gap-2">
          <HiOutlineRefresh size={16} />
        </button>
      </div>

      {/* Comparison Results */}
      {selectedSelectors.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-base-content/70">
            Specificity Comparison (highest to lowest):
          </h4>
          <div className="space-y-3">
            {sortedSelectors.map((item, index) => {
              const isWinner = index === 0;
              return (
                <div
                  key={`${item.selector}-${index}`}
                  className={`bg-base-200 rounded-lg p-4 transition-all ${
                    isWinner ? 'ring-2 ring-success' : ''
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      {isWinner && selectedSelectors.length > 1 && (
                        <span className="badge badge-success">WINS</span>
                      )}
                      <code className="font-mono text-lg">{item.selector}</code>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1 font-mono text-lg">
                        <span
                          className={`badge ${item.score.inline ? 'badge-error' : 'badge-ghost'}`}
                        >
                          {item.score.inline}
                        </span>
                        <span
                          className={`badge ${item.score.id ? 'badge-warning' : 'badge-ghost'}`}
                        >
                          {item.score.id}
                        </span>
                        <span
                          className={`badge ${item.score.classAttr ? 'badge-info' : 'badge-ghost'}`}
                        >
                          {item.score.classAttr}
                        </span>
                        <span
                          className={`badge ${item.score.element ? 'badge-success' : 'badge-ghost'}`}
                        >
                          {item.score.element}
                        </span>
                      </div>
                      <span className="text-sm text-base-content/50">
                        {scoreToString(item.score)}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-base-content/60 mt-2">{item.explanation}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Reference Table */}
      <div className="overflow-x-auto">
        <table className="table table-sm bg-base-200 rounded-xl">
          <thead>
            <tr>
              <th>Selector Type</th>
              <th>Example</th>
              <th>Specificity</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold text-error">Inline styles</td>
              <td>
                <code>style="..."</code>
              </td>
              <td>
                <code>(1, 0, 0, 0)</code>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-warning">ID selectors</td>
              <td>
                <code>#header</code>
              </td>
              <td>
                <code>(0, 1, 0, 0)</code>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-info">Classes, attributes, pseudo-classes</td>
              <td>
                <code>.btn, [type], :hover</code>
              </td>
              <td>
                <code>(0, 0, 1, 0)</code>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-success">Elements, pseudo-elements</td>
              <td>
                <code>div, ::before</code>
              </td>
              <td>
                <code>(0, 0, 0, 1)</code>
              </td>
            </tr>
            <tr>
              <td className="font-semibold text-base-content/50">Universal, combinators</td>
              <td>
                <code>*, &gt;, +, ~</code>
              </td>
              <td>
                <code>(0, 0, 0, 0)</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

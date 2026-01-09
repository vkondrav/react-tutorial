import { useState } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineExclamationCircle, HiCheck, HiX } from 'react-icons/hi';
import specificityCode from './examples/Specificity.css?raw';

interface SpecificityExample {
  selector: string;
  specificity: [number, number, number, number]; // [inline, id, class, element]
  description: string;
  approach: 'traditional' | 'bem';
}

const examples: SpecificityExample[] = [
  // Traditional CSS examples (showing escalation)
  {
    selector: '.nav a',
    specificity: [0, 0, 1, 1],
    description: 'Base navigation link',
    approach: 'traditional',
  },
  {
    selector: '.nav ul li a',
    specificity: [0, 0, 1, 3],
    description: 'More specific to override',
    approach: 'traditional',
  },
  {
    selector: '.nav ul li a.active',
    specificity: [0, 0, 2, 3],
    description: 'Adding class for active state',
    approach: 'traditional',
  },
  {
    selector: '#header .nav ul li a.active',
    specificity: [0, 1, 2, 3],
    description: 'ID added to "win" cascade',
    approach: 'traditional',
  },
  // BEM examples (all flat)
  {
    selector: '.nav__link',
    specificity: [0, 0, 1, 0],
    description: 'Navigation link',
    approach: 'bem',
  },
  {
    selector: '.nav__link--active',
    specificity: [0, 0, 1, 0],
    description: 'Active state modifier',
    approach: 'bem',
  },
  {
    selector: '.nav__item',
    specificity: [0, 0, 1, 0],
    description: 'Navigation item',
    approach: 'bem',
  },
  {
    selector: '.nav--dark',
    specificity: [0, 0, 1, 0],
    description: 'Dark theme modifier',
    approach: 'bem',
  },
];

function SpecificityBar({ specificity }: { specificity: [number, number, number, number] }) {
  const [inline, id, cls, el] = specificity;
  const total = inline * 1000 + id * 100 + cls * 10 + el;
  const maxWidth = 200; // pixels
  const width = Math.min(total * 8, maxWidth);

  return (
    <div className="flex items-center gap-3">
      <div className="w-48 bg-base-300 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${
            total > 5 ? 'bg-error' : total > 2 ? 'bg-warning' : 'bg-success'
          }`}
          style={{ width: `${(width / maxWidth) * 100}%` }}
        />
      </div>
      <code className="text-xs font-mono bg-base-200 px-2 py-1 rounded min-w-[80px] text-center">
        ({inline},{id},{cls},{el})
      </code>
    </div>
  );
}

export default function SpecificityComparisonDemo(): React.ReactElement {
  const [approach, setApproach] = useState<'traditional' | 'bem' | 'both'>('both');
  const [showCode, setShowCode] = useState(false);

  const filteredExamples =
    approach === 'both' ? examples : examples.filter((ex) => ex.approach === approach);

  const traditionalExamples = examples.filter((ex) => ex.approach === 'traditional');
  const bemExamples = examples.filter((ex) => ex.approach === 'bem');

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Approach Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setApproach('both')}
          className={`btn btn-sm ${approach === 'both' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Compare Both
        </button>
        <button
          onClick={() => setApproach('traditional')}
          className={`btn btn-sm ${approach === 'traditional' ? 'btn-error' : 'btn-ghost'}`}
        >
          Traditional CSS
        </button>
        <button
          onClick={() => setApproach('bem')}
          className={`btn btn-sm ${approach === 'bem' ? 'btn-success' : 'btn-ghost'}`}
        >
          BEM Approach
        </button>
      </div>

      {/* Side-by-Side Comparison */}
      {approach === 'both' && (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Traditional */}
          <div className="bg-error/10 rounded-lg p-4 border border-error/30">
            <div className="flex items-center gap-2 mb-4">
              <HiX className="text-error" size={20} />
              <h4 className="font-semibold text-error">Traditional CSS</h4>
            </div>
            <div className="space-y-3">
              {traditionalExamples.map((ex, i) => (
                <div key={i} className="bg-base-300 rounded p-3">
                  <code className="text-sm block mb-1 text-error">{ex.selector}</code>
                  <p className="text-xs text-base-content/60 mb-2">{ex.description}</p>
                  <SpecificityBar specificity={ex.specificity} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-error/20 rounded flex items-start gap-2">
              <HiOutlineExclamationCircle className="text-error shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-base-content/70">
                Specificity keeps growing! Eventually leads to{' '}
                <code className="bg-base-300 px-1 rounded">!important</code>
              </p>
            </div>
          </div>

          {/* BEM */}
          <div className="bg-success/10 rounded-lg p-4 border border-success/30">
            <div className="flex items-center gap-2 mb-4">
              <HiCheck className="text-success" size={20} />
              <h4 className="font-semibold text-success">BEM Approach</h4>
            </div>
            <div className="space-y-3">
              {bemExamples.map((ex, i) => (
                <div key={i} className="bg-base-300 rounded p-3">
                  <code className="text-sm block mb-1 text-success">{ex.selector}</code>
                  <p className="text-xs text-base-content/60 mb-2">{ex.description}</p>
                  <SpecificityBar specificity={ex.specificity} />
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-success/20 rounded flex items-start gap-2">
              <HiCheck className="text-success shrink-0 mt-0.5" size={18} />
              <p className="text-xs text-base-content/70">
                All selectors have <strong>identical specificity</strong>—source order wins
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Single Approach List */}
      {approach !== 'both' && (
        <div className="space-y-3 mb-6">
          {filteredExamples.map((ex, i) => (
            <div
              key={i}
              className={`rounded-lg p-4 border ${
                ex.approach === 'traditional'
                  ? 'bg-error/10 border-error/30'
                  : 'bg-success/10 border-success/30'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <code
                    className={`text-sm font-medium ${
                      ex.approach === 'traditional' ? 'text-error' : 'text-success'
                    }`}
                  >
                    {ex.selector}
                  </code>
                  <p className="text-xs text-base-content/60 mt-1">{ex.description}</p>
                </div>
                <SpecificityBar specificity={ex.specificity} />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* The Problem Illustrated */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-base-content mb-3 text-sm">The Specificity War</h4>
        <div className="grid sm:grid-cols-3 gap-4 text-center">
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-3xl font-bold text-error mb-1">4→6</div>
            <p className="text-xs text-base-content/60">Traditional specificity range</p>
          </div>
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-3xl font-bold text-success mb-1">1</div>
            <p className="text-xs text-base-content/60">BEM specificity (always)</p>
          </div>
          <div className="bg-base-200 rounded-lg p-3">
            <div className="text-3xl font-bold text-warning mb-1">0</div>
            <p className="text-xs text-base-content/60">!important needed with BEM</p>
          </div>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Comparison
      </button>

      {showCode && (
        <CodeSnippet title="Specificity Comparison" language="css" code={specificityCode} />
      )}
    </div>
  );
}

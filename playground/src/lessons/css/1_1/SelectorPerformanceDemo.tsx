// ============================================
// SelectorPerformanceDemo - Right-to-left parsing visualization
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlinePlay, HiOutlineExclamation, HiOutlineCheck } from 'react-icons/hi';

interface SelectorExample {
  selector: string;
  parts: string[];
  efficiency: 'good' | 'okay' | 'bad';
  explanation: string;
}

const EXAMPLES: SelectorExample[] = [
  {
    selector: '.nav-link',
    parts: ['.nav-link'],
    efficiency: 'good',
    explanation: 'Single class selector—fast! Browser finds elements with this class directly.',
  },
  {
    selector: '.header .nav .nav-link',
    parts: ['.header', '.nav', '.nav-link'],
    efficiency: 'okay',
    explanation:
      'Browser finds all .nav-link first, then checks ancestors. More work, but acceptable.',
  },
  {
    selector: 'div.container ul li a.link',
    parts: ['div.container', 'ul', 'li', 'a.link'],
    efficiency: 'bad',
    explanation:
      'Very deep! Browser finds all a.link, then climbs the tree 4 times for each. Avoid in large apps.',
  },
  {
    selector: '* .content',
    parts: ['*', '.content'],
    efficiency: 'bad',
    explanation:
      'Universal selector (*) forces browser to check EVERY element as potential ancestor. Very slow!',
  },
];

export default function SelectorPerformanceDemo(): React.ReactElement {
  const [selectedExample, setSelectedExample] = useState(0);
  const [animationStep, setAnimationStep] = useState(-1);
  const [isAnimating, setIsAnimating] = useState(false);

  const example = EXAMPLES[selectedExample];

  const runAnimation = () => {
    setIsAnimating(true);
    setAnimationStep(example.parts.length - 1);

    // Animate through parts right-to-left
    let step = example.parts.length - 1;
    const interval = setInterval(() => {
      step--;
      if (step < 0) {
        clearInterval(interval);
        setIsAnimating(false);
      } else {
        setAnimationStep(step);
      }
    }, 800);
  };

  // Reset animation when example changes
  useEffect(() => {
    setAnimationStep(-1);
    setIsAnimating(false);
  }, [selectedExample]);

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'good':
        return 'text-success';
      case 'okay':
        return 'text-warning';
      case 'bad':
        return 'text-error';
      default:
        return '';
    }
  };

  const getEfficiencyBg = (efficiency: string) => {
    switch (efficiency) {
      case 'good':
        return 'bg-success/20 border-success/50';
      case 'okay':
        return 'bg-warning/20 border-warning/50';
      case 'bad':
        return 'bg-error/20 border-error/50';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Example Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {EXAMPLES.map((ex, i) => (
          <button
            key={i}
            onClick={() => setSelectedExample(i)}
            className={`btn btn-sm ${selectedExample === i ? 'btn-primary' : 'btn-outline'}`}
          >
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="font-mono text-xs">{ex.selector}</code>
          </button>
        ))}
      </div>

      {/* Animation Visualization */}
      <div className={`rounded-xl p-6 border ${getEfficiencyBg(example.efficiency)}`}>
        {/* Selector Parts */}
        <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
          <span className="text-base-content/50 text-sm mr-2">Parsing order:</span>
          {example.parts.map((part, i) => {
            const isActive = animationStep === i;
            const isParsed = animationStep < i || animationStep === -1;
            // Reverse order for display (right-to-left)
            const displayOrder = example.parts.length - 1 - i;

            return (
              <div key={i} className="flex items-center gap-2">
                <div
                  className={`
                    px-3 py-2 rounded-lg font-mono text-sm transition-all duration-300
                    ${isActive ? 'bg-primary text-primary-content scale-110 shadow-lg' : ''}
                    ${isParsed && !isActive ? 'bg-base-300 text-base-content/50' : ''}
                    ${!isParsed && !isActive ? 'bg-base-100 text-base-content' : ''}
                  `}
                >
                  {part}
                  {isAnimating && (
                    <span className="ml-2 badge badge-xs badge-neutral">{displayOrder + 1}</span>
                  )}
                </div>
                {i < example.parts.length - 1 && (
                  <span className="text-base-content/30">{'←'}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Animation Controls */}
        <div className="flex justify-center mb-6">
          <button onClick={runAnimation} disabled={isAnimating} className="btn btn-primary gap-2">
            <HiOutlinePlay size={18} />
            {isAnimating ? 'Parsing...' : 'See Right-to-Left Parsing'}
          </button>
        </div>

        {/* Efficiency Rating */}
        <div className="flex items-center justify-center gap-3">
          <span className="text-sm text-base-content/70">Efficiency:</span>
          <span className={`font-bold ${getEfficiencyColor(example.efficiency)}`}>
            {example.efficiency === 'good' && (
              <span className="flex items-center gap-1">
                <HiOutlineCheck size={18} /> Good
              </span>
            )}
            {example.efficiency === 'okay' && (
              <span className="flex items-center gap-1">
                <HiOutlineExclamation size={18} /> Okay
              </span>
            )}
            {example.efficiency === 'bad' && (
              <span className="flex items-center gap-1">
                <HiOutlineExclamation size={18} /> Avoid
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Explanation */}
      <div className="bg-base-200 rounded-lg p-4">
        <p className="text-sm text-base-content/70">{example.explanation}</p>
      </div>

      {/* Tips */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-success/10 border border-success/30 rounded-lg p-4">
          <h4 className="font-semibold text-success mb-2 text-sm">✓ Good Practices</h4>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}• Use class selectors:{' '}
              <code>.btn-primary</code>
            </li>
            <li>• Keep selectors short (2-3 levels max)</li>
            <li>• Be specific on the rightmost part</li>
          </ul>
        </div>
        <div className="bg-error/10 border border-error/30 rounded-lg p-4">
          <h4 className="font-semibold text-error mb-2 text-sm">✗ Avoid</h4>
          <ul className="text-sm text-base-content/70 space-y-1">
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}• Universal selectors:{' '}
              <code>* {'{}'}</code>
            </li>
            <li>• Deep descendant chains</li>
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}• Qualifying classes:{' '}
              <code>div.container</code>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { CodeSnippet } from '@components';
import { HiOutlineCheck, HiOutlineX, HiOutlineExclamation } from 'react-icons/hi';
import focusStylesCode from './examples/FocusStyles.css?raw';

type FocusApproach = 'none' | 'default' | 'custom' | 'focus-visible';

interface ApproachInfo {
  name: string;
  description: string;
  verdict: 'bad' | 'ok' | 'good' | 'best';
  styles: React.CSSProperties;
  focusStyles: React.CSSProperties;
}

const approaches: Record<FocusApproach, ApproachInfo> = {
  none: {
    name: 'outline: none',
    description: 'Removes focus indicator completely. Keyboard users cannot see where they are.',
    verdict: 'bad',
    styles: { outline: 'none' },
    focusStyles: { outline: 'none' },
  },
  default: {
    name: 'Browser Default',
    description: "Uses browser's built-in focus ring. Works but may not match your design.",
    verdict: 'ok',
    styles: {},
    focusStyles: {},
  },
  custom: {
    name: 'Custom :focus',
    description: 'Custom focus style that matches your design. Shows on all focus events.',
    verdict: 'good',
    styles: { outline: 'none' },
    focusStyles: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
      borderColor: '#3b82f6',
    },
  },
  'focus-visible': {
    name: ':focus-visible',
    description: 'Shows focus only for keyboard navigation, not mouse clicks. Best UX.',
    verdict: 'best',
    styles: { outline: 'none' },
    focusStyles: {
      outline: 'none',
      boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.5)',
      borderColor: '#3b82f6',
    },
  },
};

const verdictConfig = {
  bad: { icon: HiOutlineX, color: 'text-error', bg: 'bg-error/10', label: 'Inaccessible' },
  ok: {
    icon: HiOutlineExclamation,
    color: 'text-warning',
    bg: 'bg-warning/10',
    label: 'Acceptable',
  },
  good: { icon: HiOutlineCheck, color: 'text-success', bg: 'bg-success/10', label: 'Good' },
  best: {
    icon: HiOutlineCheck,
    color: 'text-primary',
    bg: 'bg-primary/10',
    label: 'Best Practice',
  },
};

export default function FocusIndicatorsDemo(): React.ReactElement {
  const [approach, setApproach] = useState<FocusApproach>('focus-visible');
  const [showCode, setShowCode] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [focusMethod, setFocusMethod] = useState<'none' | 'mouse' | 'keyboard'>('none');

  const currentApproach = approaches[approach];
  const verdict = verdictConfig[currentApproach.verdict];
  const VerdictIcon = verdict.icon;

  // For focus-visible, only show focus styles on keyboard focus
  const shouldShowFocus = isFocused && (approach !== 'focus-visible' || focusMethod === 'keyboard');

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Approach Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(approaches) as FocusApproach[]).map((key) => (
          <button
            key={key}
            onClick={() => setApproach(key)}
            className={`btn btn-sm ${approach === key ? 'btn-primary' : 'btn-ghost'}`}
          >
            {approaches[key].name}
          </button>
        ))}
      </div>

      {/* Description and Verdict */}
      <div className={`rounded-lg p-4 mb-6 ${verdict.bg}`}>
        <div className="flex items-center gap-2 mb-2">
          <VerdictIcon className={verdict.color} size={20} />
          <span className={`font-semibold ${verdict.color}`}>{verdict.label}</span>
        </div>
        <p className="text-sm text-base-content/70">{currentApproach.description}</p>
      </div>

      {/* Interactive Demo */}
      <div className="bg-base-300 rounded-lg p-6 mb-6">
        <h4 className="font-semibold text-base-content mb-4 text-sm">
          Try It: Tab to the button or click it
        </h4>

        <div className="flex items-center gap-4 mb-4">
          {/* Reset focus target */}
          <input
            type="text"
            placeholder="Tab from here →"
            className="input input-bordered input-sm w-40"
            onFocus={() => {
              setIsFocused(false);
              setFocusMethod('none');
            }}
          />

          {/* Demo button */}
          <button
            className="px-6 py-3 rounded-lg font-medium transition-all duration-200"
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              border: '2px solid transparent',
              ...currentApproach.styles,
              ...(shouldShowFocus ? currentApproach.focusStyles : {}),
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => {
              setIsFocused(false);
              setFocusMethod('none');
            }}
            onMouseDown={() => setFocusMethod('mouse')}
            onKeyDown={(e) => {
              if (e.key === 'Tab') {
                setFocusMethod('keyboard');
              }
            }}
          >
            Focus Me
          </button>

          {/* Another tab target */}
          <input
            type="text"
            placeholder="← or here"
            className="input input-bordered input-sm w-32"
            onFocus={() => {
              setIsFocused(false);
              setFocusMethod('none');
            }}
          />
        </div>

        {/* Focus State Indicator */}
        <div className="flex items-center gap-4 text-sm">
          <span className="text-base-content/50">Focus State:</span>
          <span
            className={`px-2 py-1 rounded ${
              isFocused
                ? focusMethod === 'keyboard'
                  ? 'bg-primary/20 text-primary'
                  : 'bg-warning/20 text-warning'
                : 'bg-base-200 text-base-content/50'
            }`}
          >
            {!isFocused
              ? 'Not Focused'
              : focusMethod === 'keyboard'
                ? 'Keyboard Focus'
                : 'Mouse Focus'}
          </span>
          {approach === 'focus-visible' && isFocused && (
            <span className="text-base-content/50">
              {focusMethod === 'keyboard' ? '→ Focus ring shown' : '→ Focus ring hidden'}
            </span>
          )}
        </div>
      </div>

      {/* Best Practice Warning */}
      {approach === 'none' && (
        <div className="alert alert-error mb-6">
          <HiOutlineX size={20} />
          <div>
            <h4 className="font-semibold">Never do this!</h4>
            <p className="text-sm">
              Removing focus styles makes your site unusable for keyboard users. This violates WCAG
              2.4.7 (Focus Visible).
            </p>
          </div>
        </div>
      )}

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost mb-4">
        {showCode ? 'Hide' : 'Show'} CSS Code
      </button>

      {showCode && (
        <CodeSnippet title="Focus Indicator Patterns" language="css" code={focusStylesCode} />
      )}
    </div>
  );
}

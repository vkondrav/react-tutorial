// ============================================
// Activity Concept Demo
// ============================================

import { useState } from 'react';
import {
  HiOutlineLightBulb,
  HiChevronDown,
  HiChevronRight,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';

import activityCode from './examples/ActivityExample.tsx?raw';
import activityBenefitsCode from './examples/ActivityModes.tsx?raw';

const comparisonData = [
  {
    feature: 'State preserved',
    conditional: '❌',
    css: '✓',
    activity: '✓',
  },
  {
    feature: 'Removed from DOM',
    conditional: '✓',
    css: '❌',
    activity: '✓',
  },
  {
    feature: 'Effects paused',
    conditional: '✓ (destroyed)',
    css: '❌',
    activity: '✓',
  },
  {
    feature: 'Memory efficient',
    conditional: '✓',
    css: '❌',
    activity: '✓',
  },
  {
    feature: 'Accessibility',
    conditional: '✓',
    css: '⚠️',
    activity: '✓',
  },
];

export default function ActivityConceptDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="space-y-4">
      {/* Experimental Warning */}
      <div className="alert bg-warning/20 border-warning">
        <HiOutlineExclamationCircle className="text-warning" size={20} />
        <div className="flex-1">
          <p className="font-semibold text-warning">Experimental API</p>
          <p className="text-sm text-base-content/70">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            The <code className="text-accent">Activity</code> component is currently experimental in
            {/* eslint-disable-next-line local/no-raw-code-element */}
            React 19. Import it as <code className="text-accent">unstable_Activity</code>. The API
            may change before stable release.
          </p>
        </div>
      </div>

      {/* Concept Explanation */}
      <div className="card bg-base-200 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-warning mt-1 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-warning mb-2">What is Activity?</p>
            <p className="text-base-content/70 text-sm mb-3">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-accent">&lt;Activity&gt;</code> is React's built-in solution for
              preserving component state while hiding content. It has two modes:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <div className="bg-base-300 p-3 rounded-lg">
                <p className="font-semibold text-primary mb-1">mode="visible"</p>
                <p className="text-base-content/70">
                  Component renders normally, effects run, content visible in DOM.
                </p>
              </div>
              <div className="bg-base-300 p-3 rounded-lg">
                <p className="font-semibold text-secondary mb-1">mode="hidden"</p>
                <p className="text-base-content/70">
                  State preserved, but content hidden from DOM and effects paused.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-ghost gap-2">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Activity Code
      </button>

      {showCode && (
        <div className="space-y-4">
          <CodeSnippet title="Using Activity" language="tsx" code={activityCode} />
          <CodeSnippet
            title="Activity Modes Explained"
            language="tsx"
            code={activityBenefitsCode}
          />
        </div>
      )}

      {/* Comparison Table */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Comparison</h4>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="text-center">
                  <span className="text-error">Conditional</span>
                  <br />
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-xs">{`{x && <C />}`}</code>
                </th>
                <th className="text-center">
                  <span className="text-warning">CSS Hide</span>
                  <br />
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-xs">display:none</code>
                </th>
                <th className="text-center">
                  <span className="text-success">Activity</span>
                  <br />
                  {/* eslint-disable-next-line local/no-raw-code-element */}
                  <code className="text-xs">&lt;Activity&gt;</code>
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row) => (
                <tr key={row.feature}>
                  <td className="font-medium">{row.feature}</td>
                  <td className="text-center">{row.conditional}</td>
                  <td className="text-center">{row.css}</td>
                  <td className="text-center">{row.activity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Use Cases */}
      <div className="card bg-linear-to-r from-primary/10 to-secondary/10 p-4">
        <h4 className="font-semibold mb-3 text-primary">Ideal Use Cases for Activity</h4>
        <div className="grid sm:grid-cols-2 gap-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Tab panels</strong> with forms or complex state
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Wizard steps</strong> that users navigate back to
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Modal dialogs</strong> with input state
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Cached routes</strong> in navigation
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Offscreen prefetching</strong> for instant loads
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-success">✓</span>
            <span>
              <strong>Heavy components</strong> that are expensive to remount
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

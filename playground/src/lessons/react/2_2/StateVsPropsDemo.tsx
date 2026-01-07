// ============================================
// StateVsPropsDemo - State vs Props Comparison
// ============================================

import { useState } from 'react';
import { HiOutlineKey } from 'react-icons/hi';
import { CodeSnippet } from '../../components';

// ============================================
// Constants
// ============================================

const COMPARISON_DATA: [string, string, string][] = [
  ['Owned by', 'Parent component', 'The component itself'],
  ['Can change?', 'No (read-only)', 'Yes (via setter)'],
  ['Passed from', 'Parent → Child', 'Created internally'],
  ['Purpose', 'Configure component', 'Track changing data'],
  ['Triggers re-render', 'When parent changes', 'When setter called'],
];

const COLOR_OPTIONS: string[] = ['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'];

// ============================================
// Main Component
// ============================================

export default function StateVsPropsDemo(): React.ReactElement {
  const [parentColor, setParentColor] = useState<string>('#3b82f6');

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Comparison Table */}
      <div className="p-6 border-b border-base-300">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="px-3 py-3 text-left text-xs text-base-content/50 border-b border-base-300"></th>
                <th className="px-3 py-3 text-left text-sm text-primary border-b border-base-300">
                  Props
                </th>
                <th className="px-3 py-3 text-left text-sm text-success border-b border-base-300">
                  State
                </th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_DATA.map(([label, props, state], i) => (
                <tr key={i}>
                  <td className="px-3 py-3 text-base-content/70 text-sm">{label}</td>
                  <td className="px-3 py-3 text-primary text-sm bg-primary/10">{props}</td>
                  <td className="px-3 py-3 text-success text-sm bg-success/10">{state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive Demo */}
      <div className="p-6">
        <div className="text-xs text-base-content/50 mb-4 uppercase">
          Interactive Example: Props vs State
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Parent (has state) */}
          <div className="card bg-base-300 p-4 border-2 border-success">
            <div className="text-success text-xs mb-4 font-semibold">
              PARENT COMPONENT (owns state)
            </div>
            <CodeSnippet
              code={`const [color, setColor] = useState('${parentColor}');`}
              language="tsx"
              showCopy={false}
            />
            <div className="mt-4">
              <div className="text-[0.7rem] text-base-content/50 mb-2">Change state:</div>
              <div className="flex gap-2">
                {COLOR_OPTIONS.map((color) => (
                  <button
                    key={color}
                    onClick={() => setParentColor(color)}
                    className="w-8 h-8 rounded cursor-pointer transition-all"
                    style={{
                      backgroundColor: color,
                      border: parentColor === color ? '2px solid white' : 'none',
                    }}
                  />
                ))}
              </div>
            </div>
            <div className="mt-4">
              <CodeSnippet
                code={`<ChildComponent color={color} />`}
                language="tsx"
                showCopy={false}
              />
            </div>
          </div>

          {/* Child (receives props) */}
          <div className="card bg-base-300 p-4 border-2 border-primary">
            <div className="text-primary text-xs mb-4 font-semibold">
              CHILD COMPONENT (receives props)
            </div>
            <CodeSnippet
              code={`function Child({ color }) {
  // Can READ color
  // Cannot CHANGE color
}`}
              language="tsx"
              showCopy={false}
            />
            <div
              className="mt-4 p-4 rounded-lg text-white text-center font-semibold"
              style={{ backgroundColor: parentColor }}
            >
              My color is: {parentColor}
            </div>
            <div className="mt-3 text-base-content/50 text-[0.7rem] text-center">
              ↑ Color comes from parent's state as a prop
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="px-6 py-4 bg-primary/10 border-t border-primary flex items-center gap-3">
        <HiOutlineKey className="text-primary" size={20} />
        <span className="text-base-content/70 text-sm">
          <strong className="text-base-content">Rule of thumb:</strong> If data needs to change, use{' '}
          <strong className="text-success">state</strong>. If data is passed from parent, it's{' '}
          <strong className="text-primary">props</strong>.
        </span>
      </div>
    </div>
  );
}

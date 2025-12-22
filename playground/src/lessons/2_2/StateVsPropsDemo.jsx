import { useState } from 'react';

export default function StateVsPropsDemo() {
  const [parentColor, setParentColor] = useState('#3b82f6');

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Comparison Table */}
      <div className="p-6 border-b border-slate-700">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs text-slate-500 border-b border-slate-700"></th>
              <th className="px-3 py-3 text-left text-sm text-blue-500 border-b border-slate-700">
                Props
              </th>
              <th className="px-3 py-3 text-left text-sm text-green-500 border-b border-slate-700">
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ['Owned by', 'Parent component', 'The component itself'],
              ['Can change?', 'No (read-only)', 'Yes (via setter)'],
              ['Passed from', 'Parent → Child', 'Created internally'],
              ['Purpose', 'Configure component', 'Track changing data'],
              ['Triggers re-render', 'When parent changes', 'When setter called'],
            ].map(([label, props, state], i) => (
              <tr key={i}>
                <td className="px-3 py-3 text-slate-400 text-sm">{label}</td>
                <td className="px-3 py-3 text-blue-500 text-sm bg-blue-500/10">{props}</td>
                <td className="px-3 py-3 text-green-500 text-sm bg-green-500/10">{state}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Interactive Demo */}
      <div className="p-6">
        <div className="text-xs text-slate-500 mb-4 uppercase">
          Interactive Example: Props vs State
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Parent (has state) */}
          <div className="p-4 bg-slate-900 rounded-lg border-2 border-green-500">
            <div className="text-green-500 text-xs mb-4 font-semibold">
              PARENT COMPONENT (owns state)
            </div>
            <pre className="m-0 text-xs text-slate-400 leading-relaxed">
              {`const [color, setColor] = useState('${parentColor}');`}
            </pre>
            <div className="mt-4">
              <div className="text-[0.7rem] text-slate-500 mb-2">Change state:</div>
              <div className="flex gap-2">
                {['#3b82f6', '#22c55e', '#f59e0b', '#ec4899', '#8b5cf6'].map((color) => (
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
            <div className="mt-4 p-2 bg-slate-800 rounded text-xs">
              <code className="text-slate-200">
                {`<ChildComponent `}
                <span className="text-blue-500">color</span>
                {`={`}
                <span className="text-green-500">color</span>
                {`} />`}
              </code>
            </div>
          </div>

          {/* Child (receives props) */}
          <div className="p-4 bg-slate-900 rounded-lg border-2 border-blue-500">
            <div className="text-blue-500 text-xs mb-4 font-semibold">
              CHILD COMPONENT (receives props)
            </div>
            <pre className="m-0 text-xs text-slate-400 leading-relaxed">
              {`function Child({ color }) {
  // Can READ color
  // Cannot CHANGE color
}`}
            </pre>
            <div
              className="mt-4 p-4 rounded-lg text-white text-center font-semibold"
              style={{ backgroundColor: parentColor }}
            >
              My color is: {parentColor}
            </div>
            <div className="mt-3 text-slate-500 text-[0.7rem] text-center">
              ↑ Color comes from parent's state as a prop
            </div>
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div className="px-6 py-4 bg-blue-500/10 border-t border-blue-500 flex items-center gap-3">
        <span className="text-xl">🔑</span>
        <span className="text-slate-400 text-sm">
          <strong className="text-slate-50">Rule of thumb:</strong> If data needs to change, use{' '}
          <strong className="text-green-500">state</strong>. If data is passed from parent, it's{' '}
          <strong className="text-blue-500">props</strong>.
        </span>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { HiOutlineEye, HiOutlineQuestionMarkCircle } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import marginCollapseCode from './examples/MarginCollapse.css?raw';

type CollapseScenario = 'siblings' | 'parent-child' | 'empty';
type FixMethod = 'none' | 'overflow' | 'padding' | 'border' | 'flexbox';

export default function MarginCollapseDemo(): React.ReactElement {
  const [scenario, setScenario] = useState<CollapseScenario>('siblings');
  const [fixMethod, setFixMethod] = useState<FixMethod>('none');
  const [showMargins, setShowMargins] = useState(true);

  const scenarios: Array<{ id: CollapseScenario; label: string; description: string }> = [
    {
      id: 'siblings',
      label: 'Adjacent Siblings',
      description: 'Bottom margin of first element meets top margin of second',
    },
    {
      id: 'parent-child',
      label: 'Parent-Child',
      description: "Child's margin can escape and collapse with parent's margin",
    },
    {
      id: 'empty',
      label: 'Empty Element',
      description: "An empty element's own top and bottom margins collapse",
    },
  ];

  const fixes: Array<{ id: FixMethod; label: string; css: string }> = [
    { id: 'none', label: 'No Fix (Collapsed)', css: '' },
    { id: 'overflow', label: 'overflow: hidden', css: 'overflow: hidden' },
    { id: 'padding', label: 'padding: 1px', css: 'padding-top: 1px' },
    { id: 'border', label: 'border: 1px', css: 'border-top: 1px solid transparent' },
    { id: 'flexbox', label: 'display: flex', css: 'display: flex; flex-direction: column' },
  ];

  // Calculate expected vs actual gap
  const margin1 = 30;
  const margin2 = 20;
  const expectedGap = margin1 + margin2;
  const actualGap = fixMethod === 'none' ? Math.max(margin1, margin2) : expectedGap;

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <div className="flex flex-wrap gap-2">
        {scenarios.map((s) => (
          <button
            key={s.id}
            onClick={() => {
              setScenario(s.id);
              setFixMethod('none');
            }}
            className={`btn btn-sm ${scenario === s.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Scenario Description */}
      <div className="alert bg-base-200">
        <HiOutlineQuestionMarkCircle className="shrink-0" size={20} />
        <span>{scenarios.find((s) => s.id === scenario)?.description}</span>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <HiOutlineEye className="text-primary" size={20} />
            <h4 className="font-semibold">Visual Demo</h4>
          </div>
          <label className="label cursor-pointer gap-2">
            <span className="label-text text-sm">Show margins</span>
            <input
              type="checkbox"
              className="toggle toggle-sm toggle-primary"
              checked={showMargins}
              onChange={(e) => setShowMargins(e.target.checked)}
            />
          </label>
        </div>

        {/* Sibling Scenario */}
        {scenario === 'siblings' && (
          <div
            className="bg-base-300 rounded-lg p-4 transition-all"
            style={{
              ...(fixMethod === 'overflow' && { overflow: 'hidden' }),
              ...(fixMethod === 'flexbox' && { display: 'flex', flexDirection: 'column' }),
            }}
          >
            {/* First Box */}
            <div className="relative">
              <div
                className="bg-primary text-primary-content p-4 rounded text-center font-medium"
                style={{ marginBottom: margin1 }}
              >
                Box 1<span className="text-xs block opacity-80">margin-bottom: {margin1}px</span>
              </div>
              {showMargins && (
                <div
                  className="absolute left-0 right-0 bg-warning/30 border-y border-warning border-dashed flex items-center justify-center text-xs text-warning"
                  style={{ height: margin1, bottom: 0, transform: 'translateY(100%)' }}
                >
                  {margin1}px
                </div>
              )}
            </div>

            {/* Gap Indicator */}
            <div
              className="relative flex items-center justify-center transition-all"
              style={{ height: actualGap }}
            >
              <div
                className={`absolute inset-0 ${fixMethod === 'none' ? 'bg-error/20' : 'bg-success/20'}`}
              />
              <span
                className={`relative z-10 badge ${fixMethod === 'none' ? 'badge-error' : 'badge-success'}`}
              >
                Actual: {actualGap}px
              </span>
            </div>

            {/* Second Box */}
            <div className="relative">
              {showMargins && (
                <div
                  className="absolute left-0 right-0 bg-secondary/30 border-y border-secondary border-dashed flex items-center justify-center text-xs text-secondary"
                  style={{ height: margin2, top: 0, transform: 'translateY(-100%)' }}
                >
                  {margin2}px
                </div>
              )}
              <div
                className="bg-secondary text-secondary-content p-4 rounded text-center font-medium"
                style={{ marginTop: margin2 }}
              >
                Box 2<span className="text-xs block opacity-80">margin-top: {margin2}px</span>
              </div>
            </div>
          </div>
        )}

        {/* Parent-Child Scenario */}
        {scenario === 'parent-child' && (
          <div className="relative">
            <div
              className="bg-warning/20 border-2 border-warning border-dashed rounded-lg transition-all"
              style={{
                ...(fixMethod === 'overflow' && { overflow: 'hidden' }),
                ...(fixMethod === 'padding' && { paddingTop: 1 }),
                ...(fixMethod === 'border' && { borderTop: '1px solid transparent' }),
                ...(fixMethod === 'flexbox' && { display: 'flex', flexDirection: 'column' }),
              }}
            >
              <span className="absolute -top-3 left-4 bg-warning text-warning-content text-xs px-2 py-0.5 rounded">
                parent
              </span>
              <div
                className="bg-primary text-primary-content p-4 m-4 rounded text-center transition-all"
                style={{ marginTop: 30 }}
              >
                Child
                <span className="text-xs block opacity-80">margin-top: 30px</span>
              </div>
            </div>
            {showMargins && fixMethod === 'none' && (
              <div className="mt-2 text-sm text-error flex items-center gap-2">
                <span className="badge badge-error badge-sm">!</span>
                Child's margin escapes parent and collapses with parent's external margin
              </div>
            )}
            {fixMethod !== 'none' && (
              <div className="mt-2 text-sm text-success flex items-center gap-2">
                <span className="badge badge-success badge-sm">✓</span>
                Parent creates a new Block Formatting Context — margin is contained
              </div>
            )}
          </div>
        )}

        {/* Empty Element Scenario */}
        {scenario === 'empty' && (
          <div className="space-y-4">
            <div className="bg-primary text-primary-content p-4 rounded text-center">
              Content Above
            </div>

            <div
              className="relative"
              style={{
                ...(fixMethod === 'padding' && { padding: 1 }),
                ...(fixMethod === 'border' && { border: '1px solid transparent' }),
              }}
            >
              <div
                className={`border-2 border-dashed rounded transition-all ${fixMethod === 'none' ? 'border-error h-0' : 'border-success min-h-[40px]'}`}
                style={{
                  marginTop: 20,
                  marginBottom: 20,
                  ...(fixMethod !== 'none' && fixMethod !== 'padding' && fixMethod !== 'border'
                    ? { minHeight: 40 }
                    : {}),
                }}
              >
                {fixMethod !== 'none' && (
                  <span className="text-xs text-success block text-center py-1">
                    Empty element with content
                  </span>
                )}
              </div>
              {showMargins && (
                <div className="absolute -left-20 top-1/2 -translate-y-1/2 text-xs">
                  {fixMethod === 'none' ? (
                    <span className="text-error">margins collapse to 20px</span>
                  ) : (
                    <span className="text-success">40px total</span>
                  )}
                </div>
              )}
            </div>

            <div className="bg-secondary text-secondary-content p-4 rounded text-center">
              Content Below
            </div>
          </div>
        )}
      </div>

      {/* Fix Methods */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">How to Prevent Collapse</h4>
        <div className="flex flex-wrap gap-2">
          {fixes.map((fix) => (
            <button
              key={fix.id}
              onClick={() => setFixMethod(fix.id)}
              className={`btn btn-sm ${fixMethod === fix.id ? (fix.id === 'none' ? 'btn-error' : 'btn-success') : 'btn-ghost'}`}
            >
              {fix.label}
            </button>
          ))}
        </div>

        {fixMethod !== 'none' && (
          <div className="mt-4 p-3 bg-success/10 border border-success/30 rounded-lg">
            <code className="text-sm text-success">
              .container {'{'} {fixes.find((f) => f.id === fixMethod)?.css} {'}'}
            </code>
          </div>
        )}
      </div>

      {/* Math Breakdown for Siblings */}
      {scenario === 'siblings' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 rounded-lg border-2 border-warning bg-warning/10">
            <h5 className="font-semibold text-warning mb-2">Expected (No Collapse)</h5>
            <div className="font-mono text-sm">
              <div>margin-bottom: {margin1}px</div>
              <div>+ margin-top: {margin2}px</div>
              <div className="border-t border-warning/50 mt-2 pt-2 font-bold">
                = {expectedGap}px gap
              </div>
            </div>
          </div>
          <div
            className={`p-4 rounded-lg border-2 ${fixMethod === 'none' ? 'border-error bg-error/10' : 'border-success bg-success/10'}`}
          >
            <h5
              className={`font-semibold mb-2 ${fixMethod === 'none' ? 'text-error' : 'text-success'}`}
            >
              Actual ({fixMethod === 'none' ? 'Collapsed' : 'Fixed'})
            </h5>
            <div className="font-mono text-sm">
              {fixMethod === 'none' ? (
                <>
                  <div>
                    max({margin1}px, {margin2}px)
                  </div>
                  <div className="border-t border-error/50 mt-2 pt-2 font-bold text-error">
                    = {actualGap}px gap
                  </div>
                </>
              ) : (
                <>
                  <div>
                    {margin1}px + {margin2}px
                  </div>
                  <div className="border-t border-success/50 mt-2 pt-2 font-bold text-success">
                    = {actualGap}px gap
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Code Example */}
      <CodeSnippet title="Margin Collapse Patterns" language="css" code={marginCollapseCode} />
    </div>
  );
}

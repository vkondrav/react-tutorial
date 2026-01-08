import { useState } from 'react';
import { HiOutlineEye, HiOutlineQuestionMarkCircle, HiOutlineExclamation } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import stackingContextCode from './examples/StackingContext.css?raw';

interface BoxProps {
  zIndex: number;
  onChange: (value: number) => void;
  color: string;
  label: string;
  className?: string;
}

function ZIndexBox({ zIndex, onChange, color, label, className = '' }: BoxProps) {
  return (
    <div className={`absolute rounded-lg p-4 shadow-lg ${color} ${className}`} style={{ zIndex }}>
      <div className="font-semibold text-sm mb-2">{label}</div>
      <div className="flex items-center gap-2">
        <span className="text-xs">z-index:</span>
        <input
          type="number"
          value={zIndex}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="input input-xs input-bordered w-16 text-center bg-base-100/50"
          min="-10"
          max="100"
        />
      </div>
    </div>
  );
}

export default function StackingContextDemo(): React.ReactElement {
  const [scenario, setScenario] = useState<'basic' | 'context'>('basic');
  const [zIndexes, setZIndexes] = useState({
    boxA: 1,
    boxB: 2,
    boxC: 3,
    parentA: 1,
    parentB: 2,
    childA: 999,
    childB: 1,
  });

  const updateZ = (key: keyof typeof zIndexes, value: number) => {
    setZIndexes((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Scenario Selection */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setScenario('basic')}
          className={`btn btn-sm ${scenario === 'basic' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Basic z-index
        </button>
        <button
          onClick={() => setScenario('context')}
          className={`btn btn-sm ${scenario === 'context' ? 'btn-warning' : 'btn-ghost'}`}
        >
          Stacking Contexts (The Trap!)
        </button>
      </div>

      {/* Description */}
      <div className={`alert ${scenario === 'basic' ? 'alert-info' : 'alert-warning'}`}>
        <HiOutlineQuestionMarkCircle className="shrink-0" size={20} />
        <div>
          {scenario === 'basic' ? (
            <span>
              <strong>Basic z-index:</strong> Higher values appear on top. Simple when all elements
              share the same stacking context.
            </span>
          ) : (
            <span>
              <strong>Stacking Contexts:</strong> Each context is isolated! A child with z-index:
              9999 can NEVER appear above a sibling of its parent with higher z-index.
            </span>
          )}
        </div>
      </div>

      {/* Visual Demo */}
      <div className="bg-base-200 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <HiOutlineEye className="text-primary" size={20} />
          <h4 className="font-semibold">
            {scenario === 'basic' ? 'Adjust z-index values' : 'The z-index Trap'}
          </h4>
        </div>

        {scenario === 'basic' ? (
          /* Basic z-index demo */
          <div className="relative bg-base-300 rounded-lg h-64 overflow-hidden">
            <span className="absolute top-2 left-2 text-xs text-base-content/50 font-mono z-50">
              All boxes in same stacking context
            </span>

            <ZIndexBox
              zIndex={zIndexes.boxA}
              onChange={(v) => updateZ('boxA', v)}
              color="bg-primary text-primary-content"
              label="Box A"
              className="top-12 left-8 w-32 h-32"
            />

            <ZIndexBox
              zIndex={zIndexes.boxB}
              onChange={(v) => updateZ('boxB', v)}
              color="bg-secondary text-secondary-content"
              label="Box B"
              className="top-20 left-20 w-32 h-32"
            />

            <ZIndexBox
              zIndex={zIndexes.boxC}
              onChange={(v) => updateZ('boxC', v)}
              color="bg-accent text-accent-content"
              label="Box C"
              className="top-28 left-32 w-32 h-32"
            />
          </div>
        ) : (
          /* Stacking context demo */
          <div className="relative bg-base-300 rounded-lg h-80 overflow-hidden">
            <span className="absolute top-2 left-2 text-xs text-base-content/50 font-mono z-50">
              Two stacking contexts (Parent A and Parent B)
            </span>

            {/* Parent A - creates stacking context */}
            <div
              className="absolute top-12 left-8 w-48 h-48 bg-error/30 border-2 border-error rounded-lg"
              style={{ zIndex: zIndexes.parentA }}
            >
              <div className="p-2 text-xs font-semibold text-error flex items-center justify-between">
                <span>Parent A (z-index: {zIndexes.parentA})</span>
                <input
                  type="number"
                  value={zIndexes.parentA}
                  onChange={(e) => updateZ('parentA', parseInt(e.target.value) || 0)}
                  className="input input-xs w-14 text-center"
                  min="0"
                  max="10"
                />
              </div>

              {/* Child of A */}
              <div
                className="absolute top-12 left-12 w-28 h-28 bg-error text-error-content rounded-lg p-3 shadow-lg"
                style={{ zIndex: zIndexes.childA }}
              >
                <div className="font-semibold text-sm mb-1">Child A</div>
                <div className="flex items-center gap-1 text-xs">
                  <span>z:</span>
                  <input
                    type="number"
                    value={zIndexes.childA}
                    onChange={(e) => updateZ('childA', parseInt(e.target.value) || 0)}
                    className="input input-xs w-16 text-center bg-error-content/20"
                    min="0"
                    max="9999"
                  />
                </div>
              </div>
            </div>

            {/* Parent B - creates stacking context */}
            <div
              className="absolute top-24 left-32 w-48 h-48 bg-success/30 border-2 border-success rounded-lg"
              style={{ zIndex: zIndexes.parentB }}
            >
              <div className="p-2 text-xs font-semibold text-success flex items-center justify-between">
                <span>Parent B (z-index: {zIndexes.parentB})</span>
                <input
                  type="number"
                  value={zIndexes.parentB}
                  onChange={(e) => updateZ('parentB', parseInt(e.target.value) || 0)}
                  className="input input-xs w-14 text-center"
                  min="0"
                  max="10"
                />
              </div>

              {/* Child of B */}
              <div
                className="absolute top-12 left-12 w-28 h-28 bg-success text-success-content rounded-lg p-3 shadow-lg"
                style={{ zIndex: zIndexes.childB }}
              >
                <div className="font-semibold text-sm mb-1">Child B</div>
                <div className="flex items-center gap-1 text-xs">
                  <span>z:</span>
                  <input
                    type="number"
                    value={zIndexes.childB}
                    onChange={(e) => updateZ('childB', parseInt(e.target.value) || 0)}
                    className="input input-xs w-16 text-center bg-success-content/20"
                    min="0"
                    max="9999"
                  />
                </div>
              </div>
            </div>

            {/* Result explanation */}
            <div className="absolute bottom-4 left-4 right-4 bg-base-100/90 rounded-lg p-3 text-sm">
              <div className="flex items-start gap-2">
                <HiOutlineExclamation className="text-warning shrink-0 mt-0.5" size={18} />
                <div>
                  {zIndexes.parentA < zIndexes.parentB ? (
                    <>
                      <strong>Child A (z-index: {zIndexes.childA})</strong> is BEHIND Child B
                      (z-index: {zIndexes.childB}) because <strong>Parent A</strong> (z-index:{' '}
                      {zIndexes.parentA}) is behind <strong>Parent B</strong> (z-index:{' '}
                      {zIndexes.parentB}).
                      <span className="text-warning">
                        {' '}
                        No amount of z-index on Child A can fix this!
                      </span>
                    </>
                  ) : (
                    <>
                      Now <strong>Parent A</strong> (z-index: {zIndexes.parentA}) is in front of{' '}
                      <strong>Parent B</strong> (z-index: {zIndexes.parentB}), so{' '}
                      <strong>Child A</strong> appears on top regardless of its z-index value.
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* What Creates Stacking Contexts */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4">What Creates a Stacking Context?</h4>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-primary badge-sm">Common</span>
            </div>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                • <code>position: absolute/relative</code> + <code>z-index</code>
              </li>
              <li>
                • <code>position: fixed</code>
              </li>
              <li>
                • <code>position: sticky</code>
              </li>
              <li>
                • <code>opacity</code> less than 1
              </li>
              <li>
                • <code>transform</code> (any value)
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="badge badge-secondary badge-sm">Less Common</span>
            </div>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                • <code>filter</code> (any value)
              </li>
              <li>
                • <code>backdrop-filter</code>
              </li>
              <li>
                • <code>isolation: isolate</code>
              </li>
              <li>
                • <code>will-change</code>
              </li>
              <li>
                • <code>contain: layout/paint</code>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Debugging Tip */}
      <div className="alert alert-success">
        <div>
          <h4 className="font-bold">Debugging z-index Issues</h4>
          <p className="text-sm mt-1">
            When z-index "isn't working," look for ancestors with{' '}
            <code className="bg-success-content/20 px-1 rounded">position</code>,{' '}
            <code className="bg-success-content/20 px-1 rounded">opacity</code>,{' '}
            <code className="bg-success-content/20 px-1 rounded">transform</code>, or{' '}
            <code className="bg-success-content/20 px-1 rounded">filter</code>. One of these is
            likely creating a stacking context that traps your element!
          </p>
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet title="Stacking Context Example" language="css" code={stackingContextCode} />
    </div>
  );
}

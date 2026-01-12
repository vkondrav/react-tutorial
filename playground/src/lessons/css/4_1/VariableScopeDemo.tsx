import { useState } from 'react';
import { CodeSnippet } from '@components';
import variableScopeCode from './examples/VariableScope.css?raw';

type ScopeType = 'global' | 'local' | 'override' | 'fallback';

const scopeExplanations: Record<ScopeType, { title: string; description: string }> = {
  global: {
    title: 'Global Scope (:root)',
    description: 'Variables on :root are available to ALL elements in the document.',
  },
  local: {
    title: 'Local Scope',
    description: 'Variables on a selector are only available to that element and its children.',
  },
  override: {
    title: 'Override in Child',
    description: 'Child elements can redefine variables without affecting parents or siblings.',
  },
  fallback: {
    title: 'Fallback Values',
    description: 'var(--name, fallback) uses the fallback if the variable is undefined.',
  },
};

export default function VariableScopeDemo(): React.ReactElement {
  const [scopeType, setScopeType] = useState<ScopeType>('global');
  const [primaryColor, setPrimaryColor] = useState('#3b82f6');
  const [cardOverride, setCardOverride] = useState(false);

  const rootStyle = {
    '--demo-primary': primaryColor,
    '--demo-secondary': '#8b5cf6',
    '--demo-spacing': '1rem',
  } as React.CSSProperties;

  const cardStyle = cardOverride
    ? ({
        '--demo-primary': '#10b981',
        '--demo-secondary': '#14b8a6',
      } as React.CSSProperties)
    : {};

  return (
    <div className="card bg-base-200 p-6 border border-base-300">
      {/* Scope Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Object.keys(scopeExplanations) as ScopeType[]).map((type) => (
          <button
            key={type}
            onClick={() => setScopeType(type)}
            className={`btn btn-sm ${scopeType === type ? 'btn-primary' : 'btn-ghost'}`}
          >
            {scopeExplanations[type].title}
          </button>
        ))}
      </div>

      {/* Explanation */}
      <div className="bg-base-300 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-primary mb-1">{scopeExplanations[scopeType].title}</h4>
        <p className="text-sm text-base-content/70">{scopeExplanations[scopeType].description}</p>
      </div>

      {/* Interactive Demo */}
      <div className="space-y-6" style={rootStyle}>
        {/* Global Scope Demo */}
        {scopeType === 'global' && (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">--demo-primary:</label>
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded cursor-pointer"
              />
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-xs bg-base-300 px-2 py-1 rounded">{primaryColor}</code>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div
                className="p-4 rounded-lg text-center text-white font-medium"
                style={{ background: 'var(--demo-primary)' }}
              >
                Button
              </div>
              <div
                className="p-4 rounded-lg text-center text-white font-medium"
                style={{ background: 'var(--demo-secondary)' }}
              >
                Badge
              </div>
              <div
                className="p-4 rounded-lg text-center"
                style={{
                  background: 'var(--demo-primary)',
                  opacity: 0.2,
                  color: 'var(--demo-primary)',
                }}
              >
                <span style={{ opacity: 1 }}>Ghost</span>
              </div>
            </div>
            <p className="text-xs text-base-content/60">
              All elements share the same --demo-primary variable from :root
            </p>
          </div>
        )}

        {/* Local Scope Demo */}
        {scopeType === 'local' && (
          <div className="grid grid-cols-2 gap-4">
            <div
              className="p-4 rounded-lg border-2"
              style={
                {
                  '--local-bg': '#1e293b',
                  '--local-text': '#f1f5f9',
                  background: 'var(--local-bg)',
                  color: 'var(--local-text)',
                  borderColor: 'var(--demo-primary)',
                } as React.CSSProperties
              }
            >
              <h5 className="font-semibold mb-2">Card A</h5>
              <p className="text-sm opacity-70">Has --local-bg and --local-text</p>
              <div
                className="mt-3 p-2 rounded text-center text-sm"
                style={{ background: 'var(--demo-primary)' }}
              >
                Uses parent's --demo-primary
              </div>
            </div>
            <div
              className="p-4 rounded-lg border-2"
              style={
                {
                  '--local-bg': '#312e81',
                  '--local-text': '#c7d2fe',
                  background: 'var(--local-bg)',
                  color: 'var(--local-text)',
                  borderColor: 'var(--demo-secondary)',
                } as React.CSSProperties
              }
            >
              <h5 className="font-semibold mb-2">Card B</h5>
              <p className="text-sm opacity-70">Different --local-bg and --local-text</p>
              <div
                className="mt-3 p-2 rounded text-center text-sm"
                style={{ background: 'var(--demo-secondary)' }}
              >
                Uses parent's --demo-secondary
              </div>
            </div>
          </div>
        )}

        {/* Override Demo */}
        {scopeType === 'override' && (
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={cardOverride}
                onChange={(e) => setCardOverride(e.target.checked)}
                className="checkbox checkbox-primary"
              />
              <span className="text-sm">Override --demo-primary in card</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 rounded-lg"
                style={{
                  background: 'var(--demo-primary)',
                  color: 'white',
                  ...cardStyle,
                }}
              >
                <h5 className="font-semibold mb-2">Card (Child)</h5>
                <p className="text-sm opacity-80">
                  {cardOverride ? 'Overrides --demo-primary to green' : 'Inherits --demo-primary'}
                </p>
              </div>
              <div
                className="p-4 rounded-lg"
                style={{ background: 'var(--demo-primary)', color: 'white' }}
              >
                <h5 className="font-semibold mb-2">Sibling</h5>
                <p className="text-sm opacity-80">Still uses original --demo-primary</p>
              </div>
            </div>
            <p className="text-xs text-base-content/60">
              Overriding a variable only affects that element and its children
            </p>
          </div>
        )}

        {/* Fallback Demo */}
        {scopeType === 'fallback' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div
                className="p-4 rounded-lg text-white"
                style={
                  {
                    background: 'var(--undefined-color, #ef4444)',
                  } as React.CSSProperties
                }
              >
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="text-xs block mb-2">var(--undefined-color, #ef4444)</code>
                <p className="text-sm">Uses fallback (red) because variable doesn't exist</p>
              </div>
              <div
                className="p-4 rounded-lg text-white"
                style={{
                  background: 'var(--demo-primary, #ef4444)',
                }}
              >
                {/* eslint-disable-next-line local/no-raw-code-element */}
                <code className="text-xs block mb-2">var(--demo-primary, #ef4444)</code>
                <p className="text-sm">Uses --demo-primary because it exists</p>
              </div>
            </div>
            <div
              className="p-4 rounded-lg text-white"
              style={
                {
                  background: 'var(--missing, var(--also-missing, var(--demo-secondary)))',
                } as React.CSSProperties
              }
            >
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-xs block mb-2">
                var(--missing, var(--also-missing, var(--demo-secondary)))
              </code>
              <p className="text-sm">Nested fallbacks: tries each until one exists</p>
            </div>
          </div>
        )}
      </div>

      {/* Code Example */}
      <div className="mt-6">
        <CodeSnippet title="Variable Scope" language="css" code={variableScopeCode} />
      </div>
    </div>
  );
}

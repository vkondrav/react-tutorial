// ============================================
// ImportantDemo - !important behavior and dangers
// ============================================

import { useState } from 'react';
import { HiOutlineExclamationCircle, HiOutlineCheckCircle, HiOutlineXCircle } from 'react-icons/hi';

interface Scenario {
  id: string;
  name: string;
  rules: Array<{
    selector: string;
    property: string;
    value: string;
    important: boolean;
    source: 'author' | 'user';
  }>;
  winner: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: 'basic',
    name: 'Basic Override',
    rules: [
      { selector: '.btn', property: 'color', value: 'blue', important: false, source: 'author' },
      { selector: '.btn', property: 'color', value: 'red', important: true, source: 'author' },
    ],
    winner: 1,
    explanation: '!important always wins over normal declarations, regardless of specificity.',
  },
  {
    id: 'specificity',
    name: '!important vs High Specificity',
    rules: [
      {
        selector: '#nav .btn.active',
        property: 'color',
        value: 'green',
        important: false,
        source: 'author',
      },
      { selector: '.btn', property: 'color', value: 'red', important: true, source: 'author' },
    ],
    winner: 1,
    explanation: 'Even the highest specificity (0,1,2,0) loses to !important on a simple class.',
  },
  {
    id: 'important-war',
    name: '!important vs !important',
    rules: [
      { selector: '.btn', property: 'color', value: 'blue', important: true, source: 'author' },
      {
        selector: '#main .btn',
        property: 'color',
        value: 'red',
        important: true,
        source: 'author',
      },
    ],
    winner: 1,
    explanation: 'When both use !important, normal specificity rules apply again. ID wins.',
  },
  {
    id: 'user-wins',
    name: 'User !important (Accessibility)',
    rules: [
      { selector: 'body', property: 'font-size', value: '14px', important: true, source: 'author' },
      { selector: '*', property: 'font-size', value: '20px', important: true, source: 'user' },
    ],
    winner: 1,
    explanation:
      'User !important beats Author !important! This ensures accessibility settings are respected.',
  },
];

const GOOD_USES = [
  'Utility classes that must always apply (e.g., .hidden { display: none !important; })',
  'Overriding third-party library styles you cannot modify',
  'Print stylesheets for critical print-specific styles',
  'Accessibility overrides in user stylesheets',
];

const BAD_USES = [
  'Fixing specificity issues (fix the selectors instead)',
  'Overriding your own CSS (refactor your architecture)',
  'Making styles "stick" (indicates structural problems)',
  'Every other rule (leads to !important everywhere)',
];

export default function ImportantDemo(): React.ReactElement {
  const [activeScenario, setActiveScenario] = useState<string>('basic');

  const scenario = SCENARIOS.find((s) => s.id === activeScenario);

  return (
    <div className="space-y-6">
      {/* Scenario Tabs */}
      <div className="tabs tabs-boxed bg-base-200 p-1">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            className={`tab flex-1 ${activeScenario === s.id ? 'tab-active' : ''}`}
            onClick={() => setActiveScenario(s.id)}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Scenario Visualization */}
      {scenario && (
        <div className="space-y-4">
          <div className="space-y-3">
            {scenario.rules.map((rule, index) => {
              const isWinner = index === scenario.winner;
              return (
                <div
                  key={index}
                  className={`bg-base-200 rounded-lg p-4 font-mono text-sm transition-all ${
                    isWinner ? 'ring-2 ring-success' : ''
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      {isWinner && <span className="badge badge-success">WINS</span>}
                      <span className="text-base-content/50">
                        {rule.source === 'user' ? '/* User */' : '/* Author */'}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="text-info">{rule.selector}</span>
                    <span className="text-base-content/50"> {'{'} </span>
                    <span className="text-accent">{rule.property}</span>
                    <span className="text-base-content/50">: </span>
                    <span className="text-success">{rule.value}</span>
                    {rule.important && <span className="text-error font-bold"> !important</span>}
                    <span className="text-base-content/50">; {'}'}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-primary/10 border border-primary/30 rounded-lg p-4">
            <p className="text-sm">{scenario.explanation}</p>
          </div>
        </div>
      )}

      {/* Priority Visualization */}
      <div className="bg-base-200 rounded-xl p-6">
        <h4 className="font-semibold mb-4 text-center text-sm text-base-content/70">
          Complete Priority Order (highest to lowest):
        </h4>
        <div className="flex flex-col items-center gap-2 text-sm">
          <div className="badge badge-lg badge-error gap-2">
            <span className="font-bold">1.</span> User !important
          </div>
          <span className="text-base-content/30">↓</span>
          <div className="badge badge-lg badge-warning gap-2">
            <span className="font-bold">2.</span> Author !important
          </div>
          <span className="text-base-content/30">↓</span>
          <div className="badge badge-lg badge-info gap-2">
            <span className="font-bold">3.</span> Author normal (by specificity)
          </div>
          <span className="text-base-content/30">↓</span>
          <div className="badge badge-lg badge-success gap-2">
            <span className="font-bold">4.</span> User normal
          </div>
          <span className="text-base-content/30">↓</span>
          <div className="badge badge-lg gap-2">
            <span className="font-bold">5.</span> User Agent (browser)
          </div>
        </div>
      </div>

      {/* Good vs Bad Uses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-success/10 border border-success/30 rounded-lg p-4">
          <h4 className="font-semibold text-success flex items-center gap-2 mb-3">
            <HiOutlineCheckCircle size={20} />
            Acceptable Uses
          </h4>
          <ul className="space-y-2 text-sm">
            {GOOD_USES.map((use, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-success mt-1">✓</span>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-error/10 border border-error/30 rounded-lg p-4">
          <h4 className="font-semibold text-error flex items-center gap-2 mb-3">
            <HiOutlineXCircle size={20} />
            Code Smells
          </h4>
          <ul className="space-y-2 text-sm">
            {BAD_USES.map((use, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-error mt-1">✗</span>
                <span>{use}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-error/10 border border-error/30 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <HiOutlineExclamationCircle className="text-error shrink-0 mt-0.5" size={20} />
          <div>
            <p className="text-sm font-semibold text-error">The Specificity Wars Problem</p>
            <p className="text-sm text-base-content/70 mt-1">
              {/* eslint-disable-next-line local/no-raw-code-element */}
              When you use <code className="text-error">!important</code> to fix a styling issue,
              the <em>only</em> way to override it later is with another{' '}
              {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-error">!important</code> and higher specificity. This creates an
              escalating war that makes CSS unmaintainable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

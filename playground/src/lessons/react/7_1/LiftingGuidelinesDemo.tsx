// ============================================
// Lifting Guidelines Demo - When to Lift
// ============================================

import { useState } from 'react';
import {
  HiCheck,
  HiX,
  HiOutlineLightBulb,
  HiOutlineArrowUp,
  HiOutlineCollection,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

// ============================================
// Decision Tree
// ============================================

interface DecisionNode {
  question: string;
  yes: string | DecisionNode;
  no: string | DecisionNode;
}

const decisionTree: DecisionNode = {
  question: 'Do multiple components need to share this state?',
  no: 'Keep state local — no need to lift!',
  yes: {
    question: 'Are these components siblings (same parent)?',
    yes: 'Lift state to the parent component',
    no: {
      question: 'Are they deeply nested (3+ levels)?',
      yes: 'Consider Context or state management library',
      no: 'Lift to the closest common ancestor',
    },
  },
};

function DecisionTreeDemo() {
  const [path, setPath] = useState<('yes' | 'no')[]>([]);

  const getCurrentNode = (): DecisionNode | string => {
    let node: DecisionNode | string = decisionTree;
    for (const choice of path) {
      if (typeof node === 'string') return node;
      node = node[choice];
    }
    return node;
  };

  const currentNode = getCurrentNode();
  const isResult = typeof currentNode === 'string';

  const handleChoice = (choice: 'yes' | 'no') => {
    setPath([...path, choice]);
  };

  const reset = () => setPath([]);

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Should I Lift This State?
      </h4>

      <div className="space-y-4">
        {isResult ? (
          <div className="card bg-success/20 border-2 border-success p-4">
            <div className="flex items-center gap-2 text-success font-bold mb-2">
              <HiCheck size={20} />
              Recommendation
            </div>
            <p className="text-lg">{currentNode}</p>
          </div>
        ) : (
          <div className="card bg-base-300 p-4">
            <p className="text-lg font-semibold mb-4">{currentNode.question}</p>
            <div className="flex gap-3">
              <button onClick={() => handleChoice('yes')} className="btn btn-success flex-1">
                <HiCheck size={20} />
                Yes
              </button>
              <button onClick={() => handleChoice('no')} className="btn btn-error flex-1">
                <HiX size={20} />
                No
              </button>
            </div>
          </div>
        )}

        {path.length > 0 && (
          <button onClick={reset} className="btn btn-ghost btn-sm">
            ← Start Over
          </button>
        )}
      </div>
    </div>
  );
}

// ============================================
// Comparison Table
// ============================================

interface ComparisonItem {
  scenario: string;
  solution: 'local' | 'lift' | 'context';
  reason: string;
}

const comparisons: ComparisonItem[] = [
  {
    scenario: 'Form input validation (single field)',
    solution: 'local',
    reason: "Only that input needs to know if it's valid",
  },
  {
    scenario: 'Modal open/close state',
    solution: 'local',
    reason: 'Only the modal and its trigger need this',
  },
  {
    scenario: 'Search filters affecting a list',
    solution: 'lift',
    reason: 'Filter controls and list both need the filter state',
  },
  {
    scenario: 'Selected item in a list',
    solution: 'lift',
    reason: 'List and detail view need to know selection',
  },
  {
    scenario: 'User authentication status',
    solution: 'context',
    reason: 'Many components across the app need this',
  },
  {
    scenario: 'Theme preference (dark/light)',
    solution: 'context',
    reason: 'Global setting used everywhere',
  },
];

function ComparisonTable() {
  const getSolutionBadge = (solution: string) => {
    const styles = {
      local: 'badge-info',
      lift: 'badge-warning',
      context: 'badge-secondary',
    };
    const labels = {
      local: 'Keep Local',
      lift: 'Lift Up',
      context: 'Use Context',
    };
    return (
      <span className={`badge ${styles[solution as keyof typeof styles]}`}>
        {labels[solution as keyof typeof labels]}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Scenario</th>
            <th>Solution</th>
            <th>Why?</th>
          </tr>
        </thead>
        <tbody>
          {comparisons.map((item, i) => (
            <tr key={i}>
              <td className="font-medium">{item.scenario}</td>
              <td>{getSolutionBadge(item.solution)}</td>
              <td className="text-base-content/70 text-sm">{item.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ============================================
// Anti-Patterns
// ============================================

interface AntiPattern {
  name: string;
  problem: string;
  solution: string;
}

const antiPatterns: AntiPattern[] = [
  {
    name: 'Lifting Everything',
    problem: 'Putting all state in the root component creates prop drilling nightmare',
    solution: 'Only lift state that truly needs to be shared',
  },
  {
    name: 'Lifting Too Early',
    problem: 'Premature optimization — lifting state "just in case"',
    solution: 'Start local, lift when you need to share',
  },
  {
    name: 'Duplicating State',
    problem: 'Copying lifted state back into children (two sources of truth)',
    solution: 'Children should only receive props, not duplicate the state',
  },
];

function AntiPatternsDemo() {
  const [activePattern, setActivePattern] = useState(0);

  return (
    <div className="card bg-base-200 p-6">
      <h4 className="font-bold mb-4 flex items-center gap-2">
        <HiOutlineExclamationCircle className="text-error" size={20} />
        Common Mistakes to Avoid
      </h4>

      <div className="flex flex-wrap gap-2 mb-4">
        {antiPatterns.map((pattern, i) => (
          <button
            key={i}
            onClick={() => setActivePattern(i)}
            className={`btn btn-sm ${activePattern === i ? 'btn-error' : 'btn-ghost'}`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div className="card bg-error/20 p-3">
          <div className="flex items-center gap-2 text-error text-sm font-semibold mb-1">
            <HiX size={16} />
            Problem
          </div>
          <p>{antiPatterns[activePattern].problem}</p>
        </div>
        <div className="card bg-success/20 p-3">
          <div className="flex items-center gap-2 text-success text-sm font-semibold mb-1">
            <HiCheck size={16} />
            Solution
          </div>
          <p>{antiPatterns[activePattern].solution}</p>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Quick Reference
// ============================================

function QuickReference() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="card bg-info/20 border-2 border-info p-4">
        <h5 className="font-bold text-info mb-2 flex items-center gap-2">
          <HiOutlineCollection size={18} />
          Keep Local
        </h5>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>• UI state (open/close)</li>
          <li>• Form input values</li>
          <li>• Animation state</li>
          <li>• Temporary values</li>
        </ul>
      </div>

      <div className="card bg-warning/20 border-2 border-warning p-4">
        <h5 className="font-bold text-warning mb-2 flex items-center gap-2">
          <HiOutlineArrowUp size={18} />
          Lift State
        </h5>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>• Sibling sync needed</li>
          <li>• Parent needs value</li>
          <li>• Shared selection</li>
          <li>• Coordinated updates</li>
        </ul>
      </div>

      <div className="card bg-secondary/20 border-2 border-secondary p-4">
        <h5 className="font-bold text-secondary mb-2 flex items-center gap-2">
          <HiOutlineCollection size={18} />
          Use Context
        </h5>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>• Deep prop drilling</li>
          <li>• Global settings</li>
          <li>• Auth/user data</li>
          <li>• Theme preferences</li>
        </ul>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function LiftingGuidelinesDemo(): React.ReactElement {
  return (
    <div className="space-y-6">
      {/* Decision Tree */}
      <DecisionTreeDemo />

      {/* Comparison Table */}
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4">Common Scenarios</h4>
        <ComparisonTable />
      </div>

      {/* Anti-Patterns */}
      <AntiPatternsDemo />

      {/* Quick Reference */}
      <QuickReference />
    </div>
  );
}

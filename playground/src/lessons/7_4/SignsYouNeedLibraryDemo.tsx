// ============================================
// Signs You Might Need an External Library Demo
// ============================================

import { useState } from 'react';
import {
  HiOutlineExclamationCircle,
  HiOutlineExclamation,
  HiOutlineRefresh,
  HiOutlineDatabase,
  HiOutlineClock,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineStar,
  HiCheck,
  HiX,
} from 'react-icons/hi';

interface PainPoint {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  symptoms: string[];
  builtInSolution: string | null;
  libraryBenefit: string;
  severity: 'low' | 'medium' | 'high';
}

const painPoints: PainPoint[] = [
  {
    id: 'prop-drilling',
    icon: <HiOutlineExclamationCircle size={24} />,
    title: 'Extreme Prop Drilling',
    description: 'Props passed through 5+ levels of components',
    symptoms: [
      'Every component in the tree receives props it just passes down',
      'Adding a new prop requires changes in 10+ files',
      'Component signatures have 15+ props',
    ],
    builtInSolution: 'useContext solves this — try it first!',
    libraryBenefit: 'Libraries offer more selective subscriptions',
    severity: 'low',
  },
  {
    id: 'context-hell',
    icon: <HiOutlineDatabase size={24} />,
    title: 'Context Provider Hell',
    description: '10+ nested context providers at app root',
    symptoms: [
      'App.tsx has a pyramid of <Provider> wrappers',
      'Hard to track which context provides what',
      'Adding new global state means another wrapper',
    ],
    builtInSolution: null,
    libraryBenefit: 'Single store replaces multiple contexts',
    severity: 'medium',
  },
  {
    id: 'performance',
    icon: <HiOutlineRefresh size={24} />,
    title: 'Performance Issues from Context',
    description: 'Entire subtrees re-render on any state change',
    symptoms: [
      'React DevTools shows unnecessary re-renders',
      'UI feels sluggish when updating global state',
      'memo() everywhere but still slow',
    ],
    builtInSolution: 'Split into separate state/dispatch contexts',
    libraryBenefit: 'Selector functions prevent unwanted re-renders',
    severity: 'medium',
  },
  {
    id: 'server-state',
    icon: <HiOutlineClock size={24} />,
    title: 'Server State Complexity',
    description: 'Caching, refetching, optimistic updates, pagination',
    symptoms: [
      'Writing useEffect + useState for every API call',
      'Stale data when navigating back to a page',
      'No automatic retry on failure',
      'Manual cache invalidation',
    ],
    builtInSolution: null,
    libraryBenefit: 'TanStack Query handles all of this automatically',
    severity: 'high',
  },
  {
    id: 'debugging',
    icon: <HiOutlineChartBar size={24} />,
    title: 'Need for Time-Travel Debugging',
    description: 'Complex state flows that are hard to trace',
    symptoms: [
      'Bug reports are hard to reproduce',
      'State changes happen from many sources',
      'Need to see action history and state snapshots',
    ],
    builtInSolution: null,
    libraryBenefit: 'Redux DevTools provides full state history',
    severity: 'medium',
  },
  {
    id: 'team-scale',
    icon: <HiOutlineUserGroup size={24} />,
    title: 'Large Team Coordination',
    description: 'Multiple teams working on shared state',
    symptoms: [
      'Merge conflicts in state management code',
      'Inconsistent patterns across the codebase',
      'Need strict conventions and code splitting',
    ],
    builtInSolution: null,
    libraryBenefit: 'Redux Toolkit enforces patterns & enables code splitting',
    severity: 'high',
  },
];

const severityColors = {
  low: 'badge-success',
  medium: 'badge-warning',
  high: 'badge-error',
};

const severityLabels = {
  low: 'Try built-in first',
  medium: 'Consider library',
  high: 'Library recommended',
};

export default function SignsYouNeedLibraryDemo(): React.ReactElement {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {/* Pain Points List */}
      <div className="space-y-3">
        {painPoints.map((point) => (
          <div
            key={point.id}
            className={`card bg-base-200 overflow-hidden transition-all duration-200 ${
              expandedId === point.id ? 'ring-2 ring-primary/30' : ''
            }`}
          >
            {/* Header - Always visible */}
            <button
              onClick={() => toggleExpand(point.id)}
              className="w-full p-4 flex items-center gap-4 text-left hover:bg-base-300/50 transition-colors"
            >
              <div className="text-warning shrink-0">{point.icon}</div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-base-content">{point.title}</h4>
                <p className="text-sm text-base-content/60 truncate">{point.description}</p>
              </div>
              <span className={`badge ${severityColors[point.severity]} shrink-0`}>
                {severityLabels[point.severity]}
              </span>
            </button>

            {/* Expanded Content */}
            {expandedId === point.id && (
              <div className="px-4 pb-4 pt-0 border-t border-base-300">
                {/* Symptoms */}
                <div className="mt-4 mb-4">
                  <h5 className="text-sm font-medium text-base-content/80 mb-2">Warning Signs:</h5>
                  <ul className="space-y-1">
                    {point.symptoms.map((symptom, idx) => (
                      <li key={idx} className="text-sm text-base-content/60 flex items-start gap-2">
                        <span className="text-warning mt-0.5">•</span>
                        {symptom}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions */}
                <div className="grid gap-3 md:grid-cols-2">
                  {/* Built-in solution */}
                  <div
                    className={`rounded-lg p-3 ${
                      point.builtInSolution
                        ? 'bg-success/10 border border-success/20'
                        : 'bg-base-300/50 border border-base-300'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {point.builtInSolution ? (
                        <HiCheck className="text-success" />
                      ) : (
                        <HiX className="text-base-content/40" />
                      )}
                      <span className="text-sm font-medium">Built-in Solution</span>
                    </div>
                    <p className="text-xs text-base-content/60">
                      {point.builtInSolution || 'No built-in solution covers this well'}
                    </p>
                  </div>

                  {/* Library benefit */}
                  <div className="rounded-lg p-3 bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 mb-1">
                      <HiCheck className="text-primary" />
                      <span className="text-sm font-medium">Library Benefit</span>
                    </div>
                    <p className="text-xs text-base-content/60">{point.libraryBenefit}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="card bg-base-300 p-4 mt-6">
        <h4 className="font-medium text-base-content mb-3">The Bottom Line</h4>
        <div className="grid gap-3 md:grid-cols-3 text-sm">
          <div className="flex items-start gap-2">
            <span className="badge badge-success badge-sm mt-0.5">
              <HiCheck size={12} />
            </span>
            <div>
              <p className="font-medium text-success">Green: Built-in works</p>
              <p className="text-base-content/60 text-xs">Context + Reducer handles it</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="badge badge-warning badge-sm mt-0.5">
              <HiOutlineExclamation size={12} />
            </span>
            <div>
              <p className="font-medium text-warning">Yellow: Evaluate</p>
              <p className="text-base-content/60 text-xs">Try built-in, switch if painful</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <span className="badge badge-error badge-sm mt-0.5">
              <HiOutlineStar size={12} />
            </span>
            <div>
              <p className="font-medium text-error">Red: Library helps</p>
              <p className="text-base-content/60 text-xs">These problems need libraries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

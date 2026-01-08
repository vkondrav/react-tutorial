// ============================================
// Popular State Libraries Overview Demo
// ============================================

import { useState } from 'react';
import { HiOutlineExternalLink, HiCheck, HiOutlineStar } from 'react-icons/hi';
import { CodeSnippet } from '@components';

// Code examples from separate files
import zustandExample from './examples/ZustandExample.tsx?raw';
import reduxToolkitExample from './examples/ReduxToolkitExample.tsx?raw';
import tanstackQueryExample from './examples/TanStackQueryExample.tsx?raw';
import jotaiExample from './examples/JotaiExample.tsx?raw';

interface Library {
  id: string;
  name: string;
  tagline: string;
  bundleSize: string;
  stars: string;
  learningCurve: 'Easy' | 'Medium' | 'Hard';
  bestFor: string[];
  tradeoffs: { pros: string[]; cons: string[] };
  codeExample: string;
  color: string;
  docs: string;
}

const libraries: Library[] = [
  {
    id: 'zustand',
    name: 'Zustand',
    tagline: 'Bear necessities for state management',
    bundleSize: '~1.1 kB',
    stars: '47k+',
    learningCurve: 'Easy',
    bestFor: ['Small-medium apps', 'Quick setup', 'Minimal boilerplate'],
    tradeoffs: {
      pros: [
        'Tiny bundle size',
        'No providers needed',
        'Works outside React',
        'TypeScript friendly',
      ],
      cons: ['Less structure for large teams', 'Fewer dev tools', 'No time-travel out of box'],
    },
    codeExample: zustandExample,
    color: 'text-amber-400',
    docs: 'https://zustand-demo.pmnd.rs/',
  },
  {
    id: 'redux-toolkit',
    name: 'Redux Toolkit',
    tagline: 'The official, opinionated Redux',
    bundleSize: '~11 kB',
    stars: '63k+ (Redux)',
    learningCurve: 'Medium',
    bestFor: ['Large apps', 'Team projects', 'Complex state logic'],
    tradeoffs: {
      pros: ['Excellent DevTools', 'Predictable patterns', 'Great documentation', 'Huge ecosystem'],
      cons: ['More boilerplate', 'Larger bundle', 'Steeper learning curve'],
    },
    codeExample: reduxToolkitExample,
    color: 'text-purple-400',
    docs: 'https://redux-toolkit.js.org/',
  },
  {
    id: 'tanstack-query',
    name: 'TanStack Query',
    tagline: 'Powerful async state management',
    bundleSize: '~13 kB',
    stars: '43k+',
    learningCurve: 'Medium',
    bestFor: ['Server state', 'API data caching', 'Real-time data'],
    tradeoffs: {
      pros: [
        'Auto caching',
        'Background refetch',
        'Optimistic updates',
        'Pagination/infinite scroll',
      ],
      cons: ['Not for client state', 'New mental model', 'Can over-fetch if misconfigured'],
    },
    codeExample: tanstackQueryExample,
    color: 'text-red-400',
    docs: 'https://tanstack.com/query/latest',
  },
  {
    id: 'jotai',
    name: 'Jotai',
    tagline: 'Primitive and flexible state for React',
    bundleSize: '~2.4 kB',
    stars: '18k+',
    learningCurve: 'Easy',
    bestFor: ['Atomic state', 'Fine-grained updates', 'Code splitting'],
    tradeoffs: {
      pros: [
        'Atomic model prevents unwanted re-renders',
        'No selectors needed',
        'Great TypeScript',
        'Suspense ready',
      ],
      cons: ['Less structure', 'Smaller ecosystem', 'Atoms can become scattered'],
    },
    codeExample: jotaiExample,
    color: 'text-gray-300',
    docs: 'https://jotai.org/',
  },
];

const learningCurveColors = {
  Easy: 'text-success',
  Medium: 'text-warning',
  Hard: 'text-error',
};

export default function LibraryOverviewDemo(): React.ReactElement {
  const [selectedLibrary, setSelectedLibrary] = useState<string>('zustand');
  const [showCode, setShowCode] = useState(false);

  const library = libraries.find((l) => l.id === selectedLibrary)!;

  return (
    <div className="space-y-6">
      {/* Library Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {libraries.map((lib) => (
          <button
            key={lib.id}
            onClick={() => {
              setSelectedLibrary(lib.id);
              setShowCode(false);
            }}
            className={`btn btn-sm ${selectedLibrary === lib.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            <span className={lib.color}>{lib.name}</span>
          </button>
        ))}
      </div>

      {/* Selected Library Details */}
      <div className="card bg-base-200 overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-base-300">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`text-xl font-bold ${library.color}`}>{library.name}</h3>
              <p className="text-base-content/60 text-sm">{library.tagline}</p>
            </div>
            <a
              href={library.docs}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-ghost"
            >
              Docs <HiOutlineExternalLink />
            </a>
          </div>

          {/* Quick Stats */}
          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base-content/50">Bundle:</span>
              <span className="font-mono text-primary">{library.bundleSize}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <HiOutlineStar className="text-yellow-400" />
              <span>{library.stars}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-base-content/50">Learning:</span>
              <span className={learningCurveColors[library.learningCurve]}>
                {library.learningCurve}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Best For */}
          <div className="mb-4">
            <h4 className="text-sm font-medium text-base-content/70 mb-2">Best For:</h4>
            <div className="flex flex-wrap gap-2">
              {library.bestFor.map((item, idx) => (
                <span key={idx} className="badge badge-outline">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-success/10 rounded-lg p-3 border border-success/20">
              <h5 className="text-sm font-medium text-success mb-2">Pros</h5>
              <ul className="space-y-1">
                {library.tradeoffs.pros.map((pro, idx) => (
                  <li key={idx} className="text-sm text-base-content/70 flex items-start gap-2">
                    <HiCheck className="text-success mt-0.5 shrink-0" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-error/10 rounded-lg p-3 border border-error/20">
              <h5 className="text-sm font-medium text-error mb-2">Cons</h5>
              <ul className="space-y-1">
                {library.tradeoffs.cons.map((con, idx) => (
                  <li key={idx} className="text-sm text-base-content/70 flex items-start gap-2">
                    <span className="text-error mt-0.5 shrink-0">•</span>
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Code Example Toggle */}
          <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline w-full">
            {showCode ? 'Hide Code Example' : 'Show Code Example'}
          </button>

          {showCode && (
            <div className="mt-4">
              <CodeSnippet
                code={library.codeExample}
                language="tsx"
                title={`${library.name} Example`}
              />
            </div>
          )}
        </div>
      </div>

      {/* Comparison Summary */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-medium text-base-content mb-3">Quick Comparison</h4>
        <div className="overflow-x-auto">
          <table className="table table-sm table-zebra">
            <thead>
              <tr>
                <th>Library</th>
                <th>Size</th>
                <th>Learning</th>
                <th>Best Use Case</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-amber-400 font-medium">Zustand</td>
                <td className="font-mono text-xs">~1 kB</td>
                <td className="text-success">Easy</td>
                <td className="text-sm">Quick global state, minimal setup</td>
              </tr>
              <tr>
                <td className="text-purple-400 font-medium">Redux Toolkit</td>
                <td className="font-mono text-xs">~11 kB</td>
                <td className="text-warning">Medium</td>
                <td className="text-sm">Large teams, complex apps, DevTools</td>
              </tr>
              <tr>
                <td className="text-red-400 font-medium">TanStack Query</td>
                <td className="font-mono text-xs">~13 kB</td>
                <td className="text-warning">Medium</td>
                <td className="text-sm">Server state, caching, async data</td>
              </tr>
              <tr>
                <td className="text-gray-300 font-medium">Jotai</td>
                <td className="font-mono text-xs">~2 kB</td>
                <td className="text-success">Easy</td>
                <td className="text-sm">Atomic state, fine-grained updates</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Important Note */}
      <div className="card bg-info/10 border border-info/20 p-4">
        <p className="text-sm text-base-content/80">
          <strong className="text-info">Note:</strong> TanStack Query is not a replacement for
          client state management. It handles <em>server state</em> (data from APIs). You might use
          it <em>alongside</em> Zustand or Context for client state.
        </p>
      </div>
    </div>
  );
}

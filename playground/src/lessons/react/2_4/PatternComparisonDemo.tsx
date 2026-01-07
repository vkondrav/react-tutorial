// ============================================
// PatternComparisonDemo - Compare Different Conditional Patterns
// ============================================

import { useState } from 'react';
import { HiOutlineRefresh, HiX, HiCheck, HiOutlineCube, HiOutlineInbox } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import patternTernary from './examples/PatternTernary.tsx?raw';
import patternLogicalAnd from './examples/PatternLogicalAnd.tsx?raw';
import patternEarlyReturn from './examples/PatternEarlyReturn.tsx?raw';
import patternVariable from './examples/PatternVariable.tsx?raw';

// ============================================
// Types
// ============================================

type PatternId = 'ternary' | 'and' | 'early' | 'variable';

interface Pattern {
  id: PatternId;
  name: string;
  color: string;
}

// ============================================
// Main Component
// ============================================

export default function PatternComparisonDemo(): React.ReactElement {
  const [selectedPattern, setSelectedPattern] = useState<PatternId>('ternary');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasData, setHasData] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  const patterns: Pattern[] = [
    { id: 'ternary', name: 'Ternary ?:', color: 'primary' },
    { id: 'and', name: 'Logical &&', color: 'success' },
    { id: 'early', name: 'Early Return', color: 'warning' },
    { id: 'variable', name: 'Variable', color: 'secondary' },
  ];

  const patternCodeMap: Record<PatternId, string> = {
    ternary: patternTernary,
    and: patternLogicalAnd,
    early: patternEarlyReturn,
    variable: patternVariable,
  };

  // Simulate loading
  const simulateLoad = (): void => {
    setIsLoading(true);
    setHasError(false);
    setTimeout(() => {
      setIsLoading(false);
      setHasData(true);
    }, 1500);
  };

  const currentPattern = patterns.find((p) => p.id === selectedPattern);

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Pattern Selector */}
      <div className="flex gap-2 flex-wrap mb-6">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setSelectedPattern(p.id)}
            className={`btn btn-sm ${selectedPattern === p.id ? `btn-${p.color}` : 'btn-outline'}`}
          >
            {p.name}
          </button>
        ))}
      </div>

      {/* State Controls */}
      <div className="flex gap-2 flex-wrap mb-6 p-4 card bg-base-300">
        <button onClick={simulateLoad} className="btn btn-primary btn-sm">
          <HiOutlineRefresh size={16} />
          Simulate Load
        </button>
        <button
          onClick={() => {
            setHasData(!hasData);
            setHasError(false);
          }}
          className={`btn btn-sm ${hasData ? 'btn-success' : 'btn-ghost'}`}
        >
          {hasData ? (
            <>
              <HiOutlineCube size={16} />
              Has Data
            </>
          ) : (
            <>
              <HiOutlineInbox size={16} />
              No Data
            </>
          )}
        </button>
        <button
          onClick={() => {
            setHasError(!hasError);
            setIsLoading(false);
          }}
          className={`btn btn-sm ${hasError ? 'btn-error' : 'btn-ghost'}`}
        >
          {hasError ? (
            <>
              <HiX size={16} />
              Error
            </>
          ) : (
            <>
              <HiCheck size={16} />
              No Error
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Code Panel */}
        <div className="card bg-base-300 p-4 overflow-auto">
          <div
            className={`text-xs font-semibold mb-3 uppercase ${
              currentPattern?.color === 'primary'
                ? 'text-primary'
                : currentPattern?.color === 'success'
                  ? 'text-success'
                  : currentPattern?.color === 'warning'
                    ? 'text-warning'
                    : 'text-secondary'
            }`}
          >
            Code Pattern
          </div>

          <CodeSnippet code={patternCodeMap[selectedPattern]} language="tsx" showCopy={false} />
        </div>

        {/* Preview Panel */}
        <div className="card bg-base-300 p-4">
          <div className="text-primary text-xs font-semibold mb-3 uppercase">Live Preview</div>

          <div className="min-h-[150px] flex items-center justify-center bg-base-200 rounded-lg p-4">
            {isLoading ? (
              <div className="text-center">
                <div className="loading loading-spinner loading-lg text-primary mb-3"></div>
                <div className="text-base-content/50">Loading...</div>
              </div>
            ) : hasError ? (
              <div className="text-center text-error">
                <div className="text-4xl mb-2">
                  <HiX size={48} />
                </div>
                <div className="font-semibold">Error Loading Data</div>
                <div className="text-sm text-base-content/70">Please try again</div>
              </div>
            ) : hasData ? (
              <div className="w-full">
                <div className="font-semibold mb-3 text-success flex items-center gap-2">
                  <HiOutlineCube size={18} />
                  Data Loaded!
                </div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-2 bg-base-300 rounded mb-1 text-sm">
                    Item {i}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-base-content/50">
                <div className="text-4xl mb-2">
                  <HiOutlineInbox size={48} />
                </div>
                <div>No data available</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pattern Tips */}
      <div className="mt-6 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
        <div className="card bg-base-300 p-4 border-t-4 border-primary">
          <div className="font-semibold mb-2 text-primary">Ternary ?:</div>
          <div className="text-sm text-base-content/70">
            Best for simple either/or. Avoid nesting more than 2 deep.
          </div>
        </div>

        <div className="card bg-base-300 p-4 border-t-4 border-success">
          <div className="font-semibold mb-2 text-success">Logical &&</div>
          <div className="text-sm text-base-content/70">
            Best for show/hide one thing. Watch out for 0 gotcha!
          </div>
        </div>

        <div className="card bg-base-300 p-4 border-t-4 border-warning">
          <div className="font-semibold mb-2 text-warning">Early Return</div>
          <div className="text-sm text-base-content/70">
            Best for multiple conditions. Keeps "happy path" clean.
          </div>
        </div>

        <div className="card bg-base-300 p-4 border-t-4 border-secondary">
          <div className="font-semibold mb-2 text-secondary">Variable</div>
          <div className="text-sm text-base-content/70">
            Best when logic is complex. Extract logic from JSX.
          </div>
        </div>
      </div>
    </div>
  );
}

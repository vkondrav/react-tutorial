// ============================================
// ComponentBasicsDemo - Component Syntax Variants
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import functionDeclaration from './examples/FunctionDeclaration.tsx?raw';
import arrowFunction from './examples/ArrowFunction.tsx?raw';
import arrowImplicit from './examples/ArrowImplicit.tsx?raw';

// ============================================
// Types
// ============================================

type SyntaxType = 'function' | 'arrow' | 'arrowImplicit';

interface SyntaxExample {
  label: string;
  code: string;
  description: string;
}

// ============================================
// Constants
// ============================================

const syntaxExamples: Record<SyntaxType, SyntaxExample> = {
  function: {
    label: 'Function Declaration',
    code: functionDeclaration,
    description: 'The classic way - clear and readable',
  },
  arrow: {
    label: 'Arrow Function',
    code: arrowFunction,
    description: 'Modern syntax - popular in the community',
  },
  arrowImplicit: {
    label: 'Arrow (Implicit Return)',
    code: arrowImplicit,
    description: 'Shortest syntax - great for simple components',
  },
};

// ============================================
// Main Component
// ============================================

export default function ComponentBasicsDemo(): React.ReactElement {
  const [syntax, setSyntax] = useState<SyntaxType>('function');

  const current = syntaxExamples[syntax];

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Syntax Tabs */}
      <div className="flex border-b border-base-300">
        {(Object.entries(syntaxExamples) as [SyntaxType, SyntaxExample][]).map(
          ([key, { label }]) => (
            <button
              key={key}
              onClick={() => setSyntax(key)}
              className={`flex-1 px-4 py-3 cursor-pointer text-sm transition-all ${
                syntax === key
                  ? 'bg-base-300 border-b-2 border-b-primary text-base-content font-semibold'
                  : 'bg-base-100 border-b-2 border-b-transparent text-base-content/70 font-normal hover:bg-base-200'
              }`}
            >
              {label}
            </button>
          )
        )}
      </div>

      {/* Code Display */}
      <div className="p-6">
        <CodeSnippet code={current.code} language="tsx" showCopy={false} />

        <p className="mt-4 mb-0 text-base-content/70 text-sm flex items-center gap-2">
          <HiOutlineLightBulb className="text-success" size={18} />
          {current.description}
        </p>
      </div>

      {/* Live Preview */}
      <div className="p-6 bg-base-300 border-t border-base-300">
        <div className="text-xs text-base-content/50 mb-3 uppercase tracking-wide">Preview</div>
        <div className="p-4 bg-base-200 rounded-lg border border-dashed border-base-300">
          {/* This IS the Greeting component rendered! */}
          <h1 className="m-0 text-2xl text-base-content">Hello, World!</h1>
        </div>
      </div>
    </div>
  );
}

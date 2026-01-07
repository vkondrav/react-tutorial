// ============================================
// TSXDemo - JSX vs TSX Comparison
// ============================================

import { useState } from 'react';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import jsxCode from './examples/JsxVsTsxCode.tsx?raw';
import tsxCode from './examples/TsxTypedCode.tsx?raw';

// ============================================
// Types
// ============================================

interface BenefitItem {
  title: string;
  description: string;
}

// ============================================
// Constants
// ============================================

const benefits: BenefitItem[] = [
  {
    title: 'Type Safety',
    description: 'Catch prop errors at compile time, not runtime',
  },
  {
    title: 'Better IDE Support',
    description: 'Autocomplete, refactoring, and inline docs',
  },
  {
    title: 'Self-Documenting',
    description: 'Interfaces describe what props a component expects',
  },
];

// ============================================
// Main Component
// ============================================

export default function TSXDemo(): React.ReactElement {
  const [showTyped, setShowTyped] = useState<boolean>(false);

  return (
    <div className="space-y-6">
      {/* Code Comparison */}
      <div className="grid grid-cols-2 gap-4">
        {/* JSX */}
        <div
          className={`card bg-base-200 overflow-hidden border-2 transition-opacity ${
            showTyped ? 'opacity-50 border-base-300' : 'border-primary/50'
          }`}
        >
          <div className="px-4 py-2 bg-base-300 border-b border-base-300 text-xs font-semibold text-base-content/70 flex items-center justify-between">
            <span>Greeting.jsx</span>
            <span className="badge badge-sm">JavaScript</span>
          </div>
          <CodeSnippet code={jsxCode} language="jsx" showCopy={false} />
        </div>

        {/* TSX */}
        <div
          className={`card bg-base-200 overflow-hidden border-2 transition-opacity ${
            showTyped ? 'border-success/50' : 'opacity-50 border-base-300'
          }`}
        >
          <div className="px-4 py-2 bg-base-300 border-b border-base-300 text-xs font-semibold text-base-content/70 flex items-center justify-between">
            <span>Greeting.tsx</span>
            <span className="badge badge-sm badge-success">TypeScript</span>
          </div>
          <CodeSnippet code={tsxCode} language="tsx" showCopy={false} />
        </div>
      </div>

      {/* Toggle */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowTyped(!showTyped)}
          className={`btn ${showTyped ? 'btn-success' : 'btn-primary'}`}
        >
          {showTyped ? 'Viewing: TSX (TypeScript)' : 'Viewing: JSX (JavaScript)'}
          <HiOutlineArrowRight size={16} />
        </button>
      </div>

      {/* Benefits */}
      <div className="grid grid-cols-3 gap-3">
        {benefits.map((benefit, i) => (
          <div key={i} className="card bg-base-200 p-4 border border-base-300">
            <div className="font-semibold text-success text-sm mb-1">{benefit.title}</div>
            <div className="text-base-content/70 text-xs">{benefit.description}</div>
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="alert bg-base-200 border border-base-300">
        <div>
          <div className="text-sm">
            <strong className="text-primary">Note:</strong> This course uses{' '}
            <code className="bg-base-300 px-1 rounded">.tsx</code> files. The JSX syntax is
            identical — TypeScript just adds optional type annotations!
          </div>
        </div>
      </div>
    </div>
  );
}

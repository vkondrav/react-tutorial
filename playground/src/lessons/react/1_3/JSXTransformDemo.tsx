// ============================================
// JSXTransformDemo - JSX to React.createElement
// ============================================

import { useState } from 'react';
import { HiCheck, HiOutlineArrowRight, HiOutlineCursorClick } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import jsxWriteCode from './examples/JsxWriteCode.tsx?raw';
import jsxTransformCode from './examples/JsxTransformCode.js?raw';

export default function JSXTransformDemo(): React.ReactElement {
  const [showTransform, setShowTransform] = useState<boolean>(false);

  return (
    <div>
      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-center">
        {/* What you write (JSX) */}
        <div className="card bg-base-200 overflow-hidden border-2 border-success/30">
          <div className="px-4 py-2 bg-success/20 border-b border-success/30 text-xs font-semibold text-success flex items-center gap-2">
            <HiCheck size={16} />
            What you write (JSX)
          </div>
          <CodeSnippet code={jsxWriteCode} language="tsx" showCopy={false} />
        </div>

        {/* Arrow button */}
        <button
          onClick={() => setShowTransform(!showTransform)}
          className={`btn btn-circle ${showTransform ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineArrowRight size={24} />
        </button>

        {/* What React sees */}
        <div
          className={`card bg-base-200 overflow-hidden border-2 border-warning/30 transition-opacity ${
            showTransform ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <div className="px-4 py-2 bg-warning/20 border-b border-warning/30 text-xs font-semibold text-warning">
            What React sees (JavaScript)
          </div>
          <CodeSnippet code={jsxTransformCode} language="javascript" showCopy={false} />
        </div>
      </div>

      <p className="text-base-content/50 text-sm mt-4 text-center flex items-center justify-center gap-2">
        <HiOutlineCursorClick size={16} />
        <span>Click the arrow to see the transformation</span>
      </p>
    </div>
  );
}

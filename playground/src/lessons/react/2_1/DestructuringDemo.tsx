// ============================================
// DestructuringDemo - Props Destructuring Comparison
// ============================================

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineExclamationCircle, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';

// ============================================
// Constants
// ============================================

const withoutDestructuringCode = `function UserProfile(props) {
  return (
    <div>
      <img src={props.avatar} />
      <h2>{props.name}</h2>
      <p>{props.bio}</p>
      <span>{props.role}</span>
    </div>
  );
}`;

const withDestructuringCode = `function UserProfile({ avatar, name, bio, role }) {
  return (
    <div>
      <img src={avatar} />
      <h2>{name}</h2>
      <p>{bio}</p>
      <span>{role}</span>
    </div>
  );
}`;

const equivalenceCode = `// These are equivalent:
function Comp(props) { ... props.name ... }
function Comp({ name }) { ... name ... }`;

// ============================================
// Main Component
// ============================================

export default function DestructuringDemo(): React.ReactElement {
  const [showDestructured, setShowDestructured] = useState<boolean>(false);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Toggle */}
      <div className="flex border-b border-base-300">
        <button
          onClick={() => setShowDestructured(false)}
          className={`flex-1 px-4 py-3 bg-transparent border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            !showDestructured
              ? 'bg-error/10 border-b-2 border-b-error text-error'
              : 'border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiX size={16} />
          Without Destructuring
        </button>
        <button
          onClick={() => setShowDestructured(true)}
          className={`flex-1 px-4 py-3 bg-transparent border-none cursor-pointer font-medium transition-colors flex items-center justify-center gap-2 ${
            showDestructured
              ? 'bg-success/10 border-b-2 border-b-success text-success'
              : 'border-b-2 border-b-transparent text-base-content/50'
          }`}
        >
          <HiCheck size={16} />
          With Destructuring
        </button>
      </div>

      {/* Code Display */}
      <div className="p-6">
        {!showDestructured ? (
          <>
            <div className="rounded-lg border-2 overflow-hidden border-error/30">
              <CodeSnippet code={withoutDestructuringCode} language="tsx" showCopy={false} />
            </div>
            <div className="mt-4 px-4 py-3 bg-error/10 rounded-lg text-error text-sm flex items-center gap-2">
              <HiOutlineExclamationCircle size={18} />
              Repetitive! You have to write <code className="bg-error/20 px-1 rounded">
                props.
              </code>{' '}
              every single time.
            </div>
          </>
        ) : (
          <>
            <div className="rounded-lg border-2 overflow-hidden border-success/30">
              <CodeSnippet code={withDestructuringCode} language="tsx" showCopy={false} />
            </div>
            <div className="mt-4 px-4 py-3 bg-success/10 rounded-lg text-success text-sm flex items-center gap-2">
              <HiOutlineLightBulb size={18} />
              Clean! Props are extracted right in the function parameters.
            </div>
          </>
        )}
      </div>

      {/* Comparison */}
      <div className="px-6 py-4 bg-base-300 border-t border-base-300">
        <div className="text-xs text-base-content/50 mb-2">DESTRUCTURING SYNTAX</div>
        <CodeSnippet code={equivalenceCode} language="tsx" showCopy={false} />
      </div>
    </div>
  );
}

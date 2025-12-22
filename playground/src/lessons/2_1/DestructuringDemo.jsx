import { useState } from 'react';

export default function DestructuringDemo() {
  const [showDestructured, setShowDestructured] = useState(false);

  return (
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Toggle */}
      <div className="flex border-b border-slate-700">
        <button
          onClick={() => setShowDestructured(false)}
          className={`flex-1 px-4 py-3 bg-transparent border-none cursor-pointer font-medium transition-colors ${
            !showDestructured
              ? 'bg-red-500/10 border-b-2 border-b-red-500 text-red-500'
              : 'border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          ❌ Without Destructuring
        </button>
        <button
          onClick={() => setShowDestructured(true)}
          className={`flex-1 px-4 py-3 bg-transparent border-none cursor-pointer font-medium transition-colors ${
            showDestructured
              ? 'bg-green-500/10 border-b-2 border-b-green-500 text-green-500'
              : 'border-b-2 border-b-transparent text-slate-500'
          }`}
        >
          ✅ With Destructuring
        </button>
      </div>

      {/* Code Display */}
      <div className="p-6">
        {!showDestructured ? (
          <>
            <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed border border-red-500/30">
              <code className="text-slate-200">
                {`function UserProfile(`}
                <span className="text-pink-500">props</span>
                {`) {
  return (
    <div>
      <img src={`}
                <span className="text-pink-500">props</span>
                <span className="text-slate-500">.avatar</span>
                {`} />
      <h2>{`}
                <span className="text-pink-500">props</span>
                <span className="text-slate-500">.name</span>
                {`}</h2>
      <p>{`}
                <span className="text-pink-500">props</span>
                <span className="text-slate-500">.bio</span>
                {`}</p>
      <span>{`}
                <span className="text-pink-500">props</span>
                <span className="text-slate-500">.role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
            <div className="mt-4 px-4 py-3 bg-red-500/10 rounded-lg text-red-500 text-sm">
              ⚠️ Repetitive! You have to write <code>props.</code> every single time.
            </div>
          </>
        ) : (
          <>
            <pre className="m-0 p-4 bg-slate-900 rounded-lg overflow-auto text-sm leading-relaxed border border-green-500/30">
              <code className="text-slate-200">
                {`function UserProfile({ `}
                <span className="text-blue-500">avatar</span>
                {`, `}
                <span className="text-blue-500">name</span>
                {`, `}
                <span className="text-blue-500">bio</span>
                {`, `}
                <span className="text-blue-500">role</span>
                {` }) {
  return (
    <div>
      <img src={`}
                <span className="text-blue-500">avatar</span>
                {`} />
      <h2>{`}
                <span className="text-blue-500">name</span>
                {`}</h2>
      <p>{`}
                <span className="text-blue-500">bio</span>
                {`}</p>
      <span>{`}
                <span className="text-blue-500">role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
            <div className="mt-4 px-4 py-3 bg-green-500/10 rounded-lg text-green-500 text-sm">
              💡 Clean! Props are extracted right in the function parameters.
            </div>
          </>
        )}
      </div>

      {/* Comparison */}
      <div className="px-6 py-4 bg-slate-900 border-t border-slate-700">
        <div className="text-xs text-slate-500 mb-2">DESTRUCTURING SYNTAX</div>
        <pre className="m-0 text-sm text-slate-400">
          <code>
            {`// These are equivalent:
function Comp(`}
            <span className="text-pink-500">props</span>
            {`) { ... `}
            <span className="text-pink-500">props</span>
            {`.name ... }
function Comp({ `}
            <span className="text-blue-500">name</span>
            {` }) { ... `}
            <span className="text-blue-500">name</span>
            {` ... }`}
          </code>
        </pre>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineExclamationCircle, HiOutlineLightBulb } from 'react-icons/hi';

export default function DestructuringDemo() {
  const [showDestructured, setShowDestructured] = useState(false);

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
            <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed border-2 border-error/30">
              <code className="text-base-content">
                {`function UserProfile(`}
                <span className="text-accent">props</span>
                {`) {
  return (
    <div>
      <img src={`}
                <span className="text-accent">props</span>
                <span className="text-base-content/50">.avatar</span>
                {`} />
      <h2>{`}
                <span className="text-accent">props</span>
                <span className="text-base-content/50">.name</span>
                {`}</h2>
      <p>{`}
                <span className="text-accent">props</span>
                <span className="text-base-content/50">.bio</span>
                {`}</p>
      <span>{`}
                <span className="text-accent">props</span>
                <span className="text-base-content/50">.role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
            <div className="mt-4 px-4 py-3 bg-error/10 rounded-lg text-error text-sm flex items-center gap-2">
              <HiOutlineExclamationCircle size={18} />
              Repetitive! You have to write <code>props.</code> every single time.
            </div>
          </>
        ) : (
          <>
            <pre className="m-0 p-4 bg-base-300 rounded-lg overflow-auto text-sm leading-relaxed border-2 border-success/30">
              <code className="text-base-content">
                {`function UserProfile({ `}
                <span className="text-primary">avatar</span>
                {`, `}
                <span className="text-primary">name</span>
                {`, `}
                <span className="text-primary">bio</span>
                {`, `}
                <span className="text-primary">role</span>
                {` }) {
  return (
    <div>
      <img src={`}
                <span className="text-primary">avatar</span>
                {`} />
      <h2>{`}
                <span className="text-primary">name</span>
                {`}</h2>
      <p>{`}
                <span className="text-primary">bio</span>
                {`}</p>
      <span>{`}
                <span className="text-primary">role</span>
                {`}</span>
    </div>
  );
}`}
              </code>
            </pre>
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
        <pre className="m-0 text-sm text-base-content/70">
          <code>
            {`// These are equivalent:
function Comp(`}
            <span className="text-accent">props</span>
            {`) { ... `}
            <span className="text-accent">props</span>
            {`.name ... }
function Comp({ `}
            <span className="text-primary">name</span>
            {` }) { ... `}
            <span className="text-primary">name</span>
            {` ... }`}
          </code>
        </pre>
      </div>
    </div>
  );
}

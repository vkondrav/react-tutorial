// ============================================
// Demo: Context Basics - Create, Provide, Consume
// ============================================

import { createContext, useContext, useState } from 'react';
import {
  HiOutlineLightBulb,
  HiCheck,
  HiUser,
  HiOutlineCode,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';

// Step 1: CREATE the context
const UserContext = createContext(null);

// Components that consume context
function DeepComponent() {
  // Step 3: CONSUME the context
  const user = useContext(UserContext);

  return (
    <div className="border border-success/30 rounded-lg p-3 bg-success/5">
      <div className="text-xs text-success font-semibold mb-2 flex items-center gap-1">
        <HiCheck size={14} />
        DeepComponent — uses useContext!
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
          <HiUser className="text-white" size={16} />
        </div>
        <div>
          <div className="text-sm font-medium">{user?.name || 'No user'}</div>
          <div className="text-xs text-base-content/60">{user?.role || 'Guest'}</div>
        </div>
      </div>
    </div>
  );
}

function MiddleComponent() {
  return (
    <div className="border border-base-content/20 rounded-lg p-3 ml-4 bg-base-300/30">
      <div className="text-xs text-base-content/60 font-semibold mb-2">
        MiddleComponent — no props needed!
      </div>
      <DeepComponent />
    </div>
  );
}

function OuterComponent() {
  return (
    <div className="border border-base-content/20 rounded-lg p-3 bg-base-300/30">
      <div className="text-xs text-base-content/60 font-semibold mb-2">
        OuterComponent — no props needed!
      </div>
      <MiddleComponent />
    </div>
  );
}

export default function ContextBasicsDemo() {
  const [showCode, setShowCode] = useState(false);
  const [user] = useState({ name: 'Alex Rivera', role: 'Admin' });

  return (
    <div className="card bg-base-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          <HiOutlineLightBulb className="text-success" size={20} />
          Context in Action
        </h3>
        <button onClick={() => setShowCode(!showCode)} className="btn btn-xs btn-ghost gap-1">
          <HiOutlineCode size={14} />
          {showCode ? 'Hide' : 'Show'} Code
          {showCode ? <HiChevronDown size={14} /> : <HiChevronRight size={14} />}
        </button>
      </div>

      {/* Visual demo */}
      <div className="mb-4">
        <div className="border border-primary/30 rounded-lg p-3 bg-primary/5">
          <div className="text-xs text-primary font-semibold mb-2 flex items-center gap-1">
            <span className="badge badge-primary badge-xs">Provider</span>
            UserContext.Provider value={'{user}'}
          </div>
          {/* Step 2: PROVIDE the context */}
          <UserContext.Provider value={user}>
            <OuterComponent />
          </UserContext.Provider>
        </div>
      </div>

      {/* Success message */}
      <div className="p-3 rounded-lg bg-success/10 border border-success/30 mb-4">
        <div className="flex items-start gap-2">
          <HiCheck className="text-success shrink-0 mt-0.5" size={18} />
          <div className="text-sm">
            <strong className="text-success">No Prop Drilling!</strong>{' '}
            <span className="text-base-content/70">
              DeepComponent gets the user directly via{' '}
              <code className="text-secondary">useContext()</code>. Middle components don't need to
              know about user at all.
            </span>
          </div>
        </div>
      </div>

      {/* Code explanation */}
      {showCode && (
        <div className="space-y-3">
          {/* Step 1 */}
          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-primary mb-2 flex items-center gap-2">
              <span className="badge badge-primary badge-sm">Step 1</span>
              Create the Context
            </div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-secondary">import</span>
                {' { createContext } '}
                <span className="text-secondary">from</span>{' '}
                <span className="text-success">'react'</span>;{'\n\n'}
                <span className="text-base-content/60">
                  // Create with a default value (or null)
                </span>
                {'\n'}
                <span className="text-secondary">const</span>
                {' UserContext = '}
                <span className="text-primary">createContext</span>
                {'('}
                <span className="text-warning">null</span>
                {');'}
              </code>
            </pre>
          </div>

          {/* Step 2 */}
          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-secondary mb-2 flex items-center gap-2">
              <span className="badge badge-secondary badge-sm">Step 2</span>
              Wrap with Provider
            </div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-base-content/60">// In your parent component</span>
                {'\n'}
                <span className="text-secondary">return</span>
                {' ('}
                {'\n'}
                {'  <'}
                <span className="text-accent">UserContext.Provider</span>{' '}
                <span className="text-warning">value</span>
                {'={user}>'}
                {'\n'}
                {'    <'}
                <span className="text-accent">App</span>
                {' />'}
                {'\n'}
                {'  </'}
                <span className="text-accent">UserContext.Provider</span>
                {'>'}
                {'\n'}
                {');'}
              </code>
            </pre>
          </div>

          {/* Step 3 */}
          <div className="p-3 rounded-lg bg-base-300">
            <div className="text-xs font-semibold text-success mb-2 flex items-center gap-2">
              <span className="badge badge-success badge-sm">Step 3</span>
              Consume with useContext
            </div>
            <pre className="font-mono text-xs overflow-x-auto">
              <code>
                <span className="text-secondary">import</span>
                {' { useContext } '}
                <span className="text-secondary">from</span>{' '}
                <span className="text-success">'react'</span>;{'\n\n'}
                <span className="text-secondary">function</span>{' '}
                <span className="text-primary">DeepComponent</span>
                {'() {'}
                {'\n'}
                {'  '}
                <span className="text-base-content/60">// Access context value anywhere!</span>
                {'\n'}
                {'  '}
                <span className="text-secondary">const</span>
                {' user = '}
                <span className="text-primary">useContext</span>
                {'(UserContext);'}
                {'\n\n'}
                {'  '}
                <span className="text-secondary">return</span>
                {' <div>{user.name}</div>;'}
                {'\n'}
                {'}'}
              </code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

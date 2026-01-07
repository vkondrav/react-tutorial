// ============================================
// Demo: React 19 Suspense Approach
// Shows use() hook and Suspense for data fetching
// ============================================

import { useState, Suspense, use } from 'react';
import {
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import suspensePatternCode from './examples/SuspensePattern.tsx?raw';

// ============================================
// Types
// ============================================
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

// ============================================
// Promise cache - IMPORTANT: promises must be
// created outside of render to avoid infinite loops
// ============================================
let usersPromise: Promise<User[]> | null = null;

function fetchUsers(): Promise<User[]> {
  return fetch('https://jsonplaceholder.typicode.com/users')
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then((data) => data.slice(0, 5));
}

function getUsersPromise(): Promise<User[]> {
  if (!usersPromise) {
    usersPromise = fetchUsers();
  }
  return usersPromise;
}

function resetUsersPromise(): void {
  usersPromise = null;
}

// ============================================
// Component that uses the data (with use())
// ============================================
function UserList({ promise }: { promise: Promise<User[]> }): React.ReactElement {
  // use() suspends until the promise resolves
  const users = use(promise);

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <div key={user.id} className="bg-base-200 rounded-lg p-3 flex items-center justify-between">
          <div>
            <div className="font-semibold text-primary">{user.name}</div>
            <div className="text-xs text-base-content/60">{user.email}</div>
          </div>
          <div className="badge badge-outline text-xs">{user.company.name}</div>
        </div>
      ))}
    </div>
  );
}

// ============================================
// Error Fallback component
// ============================================
function ErrorFallback({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}): React.ReactElement {
  return (
    <div className="text-center py-8">
      <div className="text-error text-4xl mb-2">⚠️</div>
      <p className="text-error font-semibold mb-2">Something went wrong</p>
      <p className="text-sm text-base-content/60 mb-4">{error.message}</p>
      <button onClick={onRetry} className="btn btn-sm btn-error">
        Try Again
      </button>
    </div>
  );
}

// ============================================
// Loading Fallback
// ============================================
function LoadingFallback(): React.ReactElement {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="loading loading-spinner loading-lg text-primary" />
      <span className="ml-3 text-base-content/70">Loading with Suspense...</span>
    </div>
  );
}

// ============================================
// Error Boundary (needed for Suspense errors)
// ============================================
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: (error: Error, retry: () => void) => ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      return this.props.fallback(this.state.error, this.handleRetry);
    }
    return this.props.children;
  }
}

// ============================================
// Main Demo Component
// ============================================
export default function SuspenseApproachDemo(): React.ReactElement {
  const [key, setKey] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const handleRefresh = () => {
    resetUsersPromise();
    setKey((k) => k + 1);
  };

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        React 19: use() + Suspense
      </h3>

      <div className="card bg-primary/10 border border-primary/30 p-3 mb-4">
        <p className="text-sm">
          <strong className="text-primary">React 19</strong> introduces the{' '}
          <code className="text-secondary">use()</code> hook that can read promises during render.
          Combined with <code className="text-secondary">{'<Suspense>'}</code>, you get declarative
          loading states without manual <code>loading</code> state management.
        </p>
      </div>

      {/* Live demo */}
      <div className="card bg-base-300 p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-secondary">Live Demo</span>
          <button onClick={handleRefresh} className="btn btn-sm btn-outline btn-primary">
            <HiOutlineRefresh size={16} />
            Refresh
          </button>
        </div>

        <ErrorBoundary
          key={key}
          fallback={(error, retry) => <ErrorFallback error={error} onRetry={retry} />}
          onReset={resetUsersPromise}
        >
          <Suspense fallback={<LoadingFallback />}>
            <UserList promise={getUsersPromise()} />
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* How it works */}
      <div className="grid md:grid-cols-3 gap-3 mb-4">
        <div className="card bg-base-300 p-3">
          <div className="text-lg mb-1">1️⃣</div>
          <div className="text-xs font-semibold text-primary mb-1">Create Promise Outside</div>
          <div className="text-xs text-base-content/60">
            Create the fetch promise outside the component to avoid re-creating on every render
          </div>
        </div>
        <div className="card bg-base-300 p-3">
          <div className="text-lg mb-1">2️⃣</div>
          <div className="text-xs font-semibold text-secondary mb-1">use() Suspends</div>
          <div className="text-xs text-base-content/60">
            Call <code>use(promise)</code> — it suspends the component until data is ready
          </div>
        </div>
        <div className="card bg-base-300 p-3">
          <div className="text-lg mb-1">3️⃣</div>
          <div className="text-xs font-semibold text-accent mb-1">Suspense Catches</div>
          <div className="text-xs text-base-content/60">
            <code>{'<Suspense>'}</code> shows fallback UI while suspended
          </div>
        </div>
      </div>

      {/* Code toggle */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
      >
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code Example
      </button>

      {showCode && (
        <CodeSnippet code={suspensePatternCode} language="tsx" title="Suspense Pattern" />
      )}

      {/* Caveats */}
      <div className="card bg-warning/10 border border-warning/30 p-3 mt-4">
        <div className="text-xs font-semibold text-warning mb-2">⚠️ Important Caveats</div>
        <ul className="text-xs text-base-content/70 space-y-1">
          <li>
            • <strong>Promise must be created outside render</strong> — otherwise you get infinite
            loops
          </li>
          <li>
            • <strong>ErrorBoundary required</strong> for handling rejected promises
          </li>
          <li>
            • <strong>Cache management is your responsibility</strong> — libraries like TanStack
            Query handle this better
          </li>
          <li>
            • <strong>No built-in refetch</strong> — you need to invalidate and recreate the promise
          </li>
        </ul>
      </div>
    </div>
  );
}

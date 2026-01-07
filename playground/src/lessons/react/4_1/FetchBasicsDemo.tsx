// ============================================
// Demo: Fetch Basics
// Shows the basic pattern of fetching data with useEffect
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import basicFetchPatternCode from './examples/BasicFetchPattern.tsx?raw';

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

export default function FetchBasicsDemo(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);

  // The fetch effect
  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data.slice(0, 5)); // Just first 5 users
        setFetchCount((c) => c + 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []); // Empty array = fetch once on mount

  const refetch = () => {
    // Trigger a re-render to show manual refetch
    setLoading(true);
    setError(null);

    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setUsers(data.slice(0, 5));
        setFetchCount((c) => c + 1);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Basic Fetch Pattern
      </h3>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-base-content/70">
          Fetches users from JSONPlaceholder API on component mount
        </p>
        <div className="flex items-center gap-3">
          <span className="text-xs text-base-content/60">
            Fetched: <span className="text-primary font-semibold">{fetchCount}x</span>
          </span>
          <button
            onClick={refetch}
            className="btn btn-sm btn-outline btn-primary"
            disabled={loading}
          >
            <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={16} />
            Refetch
          </button>
        </div>
      </div>

      {/* Result display */}
      <div className="card bg-base-300 p-4 mb-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
            <span className="ml-3 text-base-content/70">Loading users...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-error text-4xl mb-2">⚠️</div>
            <p className="text-error font-semibold">Error: {error}</p>
            <button onClick={refetch} className="btn btn-sm btn-error mt-3">
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {users.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
              >
                <div>
                  <div className="font-semibold text-primary">{user.name}</div>
                  <div className="text-xs text-base-content/60">{user.email}</div>
                </div>
                <div className="badge badge-outline text-xs">{user.company.name}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Three states visualization */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div
          className={`card p-3 text-center ${loading ? 'bg-primary text-primary-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">⏳</div>
          <div className="text-xs font-semibold">Loading</div>
          <div className="text-xs opacity-70">{loading ? 'Active' : 'Inactive'}</div>
        </div>
        <div
          className={`card p-3 text-center ${error ? 'bg-error text-error-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">❌</div>
          <div className="text-xs font-semibold">Error</div>
          <div className="text-xs opacity-70">{error ? 'Has Error' : 'None'}</div>
        </div>
        <div
          className={`card p-3 text-center ${!loading && !error && users.length > 0 ? 'bg-success text-success-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">✅</div>
          <div className="text-xs font-semibold">Success</div>
          <div className="text-xs opacity-70">{users.length} users</div>
        </div>
      </div>

      {/* Toggle code */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
      >
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <CodeSnippet title="The useEffect Pattern" language="tsx" code={basicFetchPatternCode} />
      )}
    </div>
  );
}

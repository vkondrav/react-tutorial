// ============================================
// Demo: Query Basics
// Shows the fundamental useQuery pattern
// ============================================

import { useState } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import useQueryBasicsCode from './examples/UseQueryBasics.tsx?raw';

// Create a client for this demo
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000, // 30 seconds
      retry: 1,
    },
  },
});

interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

function QueryBasicsContent(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);

  const {
    data: users,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });

  const displayUsers = users?.slice(0, 5) ?? [];

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Basic useQuery Pattern
      </h3>

      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-base-content/70">
          Fetches users with automatic caching and state management
        </p>
        <div className="flex items-center gap-3">
          {isFetching && !isLoading && (
            <span className="text-xs text-info">Background fetching...</span>
          )}
          <button
            onClick={() => refetch()}
            className="btn btn-sm btn-outline btn-primary"
            disabled={isFetching}
          >
            <HiOutlineRefresh className={isFetching ? 'animate-spin' : ''} size={16} />
            Refetch
          </button>
        </div>
      </div>

      {/* Result display */}
      <div className="card bg-base-300 p-4 mb-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
            <span className="ml-3 text-base-content/70">Loading users...</span>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <div className="text-error text-4xl mb-2">⚠️</div>
            <p className="text-error font-semibold">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </p>
            <button onClick={() => refetch()} className="btn btn-sm btn-error mt-3">
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {displayUsers.map((user) => (
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

      {/* State indicators */}
      <div className="grid grid-cols-4 gap-3 mb-4">
        <div
          className={`card p-3 text-center ${isLoading ? 'bg-primary text-primary-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">⏳</div>
          <div className="text-xs font-semibold">isLoading</div>
          <div className="text-xs opacity-70">{isLoading ? 'true' : 'false'}</div>
        </div>
        <div
          className={`card p-3 text-center ${isFetching ? 'bg-info text-info-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">🔄</div>
          <div className="text-xs font-semibold">isFetching</div>
          <div className="text-xs opacity-70">{isFetching ? 'true' : 'false'}</div>
        </div>
        <div
          className={`card p-3 text-center ${error ? 'bg-error text-error-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">❌</div>
          <div className="text-xs font-semibold">isError</div>
          <div className="text-xs opacity-70">{error ? 'true' : 'false'}</div>
        </div>
        <div
          className={`card p-3 text-center ${!isLoading && !error && users ? 'bg-success text-success-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">✅</div>
          <div className="text-xs font-semibold">isSuccess</div>
          <div className="text-xs opacity-70">
            {!isLoading && !error && users ? 'true' : 'false'}
          </div>
        </div>
      </div>

      {/* Comparison note */}
      <div className="bg-success/10 border border-success/30 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-success mb-2">Compare to useEffect!</h4>
        <p className="text-sm text-base-content/70">
          With TanStack Query, you don't need to manage <code>loading</code>, <code>error</code>,
          and <code>data</code> state manually. No cleanup functions, no race conditions, and the
          data is automatically cached!
        </p>
      </div>

      {/* Toggle code */}
      <button
        onClick={() => setShowCode(!showCode)}
        className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
      >
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && <CodeSnippet title="useQuery Basics" language="tsx" code={useQueryBasicsCode} />}
    </div>
  );
}

export default function QueryBasicsDemo(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryBasicsContent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

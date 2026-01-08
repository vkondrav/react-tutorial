// ============================================
// Demo: Query States & Caching
// Shows stale vs fresh data and background refetching
// ============================================

import { useState, useEffect } from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HiOutlineClock, HiOutlineRefresh, HiChevronDown, HiChevronRight } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import staleFreshCode from './examples/StaleFreshData.tsx?raw';

// Create a client with short stale time for demo
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000, // 5 seconds - short for demo
      retry: 1,
    },
  },
});

interface Post {
  id: number;
  title: string;
  body: string;
  userId: number;
}

function QueryStatesContent(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(1);
  const [staleTime, setStaleTime] = useState(5000);

  const {
    data: post,
    isLoading,
    isFetching,
    isStale,
    dataUpdatedAt,
  } = useQuery<Post>({
    queryKey: ['post', selectedPostId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${selectedPostId}`);
      if (!response.ok) throw new Error('Failed to fetch');
      return response.json();
    },
    staleTime,
  });

  // Track time since last update (updates every second)
  const [timeSinceUpdate, setTimeSinceUpdate] = useState(0);
  useEffect(() => {
    if (!dataUpdatedAt) return;

    const updateTime = () => {
      setTimeSinceUpdate(Math.round((Date.now() - dataUpdatedAt) / 1000));
    };

    updateTime(); // Initial update
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [dataUpdatedAt]);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineClock className="text-primary" size={20} />
        Stale vs Fresh Data
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        TanStack Query marks data as "stale" after <code>staleTime</code> milliseconds. Stale data
        is shown immediately while fresh data is fetched in the background.
      </p>

      {/* Controls */}
      <div className="flex flex-wrap items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Post:</span>
          <div className="btn-group">
            {[1, 2, 3, 4, 5].map((id) => (
              <button
                key={id}
                onClick={() => setSelectedPostId(id)}
                className={`btn btn-sm ${selectedPostId === id ? 'btn-primary' : 'btn-outline'}`}
              >
                {id}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-base-content/70">Stale Time:</span>
          <select
            value={staleTime}
            onChange={(e) => setStaleTime(Number(e.target.value))}
            className="select select-sm select-bordered"
          >
            <option value={0}>0s (always stale)</option>
            <option value={5000}>5s</option>
            <option value={30000}>30s</option>
            <option value={Infinity}>Infinity (never stale)</option>
          </select>
        </div>
      </div>

      {/* State indicators */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div
          className={`card p-3 text-center ${isStale ? 'bg-warning text-warning-content' : 'bg-success text-success-content'}`}
        >
          <div className="text-2xl mb-1">{isStale ? '🕐' : '✨'}</div>
          <div className="text-xs font-semibold">{isStale ? 'Stale' : 'Fresh'}</div>
          <div className="text-xs opacity-70">
            {isStale ? 'May refetch on focus' : 'Using cached data'}
          </div>
        </div>
        <div
          className={`card p-3 text-center ${isFetching ? 'bg-info text-info-content' : 'bg-base-300'}`}
        >
          <div className="text-2xl mb-1">{isFetching ? '🔄' : '💤'}</div>
          <div className="text-xs font-semibold">{isFetching ? 'Fetching' : 'Idle'}</div>
          <div className="text-xs opacity-70">
            {isFetching ? 'Loading data...' : 'No active fetch'}
          </div>
        </div>
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1">⏱️</div>
          <div className="text-xs font-semibold">Age</div>
          <div className="text-xs opacity-70">{timeSinceUpdate}s since fetch</div>
        </div>
      </div>

      {/* Post display */}
      <div className="card bg-base-300 p-4 mb-4 relative">
        {isFetching && (
          <div className="absolute top-2 right-2">
            <HiOutlineRefresh className="animate-spin text-primary" size={16} />
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
            <span className="ml-3 text-base-content/70">Loading post...</span>
          </div>
        ) : post ? (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge badge-primary">Post #{post.id}</span>
              <span className="badge badge-ghost">User {post.userId}</span>
            </div>
            <h4 className="font-semibold text-lg mb-2 line-clamp-1">{post.title}</h4>
            <p className="text-sm text-base-content/70 line-clamp-3">{post.body}</p>
          </div>
        ) : null}
      </div>

      {/* Info box */}
      <div className="bg-info/10 border border-info/30 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-info mb-2">How Stale Time Works</h4>
        <ul className="text-sm text-base-content/70 space-y-1">
          <li>
            • <strong>Fresh data:</strong> Used directly from cache, no refetch
          </li>
          <li>
            • <strong>Stale data:</strong> Shown immediately, refetched in background
          </li>
          <li>
            • <strong>Window focus:</strong> Triggers refetch of stale queries
          </li>
          <li>
            • <strong>Network reconnect:</strong> Also triggers refetch of stale queries
          </li>
        </ul>
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
        <CodeSnippet title="Stale Time Configuration" language="tsx" code={staleFreshCode} />
      )}
    </div>
  );
}

export default function QueryStatesDemo(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryStatesContent />
    </QueryClientProvider>
  );
}

// ============================================
// Playground: TanStack Query Scenarios
// Interactive demos for common patterns
// ============================================

import { useState, Suspense } from 'react';
import {
  useQuery,
  useSuspenseQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  HiOutlineSearch,
  HiOutlineUsers,
  HiOutlineRefresh,
  HiOutlineDuplicate,
  HiOutlineLightningBolt,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import suspenseQueryPatternCode from './examples/SuspenseQueryPattern.tsx?raw';

// Create a client for the playground
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10000,
      retry: 1,
    },
  },
});

export default function QueryPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<
    'dependent' | 'parallel' | 'deduplication' | 'polling' | 'suspense'
  >('dependent');

  const demos = [
    { id: 'dependent' as const, label: 'Dependent', icon: HiOutlineSearch },
    { id: 'parallel' as const, label: 'Parallel', icon: HiOutlineUsers },
    { id: 'deduplication' as const, label: 'Dedup', icon: HiOutlineDuplicate },
    { id: 'polling' as const, label: 'Polling', icon: HiOutlineRefresh },
    { id: 'suspense' as const, label: 'Suspense', icon: HiOutlineLightningBolt },
  ];

  return (
    <QueryClientProvider client={queryClient}>
      <div className="card bg-base-200 p-5">
        {/* Demo selector */}
        <div className="tabs tabs-boxed bg-base-300 p-1 mb-4">
          {demos.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`tab flex-1 ${activeDemo === id ? 'tab-active' : ''}`}
              onClick={() => setActiveDemo(id)}
            >
              <Icon className="mr-2" size={16} />
              {label}
            </button>
          ))}
        </div>

        {/* Demo content */}
        {activeDemo === 'dependent' && <DependentQueriesDemo />}
        {activeDemo === 'parallel' && <ParallelQueriesDemo />}
        {activeDemo === 'deduplication' && <DeduplicationDemo />}
        {activeDemo === 'polling' && <PollingDemo />}
        {activeDemo === 'suspense' && <SuspenseQueryDemo />}
      </div>
    </QueryClientProvider>
  );
}

// ============================================
// Demo 1: Dependent Queries
// ============================================
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

function DependentQueriesDemo(): React.ReactElement {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  // First query: fetch users
  const usersQuery = useQuery<User[]>({
    queryKey: ['users-list'],
    queryFn: async () => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
  });

  // Dependent query: fetch posts for selected user
  // Only runs when selectedUserId is available
  const postsQuery = useQuery<Post[]>({
    queryKey: ['user-posts', selectedUserId],
    queryFn: async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${selectedUserId}`
      );
      return res.json();
    },
    enabled: selectedUserId !== null, // Only fetch when user is selected
  });

  const users = usersQuery.data?.slice(0, 5) ?? [];

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineSearch className="text-primary" size={18} />
        Dependent Queries
      </h4>
      <p className="text-sm text-base-content/70 mb-4">
        The posts query only runs when a user is selected. Use <code>enabled: !!userId</code> to
        control when queries execute.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {/* Users list */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Select a User</div>
          {usersQuery.isLoading ? (
            <div className="loading loading-spinner loading-sm" />
          ) : (
            <div className="space-y-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => setSelectedUserId(user.id)}
                  className={`w-full text-left p-2 rounded-lg transition-colors ${
                    selectedUserId === user.id
                      ? 'bg-primary text-primary-content'
                      : 'bg-base-200 hover:bg-base-100'
                  }`}
                >
                  <div className="font-semibold text-sm">{user.name}</div>
                  <div className="text-xs opacity-70">{user.email}</div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Posts for selected user */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">
            {selectedUserId ? `Posts by User #${selectedUserId}` : 'Select a user to see posts'}
          </div>
          {!selectedUserId ? (
            <div className="text-center py-8 text-base-content/50">← Select a user first</div>
          ) : postsQuery.isLoading ? (
            <div className="flex justify-center py-8">
              <div className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : (
            <div className="space-y-2 max-h-48 overflow-auto">
              {postsQuery.data?.slice(0, 5).map((post) => (
                <div key={post.id} className="p-2 bg-base-200 rounded-lg">
                  <div className="font-semibold text-sm line-clamp-1">{post.title}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo 2: Parallel Queries
// ============================================
function ParallelQueriesDemo(): React.ReactElement {
  // Multiple queries run in parallel automatically
  const usersQuery = useQuery<User[]>({
    queryKey: ['parallel-users'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 800));
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
  });

  const postsQuery = useQuery({
    queryKey: ['parallel-posts'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 600));
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      return res.json();
    },
  });

  const todosQuery = useQuery({
    queryKey: ['parallel-todos'],
    queryFn: async () => {
      await new Promise((r) => setTimeout(r, 400));
      const res = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      return res.json();
    },
  });

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineUsers className="text-primary" size={18} />
        Parallel Queries
      </h4>
      <p className="text-sm text-base-content/70 mb-4">
        Multiple <code>useQuery</code> calls in the same component run in parallel. Each has its own
        loading state.
      </p>

      <div className="grid grid-cols-3 gap-4">
        {/* Users */}
        <div className="card bg-base-300 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold">Users</span>
            {usersQuery.isFetching && <span className="loading loading-spinner loading-xs" />}
          </div>
          {usersQuery.isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : (
            <div className="text-sm text-base-content/70">
              {usersQuery.data?.length} users loaded
            </div>
          )}
        </div>

        {/* Posts */}
        <div className="card bg-base-300 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold">Posts</span>
            {postsQuery.isFetching && <span className="loading loading-spinner loading-xs" />}
          </div>
          {postsQuery.isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : (
            <div className="text-sm text-base-content/70">
              {postsQuery.data?.length} posts loaded
            </div>
          )}
        </div>

        {/* Todos */}
        <div className="card bg-base-300 p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold">Todos</span>
            {todosQuery.isFetching && <span className="loading loading-spinner loading-xs" />}
          </div>
          {todosQuery.isLoading ? (
            <div className="h-24 flex items-center justify-center">
              <span className="loading loading-spinner text-primary" />
            </div>
          ) : (
            <div className="text-sm text-base-content/70">
              {todosQuery.data?.length} todos loaded
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo 3: Deduplication
// ============================================
function DeduplicationDemo(): React.ReactElement {
  const [componentCount, setComponentCount] = useState(1);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineDuplicate className="text-primary" size={18} />
        Request Deduplication
      </h4>
      <p className="text-sm text-base-content/70 mb-4">
        Multiple components with the same <code>queryKey</code> share one request. Watch the network
        tab — only 1 request is made!
      </p>

      <div className="flex items-center gap-4 mb-4">
        <span className="text-sm">Components showing same data:</span>
        <div className="btn-group">
          {[1, 2, 3, 4].map((count) => (
            <button
              key={count}
              onClick={() => setComponentCount(count)}
              className={`btn btn-sm ${componentCount === count ? 'btn-primary' : ''}`}
            >
              {count}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {Array.from({ length: componentCount }).map((_, i) => (
          <UserCard key={i} index={i + 1} />
        ))}
      </div>

      <div className="mt-4 bg-success/10 border border-success/30 rounded-lg p-3 text-sm">
        <strong className="text-success">✓ Deduplication Active:</strong> All {componentCount}{' '}
        components share the same cached data from a single network request!
      </div>
    </div>
  );
}

function UserCard({ index }: { index: number }): React.ReactElement {
  // Same queryKey = same cached data, single request
  const { data, isLoading, isFetching } = useQuery<User[]>({
    queryKey: ['dedup-users'],
    queryFn: async () => {
      console.log('🔄 Fetching users (check network tab - only 1 request!)');
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      return res.json();
    },
    staleTime: 30000,
  });

  const user = data?.[index - 1];

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold">Component #{index}</span>
        {isFetching && <span className="loading loading-spinner loading-xs" />}
      </div>
      {isLoading ? (
        <div className="loading loading-spinner loading-sm text-primary" />
      ) : user ? (
        <div>
          <div className="font-semibold text-primary">{user.name}</div>
          <div className="text-xs text-base-content/60">{user.email}</div>
        </div>
      ) : null}
    </div>
  );
}

// ============================================
// Demo 4: Polling / Refetch Interval
// ============================================
function PollingDemo(): React.ReactElement {
  const [isPolling, setIsPolling] = useState(false);
  const [interval, setInterval] = useState(3000);
  const [fetchCount, setFetchCount] = useState(0);

  const { data, isFetching, dataUpdatedAt } = useQuery({
    queryKey: ['polling-time'],
    queryFn: async () => {
      setFetchCount((c) => c + 1);
      // Return current server time
      return {
        timestamp: new Date().toISOString(),
        random: Math.floor(Math.random() * 1000),
      };
    },
    refetchInterval: isPolling ? interval : false,
    staleTime: 0, // Always refetch
  });

  const lastUpdate = dataUpdatedAt ? new Date(dataUpdatedAt).toLocaleTimeString() : 'Never';

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineRefresh className="text-primary" size={18} />
        Automatic Polling
      </h4>
      <p className="text-sm text-base-content/70 mb-4">
        Use <code>refetchInterval</code> to automatically poll for updates. Perfect for dashboards,
        live feeds, or real-time data.
      </p>

      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={() => setIsPolling(!isPolling)}
          className={`btn ${isPolling ? 'btn-error' : 'btn-success'}`}
        >
          {isPolling ? 'Stop Polling' : 'Start Polling'}
        </button>

        <div className="flex items-center gap-2">
          <label className="text-sm text-base-content/70">Interval:</label>
          <select
            value={interval}
            onChange={(e) => setInterval(Number(e.target.value))}
            className="select select-sm select-bordered"
            disabled={isPolling}
          >
            <option value={1000}>1 second</option>
            <option value={2000}>2 seconds</option>
            <option value={3000}>3 seconds</option>
            <option value={5000}>5 seconds</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Live data */}
        <div className="card bg-base-300 p-4 relative">
          {isFetching && (
            <div className="absolute top-2 right-2">
              <span className="loading loading-spinner loading-xs text-primary" />
            </div>
          )}
          <div className="text-xs text-base-content/60 mb-2">Live Data</div>
          {data ? (
            <div>
              <div className="font-mono text-lg text-primary">{data.random}</div>
              <div className="text-xs text-base-content/60 mt-1">Random number from "server"</div>
            </div>
          ) : (
            <div className="text-base-content/50">Click to fetch</div>
          )}
        </div>

        {/* Stats */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Stats</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Polling:</span>
              <span className={isPolling ? 'text-success' : 'text-error'}>
                {isPolling ? 'Active' : 'Stopped'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fetch count:</span>
              <span className="font-bold text-primary">{fetchCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Last update:</span>
              <span className="text-xs">{lastUpdate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Demo 5: Suspense Query
// ============================================
function SuspenseQueryDemo(): React.ReactElement {
  const [userId, setUserId] = useState(1);
  const [showUser, setShowUser] = useState(false);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineLightningBolt className="text-primary" size={18} />
        useSuspenseQuery
      </h4>
      <p className="text-sm text-base-content/70 mb-4">
        <code>useSuspenseQuery</code> integrates with React Suspense. No need to handle{' '}
        <code>isLoading</code> — the component suspends until data is ready!
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">User ID:</span>
          <select
            value={userId}
            onChange={(e) => {
              setUserId(Number(e.target.value));
              setShowUser(false); // Reset to trigger new suspense
            }}
            className="select select-sm select-bordered"
          >
            {[1, 2, 3, 4, 5].map((id) => (
              <option key={id} value={id}>
                User {id}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowUser(true)}
          className="btn btn-primary btn-sm"
          disabled={showUser}
        >
          Load User with Suspense
        </button>
        {showUser && (
          <button onClick={() => setShowUser(false)} className="btn btn-ghost btn-sm">
            Reset
          </button>
        )}
      </div>

      <div className="card bg-base-300 p-4 min-h-32">
        {showUser ? (
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-8">
                <div className="loading loading-spinner loading-lg text-primary" />
                <span className="ml-3 text-base-content/70">
                  Suspense fallback shown while loading...
                </span>
              </div>
            }
          >
            <SuspenseUserCard userId={userId} />
          </Suspense>
        ) : (
          <div className="flex items-center justify-center py-8 text-base-content/50">
            Click "Load User with Suspense" to see it in action
          </div>
        )}
      </div>

      {/* Info box */}
      <div className="mt-4 bg-info/10 border border-info/30 rounded-lg p-4">
        <h4 className="font-semibold text-info mb-2">Why useSuspenseQuery?</h4>
        <ul className="text-sm text-base-content/70 space-y-1">
          <li>
            • <strong>Cleaner code:</strong> No isLoading checks — data is always defined
          </li>
          <li>
            • <strong>Declarative loading:</strong> Suspense boundary handles the loading UI
          </li>
          <li>
            • <strong>Error boundaries:</strong> Pair with ErrorBoundary for error handling
          </li>
          <li>
            • <strong>Streaming SSR:</strong> Works great with React 18+ streaming
          </li>
        </ul>
      </div>

      {/* Code example */}
      <CodeSnippet
        title="useSuspenseQuery Pattern"
        language="tsx"
        code={suspenseQueryPatternCode}
      />
    </div>
  );
}

// Component that uses useSuspenseQuery
function SuspenseUserCard({ userId }: { userId: number }): React.ReactElement {
  // With useSuspenseQuery, data is ALWAYS defined (component suspends until ready)
  const { data } = useSuspenseQuery<User>({
    queryKey: ['suspense-user', userId],
    queryFn: async () => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 1500));
      const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  // No loading check needed - data is guaranteed to exist here!
  return (
    <div className="text-center">
      <div className="text-success text-2xl mb-2">✓</div>
      <div className="font-semibold text-lg text-primary">{data.name}</div>
      <div className="text-sm text-base-content/60">{data.email}</div>
      <div className="badge badge-ghost mt-2">{data.company.name}</div>
      <p className="text-xs text-success mt-3">
        No isLoading check needed — data is always defined!
      </p>
    </div>
  );
}

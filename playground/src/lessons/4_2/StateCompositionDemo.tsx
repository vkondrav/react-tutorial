// ============================================
// State Composition Demo
// Combining loading, error, and empty states
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineInbox,
  HiOutlineUser,
  HiOutlineCursorClick,
} from 'react-icons/hi';

type SimulatedState = 'loading' | 'error' | 'empty' | 'data';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// Skeleton for user card
function UserCardSkeleton() {
  return (
    <div className="animate-pulse space-y-3">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-base-content/10" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-base-content/10 rounded w-3/4" />
          <div className="h-3 bg-base-content/10 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

// Error state component
function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <HiOutlineExclamationCircle className="text-error mb-3" size={32} />
      <h4 className="font-semibold mb-1">Failed to load users</h4>
      <p className="text-sm text-base-content/60 mb-4">Something went wrong. Please try again.</p>
      <button onClick={onRetry} className="btn btn-primary btn-sm gap-2">
        <HiOutlineRefresh size={16} />
        Retry
      </button>
    </div>
  );
}

// Empty state component
function EmptyUsersState() {
  return (
    <div className="flex flex-col items-center py-8 text-center">
      <HiOutlineInbox className="text-base-content/30 mb-3" size={32} />
      <h4 className="font-semibold mb-1">No users found</h4>
      <p className="text-sm text-base-content/60">There are no users to display yet.</p>
    </div>
  );
}

// User card component
function UserCard({ user }: { user: User }) {
  return (
    <div className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
        {user.name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>
      <div>
        <div className="font-semibold">{user.name}</div>
        <div className="text-sm text-base-content/60">{user.email}</div>
      </div>
    </div>
  );
}

// Composed component that handles all states
function UserList({
  users,
  loading,
  error,
  onRetry,
}: {
  users: User[];
  loading: boolean;
  error: Error | null;
  onRetry: () => void;
}) {
  // The order matters: loading → error → empty → data
  if (loading) {
    return (
      <div className="space-y-3">
        <UserCardSkeleton />
        <UserCardSkeleton />
        <UserCardSkeleton />
      </div>
    );
  }

  if (error) {
    return <ErrorState onRetry={onRetry} />;
  }

  if (users.length === 0) {
    return <EmptyUsersState />;
  }

  return (
    <div className="space-y-3">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

const MOCK_USERS: User[] = [
  { id: 1, name: 'Alice Johnson', email: 'alice@example.com', avatar: '' },
  { id: 2, name: 'Bob Smith', email: 'bob@example.com', avatar: '' },
  { id: 3, name: 'Carol Williams', email: 'carol@example.com', avatar: '' },
];

export default function StateCompositionDemo(): React.ReactElement {
  const [simulatedState, setSimulatedState] = useState<SimulatedState>('data');
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Simulate different states
  useEffect(() => {
    setTimeout(() => {
      setLoading(true);
      setError(null);
    }, 0);

    const timer = setTimeout(() => {
      setLoading(false);

      switch (simulatedState) {
        case 'loading':
          // Stay in loading state (handled above)
          setLoading(true);
          break;
        case 'error':
          setError(new Error('Failed to fetch users'));
          setUsers([]);
          break;
        case 'empty':
          setUsers([]);
          break;
        case 'data':
          setUsers(MOCK_USERS);
          break;
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [simulatedState]);

  const handleRetry = () => {
    setSimulatedState('data');
  };

  return (
    <div className="space-y-6">
      {/* State selector */}
      <div className="flex flex-wrap gap-2">
        {(['loading', 'error', 'empty', 'data'] as SimulatedState[]).map((state) => (
          <button
            key={state}
            onClick={() => setSimulatedState(state)}
            className={`btn btn-sm gap-2 ${simulatedState === state ? 'btn-primary' : 'btn-ghost'}`}
          >
            <HiOutlineCursorClick size={14} />
            {state.charAt(0).toUpperCase() + state.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Demo card */}
        <div className="card bg-base-300 p-4">
          <div className="flex items-center gap-2 mb-4">
            <HiOutlineUser className="text-primary" />
            <h4 className="font-semibold">User List</h4>
          </div>
          <UserList users={users} loading={loading} error={error} onRetry={handleRetry} />
        </div>

        {/* Code example */}
        <div className="card bg-base-200 p-4">
          <h4 className="font-semibold mb-3">The Composition Pattern</h4>
          <div className="bg-base-300 rounded-lg p-3 mb-4">
            <pre className="text-xs overflow-x-auto">
              <code>{`function UserList({ 
  users, loading, error, onRetry 
}) {
  // Check states in order:
  // loading → error → empty → data
  
  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <ErrorState 
        message={error.message}
        onRetry={onRetry}
      />
    );
  }

  if (users.length === 0) {
    return <EmptyState />;
  }

  // Happy path: render the data
  return (
    <ul>
      {users.map(user => (
        <UserCard key={user.id} user={user} />
      ))}
    </ul>
  );
}`}</code>
            </pre>
          </div>

          <div className="space-y-2 text-sm">
            <div className="font-medium">Why this order?</div>
            <ol className="list-decimal list-inside space-y-1 text-base-content/70">
              <li>
                <strong>Loading first</strong> — Show feedback immediately
              </li>
              <li>
                <strong>Error second</strong> — Don't show stale data on error
              </li>
              <li>
                <strong>Empty third</strong> — Distinguish from loading
              </li>
              <li>
                <strong>Data last</strong> — The "happy path"
              </li>
            </ol>
          </div>
        </div>
      </div>

      {/* State flow diagram */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-4">State Flow</h4>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          <div className="badge badge-lg badge-primary">Loading</div>
          <span className="text-base-content/40">→</span>
          <div className="badge badge-lg badge-error">Error?</div>
          <span className="text-base-content/40">→</span>
          <div className="badge badge-lg badge-warning">Empty?</div>
          <span className="text-base-content/40">→</span>
          <div className="badge badge-lg badge-success">Data</div>
        </div>
        <p className="text-sm text-base-content/60 text-center mt-4">
          Each state check is a "gate" — only one state renders at a time
        </p>
      </div>

      {/* Advanced tip */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Advanced: Custom Hook Pattern</h4>
        <div className="bg-base-300 rounded-lg p-3">
          <pre className="text-xs overflow-x-auto">
            <code>{`// Extract state management into a custom hook
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed');
      setUsers(await res.json());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

// Clean component usage
function UsersPage() {
  const { users, loading, error, refetch } = useUsers();
  
  return (
    <UserList 
      users={users} 
      loading={loading} 
      error={error} 
      onRetry={refetch}
    />
  );
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

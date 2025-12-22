// ============================================
// Demo: Generic useFetch with TypeScript
// Shows type-safe data fetching
// ============================================

import { useState, useEffect, useCallback } from 'react';
import { HiOutlineLightBulb, HiOutlineRefresh } from 'react-icons/hi';

// ============================================
// Types for different API responses
// ============================================
interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

// ============================================
// Generic useFetch Hook
// ============================================
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useFetch<T>(url: string): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
  }, [url, refetchIndex]);

  return { data, loading, error, refetch };
}

// ============================================
// Demo Component
// ============================================
type ResourceType = 'users' | 'posts' | 'todos';

const resources: { type: ResourceType; label: string; color: string }[] = [
  { type: 'users', label: 'Users', color: 'primary' },
  { type: 'posts', label: 'Posts', color: 'secondary' },
  { type: 'todos', label: 'Todos', color: 'accent' },
];

export default function GenericUseFetchDemo(): React.ReactElement {
  const [resourceType, setResourceType] = useState<ResourceType>('users');

  // Type-safe data based on resource type
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useFetch<Post[]>('https://jsonplaceholder.typicode.com/posts');

  const {
    data: todos,
    loading: todosLoading,
    error: todosError,
    refetch: refetchTodos,
  } = useFetch<Todo[]>('https://jsonplaceholder.typicode.com/todos');

  // Get current resource data
  const currentData = {
    users: { data: users, loading: usersLoading, error: usersError, refetch: refetchUsers },
    posts: { data: posts, loading: postsLoading, error: postsError, refetch: refetchPosts },
    todos: { data: todos, loading: todosLoading, error: todosError, refetch: refetchTodos },
  }[resourceType];

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Type-Safe Fetching with Generics
      </h3>

      {/* Resource selector */}
      <div className="flex gap-2 mb-4">
        {resources.map((resource) => (
          <button
            key={resource.type}
            onClick={() => setResourceType(resource.type)}
            className={`btn btn-sm ${
              resourceType === resource.type ? `btn-${resource.color}` : 'btn-ghost'
            }`}
          >
            {resource.label}
          </button>
        ))}
        <button
          onClick={currentData.refetch}
          disabled={currentData.loading}
          className="btn btn-sm btn-outline ml-auto"
        >
          <HiOutlineRefresh className={currentData.loading ? 'animate-spin' : ''} size={16} />
        </button>
      </div>

      {/* Type annotation display */}
      <div className="card bg-base-300 p-3 mb-4">
        <div className="text-xs font-semibold text-base-content/60 mb-1">Hook Call:</div>
        <pre className="font-mono text-xs text-primary">
          <code>
            {resourceType === 'users' &&
              `const { data: users } = useFetch<User[]>('/api/users');
// data is typed as User[] | null ✓`}
            {resourceType === 'posts' &&
              `const { data: posts } = useFetch<Post[]>('/api/posts');
// data is typed as Post[] | null ✓`}
            {resourceType === 'todos' &&
              `const { data: todos } = useFetch<Todo[]>('/api/todos');
// data is typed as Todo[] | null ✓`}
          </code>
        </pre>
      </div>

      {/* Data display */}
      <div className="card bg-base-300 p-4 min-h-[200px]">
        {currentData.loading ? (
          <div className="flex items-center justify-center h-full py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
          </div>
        ) : currentData.error ? (
          <div className="text-center py-8">
            <div className="text-error text-2xl mb-2">⚠️</div>
            <p className="text-error">{currentData.error}</p>
          </div>
        ) : (
          <div className="space-y-2">
            {resourceType === 'users' &&
              users?.slice(0, 4).map((user) => (
                <div key={user.id} className="bg-base-200 rounded-lg p-3 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-primary">{user.name}</div>
                    <div className="text-xs text-base-content/60">@{user.username}</div>
                  </div>
                  <div className="text-xs text-base-content/50">{user.email}</div>
                </div>
              ))}
            {resourceType === 'posts' &&
              posts?.slice(0, 3).map((post) => (
                <div key={post.id} className="bg-base-200 rounded-lg p-3">
                  <div className="font-semibold text-secondary text-sm mb-1 line-clamp-1">
                    {post.title}
                  </div>
                  <div className="text-xs text-base-content/60 line-clamp-2">{post.body}</div>
                </div>
              ))}
            {resourceType === 'todos' &&
              todos?.slice(0, 5).map((todo) => (
                <div
                  key={todo.id}
                  className={`bg-base-200 rounded-lg p-3 flex items-center gap-3 ${
                    todo.completed ? 'opacity-60' : ''
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="checkbox checkbox-accent checkbox-sm"
                  />
                  <span
                    className={`text-sm flex-1 ${todo.completed ? 'line-through text-base-content/50' : ''}`}
                  >
                    {todo.title}
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {/* Type interface display */}
      <div className="mt-4 grid md:grid-cols-3 gap-3">
        <div
          className={`card p-3 ${resourceType === 'users' ? 'bg-primary/20 border border-primary/30' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold text-primary mb-1">User Type</div>
          <pre className="font-mono text-[10px]">
            <code>{`interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}`}</code>
          </pre>
        </div>
        <div
          className={`card p-3 ${resourceType === 'posts' ? 'bg-secondary/20 border border-secondary/30' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold text-secondary mb-1">Post Type</div>
          <pre className="font-mono text-[10px]">
            <code>{`interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}`}</code>
          </pre>
        </div>
        <div
          className={`card p-3 ${resourceType === 'todos' ? 'bg-accent/20 border border-accent/30' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold text-accent mb-1">Todo Type</div>
          <pre className="font-mono text-[10px]">
            <code>{`interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

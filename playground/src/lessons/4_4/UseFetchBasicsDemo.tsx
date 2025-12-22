// ============================================
// Demo: Why useFetch?
// Shows the problem of repetitive fetch code
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiX, HiCheck } from 'react-icons/hi';

export default function UseFetchBasicsDemo(): React.ReactElement {
  const [showBefore, setShowBefore] = useState(true);

  const beforeCode = `// Component A: Fetch users
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed');
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  // ... render logic
}

// Component B: Fetch posts (same pattern!)
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed');
        setPosts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  // ... render logic
}`;

  const afterCode = `// The useFetch hook (defined once)
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed');
        setData(await res.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Component A: Clean and simple!
function UserList() {
  const { data: users, loading, error } = useFetch<User[]>('/api/users');
  // ... render logic
}

// Component B: Same simplicity!
function PostList() {
  const { data: posts, loading, error } = useFetch<Post[]>('/api/posts');
  // ... render logic
}`;

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        The Problem: Repetitive Fetch Code
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        Without a custom hook, you end up writing the same loading/error/data pattern in every
        component that fetches data. Let's see the difference:
      </p>

      {/* Toggle buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setShowBefore(true)}
          className={`btn btn-sm flex items-center gap-2 ${showBefore ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} />
          Before (Repetitive)
        </button>
        <button
          onClick={() => setShowBefore(false)}
          className={`btn btn-sm flex items-center gap-2 ${!showBefore ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          After (useFetch)
        </button>
      </div>

      {/* Code comparison */}
      <div className="card bg-base-300 p-4">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-xs font-semibold ${showBefore ? 'text-error' : 'text-success'}`}
          >
            {showBefore ? '❌ Same code repeated in every component' : '✅ Logic extracted into reusable hook'}
          </span>
          <span className="text-xs text-base-content/60">
            {showBefore ? '~50 lines per component' : '~5 lines per component'}
          </span>
        </div>
        <pre className="font-mono text-xs overflow-x-auto max-h-[400px]">
          <code>{showBefore ? beforeCode : afterCode}</code>
        </pre>
      </div>

      {/* Benefits summary */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-primary">🔄</div>
          <div className="text-xs font-semibold">Reusable</div>
          <div className="text-xs text-base-content/60">Write once, use everywhere</div>
        </div>
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-secondary">🧪</div>
          <div className="text-xs font-semibold">Testable</div>
          <div className="text-xs text-base-content/60">Test the hook in isolation</div>
        </div>
        <div className="card bg-base-300 p-3 text-center">
          <div className="text-2xl mb-1 text-accent">📦</div>
          <div className="text-xs font-semibold">Consistent</div>
          <div className="text-xs text-base-content/60">Same behavior everywhere</div>
        </div>
      </div>
    </div>
  );
}


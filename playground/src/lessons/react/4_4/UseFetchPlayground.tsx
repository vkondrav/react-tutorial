// ============================================
// Playground: useFetch in Action
// Interactive demos with different endpoints
// ============================================

import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import {
  HiOutlineRefresh,
  HiOutlineSearch,
  HiOutlinePhotograph,
  HiOutlineChat,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import useFetchSignatureCode from './examples/UseFetchSignature.tsx?raw';

// ============================================
// Generic useFetch Hook (Production Ready)
// ============================================
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseFetchOptions {
  enabled?: boolean;
}

function useFetch<T>(url: string, options: UseFetchOptions = {}): UseFetchResult<T> {
  const { enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

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
  }, [url, refetchIndex, enabled]);

  return { data, loading, error, refetch };
}

// ============================================
// Types
// ============================================
interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

interface Photo {
  id: number;
  albumId: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ============================================
// Demo 1: User Search
// ============================================
function UserSearchDemo(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const {
    data: users,
    loading,
    error,
    refetch,
  } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  const filteredUsers = users?.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            size={18}
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            placeholder="Search users by name or email..."
            className="input input-bordered w-full pl-10"
          />
        </div>
        <button onClick={refetch} disabled={loading} className="btn btn-outline btn-primary">
          <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={18} />
        </button>
      </div>

      <div className="min-h-[150px]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-md text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-error">
            <HiOutlineExclamationCircle size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : filteredUsers?.length === 0 ? (
          <div className="text-center py-8 text-base-content/60">
            <p>No users found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers?.slice(0, 4).map((user) => (
              <div key={user.id} className="bg-base-300 rounded-lg p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm">{user.name}</div>
                  <div className="text-xs text-base-content/60">{user.email}</div>
                </div>
                <div className="text-xs text-base-content/50">{user.phone}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Demo 2: Photo Gallery
// ============================================
function PhotoGalleryDemo(): React.ReactElement {
  const [albumId, setAlbumId] = useState(1);
  const {
    data: photos,
    loading,
    error,
    refetch,
  } = useFetch<Photo[]>(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=6`);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-base-content/70">Album:</span>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setAlbumId(id)}
              className={`btn btn-sm btn-circle ${albumId === id ? 'btn-primary' : 'btn-ghost'}`}
            >
              {id}
            </button>
          ))}
        </div>
        <button onClick={refetch} disabled={loading} className="btn btn-sm btn-ghost ml-auto">
          <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={16} />
        </button>
      </div>

      <div className="min-h-[180px]">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-md text-secondary" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-error">
            <HiOutlineExclamationCircle size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {photos?.map((photo) => (
              <div key={photo.id} className="relative group aspect-square">
                <img
                  src={`https://picsum.photos/seed/${photo.id}/150`}
                  alt={photo.title}
                  className="w-full h-full object-cover rounded-lg bg-base-300"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-2">
                  <span className="text-[10px] text-white text-center line-clamp-3">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Demo 3: Post Comments
// ============================================
function CommentsDemo(): React.ReactElement {
  const [postId, setPostId] = useState<number | null>(null);
  const {
    data: comments,
    loading,
    error,
    refetch,
  } = useFetch<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${postId}&_limit=5`,
    { enabled: postId !== null }
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm text-base-content/70">Select post:</span>
        <div className="flex gap-1 flex-wrap">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setPostId(postId === id ? null : id)}
              className={`btn btn-sm ${postId === id ? 'btn-accent' : 'btn-ghost'}`}
            >
              Post {id}
            </button>
          ))}
        </div>
        {postId !== null && (
          <button onClick={refetch} disabled={loading} className="btn btn-sm btn-ghost ml-auto">
            <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={16} />
          </button>
        )}
      </div>

      <div className="min-h-[180px]">
        {postId === null ? (
          <div className="text-center py-8 text-base-content/60">
            <HiOutlineChat size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Select a post to load comments</p>
            <p className="text-xs text-base-content/40 mt-1">
              Note: useFetch has <code className="text-accent">enabled: false</code> until a post is
              selected
            </p>
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-md text-accent" />
          </div>
        ) : error ? (
          <div className="text-center py-8 text-error">
            <HiOutlineExclamationCircle size={32} className="mx-auto mb-2" />
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[200px] overflow-y-auto">
            {comments?.map((comment) => (
              <div key={comment.id} className="bg-base-300 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-xs text-accent">{comment.name}</span>
                  <span className="text-[10px] text-base-content/50">{comment.email}</span>
                </div>
                <p className="text-xs text-base-content/70 line-clamp-2">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================
// Demo 4: Error Simulation
// ============================================
function ErrorSimulationDemo(): React.ReactElement {
  const [shouldError, setShouldError] = useState(false);
  const url = shouldError
    ? 'https://jsonplaceholder.typicode.com/invalid-endpoint'
    : 'https://jsonplaceholder.typicode.com/users?_limit=3';

  const { data: users, loading, error, refetch } = useFetch<User[]>(url);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <label className="label cursor-pointer gap-2">
          <span className="text-sm text-base-content/70">Simulate error:</span>
          <input
            type="checkbox"
            checked={shouldError}
            onChange={(e) => setShouldError(e.target.checked)}
            className="toggle toggle-error toggle-sm"
          />
        </label>
        <button onClick={refetch} disabled={loading} className="btn btn-sm btn-ghost ml-auto">
          <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={16} />
        </button>
      </div>

      <div className="card bg-base-300 p-3 min-h-[120px]">
        {loading ? (
          <div className="flex items-center justify-center h-full py-6">
            <div className="loading loading-spinner loading-md text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-4">
            <div className="text-error text-3xl mb-2">⚠️</div>
            <p className="text-error font-semibold text-sm mb-1">Error caught!</p>
            <p className="text-xs text-base-content/60">{error}</p>
            <button onClick={refetch} className="btn btn-sm btn-error mt-3">
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {users?.map((user) => (
              <div key={user.id} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-sm">{user.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="text-xs text-base-content/50">
        URL:{' '}
        <code className={shouldError ? 'text-error' : 'text-success'}>
          {url.replace('https://jsonplaceholder.typicode.com', '...')}
        </code>
      </div>
    </div>
  );
}

// ============================================
// Main Playground Component
// ============================================
type DemoTab = 'search' | 'gallery' | 'comments' | 'error';

const tabs: { id: DemoTab; label: string; icon: React.ReactNode }[] = [
  { id: 'search', label: 'User Search', icon: <HiOutlineSearch size={16} /> },
  { id: 'gallery', label: 'Photo Gallery', icon: <HiOutlinePhotograph size={16} /> },
  { id: 'comments', label: 'Comments', icon: <HiOutlineChat size={16} /> },
  { id: 'error', label: 'Error Handling', icon: <HiOutlineExclamationCircle size={16} /> },
];

export default function UseFetchPlayground(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<DemoTab>('search');

  return (
    <div className="card bg-base-200 p-5">
      {/* Tab navigation */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm flex items-center gap-2 ${
              activeTab === tab.id ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="card bg-base-300 p-4">
        {activeTab === 'search' && <UserSearchDemo />}
        {activeTab === 'gallery' && <PhotoGalleryDemo />}
        {activeTab === 'comments' && <CommentsDemo />}
        {activeTab === 'error' && <ErrorSimulationDemo />}
      </div>

      {/* Hook signature reminder */}
      <div className="mt-4 pt-4 border-t border-base-content/10">
        <CodeSnippet code={useFetchSignatureCode} language="tsx" title="Hook Signature" />
      </div>
    </div>
  );
}

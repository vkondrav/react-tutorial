// ============================================
// Playground: Data Fetching Scenarios
// Interactive demos for common fetching patterns
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlineSearch,
  HiOutlinePhotograph,
  HiOutlineDocumentText,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';
import pollingPatternCode from './examples/PollingPattern.tsx?raw';

// Types
interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
  url: string;
}

interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

export default function FetchPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<'search' | 'photos' | 'comments' | 'refresh'>(
    'search'
  );

  const demos = [
    { id: 'search' as const, label: 'Search', icon: HiOutlineSearch },
    { id: 'photos' as const, label: 'Photos', icon: HiOutlinePhotograph },
    { id: 'comments' as const, label: 'Comments', icon: HiOutlineDocumentText },
    { id: 'refresh' as const, label: 'Auto-Refresh', icon: HiOutlineRefresh },
  ];

  return (
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
      {activeDemo === 'search' && <SearchDemo />}
      {activeDemo === 'photos' && <PhotosDemo />}
      {activeDemo === 'comments' && <CommentsDemo />}
      {activeDemo === 'refresh' && <AutoRefreshDemo />}
    </div>
  );
}

// ============================================
// Demo 1: Search with Debounced Fetch
// ============================================
function SearchDemo(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);

  // Derive loading state from query mismatch (no setState needed!)
  const loading = query !== appliedQuery;

  // Fetch all todos once on mount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((data) => setAllTodos(data.slice(0, 50))); // First 50
  }, []);

  // Filter locally based on query (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim() === '') {
        setTodos(allTodos.slice(0, 10));
      } else {
        const filtered = allTodos.filter((todo) =>
          todo.title.toLowerCase().includes(query.toLowerCase())
        );
        setTodos(filtered.slice(0, 10));
      }
      setAppliedQuery(query); // Mark query as applied
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, allTodos]);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineSearch className="text-primary" size={18} />
        Search Todos (Debounced)
      </h4>

      <div className="relative mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search todos..."
          className="input input-bordered w-full pl-10"
        />
        <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="loading loading-spinner loading-sm text-primary" />
          </div>
        )}
      </div>

      <div className="bg-base-300 rounded-lg p-3 max-h-64 overflow-auto">
        {todos.length === 0 ? (
          <div className="text-center py-4 text-base-content/50">
            {query ? 'No results found' : 'Loading todos...'}
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div key={todo.id} className="flex items-center gap-3 p-2 bg-base-200 rounded">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  readOnly
                  className="checkbox checkbox-sm checkbox-primary"
                />
                <span
                  className={`text-sm ${todo.completed ? 'line-through text-base-content/50' : ''}`}
                >
                  {todo.title}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <p className="text-xs text-base-content/60 mt-2">
        Try typing to filter todos. Search is debounced by 300ms.
      </p>
    </div>
  );
}

// ============================================
// Demo 2: Photos Gallery
// ============================================
function PhotosDemo(): React.ReactElement {
  const [albumId, setAlbumId] = useState(1);
  const [fetchedAlbumId, setFetchedAlbumId] = useState(0);
  const [photos, setPhotos] = useState<Photo[]>([]);

  // Derive loading from whether current albumId has been fetched
  const loading = albumId !== fetchedAlbumId;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${albumId}&_limit=8`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setPhotos(data);
        setFetchedAlbumId(albumId);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [albumId]);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlinePhotograph className="text-primary" size={18} />
        Photo Albums
      </h4>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[1, 2, 3, 4, 5].map((id) => (
          <button
            key={id}
            onClick={() => setAlbumId(id)}
            className={`btn btn-sm ${albumId === id ? 'btn-primary' : 'btn-outline'}`}
          >
            Album {id}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2">
          {photos.map((photo) => (
            <div key={photo.id} className="aspect-square relative group">
              <img
                src={`https://picsum.photos/seed/${photo.id}/150`}
                alt={photo.title}
                className="w-full h-full object-cover rounded-lg bg-base-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center p-2">
                <span className="text-white text-xs text-center line-clamp-3">{photo.title}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Demo 3: Comments (Nested Data)
// ============================================
function CommentsDemo(): React.ReactElement {
  const [postId, setPostId] = useState(1);
  const [fetchedPostId, setFetchedPostId] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);

  // Derive loading from whether current postId has been fetched
  const loading = postId !== fetchedPostId;

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data);
        setFetchedPostId(postId);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') console.error(err);
      });

    return () => controller.abort();
  }, [postId]);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineDocumentText className="text-primary" size={18} />
        Post Comments
      </h4>

      <div className="flex gap-2 mb-4">
        <label className="text-sm text-base-content/70">Post:</label>
        <select
          value={postId}
          onChange={(e) => setPostId(Number(e.target.value))}
          className="select select-sm select-bordered"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((id) => (
            <option key={id} value={id}>
              Post #{id}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="loading loading-spinner loading-lg text-primary" />
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-auto">
          {comments.map((comment) => (
            <div key={comment.id} className="card bg-base-300 p-3">
              <div className="flex justify-between items-start mb-2">
                <div className="font-semibold text-sm text-primary">{comment.name}</div>
                <div className="text-xs text-base-content/50">{comment.email}</div>
              </div>
              <p className="text-sm text-base-content/70 line-clamp-2">{comment.body}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ============================================
// Demo 4: Auto-Refresh (Polling)
// ============================================
function AutoRefreshDemo(): React.ReactElement {
  const [isPolling, setIsPolling] = useState(false);
  const [interval, setIntervalValue] = useState(3000);
  const [lastFetch, setLastFetch] = useState<Date | null>(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [randomTodo, setRandomTodo] = useState<Todo | null>(null);

  useEffect(() => {
    if (!isPolling) return;

    const fetchRandom = async () => {
      const randomId = Math.floor(Math.random() * 200) + 1;
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${randomId}`);
        const data = await res.json();
        setRandomTodo(data);
        setLastFetch(new Date());
        setFetchCount((c) => c + 1);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch immediately
    fetchRandom();

    // Then set up polling
    const timer = setInterval(fetchRandom, interval);

    return () => clearInterval(timer);
  }, [isPolling, interval]);

  return (
    <div>
      <h4 className="font-semibold mb-3 flex items-center gap-2">
        <HiOutlineRefresh className="text-primary" size={18} />
        Auto-Refresh (Polling)
      </h4>

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
            onChange={(e) => setIntervalValue(Number(e.target.value))}
            className="select select-sm select-bordered"
            disabled={isPolling}
          >
            <option value={1000}>1s</option>
            <option value={2000}>2s</option>
            <option value={3000}>3s</option>
            <option value={5000}>5s</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Status */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Status</div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Polling:</span>
              <span className={isPolling ? 'text-success' : 'text-error'}>
                {isPolling ? 'Active' : 'Stopped'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Fetch Count:</span>
              <span className="text-primary font-bold">{fetchCount}</span>
            </div>
            <div className="flex justify-between">
              <span>Last Fetch:</span>
              <span className="text-xs">{lastFetch?.toLocaleTimeString() || 'Never'}</span>
            </div>
          </div>
        </div>

        {/* Current Data */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Random Todo</div>
          {randomTodo ? (
            <div>
              <div className="font-semibold text-primary mb-1">#{randomTodo.id}</div>
              <p className="text-sm text-base-content/70 line-clamp-2">{randomTodo.title}</p>
              <div className="mt-2">
                <span
                  className={`badge ${randomTodo.completed ? 'badge-success' : 'badge-warning'}`}
                >
                  {randomTodo.completed ? 'Completed' : 'Pending'}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-base-content/50 text-sm">Start polling to fetch data</div>
          )}
        </div>
      </div>

      <CodeSnippet title="Polling Pattern" language="tsx" code={pollingPatternCode} />
    </div>
  );
}

// ============================================
// Common Use Cases Demo
// Shows practical render prop patterns
// ============================================

import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import mouseCode from './examples/MouseTracking.tsx?raw';
import fetchCode from './examples/FetchComponent.tsx?raw';

// ---- Mouse Position Tracker ----
interface MousePosition {
  x: number;
  y: number;
}

interface MouseProps {
  children: (position: MousePosition) => ReactNode;
}

function Mouse({ children }: MouseProps) {
  const [position, setPosition] = useState<MousePosition>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setPosition({
        x: Math.round(e.clientX - rect.left),
        y: Math.round(e.clientY - rect.top),
      });
    }
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="relative">
      {children(position)}
    </div>
  );
}

// ---- Data Fetcher ----
interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface FetchProps<T> {
  url: string;
  children: (state: FetchState<T> & { refetch: () => void }) => ReactNode;
}

function Fetch<T>({ url, children }: FetchProps<T>) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      setState({ data: null, loading: false, error: err as Error });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return <>{children({ ...state, refetch: fetchData })}</>;
}

// ---- List with Selection ----
interface ListItem {
  id: number;
  text: string;
}

interface SelectableListProps {
  items: ListItem[];
  children: (selected: number | null, select: (id: number) => void, items: ListItem[]) => ReactNode;
}

function SelectableList({ items, children }: SelectableListProps) {
  const [selected, setSelected] = useState<number | null>(null);

  return <>{children(selected, setSelected, items)}</>;
}

export default function CommonUseCasesDemo() {
  const [activeTab, setActiveTab] = useState<'mouse' | 'fetch' | 'list'>('mouse');

  const listItems: ListItem[] = [
    { id: 1, text: 'First item' },
    { id: 2, text: 'Second item' },
    { id: 3, text: 'Third item' },
    { id: 4, text: 'Fourth item' },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTab('mouse')}
          className={`btn btn-sm ${activeTab === 'mouse' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Mouse Tracking
        </button>
        <button
          onClick={() => setActiveTab('fetch')}
          className={`btn btn-sm ${activeTab === 'fetch' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Data Fetching
        </button>
        <button
          onClick={() => setActiveTab('list')}
          className={`btn btn-sm ${activeTab === 'list' ? 'btn-primary' : 'btn-ghost'}`}
        >
          List Selection
        </button>
      </div>

      {/* Mouse Tracking */}
      {activeTab === 'mouse' && (
        <div className="space-y-4">
          <CodeSnippet title="Mouse tracking component" language="tsx" code={mouseCode} />

          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Live Demo: Move your mouse!</h4>

            <Mouse>
              {({ x, y }) => (
                <div className="h-48 bg-base-300 rounded-lg relative overflow-hidden cursor-crosshair">
                  {/* Coordinates display */}
                  <div className="absolute top-2 left-2 text-xs font-mono bg-base-100 px-2 py-1 rounded">
                    x: {x}, y: {y}
                  </div>

                  {/* Follower dot */}
                  <div
                    className="absolute w-4 h-4 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-75"
                    style={{ left: x, top: y }}
                  />

                  {/* Crosshairs */}
                  <div
                    className="absolute h-full w-px bg-primary/30 pointer-events-none"
                    style={{ left: x }}
                  />
                  <div
                    className="absolute w-full h-px bg-primary/30 pointer-events-none"
                    style={{ top: y }}
                  />

                  <p className="absolute bottom-2 right-2 text-xs text-base-content/50">
                    Move mouse here
                  </p>
                </div>
              )}
            </Mouse>
          </div>
        </div>
      )}

      {/* Data Fetching */}
      {activeTab === 'fetch' && (
        <div className="space-y-4">
          <CodeSnippet title="Fetch component" language="tsx" code={fetchCode} />

          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Live Demo: Fetch Users</h4>

            <Fetch<
              { id: number; name: string; email: string }[]
            > url="https://jsonplaceholder.typicode.com/users?_limit=3">
              {({ data, loading, error, refetch }) => (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-base-content/60">
                      {loading ? 'Loading...' : `${data?.length ?? 0} users`}
                    </span>
                    <button onClick={refetch} disabled={loading} className="btn btn-xs btn-ghost">
                      <HiOutlineRefresh className={loading ? 'animate-spin' : ''} />
                      Refetch
                    </button>
                  </div>

                  {loading && (
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="animate-pulse flex gap-3 items-center">
                          <div className="w-10 h-10 bg-base-300 rounded-full" />
                          <div className="flex-1 space-y-1">
                            <div className="h-4 bg-base-300 rounded w-1/3" />
                            <div className="h-3 bg-base-300 rounded w-1/2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {error && <div className="text-error text-sm">Error: {error.message}</div>}

                  {data && (
                    <div className="space-y-2">
                      {data.map((user) => (
                        <div
                          key={user.id}
                          className="flex gap-3 items-center p-2 bg-base-300 rounded-lg"
                        >
                          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-content font-bold">
                            {user.name[0]}
                          </div>
                          <div>
                            <p className="font-medium text-sm">{user.name}</p>
                            <p className="text-xs text-base-content/60">{user.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Fetch>
          </div>
        </div>
      )}

      {/* List Selection */}
      {activeTab === 'list' && (
        <div className="space-y-4">
          <div className="card bg-base-200 p-4">
            <h4 className="font-semibold mb-3">Live Demo: Selectable List</h4>
            <p className="text-sm text-base-content/70 mb-4">
              Same selection logic, completely different UIs:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Style 1: Buttons */}
              <div className="card bg-base-300 p-3">
                <p className="text-xs text-base-content/60 mb-2">As Buttons</p>
                <SelectableList items={listItems}>
                  {(selected, select, items) => (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => select(item.id)}
                          className={`btn btn-sm ${
                            selected === item.id ? 'btn-primary' : 'btn-ghost'
                          }`}
                        >
                          {item.text}
                        </button>
                      ))}
                    </div>
                  )}
                </SelectableList>
              </div>

              {/* Style 2: Cards */}
              <div className="card bg-base-300 p-3">
                <p className="text-xs text-base-content/60 mb-2">As Cards</p>
                <SelectableList items={listItems}>
                  {(selected, select, items) => (
                    <div className="space-y-1">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => select(item.id)}
                          className={`p-2 rounded cursor-pointer transition-colors ${
                            selected === item.id
                              ? 'bg-primary text-primary-content'
                              : 'hover:bg-base-200'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-2 h-2 rounded-full ${
                                selected === item.id ? 'bg-primary-content' : 'bg-base-content/30'
                              }`}
                            />
                            {item.text}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </SelectableList>
              </div>

              {/* Style 3: Radio-like */}
              <div className="card bg-base-300 p-3">
                <p className="text-xs text-base-content/60 mb-2">As Radio Options</p>
                <SelectableList items={listItems}>
                  {(selected, select, items) => (
                    <div className="space-y-1">
                      {items.map((item) => (
                        <label
                          key={item.id}
                          className="flex items-center gap-2 p-2 cursor-pointer hover:bg-base-200 rounded"
                        >
                          <input
                            type="radio"
                            className="radio radio-primary radio-sm"
                            checked={selected === item.id}
                            onChange={() => select(item.id)}
                          />
                          <span className="text-sm">{item.text}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </SelectableList>
              </div>

              {/* Style 4: Tags */}
              <div className="card bg-base-300 p-3">
                <p className="text-xs text-base-content/60 mb-2">As Tags</p>
                <SelectableList items={listItems}>
                  {(selected, select, items) => (
                    <div className="flex flex-wrap gap-2">
                      {items.map((item) => (
                        <span
                          key={item.id}
                          onClick={() => select(item.id)}
                          className={`badge cursor-pointer ${
                            selected === item.id
                              ? 'badge-primary'
                              : 'badge-ghost hover:badge-outline'
                          }`}
                        >
                          {selected === item.id && '✓ '}
                          {item.text}
                        </span>
                      ))}
                    </div>
                  )}
                </SelectableList>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

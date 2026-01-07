// ============================================
// Playground: Performance Optimization
// ============================================

import { useState, useMemo, useCallback, memo } from 'react';
import { HiOutlineLightBulb, HiOutlineSearch, HiX, HiPlus } from 'react-icons/hi';

type DemoTab = 'filter' | 'search' | 'todo';

export default function PerformancePlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<DemoTab>('filter');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Try It Yourself
      </h3>

      {/* Tab buttons */}
      <div className="flex gap-2 mb-4">
        {[
          { id: 'filter' as const, label: 'List Filter' },
          { id: 'search' as const, label: 'Search' },
          { id: 'todo' as const, label: 'Todo List' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveDemo(tab.id)}
            className={`btn btn-sm ${activeDemo === tab.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="min-h-[350px]">
        {activeDemo === 'filter' && <ListFilterDemo />}
        {activeDemo === 'search' && <SearchDemo />}
        {activeDemo === 'todo' && <TodoDemo />}
      </div>
    </div>
  );
}

// ============================================
// Demo 1: List Filtering with useMemo
// ============================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

function ListFilterDemo(): React.ReactElement {
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [count, setCount] = useState(0);
  const [useMemoEnabled, setUseMemoEnabled] = useState(true);

  // Generate fake products (deterministic based on index)
  const products = useMemo<Product[]>(
    () =>
      Array.from({ length: 500 }, (_, i) => ({
        id: i,
        name: `Product ${i + 1}`,
        category: ['Electronics', 'Clothing', 'Books', 'Food'][i % 4],
        price: 10 + ((i * 7 + 13) % 200),
        inStock: i % 10 !== 3,
      })),
    []
  );

  // With useMemo - expensive operation memoized
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filter !== 'all') {
      result = result.filter((p) => p.category === filter);
    }

    result.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price') return a.price - b.price;
      return 0;
    });

    // Artificial slowdown to demonstrate
    if (!useMemoEnabled) {
      for (let i = 0; i < 1000000; i++) {
        Math.sqrt(i);
      }
    }

    return result;
  }, [filter, sortBy, products, useMemoEnabled]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div>
          <label className="text-xs text-base-content/60 block mb-1">Category</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="all">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
            <option value="Food">Food</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-base-content/60 block mb-1">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-bordered select-sm"
          >
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>

        <button
          onClick={() => setUseMemoEnabled((m) => !m)}
          className={`btn btn-sm ${useMemoEnabled ? 'btn-success' : 'btn-error'}`}
        >
          {useMemoEnabled ? '✓ useMemo ON' : '✗ useMemo OFF'}
        </button>

        <button onClick={() => setCount((c) => c + 1)} className="btn btn-sm btn-outline">
          Trigger Re-render ({count})
        </button>
      </div>

      <div className="bg-base-300 rounded-lg p-3">
        <div className="text-sm text-base-content/70 mb-2">
          Showing {filteredProducts?.length || 0} of {products.length} products
        </div>
        <div className="h-40 overflow-auto">
          {filteredProducts?.slice(0, 20).map((p) => (
            <div
              key={p.id}
              className="flex justify-between py-1 border-b border-base-content/10 text-sm"
            >
              <span>{p.name}</span>
              <span className="text-primary">${p.price}</span>
            </div>
          ))}
          {filteredProducts && filteredProducts.length > 20 && (
            <div className="text-center text-xs text-base-content/50 py-2">
              ... and {filteredProducts.length - 20} more
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-base-content/60">
        Click "Trigger Re-render" and feel the lag with useMemo OFF vs ON.
      </p>
    </div>
  );
}

// ============================================
// Demo 2: Search with Callback Stability
// ============================================

// Module-level counter for search calls
let searchCallCount = 0;
let searchStatsRenderCount = 0;

interface SearchItem {
  id: number;
  title: string;
}

function SearchDemo(): React.ReactElement {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);
  const [, forceUpdate] = useState(0);

  // Simulate search results
  const allItems = useMemo<SearchItem[]>(
    () =>
      Array.from({ length: 100 }, (_, i) => ({
        id: i,
        title: `Item ${i + 1}: ${['React', 'JavaScript', 'TypeScript', 'CSS', 'HTML'][i % 5]} ${['Tutorial', 'Guide', 'Course', 'Book', 'Video'][i % 5]}`,
      })),
    []
  );

  // Search function with useCallback
  const performSearch = useCallback((q: string): void => {
    searchCallCount++;
    setDebouncedQuery(q);
  }, []);

  // Without useCallback - new function every render
  const performSearchNoCallback = (q: string): void => {
    searchCallCount++;
    setDebouncedQuery(q);
  };

  const searchFn = useCallbackEnabled ? performSearch : performSearchNoCallback;

  // Filter results
  const results = useMemo(() => {
    if (!debouncedQuery) return allItems;
    return allItems.filter((item) =>
      item.title.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  }, [debouncedQuery, allItems]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-end">
        <div className="flex-1">
          <label className="text-xs text-base-content/60 block mb-1">Search</label>
          <div className="relative">
            <HiOutlineSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                searchFn(e.target.value);
                forceUpdate((n) => n + 1);
              }}
              placeholder="Search items..."
              className="input input-bordered w-full pl-10"
            />
          </div>
        </div>

        <button
          onClick={() => setUseCallbackEnabled((u) => !u)}
          className={`btn btn-sm ${useCallbackEnabled ? 'btn-success' : 'btn-error'}`}
        >
          {useCallbackEnabled ? '✓ useCallback ON' : '✗ useCallback OFF'}
        </button>
      </div>

      <div className="flex justify-between text-sm">
        <span className="text-base-content/60">
          Found {results.length} result{results.length !== 1 && 's'}
        </span>
        <span className="text-base-content/60">
          Search calls: <span className="font-mono text-warning">{searchCallCount}</span>
        </span>
      </div>

      <div className="bg-base-300 rounded-lg p-3 h-48 overflow-auto">
        {results.slice(0, 15).map((item) => (
          <div key={item.id} className="py-1 border-b border-base-content/10 text-sm">
            {item.title}
          </div>
        ))}
      </div>

      <MemoizedSearchStats searchFn={searchFn} />

      <button
        onClick={() => {
          searchCallCount = 0;
          searchStatsRenderCount = 0;
          forceUpdate((n) => n + 1);
        }}
        className="btn btn-ghost btn-xs"
      >
        Reset Counts
      </button>
    </div>
  );
}

// Child component that receives the search function
interface MemoizedSearchStatsProps {
  searchFn: (q: string) => void;
}

const MemoizedSearchStats = memo(function MemoizedSearchStats({
  searchFn,
}: MemoizedSearchStatsProps): React.ReactElement {
  searchStatsRenderCount++;

  // We use searchFn in the comparison - when it changes, this component re-renders
  const fnType = typeof searchFn;

  return (
    <div className="bg-base-300 rounded-lg p-3 text-sm">
      <span className="text-base-content/60">MemoizedSearchStats renders:</span>{' '}
      <span className={`font-mono ${searchStatsRenderCount > 3 ? 'text-error' : 'text-success'}`}>
        {searchStatsRenderCount}
      </span>
      <span className="text-xs text-base-content/50 ml-2">
        (receives {fnType}, should stay low with useCallback ON)
      </span>
    </div>
  );
});

// ============================================
// Demo 3: Todo List with Optimized Callbacks
// ============================================

// Module-level render counters for todo items
const todoRenderCounts = new Map<number, number>();

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function TodoDemo(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Learn useMemo', done: true },
    { id: 2, text: 'Learn useCallback', done: false },
    { id: 3, text: 'Build something cool', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [useCallbackEnabled, setUseCallbackEnabled] = useState(true);
  const [, forceUpdate] = useState(0);

  // Memoized callbacks
  const addTodoMemo = useCallback(() => {
    if (!newTodo.trim()) return;
    setTodos((t) => [...t, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  }, [newTodo]);

  const toggleTodoMemo = useCallback((id: number) => {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  }, []);

  const deleteTodoMemo = useCallback((id: number) => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  }, []);

  // Non-memoized callbacks
  const addTodoNoMemo = (): void => {
    if (!newTodo.trim()) return;
    setTodos((t) => [...t, { id: Date.now(), text: newTodo, done: false }]);
    setNewTodo('');
  };

  const toggleTodoNoMemo = (id: number): void => {
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const deleteTodoNoMemo = (id: number): void => {
    setTodos((t) => t.filter((todo) => todo.id !== id));
  };

  const toggleTodo = useCallbackEnabled ? toggleTodoMemo : toggleTodoNoMemo;
  const deleteTodo = useCallbackEnabled ? deleteTodoMemo : deleteTodoNoMemo;
  const addTodo = useCallbackEnabled ? addTodoMemo : addTodoNoMemo;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a todo..."
          className="input input-bordered flex-1"
        />
        <button onClick={addTodo} className="btn btn-primary">
          <HiPlus size={20} />
        </button>
        <button
          onClick={() => setUseCallbackEnabled((u) => !u)}
          className={`btn ${useCallbackEnabled ? 'btn-success' : 'btn-error'}`}
        >
          {useCallbackEnabled ? '✓' : '✗'}
        </button>
      </div>

      <div className="space-y-2">
        {todos.map((todo) => (
          <MemoizedTodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            renderCounts={todoRenderCounts}
          />
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-xs text-base-content/60">
          Each TodoItem is memoized. Watch render counts when toggling/adding todos.
        </p>
        <button
          onClick={() => {
            todoRenderCounts.clear();
            forceUpdate((n) => n + 1);
          }}
          className="btn btn-ghost btn-xs"
        >
          Reset Counts
        </button>
      </div>
    </div>
  );
}

// Memoized Todo Item
interface MemoizedTodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  renderCounts: Map<number, number>;
}

const MemoizedTodoItem = memo(function MemoizedTodoItem({
  todo,
  onToggle,
  onDelete,
  renderCounts,
}: MemoizedTodoItemProps): React.ReactElement {
  // Increment render count for this todo
  const currentCount = (renderCounts.get(todo.id) || 0) + 1;
  renderCounts.set(todo.id, currentCount);

  return (
    <div className="flex items-center gap-3 bg-base-300 rounded-lg p-3">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
        className="checkbox checkbox-primary"
      />
      <span className={`flex-1 ${todo.done ? 'line-through text-base-content/50' : ''}`}>
        {todo.text}
      </span>
      <span className="text-xs text-base-content/50">renders: {currentCount}</span>
      <button onClick={() => onDelete(todo.id)} className="btn btn-ghost btn-sm btn-square">
        <HiX size={16} />
      </button>
    </div>
  );
});

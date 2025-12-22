// ============================================
// Demo: Mutations & Cache Updates
// Shows useMutation with cache invalidation
// ============================================

import { useState } from 'react';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import {
  HiOutlinePencilAlt,
  HiOutlinePlus,
  HiOutlineTrash,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';
import mutationPatternCode from './examples/MutationPattern.tsx?raw';

// Create a client for this demo
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000, // 1 minute
      retry: 1,
    },
  },
});

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

// Local state to simulate server
let localTodos: Todo[] = [
  { id: 1, title: 'Learn TanStack Query basics', completed: true },
  { id: 2, title: 'Understand mutations', completed: false },
  { id: 3, title: 'Practice cache invalidation', completed: false },
];

// Simulated API functions
const fetchTodos = async (): Promise<Todo[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return [...localTodos];
};

const addTodo = async (title: string): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  const newTodo: Todo = {
    id: Date.now(),
    title,
    completed: false,
  };
  localTodos = [...localTodos, newTodo];
  return newTodo;
};

const toggleTodo = async (id: number): Promise<Todo> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  const todo = localTodos.find((t) => t.id === id);
  if (!todo) throw new Error('Todo not found');
  todo.completed = !todo.completed;
  return { ...todo };
};

const deleteTodo = async (id: number): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 200));
  localTodos = localTodos.filter((t) => t.id !== id);
};

function MutationsContent(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const queryClientInstance = useQueryClient();

  // Query for fetching todos
  const {
    data: todos = [],
    isLoading,
    isFetching,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // Add todo mutation
  const addMutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      // Invalidate and refetch todos after adding
      queryClientInstance.invalidateQueries({ queryKey: ['todos'] });
      setNewTodoTitle('');
    },
  });

  // Toggle todo mutation
  const toggleMutation = useMutation({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Delete todo mutation
  const deleteMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClientInstance.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim()) {
      addMutation.mutate(newTodoTitle.trim());
    }
  };

  const isPending = addMutation.isPending || toggleMutation.isPending || deleteMutation.isPending;

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlinePencilAlt className="text-primary" size={20} />
        Mutations with Cache Invalidation
      </h3>

      <p className="text-sm text-base-content/70 mb-4">
        <code>useMutation</code> handles create, update, and delete operations. After success,{' '}
        <code>invalidateQueries</code> marks cached data as stale and triggers a refetch.
      </p>

      {/* Add todo form */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="input input-bordered flex-1"
          disabled={addMutation.isPending}
        />
        <button
          type="submit"
          className="btn btn-primary"
          disabled={addMutation.isPending || !newTodoTitle.trim()}
        >
          {addMutation.isPending ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <HiOutlinePlus size={20} />
          )}
          Add
        </button>
      </form>

      {/* Todos list */}
      <div className="card bg-base-300 p-4 mb-4 relative">
        {(isFetching || isPending) && (
          <div className="absolute top-2 right-2">
            <span className="loading loading-spinner loading-sm text-primary" />
          </div>
        )}
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <div className="loading loading-spinner loading-lg text-primary" />
            <span className="ml-3 text-base-content/70">Loading todos...</span>
          </div>
        ) : todos.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">No todos yet. Add one above!</div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between p-3 bg-base-200 rounded-lg group"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleMutation.mutate(todo.id)}
                    className="checkbox checkbox-primary"
                    disabled={toggleMutation.isPending}
                  />
                  <span className={`${todo.completed ? 'line-through text-base-content/50' : ''}`}>
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => deleteMutation.mutate(todo.id)}
                  className="btn btn-ghost btn-sm btn-square opacity-0 group-hover:opacity-100 transition-opacity text-error"
                  disabled={deleteMutation.isPending}
                >
                  <HiOutlineTrash size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mutation states */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div
          className={`card p-3 text-center ${addMutation.isPending ? 'bg-info text-info-content' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold">Add</div>
          <div className="text-xs opacity-70">
            {addMutation.isPending ? 'Adding...' : addMutation.isSuccess ? 'Done!' : 'Idle'}
          </div>
        </div>
        <div
          className={`card p-3 text-center ${toggleMutation.isPending ? 'bg-info text-info-content' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold">Toggle</div>
          <div className="text-xs opacity-70">
            {toggleMutation.isPending ? 'Updating...' : 'Idle'}
          </div>
        </div>
        <div
          className={`card p-3 text-center ${deleteMutation.isPending ? 'bg-error text-error-content' : 'bg-base-300'}`}
        >
          <div className="text-xs font-semibold">Delete</div>
          <div className="text-xs opacity-70">
            {deleteMutation.isPending ? 'Deleting...' : 'Idle'}
          </div>
        </div>
      </div>

      {/* Info box */}
      <div className="bg-warning/10 border border-warning/30 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-warning mb-2">Cache Invalidation Flow</h4>
        <ol className="text-sm text-base-content/70 space-y-1 list-decimal list-inside">
          <li>Mutation triggers (e.g., add todo)</li>
          <li>API call made, UI shows loading state</li>
          <li>
            On success, <code>invalidateQueries</code> called
          </li>
          <li>Query marked as stale, refetch triggered</li>
          <li>Fresh data replaces cached data</li>
        </ol>
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
        <CodeSnippet title="Mutation Pattern" language="tsx" code={mutationPatternCode} />
      )}
    </div>
  );
}

export default function MutationsDemo(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <MutationsContent />
    </QueryClientProvider>
  );
}

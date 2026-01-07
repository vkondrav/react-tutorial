// ============================================
// CRUD Playground
// Full todo app with all CRUD operations
// ============================================

import { useState, useEffect } from 'react';
import {
  HiOutlinePlus,
  HiOutlinePencil,
  HiOutlineTrash,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
} from 'react-icons/hi';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export default function CrudPlayground(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  // Edit state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState('');
  const [savingId, setSavingId] = useState<number | null>(null);

  // Delete state
  const [deletingId, setDeletingId] = useState<number | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2000);
  };

  // Fetch initial todos
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setTodos(data);
      } catch {
        setError('Failed to load todos');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  // CREATE
  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setIsAdding(true);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          completed: false,
          userId: 1,
        }),
      });

      if (!response.ok) throw new Error('Failed to create');

      const newTodo = await response.json();
      // Use a unique ID since JSONPlaceholder always returns 201
      setTodos((prev) => [{ ...newTodo, id: Date.now() }, ...prev]);
      setNewTitle('');
      showToast('Todo added!');
    } catch {
      showToast('Failed to add todo', 'error');
    } finally {
      setIsAdding(false);
    }
  };

  // UPDATE - Toggle completed
  const handleToggle = async (todo: Todo) => {
    const previousState = todo.completed;

    // Optimistic update
    setTodos((prev) => prev.map((t) => (t.id === todo.id ? { ...t, completed: !t.completed } : t)));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completed: !todo.completed }),
      });

      if (!response.ok) throw new Error('Failed to update');
    } catch {
      // Rollback
      setTodos((prev) =>
        prev.map((t) => (t.id === todo.id ? { ...t, completed: previousState } : t))
      );
      showToast('Failed to update', 'error');
    }
  };

  // UPDATE - Edit title
  const startEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditValue(todo.title);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const saveEdit = async () => {
    if (!editingId || !editValue.trim()) return;

    setSavingId(editingId);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${editingId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editValue.trim() }),
      });

      if (!response.ok) throw new Error('Failed to update');

      setTodos((prev) =>
        prev.map((t) => (t.id === editingId ? { ...t, title: editValue.trim() } : t))
      );
      setEditingId(null);
      setEditValue('');
      showToast('Todo updated!');
    } catch {
      showToast('Failed to update', 'error');
    } finally {
      setSavingId(null);
    }
  };

  // DELETE
  const handleDelete = async (id: number) => {
    setDeletingId(id);

    // Save for potential rollback
    const todoToDelete = todos.find((t) => t.id === id);

    // Optimistic delete
    setTodos((prev) => prev.filter((t) => t.id !== id));

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');

      showToast('Todo deleted!');
    } catch {
      // Rollback
      if (todoToDelete) {
        setTodos((prev) => [todoToDelete, ...prev]);
      }
      showToast('Failed to delete', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Refresh
  const handleRefresh = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=5');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setTodos(data);
    } catch {
      setError('Failed to load todos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card bg-base-300 p-4">
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-12 bg-base-content/10 rounded animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-base-300 p-8 text-center">
        <HiOutlineExclamationCircle className="mx-auto text-error mb-2" size={32} />
        <p className="mb-4">{error}</p>
        <button onClick={handleRefresh} className="btn btn-primary btn-sm gap-2">
          <HiOutlineRefresh size={16} />
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Add form */}
      <form onSubmit={handleAdd} className="flex gap-2">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Add a new todo..."
          className="input input-bordered flex-1"
          disabled={isAdding}
        />
        <button
          type="submit"
          disabled={isAdding || !newTitle.trim()}
          className="btn btn-primary gap-2"
        >
          {isAdding ? (
            <span className="loading loading-spinner loading-sm" />
          ) : (
            <HiOutlinePlus size={18} />
          )}
          Add
        </button>
      </form>

      {/* Todo list */}
      <div className="card bg-base-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">
            Todos ({todos.filter((t) => !t.completed).length} remaining)
          </h4>
          <button onClick={handleRefresh} className="btn btn-ghost btn-sm btn-square">
            <HiOutlineRefresh size={16} />
          </button>
        </div>

        {todos.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <p>No todos yet. Add one above!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {todos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  deletingId === todo.id
                    ? 'opacity-50 scale-95'
                    : todo.completed
                      ? 'bg-base-200/50'
                      : 'bg-base-200'
                }`}
              >
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggle(todo)}
                  className="checkbox checkbox-primary"
                />

                {/* Title or edit input */}
                {editingId === todo.id ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="input input-bordered input-sm flex-1"
                    autoFocus
                    disabled={savingId === todo.id}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEdit();
                      if (e.key === 'Escape') cancelEdit();
                    }}
                  />
                ) : (
                  <span
                    className={`flex-1 ${
                      todo.completed ? 'line-through text-base-content/50' : ''
                    }`}
                  >
                    {todo.title}
                  </span>
                )}

                {/* Actions */}
                {editingId === todo.id ? (
                  <div className="flex gap-1">
                    <button
                      onClick={saveEdit}
                      disabled={savingId === todo.id || !editValue.trim()}
                      className="btn btn-success btn-sm btn-square"
                    >
                      {savingId === todo.id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        <HiOutlineCheck size={16} />
                      )}
                    </button>
                    <button
                      onClick={cancelEdit}
                      disabled={savingId === todo.id}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <HiOutlineX size={16} />
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-1">
                    <button
                      onClick={() => startEdit(todo)}
                      className="btn btn-ghost btn-sm btn-square"
                    >
                      <HiOutlinePencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      disabled={deletingId === todo.id}
                      className="btn btn-ghost btn-sm btn-square text-error/70 hover:text-error"
                    >
                      <HiOutlineTrash size={16} />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features list */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-2">CRUD Operations Used</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
          <div className="flex items-center gap-2">
            <span className="badge badge-primary badge-sm">POST</span>
            <span>Add todo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-secondary badge-sm">PATCH</span>
            <span>Toggle/Edit</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-error badge-sm">DELETE</span>
            <span>Remove todo</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="badge badge-info badge-sm">GET</span>
            <span>Fetch list</span>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-4 right-4 z-50">
          <div
            className={`alert ${
              toast.type === 'success' ? 'alert-success' : 'alert-error'
            } shadow-lg`}
          >
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </div>
  );
}

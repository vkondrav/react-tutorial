import { useState } from 'react';
import { HiPlus, HiX, HiCheck, HiOutlineTrash, HiOutlineFilter } from 'react-icons/hi';

// Generate unique ID
const generateId = () => `todo-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;

export default function ListPlayground() {
  const [todos, setTodos] = useState([
    { id: generateId(), text: 'Learn React basics', completed: true },
    { id: generateId(), text: 'Master useState hook', completed: true },
    { id: generateId(), text: 'Understand lists and keys', completed: false },
    { id: generateId(), text: 'Build something awesome', completed: false },
  ]);
  const [newTodoText, setNewTodoText] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'

  // Add new todo
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;

    setTodos([...todos, { id: generateId(), text: newTodoText.trim(), completed: false }]);
    setNewTodoText('');
  };

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
    );
  };

  // Remove a todo
  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  // Filter todos
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  // Stats
  const completedCount = todos.filter((t) => t.completed).length;
  const activeCount = todos.length - completedCount;

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-semibold text-primary flex items-center gap-2">
          <HiOutlineFilter size={18} />
          Todo List
        </h4>
        <div className="text-sm text-base-content/50">
          {activeCount} active, {completedCount} completed
        </div>
      </div>

      {/* Add Todo Form */}
      <form onSubmit={addTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="What needs to be done?"
          className="input input-bordered flex-1"
        />
        <button type="submit" disabled={!newTodoText.trim()} className="btn btn-primary gap-1">
          <HiPlus size={18} />
          Add
        </button>
      </form>

      {/* Filter Tabs */}
      <div className="flex gap-1 mb-4">
        {['all', 'active', 'completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && ` (${todos.length})`}
            {f === 'active' && ` (${activeCount})`}
            {f === 'completed' && ` (${completedCount})`}
          </button>
        ))}
      </div>

      {/* Todo List */}
      <div className="card bg-base-300 p-4 min-h-[200px]">
        {filteredTodos.length > 0 ? (
          <div className="space-y-2">
            {filteredTodos.map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                  todo.completed ? 'bg-base-200/50' : 'bg-base-200'
                }`}
              >
                {/* Checkbox */}
                <button
                  onClick={() => toggleTodo(todo.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                    todo.completed
                      ? 'bg-success border-success text-success-content'
                      : 'border-base-content/30 hover:border-success'
                  }`}
                >
                  {todo.completed && <HiCheck size={14} />}
                </button>

                {/* Text */}
                <span
                  className={`flex-1 ${todo.completed ? 'line-through text-base-content/50' : ''}`}
                >
                  {todo.text}
                </span>

                {/* Delete Button */}
                <button
                  onClick={() => removeTodo(todo.id)}
                  className="btn btn-ghost btn-sm btn-square text-error opacity-50 hover:opacity-100"
                >
                  <HiX size={16} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-base-content/50 py-8">
            <div className="text-4xl mb-2">{filter === 'completed' ? '🎉' : '📝'}</div>
            <div>
              {filter === 'all' && 'No todos yet. Add one above!'}
              {filter === 'active' && 'No active todos. Great job!'}
              {filter === 'completed' && 'No completed todos yet.'}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      {completedCount > 0 && (
        <div className="mt-4 flex justify-end">
          <button onClick={clearCompleted} className="btn btn-ghost btn-sm text-error gap-1">
            <HiOutlineTrash size={14} />
            Clear Completed ({completedCount})
          </button>
        </div>
      )}

      {/* Code Display */}
      <div className="mt-6 card bg-base-300 p-4">
        <div className="text-xs text-base-content/50 mb-3">Key concepts in this example:</div>
        <div className="space-y-4 text-sm font-mono">
          <div>
            <div className="text-success mb-1">// Adding items</div>
            <pre className="text-base-content/70 bg-base-200 p-3 rounded whitespace-pre-wrap">{`setTodos([
  ...todos,
  { id: generateId(), text, completed: false }
]);`}</pre>
          </div>
          <div>
            <div className="text-warning mb-1">// Updating items</div>
            <pre className="text-base-content/70 bg-base-200 p-3 rounded whitespace-pre-wrap">{`setTodos(todos.map(todo =>
  todo.id === id
    ? { ...todo, completed: !todo.completed }
    : todo
));`}</pre>
          </div>
          <div>
            <div className="text-error mb-1">// Removing items</div>
            <pre className="text-base-content/70 bg-base-200 p-3 rounded whitespace-pre-wrap">{`setTodos(
  todos.filter(todo => todo.id !== id)
);`}</pre>
          </div>
          <div>
            <div className="text-primary mb-1">// Filtering for display</div>
            <pre className="text-base-content/70 bg-base-200 p-3 rounded whitespace-pre-wrap">{`const filtered = todos.filter(todo =>
  filter === 'all' ? true
    : filter === 'active' ? !todo.completed
    : todo.completed
);`}</pre>
          </div>
        </div>
      </div>
    </div>
  );
}

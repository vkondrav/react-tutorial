import { useState } from 'react';
import { HiOutlineDocumentText, HiX } from 'react-icons/hi';

export default function StatePlayground() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn useState', done: true },
    { id: 2, text: 'Build a counter', done: true },
    { id: 3, text: 'Create a todo app', done: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState('all');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos((prev) => [...prev, { id: Date.now(), text: newTodo.trim(), done: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done;
    if (filter === 'done') return todo.done;
    return true;
  });

  const doneCount = todos.filter((t) => t.done).length;

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-base-300 bg-primary">
        <h3 className="m-0 text-primary-content text-xl flex items-center gap-2">
          <HiOutlineDocumentText size={24} />
          Mini Todo App
        </h3>
        <p className="mt-2 mb-0 text-primary-content/80 text-sm">
          A complete example using multiple state values
        </p>
      </div>

      <div className="grid grid-cols-2 min-h-[400px]">
        {/* Todo App */}
        <div className="p-6 border-r border-base-300">
          {/* Add Todo */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="input input-bordered flex-1 input-sm"
            />
            <button onClick={addTodo} className="btn btn-primary">
              Add
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {['all', 'active', 'done'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`btn btn-sm capitalize ${filter === f ? 'btn-primary' : 'btn-outline'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-2">
            {filteredTodos.length === 0 ? (
              <div className="p-8 text-center text-base-content/50 text-sm">No todos to show</div>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo.id} className="card bg-base-300 p-3 flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    className="checkbox checkbox-sm"
                  />
                  <span
                    className={`flex-1 ${
                      todo.done ? 'text-base-content/50 line-through' : 'text-base-content'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="btn btn-ghost btn-xs text-error hover:bg-error/20"
                  >
                    <HiX size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 p-3 card bg-base-300 flex justify-between text-xs text-base-content/50">
            <span>
              {todos.length} total • {doneCount} done • {todos.length - doneCount} remaining
            </span>
          </div>
        </div>

        {/* State Visualization */}
        <div className="p-6 bg-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">State Values (Live)</div>

          {/* todos state */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-success font-semibold text-sm">todos</span>
              <span className="text-base-content/50 text-xs">(array of {todos.length} items)</span>
            </div>
            <pre className="m-0 p-3 bg-base-200 rounded-md text-[0.7rem] leading-relaxed max-h-[150px] overflow-auto">
              <code className="text-base-content/70">{JSON.stringify(todos, null, 2)}</code>
            </pre>
          </div>

          {/* newTodo state */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-primary font-semibold text-sm">newTodo</span>
              <span className="text-base-content/50 text-xs">(string)</span>
            </div>
            <pre className="m-0 p-3 bg-base-200 rounded-md text-xs">
              <code className="text-warning">"{newTodo}"</code>
            </pre>
          </div>

          {/* filter state */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-accent font-semibold text-sm">filter</span>
              <span className="text-base-content/50 text-xs">(string)</span>
            </div>
            <pre className="m-0 p-3 bg-base-200 rounded-md text-xs">
              <code className="text-warning">"{filter}"</code>
            </pre>
          </div>

          {/* State updates used */}
          <div className="mt-6 p-4 card bg-base-200 border border-dashed border-base-300">
            <div className="text-base-content/50 text-[0.7rem] mb-2">FUNCTIONAL UPDATES USED:</div>
            <code className="text-base-content/70 text-[0.7rem] leading-relaxed">
              {`setTodos(prev => [...prev, newItem])\nsetTodos(prev => prev.map(...))\nsetTodos(prev => prev.filter(...))`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

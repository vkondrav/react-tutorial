import { useState } from 'react';

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
    <div className="mt-6 bg-slate-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-slate-700 bg-linear-to-br from-blue-500 to-purple-500">
        <h3 className="m-0 text-white text-xl">📝 Mini Todo App</h3>
        <p className="mt-2 mb-0 text-white/80 text-sm">
          A complete example using multiple state values
        </p>
      </div>

      <div className="grid grid-cols-2 min-h-[400px]">
        {/* Todo App */}
        <div className="p-6 border-r border-slate-700">
          {/* Add Todo */}
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              className="flex-1 px-3 py-3 bg-slate-900 border border-slate-700 rounded-lg text-slate-50 text-sm"
            />
            <button
              onClick={addTodo}
              className="px-5 py-3 bg-blue-500 border-none rounded-lg text-white cursor-pointer font-semibold hover:bg-blue-600 transition-colors"
            >
              Add
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-2 mb-4">
            {['all', 'active', 'done'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 border rounded-md cursor-pointer text-xs capitalize transition-colors ${
                  filter === f
                    ? 'bg-blue-500 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div className="flex flex-col gap-2">
            {filteredTodos.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">No todos to show</div>
            ) : (
              filteredTodos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-3 p-3 bg-slate-900 rounded-lg">
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    className="w-5 h-5 cursor-pointer"
                  />
                  <span
                    className={`flex-1 ${
                      todo.done ? 'text-slate-500 line-through' : 'text-slate-50'
                    }`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="px-2 py-1 bg-transparent border-none text-red-500 cursor-pointer text-base hover:text-red-400 transition-colors"
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="mt-4 p-3 bg-slate-900 rounded-lg flex justify-between text-xs text-slate-500">
            <span>
              {todos.length} total • {doneCount} done • {todos.length - doneCount} remaining
            </span>
          </div>
        </div>

        {/* State Visualization */}
        <div className="p-6 bg-slate-900">
          <div className="text-xs text-slate-500 mb-4 uppercase">State Values (Live)</div>

          {/* todos state */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-500 font-semibold text-sm">todos</span>
              <span className="text-slate-500 text-xs">(array of {todos.length} items)</span>
            </div>
            <pre className="m-0 p-3 bg-slate-800 rounded-md text-[0.7rem] leading-relaxed max-h-[150px] overflow-auto">
              <code className="text-slate-400">{JSON.stringify(todos, null, 2)}</code>
            </pre>
          </div>

          {/* newTodo state */}
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-blue-500 font-semibold text-sm">newTodo</span>
              <span className="text-slate-500 text-xs">(string)</span>
            </div>
            <pre className="m-0 p-3 bg-slate-800 rounded-md text-xs">
              <code className="text-yellow-400">"{newTodo}"</code>
            </pre>
          </div>

          {/* filter state */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-pink-500 font-semibold text-sm">filter</span>
              <span className="text-slate-500 text-xs">(string)</span>
            </div>
            <pre className="m-0 p-3 bg-slate-800 rounded-md text-xs">
              <code className="text-yellow-400">"{filter}"</code>
            </pre>
          </div>

          {/* State updates used */}
          <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-dashed border-slate-700">
            <div className="text-slate-500 text-[0.7rem] mb-2">FUNCTIONAL UPDATES USED:</div>
            <code className="text-slate-400 text-[0.7rem] leading-relaxed">
              {`setTodos(prev => [...prev, newItem])\nsetTodos(prev => prev.map(...))\nsetTodos(prev => prev.filter(...))`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

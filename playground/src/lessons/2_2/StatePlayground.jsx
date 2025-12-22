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
    <div
      style={{
        marginTop: '1.5rem',
        backgroundColor: '#1e293b',
        borderRadius: '0.75rem',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid #334155',
          background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
        }}
      >
        <h3 style={{ margin: 0, color: 'white', fontSize: '1.25rem' }}>📝 Mini Todo App</h3>
        <p style={{ margin: '0.5rem 0 0', color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem' }}>
          A complete example using multiple state values
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '400px' }}>
        {/* Todo App */}
        <div style={{ padding: '1.5rem', borderRight: '1px solid #334155' }}>
          {/* Add Todo */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addTodo()}
              placeholder="What needs to be done?"
              style={{
                flex: 1,
                padding: '0.75rem',
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '0.5rem',
                color: '#f8fafc',
                fontSize: '0.875rem',
              }}
            />
            <button
              onClick={addTodo}
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: '#3b82f6',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                cursor: 'pointer',
                fontWeight: '600',
              }}
            >
              Add
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
            {['all', 'active', 'done'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: filter === f ? '#3b82f6' : '#0f172a',
                  border: '1px solid #334155',
                  borderRadius: '0.375rem',
                  color: filter === f ? 'white' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  textTransform: 'capitalize',
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Todo List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {filteredTodos.length === 0 ? (
              <div
                style={{
                  padding: '2rem',
                  textAlign: 'center',
                  color: '#64748b',
                  fontSize: '0.875rem',
                }}
              >
                No todos to show
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    backgroundColor: '#0f172a',
                    borderRadius: '0.5rem',
                  }}
                >
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                    style={{ width: '1.25rem', height: '1.25rem', cursor: 'pointer' }}
                  />
                  <span
                    style={{
                      flex: 1,
                      color: todo.done ? '#64748b' : '#f8fafc',
                      textDecoration: todo.done ? 'line-through' : 'none',
                    }}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => deleteTodo(todo.id)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      backgroundColor: 'transparent',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      fontSize: '1rem',
                    }}
                  >
                    ×
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          <div
            style={{
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#0f172a',
              borderRadius: '0.5rem',
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '0.75rem',
              color: '#64748b',
            }}
          >
            <span>
              {todos.length} total • {doneCount} done • {todos.length - doneCount} remaining
            </span>
          </div>
        </div>

        {/* State Visualization */}
        <div style={{ padding: '1.5rem', backgroundColor: '#0f172a' }}>
          <div
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              marginBottom: '1rem',
              textTransform: 'uppercase',
            }}
          >
            State Values (Live)
          </div>

          {/* todos state */}
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: '#22c55e', fontWeight: '600', fontSize: '0.875rem' }}>
                todos
              </span>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>
                (array of {todos.length} items)
              </span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.7rem',
                lineHeight: 1.5,
                maxHeight: '150px',
                overflow: 'auto',
              }}
            >
              <code style={{ color: '#94a3b8' }}>{JSON.stringify(todos, null, 2)}</code>
            </pre>
          </div>

          {/* newTodo state */}
          <div style={{ marginBottom: '1rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: '#3b82f6', fontWeight: '600', fontSize: '0.875rem' }}>
                newTodo
              </span>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>(string)</span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
              }}
            >
              <code style={{ color: '#fbbf24' }}>"{newTodo}"</code>
            </pre>
          </div>

          {/* filter state */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
              }}
            >
              <span style={{ color: '#ec4899', fontWeight: '600', fontSize: '0.875rem' }}>
                filter
              </span>
              <span style={{ color: '#64748b', fontSize: '0.75rem' }}>(string)</span>
            </div>
            <pre
              style={{
                margin: 0,
                padding: '0.75rem',
                backgroundColor: '#1e293b',
                borderRadius: '0.375rem',
                fontSize: '0.75rem',
              }}
            >
              <code style={{ color: '#fbbf24' }}>"{filter}"</code>
            </pre>
          </div>

          {/* State updates used */}
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1rem',
              backgroundColor: '#1e293b',
              borderRadius: '0.5rem',
              border: '1px dashed #334155',
            }}
          >
            <div style={{ color: '#64748b', fontSize: '0.7rem', marginBottom: '0.5rem' }}>
              FUNCTIONAL UPDATES USED:
            </div>
            <code style={{ color: '#94a3b8', fontSize: '0.7rem', lineHeight: 1.8 }}>
              {`setTodos(prev => [...prev, newItem])\nsetTodos(prev => prev.map(...))\nsetTodos(prev => prev.filter(...))`}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

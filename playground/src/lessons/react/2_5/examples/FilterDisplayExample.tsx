// @ts-nocheck
const filtered = todos.filter((todo) =>
  filter === 'all' ? true : filter === 'active' ? !todo.completed : todo.completed
);

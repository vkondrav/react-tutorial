// @ts-nocheck
setTodos((prev) => [...prev, newItem]);
setTodos((prev) => prev.map(...toggleTodo));
setTodos((prev) => prev.filter(...deleteTodo));

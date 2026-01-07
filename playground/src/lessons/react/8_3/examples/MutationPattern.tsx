// Mutations with cache invalidation
import React from 'react';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoApp() {
  const queryClient = useQueryClient();

  // Query to fetch todos
  const { data: todos } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then((r) => r.json()),
  });

  // Mutation to add a todo
  const addTodo = useMutation({
    mutationFn: (newTodo: { title: string }) =>
      fetch('/api/todos', {
        method: 'POST',
        body: JSON.stringify(newTodo),
      }).then((r) => r.json()),

    // After success, invalidate the todos query to refetch
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },

    // Optional: handle errors
    onError: (error) => {
      console.error('Failed to add todo:', error);
    },
  });

  // Mutation to toggle todo completion
  const toggleTodo = useMutation({
    mutationFn: (todo: Todo) =>
      fetch(`/api/todos/${todo.id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: !todo.completed }),
      }).then((r) => r.json()),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  // Mutation to delete a todo
  const deleteTodo = useMutation({
    mutationFn: (todoId: number) => fetch(`/api/todos/${todoId}`, { method: 'DELETE' }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });

  return (
    <div>
      <button onClick={() => addTodo.mutate({ title: 'New Todo' })} disabled={addTodo.isPending}>
        {addTodo.isPending ? 'Adding...' : 'Add Todo'}
      </button>

      {todos?.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo.mutate(todo)}
          />
          <span>{todo.title}</span>
          <button onClick={() => deleteTodo.mutate(todo.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

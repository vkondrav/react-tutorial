// Basic useQuery pattern
import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface User {
  id: number;
  name: string;
  email: string;
}

function UsersList() {
  const {
    data: users, // The fetched data
    isLoading, // True during first fetch (no data yet)
    isFetching, // True during any fetch (including background)
    isError, // True if query errored
    error, // The error object
    refetch, // Function to manually trigger refetch
  } = useQuery<User[]>({
    queryKey: ['users'], // Unique key for caching
    queryFn: async () => {
      const response = await fetch('/api/users');
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // Consider fresh for 5 minutes
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <ul>
      {users?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}

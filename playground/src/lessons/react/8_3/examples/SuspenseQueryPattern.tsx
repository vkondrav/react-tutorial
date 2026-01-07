import { useSuspenseQuery } from '@tanstack/react-query';
import React, { Suspense } from 'react';

async function fetchUser(userId: number) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
}

// Component suspends until data is ready
function UserCard({ userId }: { userId: number }) {
  // No isLoading - data is guaranteed!
  const { data } = useSuspenseQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  return <div>{data.name}</div>;
}

// Parent handles loading state
function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserCard userId={1} />
    </Suspense>
  );
}

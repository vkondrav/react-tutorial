// useSuspenseQuery - Suspense-first data fetching
import React, { Suspense } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

interface User {
  id: number;
  name: string;
  email: string;
}

// Component using useSuspenseQuery - data is ALWAYS defined!
function UserProfile({ userId }: { userId: number }) {
  // No isLoading state needed - component suspends until data is ready
  const { data } = useSuspenseQuery<User>({
    queryKey: ['user', userId],
    queryFn: async () => {
      const res = await fetch(`/api/users/${userId}`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  // data is guaranteed to exist here - no undefined checks!
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.email}</p>
    </div>
  );
}

// Parent component handles loading and error states
function App() {
  return (
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <Suspense fallback={<div>Loading user...</div>}>
        <UserProfile userId={1} />
      </Suspense>
    </ErrorBoundary>
  );
}

// Key differences from useQuery:
//
// useQuery:
//   - Returns { data, isLoading, error }
//   - data can be undefined
//   - You handle loading/error in the component
//
// useSuspenseQuery:
//   - Returns { data } (always defined!)
//   - Component suspends during loading
//   - Errors propagate to nearest ErrorBoundary
//   - Cleaner component code

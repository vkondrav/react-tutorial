// Understanding staleTime and caching behavior
import React from 'react';
import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Example user type and fetch function
interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(userId: number): Promise<User> {
  const response = await fetch(`/api/users/${userId}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

// Create client with default stale time
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes: data is "fresh" for 5 min
      gcTime: 30 * 60 * 1000, // 30 minutes: keep unused data in cache
    },
  },
});

function UserProfile({ userId }: { userId: number }) {
  const { data, isStale, isFetching } = useQuery({
    queryKey: ['user', userId], // Cache key includes userId
    queryFn: () => fetchUser(userId),

    // Override default for this query:
    staleTime: 60 * 1000, // 1 minute for user profile

    // Other useful options:
    refetchOnWindowFocus: true, // Refetch when tab gets focus (default: true for stale)
    refetchOnMount: true, // Refetch when component mounts (default: true for stale)
    refetchOnReconnect: true, // Refetch when network reconnects
  });

  return (
    <div>
      {/* isStale: true if data is older than staleTime */}
      {isStale && <span>Data may be outdated</span>}

      {/* isFetching: true during background refresh */}
      {isFetching && <span>Refreshing...</span>}

      <h1>{data?.name}</h1>
    </div>
  );
}

// The flow:
// 1. First visit: isLoading=true, fetch data, cache it
// 2. Return within staleTime: data is "fresh", use cache directly
// 3. Return after staleTime: data is "stale", show cache immediately,
//    refetch in background
// 4. After gcTime with no subscribers: data removed from cache

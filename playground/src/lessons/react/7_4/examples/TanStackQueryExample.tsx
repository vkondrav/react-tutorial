// @ts-nocheck
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Fetching data
function UserProfile({ userId }: { userId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then((r) => r.json()),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;
  return <div>{data.name}</div>;
}

// Mutations with cache invalidation
function UpdateButton({ userId }: { userId: string }) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (newData) =>
      fetch(`/api/users/${userId}`, { method: 'PUT', body: JSON.stringify(newData) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user', userId] }),
  });
  // ...
}

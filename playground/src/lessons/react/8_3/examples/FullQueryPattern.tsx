// Complete TanStack Query setup and patterns
import React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// 1. Create the QueryClient (usually in main.tsx or App.tsx)
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 min: data considered fresh
      gcTime: 30 * 60 * 1000, // 30 min: unused cache lifetime
      retry: 3, // Retry failed requests 3 times
      refetchOnWindowFocus: true, // Refetch stale data on focus
    },
    mutations: {
      retry: 1, // Retry mutations once
    },
  },
});

// 2. Wrap your app with QueryClientProvider
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <App /> {/* Your app component */}
      <ReactQueryDevtools /> {/* Optional: DevTools for debugging */}
    </QueryClientProvider>
  );
}

// 3. Use queries and mutations in components
interface Post {
  id: number;
  title: string;
  body: string;
}

function PostsPage() {
  const queryClient = useQueryClient();

  // Fetch posts
  const postsQuery = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts');
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
  });

  // Create a post
  const createPost = useMutation({
    mutationFn: async (newPost: { title: string; body: string }) => {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      });
      return res.json();
    },
    onSuccess: () => {
      // Invalidate and refetch posts after creating
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  // Delete a post
  const deletePost = useMutation({
    mutationFn: async (postId: number) => {
      await fetch(`/api/posts/${postId}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  if (postsQuery.isLoading) return <div>Loading posts...</div>;
  if (postsQuery.isError) return <div>Error loading posts</div>;

  return (
    <div>
      <button
        onClick={() => createPost.mutate({ title: 'New Post', body: 'Content' })}
        disabled={createPost.isPending}
      >
        Create Post
      </button>

      {postsQuery.data?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => deletePost.mutate(post.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

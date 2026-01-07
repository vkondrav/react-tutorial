// @ts-nocheck
// The useFetch hook (defined once)
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error('Failed');
        setData(await res.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, loading, error };
}

// Component A: Clean and simple!
function UserList() {
  const { data: users, loading, error } = useFetch<User[]>('/api/users');
  // ... render logic
}

// Component B: Same simplicity!
function PostList() {
  const { data: posts, loading, error } = useFetch<Post[]>('/api/posts');
  // ... render logic
}

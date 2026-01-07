// @ts-nocheck
interface User {
  id: number;
  name: string;
}

function UserProfile({ userId }: { userId: number }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`/api/users/${userId}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error('Failed to fetch');

        const data = await res.json();
        setUser(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err as Error);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => controller.abort();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!user) return null;

  return <div>{user.name}</div>;
}

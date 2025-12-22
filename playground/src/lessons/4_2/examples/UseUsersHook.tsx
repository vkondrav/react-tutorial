// @ts-nocheck
// Extract state management into a custom hook
function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/users');
      if (!res.ok) throw new Error('Failed');
      setUsers(await res.json());
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

// Clean component usage
function UsersPage() {
  const { users, loading, error, refetch } = useUsers();

  return <UserList users={users} loading={loading} error={error} onRetry={refetch} />;
}

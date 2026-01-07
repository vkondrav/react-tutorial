// @ts-nocheck
const [users, setUsers] = useState<User[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);

useEffect(() => {
  async function fetchUsers() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('https://jsonplaceholder.typicode.com/users');

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  fetchUsers();
}, []); // Empty array = fetch once on mount

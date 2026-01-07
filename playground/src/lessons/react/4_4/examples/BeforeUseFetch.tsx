// @ts-nocheck
// Component A: Fetch users
function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        const res = await fetch('/api/users');
        if (!res.ok) throw new Error('Failed');
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, []);
  // ... render logic
}

// Component B: Fetch posts (same pattern!)
function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPosts() {
      try {
        setLoading(true);
        const res = await fetch('/api/posts');
        if (!res.ok) throw new Error('Failed');
        setPosts(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);
  // ... render logic
}

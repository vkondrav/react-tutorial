// @ts-nocheck
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Create controller

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, {
          signal: controller.signal, // Pass signal to fetch
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          // Ignore abort errors
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => controller.abort(); // Cleanup on unmount/re-run
  }, [url]);

  return { data, loading, error };
}

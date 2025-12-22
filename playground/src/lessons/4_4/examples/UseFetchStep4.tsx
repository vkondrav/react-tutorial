// @ts-nocheck
function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1); // Trigger re-fetch
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        setData(await response.json());
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
  }, [url, refetchIndex]); // Include refetchIndex

  return { data, loading, error, refetch }; // Export refetch
}

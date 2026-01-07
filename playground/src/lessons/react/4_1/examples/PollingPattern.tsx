// @ts-nocheck
useEffect(() => {
  if (!isPolling) return;

  const fetchData = async () => {
    const res = await fetch('/api/data');
    const data = await res.json();
    setData(data);
  };

  fetchData(); // Fetch immediately
  const timer = setInterval(fetchData, interval);

  return () => clearInterval(timer);
}, [isPolling, interval]);

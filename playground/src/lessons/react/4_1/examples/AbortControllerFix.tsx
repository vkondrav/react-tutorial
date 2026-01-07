// @ts-nocheck
useEffect(() => {
  const controller = new AbortController();

  fetch(`/api/posts/${postId}`, { signal: controller.signal })
    .then((res) => res.json())
    .then((data) => setPost(data))
    .catch((err) => {
      if (err.name !== 'AbortError') {
        setError(err.message);
      }
    });

  // Cleanup: abort when postId changes or component unmounts
  return () => controller.abort();
}, [postId]);

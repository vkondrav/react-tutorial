// @ts-nocheck
// POST request to create new data
const handleCreate = async (data) => {
  setIsSubmitting(true);
  setError(null);

  try {
    const response = await fetch('/api/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to create');
    }

    const newItem = await response.json();

    // Add to local state
    setPosts((prev) => [newItem, ...prev]);

    // Clear form
    setTitle('');
    setBody('');
  } catch (err) {
    setError(err.message);
  } finally {
    setIsSubmitting(false);
  }
};

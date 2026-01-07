// @ts-nocheck
// DELETE request to remove data
const handleDelete = async (id) => {
  // 1. Show confirmation first!
  if (!confirm('Are you sure?')) return;

  setDeletingId(id);
  setError(null);

  try {
    const response = await fetch(`/api/items/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete');
    }

    // Remove from local state
    setItems((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    setError(err.message);
  } finally {
    setDeletingId(null);
  }
};

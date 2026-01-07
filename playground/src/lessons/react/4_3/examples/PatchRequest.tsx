// @ts-nocheck
// PATCH request to update data (partial update only)
const handleUpdate = async (field, value) => {
  setIsUpdating(true);

  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }), // Only changed field
    });

    if (!response.ok) throw new Error('Update failed');

    const updated = await response.json();
    setPost((prev) => ({ ...prev, [field]: value }));
  } catch (err) {
    console.error(err);
  } finally {
    setIsUpdating(false);
  }
};

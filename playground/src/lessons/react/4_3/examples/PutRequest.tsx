// @ts-nocheck
// PUT request to update data (replaces entire resource)
const handleUpdate = async (field, value) => {
  setIsUpdating(true);

  try {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...post, [field]: value }), // Full object
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

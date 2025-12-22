// @ts-nocheck
const handleLike = async () => {
  setLoading(true);
  try {
    await api.like(postId);
    // Update AFTER success
    setLiked(true);
  } catch (err) {
    showError(err);
  } finally {
    setLoading(false);
  }
};

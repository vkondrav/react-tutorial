// @ts-nocheck
const handleLike = async () => {
  const prev = liked;
  // Update BEFORE request
  setLiked(true);

  try {
    await api.like(postId);
  } catch (err) {
    // Rollback on error
    setLiked(prev);
    showError(err);
  }
};

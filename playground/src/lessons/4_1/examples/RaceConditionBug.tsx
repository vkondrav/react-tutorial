// @ts-nocheck
useEffect(() => {
  fetch(`/api/posts/${postId}`)
    .then((res) => res.json())
    .then((data) => setPost(data)); // ⚠️ Might set stale data!
}, [postId]);
// No cleanup! Old requests can overwrite new ones.

// @ts-nocheck
useEffect(() => {
  async function fetchUser() {
    const response = await fetch(`/api/users/${selectedUserId}`);
    const data = await response.json();
    setUser(data);
  }

  fetchUser();
}, [selectedUserId]); // Re-fetches whenever selectedUserId changes

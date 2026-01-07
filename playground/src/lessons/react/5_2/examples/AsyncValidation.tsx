// @ts-nocheck
useEffect(() => {
  // 1. First, run sync validation
  const syncError = validateSync(username);
  if (syncError) return;

  // 2. Debounce: wait 500ms before API call
  const timer = setTimeout(async () => {
    setChecking(true);
    const isAvailable = await checkUsername(username);
    setAvailable(isAvailable);
    setChecking(false);
  }, 500);

  // 3. Cleanup: cancel if user types again
  return () => clearTimeout(timer);
}, [username]);

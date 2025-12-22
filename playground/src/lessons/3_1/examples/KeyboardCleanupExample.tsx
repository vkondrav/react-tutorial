// @ts-nocheck
useEffect(() => {
  const handler = (e) => {
    setLastKey(e.key);
  };
  window.addEventListener('keydown', handler);

  return () => {
    window.removeEventListener('keydown', handler);
  };
}, []);

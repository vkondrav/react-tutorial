// @ts-nocheck
useEffect(() => {
  const id = setInterval(() => {
    setSeconds((s) => s + 1);
  }, 1000);

  return () => {
    clearInterval(id); // Cleanup!
  };
}, []);

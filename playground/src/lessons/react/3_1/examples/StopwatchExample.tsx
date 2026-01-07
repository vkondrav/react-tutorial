// @ts-nocheck
useEffect(() => {
  if (isRunning) {
    const id = setInterval(() => {
      setElapsedMs((ms) => ms + 10);
    }, 10);

    return () => clearInterval(id); // Cleanup!
  }
}, [isRunning]);

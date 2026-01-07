// @ts-nocheck
// delay: number | null - pass null to pause
function useInterval(callback: () => void, delay: number | null): void {
  useEffect(() => {
    if (delay === null) return;
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
}

useInterval(() => setCount((c) => c + 1), isRunning ? 1000 : null);

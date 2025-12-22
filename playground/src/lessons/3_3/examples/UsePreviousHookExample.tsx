// @ts-nocheck
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value; // Update after render
  }, [value]);

  return ref.current; // Return previous value
}

// @ts-nocheck
const handleClick = useCallback(() => {
  setCount((c) => c + 1);
}, []); // Same function reference every render

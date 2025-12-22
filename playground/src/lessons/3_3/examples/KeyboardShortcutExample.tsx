// @ts-nocheck
const searchRef = useRef(null);

useEffect(() => {
  const handleKeyDown = (e) => {
    if (e.metaKey && e.key === 'k') {
      searchRef.current?.focus();
    }
  };
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}, []);

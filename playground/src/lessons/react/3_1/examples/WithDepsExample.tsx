// @ts-nocheck
useEffect(() => {
  document.title = `Hello, ${name}`;
}, [name]); // Only when name changes

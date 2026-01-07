// @ts-nocheck
useEffect(() => {
  const prefix = notifications > 0 ? `(${notifications}) ` : '';
  document.title = `${prefix}${title}`;
}, [title, notifications]);

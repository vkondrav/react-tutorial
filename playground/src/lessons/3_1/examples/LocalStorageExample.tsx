// @ts-nocheck
// Initialize from localStorage
const [name, setName] = useState(() => {
  return localStorage.getItem('name') || '';
});

// Sync to localStorage when name changes
useEffect(() => {
  localStorage.setItem('name', name);
}, [name]);

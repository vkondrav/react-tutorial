// @ts-nocheck
// useState - triggers re-render
const [count, setCount] = useState(0);
setCount(count + 1); // UI updates!

// useRef - no re-render
const countRef = useRef(0);
countRef.current++; // UI unchanged!

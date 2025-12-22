// @ts-nocheck
// Using ref to track without re-renders:
const countRef = useRef(0);

// In an event handler (not during render):
countRef.current++; // Updates silently
console.log(countRef.current); // Access anytime

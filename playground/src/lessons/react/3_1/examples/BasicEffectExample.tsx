// @ts-nocheck
import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  // Side effect: update document title
  useEffect(() => {
    document.title = `Count: ${count}`;
    console.log('Effect ran! Count:', count);
  }, [count]); // Re-run when count changes

  return <button onClick={() => setCount((c) => c + 1)}>Count: {count}</button>;
}

// @ts-nocheck
import { useState } from 'react';

function Counter() {
  // Declare state: [currentValue, setterFunction]
  const [count, setCount] = useState(0); // 0 is initial value

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

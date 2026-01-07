// @ts-nocheck
// === File: Counter.tsx ===
'use client';
// This marks the CLIENT BOUNDARY

import { useState } from 'react'; // ✓ Included in client bundle
import { formatNumber } from './utils'; // ✓ Also included
import confetti from 'canvas-confetti'; // ✓ Also included (even if large!)

export function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((c) => c + 1);
    confetti(); // Celebration effect!
  };

  return <button onClick={handleClick}>{formatNumber(count)}</button>;
}

// === File: Page.tsx (Server Component) ===
// No "use client" = Server Component
import { Counter } from './Counter';
import { ProductInfo } from './ProductInfo'; // Also Server

export function Page() {
  return (
    <div>
      <ProductInfo /> {/* Server - no JS */}
      <Counter /> {/* Client - JS bundled */}
    </div>
  );
}

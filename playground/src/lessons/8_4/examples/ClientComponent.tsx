// @ts-nocheck
// Client Component
// "use client" at top = runs in browser
'use client';

import { useState } from 'react';

function AddToCartButton({ productId }) {
  // Can use hooks!
  const [added, setAdded] = useState(false);

  // Can use event handlers!
  const handleClick = () => {
    addToCart(productId);
    setAdded(true);
  };

  return <button onClick={handleClick}>{added ? '✓ Added' : 'Add to Cart'}</button>;
}

// This component's JS IS sent to browser

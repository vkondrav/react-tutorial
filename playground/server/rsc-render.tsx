/* eslint-disable react-refresh/only-export-components */
// ============================================
// RSC Demo - Simulated Server Components
// ============================================
// This simulates RSC behavior to demonstrate
// the concepts without requiring Next.js.
// ============================================

import React from 'react';
import { renderToString } from 'react-dom/server';

// Types
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  inStock: boolean;
}

export interface RSCPageData {
  product: Product;
  recommendations: Product[];
  serverTime: string;
  renderInfo: {
    serverComponents: string[];
    clientComponents: string[];
    serverOnlyLibraries: string[];
  };
}

// The page layout - a "Server Component"
function RSCProductPage({ data }: { data: RSCPageData }): React.ReactElement {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header - Server Component */}
      <header className="bg-gray-800 p-4 border-b border-gray-700">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="font-bold text-lg">
            <span className="text-violet-400">RSC</span> Demo Store
          </h1>
          <span className="text-xs text-gray-500">
            Server rendered at: {new Date(data.serverTime).toLocaleTimeString()}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        {/* RSC Info Banner */}
        <div className="bg-violet-900/30 border border-violet-500/30 rounded-lg p-4 mb-8">
          <h2 className="font-semibold text-violet-400 mb-3">🔮 RSC Rendering Info</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="text-blue-400 mb-2">Server Components (0 KB JS)</h3>
              <ul className="space-y-1">
                {data.renderInfo.serverComponents.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <code className="text-gray-300">{c}</code>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-purple-400 mb-2">Client Components (adds JS)</h3>
              <ul className="space-y-1">
                {data.renderInfo.clientComponents.map((c) => (
                  <li key={c} className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <code className="text-gray-300">{c}</code>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-violet-500/20">
            <h3 className="text-green-400 mb-2">Server-Only Libraries (not in bundle)</h3>
            <div className="flex gap-2 flex-wrap">
              {data.renderInfo.serverOnlyLibraries.map((lib) => (
                <span
                  key={lib}
                  className="bg-green-900/50 text-green-400 px-2 py-1 rounded text-xs"
                >
                  {lib}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Product Section - This is server-rendered */}
        <div id="product-section">
          <ProductDetailsSync product={data.product} />
        </div>

        {/* Add to Cart - This placeholder will be hydrated by client JS */}
        <div id="add-to-cart-island" className="my-6" data-product-id={data.product.id}>
          {/* Client component placeholder - interactive island */}
          <div className="bg-gray-800 rounded-lg p-4 border border-purple-500/30">
            <div className="flex items-center justify-between mb-3">
              <span className="text-purple-400 text-sm font-medium">
                🏝️ Client Component Island
              </span>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex items-center gap-2">
                <button className="btn btn-sm btn-outline">−</button>
                <span className="w-12 text-center font-bold">1</span>
                <button className="btn btn-sm btn-outline">+</button>
              </div>
              <button className="btn btn-primary flex-1">
                Add to Cart - ${data.product.price.toFixed(2)}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              ↑ This component requires JavaScript for interactivity
            </p>
          </div>
        </div>

        {/* Recommendations - Server Component */}
        <RecommendationsSync products={data.recommendations} />

        {/* Footer showing what was rendered where */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <h3 className="font-semibold mb-4 text-gray-400">How This Page Was Rendered</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-4">
              <h4 className="text-blue-400 font-semibold mb-2">✅ Server Components</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• Product name, price, description</li>
                <li>• Stock status badge</li>
                <li>• Recommendations grid</li>
                <li>• Page layout & header</li>
              </ul>
              <p className="text-xs text-blue-400/70 mt-2">
                All rendered to HTML on server. No JavaScript sent!
              </p>
            </div>
            <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-purple-400 font-semibold mb-2">⚡ Client Components</h4>
              <ul className="space-y-1 text-gray-400">
                <li>• Add to Cart button</li>
                <li>• Quantity selector (+/−)</li>
                <li>• Cart state management</li>
              </ul>
              <p className="text-xs text-purple-400/70 mt-2">
                Only these ship JavaScript. Small bundle!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

// Synchronous versions for renderToString (simulating async RSC)
function ProductDetailsSync({ product }: { product: Product }): React.ReactElement {
  return (
    <div className="product-details" data-rsc="server">
      <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
      <p className="text-xl text-emerald-400 font-semibold mb-4">${product.price.toFixed(2)}</p>
      <p className="text-gray-400 mb-4">{product.description}</p>
      <div
        className={`inline-block px-3 py-1 rounded-full text-sm ${product.inStock ? 'bg-emerald-900 text-emerald-400' : 'bg-red-900 text-red-400'}`}
      >
        {product.inStock ? '✓ In Stock' : '✗ Out of Stock'}
      </div>
    </div>
  );
}

function RecommendationsSync({ products }: { products: Product[] }): React.ReactElement {
  return (
    <div className="recommendations mt-8" data-rsc="server">
      <h2 className="text-lg font-semibold mb-4 text-gray-300">You Might Also Like</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-gray-800 rounded-lg p-4 border border-gray-700">
            <h3 className="font-medium mb-1">{p.name}</h3>
            <p className="text-emerald-400">${p.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Simulates fetching data on the server.
 */
async function fetchProductData(): Promise<RSCPageData> {
  // Simulate database query latency
  const delay = 50 + Math.random() * 100;
  await new Promise((resolve) => setTimeout(resolve, delay));

  return {
    product: {
      id: 1,
      name: 'Mechanical Keyboard Pro',
      price: 149.99,
      description:
        'Premium mechanical keyboard with RGB lighting, hot-swappable switches, and aircraft-grade aluminum frame. Perfect for developers who demand the best typing experience.',
      inStock: true,
    },
    recommendations: [
      { id: 2, name: 'Ergonomic Mouse', price: 79.99, description: '', inStock: true },
      { id: 3, name: 'USB-C Hub', price: 49.99, description: '', inStock: true },
      { id: 4, name: 'Monitor Light Bar', price: 59.99, description: '', inStock: false },
    ],
    serverTime: new Date().toISOString(),
    renderInfo: {
      serverComponents: ['RSCProductPage', 'ProductDetails', 'Recommendations', 'Header', 'Footer'],
      clientComponents: ['AddToCartButton', 'QuantitySelector'],
      serverOnlyLibraries: ['prisma', 'marked', 'shiki', 'date-fns', 'lodash'],
    },
  };
}

/**
 * Renders the RSC demo page to HTML.
 */
export async function renderRSCDemo(): Promise<string> {
  const data = await fetchProductData();
  const appHtml = renderToString(<RSCProductPage data={data} />);

  // Calculate simulated bundle sizes
  const traditionalBundle = 168; // KB - with all libs
  const rscBundle = 12; // KB - only client components

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSC Demo - ${data.product.name}</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    .btn { 
      padding: 0.5rem 1rem; 
      border-radius: 0.5rem; 
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-primary { background: #8b5cf6; color: white; }
    .btn-primary:hover { background: #7c3aed; }
    .btn-outline { border: 1px solid #4b5563; color: #9ca3af; }
    .btn-outline:hover { background: #374151; }
    .btn-sm { padding: 0.25rem 0.75rem; font-size: 0.875rem; }
  </style>
</head>
<body>
  <div id="root">${appHtml}</div>
  
  <!-- RSC Client Hydration Script (simulated) -->
  <script>
    // In real RSC, only client components would have JS
    // This simulates the "island" hydration
    
    console.log('%c🔮 RSC Demo: Page Loaded', 'color: #8b5cf6; font-weight: bold');
    console.log('%c📊 Bundle Analysis:', 'color: #10b981; font-weight: bold');
    console.log('  Traditional bundle: ${traditionalBundle} KB');
    console.log('  RSC bundle: ${rscBundle} KB');
    console.log('  Savings: ${Math.round((1 - rscBundle / traditionalBundle) * 100)}%');
    console.log('%c🏝️ Hydrating client islands...', 'color: #a855f7');
    
    // Hydrate the AddToCart island
    const island = document.getElementById('add-to-cart-island');
    if (island) {
      const productId = island.dataset.productId;
      let quantity = 1;
      const price = ${data.product.price};
      
      // Make the buttons interactive
      const buttons = island.querySelectorAll('button');
      const quantityDisplay = island.querySelector('span.w-12');
      const addButton = buttons[2]; // Add to Cart button
      
      buttons[0].addEventListener('click', () => {
        if (quantity > 1) {
          quantity--;
          quantityDisplay.textContent = quantity;
          addButton.textContent = 'Add to Cart - $' + (price * quantity).toFixed(2);
        }
      });
      
      buttons[1].addEventListener('click', () => {
        quantity++;
        quantityDisplay.textContent = quantity;
        addButton.textContent = 'Add to Cart - $' + (price * quantity).toFixed(2);
      });
      
      addButton.addEventListener('click', () => {
        alert('Added ' + quantity + ' item(s) to cart!');
      });
      
      console.log('%c✅ AddToCart island hydrated', 'color: #22c55e');
    }
    
    console.log('%c🎉 RSC Demo ready!', 'color: #8b5cf6; font-weight: bold');
    console.log('');
    console.log('%c💡 Key Insight:', 'color: #eab308; font-weight: bold');
    console.log('  Only the AddToCart component shipped JavaScript.');
    console.log('  Product details, recommendations, and layout');
    console.log('  were rendered as pure HTML with zero JS!');
  </script>
</body>
</html>`;
}

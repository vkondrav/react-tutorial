// ============================================
// States Playground
// Practice building UIs with all states
// ============================================

import { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlinePhotograph,
  HiOutlineSearch,
  HiOutlineShoppingCart,
  HiX,
} from 'react-icons/hi';

type PlaygroundTab = 'photos' | 'search' | 'cart';

// ============================================
// Demo 1: Photo Gallery
// ============================================

interface Photo {
  id: number;
  title: string;
  thumbnailUrl: string;
}

function PhotoGallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [simulateError] = useState(false);
  const [simulateEmpty] = useState(false);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 1000));

    if (simulateError) {
      setError(new Error('Failed to load photos'));
      setLoading(false);
      return;
    }

    if (simulateEmpty) {
      setPhotos([]);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/photos?_limit=6'
      );
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setPhotos(data);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [simulateError, simulateEmpty]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="aspect-square bg-base-content/10 rounded animate-pulse"
          />
        ))}
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <HiOutlineExclamationCircle className="text-error mb-2" size={32} />
        <p className="text-sm mb-4">{error.message}</p>
        <button onClick={fetchPhotos} className="btn btn-primary btn-sm gap-2">
          <HiOutlineRefresh size={16} />
          Retry
        </button>
      </div>
    );
  }

  // Empty state
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <HiOutlinePhotograph className="text-base-content/30 mb-2" size={32} />
        <p className="text-sm text-base-content/60">No photos to display</p>
      </div>
    );
  }

  // Data state
  return (
    <div className="grid grid-cols-3 gap-2">
      {photos.map((photo) => (
        <img
          key={photo.id}
          src={`https://picsum.photos/seed/${photo.id}/150`}
          alt={photo.title}
          className="aspect-square object-cover rounded bg-base-300"
        />
      ))}
    </div>
  );
}

function PhotoGalleryDemo() {
  const [simulateError, setSimulateError] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);
  const [key, setKey] = useState(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => {
              setSimulateError(e.target.checked);
              setSimulateEmpty(false);
              setKey((k) => k + 1);
            }}
            className="checkbox checkbox-sm checkbox-error"
          />
          <span className="text-sm">Simulate Error</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={simulateEmpty}
            onChange={(e) => {
              setSimulateEmpty(e.target.checked);
              setSimulateError(false);
              setKey((k) => k + 1);
            }}
            className="checkbox checkbox-sm checkbox-warning"
          />
          <span className="text-sm">Simulate Empty</span>
        </label>
        <button
          onClick={() => setKey((k) => k + 1)}
          className="btn btn-ghost btn-xs gap-1"
        >
          <HiOutlineRefresh size={14} />
          Reload
        </button>
      </div>
      <div className="bg-base-300 rounded-lg p-4">
        <PhotoGallery key={`${key}-${simulateError}-${simulateEmpty}`} />
      </div>
    </div>
  );
}

// ============================================
// Demo 2: Search with States
// ============================================

interface SearchResult {
  id: number;
  title: string;
  body: string;
}

function SearchDemo() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));
        
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?_limit=5&title_like=${encodeURIComponent(query)}`
        );
        if (!res.ok) throw new Error('Search failed');
        const data = await res.json();
        setResults(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const renderContent = () => {
    // Not searched yet - show prompt
    if (!hasSearched && !query) {
      return (
        <div className="flex flex-col items-center py-8 text-center text-base-content/50">
          <HiOutlineSearch size={32} className="mb-2" />
          <p className="text-sm">Enter a search term to find posts</p>
        </div>
      );
    }

    // Loading
    if (loading) {
      return (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-4 bg-base-content/10 rounded w-3/4" />
              <div className="h-3 bg-base-content/10 rounded w-full" />
            </div>
          ))}
        </div>
      );
    }

    // Error
    if (error) {
      return (
        <div className="flex flex-col items-center py-6 text-center">
          <HiOutlineExclamationCircle className="text-error mb-2" size={24} />
          <p className="text-sm text-error">{error.message}</p>
        </div>
      );
    }

    // No results
    if (results.length === 0 && hasSearched) {
      return (
        <div className="flex flex-col items-center py-6 text-center">
          <HiOutlineSearch className="text-base-content/30 mb-2" size={24} />
          <p className="text-sm text-base-content/60">
            No results for "{query}"
          </p>
          <p className="text-xs text-base-content/40 mt-1">
            Try different keywords
          </p>
        </div>
      );
    }

    // Results
    return (
      <ul className="space-y-3">
        {results.map((result) => (
          <li key={result.id} className="p-3 bg-base-200 rounded-lg">
            <h5 className="font-medium text-sm mb-1 line-clamp-1">
              {result.title}
            </h5>
            <p className="text-xs text-base-content/60 line-clamp-2">
              {result.body}
            </p>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <HiOutlineSearch
          className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/40"
          size={18}
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="input input-bordered w-full pl-10"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 btn btn-ghost btn-xs btn-square"
          >
            <HiX size={14} />
          </button>
        )}
      </div>
      <div className="bg-base-300 rounded-lg p-4 min-h-[200px]">
        {renderContent()}
      </div>
    </div>
  );
}

// ============================================
// Demo 3: Shopping Cart
// ============================================

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

function ShoppingCartDemo() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading cart
    const timer = setTimeout(() => {
      setItems([
        { id: 1, name: 'React Handbook', price: 29.99, quantity: 1 },
        { id: 2, name: 'TypeScript Guide', price: 24.99, quantity: 2 },
      ]);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setItems([]);

  // Loading
  if (loading) {
    return (
      <div className="space-y-3">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center gap-3">
            <div className="w-16 h-16 bg-base-content/10 rounded" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-base-content/10 rounded w-2/3" />
              <div className="h-3 bg-base-content/10 rounded w-1/3" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Empty cart
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center py-8 text-center">
        <HiOutlineShoppingCart className="text-base-content/30 mb-2" size={32} />
        <h4 className="font-semibold mb-1">Your cart is empty</h4>
        <p className="text-sm text-base-content/60 mb-4">
          Add some items to get started!
        </p>
        <button
          onClick={() =>
            setItems([{ id: 1, name: 'Sample Item', price: 19.99, quantity: 1 }])
          }
          className="btn btn-primary btn-sm"
        >
          Add Sample Item
        </button>
      </div>
    );
  }

  // Cart with items
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 p-3 bg-base-200 rounded-lg"
          >
            <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
              <span className="text-lg">📚</span>
            </div>
            <div className="flex-1">
              <div className="font-medium text-sm">{item.name}</div>
              <div className="text-xs text-base-content/60">
                ${item.price.toFixed(2)} × {item.quantity}
              </div>
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="btn btn-ghost btn-xs btn-square"
            >
              <HiX size={14} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-3 border-t border-base-content/10">
        <div>
          <div className="text-sm text-base-content/60">Total</div>
          <div className="font-bold text-lg">${total.toFixed(2)}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={clearCart} className="btn btn-ghost btn-sm">
            Clear
          </button>
          <button className="btn btn-primary btn-sm">Checkout</button>
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Playground
// ============================================

export default function StatesPlayground(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<PlaygroundTab>('photos');

  const tabs: { id: PlaygroundTab; label: string; icon: React.ReactNode }[] = [
    { id: 'photos', label: 'Photo Gallery', icon: <HiOutlinePhotograph size={16} /> },
    { id: 'search', label: 'Search', icon: <HiOutlineSearch size={16} /> },
    { id: 'cart', label: 'Shopping Cart', icon: <HiOutlineShoppingCart size={16} /> },
  ];

  return (
    <div className="space-y-4">
      {/* Tab selector */}
      <div className="flex gap-2 flex-wrap">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm gap-2 ${
              activeTab === tab.id ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="card bg-base-200 p-4">
        {activeTab === 'photos' && <PhotoGalleryDemo />}
        {activeTab === 'search' && <SearchDemo />}
        {activeTab === 'cart' && <ShoppingCartDemo />}
      </div>

      {/* Tips */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">What to Notice</h4>
        <ul className="text-sm space-y-2 text-base-content/70">
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Skeletons match layout</strong> — They preview the content structure
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Errors are actionable</strong> — Always provide a retry option
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Empty states guide users</strong> — They explain what to do next
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary mt-1">•</span>
            <span>
              <strong>Search shows context</strong> — Different states for "no query" vs "no results"
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}


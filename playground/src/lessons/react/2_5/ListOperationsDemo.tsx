// ============================================
// ListOperationsDemo - Filter, Sort, Transform
// ============================================

import { useState } from 'react';
import { HiOutlineSearch, HiOutlineSortAscending, HiOutlineSortDescending } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import chainMethodsExample from './examples/ChainMethodsExample.tsx?raw';

// ============================================
// Types
// ============================================

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  inStock: boolean;
}

type SortBy = 'name' | 'price';
type SortOrder = 'asc' | 'desc';
type StockFilter = 'all' | 'inStock' | 'outOfStock';

// ============================================
// Data
// ============================================

const PRODUCTS: Product[] = [
  { id: 1, name: 'Laptop Pro', category: 'Electronics', price: 1299, inStock: true },
  { id: 2, name: 'Wireless Mouse', category: 'Electronics', price: 49, inStock: true },
  { id: 3, name: 'Standing Desk', category: 'Furniture', price: 599, inStock: false },
  { id: 4, name: 'Mechanical Keyboard', category: 'Electronics', price: 159, inStock: true },
  { id: 5, name: 'Office Chair', category: 'Furniture', price: 399, inStock: true },
  { id: 6, name: 'Monitor 27"', category: 'Electronics', price: 449, inStock: false },
  { id: 7, name: 'Desk Lamp', category: 'Furniture', price: 79, inStock: true },
  { id: 8, name: 'USB-C Hub', category: 'Electronics', price: 89, inStock: true },
];

// ============================================
// Main Component
// ============================================

export default function ListOperationsDemo(): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stockFilter, setStockFilter] = useState<StockFilter>('all');
  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');

  // Get unique categories
  const categories = [...new Set(PRODUCTS.map((p) => p.category))];

  // Apply all transformations
  const filteredProducts = PRODUCTS
    // 1. Filter by search term
    .filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
    // 2. Filter by category
    .filter((product) => (categoryFilter === 'all' ? true : product.category === categoryFilter))
    // 3. Filter by stock
    .filter((product) => {
      if (stockFilter === 'all') return true;
      if (stockFilter === 'inStock') return product.inStock;
      return !product.inStock;
    })
    // 4. Sort
    .sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {/* Search */}
        <div className="relative">
          <HiOutlineSearch
            className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50"
            size={16}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full pl-9"
          />
        </div>

        {/* Category Filter */}
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="select select-bordered select-sm w-full"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Stock Filter */}
        <select
          value={stockFilter}
          onChange={(e) => setStockFilter(e.target.value as StockFilter)}
          className="select select-bordered select-sm w-full"
        >
          <option value="all">All Stock Status</option>
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>

        {/* Sort */}
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortBy)}
            className="select select-bordered select-sm flex-1"
          >
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="btn btn-sm btn-square btn-ghost"
            title={sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          >
            {sortOrder === 'asc' ? (
              <HiOutlineSortAscending size={18} />
            ) : (
              <HiOutlineSortDescending size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-base-content/50 mb-3">
        Showing {filteredProducts.length} of {PRODUCTS.length} products
      </div>

      {/* Product List */}
      <div className="card bg-base-300 p-4">
        {filteredProducts.length > 0 ? (
          <div className="space-y-2">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-3 rounded-lg bg-base-200"
              >
                <div className="flex items-center gap-3">
                  <div className="flex flex-col">
                    <span className="font-medium">{product.name}</span>
                    <span className="text-xs text-base-content/50">{product.category}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-primary">${product.price}</span>
                  <span
                    className={`badge badge-sm ${
                      product.inStock ? 'badge-success' : 'badge-error'
                    }`}
                  >
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-base-content/50">
            No products match your filters
          </div>
        )}
      </div>

      {/* Code Example */}
      <div className="mt-4 card bg-base-300 p-4">
        <div className="text-xs text-base-content/50 mb-2 font-mono">// Chain array methods</div>
        <CodeSnippet code={chainMethodsExample} language="tsx" showCopy={false} />
      </div>
    </div>
  );
}

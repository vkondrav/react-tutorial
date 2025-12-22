// ============================================
// Why Lift State Demo
// ============================================

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineShoppingCart, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import siblingProblemCode from './examples/SiblingProblem.tsx?raw';
import siblingSolutionCode from './examples/SiblingSolution.tsx?raw';

// ============================================
// Problem Demo: Isolated Siblings
// ============================================

interface Product {
  id: number;
  name: string;
  price: number;
}

// Each component has its own isolated state
function IsolatedProductList() {
  const products: Product[] = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 699 },
    { id: 3, name: 'Headphones', price: 199 },
  ];
  const [selected, setSelected] = useState<number[]>([]);

  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-3 text-sm">ProductList (has its own state)</h4>
      <div className="space-y-2">
        {products.map((product) => (
          <button
            key={product.id}
            onClick={() =>
              setSelected((prev) =>
                prev.includes(product.id)
                  ? prev.filter((id) => id !== product.id)
                  : [...prev, product.id]
              )
            }
            className={`btn btn-sm w-full justify-between ${
              selected.includes(product.id) ? 'btn-primary' : 'btn-ghost'
            }`}
          >
            <span>{product.name}</span>
            <span>${product.price}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-base-content/60 mt-2">
        Selected: {selected.length} items (state trapped here!)
      </p>
    </div>
  );
}

function IsolatedCartSummary() {
  // This component can't access ProductList's state!
  return (
    <div className="card bg-base-300 p-4">
      <h4 className="font-semibold mb-3 text-sm">CartSummary (separate state)</h4>
      <div className="flex items-center gap-2 text-error">
        <HiX size={20} />
        <span>Can't access cart data!</span>
      </div>
      <p className="text-xs text-base-content/60 mt-2">No way to know what's in the cart...</p>
    </div>
  );
}

// ============================================
// Solution Demo: Lifted State
// ============================================

interface CartItem extends Product {
  inCart: boolean;
}

function LiftedDemo() {
  // State lives in the PARENT - shared by both children
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: 'Laptop', price: 999, inCart: false },
    { id: 2, name: 'Phone', price: 699, inCart: false },
    { id: 3, name: 'Headphones', price: 199, inCart: false },
  ]);

  const toggleCart = (id: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, inCart: !item.inCart } : item))
    );
  };

  const cartItems = items.filter((item) => item.inCart);
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-4">
      <div className="alert alert-info">
        <HiOutlineLightBulb size={20} />
        <span>
          State is <strong>lifted</strong> to this parent component and passed down as props!
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Product List receives items and callback */}
        <div className="card bg-base-300 p-4">
          <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
            <HiCheck className="text-success" size={16} />
            ProductList (receives props)
          </h4>
          <div className="space-y-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleCart(item.id)}
                className={`btn btn-sm w-full justify-between ${
                  item.inCart ? 'btn-primary' : 'btn-ghost'
                }`}
              >
                <span>{item.name}</span>
                <span className="flex items-center gap-2">
                  ${item.price}
                  {item.inCart && <HiCheck size={16} />}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Cart Summary receives filtered cart items */}
        <div className="card bg-base-300 p-4">
          <h4 className="font-semibold mb-3 text-sm flex items-center gap-2">
            <HiCheck className="text-success" size={16} />
            CartSummary (receives props)
          </h4>
          <div className="flex items-center gap-2 mb-3">
            <HiOutlineShoppingCart size={20} className="text-primary" />
            <span className="font-bold">{cartItems.length} items</span>
          </div>
          {cartItems.length > 0 ? (
            <>
              <ul className="text-sm space-y-1 mb-3">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>{item.name}</span>
                    <span>${item.price}</span>
                  </li>
                ))}
              </ul>
              <div className="border-t border-base-content/20 pt-2 font-bold flex justify-between">
                <span>Total:</span>
                <span className="text-primary">${total}</span>
              </div>
            </>
          ) : (
            <p className="text-base-content/60 text-sm">Cart is empty</p>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function WhyLiftStateDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'problem' | 'solution'>('problem');

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('problem')}
          className={`btn btn-sm ${activeTab === 'problem' ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} />
          The Problem
        </button>
        <button
          onClick={() => setActiveTab('solution')}
          className={`btn btn-sm ${activeTab === 'solution' ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} />
          The Solution
        </button>
      </div>

      {/* Demo Content */}
      <div className="card bg-base-200 p-6">
        {activeTab === 'problem' ? (
          <div className="space-y-4">
            <div className="alert alert-error">
              <HiX size={20} />
              <span>
                <strong>Problem:</strong> Sibling components can't share state directly!
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <IsolatedProductList />
              <IsolatedCartSummary />
            </div>
          </div>
        ) : (
          <LiftedDemo />
        )}
      </div>

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline">
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>

      {showCode && (
        <div className="space-y-4">
          <CodeSnippet
            title="The Problem: State Trapped in Sibling"
            language="tsx"
            code={siblingProblemCode}
          />
          <CodeSnippet
            title="The Solution: Lifted State"
            language="tsx"
            code={siblingSolutionCode}
          />
        </div>
      )}
    </div>
  );
}

// ============================================
// Delete Data Demo
// DELETE request patterns with confirmation
// ============================================

import { useState } from 'react';
import {
  HiOutlineTrash,
  HiOutlineExclamationCircle,
  HiOutlineRefresh,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import deleteRequestCode from './examples/DeleteRequest.tsx?raw';

interface Item {
  id: number;
  title: string;
}

const INITIAL_ITEMS: Item[] = [
  { id: 1, title: 'First item' },
  { id: 2, title: 'Second item' },
  { id: 3, title: 'Third item' },
  { id: 4, title: 'Fourth item' },
];

export default function DeleteDataDemo(): React.ReactElement {
  const [items, setItems] = useState<Item[]>(INITIAL_ITEMS);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [confirmId, setConfirmId] = useState<number | null>(null);
  const [showCode, setShowCode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      // Remove from local state
      setItems((prev) => prev.filter((item) => item.id !== id));
      setConfirmId(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  const resetDemo = () => {
    setItems(INITIAL_ITEMS);
    setConfirmId(null);
    setError(null);
  };

  return (
    <div className="space-y-4">
      {/* Items list */}
      <div className="card bg-base-300 p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold">Items ({items.length})</h4>
          {items.length < INITIAL_ITEMS.length && (
            <button onClick={resetDemo} className="btn btn-ghost btn-sm gap-2">
              <HiOutlineRefresh size={14} />
              Reset
            </button>
          )}
        </div>

        {error && (
          <div className="flex items-center gap-2 text-error text-sm mb-4">
            <HiOutlineExclamationCircle size={16} />
            {error}
          </div>
        )}

        {items.length === 0 ? (
          <div className="text-center py-8 text-base-content/50">
            <HiOutlineTrash size={32} className="mx-auto mb-2 opacity-50" />
            <p>All items deleted</p>
            <button onClick={resetDemo} className="btn btn-primary btn-sm mt-4">
              Reset Demo
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex items-center justify-between p-3 rounded-lg transition-all ${
                  confirmId === item.id ? 'bg-error/10 border border-error/30' : 'bg-base-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="badge badge-sm">{item.id}</span>
                  <span>{item.title}</span>
                </div>

                {confirmId === item.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-error">Delete?</span>
                    <button
                      onClick={() => handleDelete(item.id)}
                      disabled={deletingId === item.id}
                      className="btn btn-error btn-sm"
                    >
                      {deletingId === item.id ? (
                        <span className="loading loading-spinner loading-xs" />
                      ) : (
                        'Yes'
                      )}
                    </button>
                    <button
                      onClick={() => setConfirmId(null)}
                      disabled={deletingId === item.id}
                      className="btn btn-ghost btn-sm"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmId(item.id)}
                    className="btn btn-ghost btn-sm btn-square text-error/70 hover:text-error hover:bg-error/10"
                  >
                    <HiOutlineTrash size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Code toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-ghost btn-sm gap-2">
        {showCode ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showCode ? 'Hide' : 'Show'} Code
      </button>

      {showCode && (
        <CodeSnippet code={deleteRequestCode} language="tsx" title="DELETE Request Pattern" />
      )}

      {/* Best practices */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">Delete Best Practices</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Always confirm before deleting</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Show loading state during deletion</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Provide undo option when possible</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Never delete without confirmation</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Don't leave user wondering if it worked</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Don't ignore errors silently</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

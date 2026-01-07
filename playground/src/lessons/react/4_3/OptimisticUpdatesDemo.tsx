// ============================================
// Optimistic vs Pessimistic Updates Demo
// Compare update strategies side by side
// ============================================

import { useState } from 'react';
import {
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineHeart,
  HiHeart,
  HiOutlineRefresh,
} from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import pessimisticUpdateCode from './examples/PessimisticUpdate.tsx?raw';
import optimisticUpdateCode from './examples/OptimisticUpdate.tsx?raw';

interface Post {
  id: number;
  title: string;
  liked: boolean;
}

const SAMPLE_POST: Post = {
  id: 1,
  title: 'Understanding Optimistic Updates',
  liked: false,
};

// Simulated API call with configurable delay and failure rate
const simulateApiCall = async (shouldFail: boolean, delay: number = 1500): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, delay));
  if (shouldFail) {
    throw new Error('Server error: Failed to update');
  }
};

export default function OptimisticUpdatesDemo(): React.ReactElement {
  // Pessimistic state
  const [pessimisticPost, setPessimisticPost] = useState<Post>(SAMPLE_POST);
  const [pessimisticLoading, setPessimisticLoading] = useState(false);

  // Optimistic state
  const [optimisticPost, setOptimisticPost] = useState<Post>(SAMPLE_POST);
  const [optimisticLoading, setOptimisticLoading] = useState(false);
  const [optimisticError, setOptimisticError] = useState<string | null>(null);

  // Settings
  const [simulateError, setSimulateError] = useState(false);
  const [networkDelay, setNetworkDelay] = useState(1500);

  // Pessimistic: Wait for server, then update UI
  const handlePessimisticLike = async () => {
    setPessimisticLoading(true);

    try {
      await simulateApiCall(simulateError, networkDelay);
      // Only update UI after success
      setPessimisticPost((prev) => ({ ...prev, liked: !prev.liked }));
    } catch (err) {
      console.error('Pessimistic update failed:', err);
    } finally {
      setPessimisticLoading(false);
    }
  };

  // Optimistic: Update UI immediately, rollback on error
  const handleOptimisticLike = async () => {
    setOptimisticLoading(true);
    setOptimisticError(null);

    // Save previous state for rollback
    const previousState = optimisticPost.liked;

    // Update UI immediately (optimistic)
    setOptimisticPost((prev) => ({ ...prev, liked: !prev.liked }));

    try {
      await simulateApiCall(simulateError, networkDelay);
      // Success! UI is already updated
    } catch {
      // Rollback on error
      setOptimisticPost((prev) => ({ ...prev, liked: previousState }));
      setOptimisticError('Failed! Rolled back.');

      // Clear error after 2 seconds
      setTimeout(() => setOptimisticError(null), 2000);
    } finally {
      setOptimisticLoading(false);
    }
  };

  const resetDemo = () => {
    setPessimisticPost(SAMPLE_POST);
    setOptimisticPost(SAMPLE_POST);
    setOptimisticError(null);
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="card bg-base-300 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={simulateError}
              onChange={(e) => setSimulateError(e.target.checked)}
              className="checkbox checkbox-sm checkbox-error"
            />
            <span className="text-sm">Simulate Error</span>
          </label>

          <div className="flex items-center gap-2">
            <span className="text-sm">Delay:</span>
            <select
              value={networkDelay}
              onChange={(e) => setNetworkDelay(Number(e.target.value))}
              className="select select-bordered select-sm"
            >
              <option value={500}>500ms</option>
              <option value={1500}>1.5s</option>
              <option value={3000}>3s</option>
            </select>
          </div>

          <button onClick={resetDemo} className="btn btn-ghost btn-sm gap-2 ml-auto">
            <HiOutlineRefresh size={14} />
            Reset
          </button>
        </div>
      </div>

      {/* Side by side comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Pessimistic */}
        <div className="card bg-base-200 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <HiOutlineShieldCheck className="text-secondary" size={20} />
            <h4 className="font-semibold">Pessimistic Update</h4>
          </div>

          <p className="text-sm text-base-content/60">
            Waits for server confirmation before updating UI. Safer but feels slower.
          </p>

          <div className="p-4 bg-base-300 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{pessimisticPost.title}</span>
              <button
                onClick={handlePessimisticLike}
                disabled={pessimisticLoading}
                className={`btn btn-sm gap-2 ${pessimisticPost.liked ? 'btn-error' : 'btn-ghost'}`}
              >
                {pessimisticLoading ? (
                  <span className="loading loading-spinner loading-xs" />
                ) : pessimisticPost.liked ? (
                  <HiHeart size={18} />
                ) : (
                  <HiOutlineHeart size={18} />
                )}
                {pessimisticLoading ? 'Saving...' : pessimisticPost.liked ? 'Liked' : 'Like'}
              </button>
            </div>
          </div>

          <div className="text-xs bg-base-300 p-3 rounded space-y-1">
            <div>1. User clicks like</div>
            <div>2. Show loading spinner</div>
            <div>3. Wait for server response...</div>
            <div>4. Update UI on success</div>
          </div>
        </div>

        {/* Optimistic */}
        <div className="card bg-base-200 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            <h4 className="font-semibold">Optimistic Update</h4>
          </div>

          <p className="text-sm text-base-content/60">
            Updates UI immediately, rolls back on error. Feels instant but needs error handling.
          </p>

          <div className="p-4 bg-base-300 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="font-medium">{optimisticPost.title}</span>
              <button
                onClick={handleOptimisticLike}
                disabled={optimisticLoading}
                className={`btn btn-sm gap-2 ${optimisticPost.liked ? 'btn-error' : 'btn-ghost'}`}
              >
                {optimisticPost.liked ? <HiHeart size={18} /> : <HiOutlineHeart size={18} />}
                {optimisticPost.liked ? 'Liked' : 'Like'}
                {optimisticLoading && <span className="loading loading-spinner loading-xs" />}
              </button>
            </div>
            {optimisticError && <div className="text-error text-xs mt-2">{optimisticError}</div>}
          </div>

          <div className="text-xs bg-base-300 p-3 rounded space-y-1">
            <div>1. User clicks like</div>
            <div>2. Update UI immediately ⚡</div>
            <div>3. Send request in background</div>
            <div>4. Rollback if error occurs</div>
          </div>
        </div>
      </div>

      {/* Code comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-semibold text-sm mb-2 text-secondary">Pessimistic Code</h5>
          <CodeSnippet code={pessimisticUpdateCode} language="tsx" />
        </div>

        <div>
          <h5 className="font-semibold text-sm mb-2 text-primary">Optimistic Code</h5>
          <CodeSnippet code={optimisticUpdateCode} language="tsx" />
        </div>
      </div>

      {/* When to use each */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">When to Use Each</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h5 className="font-medium text-secondary mb-2">Use Pessimistic When:</h5>
            <ul className="space-y-1 text-base-content/70">
              <li>• Critical data (payments, orders)</li>
              <li>• Complex validation on server</li>
              <li>• Data depends on server response</li>
              <li>• Network is unreliable</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-primary mb-2">Use Optimistic When:</h5>
            <ul className="space-y-1 text-base-content/70">
              <li>• Low-risk actions (likes, follows)</li>
              <li>• UX speed is critical</li>
              <li>• Easy to rollback</li>
              <li>• Errors are rare</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

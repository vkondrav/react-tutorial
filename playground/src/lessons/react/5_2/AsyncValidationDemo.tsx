// ============================================
// AsyncValidationDemo - Server-side validation
// ============================================

import { useState, useEffect } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import asyncValidationCode from './examples/AsyncValidation.tsx?raw';

// Simulated API - pretend these usernames are taken
const TAKEN_USERNAMES = ['admin', 'user', 'test', 'john', 'jane', 'demo'];

// Simulate API call with delay
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise((resolve) => setTimeout(resolve, 800));
  return !TAKEN_USERNAMES.includes(username.toLowerCase());
};

export default function AsyncValidationDemo(): React.ReactElement {
  const [username, setUsername] = useState('');
  const [touched, setTouched] = useState(false);
  const [checking, setChecking] = useState(false);
  const [available, setAvailable] = useState<boolean | null>(null);
  const [syncError, setSyncError] = useState('');

  // Synchronous validation
  const validateSync = (value: string): string => {
    if (!value) return 'Username is required';
    if (value.length < 3) return 'Minimum 3 characters';
    if (!/^[a-zA-Z0-9_]+$/.test(value)) return 'Only letters, numbers, and underscores';
    return '';
  };

  // Debounced async validation
  useEffect(() => {
    const error = validateSync(username);
    setSyncError(error);

    if (error || !username) {
      setAvailable(null);
      return;
    }

    // Debounce: wait 500ms before checking
    const timer = setTimeout(async () => {
      setChecking(true);
      try {
        const isAvailable = await checkUsername(username);
        setAvailable(isAvailable);
      } catch {
        setAvailable(null);
      } finally {
        setChecking(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [username]);

  const getStatus = () => {
    if (!touched || !username) return null;
    if (syncError) return { type: 'error' as const, message: syncError };
    if (checking) return { type: 'loading' as const, message: 'Checking availability...' };
    if (available === false) return { type: 'error' as const, message: 'Username already taken' };
    if (available === true) return { type: 'success' as const, message: 'Username available!' };
    return null;
  };

  const status = getStatus();

  return (
    <div className="space-y-4">
      <div className="card bg-base-300 p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="badge badge-primary">Username Availability</span>
        </div>

        <div>
          <label className="label">
            <span className="label-text">Choose a username</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={() => setTouched(true)}
              placeholder="Enter username..."
              className={`input input-bordered w-full pr-10 ${
                status?.type === 'error'
                  ? 'input-error'
                  : status?.type === 'success'
                    ? 'input-success'
                    : ''
              }`}
            />
            {checking && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <span className="loading loading-spinner loading-sm text-primary"></span>
              </div>
            )}
            {!checking && status?.type === 'success' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-success">
                <HiCheck size={20} />
              </div>
            )}
            {!checking && status?.type === 'error' && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-error">
                <HiX size={20} />
              </div>
            )}
          </div>

          {status && (
            <div
              className={`flex items-center gap-1 mt-1 text-xs ${
                status.type === 'error'
                  ? 'text-error'
                  : status.type === 'success'
                    ? 'text-success'
                    : 'text-base-content/60'
              }`}
            >
              {status.type === 'loading' && (
                <span className="loading loading-spinner loading-xs"></span>
              )}
              {status.type === 'error' && <HiX size={14} />}
              {status.type === 'success' && <HiCheck size={14} />}
              {status.message}
            </div>
          )}
        </div>

        <div className="text-xs text-base-content/60">
          <p className="mb-1">
            <strong>Try these taken usernames:</strong>
          </p>
          <div className="flex flex-wrap gap-1">
            {TAKEN_USERNAMES.map((name) => (
              <button
                key={name}
                onClick={() => {
                  setUsername(name);
                  setTouched(true);
                }}
                className="badge badge-ghost cursor-pointer hover:badge-error"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="flex items-start gap-2 text-sm bg-primary/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-base-content/70">
          <strong className="text-primary">Debouncing</strong> waits until the user stops typing
          before making an API call. This prevents flooding the server with requests on every
          keystroke.
        </div>
      </div>

      {/* Code Example */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">The Pattern</h4>
        <div>
          <CodeSnippet code={asyncValidationCode} language="tsx" />
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Validation Flow</h4>
        <div className="flex items-center justify-between text-xs text-center">
          <div className="flex-1">
            <div className="bg-base-200 rounded-lg p-2 mb-1">User Types</div>
            <div className="text-base-content/50">→</div>
          </div>
          <div className="flex-1">
            <div className="bg-primary/20 rounded-lg p-2 mb-1">Sync Check</div>
            <div className="text-base-content/50">format, length</div>
          </div>
          <div className="flex-1">
            <div className="bg-secondary/20 rounded-lg p-2 mb-1">Debounce</div>
            <div className="text-base-content/50">wait 500ms</div>
          </div>
          <div className="flex-1">
            <div className="bg-accent/20 rounded-lg p-2 mb-1">API Call</div>
            <div className="text-base-content/50">check server</div>
          </div>
          <div className="flex-1">
            <div className="bg-success/20 rounded-lg p-2 mb-1">Show Result</div>
            <div className="text-base-content/50">✓ or ✗</div>
          </div>
        </div>
      </div>
    </div>
  );
}

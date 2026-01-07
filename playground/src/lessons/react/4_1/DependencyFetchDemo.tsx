// ============================================
// Demo: Fetching with Dependencies
// Shows how the dependency array controls when fetching happens
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineUser } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import dependencyFetchCode from './examples/DependencyFetch.tsx?raw';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: {
    city: string;
  };
}

export default function DependencyFetchDemo(): React.ReactElement {
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchLog, setFetchLog] = useState<string[]>([]);

  // Fetch when selectedUserId changes
  useEffect(() => {
    const controller = new AbortController();

    async function fetchUser() {
      try {
        setLoading(true);
        setError(null);
        setFetchLog((prev) => [...prev, `Fetching user ${selectedUserId}...`]);

        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${selectedUserId}`,
          { signal: controller.signal }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUser(data);
        setFetchLog((prev) => [...prev, `✓ Got user ${selectedUserId}: ${data.name}`]);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
          setFetchLog((prev) => [...prev, `✗ Error: ${err.message}`]);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUser();

    return () => {
      controller.abort();
    };
  }, [selectedUserId]); // <-- Re-fetches when userId changes!

  const clearLog = () => setFetchLog([]);

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineUser className="text-primary" size={20} />
        Fetch on Dependency Change
      </h3>

      {/* User selector */}
      <div className="mb-4">
        <label className="text-sm text-base-content/70 mb-2 block">Select a user to fetch:</label>
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((id) => (
            <button
              key={id}
              onClick={() => setSelectedUserId(id)}
              className={`btn btn-sm ${selectedUserId === id ? 'btn-primary' : 'btn-outline'}`}
            >
              User {id}
            </button>
          ))}
        </div>
      </div>

      {/* Dependency array visualization */}
      <div className="bg-base-300 rounded-lg p-3 mb-4">
        <div className="text-xs text-base-content/60 mb-1">Dependency Array:</div>
        <code className="text-sm text-secondary">
          useEffect(() =&gt; {'{'} fetchUser() {'}'}, [
          <span className="text-primary font-bold">selectedUserId</span>
          ]);
        </code>
        <div className="text-xs text-base-content/60 mt-2">
          Current value: <span className="text-primary font-bold">{selectedUserId}</span> → Effect
          runs when this changes
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* User display */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Fetched User Data</div>
          {loading ? (
            <div className="flex items-center gap-2 py-4">
              <div className="loading loading-spinner loading-sm text-primary" />
              <span className="text-sm">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-error text-sm">{error}</div>
          ) : user ? (
            <div className="space-y-2">
              <div>
                <div className="font-bold text-lg text-primary">{user.name}</div>
                <div className="text-xs text-base-content/60">@{user.username}</div>
              </div>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-base-content/60">Email:</span>
                  <span>{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">City:</span>
                  <span>{user.address.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-base-content/60">Website:</span>
                  <span>{user.website}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        {/* Fetch log */}
        <div className="card bg-base-300 p-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-xs text-base-content/60">Fetch Log</div>
            <button onClick={clearLog} className="btn btn-ghost btn-xs" title="Clear log">
              Clear
            </button>
          </div>
          <div className="bg-base-200 rounded p-2 h-32 overflow-auto font-mono text-xs">
            {fetchLog.length === 0 ? (
              <span className="text-base-content/40">No fetches yet...</span>
            ) : (
              fetchLog.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.startsWith('✓')
                      ? 'text-success'
                      : log.startsWith('✗')
                        ? 'text-error'
                        : 'text-base-content/70'
                  }`}
                >
                  {log}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Code snippet */}
      <CodeSnippet title="Key Concept" language="tsx" code={dependencyFetchCode} />
    </div>
  );
}

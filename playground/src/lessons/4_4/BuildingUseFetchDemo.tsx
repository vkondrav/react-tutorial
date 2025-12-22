// ============================================
// Demo: Building useFetch Step by Step
// Shows incremental implementation of the hook
// ============================================

import { useState, useEffect, useCallback } from 'react';
import {
  HiOutlineLightBulb,
  HiOutlineRefresh,
  HiChevronDown,
  HiChevronRight,
} from 'react-icons/hi';

// ============================================
// Types
// ============================================
interface UseFetchResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// ============================================
// The Final useFetch Hook
// ============================================
function useFetch<T>(url: string, deps: unknown[] = []): UseFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(url, { signal: controller.signal });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err instanceof Error && err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchData();

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refetchIndex, ...deps]);

  return { data, loading, error, refetch };
}

// ============================================
// Step definitions
// ============================================
const steps = [
  {
    title: 'Step 1: Basic Structure',
    description: 'Start with the three state variables every fetch needs',
    code: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // TODO: Add fetch logic

  return { data, loading, error };
}`,
    highlight: 'State setup',
  },
  {
    title: 'Step 2: Add the useEffect',
    description: 'Fetch data when the URL changes',
    code: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        setData(await response.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);  // Re-fetch when URL changes

  return { data, loading, error };
}`,
    highlight: 'Fetch logic',
  },
  {
    title: 'Step 3: Add AbortController',
    description: 'Clean up to prevent memory leaks and race conditions',
    code: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();  // Create controller

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, {
          signal: controller.signal  // Pass signal to fetch
        });
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') {  // Ignore abort errors
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => controller.abort();  // Cleanup on unmount/re-run
  }, [url]);

  return { data, loading, error };
}`,
    highlight: 'Cleanup',
  },
  {
    title: 'Step 4: Add Refetch Function',
    description: 'Allow manual re-fetching of data',
    code: `function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refetchIndex, setRefetchIndex] = useState(0);

  const refetch = useCallback(() => {
    setRefetchIndex(prev => prev + 1);  // Trigger re-fetch
  }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchData();

    return () => controller.abort();
  }, [url, refetchIndex]);  // Include refetchIndex

  return { data, loading, error, refetch };  // Export refetch
}`,
    highlight: 'Refetch',
  },
];

interface User {
  id: number;
  name: string;
  email: string;
}

export default function BuildingUseFetchDemo(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(0);
  const [showLiveDemo, setShowLiveDemo] = useState(false);

  // Live demo using our hook
  const { data: users, loading, error, refetch } = useFetch<User[]>(
    'https://jsonplaceholder.typicode.com/users'
  );

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Build useFetch Incrementally
      </h3>

      {/* Step navigation */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {steps.map((step, index) => (
          <button
            key={index}
            onClick={() => setCurrentStep(index)}
            className={`btn btn-sm ${currentStep === index ? 'btn-primary' : 'btn-ghost'}`}
          >
            {index + 1}. {step.highlight}
          </button>
        ))}
      </div>

      {/* Current step */}
      <div className="card bg-base-300 p-4 mb-4">
        <h4 className="font-semibold text-primary mb-1">{steps[currentStep].title}</h4>
        <p className="text-sm text-base-content/70 mb-3">{steps[currentStep].description}</p>
        <pre className="font-mono text-xs overflow-x-auto bg-base-200 rounded-lg p-3">
          <code>{steps[currentStep].code}</code>
        </pre>
      </div>

      {/* Progress indicator */}
      <div className="flex items-center gap-2 mb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded-full transition-colors ${
              index <= currentStep ? 'bg-primary' : 'bg-base-300'
            }`}
          />
        ))}
      </div>

      {/* Live demo toggle */}
      <button
        onClick={() => setShowLiveDemo(!showLiveDemo)}
        className="flex items-center gap-2 text-sm text-primary hover:underline mb-3"
      >
        {showLiveDemo ? <HiChevronDown size={16} /> : <HiChevronRight size={16} />}
        {showLiveDemo ? 'Hide' : 'Show'} Live Demo (Final Hook)
      </button>

      {showLiveDemo && (
        <div className="card bg-base-300 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold text-secondary">Using the Final Hook</span>
            <button
              onClick={refetch}
              disabled={loading}
              className="btn btn-sm btn-outline btn-primary"
            >
              <HiOutlineRefresh className={loading ? 'animate-spin' : ''} size={16} />
              Refetch
            </button>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-6">
              <div className="loading loading-spinner loading-md text-primary" />
              <span className="ml-2 text-sm text-base-content/70">Loading...</span>
            </div>
          ) : error ? (
            <div className="text-center py-6">
              <div className="text-error text-2xl mb-2">⚠️</div>
              <p className="text-error text-sm">{error}</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2">
              {users?.slice(0, 4).map((user) => (
                <div key={user.id} className="bg-base-200 rounded-lg p-2">
                  <div className="font-semibold text-sm text-primary">{user.name}</div>
                  <div className="text-xs text-base-content/60">{user.email}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-3 pt-3 border-t border-base-content/10">
            <div className="text-xs font-semibold text-base-content/60 mb-1">Usage:</div>
            <pre className="font-mono text-xs bg-base-200 rounded p-2">
              <code>{`const { data: users, loading, error, refetch } = useFetch<User[]>(url);`}</code>
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}


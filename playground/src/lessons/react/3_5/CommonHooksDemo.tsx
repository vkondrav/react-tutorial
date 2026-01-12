// ============================================
// Demo: Common Custom Hook Patterns
// ============================================

import { useState, useEffect, useCallback, type ChangeEvent } from 'react';
import { HiOutlineLightBulb, HiOutlineMoon, HiOutlineSun } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import useToggleCode from './examples/UseToggleHook.tsx?raw';
import useLocalStorageUsageCode from './examples/UseLocalStorageUsage.tsx?raw';
import useDebounceCode from './examples/UseDebounceHook.tsx?raw';

// ============================================
// Types
// ============================================
type SetValue<T> = (value: T | ((prev: T) => T)) => void;

interface ToggleActions {
  toggle: () => void;
  setTrue: () => void;
  setFalse: () => void;
}

// ============================================
// Custom Hook: useToggle
// ============================================
function useToggle(initialValue: boolean = false): [boolean, ToggleActions] {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(() => setValue((v) => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { toggle, setTrue, setFalse }];
}

// ============================================
// Custom Hook: useLocalStorage
// ============================================
function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue: SetValue<T> = useCallback(
    (value) => {
      try {
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error('useLocalStorage error:', error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

// ============================================
// Custom Hook: useDebounce
// ============================================
function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export default function CommonHooksDemo(): React.ReactElement {
  const [activeHook, setActiveHook] = useState<string>('toggle');

  return (
    <div className="card bg-base-200 p-5">
      <h3 className="font-semibold mb-4 flex items-center gap-2">
        <HiOutlineLightBulb className="text-primary" size={20} />
        Common Hook Patterns
      </h3>

      {/* Hook selector */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {[
          { id: 'toggle', label: 'useToggle' },
          { id: 'localStorage', label: 'useLocalStorage' },
          { id: 'debounce', label: 'useDebounce' },
        ].map((hook) => (
          <button
            key={hook.id}
            onClick={() => setActiveHook(hook.id)}
            className={`btn btn-sm ${activeHook === hook.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {hook.label}
          </button>
        ))}
      </div>

      {/* Demo content */}
      <div className="min-h-[280px]">
        {activeHook === 'toggle' && <ToggleDemo />}
        {activeHook === 'localStorage' && <LocalStorageDemo />}
        {activeHook === 'debounce' && <DebounceDemo />}
      </div>
    </div>
  );
}

// ============================================
// Toggle Demo
// ============================================
function ToggleDemo(): React.ReactElement {
  const [isOn, { toggle, setTrue, setFalse }] = useToggle(false);
  const [darkMode, { toggle: toggleDark }] = useToggle(false);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Simple Toggle</div>
          <div className={`text-4xl mb-3 ${isOn ? 'text-success' : 'text-error'}`}>
            {isOn ? 'ON' : 'OFF'}
          </div>
          <div className="flex gap-2">
            <button onClick={toggle} className="btn btn-sm btn-primary flex-1">
              Toggle
            </button>
            <button onClick={setTrue} className="btn btn-sm btn-success">
              On
            </button>
            <button onClick={setFalse} className="btn btn-sm btn-error">
              Off
            </button>
          </div>
        </div>
        <div className={`card p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`text-xs mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Dark Mode Toggle
          </div>
          <button
            onClick={toggleDark}
            className={`btn btn-circle ${darkMode ? 'btn-warning' : 'btn-neutral'}`}
          >
            {darkMode ? <HiOutlineSun size={24} /> : <HiOutlineMoon size={24} />}
          </button>
        </div>
      </div>

      <CodeSnippet title="Hook Code (TypeScript)" language="tsx" code={useToggleCode} />
    </div>
  );
}

// ============================================
// LocalStorage Demo
// ============================================
function LocalStorageDemo(): React.ReactElement {
  const [name, setName] = useLocalStorage<string>('demo-name', '');
  const [count, setCount] = useLocalStorage<number>('demo-count', 0);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Values persist across page reloads! Try refreshing the page.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Stored Name</div>
          <input
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            placeholder="Enter your name..."
            className="input input-bordered w-full mb-2"
          />
          <div className="text-xs text-base-content/50">
            {/* eslint-disable-next-line local/no-raw-code-element */}
            Saved to: <code>localStorage['demo-name']</code>
          </div>
        </div>
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/60 mb-2">Stored Count</div>
          <div className="text-3xl font-bold text-primary mb-2">{count}</div>
          <div className="flex gap-2">
            <button onClick={() => setCount((c) => c - 1)} className="btn btn-sm btn-outline">
              −
            </button>
            <button onClick={() => setCount((c) => c + 1)} className="btn btn-sm btn-primary">
              +
            </button>
            <button onClick={() => setCount(0)} className="btn btn-sm btn-ghost">
              Reset
            </button>
          </div>
        </div>
      </div>

      <CodeSnippet title="Usage (TypeScript)" language="tsx" code={useLocalStorageUsageCode} />
    </div>
  );
}

// ============================================
// Debounce Demo
// ============================================
function DebounceDemo(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>('');
  const debouncedValue = useDebounce(inputValue, 500);
  const [searchResults, setSearchResults] = useState<string[]>([]);

  // Simulate API call when debounced value changes
  useEffect(() => {
    if (debouncedValue) {
      // Simulate search results
      const results = ['React', 'Redux', 'Router', 'Remix', 'Relay']
        .filter((item) => item.toLowerCase().includes(debouncedValue.toLowerCase()))
        .map((item) => `${item} - Result`);
      setTimeout(() => {
        setSearchResults(results);
      }, 1000);
    } else {
      setTimeout(() => {
        setSearchResults([]);
      }, 1000);
    }
  }, [debouncedValue]);

  return (
    <div className="space-y-4">
      <p className="text-sm text-base-content/70">
        Debouncing delays the value update until typing stops. Great for search inputs!
      </p>

      <div className="card bg-base-300 p-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
          placeholder="Type to search..."
          className="input input-bordered w-full mb-3"
        />
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-base-content/60">Instant value:</span>{' '}
            <span className="font-mono text-warning">{inputValue || '(empty)'}</span>
          </div>
          <div>
            <span className="text-base-content/60">Debounced (500ms):</span>{' '}
            <span className="font-mono text-success">{debouncedValue || '(empty)'}</span>
          </div>
        </div>
        {searchResults.length > 0 && (
          <div className="mt-3 pt-3 border-t border-base-content/10">
            <div className="text-xs text-base-content/60 mb-2">Search Results:</div>
            {searchResults.map((result, i) => (
              <div key={i} className="text-sm py-1">
                {result}
              </div>
            ))}
          </div>
        )}
      </div>

      <CodeSnippet title="Hook Code (TypeScript)" language="tsx" code={useDebounceCode} />
    </div>
  );
}

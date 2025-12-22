// ============================================
// CleanupDemo - Understanding cleanup functions
// ============================================

import { useState, useEffect } from 'react';
import { HiOutlineExclamationCircle, HiOutlineTrash } from 'react-icons/hi';

export default function CleanupDemo() {
  const [showTimer, setShowTimer] = useState(false);
  const [showListener, setShowListener] = useState(false);

  return (
    <div className="card bg-base-300 p-6">
      <h3 className="text-lg font-semibold mb-4">Cleanup Functions Prevent Memory Leaks</h3>

      <p className="text-base-content/70 mb-6">
        When your effect sets up something that persists (timer, event listener, subscription), you
        must clean it up. Return a function from useEffect to handle cleanup.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Timer Example */}
        <div className="bg-base-200 rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HiOutlineTrash className="text-primary" size={18} />
            Timer Cleanup
          </h4>
          <p className="text-sm text-base-content/60 mb-4">
            Toggle the timer on/off to see cleanup in action.
          </p>

          <button
            onClick={() => setShowTimer(!showTimer)}
            className={`btn btn-sm mb-4 ${showTimer ? 'btn-error' : 'btn-success'}`}
          >
            {showTimer ? 'Unmount Timer' : 'Mount Timer'}
          </button>

          {showTimer && <TimerWithCleanup />}

          <div className="mt-4 bg-base-300 p-3 rounded-lg font-mono text-xs overflow-x-auto">
            <pre className="text-base-content/80">{`useEffect(() => {
  const id = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
  
  return () => {
    clearInterval(id); // Cleanup!
  };
}, []);`}</pre>
          </div>
        </div>

        {/* Event Listener Example */}
        <div className="bg-base-200 rounded-lg p-4">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <HiOutlineTrash className="text-primary" size={18} />
            Event Listener Cleanup
          </h4>
          <p className="text-sm text-base-content/60 mb-4">
            Toggle to mount/unmount a keyboard listener.
          </p>

          <button
            onClick={() => setShowListener(!showListener)}
            className={`btn btn-sm mb-4 ${showListener ? 'btn-error' : 'btn-success'}`}
          >
            {showListener ? 'Unmount Listener' : 'Mount Listener'}
          </button>

          {showListener && <KeyboardListenerDemo />}

          <div className="mt-4 bg-base-300 p-3 rounded-lg font-mono text-xs overflow-x-auto">
            <pre className="text-base-content/80">{`useEffect(() => {
  const handler = (e) => {
    setLastKey(e.key);
  };
  window.addEventListener('keydown', handler);
  
  return () => {
    window.removeEventListener('keydown', handler);
  };
}, []);`}</pre>
          </div>
        </div>
      </div>

      {/* When Cleanup Runs */}
      <div className="mt-6 bg-base-200 rounded-lg p-4">
        <h4 className="font-semibold mb-3">When Does Cleanup Run?</h4>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs shrink-0">
              1
            </div>
            <div>
              <p className="font-medium">Before Re-running Effect</p>
              <p className="text-sm text-base-content/60">
                If dependencies change, cleanup runs first, then the new effect
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center text-xs shrink-0">
              2
            </div>
            <div>
              <p className="font-medium">On Component Unmount</p>
              <p className="text-sm text-base-content/60">
                When the component is removed from the DOM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-4 flex items-start gap-3 bg-error/10 border border-error/30 rounded-lg p-4">
        <HiOutlineExclamationCircle className="text-error shrink-0 mt-0.5" size={20} />
        <div>
          <p className="font-semibold text-error mb-1">Memory Leak Warning!</p>
          <p className="text-sm text-base-content/70">
            Forgetting cleanup causes memory leaks. Each mount adds a new timer/listener without
            removing the old one. Over time, this slows down your app.
          </p>
        </div>
      </div>
    </div>
  );
}

// Timer component with proper cleanup
function TimerWithCleanup() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    // Cleanup function - clears interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []); // Empty array = only on mount/unmount

  return (
    <div className="bg-base-300 rounded-lg p-4">
      <div className="text-center mb-3">
        <p className="text-4xl font-bold text-primary">{seconds}s</p>
      </div>
      <p className="text-xs text-success font-mono">✓ Timer running</p>
      <p className="text-xs text-base-content/50 mt-1">Click "Unmount Timer" to trigger cleanup</p>
    </div>
  );
}

// Keyboard listener component with proper cleanup
function KeyboardListenerDemo() {
  const [lastKey, setLastKey] = useState(null);
  const [keyCount, setKeyCount] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setLastKey(e.key);
      setKeyCount((c) => c + 1);
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup function
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-base-300 rounded-lg p-4">
      <p className="text-sm text-base-content/60 mb-2">Press any key:</p>
      <div className="flex items-center gap-4">
        <div className="text-center">
          <p className="text-base-content/60 text-xs">Last key</p>
          <p className="text-2xl font-bold text-primary">{lastKey || '...'}</p>
        </div>
        <div className="text-center">
          <p className="text-base-content/60 text-xs">Key presses</p>
          <p className="text-2xl font-bold">{keyCount}</p>
        </div>
      </div>
    </div>
  );
}

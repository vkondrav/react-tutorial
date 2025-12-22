// ============================================
// Demo: The Prop Drilling Problem
// ============================================

import { useState } from 'react';
import { HiOutlineArrowDown, HiOutlineLightBulb, HiUser } from 'react-icons/hi';

// This demo shows why prop drilling is problematic
// We pass `user` through 4 levels just to display it

function App({ user, onLogout }) {
  return (
    <div className="border border-primary/30 rounded-lg p-3 bg-base-300/50">
      <div className="text-xs text-primary font-semibold mb-2 flex items-center gap-1">
        <span className="badge badge-primary badge-xs">1</span> App
      </div>
      <p className="text-xs text-base-content/60 mb-2">Has user data, passes it down...</p>
      <Layout user={user} onLogout={onLogout} />
    </div>
  );
}

function Layout({ user, onLogout }) {
  return (
    <div className="border border-secondary/30 rounded-lg p-3 ml-4 bg-base-300/50">
      <div className="text-xs text-secondary font-semibold mb-2 flex items-center gap-1">
        <span className="badge badge-secondary badge-xs">2</span> Layout
        <span className="text-base-content/40 font-normal">— doesn't need user!</span>
      </div>
      <p className="text-xs text-base-content/60 mb-2">Just passes props through...</p>
      <Sidebar user={user} onLogout={onLogout} />
    </div>
  );
}

function Sidebar({ user, onLogout }) {
  return (
    <div className="border border-accent/30 rounded-lg p-3 ml-4 bg-base-300/50">
      <div className="text-xs text-accent font-semibold mb-2 flex items-center gap-1">
        <span className="badge badge-accent badge-xs">3</span> Sidebar
        <span className="text-base-content/40 font-normal">— doesn't need user!</span>
      </div>
      <p className="text-xs text-base-content/60 mb-2">Still just passing...</p>
      <UserProfile user={user} onLogout={onLogout} />
    </div>
  );
}

function UserProfile({ user, onLogout }) {
  return (
    <div className="border border-success/30 rounded-lg p-3 ml-4 bg-base-300/50">
      <div className="text-xs text-success font-semibold mb-2 flex items-center gap-1">
        <span className="badge badge-success badge-xs">4</span> UserProfile
        <span className="text-base-content/40 font-normal">— finally uses it!</span>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <HiUser className="text-white" size={16} />
        </div>
        <div>
          <div className="text-sm font-medium">{user.name}</div>
          <div className="text-xs text-base-content/60">{user.email}</div>
        </div>
        <button onClick={onLogout} className="btn btn-xs btn-ghost text-error ml-auto">
          Logout
        </button>
      </div>
    </div>
  );
}

export default function PropDrillingDemo() {
  const [user] = useState({ name: 'Sarah Chen', email: 'sarah@example.com' });
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setTimeout(() => setIsLoggedIn(true), 1500);
  };

  return (
    <div className="card bg-base-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <HiOutlineArrowDown className="text-error" size={20} />
        <h3 className="font-semibold">Watch the Props Drill Down</h3>
      </div>

      {isLoggedIn ? (
        <App user={user} onLogout={handleLogout} />
      ) : (
        <div className="text-center py-8 text-base-content/60">
          <div className="loading loading-spinner loading-md mb-2"></div>
          <p className="text-sm">Logging back in...</p>
        </div>
      )}

      {/* Problem explanation */}
      <div className="mt-4 p-3 rounded-lg bg-error/10 border border-error/30">
        <div className="flex items-start gap-2">
          <HiOutlineLightBulb className="text-error shrink-0 mt-0.5" size={18} />
          <div className="text-sm">
            <strong className="text-error">The Problem:</strong>{' '}
            <span className="text-base-content/70">
              Layout and Sidebar don't even use <code className="text-secondary">user</code> or{' '}
              <code className="text-secondary">onLogout</code> — they just pass them through! This
              makes code harder to maintain and refactor.
            </span>
          </div>
        </div>
      </div>

      {/* Code snippet showing the repetition */}
      <div className="mt-4 p-3 rounded-lg bg-base-300 font-mono text-xs overflow-x-auto">
        <div className="text-base-content/60 mb-2">// Every component in the chain:</div>
        <div>
          <span className="text-secondary">function</span>{' '}
          <span className="text-primary">Layout</span>
          <span className="text-base-content/70">{'({ '}</span>
          <span className="text-warning">user, onLogout</span>
          <span className="text-base-content/70">{' }) {'}</span>
        </div>
        <div className="pl-4">
          <span className="text-secondary">return</span>{' '}
          <span className="text-base-content/70">{'<'}</span>
          <span className="text-accent">Sidebar</span> <span className="text-warning">user</span>
          <span className="text-base-content/70">
            ={'{'}user{'}'}
          </span>{' '}
          <span className="text-warning">onLogout</span>
          <span className="text-base-content/70">
            ={'{'}onLogout{'}'}
          </span>
          <span className="text-base-content/70">{' />'}</span>
        </div>
        <div className="text-base-content/70">{'}'}</div>
      </div>
    </div>
  );
}

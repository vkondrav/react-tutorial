import { useState } from 'react';
import {
  HiOutlineLockClosed,
  HiOutlineStar,
  HiOutlineShieldCheck,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineUser,
} from 'react-icons/hi';

export default function ConditionalPlayground() {
  // User profile state
  const [user, setUser] = useState({
    name: 'Alex',
    isLoggedIn: true,
    isPremium: false,
    notifications: 5,
    role: 'user',
  });

  // Feature toggles
  const [features, setFeatures] = useState({
    showAvatar: true,
    showBadge: true,
    showNotifications: true,
    darkMode: true,
  });

  const updateUser = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const toggleFeature = (key) => {
    setFeatures((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Controls Panel */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 mb-6">
        {/* User State Controls */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs font-semibold text-primary mb-4 uppercase flex items-center gap-2">
            <HiOutlineUser size={14} />
            User State
          </div>

          {/* Name Input */}
          <div className="mb-3">
            <label className="block text-xs text-base-content/50 mb-1">Name</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => updateUser('name', e.target.value)}
              className="input input-bordered w-full input-sm"
            />
          </div>

          {/* Toggle Buttons */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => updateUser('isLoggedIn', !user.isLoggedIn)}
              className={`btn btn-xs ${user.isLoggedIn ? 'btn-success' : 'btn-ghost'}`}
            >
              {user.isLoggedIn ? (
                <>
                  <HiOutlineStar size={12} />
                  Logged In
                </>
              ) : (
                <>
                  <HiX size={12} />
                  Logged Out
                </>
              )}
            </button>
            <button
              onClick={() => updateUser('isPremium', !user.isPremium)}
              className={`btn btn-xs ${user.isPremium ? 'btn-warning' : 'btn-ghost'}`}
            >
              {user.isPremium ? <>⭐ Premium</> : <>○ Free</>}
            </button>
          </div>

          {/* Role Selector */}
          <div className="mt-3">
            <label className="block text-xs text-base-content/50 mb-1">Role</label>
            <select
              value={user.role}
              onChange={(e) => updateUser('role', e.target.value)}
              className="select select-bordered w-full select-sm"
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Notifications Counter */}
          <div className="mt-3">
            <label className="block text-xs text-base-content/50 mb-1">
              Notifications: {user.notifications}
            </label>
            <input
              type="range"
              min="0"
              max="99"
              value={user.notifications}
              onChange={(e) => updateUser('notifications', Number(e.target.value))}
              className="range range-sm"
            />
          </div>
        </div>

        {/* Feature Toggles */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs font-semibold text-secondary mb-4 uppercase flex items-center gap-2">
            <HiOutlineCog size={14} />
            Feature Toggles
          </div>

          {Object.entries(features).map(([key, value]) => (
            <label key={key} className="flex items-center gap-2 mb-2 cursor-pointer">
              <input
                type="checkbox"
                checked={value}
                onChange={() => toggleFeature(key)}
                className="checkbox checkbox-sm"
              />
              <span className="text-sm text-base-content/70">
                {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Live Preview */}
      <div
        className={`card p-6 border-2 border-primary transition-all ${
          features.darkMode ? 'bg-base-300' : 'bg-base-100'
        }`}
      >
        <div className="text-primary text-xs font-semibold mb-4 flex items-center gap-2">
          <span>🎬</span>
          LIVE RESULT
        </div>

        {/* Conditional: Show logged out state OR logged in UI */}
        {!user.isLoggedIn ? (
          <div className="text-center p-8 text-base-content/50">
            <div className="text-5xl mb-2">
              <HiOutlineLockClosed size={64} />
            </div>
            <div className="font-semibold mb-1">Please Log In</div>
            <div className="text-sm">Toggle "Logged In" above to see the dashboard</div>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div
              className={`flex items-center justify-between p-4 card rounded-lg mb-4 ${
                features.darkMode ? 'bg-base-200' : 'bg-base-200'
              }`}
            >
              <div className="flex items-center gap-3">
                {/* Conditional: Show avatar */}
                {features.showAvatar && (
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-base font-semibold text-primary-content">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}

                <div>
                  <div
                    className={`font-semibold flex items-center gap-2 ${
                      features.darkMode ? 'text-base-content' : 'text-base-content'
                    }`}
                  >
                    {user.name || 'Anonymous'}

                    {/* Conditional: Premium badge */}
                    {features.showBadge && user.isPremium && (
                      <span className="badge badge-warning badge-sm">⭐ PRO</span>
                    )}

                    {/* Conditional: Role badge (ternary for different colors) */}
                    {features.showBadge && user.role !== 'user' && (
                      <span
                        className={`badge badge-sm ${
                          user.role === 'admin' ? 'badge-error' : 'badge-secondary'
                        }`}
                      >
                        {user.role === 'admin' ? (
                          <>
                            <HiOutlineStar size={12} />
                            ADMIN
                          </>
                        ) : (
                          <>
                            <HiOutlineShieldCheck size={12} />
                            MOD
                          </>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-base-content/50">
                    {user.isPremium ? 'Premium Member' : 'Free Account'}
                  </div>
                </div>
              </div>

              {/* Conditional: Notifications */}
              {features.showNotifications && (
                <div className="relative mt-2">
                  <HiOutlineBell size={24} />
                  {/* Conditional: Badge only if > 0 */}
                  {user.notifications > 0 && (
                    <span className="badge badge-error badge-xs absolute -top-1 -right-3.5 rounded-full min-w-[16px] text-[10px]">
                      {user.notifications > 99 ? '99+' : user.notifications}
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* Admin Panel - Conditional */}
            {user.role === 'admin' && (
              <div
                className={`p-4 card rounded-lg mb-4 border-2 border-dashed ${
                  features.darkMode ? 'bg-error/10 border-error' : 'bg-error/5 border-error/50'
                }`}
              >
                <div className="font-semibold mb-2 text-error flex items-center gap-2">
                  <HiOutlineCog size={16} />
                  Admin Controls
                </div>
                <div className="text-sm text-error/70">You have full access to system settings</div>
              </div>
            )}

            {/* Moderator Panel - Conditional */}
            {user.role === 'moderator' && (
              <div
                className={`p-4 card rounded-lg mb-4 border-2 border-dashed ${
                  features.darkMode
                    ? 'bg-secondary/10 border-secondary'
                    : 'bg-secondary/5 border-secondary/50'
                }`}
              >
                <div className="font-semibold mb-2 text-secondary flex items-center gap-2">
                  <HiOutlineShieldCheck size={16} />
                  Moderator Tools
                </div>
                <div className="text-sm text-secondary/70">You can manage content and users</div>
              </div>
            )}

            {/* Welcome Message */}
            <div className="p-4 rounded-lg bg-base-200 text-base-content/70">
              Welcome to your dashboard,{' '}
              <strong className="text-base-content">{user.name || 'Guest'}</strong>!
              {user.isPremium && (
                <span className="text-warning"> Enjoy your premium features ✨</span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Current Conditions Display */}
      <div className="mt-4 p-4 card bg-base-300 font-mono text-xs">
        <div className="text-base-content/50 mb-2">// Current conditions being evaluated:</div>
        <div className="flex flex-wrap gap-2">
          <span className={user.isLoggedIn ? 'text-success' : 'text-error'}>
            isLoggedIn={String(user.isLoggedIn)}
          </span>
          <span className="text-base-content/50">|</span>
          <span className={user.isPremium ? 'text-warning' : 'text-base-content/50'}>
            isPremium={String(user.isPremium)}
          </span>
          <span className="text-base-content/50">|</span>
          <span className={user.role !== 'user' ? 'text-secondary' : 'text-base-content/50'}>
            role="{user.role}"
          </span>
          <span className="text-base-content/50">|</span>
          <span className={user.notifications > 0 ? 'text-primary' : 'text-base-content/50'}>
            notifications={user.notifications}
          </span>
        </div>
      </div>
    </div>
  );
}

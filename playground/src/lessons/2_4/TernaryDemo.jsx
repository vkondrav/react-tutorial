import { useState } from 'react';
import {
  HiOutlineSun,
  HiOutlineMoon,
  HiOutlineExclamationCircle,
  HiOutlineCheckCircle,
  HiOutlineXCircle,
  HiOutlineUser,
} from 'react-icons/hi';

export default function TernaryDemo() {
  const [theme, setTheme] = useState('light');
  const [status, setStatus] = useState('online');

  const statusConfig = {
    online: { color: 'success', icon: HiOutlineCheckCircle, label: '🟢 Available' },
    away: { color: 'warning', icon: HiOutlineExclamationCircle, label: '🟡 Away' },
    busy: { color: 'error', icon: HiOutlineXCircle, label: '🔴 Do not disturb' },
    offline: { color: 'base-content/50', icon: HiOutlineXCircle, label: '⚫ Offline' },
  };

  const currentStatus = statusConfig[status];

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Example 1: Theme Toggle */}
      <div className="mb-8">
        <div className="text-sm font-semibold text-base-content/70 mb-4 uppercase tracking-wide">
          Example 1: Theme Toggle
        </div>

        <div className="flex gap-4 items-center flex-wrap">
          <button
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            className={`btn ${theme === 'light' ? 'btn-warning' : 'btn-ghost'}`}
          >
            {theme === 'light' ? (
              <>
                <HiOutlineSun size={18} />
                Light
              </>
            ) : (
              <>
                <HiOutlineMoon size={18} />
                Dark
              </>
            )}
          </button>

          {/* Result Box */}
          <div
            className={`p-4 rounded-lg border transition-all ${
              theme === 'light'
                ? 'bg-base-100 text-base-content border-base-300'
                : 'bg-base-300 text-base-content border-base-300'
            }`}
          >
            {theme === 'light' ? (
              <span>🌻 Bright and sunny!</span>
            ) : (
              <span>✨ Easy on the eyes!</span>
            )}
          </div>
        </div>

        {/* Code */}
        <div className="mt-4 card bg-base-300 p-4 font-mono text-xs leading-relaxed">
          <span className="text-base-content/50">{'// Style changes based on condition'}</span>
          <br />
          <span className="text-secondary">backgroundColor: </span>
          <span className="text-base-content">theme === </span>
          <span className="text-warning">'light'</span>
          <span className="text-warning"> ? </span>
          <span className="text-warning">'#f8fafc'</span>
          <span className="text-warning"> : </span>
          <span className="text-warning">'#0f172a'</span>
        </div>
      </div>

      {/* Example 2: User Status */}
      <div>
        <div className="text-sm font-semibold text-base-content/70 mb-4 uppercase tracking-wide">
          Example 2: User Status Badge
        </div>

        <div className="flex gap-2 mb-4 flex-wrap">
          {['online', 'away', 'busy', 'offline'].map((s) => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`btn btn-sm capitalize ${status === s ? 'btn-primary' : 'btn-outline'}`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Status Display */}
        <div className="flex items-center gap-3 p-4 card bg-base-300">
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-base-content/20 flex items-center justify-center text-2xl">
              <HiOutlineUser size={24} />
            </div>
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-base-300 ${
                status === 'online'
                  ? 'bg-success'
                  : status === 'away'
                    ? 'bg-warning'
                    : status === 'busy'
                      ? 'bg-error'
                      : 'bg-base-content/50'
              }`}
            />
          </div>
          <div>
            <div className="font-semibold">Alex Developer</div>
            <div
              className={`text-sm ${
                status === 'online'
                  ? 'text-success'
                  : status === 'away'
                    ? 'text-warning'
                    : status === 'busy'
                      ? 'text-error'
                      : 'text-base-content/50'
              }`}
            >
              {currentStatus.label}
            </div>
          </div>
        </div>

        {/* Code */}
        <div className="mt-4 card bg-base-300 p-4 font-mono text-xs leading-relaxed">
          <span className="text-base-content/50">{'// Nested ternaries (use sparingly!)'}</span>
          <br />
          <span className="text-base-content">status === </span>
          <span className="text-warning">'online'</span>
          <span className="text-warning"> ? </span>
          <span className="text-warning">'🟢 Available'</span>
          <span className="text-warning"> :</span>
          <br />
          <span className="text-base-content">status === </span>
          <span className="text-warning">'away'</span>
          <span className="text-warning"> ? </span>
          <span className="text-warning">'🟡 Away'</span>
          <span className="text-warning"> :</span>
          <br />
          <span className="text-warning">...</span>
        </div>
      </div>

      {/* Warning */}
      <div className="mt-6 p-4 card bg-warning/10 border-l-4 border-warning">
        <div className="font-semibold mb-2 text-warning flex items-center gap-2">
          <HiOutlineExclamationCircle size={18} />
          Watch Out for Nested Ternaries!
        </div>
        <div className="text-sm leading-relaxed text-warning/80">
          While nested ternaries work, they can get hard to read quickly. For many conditions,
          consider extracting to a variable or using early returns instead!
        </div>
      </div>
    </div>
  );
}

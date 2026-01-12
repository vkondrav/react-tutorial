// ============================================
// LogicalAndDemo - Short-Circuit with &&
// ============================================

import { useState } from 'react';
import {
  HiMinus,
  HiPlus,
  HiCheck,
  HiX,
  HiOutlineLightBulb,
  HiOutlineStar,
  HiOutlineUser,
  HiOutlineExclamationCircle,
  HiOutlineBell,
} from 'react-icons/hi';
import { CodeSnippet } from '@components';
import logicalAndGoodExample from './examples/LogicalAndGoodExample.tsx?raw';
import logicalAndGotchaExample from './examples/LogicalAndGotchaExample.tsx?raw';
import logicalAndFixExample from './examples/LogicalAndFixExample.tsx?raw';

// ============================================
// Main Component
// ============================================

export default function LogicalAndDemo(): React.ReactElement {
  const [notifications, setNotifications] = useState<number>(3);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  return (
    <div className="mt-4 card bg-base-200 p-6">
      {/* Interactive Controls */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 mb-6">
        {/* Notification Counter */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/50 mb-2">Notifications</div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setNotifications(Math.max(0, notifications - 1))}
              className="btn btn-sm btn-circle"
            >
              <HiMinus size={18} />
            </button>
            <span
              className={`text-2xl font-bold min-w-8 text-center ${
                notifications > 0 ? 'text-success' : 'text-base-content/50'
              }`}
            >
              {notifications}
            </span>
            <button
              onClick={() => setNotifications(notifications + 1)}
              className="btn btn-sm btn-circle"
            >
              <HiPlus size={18} />
            </button>
          </div>
        </div>

        {/* Admin Toggle */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/50 mb-2">Admin Status</div>
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`btn btn-sm ${isAdmin ? 'btn-secondary' : 'btn-ghost'}`}
          >
            {isAdmin ? (
              <>
                <HiOutlineStar size={16} />
                Admin
              </>
            ) : (
              <>
                <HiOutlineUser size={16} />
                User
              </>
            )}
          </button>
        </div>

        {/* Error Toggle */}
        <div className="card bg-base-300 p-4">
          <div className="text-xs text-base-content/50 mb-2">Error State</div>
          <button
            onClick={() => setHasError(!hasError)}
            className={`btn btn-sm ${hasError ? 'btn-error' : 'btn-ghost'}`}
          >
            {hasError ? (
              <>
                <HiX size={16} />
                Error
              </>
            ) : (
              <>
                <HiCheck size={16} />
                No Error
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div className="card bg-base-300 p-6 mb-6 border-2 border-primary">
        <div className="text-primary text-xs mb-4 font-semibold flex items-center gap-2">
          <span>🎬</span>
          LIVE RESULT
        </div>

        {/* Header Bar */}
        <div className="flex items-center justify-between p-3 card bg-base-200 rounded-lg mb-4">
          <span className="font-semibold">Dashboard</span>

          <div className="flex items-center gap-4">
            {/* Admin badge only shows for admins */}
            {isAdmin && (
              <span className="badge badge-secondary gap-1">
                <HiOutlineStar size={12} />
                ADMIN
              </span>
            )}

            {/* Notification badge only shows when > 0 */}
            <div className="relative mt-2">
              <HiOutlineBell size={20} />
              {notifications > 0 && (
                <span className="badge badge-error badge-xs absolute -top-1 -right-3.5 rounded-full min-w-[16px] text-[10px]">
                  {notifications > 99 ? '99+' : notifications}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Error Message only shows when error */}
        {hasError && (
          <div className="p-3 card bg-error/10 rounded-lg flex items-center gap-2 mb-4">
            <HiOutlineExclamationCircle className="text-error" size={20} />
            <span>Something went wrong. Please try again.</span>
          </div>
        )}

        {/* Admin Panel only shows for admins */}
        {isAdmin && (
          <div className="p-4 card bg-secondary/10 rounded-lg border-2 border-dashed border-secondary mb-4">
            <div className="font-semibold mb-2 text-secondary flex items-center gap-2">
              <HiOutlineStar size={16} />
              Admin Panel
            </div>
            <div className="text-sm text-secondary/70">Secret admin controls appear here...</div>
          </div>
        )}

        {/* Empty state message */}
        {!isAdmin && !hasError && notifications === 0 && (
          <div className="p-4 text-center text-base-content/50 italic">
            All caught up! No notifications. 🎉
          </div>
        )}
      </div>

      {/* Code Examples */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
        <div className="card bg-base-300 p-4">
          <div className="text-success text-xs mb-2 font-semibold flex items-center gap-1">
            <HiCheck size={12} />
            GOOD
          </div>
          <CodeSnippet code={logicalAndGoodExample} language="tsx" showCopy={false} />
        </div>

        <div className="card bg-base-300 p-4">
          <div className="text-error text-xs mb-2 font-semibold flex items-center gap-1">
            <HiOutlineExclamationCircle size={12} />
            GOTCHA
          </div>
          <CodeSnippet code={logicalAndGotchaExample} language="tsx" showCopy={false} />
        </div>

        <div className="card bg-base-300 p-4">
          <div className="text-primary text-xs mb-2 font-semibold flex items-center gap-1">
            <HiCheck size={12} />
            FIX FOR NUMBERS
          </div>
          <CodeSnippet code={logicalAndFixExample} language="tsx" showCopy={false} />
        </div>
      </div>

      {/* Explanation */}
      <div className="mt-6 p-4 card bg-primary/10 border-l-4 border-primary">
        <div className="font-semibold mb-2 text-primary flex items-center gap-2">
          <HiOutlineLightBulb size={18} />
          Why && Works
        </div>
        <div className="text-sm leading-relaxed text-base-content/70">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          JavaScript's <code className="text-warning">&&</code> returns the first falsy value OR the
          {/* eslint-disable-next-line local/no-raw-code-element */}
          last value. So <code>true && &lt;Component /&gt;</code> returns{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>&lt;Component /&gt;</code>, while <code>false && &lt;Component /&gt;</code> returns{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>false</code> (which React ignores).
          <br />
          <br />
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <strong className="text-warning">⚠️ Gotcha:</strong> <code>0 && &lt;X /&gt;</code> renders{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>"0"</code> because 0 is falsy but still a number React will display!
        </div>
      </div>
    </div>
  );
}

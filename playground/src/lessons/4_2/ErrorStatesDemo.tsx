// ============================================
// Error States Demo
// Patterns for handling and displaying errors
// ============================================

import { useState } from 'react';
import {
  HiOutlineRefresh,
  HiOutlineExclamationCircle,
  HiOutlineWifi,
  HiOutlineServer,
  HiOutlineLockClosed,
  HiOutlineCursorClick,
  HiX,
} from 'react-icons/hi';

type ErrorType = 'network' | 'server' | 'notfound' | 'auth';

interface ErrorInfo {
  type: ErrorType;
  title: string;
  message: string;
  icon: React.ReactNode;
  color: string;
  action: string;
}

const ERROR_TYPES: Record<ErrorType, ErrorInfo> = {
  network: {
    type: 'network',
    title: 'Connection Lost',
    message: "We couldn't connect to the server. Please check your internet connection.",
    icon: <HiOutlineWifi size={32} />,
    color: 'text-warning',
    action: 'Retry',
  },
  server: {
    type: 'server',
    title: 'Server Error',
    message: 'Something went wrong on our end. Our team has been notified.',
    icon: <HiOutlineServer size={32} />,
    color: 'text-error',
    action: 'Try Again',
  },
  notfound: {
    type: 'notfound',
    title: 'Not Found',
    message: "The resource you're looking for doesn't exist or has been moved.",
    icon: <HiOutlineExclamationCircle size={32} />,
    color: 'text-info',
    action: 'Go Back',
  },
  auth: {
    type: 'auth',
    title: 'Access Denied',
    message: "You don't have permission to view this content. Please sign in.",
    icon: <HiOutlineLockClosed size={32} />,
    color: 'text-secondary',
    action: 'Sign In',
  },
};

// Inline error component (for form fields, etc.)
function InlineError({ message }: { message: string }) {
  return (
    <div className="flex items-center gap-2 text-error text-sm mt-1">
      <HiOutlineExclamationCircle size={16} />
      <span>{message}</span>
    </div>
  );
}

// Toast error component
function ToastError({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-center gap-3 bg-error/10 border border-error/30 rounded-lg p-3">
      <HiOutlineExclamationCircle className="text-error shrink-0" size={20} />
      <span className="flex-1 text-sm">{message}</span>
      <button onClick={onDismiss} className="btn btn-ghost btn-xs btn-square">
        <HiX size={16} />
      </button>
    </div>
  );
}

// Full-page error component
function FullPageError({ error, onRetry }: { error: ErrorInfo; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className={`${error.color} mb-4`}>{error.icon}</div>
      <h3 className="text-lg font-semibold mb-2">{error.title}</h3>
      <p className="text-base-content/60 text-sm max-w-xs mb-6">{error.message}</p>
      <button onClick={onRetry} className="btn btn-primary btn-sm gap-2">
        <HiOutlineRefresh size={16} />
        {error.action}
      </button>
    </div>
  );
}

// Card with error state
function ErrorCard({ errorType, onSimulate }: { errorType: ErrorType; onSimulate: () => void }) {
  const [hasError, setHasError] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  const error = ERROR_TYPES[errorType];

  const handleRetry = async () => {
    setIsRetrying(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsRetrying(false);
    setHasError(false);
  };

  const handleSimulate = () => {
    setHasError(true);
    onSimulate();
  };

  if (hasError) {
    return (
      <div className="card bg-base-300 p-4">
        <FullPageError error={error} onRetry={handleRetry} />
        {isRetrying && <div className="text-center text-sm text-base-content/60">Retrying...</div>}
      </div>
    );
  }

  return (
    <div className="card bg-base-300 p-4">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-semibold">{error.title}</h4>
          <p className="text-sm text-base-content/60">Click to simulate this error</p>
        </div>
        <span className={`badge ${error.color.replace('text-', 'badge-')}`}>{errorType}</span>
      </div>
      <div className="flex items-center gap-3 p-4 bg-base-200 rounded-lg mb-4">
        <div className={error.color}>{error.icon}</div>
        <p className="text-sm text-base-content/70">{error.message}</p>
      </div>
      <button onClick={handleSimulate} className="btn btn-outline btn-sm gap-2 w-full">
        <HiOutlineCursorClick size={16} />
        Trigger Error
      </button>
    </div>
  );
}

export default function ErrorStatesDemo(): React.ReactElement {
  const [selectedTab, setSelectedTab] = useState<'types' | 'inline' | 'toast'>('types');
  const [inlineError, setInlineError] = useState('');
  const [toastError, setToastError] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* Tab selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setSelectedTab('types')}
          className={`btn btn-sm ${selectedTab === 'types' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Error Types
        </button>
        <button
          onClick={() => setSelectedTab('inline')}
          className={`btn btn-sm ${selectedTab === 'inline' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Inline Errors
        </button>
        <button
          onClick={() => setSelectedTab('toast')}
          className={`btn btn-sm ${selectedTab === 'toast' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Toast Errors
        </button>
      </div>

      {/* Error types grid */}
      {selectedTab === 'types' && (
        <div className="grid md:grid-cols-2 gap-4">
          {(Object.keys(ERROR_TYPES) as ErrorType[]).map((type) => (
            <ErrorCard
              key={type}
              errorType={type}
              onSimulate={() => console.log(`Simulated ${type} error`)}
            />
          ))}
        </div>
      )}

      {/* Inline error demo */}
      {selectedTab === 'inline' && (
        <div className="card bg-base-200 p-6 space-y-4">
          <h4 className="font-semibold">Form with Inline Validation</h4>
          <p className="text-sm text-base-content/60">
            Inline errors appear right where the problem is. Great for form validation.
          </p>

          <div className="space-y-4 max-w-sm">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`input input-bordered w-full ${inlineError ? 'input-error' : ''}`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value && !value.includes('@')) {
                    setInlineError('Please enter a valid email address');
                  } else {
                    setInlineError('');
                  }
                }}
              />
              {inlineError && <InlineError message={inlineError} />}
            </div>

            <div className="bg-base-300 rounded-lg p-3 mt-4">
              <pre className="text-xs overflow-x-auto">
                <code>{`// Inline error component
function InlineError({ message }) {
  return (
    <div className="flex items-center gap-2 
      text-error text-sm mt-1">
      <ExclamationIcon size={16} />
      <span>{message}</span>
    </div>
  );
}

// Usage in form
{error && <InlineError message={error} />}`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Toast error demo */}
      {selectedTab === 'toast' && (
        <div className="card bg-base-200 p-6 space-y-4">
          <h4 className="font-semibold">Toast Notifications</h4>
          <p className="text-sm text-base-content/60">
            Toast errors are great for async operations that fail. They're non-blocking and
            dismissible.
          </p>

          <div className="space-y-4">
            <button
              onClick={() => setToastError('Failed to save changes. Please try again.')}
              className="btn btn-outline btn-sm"
            >
              Trigger Toast Error
            </button>

            {toastError && (
              <ToastError message={toastError} onDismiss={() => setToastError(null)} />
            )}

            <div className="bg-base-300 rounded-lg p-3">
              <pre className="text-xs overflow-x-auto">
                <code>{`// Toast error component
function ToastError({ message, onDismiss }) {
  return (
    <div className="flex items-center gap-3 
      bg-error/10 border border-error/30 
      rounded-lg p-3">
      <ExclamationIcon className="text-error" />
      <span className="flex-1">{message}</span>
      <button onClick={onDismiss}>
        <XIcon />
      </button>
    </div>
  );
}

// In component with async operation
try {
  await saveData();
} catch (err) {
  setToastError(err.message);
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Best practices */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Error Handling Best Practices</h4>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Explain what went wrong in plain language</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Provide a clear action (retry, go back, contact support)</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-success mt-0.5">✓</span>
              <span>Log technical details to console for debugging</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Don't show raw error messages to users</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Don't leave users stuck with no way forward</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-error mt-0.5">✗</span>
              <span>Don't ignore errors silently</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

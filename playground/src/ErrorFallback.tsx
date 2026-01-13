// ============================================
// Error Fallback Component
// ============================================
// Displays a user-friendly error page when
// the app crashes unexpectedly
// ============================================

import { HiOutlineExclamationCircle, HiOutlineRefresh, HiOutlineHome } from 'react-icons/hi';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: ErrorFallbackProps): React.ReactElement {
  const isDev = import.meta.env.DEV;

  const handleGoHome = () => {
    window.location.href = window.location.origin;
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-error/10 p-6 rounded-full">
            <HiOutlineExclamationCircle className="text-error" size={64} />
          </div>
        </div>

        {/* Error Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            {/* Title */}
            <h1 className="card-title text-3xl mb-2 justify-center">Oops! Something went wrong</h1>

            {/* Description */}
            <p className="text-center text-base-content/70 mb-6">
              The application encountered an unexpected error. Don't worry, this has been logged and
              we'll look into it.
            </p>

            {/* Error Details (only in development) */}
            {isDev && (
              <div className="bg-base-300 rounded-lg p-4 mb-6">
                <div className="flex items-start gap-2 mb-2">
                  <HiOutlineExclamationCircle className="text-error shrink-0 mt-0.5" size={20} />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-error mb-1">
                      Error Details (Dev Mode)
                    </p>
                    <p className="text-sm font-mono text-base-content/80 wrap-break-word">
                      {error.message}
                    </p>
                  </div>
                </div>
                {error.stack && (
                  <details className="mt-3">
                    <summary className="text-xs text-base-content/60 cursor-pointer hover:text-base-content/80">
                      View Stack Trace
                    </summary>
                    <pre className="text-xs mt-2 p-3 bg-base-100 rounded overflow-auto max-h-48 text-base-content/70">
                      {error.stack}
                    </pre>
                  </details>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="card-actions justify-center gap-3 mt-4">
              <button onClick={resetErrorBoundary} className="btn btn-primary gap-2">
                <HiOutlineRefresh size={20} />
                Try Again
              </button>
              <button onClick={handleGoHome} className="btn btn-outline gap-2">
                <HiOutlineHome size={20} />
                Go to Homepage
              </button>
            </div>

            {/* Help Text */}
            <div className="text-center mt-6 pt-6 border-t border-base-300">
              <p className="text-sm text-base-content/60">
                If this problem persists, try refreshing the page or clearing your browser cache.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-6 text-sm text-base-content/50">
          <p>
            Need help?{' '}
            <a
              href="https://github.com/vkondrav/react-tutorial/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="link link-primary"
            >
              Report this issue
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

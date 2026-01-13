import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import './index.css';
import App from './App';
import ErrorFallback from './ErrorFallback';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Reset app state on error boundary reset
        window.location.hash = '';
      }}
      onError={(error, errorInfo) => {
        // Log errors in development
        if (import.meta.env.DEV) {
          console.error('Error Boundary caught an error:', error);
          console.error('Error Info:', errorInfo);
        }
        // In production, you could send to error tracking service
        // e.g., Sentry.captureException(error, { contexts: { react: errorInfo } });
      }}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);

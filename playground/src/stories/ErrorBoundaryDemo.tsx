// ============================================
// Error Boundary Demo Component
// ============================================
// A test component that can trigger errors
// to demonstrate the ErrorBoundary in action
// ============================================

import { useState } from 'react';
import { HiOutlineFire } from 'react-icons/hi';

export default function ErrorBoundaryDemo(): React.ReactElement {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('This is a test error thrown by the ErrorBoundaryDemo component!');
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-2xl mb-4">Error Boundary Test</h2>

          <div className="alert alert-warning mb-4">
            <HiOutlineFire size={24} />
            <div>
              <p className="font-semibold">⚠️ Warning: Clicking this button will crash the app!</p>
              <p className="text-sm">
                This demonstrates the ErrorBoundary catching and handling the error gracefully.
              </p>
            </div>
          </div>

          <p className="mb-4 text-base-content/70">
            This component is designed to test the ErrorBoundary. When you click the button below,
            it will throw an error during rendering, which should be caught by the ErrorBoundary and
            display the error fallback page.
          </p>

          <div className="card-actions justify-center">
            <button onClick={() => setShouldThrow(true)} className="btn btn-error gap-2">
              <HiOutlineFire size={20} />
              Trigger Error
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

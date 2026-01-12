// ============================================
// TestingPlayground: Interactive Testing Examples
// ============================================

import { useState } from 'react';
import {
  HiOutlinePlay,
  HiOutlineCheck,
  HiOutlineX,
  HiOutlineRefresh,
  HiPlus,
  HiMinus,
} from 'react-icons/hi';

// ============================================
// Demo 1: Interactive Counter with Test Visualization
// ============================================

function CounterTestDemo(): React.ReactElement {
  const [count, setCount] = useState(0);
  const [testResults, setTestResults] = useState<Array<{ step: string; passed: boolean }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const runTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    setCount(0);

    const steps = [
      { step: 'Initial count is 0', check: () => count === 0 },
      { step: 'Click + button', action: () => setCount((c) => c + 1) },
      { step: 'Count is now 1', check: () => true }, // Will check after state update
      { step: 'Click + button again', action: () => setCount((c) => c + 1) },
      { step: 'Count is now 2', check: () => true },
      { step: 'Click Reset', action: () => setCount(0) },
      { step: 'Count is back to 0', check: () => true },
    ];

    // Simulate step by step test execution
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 500));
      const step = steps[i];
      if (step.action) {
        step.action();
      }
      setTestResults((prev) => [...prev, { step: step.step, passed: true }]);
    }

    setIsRunning(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Counter Component</h4>
        <button onClick={runTest} disabled={isRunning} className="btn btn-primary btn-sm gap-2">
          <HiOutlinePlay size={16} />
          {isRunning ? 'Running...' : 'Run Test'}
        </button>
      </div>

      {/* The Component Under Test */}
      <div className="card bg-base-200 p-6 text-center">
        <div data-testid="count" className="text-5xl font-bold text-primary mb-4">
          {count}
        </div>
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCount((c) => c - 1)}
            className="btn btn-outline btn-circle"
            aria-label="Decrement"
          >
            <HiMinus size={20} />
          </button>
          <button
            onClick={() => setCount((c) => c + 1)}
            className="btn btn-primary btn-circle"
            aria-label="Increment"
          >
            <HiPlus size={20} />
          </button>
          <button onClick={() => setCount(0)} className="btn btn-ghost">
            Reset
          </button>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-base-200 rounded-lg p-4">
          <h5 className="text-sm font-medium mb-2">Test Steps</h5>
          <div className="space-y-1">
            {testResults.map((result, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {result.passed ? (
                  <HiOutlineCheck className="text-success" size={16} />
                ) : (
                  <HiOutlineX className="text-error" size={16} />
                )}
                <span className={result.passed ? 'text-base-content' : 'text-error'}>
                  {result.step}
                </span>
              </div>
            ))}
          </div>
          {!isRunning && (
            <div className="mt-3 text-sm text-success font-medium">
              ✓ All {testResults.length} steps passed
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================
// Demo 2: Async Data Fetching Test
// ============================================

interface User {
  id: number;
  name: string;
}

function AsyncTestDemo(): React.ReactElement {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [testPhase, setTestPhase] = useState<string>('');

  const simulateFetch = async (shouldFail: boolean = false) => {
    setLoading(true);
    setError(null);
    setUsers([]);
    setTestPhase('Loading state...');

    await new Promise((r) => setTimeout(r, 1000));

    if (shouldFail) {
      setError('Failed to fetch users');
      setLoading(false);
      setTestPhase('Error state');
      return;
    }

    setUsers([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
      { id: 3, name: 'Charlie' },
    ]);
    setLoading(false);
    setTestPhase('Success state');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Async Data Fetching</h4>
        <div className="flex gap-2">
          <button onClick={() => simulateFetch(false)} className="btn btn-success btn-sm">
            Load Success
          </button>
          <button onClick={() => simulateFetch(true)} className="btn btn-error btn-sm">
            Load Error
          </button>
        </div>
      </div>

      {/* The Component */}
      <div className="card bg-base-200 p-4 min-h-32">
        {loading && (
          <div className="flex items-center justify-center gap-2 py-8">
            <span className="loading loading-spinner loading-md"></span>
            <span>Loading users...</span>
          </div>
        )}
        {error && (
          <div className="alert alert-error">
            <HiOutlineX size={20} />
            <span>{error}</span>
          </div>
        )}
        {!loading && !error && users.length > 0 && (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="flex items-center gap-2" role="listitem">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm">
                  {user.name[0]}
                </div>
                <span>{user.name}</span>
              </li>
            ))}
          </ul>
        )}
        {!loading && !error && users.length === 0 && (
          <div className="text-center text-base-content/60 py-8">
            Click a button to simulate data fetching
          </div>
        )}
      </div>

      {/* Test Phase Indicator */}
      {testPhase && (
        <div className="bg-base-200 rounded-lg p-3">
          <div className="text-xs text-base-content/60 mb-1">Current State</div>
          <div className="font-medium">{testPhase}</div>
          {/* eslint-disable local/no-raw-code-element */}
          <div className="text-xs text-base-content/60 mt-2">
            {testPhase === 'Loading state...' && (
              <code>await waitFor(() =&gt; expect(loading).toBeInTheDocument())</code>
            )}
            {testPhase === 'Success state' && (
              <code>expect(canvas.getAllByRole('listitem')).toHaveLength(3)</code>
            )}
            {testPhase === 'Error state' && (
              <code>expect(canvas.getByText(/Failed to fetch/)).toBeInTheDocument()</code>
            )}
          </div>
          {/* eslint-enable local/no-raw-code-element */}
        </div>
      )}
    </div>
  );
}

// ============================================
// Demo 3: Form Validation Test
// ============================================

function FormTestDemo(): React.ReactElement {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [testResults, setTestResults] = useState<Array<{ step: string; passed: boolean }>>([]);
  const [isRunning, setIsRunning] = useState(false);

  const validate = (emailVal: string, passwordVal: string) => {
    const newErrors: { email?: string; password?: string } = {};

    if (!emailVal) {
      newErrors.email = 'Email is required';
    } else if (!emailVal.includes('@')) {
      newErrors.email = 'Invalid email format';
    }

    if (!passwordVal) {
      newErrors.password = 'Password is required';
    } else if (passwordVal.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate(email, password)) {
      setSubmitted(true);
    }
  };

  const reset = () => {
    setEmail('');
    setPassword('');
    setErrors({});
    setSubmitted(false);
    setTestResults([]);
  };

  const runTest = async () => {
    setIsRunning(true);
    setTestResults([]);
    reset();

    // Step 1: Initial state
    await new Promise((r) => setTimeout(r, 400));
    setTestResults((prev) => [...prev, { step: 'Form is empty initially', passed: true }]);

    // Step 2: Submit empty form
    await new Promise((r) => setTimeout(r, 400));
    validate('', '');
    setTestResults((prev) => [...prev, { step: 'Click Submit with empty fields', passed: true }]);

    // Step 3: Check error messages
    await new Promise((r) => setTimeout(r, 400));
    setTestResults((prev) => [
      ...prev,
      { step: 'Error: "Email is required" appears', passed: true },
    ]);

    await new Promise((r) => setTimeout(r, 400));
    setTestResults((prev) => [
      ...prev,
      { step: 'Error: "Password is required" appears', passed: true },
    ]);

    // Step 4: Type invalid email
    await new Promise((r) => setTimeout(r, 400));
    setEmail('invalid');
    setErrors({});
    setTestResults((prev) => [...prev, { step: 'Type "invalid" in email field', passed: true }]);

    // Step 5: Submit with invalid email
    await new Promise((r) => setTimeout(r, 400));
    validate('invalid', '');
    setTestResults((prev) => [
      ...prev,
      { step: 'Submit → "Invalid email format" error', passed: true },
    ]);

    // Step 6: Clear and type valid data
    await new Promise((r) => setTimeout(r, 400));
    setEmail('test@example.com');
    setPassword('password123');
    setErrors({});
    setTestResults((prev) => [...prev, { step: 'Type valid email and password', passed: true }]);

    // Step 7: Submit successfully
    await new Promise((r) => setTimeout(r, 400));
    const isValid = validate('test@example.com', 'password123');
    if (isValid) {
      setSubmitted(true);
    }
    setTestResults((prev) => [...prev, { step: 'Submit → Success message appears', passed: true }]);

    setIsRunning(false);
  };

  if (submitted && !isRunning) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">Form Validation</h4>
          <button onClick={runTest} disabled={isRunning} className="btn btn-primary btn-sm gap-2">
            <HiOutlinePlay size={16} />
            Run Test
          </button>
        </div>
        <div className="card bg-success/20 border border-success p-6 text-center">
          <HiOutlineCheck size={48} className="mx-auto text-success mb-2" />
          <h4 className="font-medium text-success">Form Submitted Successfully!</h4>
          <p className="text-sm text-base-content/70 mt-2">Email: {email}</p>
        </div>
        {testResults.length > 0 && (
          <div className="bg-base-200 rounded-lg p-4">
            <h5 className="text-sm font-medium mb-2">Test Steps</h5>
            <div className="space-y-1">
              {testResults.map((result, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  {result.passed ? (
                    <HiOutlineCheck className="text-success shrink-0" size={16} />
                  ) : (
                    <HiOutlineX className="text-error shrink-0" size={16} />
                  )}
                  <span className={result.passed ? 'text-base-content' : 'text-error'}>
                    {result.step}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-3 text-sm text-success font-medium">
              ✓ All {testResults.length} steps passed
            </div>
          </div>
        )}
        <button onClick={reset} className="btn btn-ghost gap-2 w-full">
          <HiOutlineRefresh size={16} />
          Reset Form
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Form Validation</h4>
        <button onClick={runTest} disabled={isRunning} className="btn btn-primary btn-sm gap-2">
          <HiOutlinePlay size={16} />
          {isRunning ? 'Running...' : 'Run Test'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">
            <span className="label-text">Email</span>
          </label>
          <input
            id="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="label" htmlFor="password">
            <span className="label-text">Password</span>
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input input-bordered w-full ${errors.password ? 'input-error' : ''}`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-error text-sm mt-1">{errors.password}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-full">
          Submit
        </button>
      </form>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-base-200 rounded-lg p-4">
          <h5 className="text-sm font-medium mb-2">Test Steps</h5>
          <div className="space-y-1">
            {testResults.map((result, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                {result.passed ? (
                  <HiOutlineCheck className="text-success shrink-0" size={16} />
                ) : (
                  <HiOutlineX className="text-error shrink-0" size={16} />
                )}
                <span className={result.passed ? 'text-base-content' : 'text-error'}>
                  {result.step}
                </span>
              </div>
            ))}
          </div>
          {!isRunning && testResults.length === 8 && (
            <div className="mt-3 text-sm text-success font-medium">
              ✓ All {testResults.length} steps passed
            </div>
          )}
        </div>
      )}

      {/* Test Hints - only show when not running tests */}
      {testResults.length === 0 && (
        <div className="bg-base-200 rounded-lg p-3 text-xs">
          <div className="font-medium mb-2">How to test this:</div>
          <ol className="list-decimal list-inside space-y-1 text-base-content/70">
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}
              Find inputs: <code>getByLabelText('Email')</code>
            </li>
            <li>
              {/* eslint-disable-next-line local/no-raw-code-element */}
              Type invalid data: <code>await userEvent.type(email, 'bad')</code>
            </li>
            <li>Click submit and assert error messages appear</li>
            <li>Clear and type valid data, submit, check success</li>
          </ol>
        </div>
      )}
    </div>
  );
}

// ============================================
// Main Playground Component
// ============================================

type DemoId = 'counter' | 'async' | 'form';

export default function TestingPlayground(): React.ReactElement {
  const [activeDemo, setActiveDemo] = useState<DemoId>('counter');

  return (
    <div className="space-y-4">
      {/* Demo Selector */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveDemo('counter')}
          className={`btn btn-sm ${activeDemo === 'counter' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Counter
        </button>
        <button
          onClick={() => setActiveDemo('async')}
          className={`btn btn-sm ${activeDemo === 'async' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Async Data
        </button>
        <button
          onClick={() => setActiveDemo('form')}
          className={`btn btn-sm ${activeDemo === 'form' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Form Validation
        </button>
      </div>

      {/* Active Demo */}
      <div className="card bg-base-300 p-4">
        {activeDemo === 'counter' && <CounterTestDemo />}
        {activeDemo === 'async' && <AsyncTestDemo />}
        {activeDemo === 'form' && <FormTestDemo />}
      </div>

      {/* Key Takeaways */}
      <div className="bg-info/10 border border-info/30 rounded-lg p-4">
        <h4 className="font-medium text-info mb-2">Testing Tips</h4>
        <ul className="text-sm space-y-1 text-base-content/80">
          <li>• Test user behavior, not implementation details</li>
          <li>• Query elements the way users find them (by role, label, text)</li>
          <li>• Use waitFor for async operations</li>
          <li>• Test the happy path AND edge cases (errors, empty states)</li>
          <li>• Keep tests focused - one behavior per test</li>
        </ul>
      </div>
    </div>
  );
}

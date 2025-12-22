// ============================================
// ErrorDisplayDemo - How to show validation errors
// ============================================

import { useState } from 'react';
import { HiX, HiOutlineExclamationCircle, HiOutlineLightBulb } from 'react-icons/hi';

type DisplayType = 'inline' | 'summary' | 'toast';

export default function ErrorDisplayDemo(): React.ReactElement {
  const [displayType, setDisplayType] = useState<DisplayType>('inline');

  const types: { id: DisplayType; label: string }[] = [
    { id: 'inline', label: 'Inline Errors' },
    { id: 'summary', label: 'Error Summary' },
    { id: 'toast', label: 'Toast Messages' },
  ];

  return (
    <div className="space-y-4">
      {/* Display Type Selection */}
      <div className="flex flex-wrap gap-2">
        {types.map((type) => (
          <button
            key={type.id}
            onClick={() => setDisplayType(type.id)}
            className={`btn btn-sm ${displayType === type.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {type.label}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="card bg-base-300 p-6">
        {displayType === 'inline' && <InlineErrorsDemo />}
        {displayType === 'summary' && <SummaryDemo />}
        {displayType === 'toast' && <ToastDemo />}
      </div>

      {/* Best Practices */}
      <div className="flex items-start gap-2 text-sm bg-primary/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-primary shrink-0 mt-0.5" size={18} />
        <div className="text-base-content/70">
          <strong className="text-primary">Best Practice:</strong> Use{' '}
          <strong>inline errors</strong> as the primary method. Users see exactly where the problem
          is. Add a summary for long forms or accessibility.
        </div>
      </div>
    </div>
  );
}

// ===== Inline Errors Demo =====
function InlineErrorsDemo() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({ name: false, email: false, password: false });

  const errors = {
    name: !form.name.trim() ? 'Name is required' : '',
    email: !form.email.includes('@') ? 'Valid email required' : '',
    password: form.password.length < 8 ? 'Min 8 characters' : '',
  };

  const handleBlur = (field: keyof typeof touched) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-primary">Inline Errors</span>
        <span className="badge badge-sm">Recommended</span>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => handleBlur('name')}
            placeholder="Your name"
            className={`input input-bordered w-full ${
              touched.name && errors.name ? 'input-error' : ''
            }`}
          />
          {touched.name && errors.name && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.name}
            </div>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => handleBlur('email')}
            placeholder="you@example.com"
            className={`input input-bordered w-full ${
              touched.email && errors.email ? 'input-error' : ''
            }`}
          />
          {touched.email && errors.email && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.email}
            </div>
          )}
        </div>

        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            onBlur={() => handleBlur('password')}
            placeholder="••••••••"
            className={`input input-bordered w-full ${
              touched.password && errors.password ? 'input-error' : ''
            }`}
          />
          {touched.password && errors.password && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.password}
            </div>
          )}
        </div>
      </div>

      <p className="text-xs text-base-content/60">
        Click into fields and then click away (blur) to see inline errors appear.
      </p>
    </div>
  );
}

// ===== Summary Demo =====
function SummaryDemo() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [submitted, setSubmitted] = useState(false);

  const errors = {
    name: !form.name.trim() ? 'Name is required' : '',
    email: !form.email.includes('@') ? 'Valid email required' : '',
    password: form.password.length < 8 ? 'Password must be at least 8 characters' : '',
  };

  const errorList = Object.entries(errors).filter(([, error]) => error);
  const hasErrors = errorList.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    if (!hasErrors) {
      alert('Form submitted!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-secondary">Error Summary</span>
      </div>

      {submitted && hasErrors && (
        <div className="alert alert-error">
          <HiOutlineExclamationCircle size={20} />
          <div>
            <h4 className="font-semibold">Please fix the following errors:</h4>
            <ul className="list-disc list-inside text-sm mt-1">
              {errorList.map(([field, error]) => (
                <li key={field}>{error}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className={`input input-bordered w-full ${
              submitted && errors.name ? 'input-error' : ''
            }`}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
            className={`input input-bordered w-full ${
              submitted && errors.email ? 'input-error' : ''
            }`}
          />
        </div>

        <div>
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
            className={`input input-bordered w-full ${
              submitted && errors.password ? 'input-error' : ''
            }`}
          />
        </div>

        <button type="submit" className="btn btn-secondary">
          Submit (Try with empty fields)
        </button>
      </form>
    </div>
  );
}

// ===== Toast Demo =====
function ToastDemo() {
  const [form, setForm] = useState({ email: '' });
  const [toast, setToast] = useState<{ show: boolean; message: string; type: 'error' | 'success' }>(
    {
      show: false,
      message: '',
      type: 'error',
    }
  );

  const showToast = (message: string, type: 'error' | 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast((t) => ({ ...t, show: false })), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email.trim()) {
      showToast('Email is required', 'error');
      return;
    }

    if (!form.email.includes('@')) {
      showToast('Please enter a valid email', 'error');
      return;
    }

    showToast('Subscribed successfully!', 'success');
    setForm({ email: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-accent">Toast Messages</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Subscribe to newsletter</span>
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={form.email}
              onChange={(e) => setForm({ email: e.target.value })}
              placeholder="you@example.com"
              className="input input-bordered flex-1"
            />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </div>
        </div>
      </form>

      <p className="text-xs text-base-content/60">
        Try submitting with empty or invalid email to see toast errors.
      </p>

      {/* Toast */}
      {toast.show && (
        <div className="toast toast-top toast-end z-50">
          <div className={`alert ${toast.type === 'error' ? 'alert-error' : 'alert-success'}`}>
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      <div className="bg-base-200 rounded-lg p-3 text-xs">
        <pre className="overflow-x-auto text-base-content/70">
          {`// Good for: notifications, success messages
// Not ideal for: detailed form errors

const showToast = (message, type) => {
  setToast({ show: true, message, type });
  setTimeout(() => setToast({ show: false }), 3000);
};`}
        </pre>
      </div>
    </div>
  );
}

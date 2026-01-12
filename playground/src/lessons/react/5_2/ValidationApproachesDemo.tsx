// ============================================
// ValidationApproachesDemo - When to validate
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import onSubmitValidationCode from './examples/OnSubmitValidation.tsx?raw';
import onBlurValidationCode from './examples/OnBlurValidation.tsx?raw';
import onChangeValidationCode from './examples/OnChangeValidation.tsx?raw';

type ApproachType = 'submit' | 'blur' | 'change';

interface FormState {
  email: string;
  touched: boolean;
  submitted: boolean;
}

export default function ValidationApproachesDemo(): React.ReactElement {
  const [approach, setApproach] = useState<ApproachType>('blur');

  const approaches: { id: ApproachType; label: string; color: string }[] = [
    { id: 'submit', label: 'On Submit', color: 'primary' },
    { id: 'blur', label: 'On Blur', color: 'secondary' },
    { id: 'change', label: 'On Change', color: 'accent' },
  ];

  return (
    <div className="space-y-4">
      {/* Approach Selection */}
      <div className="flex flex-wrap gap-2">
        {approaches.map((a) => (
          <button
            key={a.id}
            onClick={() => setApproach(a.id)}
            className={`btn btn-sm ${approach === a.id ? `btn-${a.color}` : 'btn-ghost'}`}
          >
            {a.label}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="card bg-base-300 p-6">
        {approach === 'submit' && <OnSubmitDemo />}
        {approach === 'blur' && <OnBlurDemo />}
        {approach === 'change' && <OnChangeDemo />}
      </div>

      {/* Comparison Table */}
      <div className="card bg-base-300 p-5">
        <h4 className="font-semibold mb-4">Comparison</h4>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Approach</th>
                <th>Pros</th>
                <th>Cons</th>
                <th>Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className={approach === 'submit' ? 'bg-primary/10' : ''}>
                <td className="font-medium text-primary">On Submit</td>
                <td className="text-xs">Simple, no noise while typing</td>
                <td className="text-xs">Late feedback, frustrating</td>
                <td className="text-xs">Simple forms, wizards</td>
              </tr>
              <tr className={approach === 'blur' ? 'bg-secondary/10' : ''}>
                <td className="font-medium text-secondary">On Blur</td>
                <td className="text-xs">Timely feedback, not intrusive</td>
                <td className="text-xs">Slightly delayed</td>
                <td className="text-xs">Most forms (recommended)</td>
              </tr>
              <tr className={approach === 'change' ? 'bg-accent/10' : ''}>
                <td className="font-medium text-accent">On Change</td>
                <td className="text-xs">Instant feedback</td>
                <td className="text-xs">Noisy, can feel aggressive</td>
                <td className="text-xs">Password strength, search</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ===== On Submit Demo =====
function OnSubmitDemo() {
  const [form, setForm] = useState<FormState>({ email: '', touched: false, submitted: false });
  const [error, setError] = useState('');

  const validate = (email: string): string => {
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Invalid email format';
    return '';
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form.email);
    setError(err);
    setForm((f) => ({ ...f, submitted: true }));
    if (!err) {
      alert('Form submitted successfully!');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-primary">On Submit</span>
        <span className="text-xs text-base-content/60">Validate only when form is submitted</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="Enter your email..."
            className={`input input-bordered w-full ${
              form.submitted && error ? 'input-error' : ''
            }`}
          />
          {form.submitted && error && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <div>
        <CodeSnippet code={onSubmitValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== On Blur Demo =====
function OnBlurDemo() {
  const [form, setForm] = useState<FormState>({ email: '', touched: false, submitted: false });
  const [error, setError] = useState('');

  const validate = (email: string): string => {
    if (!email) return 'Email is required';
    if (!email.includes('@')) return 'Invalid email format';
    return '';
  };

  const handleBlur = () => {
    setForm((f) => ({ ...f, touched: true }));
    setError(validate(form.email));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const err = validate(form.email);
    setError(err);
    setForm((f) => ({ ...f, touched: true, submitted: true }));
    if (!err) {
      alert('Form submitted successfully!');
    }
  };

  const showError = form.touched && error;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-secondary">On Blur</span>
        <span className="badge badge-sm">Recommended</span>
        <span className="text-xs text-base-content/60">Validate when leaving field</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={handleBlur}
            placeholder="Enter your email..."
            className={`input input-bordered w-full ${showError ? 'input-error' : ''}`}
          />
          {showError && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {error}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </form>

      <div className="flex items-start gap-2 text-sm bg-secondary/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-secondary shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-secondary">touched</code> tracks if user has interacted with the
          field. We only show errors after the field loses focus (blur).
        </p>
      </div>

      <div>
        <CodeSnippet code={onBlurValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== On Change Demo =====
function OnChangeDemo() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validate = (value: string): string => {
    if (!value) return 'Email is required';
    if (!value.includes('@')) return 'Invalid email format';
    return '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setError(validate(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!error && email) {
      alert('Form submitted successfully!');
    }
  };

  const isValid = email && !error;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-accent">On Change</span>
        <span className="text-xs text-base-content/60">Validate on every keystroke</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email..."
            className={`input input-bordered w-full ${
              email ? (error ? 'input-error' : 'input-success') : ''
            }`}
          />
          {email && (
            <div
              className={`flex items-center gap-1 mt-1 text-xs ${
                error ? 'text-error' : 'text-success'
              }`}
            >
              {error ? <HiX size={14} /> : <HiCheck size={14} />}
              {error || 'Valid email'}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-accent" disabled={!isValid}>
          Submit
        </button>
      </form>

      <div>
        <CodeSnippet code={onChangeValidationCode} language="tsx" />
      </div>
    </div>
  );
}

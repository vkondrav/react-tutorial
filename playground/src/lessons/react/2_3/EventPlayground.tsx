// ============================================
// EventPlayground - Interactive Form with Validation
// ============================================

import { useState } from 'react';
import { HiCheck } from 'react-icons/hi';
import { CodeSnippet } from '../../components';

// ============================================
// Types
// ============================================

interface FormData {
  name: string;
  email: string;
  age: string;
  newsletter: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  age?: string;
}

// ============================================
// Constants
// ============================================

const INITIAL_FORM_DATA: FormData = {
  name: '',
  email: '',
  age: '',
  newsletter: false,
};

// ============================================
// Main Component
// ============================================

export default function EventPlayground(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Email must contain @';
    }
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (Number(formData.age) < 18) {
      newErrors.age = 'Must be 18 or older';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(INITIAL_FORM_DATA);
      }, 3000);
    } else {
      setErrors(newErrors);
    }
  };

  const handleReset = (): void => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setSubmitted(false);
  };

  // Generate display strings for the state panel
  const formDataDisplay = JSON.stringify(formData, null, 2);
  const errorsDisplay =
    Object.keys(errors).length === 0 ? 'No errors' : JSON.stringify(errors, null, 2);

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 min-h-[500px]">
        {/* Form */}
        <div className="p-6 border-r border-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">
            Interactive Form with Validation
          </div>

          {submitted ? (
            <div className="card bg-success/10 p-8 border-2 border-success text-center">
              <div className="text-4xl mb-2">
                <HiCheck className="text-success mx-auto" size={48} />
              </div>
              <div className="text-success text-lg font-semibold mb-2">
                Form Submitted Successfully!
              </div>
              <div className="text-base-content/70 text-sm">
                Check the state panel to see the submitted data
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {/* Name */}
              <div className="mb-4">
                <label className="block text-xs text-base-content/70 mb-1">
                  Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`input input-bordered w-full input-sm ${
                    errors.name ? 'input-error' : ''
                  }`}
                />
                {errors.name && <div className="mt-1 text-xs text-error">{errors.name}</div>}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label className="block text-xs text-base-content/70 mb-1">
                  Email <span className="text-error">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`input input-bordered w-full input-sm ${
                    errors.email ? 'input-error' : ''
                  }`}
                />
                {errors.email && <div className="mt-1 text-xs text-error">{errors.email}</div>}
              </div>

              {/* Age */}
              <div className="mb-4">
                <label className="block text-xs text-base-content/70 mb-1">
                  Age <span className="text-error">*</span>
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  min="0"
                  className={`input input-bordered w-full input-sm ${
                    errors.age ? 'input-error' : ''
                  }`}
                />
                {errors.age && <div className="mt-1 text-xs text-error">{errors.age}</div>}
              </div>

              {/* Newsletter */}
              <div className="mb-6">
                <label className="flex items-center gap-2 text-sm text-base-content/70 cursor-pointer">
                  <input
                    type="checkbox"
                    name="newsletter"
                    checked={formData.newsletter}
                    onChange={handleChange}
                    className="checkbox checkbox-sm"
                  />
                  Subscribe to newsletter
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  Submit
                </button>
                <button type="button" onClick={handleReset} className="btn btn-ghost">
                  Reset
                </button>
              </div>
            </form>
          )}
        </div>

        {/* State & Events */}
        <div className="p-6 bg-base-300">
          <div className="text-xs text-base-content/50 mb-4 uppercase">Form State (Live)</div>

          <div className="mb-6">
            <div className="max-h-[200px] overflow-auto">
              <CodeSnippet code={formDataDisplay} language="json" showCopy={false} />
            </div>
          </div>

          <div className="mb-6">
            <div className="text-base-content/50 text-xs mb-2">ERRORS:</div>
            <CodeSnippet
              code={errorsDisplay}
              language={Object.keys(errors).length === 0 ? 'json' : 'json'}
              showCopy={false}
            />
          </div>

          <div className="p-4 card bg-base-200 border-2 border-dashed border-base-300">
            <div className="text-base-content/50 text-xs mb-2">EVENTS USED:</div>
            <div className="text-xs text-base-content/70 leading-relaxed space-y-1">
              <div>
                • <code className="text-primary">onChange</code> - Updates state on input
              </div>
              <div>
                • <code className="text-primary">onSubmit</code> - Handles form submission
              </div>
              <div>
                • <code className="text-primary">onClick</code> - Reset button
              </div>
              <div>
                • <code className="text-success">e.preventDefault()</code> - Prevents page refresh
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

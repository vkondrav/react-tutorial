// ============================================
// ControlledPlayground - Interactive form practice
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineUser, HiOutlineMail, HiOutlineKey } from 'react-icons/hi';
import { CodeSnippet } from '../../components';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
  notifications: {
    email: boolean;
    sms: boolean;
    push: boolean;
  };
  bio: string;
  agreeToTerms: boolean;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  role?: string;
  agreeToTerms?: string;
}

export default function ControlledPlayground(): React.ReactElement {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    notifications: {
      email: true,
      sms: false,
      push: true,
    },
    bio: '',
    agreeToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [showData, setShowData] = useState(false);

  // Validation logic
  const validate = (): FormErrors => {
    const errors: FormErrors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errors.email = 'Valid email is required';
    }

    if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.role) {
      errors.role = 'Please select a role';
    }

    if (!formData.agreeToTerms) {
      errors.agreeToTerms = 'You must agree to the terms';
    }

    return errors;
  };

  const errors = validate();
  const isValid = Object.keys(errors).length === 0;

  // Generic change handler for text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;

      // Handle nested notification checkboxes
      if (name.startsWith('notifications.')) {
        const key = name.split('.')[1] as keyof FormData['notifications'];
        setFormData((prev) => ({
          ...prev,
          notifications: {
            ...prev.notifications,
            [key]: checked,
          },
        }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: checked }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setSubmitted(true);
    }
  };

  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: '',
      notifications: { email: true, sms: false, push: true },
      bio: '',
      agreeToTerms: false,
    });
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="card bg-base-300 p-6">
        <div className="text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h3 className="text-2xl font-bold text-success">Form Submitted!</h3>
          <p className="text-base-content/70">
            Welcome, {formData.firstName} {formData.lastName}!
          </p>
          <div className="bg-base-200 rounded-lg p-4 text-left text-sm">
            <pre className="overflow-x-auto">{JSON.stringify(formData, null, 2)}</pre>
          </div>
          <button onClick={handleReset} className="btn btn-primary">
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="card bg-base-300 p-6 space-y-6">
        {/* Name Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <HiOutlineUser size={16} />
                First Name
              </span>
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              className={`input input-bordered w-full ${
                formData.firstName && (errors.firstName ? 'input-error' : 'input-success')
              }`}
            />
            {formData.firstName && errors.firstName && (
              <span className="text-error text-xs mt-1 flex items-center gap-1">
                <HiX size={12} /> {errors.firstName}
              </span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className={`input input-bordered w-full ${
                formData.lastName && (errors.lastName ? 'input-error' : 'input-success')
              }`}
            />
            {formData.lastName && errors.lastName && (
              <span className="text-error text-xs mt-1 flex items-center gap-1">
                <HiX size={12} /> {errors.lastName}
              </span>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text flex items-center gap-2">
              <HiOutlineMail size={16} />
              Email
            </span>
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`input input-bordered w-full ${
              formData.email && (errors.email ? 'input-error' : 'input-success')
            }`}
          />
          {formData.email && (
            <span
              className={`text-xs mt-1 flex items-center gap-1 ${
                errors.email ? 'text-error' : 'text-success'
              }`}
            >
              {errors.email ? <HiX size={12} /> : <HiCheck size={12} />}
              {errors.email || 'Valid email'}
            </span>
          )}
        </div>

        {/* Password Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-2">
                <HiOutlineKey size={16} />
                Password
              </span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input input-bordered w-full ${
                formData.password && (errors.password ? 'input-error' : 'input-success')
              }`}
            />
            {formData.password && (
              <span
                className={`text-xs mt-1 flex items-center gap-1 ${
                  errors.password ? 'text-error' : 'text-success'
                }`}
              >
                {errors.password ? <HiX size={12} /> : <HiCheck size={12} />}
                {errors.password || 'Strong password'}
              </span>
            )}
          </div>
          <div>
            <label className="label">
              <span className="label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className={`input input-bordered w-full ${
                formData.confirmPassword &&
                (errors.confirmPassword ? 'input-error' : 'input-success')
              }`}
            />
            {formData.confirmPassword && (
              <span
                className={`text-xs mt-1 flex items-center gap-1 ${
                  errors.confirmPassword ? 'text-error' : 'text-success'
                }`}
              >
                {errors.confirmPassword ? <HiX size={12} /> : <HiCheck size={12} />}
                {errors.confirmPassword || 'Passwords match'}
              </span>
            )}
          </div>
        </div>

        {/* Role Select */}
        <div>
          <label className="label">
            <span className="label-text">Role</span>
          </label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`select select-bordered w-full ${formData.role ? 'select-success' : ''}`}
          >
            <option value="">Select your role...</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="manager">Manager</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Notifications */}
        <div>
          <label className="label">
            <span className="label-text">Notification Preferences</span>
          </label>
          <div className="flex flex-wrap gap-4">
            <label className="label cursor-pointer gap-2">
              <input
                type="checkbox"
                name="notifications.email"
                checked={formData.notifications.email}
                onChange={handleChange}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">Email</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="checkbox"
                name="notifications.sms"
                checked={formData.notifications.sms}
                onChange={handleChange}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">SMS</span>
            </label>
            <label className="label cursor-pointer gap-2">
              <input
                type="checkbox"
                name="notifications.push"
                checked={formData.notifications.push}
                onChange={handleChange}
                className="checkbox checkbox-primary checkbox-sm"
              />
              <span className="label-text">Push</span>
            </label>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="label">
            <span className="label-text">Bio (optional)</span>
            <span className="label-text-alt">{formData.bio.length}/200</span>
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            maxLength={200}
            placeholder="Tell us about yourself..."
            className="textarea textarea-bordered w-full h-20"
          />
        </div>

        {/* Terms */}
        <div className="form-control">
          <label className="label cursor-pointer justify-start gap-3">
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`checkbox ${errors.agreeToTerms ? 'checkbox-error' : 'checkbox-primary'}`}
            />
            <span className="label-text">
              I agree to the{' '}
              <a href="#" className="link link-primary">
                Terms of Service
              </a>
            </span>
          </label>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button type="submit" disabled={!isValid} className="btn btn-primary flex-1">
            {isValid ? 'Create Account' : 'Fill Required Fields'}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-ghost">
            Reset
          </button>
        </div>

        {/* Validation Summary */}
        {!isValid && Object.keys(errors).length > 0 && (
          <div className="bg-error/10 rounded-lg p-3 text-sm">
            <div className="font-semibold text-error mb-2">Missing or invalid:</div>
            <ul className="space-y-1">
              {Object.entries(errors).map(([field, message]) => (
                <li key={field} className="flex items-center gap-2 text-base-content/70">
                  <HiX className="text-error" size={12} />
                  {message}
                </li>
              ))}
            </ul>
          </div>
        )}
      </form>

      {/* State Inspector */}
      <div className="card bg-base-300 p-4">
        <button onClick={() => setShowData(!showData)} className="btn btn-ghost btn-sm w-full">
          {showData ? 'Hide' : 'Show'} Form State (Debug)
        </button>
        {showData && (
          <div className="mt-4 bg-base-200 rounded-lg p-4">
            <CodeSnippet code={JSON.stringify(formData, null, 2)} language="json" />
          </div>
        )}
      </div>
    </div>
  );
}

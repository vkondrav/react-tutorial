// ============================================
// ValidationPlayground - Complete validated form
// ============================================

import { useState, useEffect } from 'react';
import { HiCheck, HiX, HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

// Simulated taken emails
const TAKEN_EMAILS = ['test@example.com', 'admin@example.com', 'user@example.com'];

interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  website: string;
}

interface FormTouched {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
  age: boolean;
  website: boolean;
}

interface FormErrors {
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  website: string;
}

export default function ValidationPlayground(): React.ReactElement {
  const [form, setForm] = useState<FormData>({
    email: '',
    password: '',
    confirmPassword: '',
    age: '',
    website: '',
  });

  const [touched, setTouched] = useState<FormTouched>({
    email: false,
    password: false,
    confirmPassword: false,
    age: false,
    website: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailTaken, setEmailTaken] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [success, setSuccess] = useState(false);

  // Validation rules
  const validate = (): FormErrors => {
    const errors: FormErrors = {
      email: '',
      password: '',
      confirmPassword: '',
      age: '',
      website: '',
    };

    // Email
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = 'Invalid email format';
    } else if (emailTaken) {
      errors.email = 'This email is already registered';
    }

    // Password
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 8) {
      errors.password = 'Minimum 8 characters';
    } else if (!/(?=.*[A-Z])(?=.*[0-9])/.test(form.password)) {
      errors.password = 'Must include uppercase and number';
    }

    // Confirm Password
    if (!form.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password';
    } else if (form.confirmPassword !== form.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    // Age
    if (!form.age) {
      errors.age = 'Age is required';
    } else {
      const ageNum = parseInt(form.age);
      if (isNaN(ageNum) || ageNum < 13 || ageNum > 120) {
        errors.age = 'Age must be between 13 and 120';
      }
    }

    // Website (optional but must be valid if provided)
    if (form.website && !/^https?:\/\/.+\..+/.test(form.website)) {
      errors.website = 'Invalid URL (must start with http:// or https://)';
    }

    return errors;
  };

  const errors = validate();
  const hasErrors = Object.values(errors).some((e) => e);

  // Async email check
  useEffect(() => {
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setTimeout(() => {
        setEmailTaken(false);
      }, 0);
      return;
    }

    const timer = setTimeout(async () => {
      setCheckingEmail(true);
      await new Promise((r) => setTimeout(r, 600));
      setEmailTaken(TAKEN_EMAILS.includes(form.email.toLowerCase()));
      setCheckingEmail(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [form.email]);

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleBlur = (field: keyof FormTouched) => {
    setTouched((t) => ({ ...t, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTouched({
      email: true,
      password: true,
      confirmPassword: true,
      age: true,
      website: true,
    });

    if (!hasErrors && !checkingEmail) {
      setSuccess(true);
    }
  };

  const handleReset = () => {
    setForm({ email: '', password: '', confirmPassword: '', age: '', website: '' });
    setTouched({
      email: false,
      password: false,
      confirmPassword: false,
      age: false,
      website: false,
    });
    setSubmitted(false);
    setSuccess(false);
    setEmailTaken(false);
  };

  if (success) {
    return (
      <div className="card bg-base-300 p-6 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-success mb-2">Account Created!</h3>
        <p className="text-base-content/70 mb-4">
          Welcome! Your account has been created successfully.
        </p>
        <div className="bg-base-200 rounded-lg p-4 text-left text-sm mb-4">
          <div>
            <strong>Email:</strong> {form.email}
          </div>
          <div>
            <strong>Age:</strong> {form.age}
          </div>
          {form.website && (
            <div>
              <strong>Website:</strong> {form.website}
            </div>
          )}
        </div>
        <button onClick={handleReset} className="btn btn-primary">
          Start Over
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="card bg-base-300 p-6 space-y-4">
        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text">
              Email <span className="text-error">*</span>
            </span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={form.email}
              onChange={(e) => handleChange('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              placeholder="you@example.com"
              className={`input input-bordered w-full pr-10 ${
                touched.email
                  ? errors.email
                    ? 'input-error'
                    : form.email
                      ? 'input-success'
                      : ''
                  : ''
              }`}
            />
            {checkingEmail && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 loading loading-spinner loading-sm"></span>
            )}
            {!checkingEmail && touched.email && !errors.email && form.email && (
              <HiCheck
                className="absolute right-3 top-1/2 -translate-y-1/2 text-success"
                size={20}
              />
            )}
          </div>
          {touched.email && errors.email && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.email}
            </div>
          )}
          <div className="text-xs text-base-content/50 mt-1">Try: test@example.com (taken)</div>
        </div>

        {/* Password */}
        <div>
          <label className="label">
            <span className="label-text">
              Password <span className="text-error">*</span>
            </span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={(e) => handleChange('password', e.target.value)}
              onBlur={() => handleBlur('password')}
              placeholder="Min 8 chars, uppercase + number"
              className={`input input-bordered w-full pr-10 ${
                touched.password
                  ? errors.password
                    ? 'input-error'
                    : form.password
                      ? 'input-success'
                      : ''
                  : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
            >
              {showPassword ? <HiOutlineEyeOff size={20} /> : <HiOutlineEye size={20} />}
            </button>
          </div>
          {touched.password && errors.password && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.password}
            </div>
          )}

          {/* Password Strength */}
          {form.password && (
            <div className="flex gap-1 mt-2">
              {[
                form.password.length >= 8,
                /[A-Z]/.test(form.password),
                /[0-9]/.test(form.password),
                /[^A-Za-z0-9]/.test(form.password),
              ].map((passed, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full ${passed ? 'bg-success' : 'bg-base-200'}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="label">
            <span className="label-text">
              Confirm Password <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="password"
            value={form.confirmPassword}
            onChange={(e) => handleChange('confirmPassword', e.target.value)}
            onBlur={() => handleBlur('confirmPassword')}
            placeholder="Re-enter password"
            className={`input input-bordered w-full ${
              touched.confirmPassword
                ? errors.confirmPassword
                  ? 'input-error'
                  : form.confirmPassword
                    ? 'input-success'
                    : ''
                : ''
            }`}
          />
          {touched.confirmPassword && errors.confirmPassword && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.confirmPassword}
            </div>
          )}
          {touched.confirmPassword && !errors.confirmPassword && form.confirmPassword && (
            <div className="flex items-center gap-1 mt-1 text-success text-xs">
              <HiCheck size={14} /> Passwords match
            </div>
          )}
        </div>

        {/* Age */}
        <div>
          <label className="label">
            <span className="label-text">
              Age <span className="text-error">*</span>
            </span>
          </label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => handleChange('age', e.target.value)}
            onBlur={() => handleBlur('age')}
            placeholder="Must be 13 or older"
            min="1"
            max="150"
            className={`input input-bordered w-full ${
              touched.age ? (errors.age ? 'input-error' : form.age ? 'input-success' : '') : ''
            }`}
          />
          {touched.age && errors.age && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.age}
            </div>
          )}
        </div>

        {/* Website (optional) */}
        <div>
          <label className="label">
            <span className="label-text">Website</span>
            <span className="label-text-alt">Optional</span>
          </label>
          <input
            type="text"
            value={form.website}
            onChange={(e) => handleChange('website', e.target.value)}
            onBlur={() => handleBlur('website')}
            placeholder="https://yoursite.com"
            className={`input input-bordered w-full ${
              touched.website && errors.website ? 'input-error' : ''
            }`}
          />
          {touched.website && errors.website && (
            <div className="flex items-center gap-1 mt-1 text-error text-xs">
              <HiX size={14} /> {errors.website}
            </div>
          )}
        </div>

        {/* Error Summary */}
        {submitted && hasErrors && (
          <div className="alert alert-error text-sm">
            <HiX size={20} />
            <span>Please fix the errors above before submitting.</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={checkingEmail} className="btn btn-primary flex-1">
            {checkingEmail ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Checking...
              </>
            ) : (
              'Create Account'
            )}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-ghost">
            Reset
          </button>
        </div>
      </form>

      {/* Validation Checklist */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">Validation Status</h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            { field: 'Email', valid: !errors.email && form.email && !checkingEmail },
            { field: 'Password', valid: !errors.password && form.password },
            { field: 'Confirm', valid: !errors.confirmPassword && form.confirmPassword },
            { field: 'Age', valid: !errors.age && form.age },
          ].map(({ field, valid }) => (
            <div
              key={field}
              className={`flex items-center gap-2 ${valid ? 'text-success' : 'text-base-content/40'}`}
            >
              {valid ? <HiCheck size={16} /> : <HiX size={16} />}
              {field}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

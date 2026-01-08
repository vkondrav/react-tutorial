// ============================================
// ValidationRulesDemo - Common validation rules
// ============================================

import { useState } from 'react';
import { HiCheck, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import requiredValidationCode from './examples/RequiredValidation.tsx?raw';
import lengthValidationCode from './examples/LengthValidation.tsx?raw';
import patternValidationCode from './examples/PatternValidation.tsx?raw';
import customValidationCode from './examples/CustomValidation.tsx?raw';

type RuleType = 'required' | 'length' | 'pattern' | 'custom';

export default function ValidationRulesDemo(): React.ReactElement {
  const [activeRule, setActiveRule] = useState<RuleType>('required');

  const rules: { id: RuleType; label: string }[] = [
    { id: 'required', label: 'Required' },
    { id: 'length', label: 'Length' },
    { id: 'pattern', label: 'Pattern (Regex)' },
    { id: 'custom', label: 'Custom' },
  ];

  return (
    <div className="space-y-4">
      {/* Rule Selection */}
      <div className="flex flex-wrap gap-2">
        {rules.map((rule) => (
          <button
            key={rule.id}
            onClick={() => setActiveRule(rule.id)}
            className={`btn btn-sm ${activeRule === rule.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {rule.label}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="card bg-base-300 p-6">
        {activeRule === 'required' && <RequiredDemo />}
        {activeRule === 'length' && <LengthDemo />}
        {activeRule === 'pattern' && <PatternDemo />}
        {activeRule === 'custom' && <CustomDemo />}
      </div>
    </div>
  );
}

// ===== Required Demo =====
function RequiredDemo() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const error = !value.trim() ? 'This field is required' : '';
  const showError = touched && error;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-primary">Required Field</h4>
      <p className="text-sm text-base-content/70">
        The most basic validation — ensure the field isn't empty.
      </p>

      <div>
        <label className="label">
          <span className="label-text">
            Username <span className="text-error">*</span>
          </span>
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Enter username..."
          className={`input input-bordered w-full ${showError ? 'input-error' : ''}`}
        />
        {showError && (
          <div className="flex items-center gap-1 mt-1 text-error text-xs">
            <HiX size={14} /> {error}
          </div>
        )}
      </div>

      <div>
        <CodeSnippet code={requiredValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== Length Demo =====
function LengthDemo() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  const minLength = 3;
  const maxLength = 20;

  const getError = (): string => {
    if (!value) return 'Username is required';
    if (value.length < minLength) return `Minimum ${minLength} characters`;
    if (value.length > maxLength) return `Maximum ${maxLength} characters`;
    return '';
  };

  const error = getError();
  const showError = touched && error;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-secondary">Length Constraints</h4>
      <p className="text-sm text-base-content/70">Validate minimum and maximum length.</p>

      <div>
        <label className="label">
          <span className="label-text">Username</span>
          <span className="label-text-alt">
            {value.length}/{maxLength}
          </span>
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          maxLength={maxLength + 5}
          placeholder="3-20 characters..."
          className={`input input-bordered w-full ${
            touched ? (error ? 'input-error' : value ? 'input-success' : '') : ''
          }`}
        />
        {showError && (
          <div className="flex items-center gap-1 mt-1 text-error text-xs">
            <HiX size={14} /> {error}
          </div>
        )}
        {touched && !error && value && (
          <div className="flex items-center gap-1 mt-1 text-success text-xs">
            <HiCheck size={14} /> Valid length
          </div>
        )}
      </div>

      <div>
        <CodeSnippet code={lengthValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== Pattern Demo =====
function PatternDemo() {
  const [value, setValue] = useState('');
  const [touched, setTouched] = useState(false);

  // Email regex
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getError = (): string => {
    if (!value) return 'Email is required';
    if (!emailPattern.test(value)) return 'Invalid email format';
    return '';
  };

  const error = getError();
  const showError = touched && error;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-accent">Pattern Matching (Regex)</h4>
      <p className="text-sm text-base-content/70">Use regular expressions for format validation.</p>

      <div>
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="you@example.com"
          className={`input input-bordered w-full ${
            touched ? (error ? 'input-error' : value ? 'input-success' : '') : ''
          }`}
        />
        {showError && (
          <div className="flex items-center gap-1 mt-1 text-error text-xs">
            <HiX size={14} /> {error}
          </div>
        )}
        {touched && !error && value && (
          <div className="flex items-center gap-1 mt-1 text-success text-xs">
            <HiCheck size={14} /> Valid email format
          </div>
        )}
      </div>

      <div className="flex items-start gap-2 text-sm bg-accent/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-accent shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          Common patterns: email, phone, URL, credit card, zip code. Keep regex simple — complex
          ones can be slow!
        </p>
      </div>

      <div>
        <CodeSnippet code={patternValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ===== Custom Demo =====
function CustomDemo() {
  const [password, setPassword] = useState('');
  const [touched, setTouched] = useState(false);

  const rules = [
    { test: (v: string) => v.length >= 8, label: 'At least 8 characters' },
    { test: (v: string) => /[A-Z]/.test(v), label: 'One uppercase letter' },
    { test: (v: string) => /[a-z]/.test(v), label: 'One lowercase letter' },
    { test: (v: string) => /[0-9]/.test(v), label: 'One number' },
    { test: (v: string) => /[^A-Za-z0-9]/.test(v), label: 'One special character' },
  ];

  const passedRules = rules.filter((r) => r.test(password)).length;
  const allPassed = passedRules === rules.length;

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-success">Custom Validation</h4>
      <p className="text-sm text-base-content/70">
        Build complex validation with multiple rules — great for passwords.
      </p>

      <div>
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="Create a strong password..."
          className={`input input-bordered w-full ${
            touched && password ? (allPassed ? 'input-success' : 'input-warning') : ''
          }`}
        />

        {/* Strength Indicator */}
        {password && (
          <div className="mt-2">
            <div className="flex gap-1 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors ${
                    passedRules >= i
                      ? passedRules <= 2
                        ? 'bg-error'
                        : passedRules <= 4
                          ? 'bg-warning'
                          : 'bg-success'
                      : 'bg-base-200'
                  }`}
                />
              ))}
            </div>
            <div className="space-y-1">
              {rules.map((rule, i) => {
                const passed = rule.test(password);
                return (
                  <div
                    key={i}
                    className={`flex items-center gap-2 text-xs ${
                      passed ? 'text-success' : 'text-base-content/50'
                    }`}
                  >
                    {passed ? <HiCheck size={12} /> : <HiX size={12} />}
                    {rule.label}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div>
        <CodeSnippet code={customValidationCode} language="tsx" />
      </div>
    </div>
  );
}

// ============================================
// NameAttributeDemo - Using name for identification
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb, HiOutlineArrowRight } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import genericHandlerCode from './examples/GenericHandler.tsx?raw';

export default function NameAttributeDemo(): React.ReactElement {
  const [form, setForm] = useState({
    username: '',
    email: '',
    age: '',
    subscribe: false,
    plan: 'free',
  });

  const [lastChanged, setLastChanged] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));
    setLastChanged(name);

    // Clear highlight after 1.5s
    setTimeout(() => setLastChanged(null), 1500);
  };

  return (
    <div className="space-y-4">
      <div className="card bg-base-300 p-6 space-y-4">
        {/* The Magic Formula */}
        <div className="bg-base-200 rounded-lg p-4 text-center">
          <div className="text-sm text-base-content/60 mb-2">The Generic Handler Pattern</div>
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-lg text-primary">
            {'{ ...prev, [e.target.name]: e.target.value }'}
          </code>
        </div>

        {/* Form Fields */}
        <div className="grid md:grid-cols-2 gap-4">
          <div
            className={`transition-colors rounded-lg p-2 ${lastChanged === 'username' ? 'bg-primary/20' : ''}`}
          >
            <label className="label">
              <span className="label-text">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                Username <code className="text-primary text-xs ml-1">name="username"</code>
              </span>
            </label>
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="johndoe"
              className="input input-bordered w-full input-sm"
            />
          </div>

          <div
            className={`transition-colors rounded-lg p-2 ${lastChanged === 'email' ? 'bg-primary/20' : ''}`}
          >
            <label className="label">
              <span className="label-text">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                Email <code className="text-primary text-xs ml-1">name="email"</code>
              </span>
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input input-bordered w-full input-sm"
            />
          </div>

          <div
            className={`transition-colors rounded-lg p-2 ${lastChanged === 'age' ? 'bg-primary/20' : ''}`}
          >
            <label className="label">
              <span className="label-text">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                Age <code className="text-primary text-xs ml-1">name="age"</code>
              </span>
            </label>
            <input
              type="number"
              name="age"
              value={form.age}
              onChange={handleChange}
              placeholder="25"
              className="input input-bordered w-full input-sm"
            />
          </div>

          <div
            className={`transition-colors rounded-lg p-2 ${lastChanged === 'plan' ? 'bg-primary/20' : ''}`}
          >
            <label className="label">
              <span className="label-text">
                {/* eslint-disable-next-line local/no-raw-code-element */}
                Plan <code className="text-primary text-xs ml-1">name="plan"</code>
              </span>
            </label>
            <select
              name="plan"
              value={form.plan}
              onChange={handleChange}
              className="select select-bordered w-full select-sm"
            >
              <option value="free">Free</option>
              <option value="pro">Pro</option>
              <option value="enterprise">Enterprise</option>
            </select>
          </div>
        </div>

        {/* Checkbox */}
        <div
          className={`transition-colors rounded-lg p-2 ${lastChanged === 'subscribe' ? 'bg-primary/20' : ''}`}
        >
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              name="subscribe"
              checked={form.subscribe}
              onChange={handleChange}
              className="checkbox checkbox-primary checkbox-sm"
            />
            <span className="label-text">
              Subscribe to newsletter {/* eslint-disable-next-line local/no-raw-code-element */}
              <code className="text-primary text-xs ml-1">name="subscribe"</code>
            </span>
          </label>
        </div>

        {/* State Display */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs text-base-content/60">Form State</span>
            {lastChanged && (
              <span className="badge badge-primary badge-sm animate-pulse">
                {lastChanged} changed!
              </span>
            )}
          </div>
          <CodeSnippet language="json" code={JSON.stringify(form, null, 2)} showCopy={false} />
        </div>
      </div>

      {/* How It Works */}
      <div className="card bg-base-300 p-5">
        <h4 className="font-semibold mb-4">How It Works</h4>
        <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
          <div className="bg-base-200 rounded-lg p-3 flex-1 text-center">
            <div className="text-xs text-base-content/60 mb-1">1. Input has name</div>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-secondary">{'<input name="email" />'}</code>
          </div>
          <HiOutlineArrowRight className="text-primary hidden md:block" size={24} />
          <div className="bg-base-200 rounded-lg p-3 flex-1 text-center">
            <div className="text-xs text-base-content/60 mb-1">2. Extract from event</div>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-secondary">e.target.name → "email"</code>
          </div>
          <HiOutlineArrowRight className="text-primary hidden md:block" size={24} />
          <div className="bg-base-200 rounded-lg p-3 flex-1 text-center">
            <div className="text-xs text-base-content/60 mb-1">3. Update that key</div>
            {/* eslint-disable-next-line local/no-raw-code-element */}
            <code className="text-secondary">{'{ [name]: value }'}</code>
          </div>
        </div>
      </div>

      {/* Checkbox Note */}
      <div className="flex items-start gap-2 text-sm bg-warning/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-warning shrink-0 mt-0.5" size={18} />
        <div className="text-base-content/70">
          <strong className="text-warning">Checkbox gotcha:</strong> Checkboxes use{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code className="text-warning">e.target.checked</code> (boolean), not{' '}
          {/* eslint-disable-next-line local/no-raw-code-element */}
          <code>e.target.value</code>. Check the input type first!
        </div>
      </div>

      {/* Code Example */}
      <CodeSnippet
        title="Generic handler for all input types"
        language="tsx"
        code={genericHandlerCode}
      />
    </div>
  );
}

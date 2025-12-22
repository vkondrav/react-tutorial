// ============================================
// FormPatternsDemo - Common form patterns
// ============================================

import { useState } from 'react';
import { HiRefresh, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import nestedObjectCode from './examples/NestedObjectUpdates.tsx?raw';
import arrayFieldCode from './examples/ArrayFieldUpdates.tsx?raw';
import formResetCode from './examples/FormResetPattern.tsx?raw';

type PatternType = 'nested' | 'arrays' | 'reset';

export default function FormPatternsDemo(): React.ReactElement {
  const [activePattern, setActivePattern] = useState<PatternType>('nested');

  const patterns: { id: PatternType; label: string }[] = [
    { id: 'nested', label: 'Nested Objects' },
    { id: 'arrays', label: 'Array Fields' },
    { id: 'reset', label: 'Form Reset' },
  ];

  return (
    <div className="space-y-4">
      {/* Pattern Selection */}
      <div className="flex flex-wrap gap-2">
        {patterns.map((p) => (
          <button
            key={p.id}
            onClick={() => setActivePattern(p.id)}
            className={`btn btn-sm ${activePattern === p.id ? 'btn-primary' : 'btn-ghost'}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Demo Area */}
      <div className="card bg-base-300 p-6">
        {activePattern === 'nested' && <NestedObjectDemo />}
        {activePattern === 'arrays' && <ArrayFieldDemo />}
        {activePattern === 'reset' && <FormResetDemo />}
      </div>
    </div>
  );
}

// ===== Nested Objects =====
function NestedObjectDemo() {
  const [form, setForm] = useState({
    name: '',
    address: {
      street: '',
      city: '',
      zip: '',
    },
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      address: { ...prev.address, [name]: value },
    }));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-primary">Nested Objects</h4>
      <p className="text-sm text-base-content/70">
        When state has nested objects, spread at each level you need to update.
      </p>

      <div className="space-y-3">
        <div>
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleNameChange}
            placeholder="John Doe"
            className="input input-bordered w-full input-sm"
          />
        </div>

        <div className="pl-4 border-l-2 border-primary/30 space-y-3">
          <div className="text-xs text-primary font-semibold">Address (nested)</div>
          <div className="grid md:grid-cols-3 gap-3">
            <div>
              <label className="label py-0">
                <span className="label-text text-xs">Street</span>
              </label>
              <input
                type="text"
                name="street"
                value={form.address.street}
                onChange={handleAddressChange}
                placeholder="123 Main St"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label className="label py-0">
                <span className="label-text text-xs">City</span>
              </label>
              <input
                type="text"
                name="city"
                value={form.address.city}
                onChange={handleAddressChange}
                placeholder="New York"
                className="input input-bordered w-full input-sm"
              />
            </div>
            <div>
              <label className="label py-0">
                <span className="label-text text-xs">ZIP</span>
              </label>
              <input
                type="text"
                name="zip"
                value={form.address.zip}
                onChange={handleAddressChange}
                placeholder="10001"
                className="input input-bordered w-full input-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <CodeSnippet
        title="State"
        language="json"
        code={JSON.stringify(form, null, 2)}
        showCopy={false}
      />

      <CodeSnippet title="Nested object updates" language="tsx" code={nestedObjectCode} />
    </div>
  );
}

// ===== Array Fields =====
function ArrayFieldDemo() {
  const [form, setForm] = useState({
    name: '',
    skills: ['React', 'TypeScript'],
  });

  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      setForm((prev) => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()],
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setForm((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-secondary">Array Fields</h4>
      <p className="text-sm text-base-content/70">
        Arrays in state need immutable updates — use spread, filter, or map.
      </p>

      <div>
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
          placeholder="Your name"
          className="input input-bordered w-full input-sm"
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text">Skills</span>
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addSkill()}
            placeholder="Add a skill..."
            className="input input-bordered flex-1 input-sm"
          />
          <button onClick={addSkill} className="btn btn-secondary btn-sm">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.skills.map((skill, index) => (
            <span key={index} className="badge badge-secondary gap-1">
              {skill}
              <button onClick={() => removeSkill(index)} className="hover:text-error">
                ×
              </button>
            </span>
          ))}
          {form.skills.length === 0 && (
            <span className="text-xs text-base-content/50">No skills added</span>
          )}
        </div>
      </div>

      <CodeSnippet
        title="State"
        language="json"
        code={JSON.stringify(form, null, 2)}
        showCopy={false}
      />

      <CodeSnippet title="Array field updates" language="tsx" code={arrayFieldCode} />
    </div>
  );
}

// ===== Form Reset =====
function FormResetDemo() {
  const initialState = {
    email: '',
    password: '',
    remember: false,
  };

  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialState);
    setSubmitted(false);
  };

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-accent">Form Reset</h4>
      <p className="text-sm text-base-content/70">
        Store initial values in a constant, then reset by setting state back to it.
      </p>

      {submitted ? (
        <div className="bg-success/20 rounded-lg p-4 space-y-3">
          <div className="text-success font-semibold text-center">Submitted!</div>
          <CodeSnippet language="json" code={JSON.stringify(form, null, 2)} showCopy={false} />
          <div className="text-center">
            <button onClick={handleReset} className="btn btn-accent btn-sm gap-1">
              <HiRefresh size={16} /> Reset Form
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="input input-bordered w-full input-sm"
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="input input-bordered w-full input-sm"
            />
          </div>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="remember"
              checked={form.remember}
              onChange={handleChange}
              className="checkbox checkbox-accent checkbox-sm"
            />
            <span className="label-text">Remember me</span>
          </label>

          <div className="flex gap-2">
            <button type="submit" className="btn btn-accent btn-sm flex-1">
              Submit
            </button>
            <button type="button" onClick={handleReset} className="btn btn-ghost btn-sm">
              Reset
            </button>
          </div>
        </form>
      )}

      <div className="flex items-start gap-2 text-sm bg-accent/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-accent shrink-0 mt-0.5" size={18} />
        <div className="text-base-content/70">
          <strong className="text-accent">Pro tip:</strong> Define <code>initialState</code> outside
          the component or use <code>useMemo</code> to avoid recreating it on every render.
        </div>
      </div>

      <CodeSnippet title="Form reset pattern" language="tsx" code={formResetCode} />
    </div>
  );
}

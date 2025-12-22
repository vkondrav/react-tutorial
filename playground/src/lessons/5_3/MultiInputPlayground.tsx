// ============================================
// MultiInputPlayground - Complete multi-input form
// ============================================

import { useState } from 'react';
import { HiPlus, HiX, HiCheck, HiOutlineMail, HiOutlineUser, HiOutlinePhone } from 'react-icons/hi';
import { CodeSnippet } from '../components';

interface ContactForm {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  phones: { id: string; type: string; number: string }[];
  preferences: {
    newsletter: boolean;
    updates: boolean;
    marketing: boolean;
  };
  priority: string;
}

const initialState: ContactForm = {
  firstName: '',
  lastName: '',
  email: '',
  company: '',
  subject: '',
  message: '',
  phones: [{ id: crypto.randomUUID(), type: 'mobile', number: '' }],
  preferences: {
    newsletter: true,
    updates: false,
    marketing: false,
  },
  priority: 'normal',
};

export default function MultiInputPlayground(): React.ReactElement {
  const [form, setForm] = useState<ContactForm>(initialState);
  const [submitted, setSubmitted] = useState(false);

  // Generic handler for simple fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handler for nested preferences
  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      preferences: { ...prev.preferences, [name]: checked },
    }));
  };

  // Phone handlers
  const addPhone = () => {
    setForm((prev) => ({
      ...prev,
      phones: [...prev.phones, { id: crypto.randomUUID(), type: 'mobile', number: '' }],
    }));
  };

  const removePhone = (id: string) => {
    setForm((prev) => ({
      ...prev,
      phones: prev.phones.filter((p) => p.id !== id),
    }));
  };

  const updatePhone = (id: string, field: 'type' | 'number', value: string) => {
    setForm((prev) => ({
      ...prev,
      phones: prev.phones.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
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

  // Simple validation
  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.email.includes('@') &&
    form.subject.trim() &&
    form.message.trim();

  if (submitted) {
    return (
      <div className="card bg-base-300 p-6 text-center">
        <div className="text-6xl mb-4">📬</div>
        <h3 className="text-2xl font-bold text-success mb-2">Message Sent!</h3>
        <p className="text-base-content/70 mb-4">
          Thanks {form.firstName}! We'll get back to you soon.
        </p>
        <div className="text-left mb-4 max-h-64 overflow-y-auto">
          <CodeSnippet language="json" code={JSON.stringify(form, null, 2)} showCopy={false} />
        </div>
        <button onClick={handleReset} className="btn btn-primary">
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="card bg-base-300 p-6 space-y-5">
        {/* Name Row */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <HiOutlineUser size={14} /> First Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="John"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">
                Last Name <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Doe"
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Email & Company */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="label">
              <span className="label-text flex items-center gap-1">
                <HiOutlineMail size={14} /> Email <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Company</span>
            </label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Acme Inc."
              className="input input-bordered w-full"
            />
          </div>
        </div>

        {/* Phone Numbers (Dynamic) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label py-0">
              <span className="label-text flex items-center gap-1">
                <HiOutlinePhone size={14} /> Phone Numbers
              </span>
            </label>
            <button type="button" onClick={addPhone} className="btn btn-ghost btn-xs gap-1">
              <HiPlus size={14} /> Add
            </button>
          </div>
          <div className="space-y-2">
            {form.phones.map((phone) => (
              <div key={phone.id} className="flex gap-2 items-center">
                <select
                  value={phone.type}
                  onChange={(e) => updatePhone(phone.id, 'type', e.target.value)}
                  className="select select-bordered select-sm w-28"
                >
                  <option value="mobile">Mobile</option>
                  <option value="home">Home</option>
                  <option value="work">Work</option>
                </select>
                <input
                  type="tel"
                  value={phone.number}
                  onChange={(e) => updatePhone(phone.id, 'number', e.target.value)}
                  placeholder="555-1234"
                  className="input input-bordered input-sm flex-1"
                />
                {form.phones.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePhone(phone.id)}
                    className="btn btn-ghost btn-sm btn-square text-error"
                  >
                    <HiX size={16} />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Subject & Priority */}
        <div className="grid md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <label className="label">
              <span className="label-text">
                Subject <span className="text-error">*</span>
              </span>
            </label>
            <input
              type="text"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              placeholder="How can we help?"
              className="input input-bordered w-full"
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text">Priority</span>
            </label>
            <select
              name="priority"
              value={form.priority}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option value="low">Low</option>
              <option value="normal">Normal</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="label">
            <span className="label-text">
              Message <span className="text-error">*</span>
            </span>
            <span className="label-text-alt">{form.message.length}/500</span>
          </label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us more..."
            maxLength={500}
            className="textarea textarea-bordered w-full h-24"
          />
        </div>

        {/* Preferences (Nested Object) */}
        <div>
          <label className="label">
            <span className="label-text">Communication Preferences</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {[
              { name: 'newsletter', label: 'Newsletter' },
              { name: 'updates', label: 'Product Updates' },
              { name: 'marketing', label: 'Marketing' },
            ].map(({ name, label }) => (
              <label key={name} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name={name}
                  checked={form.preferences[name as keyof typeof form.preferences]}
                  onChange={handlePreferenceChange}
                  className="checkbox checkbox-primary checkbox-sm"
                />
                <span className="label-text">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button type="submit" disabled={!isValid} className="btn btn-primary flex-1 gap-2">
            <HiCheck size={18} />
            {isValid ? 'Send Message' : 'Fill Required Fields'}
          </button>
          <button type="button" onClick={handleReset} className="btn btn-ghost">
            Reset
          </button>
        </div>
      </div>

      {/* State Preview */}
      <details className="collapse bg-base-300 collapse-arrow">
        <summary className="collapse-title text-sm font-medium">View Form State (Debug)</summary>
        <div className="collapse-content">
          <CodeSnippet language="json" code={JSON.stringify(form, null, 2)} showCopy={false} />
        </div>
      </details>
    </form>
  );
}

// ============================================
// SingleStateDemo - Object state pattern
// ============================================

import { useState } from 'react';
import { HiX, HiCheck, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import separateStatesCode from './examples/SeparateStatesApproach.tsx?raw';
import singleObjectCode from './examples/SingleObjectApproach.tsx?raw';

export default function SingleStateDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'separate' | 'object'>('separate');

  return (
    <div className="space-y-4">
      {/* Tab Selection */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('separate')}
          className={`btn btn-sm ${activeTab === 'separate' ? 'btn-error' : 'btn-ghost'}`}
        >
          <HiX size={16} /> Separate States
        </button>
        <button
          onClick={() => setActiveTab('object')}
          className={`btn btn-sm ${activeTab === 'object' ? 'btn-success' : 'btn-ghost'}`}
        >
          <HiCheck size={16} /> Single Object
        </button>
      </div>

      {/* Demo Area */}
      <div className="card bg-base-300 p-6">
        {activeTab === 'separate' ? <SeparateStatesDemo /> : <ObjectStateDemo />}
      </div>
    </div>
  );
}

// ===== Separate States (Not Recommended) =====
function SeparateStatesDemo() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-error">Not Recommended</span>
        <span className="text-xs text-base-content/60">Separate useState for each field</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="555-1234"
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      <CodeSnippet title="Problems with this approach:" language="tsx" code={separateStatesCode} />

      <div className="text-xs text-base-content/60">
        <strong className="text-error">Issues:</strong> Lots of repetition, hard to reset all
        fields, doesn't scale well for 10+ fields.
      </div>
    </div>
  );
}

// ===== Single Object State (Recommended) =====
function ObjectStateDemo() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setForm({ firstName: '', lastName: '', email: '', phone: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="badge badge-success">Recommended</span>
        <span className="text-xs text-base-content/60">Single state object</span>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">
            <span className="label-text">First Name</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="John"
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Last Name</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            placeholder="Doe"
            className="input input-bordered w-full input-sm"
          />
        </div>
        <div>
          <label className="label">
            <span className="label-text">Email</span>
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
        <div>
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="555-1234"
            className="input input-bordered w-full input-sm"
          />
        </div>
      </div>

      <button onClick={handleReset} className="btn btn-ghost btn-sm">
        Reset All
      </button>

      <CodeSnippet
        title="Form State"
        language="json"
        code={JSON.stringify(form, null, 2)}
        showCopy={false}
      />

      <div className="flex items-start gap-2 text-sm bg-success/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-success shrink-0 mt-0.5" size={18} />
        <p className="text-base-content/70">
          One state, one handler, easy reset! The <code className="text-success">name</code>{' '}
          attribute tells us which field changed.
        </p>
      </div>

      <CodeSnippet title="Clean approach:" language="tsx" code={singleObjectCode} />
    </div>
  );
}

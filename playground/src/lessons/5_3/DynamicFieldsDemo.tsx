// ============================================
// DynamicFieldsDemo - Add/remove fields
// ============================================

import { useState } from 'react';
import { HiPlus, HiX, HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../components';
import dynamicFieldsCode from './examples/DynamicFieldsPattern.tsx?raw';

interface PhoneEntry {
  id: string;
  type: string;
  number: string;
}

export default function DynamicFieldsDemo(): React.ReactElement {
  const [phones, setPhones] = useState<PhoneEntry[]>([
    { id: crypto.randomUUID(), type: 'mobile', number: '' },
  ]);

  const addPhone = () => {
    setPhones((prev) => [...prev, { id: crypto.randomUUID(), type: 'mobile', number: '' }]);
  };

  const removePhone = (id: string) => {
    setPhones((prev) => prev.filter((phone) => phone.id !== id));
  };

  const updatePhone = (id: string, field: 'type' | 'number', value: string) => {
    setPhones((prev) =>
      prev.map((phone) => (phone.id === id ? { ...phone, [field]: value } : phone))
    );
  };

  return (
    <div className="space-y-4">
      <div className="card bg-base-300 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold">Phone Numbers</h4>
          <button onClick={addPhone} className="btn btn-primary btn-sm gap-1">
            <HiPlus size={16} /> Add Phone
          </button>
        </div>

        {/* Phone List */}
        <div className="space-y-3">
          {phones.map((phone, index) => (
            <div key={phone.id} className="flex items-end gap-3 bg-base-200 rounded-lg p-3">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                  {index + 1}
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 gap-3">
                <div>
                  <label className="label py-0">
                    <span className="label-text text-xs">Type</span>
                  </label>
                  <select
                    value={phone.type}
                    onChange={(e) => updatePhone(phone.id, 'type', e.target.value)}
                    className="select select-bordered select-sm w-full"
                  >
                    <option value="mobile">Mobile</option>
                    <option value="home">Home</option>
                    <option value="work">Work</option>
                  </select>
                </div>

                <div>
                  <label className="label py-0">
                    <span className="label-text text-xs">Number</span>
                  </label>
                  <input
                    type="tel"
                    value={phone.number}
                    onChange={(e) => updatePhone(phone.id, 'number', e.target.value)}
                    placeholder="555-1234"
                    className="input input-bordered input-sm w-full"
                  />
                </div>
              </div>

              <button
                onClick={() => removePhone(phone.id)}
                disabled={phones.length === 1}
                className="btn btn-ghost btn-sm btn-square text-error disabled:opacity-30"
              >
                <HiX size={18} />
              </button>
            </div>
          ))}
        </div>

        {phones.length === 0 && (
          <div className="text-center py-6 text-base-content/50">
            No phone numbers added. Click "Add Phone" to start.
          </div>
        )}

        {/* State Display */}
        <CodeSnippet
          title={`State (${phones.length} item${phones.length !== 1 ? 's' : ''})`}
          language="json"
          code={JSON.stringify(phones, null, 2)}
          showCopy={false}
        />
      </div>

      {/* Key Warning */}
      <div className="flex items-start gap-2 text-sm bg-error/10 rounded-lg p-3">
        <HiOutlineLightBulb className="text-error shrink-0 mt-0.5" size={18} />
        <div className="text-base-content/70">
          <strong className="text-error">Never use array index as key!</strong> When items are
          added/removed, indexes shift and React can't track items properly. Always use a{' '}
          <strong>unique ID</strong> (like <code>crypto.randomUUID()</code>).
        </div>
      </div>

      {/* Code Example */}
      <div className="card bg-base-300 p-4">
        <h4 className="font-semibold mb-3">The Pattern</h4>
        <CodeSnippet language="tsx" code={dynamicFieldsCode} />
      </div>
    </div>
  );
}

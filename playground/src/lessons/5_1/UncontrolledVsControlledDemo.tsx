// ============================================
// UncontrolledVsControlledDemo - Comparison
// ============================================

import { useState, useRef } from 'react';
import { HiOutlineExclamationCircle, HiCheck, HiX } from 'react-icons/hi';

export default function UncontrolledVsControlledDemo(): React.ReactElement {
  // Uncontrolled - using ref
  const uncontrolledRef = useRef<HTMLInputElement>(null);
  const [uncontrolledValue, setUncontrolledValue] = useState<string | null>(null);

  // Controlled - using state
  const [controlledValue, setControlledValue] = useState('');

  const handleUncontrolledSubmit = () => {
    if (uncontrolledRef.current) {
      setUncontrolledValue(uncontrolledRef.current.value);
    }
  };

  return (
    <div className="space-y-6">
      {/* Side-by-side comparison */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Uncontrolled */}
        <div className="card bg-base-300 p-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-warning">Uncontrolled</span>
            <span className="text-xs text-base-content/60">using ref</span>
          </div>

          <div className="space-y-3">
            <input
              ref={uncontrolledRef}
              type="text"
              defaultValue="Edit me!"
              className="input input-bordered input-sm w-full"
            />

            <button onClick={handleUncontrolledSubmit} className="btn btn-warning btn-sm w-full">
              Read Value (on demand)
            </button>

            <div className="bg-base-200 rounded p-3 text-sm">
              <div className="text-xs text-base-content/60 mb-1">Last read value:</div>
              <code className="text-warning">
                {uncontrolledValue !== null ? `"${uncontrolledValue}"` : '(click button to read)'}
              </code>
            </div>
          </div>

          <div className="mt-4 text-xs text-base-content/60">
            <pre className="bg-base-200 rounded p-2 overflow-x-auto">
              {`const ref = useRef(null);

<input
  ref={ref}
  defaultValue="initial"
/>

// Read value when needed:
const val = ref.current.value;`}
            </pre>
          </div>
        </div>

        {/* Controlled */}
        <div className="card bg-base-300 p-5 ring-2 ring-success/30">
          <div className="flex items-center gap-2 mb-4">
            <span className="badge badge-success">Controlled</span>
            <span className="text-xs text-base-content/60">using state</span>
            <span className="badge badge-sm">Recommended</span>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Type here..."
              className="input input-bordered input-sm w-full"
            />

            <div className="btn btn-success btn-sm w-full pointer-events-none">
              Always Synced (automatic)
            </div>

            <div className="bg-base-200 rounded p-3 text-sm">
              <div className="text-xs text-base-content/60 mb-1">Current state value:</div>
              <code className="text-success">"{controlledValue}"</code>
            </div>
          </div>

          <div className="mt-4 text-xs text-base-content/60">
            <pre className="bg-base-200 rounded p-2 overflow-x-auto">
              {`const [value, setValue] = useState('');

<input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>

// Value always available:
console.log(value);`}
            </pre>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card bg-base-300 p-5">
        <h4 className="font-semibold mb-4">When to Use Each?</h4>

        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Feature</th>
                <th className="text-warning">Uncontrolled</th>
                <th className="text-success">Controlled</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Real-time validation</td>
                <td>
                  <HiX className="text-error" size={16} />
                </td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
              </tr>
              <tr>
                <td>Instant format (e.g., phone)</td>
                <td>
                  <HiX className="text-error" size={16} />
                </td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
              </tr>
              <tr>
                <td>Conditional disable</td>
                <td>
                  <HiX className="text-error" size={16} />
                </td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
              </tr>
              <tr>
                <td>Dynamic form fields</td>
                <td>
                  <HiX className="text-error" size={16} />
                </td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
              </tr>
              <tr>
                <td>Simple one-off inputs</td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
              </tr>
              <tr>
                <td>File inputs</td>
                <td>
                  <HiCheck className="text-success" size={16} />
                </td>
                <td>
                  <HiX className="text-error" size={16} />
                </td>
              </tr>
              <tr>
                <td>Setup complexity</td>
                <td className="text-success">Simpler</td>
                <td className="text-warning">More code</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-start gap-2 text-sm bg-success/10 rounded-lg p-3">
          <HiOutlineExclamationCircle className="text-success shrink-0 mt-0.5" size={18} />
          <p className="text-base-content/70">
            <strong className="text-success">React recommends controlled components</strong> for
            most cases. They give you full control over your form data and enable powerful features
            like real-time validation and formatting.
          </p>
        </div>
      </div>
    </div>
  );
}

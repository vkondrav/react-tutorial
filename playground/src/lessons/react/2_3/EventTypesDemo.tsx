// ============================================
// EventTypesDemo - Common Event Types
// ============================================

import { useState } from 'react';
import { HiCheck } from 'react-icons/hi';

// ============================================
// Types
// ============================================

interface MousePosition {
  x: number;
  y: number;
}

// ============================================
// Main Component
// ============================================

export default function EventTypesDemo(): React.ReactElement {
  const [inputValue, setInputValue] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('option1');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault(); // Prevent page refresh
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 2000);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="mt-6 card bg-base-200 overflow-hidden">
      <div className="grid grid-cols-2 gap-6 p-6">
        {/* Left: Event Examples */}
        <div>
          <div className="text-xs text-base-content/50 mb-4 uppercase">Interactive Examples</div>

          {/* onChange - Input */}
          <div className="mb-6">
            <label className="block text-xs text-base-content/70 mb-2">
              <code className="text-primary">onChange</code> - Text Input
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
              placeholder="Type something..."
              className="input input-bordered w-full input-sm"
            />
            <div className="mt-2 text-xs text-base-content/50">
              Value: <span className="text-success">"{inputValue}"</span>
            </div>
          </div>

          {/* onChange - Select */}
          <div className="mb-6">
            <label className="block text-xs text-base-content/70 mb-2">
              <code className="text-primary">onChange</code> - Select Dropdown
            </label>
            <select
              value={selectedOption}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setSelectedOption(e.target.value)
              }
              className="select select-bordered w-full select-sm"
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
            </select>
            <div className="mt-2 text-xs text-base-content/50">
              Selected: <span className="text-success">{selectedOption}</span>
            </div>
          </div>

          {/* onChange - Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm text-base-content/70 cursor-pointer">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIsChecked(e.target.checked)
                }
                className="checkbox checkbox-sm"
              />
              <code className="text-primary">onChange</code> - Checkbox
            </label>
            <div className="mt-2 text-xs text-base-content/50">
              Checked: <span className="text-warning">{isChecked.toString()}</span>
            </div>
          </div>

          {/* onSubmit - Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <label className="block text-xs text-base-content/70 mb-2">
                <code className="text-primary">onSubmit</code> - Form Submission
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter name"
                  className="input input-bordered flex-1 input-sm"
                />
                <button type="submit" className="btn btn-success btn-sm">
                  Submit
                </button>
              </div>
              {formSubmitted && (
                <div className="mt-2 p-2 bg-success/10 rounded-lg text-xs text-success flex items-center gap-1">
                  <HiCheck size={14} />
                  Form submitted! (preventDefault prevented page refresh)
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Right: Event Reference */}
        <div>
          <div className="text-xs text-base-content/50 mb-4 uppercase">Common Event Types</div>

          <div className="card bg-base-300 p-4 text-sm leading-relaxed">
            <div className="mb-4">
              <code className="text-primary">onClick</code>
              <div className="text-base-content/50 text-xs mt-1">
                Button clicks, div clicks, etc.
              </div>
            </div>
            <div className="mb-4">
              <code className="text-primary">onChange</code>
              <div className="text-base-content/50 text-xs mt-1">
                Input, select, textarea changes
              </div>
            </div>
            <div className="mb-4">
              <code className="text-primary">onSubmit</code>
              <div className="text-base-content/50 text-xs mt-1">
                Form submission (use preventDefault!)
              </div>
            </div>
            <div className="mb-4">
              <code className="text-primary">onFocus</code> /{' '}
              <code className="text-primary">onBlur</code>
              <div className="text-base-content/50 text-xs mt-1">When input gains/loses focus</div>
            </div>
            <div className="mb-4">
              <code className="text-primary">onMouseEnter</code> /{' '}
              <code className="text-primary">onMouseLeave</code>
              <div className="text-base-content/50 text-xs mt-1">Mouse hover events</div>
            </div>
            <div>
              <code className="text-primary">onKeyDown</code> /{' '}
              <code className="text-primary">onKeyUp</code>
              <div className="text-base-content/50 text-xs mt-1">Keyboard key presses</div>
            </div>
          </div>

          {/* Mouse position demo */}
          <div
            className="mt-6 p-4 card bg-base-300 border-2 border-dashed border-base-300"
            onMouseMove={handleMouseMove}
          >
            <div className="text-xs text-base-content/50 mb-2">
              Hover here for <code className="text-primary">onMouseMove</code>:
            </div>
            <div className="text-sm text-base-content/70">
              X: <span className="text-success">{mousePosition.x}</span> Y:{' '}
              <span className="text-success">{mousePosition.y}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

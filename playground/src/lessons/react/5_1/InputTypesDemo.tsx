// ============================================
// InputTypesDemo - Different input types
// ============================================

import { useState } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '@components';
import textInputCode from './examples/TextInput.tsx?raw';
import textareaCode from './examples/Textarea.tsx?raw';
import selectCode from './examples/Select.tsx?raw';
import checkboxCode from './examples/Checkbox.tsx?raw';
import radioCode from './examples/Radio.tsx?raw';

type TabType = 'text' | 'textarea' | 'select' | 'checkbox' | 'radio';

export default function InputTypesDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<TabType>('text');

  // State for each input type
  const [textValue, setTextValue] = useState('');
  const [textareaValue, setTextareaValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [radioValue, setRadioValue] = useState('');

  const tabs: { id: TabType; label: string; color: string }[] = [
    { id: 'text', label: 'Text', color: 'primary' },
    { id: 'textarea', label: 'Textarea', color: 'secondary' },
    { id: 'select', label: 'Select', color: 'accent' },
    { id: 'checkbox', label: 'Checkbox', color: 'success' },
    { id: 'radio', label: 'Radio', color: 'warning' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'text':
        return (
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Text Input</span>
              </label>
              <input
                type="text"
                value={textValue}
                onChange={(e) => setTextValue(e.target.value)}
                placeholder="Enter text..."
                className="input input-bordered w-full"
              />
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="text-xs text-base-content/60 mb-1">State:</div>
              <code className="text-primary">"{textValue}"</code>
            </div>
            <div>
              <CodeSnippet code={textInputCode} language="tsx" />
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Textarea</span>
              </label>
              <textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter multiple lines..."
                className="textarea textarea-bordered w-full h-24"
              />
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="text-xs text-base-content/60 mb-1">State:</div>
              <code className="text-secondary whitespace-pre-wrap">"{textareaValue}"</code>
            </div>
            <div>
              <CodeSnippet code={textareaCode} language="tsx" />
            </div>
            <div className="flex items-start gap-2 text-sm bg-secondary/10 rounded-lg p-3">
              <HiOutlineLightBulb className="text-secondary shrink-0 mt-0.5" size={18} />
              <p className="text-base-content/70">
                Unlike HTML where textarea content goes between tags, React uses{' '}
                <code className="text-secondary">value</code> prop just like inputs!
              </p>
            </div>
          </div>
        );

      case 'select':
        return (
          <div className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Select Dropdown</span>
              </label>
              <select
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">Choose an option...</option>
                <option value="react">React</option>
                <option value="vue">Vue</option>
                <option value="angular">Angular</option>
                <option value="svelte">Svelte</option>
              </select>
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="text-xs text-base-content/60 mb-1">State:</div>
              <code className="text-accent">"{selectValue}"</code>
            </div>
            <div>
              <CodeSnippet code={selectCode} language="tsx" />
            </div>
            <div className="flex items-start gap-2 text-sm bg-accent/10 rounded-lg p-3">
              <HiOutlineLightBulb className="text-accent shrink-0 mt-0.5" size={18} />
              <p className="text-base-content/70">
                In React, put <code className="text-accent">value</code> on the{' '}
                <code className="text-accent">&lt;select&gt;</code> element, not{' '}
                <code>selected</code> on individual options!
              </p>
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <div className="space-y-4">
            <div className="form-control">
              <label className="label cursor-pointer justify-start gap-3">
                <input
                  type="checkbox"
                  checked={checkboxValue}
                  onChange={(e) => setCheckboxValue(e.target.checked)}
                  className="checkbox checkbox-success"
                />
                <span className="label-text">I agree to the terms</span>
              </label>
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="text-xs text-base-content/60 mb-1">State:</div>
              <code className={checkboxValue ? 'text-success' : 'text-error'}>
                {checkboxValue.toString()}
              </code>
            </div>
            <div>
              <CodeSnippet code={checkboxCode} language="tsx" />
            </div>
            <div className="flex items-start gap-2 text-sm bg-success/10 rounded-lg p-3">
              <HiOutlineLightBulb className="text-success shrink-0 mt-0.5" size={18} />
              <p className="text-base-content/70">
                Checkboxes use <code className="text-success">checked</code> (boolean), not{' '}
                <code>value</code>. Access it via{' '}
                <code className="text-success">e.target.checked</code>!
              </p>
            </div>
          </div>
        );

      case 'radio':
        return (
          <div className="space-y-4">
            <div>
              <div className="text-sm mb-3">Choose your plan:</div>
              <div className="flex flex-col gap-2">
                {['free', 'pro', 'enterprise'].map((plan) => (
                  <label key={plan} className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="plan"
                      value={plan}
                      checked={radioValue === plan}
                      onChange={(e) => setRadioValue(e.target.value)}
                      className="radio radio-warning"
                    />
                    <span className="capitalize">{plan}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-base-200 rounded-lg p-3">
              <div className="text-xs text-base-content/60 mb-1">State:</div>
              <code className="text-warning">"{radioValue}"</code>
            </div>
            <div>
              <CodeSnippet code={radioCode} language="tsx" />
            </div>
            <div className="flex items-start gap-2 text-sm bg-warning/10 rounded-lg p-3">
              <HiOutlineLightBulb className="text-warning shrink-0 mt-0.5" size={18} />
              <p className="text-base-content/70">
                Radio buttons compare their <code className="text-warning">value</code> to state.
                Use the same <code className="text-warning">name</code> to group them!
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`btn btn-sm ${activeTab === tab.id ? `btn-${tab.color}` : 'btn-ghost'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="card bg-base-300 p-6">{renderContent()}</div>
    </div>
  );
}

// ============================================
// When Built-in State is Enough Demo
// ============================================

import { useState } from 'react';
import { HiCheck, HiOutlineLightBulb, HiOutlineCode } from 'react-icons/hi';
import { CodeSnippet } from '../../components';

// Code examples from separate files
import useStateExample from './examples/UseStateExample.tsx?raw';
import useReducerExample from './examples/UseReducerExample.tsx?raw';
import contextReducerExample from './examples/ContextReducerExample.tsx?raw';

interface Scenario {
  id: string;
  title: string;
  description: string;
  recommendation: 'useState' | 'useReducer' | 'context+reducer';
  example: string;
}

const scenarios: Scenario[] = [
  {
    id: 'form',
    title: 'Form with multiple fields',
    description: 'A registration form with name, email, password fields',
    recommendation: 'useState',
    example: 'Single useState with object, or separate useStates',
  },
  {
    id: 'todo',
    title: 'Todo list with CRUD',
    description: 'Add, toggle, delete, filter todos in a component',
    recommendation: 'useReducer',
    example: 'Actions clearly describe state transitions',
  },
  {
    id: 'theme',
    title: 'App-wide theme toggle',
    description: 'Dark/light mode accessible from any component',
    recommendation: 'context+reducer',
    example: 'Context shares, reducer handles toggle logic',
  },
  {
    id: 'cart',
    title: 'Shopping cart (medium app)',
    description: 'Cart visible in header, modifiable from product pages',
    recommendation: 'context+reducer',
    example: 'Global state with structured add/remove/clear actions',
  },
  {
    id: 'modal',
    title: 'Modal open/close state',
    description: 'A single modal controlled by its parent',
    recommendation: 'useState',
    example: 'const [isOpen, setIsOpen] = useState(false)',
  },
  {
    id: 'wizard',
    title: 'Multi-step form wizard',
    description: 'Navigate steps, collect data, validate each step',
    recommendation: 'useReducer',
    example: 'Complex transitions: next, prev, setData, validate',
  },
];

const recommendationColors = {
  useState: 'text-primary bg-primary/10 border-primary/20',
  useReducer: 'text-secondary bg-secondary/10 border-secondary/20',
  'context+reducer': 'text-accent bg-accent/10 border-accent/20',
};

const recommendationLabels = {
  useState: 'useState',
  useReducer: 'useReducer',
  'context+reducer': 'Context + Reducer',
};

export default function WhenBuiltInDemo(): React.ReactElement {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'code'>('scenarios');
  const [selectedCode, setSelectedCode] = useState<'useState' | 'useReducer' | 'context'>(
    'useState'
  );

  const codeExamples = {
    useState: useStateExample,
    useReducer: useReducerExample,
    context: contextReducerExample,
  };

  return (
    <div className="space-y-6">
      {/* Key Point */}
      <div className="card bg-success/10 border border-success/20 p-4">
        <div className="flex items-start gap-3">
          <HiOutlineLightBulb className="text-success text-xl mt-0.5 shrink-0" />
          <div>
            <p className="text-success font-medium mb-1">The Golden Rule</p>
            <p className="text-base-content/80 text-sm">
              <strong>Start with built-in state.</strong> Only add a library when you feel real
              pain. Most React apps (including complex ones) work perfectly fine with useState,
              useReducer, and useContext.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`btn btn-sm ${activeTab === 'scenarios' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Common Scenarios
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`btn btn-sm ${activeTab === 'code' ? 'btn-primary' : 'btn-ghost'}`}
        >
          <HiOutlineCode className="mr-1" />
          Code Examples
        </button>
      </div>

      {activeTab === 'scenarios' ? (
        /* Scenarios Grid */
        <div className="grid gap-3">
          {scenarios.map((scenario) => (
            <div key={scenario.id} className="card bg-base-200 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-medium text-base-content mb-1">{scenario.title}</h4>
                  <p className="text-sm text-base-content/60 mb-2">{scenario.description}</p>
                  <p className="text-xs text-base-content/50 flex items-center gap-1">
                    <HiCheck className="text-success" />
                    {scenario.example}
                  </p>
                </div>
                <span
                  className={`badge border ${recommendationColors[scenario.recommendation]} shrink-0`}
                >
                  {recommendationLabels[scenario.recommendation]}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Code Examples */
        <div className="space-y-4">
          <div className="flex gap-2">
            {(['useState', 'useReducer', 'context'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCode(tab)}
                className={`btn btn-sm ${selectedCode === tab ? 'btn-secondary' : 'btn-ghost'}`}
              >
                {tab === 'context' ? 'Context + Reducer' : tab}
              </button>
            ))}
          </div>
          <CodeSnippet
            code={codeExamples[selectedCode]}
            language="tsx"
            title={
              selectedCode === 'useState'
                ? 'useState - Simple & local'
                : selectedCode === 'useReducer'
                  ? 'useReducer - Complex transitions'
                  : 'Context + Reducer - Global state'
            }
          />
        </div>
      )}

      {/* Summary Table */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-medium text-base-content mb-3">Quick Reference</h4>
        <div className="overflow-x-auto">
          <table className="table table-sm">
            <thead>
              <tr>
                <th>Tool</th>
                <th>Best For</th>
                <th>Scope</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-primary font-medium">useState</td>
                <td>Simple values, toggles, form inputs</td>
                <td>Component-local</td>
              </tr>
              <tr>
                <td className="text-secondary font-medium">useReducer</td>
                <td>Complex transitions, multiple related updates</td>
                <td>Component-local</td>
              </tr>
              <tr>
                <td className="text-accent font-medium">Context + Reducer</td>
                <td>Theme, auth, cart, notifications</td>
                <td>Global / subtree</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

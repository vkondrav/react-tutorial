// ============================================
// Lifting Pattern Demo - Step by Step
// ============================================

import { useState } from 'react';
import {
  HiOutlineArrowUp,
  HiOutlineArrowDown,
  HiChevronRight,
  HiChevronDown,
} from 'react-icons/hi';
import { CodeSnippet } from '../components';
import liftingStepsCode from './examples/LiftingSteps.tsx?raw';

// ============================================
// Interactive Temperature Converter
// ============================================

interface TemperatureInputProps {
  scale: 'celsius' | 'fahrenheit';
  value: string;
  onChange: (value: string) => void;
}

function TemperatureInput({ scale, value, onChange }: TemperatureInputProps) {
  const label = scale === 'celsius' ? 'Celsius' : 'Fahrenheit';
  const symbol = scale === 'celsius' ? '°C' : '°F';

  return (
    <div className="card bg-base-300 p-4">
      <label className="flex flex-col gap-2">
        <span className="text-sm font-medium">{label}</span>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter temperature"
            className="input input-bordered flex-1"
          />
          <span className="text-xl font-bold text-primary">{symbol}</span>
        </div>
      </label>
    </div>
  );
}

function TemperatureCalculator() {
  // Lifted state - single source of truth
  const [celsius, setCelsius] = useState('');

  // Derived values
  const fahrenheit = celsius !== '' ? ((parseFloat(celsius) * 9) / 5 + 32).toFixed(1) : '';

  const handleCelsiusChange = (value: string) => {
    setCelsius(value);
  };

  const handleFahrenheitChange = (value: string) => {
    if (value === '') {
      setCelsius('');
    } else {
      const c = ((parseFloat(value) - 32) * 5) / 9;
      setCelsius(isNaN(c) ? '' : c.toFixed(1));
    }
  };

  const getVerdict = () => {
    const c = parseFloat(celsius);
    if (isNaN(c)) return null;
    if (c >= 100) return { text: 'Water would boil!', color: 'text-error' };
    if (c >= 30) return { text: 'Hot day!', color: 'text-warning' };
    if (c >= 20) return { text: 'Nice weather', color: 'text-success' };
    if (c >= 0) return { text: 'Getting cold', color: 'text-info' };
    return { text: 'Freezing!', color: 'text-primary' };
  };

  const verdict = getVerdict();

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <TemperatureInput scale="celsius" value={celsius} onChange={handleCelsiusChange} />
        <TemperatureInput scale="fahrenheit" value={fahrenheit} onChange={handleFahrenheitChange} />
      </div>

      {verdict && (
        <div className={`text-center text-lg font-semibold ${verdict.color}`}>{verdict.text}</div>
      )}
    </div>
  );
}

// ============================================
// Step-by-Step Explanation
// ============================================

interface Step {
  number: number;
  title: string;
  description: string;
  highlight: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: 'Identify Shared State',
    description:
      'Both temperature inputs need to stay in sync. When one changes, the other updates.',
    highlight: 'What state needs to be shared between components?',
  },
  {
    number: 2,
    title: 'Find Common Ancestor',
    description:
      'TemperatureCalculator is the parent of both inputs - this is where we lift the state.',
    highlight: 'What is the closest common parent?',
  },
  {
    number: 3,
    title: 'Move State Up',
    description:
      'Move useState from the child to the parent. The parent becomes the "single source of truth".',
    highlight: 'const [celsius, setCelsius] = useState("")',
  },
  {
    number: 4,
    title: 'Pass Props Down',
    description:
      'Pass the state value and an onChange handler down to children. They become "controlled".',
    highlight: '<Input value={value} onChange={handler} />',
  },
];

function StepsExplainer() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {STEPS.map((step) => (
          <button
            key={step.number}
            onClick={() => setActiveStep(step.number)}
            className={`btn btn-sm ${activeStep === step.number ? 'btn-primary' : 'btn-ghost'}`}
          >
            Step {step.number}
          </button>
        ))}
      </div>

      {STEPS.map((step) =>
        activeStep === step.number ? (
          <div key={step.number} className="card bg-base-300 p-4">
            <h4 className="font-bold text-primary mb-2">
              Step {step.number}: {step.title}
            </h4>
            <p className="text-base-content/80 mb-3">{step.description}</p>
            <code className="block bg-base-100 p-3 rounded-lg text-sm text-secondary">
              {step.highlight}
            </code>
          </div>
        ) : null
      )}
    </div>
  );
}

// ============================================
// Visual Data Flow Diagram
// ============================================

function DataFlowDiagram() {
  return (
    <div className="card bg-base-300 p-6">
      <h4 className="font-bold mb-4 text-center">Data Flow After Lifting</h4>

      <div className="flex flex-col items-center gap-2">
        {/* Parent */}
        <div className="card bg-primary text-primary-content p-4 w-64 text-center">
          <div className="font-bold">Parent Component</div>
          <div className="text-sm opacity-80">useState lives here</div>
          <code className="text-xs bg-primary-content/20 px-2 py-1 rounded mt-2 block">
            const [state, setState] = useState()
          </code>
        </div>

        {/* Arrows */}
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <HiOutlineArrowDown size={24} className="text-success" />
            <span className="text-xs text-success">value (prop)</span>
          </div>
          <div className="flex flex-col items-center">
            <HiOutlineArrowUp size={24} className="text-warning" />
            <span className="text-xs text-warning">onChange (callback)</span>
          </div>
        </div>

        {/* Children */}
        <div className="flex gap-4">
          <div className="card bg-base-200 p-3 text-center border-2 border-success/30">
            <div className="font-semibold text-sm">Child A</div>
            <div className="text-xs text-base-content/60">Controlled</div>
          </div>
          <div className="card bg-base-200 p-3 text-center border-2 border-success/30">
            <div className="font-semibold text-sm">Child B</div>
            <div className="text-xs text-base-content/60">Controlled</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-sm text-base-content/70 text-center">
        <span className="text-success">↓ Props flow down</span>
        {' • '}
        <span className="text-warning">↑ Events flow up</span>
      </div>
    </div>
  );
}

// ============================================
// Main Component
// ============================================

export default function LiftingPatternDemo(): React.ReactElement {
  const [showCode, setShowCode] = useState(false);
  const [showDiagram, setShowDiagram] = useState(false);

  return (
    <div className="space-y-6">
      {/* Interactive Demo */}
      <div className="card bg-base-200 p-6">
        <h4 className="font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">🌡️</span>
          Temperature Converter (Lifted State)
        </h4>
        <TemperatureCalculator />
        <p className="text-sm text-base-content/60 mt-4">
          Edit either input — they stay in sync because the state is lifted to the parent!
        </p>
      </div>

      {/* Steps */}
      <div className="card bg-base-200 p-6">
        <button
          onClick={() => setShowDiagram(!showDiagram)}
          className="font-bold mb-4 flex items-center gap-2 w-full text-left"
        >
          {showDiagram ? <HiChevronDown size={20} /> : <HiChevronRight size={20} />}
          The 4 Steps to Lift State
        </button>
        {showDiagram && <StepsExplainer />}
      </div>

      {/* Data Flow */}
      <DataFlowDiagram />

      {/* Code Toggle */}
      <button onClick={() => setShowCode(!showCode)} className="btn btn-sm btn-outline">
        {showCode ? 'Hide Code' : 'Show Code'}
      </button>

      {showCode && (
        <CodeSnippet
          title="Temperature Converter Implementation"
          language="tsx"
          code={liftingStepsCode}
        />
      )}
    </div>
  );
}

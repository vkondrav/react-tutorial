// ============================================
// HOC Basics Demo
// Shows what HOCs are and how they work
// ============================================

import { ComponentType } from 'react';
import { HiOutlineLightBulb } from 'react-icons/hi';
import { CodeSnippet } from '../../components';
import basicHOCCode from './examples/BasicHOC.tsx?raw';
import formulaCode from './examples/HOCFormula.tsx?raw';

// ---- Simple HOC Example ----

// A simple HOC that adds a border
function withBorder<P extends object>(
  WrappedComponent: ComponentType<P>,
  color: string = 'primary'
) {
  // Return a new component
  return function WithBorderComponent(props: P) {
    const borderColors: Record<string, string> = {
      primary: 'border-primary',
      secondary: 'border-secondary',
      accent: 'border-accent',
      success: 'border-success',
      error: 'border-error',
    };

    return (
      <div className={`border-2 ${borderColors[color]} rounded-lg p-3`}>
        <WrappedComponent {...props} />
      </div>
    );
  };
}

// ---- Sample Components ----

interface GreetingProps {
  name: string;
}

function Greeting({ name }: GreetingProps) {
  return (
    <p className="text-lg">
      Hello, <strong>{name}</strong>!
    </p>
  );
}

interface StatsProps {
  value: number;
  label: string;
}

function Stats({ value, label }: StatsProps) {
  return (
    <div className="text-center">
      <p className="text-3xl font-bold text-primary">{value}</p>
      <p className="text-sm text-base-content/60">{label}</p>
    </div>
  );
}

// ---- Enhanced Components ----
const GreetingWithBorder = withBorder(Greeting, 'primary');
const GreetingWithAccentBorder = withBorder(Greeting, 'accent');
const StatsWithBorder = withBorder(Stats, 'success');

export default function HOCBasicsDemo() {
  return (
    <div className="space-y-6">
      {/* The Formula */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">The HOC Pattern</h4>
        <CodeSnippet title="HOC formula" language="tsx" code={formulaCode} />
      </div>

      {/* Code Example */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-3">How It Works</h4>
        <CodeSnippet title="Creating an HOC" language="tsx" code={basicHOCCode} />
      </div>

      {/* Live Demo */}
      <div className="card bg-base-200 p-4">
        <h4 className="font-semibold mb-4">Live Demo: withBorder HOC</h4>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-base-content/60 mb-2">Original Greeting (no HOC)</p>
            <div className="bg-base-300 rounded-lg p-3">
              <Greeting name="World" />
            </div>
          </div>

          <div>
            <p className="text-xs text-base-content/60 mb-2">
              GreetingWithBorder = withBorder(Greeting, 'primary')
            </p>
            <GreetingWithBorder name="React" />
          </div>

          <div>
            <p className="text-xs text-base-content/60 mb-2">
              GreetingWithAccentBorder = withBorder(Greeting, 'accent')
            </p>
            <GreetingWithAccentBorder name="HOCs" />
          </div>

          <div>
            <p className="text-xs text-base-content/60 mb-2">
              StatsWithBorder = withBorder(Stats, 'success')
            </p>
            <StatsWithBorder value={42} label="Components Enhanced" />
          </div>
        </div>
      </div>

      {/* Key Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card bg-success/10 border border-success p-4">
          <h5 className="font-semibold text-success mb-2">What HOCs Do</h5>
          <ul className="text-sm space-y-1">
            <li>✓ Add new behavior to existing components</li>
            <li>✓ Wrap components with additional markup/logic</li>
            <li>✓ Inject props into wrapped components</li>
            <li>✓ Intercept and transform props</li>
          </ul>
        </div>

        <div className="card bg-error/10 border border-error p-4">
          <h5 className="font-semibold text-error mb-2">What HOCs Don't Do</h5>
          <ul className="text-sm space-y-1">
            <li>✗ Modify the original component</li>
            <li>✗ Copy static methods automatically</li>
            <li>✗ Forward refs by default</li>
            <li>✗ Work inside render methods</li>
          </ul>
        </div>
      </div>

      {/* Key Insight */}
      <div className="card bg-base-300 p-4">
        <div className="flex gap-3">
          <HiOutlineLightBulb className="text-warning text-xl shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold mb-1">Think of HOCs as Decorators</h4>
            <p className="text-sm text-base-content/70">
              An HOC <strong className="text-primary">decorates</strong> a component with extra
              functionality. The original component doesn't know it's being wrapped — it just
              receives its props and renders normally. The HOC handles the enhancement.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

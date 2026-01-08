// ============================================
// Lesson 5.1: Controlled Components
// ============================================

import {
  HiOutlineAdjustments,
  HiOutlineSwitchHorizontal,
  HiOutlineTemplate,
  HiOutlineLightningBolt,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '@components';
import ControlledBasicsDemo from './ControlledBasicsDemo';
import UncontrolledVsControlledDemo from './UncontrolledVsControlledDemo';
import InputTypesDemo from './InputTypesDemo';
import ControlledBenefitsDemo from './ControlledBenefitsDemo';
import ControlledPlayground from './ControlledPlayground';

export default function Lesson5_1(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="5" lesson="1" title="Controlled Components" />

      {/* Section 1: What Are Controlled Components? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineAdjustments className="text-primary" size={20} />
            What Are Controlled Components?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          In React, a <strong className="text-primary">controlled component</strong> is a form
          element whose value is controlled by React state. Instead of the DOM managing the input's
          value,{' '}
          <strong className="text-secondary">React becomes the "single source of truth"</strong>.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-base-content/70 mb-2">HTML Form (Traditional)</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• DOM stores the input value</li>
              <li>• Read value on form submit</li>
              <li>• Limited real-time control</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-primary mb-2">React Controlled</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• State stores the input value</li>
              <li>• Access value anytime</li>
              <li>• Full control over input</li>
            </ul>
          </div>
        </div>
        <ControlledBasicsDemo />
      </Section>

      {/* Section 2: Uncontrolled vs Controlled */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineSwitchHorizontal className="text-primary" size={20} />
            Uncontrolled vs Controlled
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          React supports both approaches. <strong className="text-warning">Uncontrolled</strong>{' '}
          components use <code className="text-secondary">ref</code> to read values from the DOM,
          while <strong className="text-success">controlled</strong> components use{' '}
          <code className="text-secondary">state</code> to manage values.
        </p>
        <UncontrolledVsControlledDemo />
      </Section>

      {/* Section 3: Different Input Types */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineTemplate className="text-primary" size={20} />
            Controlling Different Input Types
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Each form element has its own way of being controlled. Here's how to handle{' '}
          <strong className="text-primary">text inputs</strong>,{' '}
          <strong className="text-secondary">textareas</strong>,{' '}
          <strong className="text-accent">selects</strong>,{' '}
          <strong className="text-success">checkboxes</strong>, and{' '}
          <strong className="text-warning">radio buttons</strong>.
        </p>
        <InputTypesDemo />
      </Section>

      {/* Section 4: Benefits of Controlled Components */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineLightningBolt className="text-primary" size={20} />
            Why Use Controlled Components?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Controlled components unlock powerful features:{' '}
          <strong className="text-primary">instant validation</strong>,{' '}
          <strong className="text-secondary">input formatting</strong>,{' '}
          <strong className="text-accent">conditional logic</strong>, and{' '}
          <strong className="text-success">computed values</strong>.
        </p>
        <ControlledBenefitsDemo />
      </Section>

      {/* Section 5: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Form Building Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Practice building controlled forms! This playground demonstrates real-world patterns
          you'll use when building forms in React applications.
        </p>
        <ControlledPlayground />
      </Section>

      {/* Takeaways */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineClipboardCheck className="text-primary" size={20} />
            Key Takeaways
          </span>
        }
      >
        <TakeawayList
          items={[
            'Controlled components use state as the "single source of truth" for input values',
            'The pattern: value={state} + onChange={(e) => setState(e.target.value)}',
            'For checkboxes, use checked={state} instead of value',
            'For selects, put value on the <select>, not <option>',
            'Controlled components enable real-time validation and formatting',
            'Uncontrolled components (with ref) are simpler but offer less control',
            "Controlled is React's recommended approach for most forms",
          ]}
        />
      </Section>
    </div>
  );
}

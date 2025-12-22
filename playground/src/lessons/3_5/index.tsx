// ============================================
// Lesson 3.5: Custom Hooks - Reusable Logic
// ============================================

import {
  HiOutlinePuzzle,
  HiOutlineCode,
  HiOutlineCollection,
  HiOutlineBeaker,
  HiOutlineClipboardCheck,
} from 'react-icons/hi';
import { LessonHeader, Section, TakeawayList } from '../components';
import CustomHookBasicsDemo from './CustomHookBasicsDemo';
import ExtractingLogicDemo from './ExtractingLogicDemo';
import CommonHooksDemo from './CommonHooksDemo';
import CustomHooksPlayground from './CustomHooksPlayground';

export default function Lesson3_5(): React.ReactElement {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <LessonHeader module="3" lesson="5" title="Custom Hooks: Reusable Logic" />

      {/* Section 1: What are Custom Hooks? */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlinePuzzle className="text-primary" size={20} />
            What are Custom Hooks?
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          <strong className="text-primary">Custom hooks</strong> are JavaScript functions that let
          you extract and reuse stateful logic between components. They're named with the{' '}
          <code className="text-secondary">use</code> prefix and can call other hooks inside them.
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-primary mb-2">Why Custom Hooks?</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>• Share logic between components</li>
              <li>• Keep components clean and focused</li>
              <li>• Make code easier to test</li>
              <li>• Create your own abstractions</li>
            </ul>
          </div>
          <div className="card bg-base-300 p-4">
            <h4 className="font-semibold text-secondary mb-2">Rules</h4>
            <ul className="text-sm space-y-1 text-base-content/70">
              <li>
                • Name must start with <code>use</code>
              </li>
              <li>• Can call other hooks inside</li>
              <li>• Follow the Rules of Hooks</li>
              <li>• Return whatever you need</li>
            </ul>
          </div>
        </div>
        <CustomHookBasicsDemo />
      </Section>

      {/* Section 2: Extracting Logic */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCode className="text-primary" size={20} />
            Extracting Logic into Hooks
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          When you notice <strong className="text-primary">duplicated stateful logic</strong> across
          components, it's time to extract it into a custom hook. The component becomes simpler, and
          the logic becomes reusable.
        </p>
        <ExtractingLogicDemo />
      </Section>

      {/* Section 3: Common Custom Hooks */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineCollection className="text-primary" size={20} />
            Common Custom Hook Patterns
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Here are some of the most useful custom hooks you'll use in real projects. Each one
          encapsulates a common pattern that would otherwise be repeated across your codebase.
        </p>
        <CommonHooksDemo />
      </Section>

      {/* Section 4: Interactive Playground */}
      <Section
        title={
          <span className="flex items-center gap-2">
            <HiOutlineBeaker className="text-primary" size={20} />
            Custom Hooks Playground
          </span>
        }
      >
        <p className="mb-4 leading-relaxed">
          Try these custom hooks in action! Each demo shows a practical use case you might encounter
          in real applications.
        </p>
        <CustomHooksPlayground />
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
            'Custom hooks extract reusable stateful logic from components',
            'Name must start with "use" (e.g., useCounter, useLocalStorage)',
            'Custom hooks can call other hooks — they follow the same rules',
            'Each call to a custom hook gets its own isolated state',
            'Return an array [value, setter] or object { value, actions }',
            'Great for: form handling, data fetching, subscriptions, animations',
            'Custom hooks make components cleaner and logic easier to test',
          ]}
        />
      </Section>
    </div>
  );
}

